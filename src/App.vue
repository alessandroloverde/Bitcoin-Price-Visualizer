<template>
  <div id="app">
    <section class="controls">
      <form @submit.prevent="updateChart()">
        <fieldset>
          <datepicker 
            name="startDate"
            :value="startSource"
            @selected="updateDate($event, 'startDate')"
          />
          <input type="text" :value="startSource">
        </fieldset>
        <fieldset>
          <datepicker 
            name="endDate"
            :value="endSource"
            @selected="updateDate($event, 'endDate')"
          />
          <input type="text" :value="endSource">
        </fieldset>
        <button type="submit">Render chart</button>
      </form>
    </section>
    <line-chart :chart-data="chartData" :options="chartOptions"/>
  </div>
</template>

<script>
import LineChart from './components/Chart.vue'
import Datepicker from 'vuejs-datepicker'
import moment from 'moment'


export default {
  name: 'App',
  components: {
    LineChart, Datepicker
  },
  data() {
    return {
      chartData: {
        labels: ['January', 'February', 'March', 'April'],
        datasets: [{
          label: 'Data legend',
          backgroundColor: '#f87979',
          data: [4000, 2000, 2500, 1200],
          startDate: '2013-09-01',
          endDate: '2015-09-02'
        }]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      },
      datepicker: {
        start: moment(new Date()).subtract(10, "days").format('YYYY-MM-DD'),
        end: moment(new Date()).format('YYYY-MM-DD')
      }   
    }
  },
  computed: {
      startSource: function() {
        return this.chartData.datasets[0].startDate
      },
      endSource: function() {
        return this.chartData.datasets[0].endDate
      }
  },
  methods: {
    updateDate(date, type) {
      const formattedDate = moment(date).format('YYYY-MM-DD');
      
      if(type == 'startDate') {
        date = formattedDate;
        this.chartData.datasets[0].startDate = formattedDate;
        this.datepicker.start = formattedDate;

      } else {
        date = formattedDate;
        this.chartData.datasets[0].endDate = formattedDate;
        this.datepicker.end = formattedDate;    
      }
      
    },
    async updateChart() {
      alert('update chart')

      await this.fetchData();
    },
    async fetchData() {
      try {
        const response = await fetch(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${this.startSource}&end=${this.endSource}`)
        let fetchData = await response.json();

       // console.log(this.startSource, this.endSource, fetchData.bpi)
      } catch(error) {
        console.log('error')
      }
    }
  }

} 
</script>

<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  fieldset { 
    border: none;
    display: inline-block; 
    }
  .controls {
    background-color: beige;
    border-radius: 12px;
    border: 1px solid darken(beige, 30%);

    form {
      display: flex;
      justify-content: flex-start;
      margin: 1rem;
    }
    button[type="submit"] { margin-left: auto; }
  }
</style>
