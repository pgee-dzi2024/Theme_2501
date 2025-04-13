const App = {
    delimiters: ['[[', ']]'], // Променяме синтаксиса на [[ ]]
    data() {
        return {
            c_user:{
                  id: 1,
                  username: "superadmin",
                  email: "ggborikov@abv.bg",
                  first_name: "Георги",
                  last_name: "Бориков",
                  userprofile: {
                      gender: true,
                      school: 1,
                      access_level: 1,
                      session_screen: 1,
                      session_theme: 1,
                      speciality: {
                          id: 1,
                          professional_field_num: "523",
                          professional_field_name: "Електроника, автоматика, комуникационна и компютърна техника",
                          profession_num: "523050",
                          profession_name: "Техник на компютърни системи",
                          specialty_num: "5230501",
                          specialty_name: "Компютърна техника и технологии",
                          nip: "/media_files/docs/nip_5230501.pdf"
                          }
                      }
                  },
            listOfUsers: [],
            listOfSpecialties: [],
            user:{},
            password_1:'',
            password_2:'',
        }
    },
    computed: {
        equalPasswords() {
            return (this.password_1 === this.password_2) && (this.password_1.length > 5);
        },
    },
    methods: {
        saveUserLogic(){
            if(this.c_user.id === 0) {
                this.createUser()
            }
            else {this.saveUser()}
        },
        makeNewUser(lvl,spec){
            this.c_user.id= 0
            this.c_user.username=''
            this.c_user.email=''
            this.c_user.first_name=''
            this.c_user.last_name=''
            this.c_user.userprofile.gender=true
            this.c_user.userprofile.school=this.user.school
            this.c_user.userprofile.access_level=lvl
            this.c_user.userprofile.speciality=this.user.speciality
            if(spec>0){this.c_user.userprofile.speciality=spec}
        },
        changeUserPassword(){
            let vm = this;
            axios({
                method:'POST',
                url:'/api/save-user/',
                headers:{
                    'X-CSRFToken':CSRF_TOKEN,
                    //'Access-Control-Allow-Origin':'*',
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                data:{
                    id: this.c_user.id,
                    new_password: this.password_1,
                }
            })
                .then(response => {
                })

        },
        deleteUser(){
            let vm = this;
            axios.get('/api/delete-user/'+this.c_user.id+'/')
                .then(function(response){
                    vm.loadUsers(vm.user)
                })

        },
        saveUser(){
            let vm = this;
            axios({
                method:'POST',
                url:'/api/save-user/',
                headers:{
                    'X-CSRFToken':CSRF_TOKEN,
                    //'Access-Control-Allow-Origin':'*',
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                data:{
                    id: this.c_user.id,
                    username: this.c_user.username,
                    email: this.c_user.email,
                    first_name: this.c_user.first_name,
                    last_name: this.c_user.last_name,
                    userprofile: {
                        gender: this.c_user.userprofile.gender,
                    }
                }
            })
                .then(response => {
                    vm.loadUsers(vm.user)
                })

        },
        createUser(){
            let vm = this;
            axios({
                method:'POST',
                url:'/api/save-user/',
                headers:{
                    'X-CSRFToken':CSRF_TOKEN,
                    //'Access-Control-Allow-Origin':'*',
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                data:{
                    id: 0,
                    username: this.c_user.username,
                    email: this.c_user.email,
                    password: '_123456_',
                    first_name: this.c_user.first_name,
                    last_name: this.c_user.last_name,
                    userprofile: {
                        gender: this.c_user.userprofile.gender,
                        school: this.c_user.userprofile.school,
                        access_level: this.c_user.userprofile.access_level,
                        speciality: this.c_user.userprofile.speciality,
                    }
                }
            })
                .then(response => {
                    vm.loadUsers(vm.user)
                })
        },
        editUser(num){
            this.c_user = this.listOfUsers[num];
            this.password_1 = ''
            this.password_2 = ''
        },
        countUsers(l,s){
            let result = 0
            for(let usr of this.listOfUsers){
                if(usr.userprofile.access_level === l){
                    if(s===0){result++}
                    else {if(usr.userprofile.speciality.id===s){result++}}
                }
            }
            return result
        },
        loadUsers(logged_user){
            // чета списъка на всички потребители които са от същото училище, като влезлия потребител, и са от ниво под неговото
            // admin вижда всички в училището, teacher вижда учениците
            const vm = this;
            axios.get('/api/users-list/'+logged_user.school+'/'+logged_user.user_level_num+'/')
                .then(function(response){
                    vm.listOfUsers = response.data
                })
        },
        loadSpecialties(logged_user){
            // чета списъка на всички специалности които са от същото училище, като влезлия потребител
            const vm = this;
            axios.get('/api/schools/'+logged_user.school+'/specialties/')
                .then(function(response){
                    vm.listOfSpecialties = response.data
                })
        },

        loadUserDetails(){
            const vm = this;
            axios.get('/api/context/')
                .then(function(response){
                    vm.user = response.data
                    vm.loadUsers(vm.user)
                    vm.loadSpecialties(vm.user)
                })
        },
    },
    created: function(){
        this.status = 0
        this.loadUserDetails();
    }
}

Vue.createApp(App).mount('#main')
