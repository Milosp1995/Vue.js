<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <Dashboard @submitConfig="getQuestionsForQuiz" v-if="isDashboardState"/>
  <Questions v-if="isQuestionsState" :questions="bulkQuestions" @submitScore="displayScore"/>
  <Results v-if="isResultsState"/>
</template>

<script>
import axios from 'axios'
import Dashboard from './components/Dashboard.vue'
import Questions from './components/Questions.vue'
import Results from './components/Results.vue'
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    Dashboard,
    Questions,
    Results
  },
  computed: {
    isDashboardState () {
      return this.quizState == 'dashboard'
    },
    isQuestionsState () {
      return this.quizState == 'questions'
    },
    IsResultsState () {
      return this.quizState == 'results'
    }
  },
  data() {
    return {
      quizState: 'dashboard',
      bulkQuestions: []
    }
  },
  methods: {
    getQuestionsForQuiz (config) {
      console.log(config);
      var self = this;
      axios.get(`https://opentdb.com/api.php?amount=${config.numberOfQuestions}&category=${config.category}`).then(response => {
        console.log(response)
        this.bulkQuestions = response.data.results;
        this.quizState = 'questions';
        console.log(self.bulkQuestions);
      });
    },
    displayScore(answers){
     var list = answers.reduce((acc, e) => {
        if(e) {
          acc.correct++;
        } else {
          acc.falseAns++;
        }
        return acc;
      }, {correct: 0, falseAns: 0});

      alert(`Correct: ${list.correct} False: ${list.falseAns}`);
    },
    
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
