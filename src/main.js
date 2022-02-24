import { createApp } from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue3-loading-overlay'
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
// 匯入 vee-validate 主套件
import {
  Field, Form, ErrorMessage, defineRule, configure
} from 'vee-validate'
// 匯入 vee-validate 相關規則
import { required, email, min } from '@vee-validate/rules'
// 匯入多國語系的功能
import { localize, setLocale } from '@vee-validate/i18n'
// 匯入繁體中文語系檔案
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json' // 直接載入模組裡的json設定
import App from './App.vue'
import router from './router'
import { currency, date } from './methods/filters'
import { getCart } from './methods/cartTotal'
import $pushMessageState from './methods/pushMessageState'

// 定義驗證規則
defineRule('required', required)
defineRule('email', email)
defineRule('min', min)
// 設定 vee-validate 全域規則
configure({
  generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系
  validateOnInput: true // 當輸入任何內容直接進行驗證
})
// 設定預設語系
setLocale('zh_TW')

const app = createApp(App)
app.config.globalProperties.$filters = {
  currency, date
}
app.config.globalProperties.$cartsTotal = getCart
app.config.globalProperties.$pushMessageState = $pushMessageState

app.use(VueAxios, axios)
app.use(router)
app.component('Loading', Loading)
// 註冊 vee-validate 三個全域元件
app.component('Form', Form)
app.component('Field', Field)
app.component('ErrorMessage', ErrorMessage)
app.mount('#app')
