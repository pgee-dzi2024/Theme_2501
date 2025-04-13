const EDIT_NEW_QUESTION='Създаване на нов въпрос'
const EDIT_OLD_QUESTION='Редактиране на въпрос'

const App = {
    delimiters: ['[[', ']]'], // Променяме синтаксиса на [[ ]]
    data() {
        return {
            flagNewItem: false,
            editMode: EDIT_NEW_QUESTION,
            showMode:0, // '0' - всички, '1' - неизползвани в текущото училище, '2' - използвани в текущото училище
            current_item: {theme_id:0, task_id:0},
            copy_item: {theme_id:0, task_id:0},
            theme_num:0,
            question: {
                id: 1,
                text: "Въпрос от ниво знание на тема 1 точка 1",
                type: 1,
                level:1,
                picture: null,
                group: 0,
                item: 1,
                author: 1,
                school: [],
                deletedOptions:[],
                options: [
                    {
                    id: 1,
                    leading_char: "3",
                    text: "опция 1 на въпрос 1",
                    value: "4",
                    value_name: "value_name 2",
                    checked: true,
                    task: 1,
                    collapsed:false
                    },
                ],
                showLevel:0, // '-1' - неизползван(чужд), '0' - използван(чужд), '1' - използван(свой)
                textWrap:'n', // 'n'-отгоре; 'e'-от ляво; 'w'-от дясно; 's'-от долу;
                ctx: {},
                },
            theme: [],
            listOfThemes: [],
            user:{},
            temp_id:0,
            remark: {
                text: '',
                task_id: 0,
                },
            remarks: [],
            grouping: {
                active: false, // режим - ако е true е активен избор на въпрос към чиято група ще се присъединявам
                item_num: 0,
                task_num: 0, // номера на тема/въпрос на въпроса, който присъединявам към група
                },
            temp_item_num: 0,
            temp_task_num: 0,
            id_to_delete: 0,
            temp_int:0, // просто променлива за временно съхранение на целочислена променлива
            context_count:0, //брой въпроси със зададен контекст
            context_edit_mode:0 //0 - нищо, 1 - избор от наличните, 2 - редакция, 3 - копие, 4 - откачане, 5 - нов контекст
            }
    },
    computed: {
        pictureFileName() {
            if (this.question.picture) {
                // Извличаме името на файла от URL
                return this.question.picture.split('/').pop(); // Взема последната част от пътя
            }
            return null; // Ако няма картинка
        },
    },
    methods:{
        setShowMode(mode){
            this.showMode=mode
            this.countThemeQuestions()
        },
        haveToShow(item_num, question_num){
            if (this.showMode==0){return true;} //показвам всички
            else if(this.showMode==1){ //показвам неизползваните
                if(this.theme[item_num].tasks[question_num].showLevel==-1){return true;} //показвам го
                else {return false;} //не го показвам
                }
            else { //показвам използваните
                if(this.theme[item_num].tasks[question_num].showLevel>-1){return true;} //показвам го
                else {return false;} //не го показвам
                }
        },
        setShowLevel(vm){
            for (th of vm.theme){
                for (qst of th.tasks){
                    if (qst.author==vm.user.school){qst.showLevel=1;}
                    else if (qst.school.includes(vm.user.school)){qst.showLevel=0;}
                    else {qst.showLevel=-1;}
                    }
                }
        },
        verifyQuestionQty(level, idx, value){
            if (this.checkQuestionsQty(level, idx)==value){return true}
            else {return false}
        },
        getQuestionsQty(level, idx){
            let q=0
            let th = this.theme[idx]
            if (level==1){q=th.q_knowledge;}
            if (level==2){q=th.q_comprehension;}
            if (level==3){q=th.q_application;}
            if (level==4){q=th.q_analysis;}
            return q
        },
        checkQuestionsQty(level, idx){
            let q=0
            let th = this.theme[idx]
            if (level==1){
                if ((th.q_knowledge==0)&&(th.knowledge==0)) {q=0}
                else if (th.q_knowledge<th.knowledge) {q=1}
                else if (th.q_knowledge<2*th.knowledge) {q=2}
                else {q=3}
                }
            if (level==2){
                if ((th.q_comprehension==0)&&(th.comprehension==0)) {q=0}
                else if (th.q_comprehension<th.comprehension) {q=1}
                else if (th.q_comprehension<2*th.comprehension) {q=2}
                else {q=3}
                }
            if (level==3){
                if ((th.q_application==0)&&(th.application==0)) {q=0}
                else if (th.q_application<th.application) {q=1}
                else if (th.q_application<2*th.application) {q=2}
                else {q=3}
                }
            if (level==4){
                if ((th.q_analysis==0)&&(th.analysis==0)) {q=0}
                else if (th.q_analysis<th.analysis) {q=1}
                else if (th.q_analysis<2*th.analysis) {q=2}
                else {q=3}
                }
            return q
        },
        getLevelName(level){
            let name=''
            if (level==1){name='знание'}
            if (level==2){name='разбиране'}
            if (level==3){name='приложение'}
            if (level==4){name='анализ'}
            return name
        },
        onImageChange(e){
            const file = e.target.files[0]
            this.question.picture = URL.createObjectURL(file)
            // this.theme[this.question.item].picture = URL.createObjectURL(file)
            let formData = new FormData();
            formData.append('id', this.question.id)
            formData.append('picture', file)
            const lvl=this.question.level
            let url =  'api/TaskFile/'
            axios.post(url, formData, {headers: {'X-CSRFToken':CSRF_TOKEN, 'Content-Type': 'multipart/form-data'}})
            txt = 'Променена/качена картинка (тема '+this.theme_num+'; въпрос id='+this.question.id+')'
            this.sendLogRecord(txt)
        },
        make_q(itm, id){ // превключва въпрос в режим на редактиране
            const vm = this;
            vm.flagNewItem = false
            vm.current_item.theme_id=itm
            vm.current_item.task_id=id
            vm.question.id=vm.theme[itm].tasks[id].id
            vm.question.options=vm.theme[itm].tasks[id].options
            vm.question.text=vm.theme[itm].tasks[id].text
            vm.question.type=vm.theme[itm].tasks[id].type
            vm.question.level=vm.theme[itm].tasks[id].level
            vm.question.picture=vm.theme[itm].tasks[id].picture
            vm.question.group=vm.theme[itm].tasks[id].group
            vm.question.item=vm.theme[itm].tasks[id].item
            vm.question.author=vm.theme[itm].tasks[id].author
            vm.question.school=vm.theme[itm].tasks[id].school
            vm.question.textWrap=vm.theme[itm].tasks[id].textWrap
            vm.question.ctx=vm.theme[itm].tasks[id].context
            vm.question.deletedOptions.length = 0;
            vm.editMode = EDIT_OLD_QUESTION
            vm.context_edit_mode=0
        },
        revert(){ // връща данните след редакция за визуализиране в списъка с данни
            let itm = this.current_item.theme_id
            let id = this.current_item.task_id
            let qst = this.theme[itm].tasks[id]
            qst.id=this.question.id
            qst.options=this.question.options
            qst.text = this.question.text
            qst.type = this.question.type
            qst.level = this.question.level
            qst.picture = this.question.picture
            qst.group = this.question.group
            qst.item = this.question.item
            qst.author = this.question.author
            qst.school = this.question.school
            qst.textWrap = this.question.textWrap
        },
        useQuestion(task_id, school_id, action) {
            const vm = this;
            axios.get('api/school-to-task-action/' + task_id + '/' + school_id + '/' + action + '/')
                .then(function (response) {
                    vm.reloadItem(vm)
                })
        },
        copyQuestion(question_id) {
            const vm=this
            axios({
                method:'POST',
                url:'/api/DuplicateTaskRecord/',
                headers:{
                    'X-CSRFToken':CSRF_TOKEN,
                    //'Access-Control-Allow-Origin':'*',
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                data:{
                    task_id: question_id,
                    author_id: this.user.school,
                }
            })
                .then(response => {
                    vm.temp_id = response.data
                    axios.get('/api/theme_items/'+vm.listOfThemes[vm.theme_num].id+'/')
                        .then(function(response){
                            vm.theme = response.data
                            vm.countThemeQuestions()
                            txt = 'Създаден нов въпрос по тема '+vm.theme_num+'; въпрос id='+vm.question.id+')'
                            vm.sendLogRecord(txt)
                            // търся новия въпрос
                            let i = 0
                            for (th of vm.theme){
                                let j = 0
                                for (qst of th.tasks){
                                    if (qst.id==vm.temp_id){
                                        vm.make_q(i, j)
                                        i=-1
                                        break
                                    }
                                    j+=1
                                }
                                i+=1
                                if(i<0){break;}
                            }
                            vm.setShowLevel(vm)
                        })
                })
        },
        make_new_q(itm, lvl){ // създава нов въпрос от съответното ниво към съответната точка от темата
            const vm=this
            axios({
                method:'POST',
                url:'/api/TaskNewQuestionBody/',
                headers:{
                    'X-CSRFToken':CSRF_TOKEN,
                    //'Access-Control-Allow-Origin':'*',
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                data:{
                    level: lvl,
                    item: itm,
                    author: vm.user.school,
                }
            })
            .then(response => {
                vm.temp_id = response.data
                axios.get('/api/theme_items/'+vm.listOfThemes[vm.theme_num].id+'/')
                    .then(function(response){
                        vm.theme = response.data
                        vm.countThemeQuestions()
                        txt = 'Създаден нов въпрос по тема '+vm.theme_num+'; въпрос id='+vm.question.id+')'
                        vm.sendLogRecord(txt)
                        // търся новия въпрос
                        let i = 0
                        for (th of vm.theme){
                            let j = 0
                            for (qst of th.tasks){
                                if (qst.id==vm.temp_id){
                                    vm.make_q(i, j)
                                    i=-1
                                    break
                                    }
                                j+=1
                                }
                            i+=1
                            if(i<0){break;}
                            }
                        vm.setShowLevel(vm)
                    })
            // this.reloadItem()
            })
            .catch(error => {
                throw("Error: ", error);
            })
        },
        countThemeQuestions(){
            function haveToShowLocal(vm, question_){
                if (vm.showMode==0){return true;} //показвам всички
                else if(vm.showMode==1){ //показвам неизползваните
                    if(question_.showLevel==-1){return true;} //показвам го
                    else {return false;} //не го показвам
                    }
                else { //показвам използваните
                    if(question_.showLevel>-1){return true;} //показвам го
                    else {return false;} //не го показвам
                    }
            }
            this.context_count=0
            this.theme.forEach((th) => {
                th.q_knowledge=0
                th.q_comprehension=0
                th.q_application=0
                th.q_analysis=0
                th.tasks.forEach((qst) => {
                    if(haveToShowLocal(this, qst)){
                        if (qst.level==1){th.q_knowledge+=1}
                        else if (qst.level==2){th.q_comprehension+=1}
                        else if (qst.level==3){th.q_application+=1}
                        else {th.q_analysis+=1}
                        }
                    if(qst.context){this.context_count+=1}
                    });
                });
        },
        addEmptyOption(){
            let newOption = {
                            id: 0,
                            leading_char: "",
                            text: "",
                            value: "",
                            value_name: "",
                            checked: false,
                            task:this.question.id,
                            collapsed:true
                        }
            this.question.options.push(newOption)
            this.flagNewItem = true
        },
        copyOption(idx){
            // Създавам копие на елемент с индекс idx
            let copyOfOption = { ...this.question.options[idx] }; // или Object.assign({}, options[0])

            // Променям `id`, за да е уникален (ако е необходимо)
            copyOfOption.id = 0; // Уникален ID за копието

            // Вмъквам копието след елемент с индекс idx
            this.question.options.splice(idx+1, 0, copyOfOption);

            this.flagNewItem = true
        },
        deleteOption(idx){
            if (this.question.options[idx].id>0){
                this.question.deletedOptions[this.question.deletedOptions.length]=this.question.options[idx].id
                }
            this.question.options.splice(idx, 1)
            this.flagNewItem = true
        },
        deleteTask(idn){
            vm = this
            axios({
                method:'POST',
                url:'/api/TaskDelete/',
                headers:{
                    'X-CSRFToken':CSRF_TOKEN,
                    //'Access-Control-Allow-Origin':'*',
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                data:{
                    id: idn,
                }
            })
            .then(response => {
                vm.reloadItem(vm)
                txt = 'Изтрит е въпрос от тема '+vm.theme_num+' ; въпрос id='+idn+')'
                vm.sendLogRecord(txt)
            })
            .catch(error => {
                throw("Error: ",error);
            })
        },
        saveOption(i){
            vm = this
            axios({
                method:'POST',
                url:'/api/TaskSaveQuestionOption/'+this.question.options[i].id+'/'+this.question.id+'/',
                headers:{
                    'X-CSRFToken':CSRF_TOKEN,
                    //'Access-Control-Allow-Origin':'*',
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                data:{
                    id: this.question.options[i].id,
                    ids: this.question.options[i].id,
                    task: this.question.options[i].task,
                    leading_char: this.question.options[i].leading_char,
                    text: this.question.options[i].text,
                    value: this.question.options[i].value,
                    value_name: this.question.options[i].value_name,
                    checked: this.question.options[i].checked,
                }
            })
            .then(response => {
                txt = 'Запазени промени във въпрос по тема '+vm.theme_num+' ; въпрос id='+vm.question.id+')'
                vm.sendLogRecord(txt)
            })
            .catch(error => {
                throw("Error: ",error);
            })
        },
        saveQuestionBody(){
            vm = this
            console.log(vm.question.ctx)
            axios({
                method:'POST',
                url:'/api/TaskSaveQuestionBody/',
                headers:{
                    'X-CSRFToken':CSRF_TOKEN,
                    //'Access-Control-Allow-Origin':'*',
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                data:{
                    id: this.question.id,
                    ids: this.question.id,
                    text: this.question.text,
                    type: this.question.type,
                    level: this.question.level,
                    group: this.question.group,
                    item: this.question.item,
                    textWrap: this.question.textWrap,
                    context: this.question.ctx,
                }
            })
            .then(response => {
                for (ggg=0; ggg < vm.question.options.length; ggg++){
                    vm.saveOption(ggg)}
                if(vm.flagNewItem){
                    vm.flagNewItem = false

                    }
                vm.reloadItem(vm)
            })
            .catch(error => {
                throw("Error: ",error);
            })
        },
        save(){
            const vm = this;
            /* 1. премахвам изтритите опции на въпроса*/
            axios({
                method:'POST',
                url:'/api/TaskDelItem/',
                headers:{
                    'X-CSRFToken':CSRF_TOKEN,
                    //'Access-Control-Allow-Origin':'*',
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                data:{
                    ids: this.question.deletedOptions,
                }
            })
            .then(response => {
                vm.saveQuestionBody()
            })
            .catch(error => {
                throw("Error: ",error);
            })
            this.revert()
        },
        reloadItem(vm){
            axios.get('/api/theme_items/'+vm.listOfThemes[vm.theme_num].id+'/')
            .then(function(response){
                vm.theme = response.data
                vm.countThemeQuestions()
                vm.setShowLevel(vm)
                })
        },
        sendLogRecord(txt){
            const vm=this
            axios({
                method:'POST',
                url:'/api/SaveLogRecord/',
                headers:{
                    'X-CSRFToken':CSRF_TOKEN,
                    //'Access-Control-Allow-Origin':'*',
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                data:{
                    action: txt,
                }
            })
        },
        addRemark(){
            axios({
                method:'POST',
                url:'/api/AddRemark/',
                headers:{
                    'X-CSRFToken':CSRF_TOKEN,
                    //'Access-Control-Allow-Origin':'*',
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                data:{
                    text: this.remark.text,
                    task_id: this.remark.task_id,
                }
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
                vm.reloadItem(vm)
            })
        },
        changeTheme(theme_num){
            const vm = this;
            axios.get('api/set_user_theme/'+theme_num+'/') // темите са различни за всяка специалност
            .then(function(response){
                vm.loadUserDetails()
            })
        },
        loadRemarks(task_id){
            const vm = this;
            axios.get('/api/remarks/'+task_id+'/')
            .then(function(response){
                vm.remarks = response.data
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
        formatDate(dateString) {
            // Преобразуване на ISO 8601 дата в JavaScript Date обект
            const date = new Date(dateString);

            // Извличане на ден, месец и година
            const day = String(date.getDate()).padStart(2, '0'); // Добавя 0 отпред, ако е необходимо
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Месеците са от 0 до 11
            const year = date.getFullYear();

            // Извличане на час и минути
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');

            // Форматиране в желания формат: дд-мм-гггг чч:мм
            return `${hours}:${minutes} ${day}/${month}/${year}`;
        },
        editEnabled(theme_num, task_num) {
            if (this.theme[theme_num].tasks[task_num].showLevel==1) {
                return true
            }
            return false;
        },
        addToGroup(item, task){
            this.grouping.active=true
            this.grouping.item_num=item
            this.grouping.task_num=task
        },
        showAddToGroup(item, task){
            let result = true
            if(!this.grouping.active){result=false}
            if((item == this.grouping.item_num)&&(task == this.grouping.task_num)){result=false}
            if(this.theme[item].tasks[task].showLevel == -1){result=false}

            return result
        },
        saveGroup(item, task){
            const vm = this;
            this.grouping.active=false;
            this.temp_item_num=item
            this.temp_task_num=task
            axios({
                method:'POST',
                url:'/api/group/',
                headers:{
                    'X-CSRFToken':CSRF_TOKEN,
                    //'Access-Control-Allow-Origin':'*',
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                data:{
                    source_id: this.theme[this.grouping.item_num].tasks[this.grouping.task_num].id,
                    target_id: this.theme[item].tasks[task].id,
                }
            })
                .then(response => {
                    let gr=response.data
                    vm.theme[vm.grouping.item_num].tasks[vm.grouping.task_num].group=gr
                    vm.theme[vm.temp_item_num].tasks[vm.temp_task_num].group=gr
                })
        },
        clearGroup(item, task){
            const vm = this;
            this.grouping.active=false
            this.grouping.item_num=item
            this.grouping.task_num=task
            axios.get('/api/clear_group/'+this.theme[item].tasks[task].id+'/')
                .then(function(response){
                    vm.theme[vm.grouping.item_num].tasks[vm.grouping.task_num].group=0
                })
        },
        setContext(item, task){
            this.question.ctx=this.theme[item].tasks[task].context
            console.log(this.question.ctx)
            console.log(this.user)
            this.context_edit_mode=0
        },
        newContext(){
            const vm = this;
            console.log(`Създадaва нов контекст --> author=${this.user.school}; ask_id=${this.theme[vm.current_item.theme_id].tasks[vm.current_item.task_id].id}`)
            axios({
                method:'POST',
                url:'/api/NewContext/',
                headers:{
                    'X-CSRFToken':CSRF_TOKEN,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                data:{
                    author: this.user.school,
                    task_id: this.theme[vm.current_item.theme_id].tasks[vm.current_item.task_id].id,
                }
            })
                .then(response => {
                    console.log('Създаден е нов контекст с id='+response.data)
                    vm.theme[vm.current_item.theme_id].tasks[vm.current_item.task_id].context=response.data[0]
                    vm.make_q(vm.current_item.theme_id, vm.current_item.task_id)
                    vm.context_count+=1
                    vm.context_edit_mode=2
                })
        },
        onContextImageChange(e){
            const file = e.target.files[0]
            this.question.ctx.picture = URL.createObjectURL(file)
            // this.theme[this.question.item].picture = URL.createObjectURL(file)
            let formData = new FormData();
            formData.append('id', this.question.ctx.id)
            formData.append('picture', file)
            let url =  'api/ContextFile/'
            axios.post(url, formData, {headers: {'X-CSRFToken':CSRF_TOKEN, 'Content-Type': 'multipart/form-data'}})
            txt = 'Променена/качена картинка за контекст (id='+this.question.ctx.id+')'
            this.sendLogRecord(txt)
        },
        clearContext(){
            this.context_edit_mode=0;
            this.question.ctx=null;
            this.countThemeQuestions()
            },
    },
    created: function(){
        this.loadUserDetails();
    }
}

Vue.createApp(App).mount('#main')
