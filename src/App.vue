<template>
  <div id="app">
    <Loading
      :active="!loaded"
      :can-cancel="false"
      :is-full-page="true"
    />
    <section class="controls">
      <form @submit.prevent="updateChart()">
        <fieldset>
          <Datepicker 
            name="startDate"
            :value="startSource"
            :disabled-dates="disabledDates"
            @selected="updateDate($event, 'startDate')"
          />
          <input type="text" :value="startSource">
        </fieldset>
        <fieldset>
          <Datepicker 
            name="endDate"
            :value="endSource"
            :disabled-dates="disabledDates"
            @selected="updateDate($event, 'endDate')"
          />
          <input type="text" :value="endSource">
        </fieldset>
        <button type="submit">Render chart</button>
      </form>
    </section>
    <div id="chartWrapper">
     <line-chart v-if="loaded" :chart-data="chartData" :options="chartOptions"/>
    </div>
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay'
import LineChart from './components/Chart.vue'
import Datepicker from 'vuejs-datepicker'
import moment from 'moment'
import 'vue-loading-overlay/dist/vue-loading.css'


export default {
  name: 'App',
  components: {
    LineChart, Datepicker, Loading
  },
  data() {
    return {
      loaded: false,
      chartData: {
        labels: [],
        datasets: [{
          data: [],
          startDate: moment(new Date()).subtract(10, "days").format('YYYY-MM-DD'),
          endDate: moment(new Date()).format('YYYY-MM-DD'),
        }]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
      },
      disabledDates: {
        from: new Date()
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
      type === 'startDate' ? this.chartData.datasets[0].startDate = moment(date).format('YYYY-MM-DD') : this.chartData.datasets[0].endDate = moment(date).format('YYYY-MM-DD')
    },
    async updateChart() {
      this.loaded = false;
      
      await this.fetchData();
    },
    async fetchData() {
      try {
        const response = await fetch(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${this.startSource}&end=${this.endSource}`)
        let fetchData = await response.json();

        this.chartData = {
          labels: Object.keys(fetchData.bpi),
          datasets: [{
            data: Object.values(fetchData.bpi),
            backgroundColor: '#BFC8AD',
            borderColor: '#90B494',
            startDate: moment(new Date()).subtract(10, "days").format('YYYY-MM-DD'),
            endDate: moment(new Date()).format('YYYY-MM-DD'),
          }],       
          chartOptions: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
          },
        }
        this.loaded = true;
      } catch(error) {
        this.loaded = true;
        console.log('error')
      }
    }
  },
  async mounted() {
    this.loaded = false

    await this.fetchData()
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
  #chartWrapper {

  }
</style>
