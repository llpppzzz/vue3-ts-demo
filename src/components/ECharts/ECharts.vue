<template>
  <div class="echarts" ref="chartEl"></div>
</template>

<script>
/**
 * echart vue组件封装。
 * 内部处理echart.js的依赖加载。
 * 解决echart 重绘的问题。
 * @example
 *   chart(:options="options")
 */
import {defineComponent, defineEmits, ref, watch, nextTick, onMounted, onUnmounted} from 'vue';
import { isEmpty } from '@/utils'
import { mapState } from 'vuex'
import echarts from 'echarts/lib/echarts'
import customTheme from './theme.json'
echarts.registerTheme('customTheme', customTheme)

const emits = defineEmits(['ready', 'click', 'chartclick'])

const MOUSE_EVENTS = [
  'click'
]

export default defineComponent({
  name: 'Echarts',
  props: {
    options: Object,
    initOptions: Object,
    theme: {
      type: [String, Object],
      default: 'customTheme'
    }
  },
  setup (props) {
    const chartInstance = ref(null)
    const chartEl = ref(null)

    function init () {
      const chart = echarts.init(chartEl, props.theme)
      const empty = isEmpty(props.initOptions, false)
      if (props.initOptions && !empty) {
        chart.setOption(props.initOptions)
      }
      chart.setOption(props.options)

      MOUSE_EVENTS.forEach(event => {
        chart.off(event) // 防止重复注册同一事件
        chart.on(event, params => {
          emits(event, params)

          // 考虑往后兼容
          emits('chart' + event, params)
        })
      })

      chartInstance.value = chart
      emits('ready', chartInstance)
    }

    watch(props.options, (options) => {
      if (!chartInstance.value && options) {
        nextTick(() => {
          init()
        })
      } else {
        nextTick(() => {
          const empty = isEmpty(props.initOptions, false)
          if (props.initOptions && !empty) {
            chartInstance.value.setOption(props.initOptions, true)
          }
          chartInstance.value.setOption(props.options)
        })
      }
    }, {immediate: true})

    onMounted(() => {
      if (props.options) {
        nextTick(() => {
          init()
        })
      }
    })
    onUnmounted(() => {
      if (chartInstance.value) {
        chartInstance.value.dispose()
        chartInstance.value = null
      }
    })
    return {
      chartEl
    }
  }
});
</script>

<style lang="scss">
.echarts {
  width: 350px;
  height: 350px;
}
</style>
