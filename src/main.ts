import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createPinia } from 'pinia'
import { Quasar } from 'quasar'

const pinia = createPinia()

const myApp = createApp(App)

myApp.use(Quasar, {
  plugins: {}, 
})
myApp.use(pinia) 

myApp.mount('#app')
