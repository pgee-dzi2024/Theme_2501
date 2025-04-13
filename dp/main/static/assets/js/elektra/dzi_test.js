const App = {
    delimiters: ['[[', ']]'], // Променяме синтаксиса на [[ ]]
    data() {
        return {
            points_total:60,
            status: 0, //0 - начално положение; 1 -  тече тест; 2 - край на теста и показваме резултата
            timer: {
                h: 0,
                m: 0,
                s: 0,
                id: 0,
            },
            test: [],
            theme: {},

            user:{},
            listOfThemes: [
                {
                    "id": 1,
                    "num": 1,
                    "title": "Микропроцесор. Архитектура на микропроцесор",
                    "tasks_total": 24,
                    "tasks_knowledge": 9,
                    "tasks_comprehension": 8,
                    "tasks_application": 3,
                    "tasks_analysis": 4,
                    "specialty": 1
                },
                {
                    "id": 1,
                    "num": 1,
                    "title": "Микропроцесор. Архитектура на микропроцесор",
                    "tasks_total": 24,
                    "tasks_knowledge": 9,
                    "tasks_comprehension": 8,
                    "tasks_application": 3,
                    "tasks_analysis": 4,
                    "specialty": 1
                },
            ],
            theme_num:1,
            showResults: false,
            exam_score:0,
            exam_grade:'слаб',
            answers: 0,
        }
    },

    methods: {
        checkOptionOkNo(option) {
            if(option.checked||option.checked_t) {
                if (option.checked === option.checked_t) {// ok
                    return 1
                }
                if (option.checked === !option.checked_t) {// no
                    return -1
                }
            }
            else {
                return 0
            }
        },
        sendTestResult(){
            const vm=this
            let time=''
            if(this.timer.h<10){time=time+'0'}
            time=time+this.timer.h+':'
            if(this.timer.m<10){time=time+'0'}
            time=time+this.timer.m+':'
            if(this.timer.s<10){time=time+'0'}
            time=time+this.timer.s

            axios({
                method:'POST',
                url:'/api/SaveTestResult/',
                headers:{
                    'X-CSRFToken':CSRF_TOKEN,
                    //'Access-Control-Allow-Origin':'*',
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                data:{
                    theme: vm.user.theme,
                    spec: vm.user.speciality,
                    points: vm.points_total,
                    time: time,
                    test:this.test,
                }
            })
                .then(response => {
                })
        },
        checkAnswer(qst){
            const vm = this;
            let task = qst
            let ea =''
            for(let opt of qst.options){
                if (ea.length>0){ ea=ea+'; '}
                ea=ea+opt.value;
            }
            axios({
                method:'POST',
                url:'/api/check-answer/',
                headers:{
                    'X-CSRFToken':CSRF_TOKEN,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                data:{
                    question: qst.text,
                    example_answer:  ea,
                    student_answer: qst.options[0].value_t,
                }
            })
                .then(response => {
                    task.textWrap='(проверено с ИИ)'
                    if(response.data.result==='Да'){task.stat_points=task.level*2}
                    else {task.stat_points=0}
                })
        },
        stopTest(){
            this.status = 2
            this.showResults=false
            clearInterval(this.timer.id)
            // оценяване на задачите от дадено ниво
            let numOkBase = 0 // брой верни отговори по ключ
            let numOk = 0 // брой дадени верни отговори
            let numAnswers = 0 // брой дадени отговори
            let taskTotal = 0 // точки за конкретния въпрос
            let numOptions = 0 // брой отговори към въпроса
            let points = 0
            this.points_total = 0
            this.answers = 0
            for (let task of this.test){
                numOkBase = 0; numOk = 0; numAnswers = 0; taskTotal = 0; numOptions = 0
                // task.stat_attempts = 0
                task.stat_points=0; points = 0;
                if (task.type < 3){ // тип 1 или 2 - затворен въпрос
                    for(let option of task.options){
                        numOptions++
                        if (option.checked_t){numAnswers++}
                        if (option.checked){numOkBase++}
                        if (option.checked_t && option.checked){numOk++}
                    }
                    if ((numOkBase >= numOk)&&(numOkBase>0)&&(numAnswers<=numOkBase)){
                        points = task.level*2*numOk/numOkBase
                        task.stat_points = parseFloat(points.toFixed(2));
                        // NB полето stat_points съдържа САМО точките от този тест
                    }
                }
                else if (task.type < 5){ // тип 3 или 4 - съпоставяне
                    for(let option of task.options){
                        numOptions++
                        if (option.value_t.length>0){numAnswers++}
                        if (option.value_t === option.value){numOk++}
                    }
                    if(numOptions>0){
                        points = task.level*2*numOk/numOptions
                        task.stat_points = parseFloat(points.toFixed(2));
                        // NB полето stat_points съдържа САМО точките от този тест
                    }
                }
                else { // отворен отговор
                    for(let option of task.options){
                        numOptions++
                        if (task.options[0].value_t === option.value){numOk = 1}

                    }
                    console.log(`points ${points}; отговор ${task.options[0].value_t}`)
                    if((points==0)&&(task.options[0].value_t.length>0)) {
                        this.checkAnswer(task)
                        console.log('OpenAI')
                    }
                    if(task.options[0].value_t.length>0) { numAnswers++ }
                    task.stat_points = points*numOk
                }
                this.points_total = this.points_total + task.stat_points
                if (numAnswers>0){this.answers++}
            }
            let es=this.points_total*0.06

            this.exam_score = parseFloat(es.toFixed(2))
            if(this.exam_score <= 2.00) {
                this.exam_score = 2.00
            }
            if(this.exam_score <= 2.99) {
                this.exam_grade = 'слаб'
            }
            else if(this.exam_score <= 3.49) {
                this.exam_grade = 'среден'
            }
            else if(this.exam_score <= 4.49) {
                this.exam_grade = 'добър'
            }
            else if(this.exam_score <= 5.49) {
                this.exam_grade = 'много добър'
            }
            else {
                this.exam_grade = 'отличен'
            }

            if((this.answers*2) < this.test.length) {
                this.status = 3
            }
            else {this.sendTestResult()}
            console.log('status: '+this.status)
            console.log('answers: '+this.answers)
            console.log('questions: '+this.test.length)
        },
        startTest(){
            this.status = 1
            this.timer.h = 0
            this.timer.m = 0
            this.timer.s = 0
            this.timer.id = setInterval(this.testTimer, 1000)

            // формирам нов тест
            this.test.length = 0;
            let groups=[]
            let temp_question_list=[]
            let level_nip = 0 // брой въпроси в теста изисквани от НИП за точка/ниво
            //генерирам списък въпроси с изискваните от НИП брой и структура
            let item;
            for(item of this.theme){// обхождам темата точка по точка
                for (let level = 1; level < 5; level++){ //за всяко ниво по Блум
                    if (level===1) {level_nip=item.knowledge}
                    else if (level===2) {level_nip=item.comprehension}
                    else if (level===3) {level_nip=item.application}
                    else if (level===4) {level_nip=item.analysis}
                    temp_question_list.length = 0;
                    for(let question of item.tasks){ //обхождам точката въпрос по въпрос
                        if(question.level===level) {
                            temp_question_list.push(question)
                        }
                    }
                    // temp_question_list съдържа всички въпроси от текущото ниво за текущата точка
                    // махам доколкото е възможно групите
                    let num=0
                    let question=temp_question_list[num]
                    while ((num<temp_question_list.length)&&(temp_question_list.length > level_nip)){
                        question=temp_question_list[num]
                        if(question.group>0){ //въпросът е част от група
                            if (groups.includes(question.group)) {
                                //вече съм срещал тази група и затова махам въпроса
                                temp_question_list.splice(num,1)
                            }
                            else {// това е първият срещнат елемент от група question.group (не се съдържа в масива groups)
                                groups.push(question.group)
                                num++
                            }
                        }
                        else { //въпросът не е част от група
                            num++
                        }
                    }
                    // мамхам по случаен начин въпроси докато не останат толкова, колкото изисква НИП
                    while(temp_question_list.length > level_nip){
                        num=Math.floor(Math.random() * temp_question_list.length)
                        temp_question_list.splice(num,1)
                        }
                    // прехвърлям избраните въпроси от това ниво по тази точка в теста
                    for (let question of temp_question_list){
                        for (let option of question.options){
                            option.value_t=''
                            option.checked_t=false
                        }
                        this.test.push(question)
                    }
                }
            }
            //разбърквам по случаен начин списъка с въпроси
            for (let i = this.test.length - 1; i > 0; i--) {
                // Избиране на случаен индекс от 0 до i
                const randomIndex = Math.floor(Math.random() * (i + 1));
                // Размяна на текущия елемент с елемента на случайния индекс
                [this.test[i], this.test[randomIndex]] = [this.test[randomIndex], this.test[i]];
            }
            //номерирам въпросите
            let num = 1
            for (let question of this.test){
                question.num=num
                num++;
            }
        },
        testTimer(){
            vm=this
            if(vm.status===1){
                vm.timer.s += 1
                if(vm.timer.s>59){
                    vm.timer.s = 0
                    vm.timer.m += 1
                    if(vm.timer.m>59){
                        vm.timer.m = 0
                        vm.timer.h += 1
                    }
                }
            }
        },
        loadTheme(vm){
            axios.get('/api/theme_items/'+vm.listOfThemes[vm.theme_num].id+'/')
                .then(function(response){
                    vm.theme = response.data
                })
        },
        loadUserDetails(){
            const vm = this;
            axios.get('/api/context/')
                .then(function(response){
                    vm.user = response.data
                    vm.loadThemes(vm.user.speciality)
                })
        },
        loadThemes(spec_id){
            const vm = this;
            axios.get('/api/theme_nums/'+spec_id+'/') // темите са различни за всяка специалност
                .then(function(response){
                    vm.listOfThemes = response.data
                    for (i=0; i< vm.listOfThemes.length; i++){
                        if (vm.listOfThemes[i].num == vm.user.theme){ vm.theme_num = i}
                    }
                    vm.loadTheme(vm)
                })
        },
        changeTheme(theme_num){
            const vm = this;
            axios.get('api/set_user_theme/'+theme_num+'/') // темите са различни за всяка специалност
                .then(function(response){
                    vm.loadUserDetails()
                })
        },
    },
    created: function(){
        this.status = 0
        this.loadUserDetails();
    }
}

Vue.createApp(App).mount('#main')
