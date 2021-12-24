import ECharts from './ECharts'
import {createApp} from "vue";

/**
 * 初始化安装本地公共组件
 */
export default (app: ReturnType<typeof createApp>) => {
  app.use(ECharts as any)
}
