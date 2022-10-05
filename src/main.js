import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/styles/index.scss'
import SvgIcon from '@/icons'
import '@/router/permission'
import * as ELIcons from '@element-plus/icons-vue'
import i18n from '@/i18n'
import filter from './utils/filters'
const app = createApp(App)

for (const iconName in ELIcons) {
  app.component(iconName, ELIcons[iconName])
}
SvgIcon(app)
filter(app)
app.use(ElementPlus).use(store).use(router).use(i18n).mount('#app')
