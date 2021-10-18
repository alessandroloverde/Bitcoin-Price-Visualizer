<script>
import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  name: 'LineChart',
  extends: Line,
  mixins: [reactiveProp],
  props: {
    chartData: {
      type: Object,
      default: null
    },
    chartOptions: {
      type: Object,
      default: null
    },
    solidColor: {
      type: String,
      default: 'cyan'
    },
    transparentColor: {
      type: String,
      default: 'lime'
    }
  },
  mounted () {
    const ctx = document.getElementById('line-chart').getContext('2d')
    const backgroundColor = ctx.createLinearGradient(0, 0, 0, 400)
    const style = getComputedStyle(document.getElementById('app'))

    backgroundColor.addColorStop(0, this.solidColor)
    backgroundColor.addColorStop(1, this.transparentColor)

    const data = {
      ...this.chartData,
      // TODO: check fix
      // eslint-disable-next-line vue/no-mutating-props
      ...this.chartData.datasets[0].backgroundColor = backgroundColor
    }

    this.renderChart(data, {
      responsive: true,
      maintainAspectRatio: false,
      legend: false,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: false,
            fontColor: style.getPropertyValue('--txtColour-1')
          },
          gridLines: {
            color: style.getPropertyValue('--accentColour'),
            lineWidth: 1
          }
        }],
        xAxes: [{
          ticks: {
            fontColor: style.getPropertyValue('--txtColour-1')
          },
          gridLines: {
            color: style.getPropertyValue('--accentColour'),
            lineWidth: 1
          }
        }]
      }
    })
  }
}
</script>

<style lang="scss">
/* === Colours =========================================================================================== */
  @import url('https://fonts.googleapis.com/css2?family=Arimo:wght@500;600;700;800&display=swap');

  $standarMargin: 3rem;
  $borderRadius: 20px;
  $buttonsPadding: $standarMargin/4 $standarMargin/2;

  :root {
    --ctoColour: #f5822e;
    --bkgColour: #2b2b42;
    --bkgColour-light: #4e5586;
    --bkgColour-lighter: #8d8dbe;
    --txtColour-1: #cdcede;
    --txtColour-2: var(--txtColour-1);
    --accentColour: rgba(90,132,252, 0.5);
  }
  .lightTheme {
    --ctoColour:#e2816a;
    --bkgColour:#efefef;
    --bkgColour-light: #5e5055;
    --bkgColour-lighter: #dee0df;
    --txtColour-1: var(--ctoColour);
    --txtColour-2: #dee0df;
    --accentColour: rgba(226,129,106, 0.5);
  }
/* ======================================================================================================= */

  @mixin buttonAspect {
    padding: $buttonsPadding;
    color: var(--txtColour-2);
    font-family: 'Arimo', sans-serif;
    font-weight: 800;
    font-size: 1rem;
    border-radius: $borderRadius;
    border: 2px solid transparent;
  }

  .appContainer {
    color: var(--txtColour-1);
    margin: 2 * $standarMargin;
    padding: $standarMargin;
    border-radius: $borderRadius;
    background-color: var(--bkgColour);
  }
  .icon {
    width: 1.5em;
    height: 1.5em;
    color: var(--bkgColour-light);
    border: 4px solid var(--txtColour-1);
    background-color: var(--bkgColour-lighter);
    border-radius: 50%;
    padding: 0;
    display: flex;
    margin-right: $standarMargin/2;
    justify-content: center;
    line-height: 1.35;
    }
  #chartWrapper {
    padding: $standarMargin;
    position: relative;
  }
  fieldset {
    border: none;
    display: inline-block;

    & + fieldset {
      margin-left: $standarMargin/2;
    }
    label {
      display: inline-block;
      margin-left: $standarMargin/2;
      margin-bottom: 4px;
    }
  }
  .controls {
    background-color: var(--bkgColour);
    border-radius: $borderRadius;
    margin-bottom: $standarMargin;

    & > header {
      display: flex;
      align-items: center;
      padding-bottom: $standarMargin;
      justify-content: flex-start;

      fieldset { margin-left: auto;}
      label { margin-right: 1rem;}
    }
    form {
      display: flex;
      justify-content: flex-start;
      align-items: flex-end;
    }
    button[type="submit"] {
      @include buttonAspect;

      background-color: var(--ctoColour);
      margin-left: auto;
      color: white;
      text-transform: uppercase;
      letter-spacing: 0.5px;

      &:hover {
        cursor: pointer;
        background-color: var(--accentColour);
      }
    }
    input[type="text"] {
      @include buttonAspect;

      border: 2px solid transparent;
      background-color: var(--bkgColour-light);

      &:focus {
        border-color: var(--ctoColour);
      }
      &:focus-visible {
        outline: none;
      }
    }
    #modeSelector {
      @include buttonAspect;

      border: 2px solid transparent;
      background-color: var(--bkgColour-light);
    }
    .vdp-datepicker__calendar {
      background-color: var(--bkgColour-light);
      color: var(--txtColour-1);
      border-radius: $borderRadius;
      border: 2px solid var(--ctoColour);
      padding: 0.5rem;
      margin-top: 0.5rem;

      .cell.day.selected {
        border-radius: 50%;
        color: var(--txtColour-2);
        background-color: var(--ctoColour);
        font-weight: 700;
      }
      .cell.month.selected,
      .cell.year.selected {
        background-color: var(--ctoColour);
      }
      .cell:not(.blank):not(.disabled).day:hover {
        border-radius: 50%;
        border: 2px solid var(--ctoColour);
      }
      .cell:not(.blank).disabled.day {
        color: var(--bkgColour-lighter);
      }
      header .prev:not(.disabled):hover,
      header .next:not(.disabled):hover {
        border-radius: 50%;
        background: var(--bkgColour-lighter);
      }
      header .up:not(.disabled):hover {
        border-radius: 1em;
        background: var(--bkgColour-lighter);
      }
      .prev::after { border-right-color: var(--ctoColour); }
      .next::after { border-left-color: var(--ctoColour); }
      .prev.disabled::after { border-right-color: var(--bkgColour-lighter); }
      .next.disabled::after { border-left-color: var(--bkgColour-lighter); }
    }
  }
</style>
