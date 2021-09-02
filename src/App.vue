<template>
  <div id="app">
    <section class="controls">
      <form>
        <fieldset>
          <datepicker 
            name="startDate"
            :value="new Date('2013-09-01')"
          />
        </fieldset>
        <fieldset>
          <datepicker 
            name="endDate"
            :value="new Date('2016-10-02')"
          />
        </fieldset>
        <button type="submit">Render chart</button>
      </form>
    </section>
    <line-chart :chart-data="chartData" :options="chartOptions"/>
  </div>
</template>

<script>
import LineChart from './components/Chart.vue'
import Datepicker from 'vuejs-datepicker';


export default {
  name: 'App',
  components: {
    LineChart, Datepicker
  },
  data() {
    return {
      chartData: {
      labels: ['January', 'February', 'March', 'April'],
      datasets: [
        {
          label: 'Data One',
          backgroundColor: '#f87979',
          data: [40, 20, 25, 12]
        }
      ]
    },
    chartOptions: {
      responsive: true,
      maintainAspectRatio: false
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
