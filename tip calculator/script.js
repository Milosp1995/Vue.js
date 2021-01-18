const app = Vue.createApp({
    data() {
        return {

             billamt: '',
             serviceQual: 0, 
             peopleamt: '' ,
             isDisplayed: false
             


        }
    },
    computed: {
        tip () {
            return this.billamt * this.serviceQual;
        },
        totalBill () {
            return parseInt(this.billamt) + parseInt(this.tip);
            
        },
        billPerPerson () {
            return this.totalBill / parseInt(this.peopleamt);
        }
        
    },
    methods: {
        calculate() {
           this.isDisplayed = true;
        }
    },
});

app.mount("#app");