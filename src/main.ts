import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
import installComponents from './components'

const app: ReturnType<typeof createApp> = createApp(App)

installElementPlus(app)
installComponents(app)

app.use(store).use(router).mount('#app')
