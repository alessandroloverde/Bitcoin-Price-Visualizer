<template>
  <div id="app">
    <line-chart :chart-data="chartData" :options="chartOptions"/>
  </div>
</template>

<script>
import LineChart from './components/Chart.vue';

export default {
  name: 'App',
  components: {
    LineChart
  },
  data() {
    return {
      chartData: {
      labels: ['January', 'February'],
      datasets: [
        {
          label: 'Data One',
          backgroundColor: '#f87979',
          data: [40, 20]
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

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -moz-osx-font-smoothing: grayscale;
   -webkit-font-smoothing: antialiased;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
