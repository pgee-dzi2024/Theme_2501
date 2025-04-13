const App = {
    data() {
        return {
           user:{},
        }
    },
    methods: {
        loadUserDetails(){
            const vm = this;
            axios.get('/api/context/')
                .then(function(response){
                    vm.user = response.data
                    console.log(vm.user);
                })
        },
    },
    created: function(){
        this.loadUserDetails();
    }
}

Vue.createApp(App).mount('#main')