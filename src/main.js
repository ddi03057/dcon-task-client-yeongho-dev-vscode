import {createApp} from 'vue'
import App from './App.vue'
import Router from "./router";
import store from '@/store/store';
import {createI18n} from 'vue-i18n'
import ko from './lang/kr'
import en from './lang/en'
import VueCookies from "vue-cookies"

import * as Keycloak from "keycloak-js";


import Toaster from '@meforma/vue-toaster'
import MainService from './services/MainService'
import UrlsConfig from './config/urls.conf'
import APICaller, {APISetting} from './library/APICaller'
import UUID from "vue3-uuid";
import mitt from 'mitt'
import 'vue-next-select/dist/index.min.css'
import 'vue-next-select/dist/vue-next-select.cjs.js'
//import GlobalComponentPlugins from "@/components/utils/globalComponentPlugins";
import VueSelect from 'vue-next-select'
import VueCryptojs from 'crypto-js'
import BootstrapVue3 from 'bootstrap-vue-3'
import VueSidebarMenu from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
import 'bootstrap/dist/css/bootstrap.css'
import "bootstrap"
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import "bootstrap/dist/js/bootstrap.js"
import PrismCode from './components/PrismCode.vue'
/* import the fontawesome core */
import {library} from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

/* import specific icons */
import {faUserSecret} from '@fortawesome/free-solid-svg-icons'

const eventBus = mitt()
const emitter = mitt();

library.add(faUserSecret)
const app = createApp(App);

if (process.env.NODE_ENV !== 'production') {
 APISetting.debugMode = true
}

const messages = {
  ko,
  en
}
const i18n = createI18n({
  legacy: false,
  locale: 'ko',
  messages
})


//APISetting.debugMode = true

app.use(store);
app.use(Router);
app.use(i18n);
app.use(UUID)
app.use(VueCookies)
app.use(VueCryptojs)
//app.use(GlobalComponentPlugins)
app.use(BootstrapVue3)
app.use(Toaster, {
  position: 'top'

}).provide('toast', app.config.globalProperties.$toast)
app.use(VueCookies, {
  expireTimes: "10h",
  path: "/",
  domain: "",
  secure: true,
  sameSite: "None"
});
app.use(VueSidebarMenu)
app.component('vue-select', VueSelect)
app.config.globalProperties.emitter = emitter
app.config.globalProperties.eventBus = eventBus
//app.use(VueCookies)
app.component('prism-code', PrismCode)
app.component('font-awesome-icon', FontAwesomeIcon)
var keycloak;

MainService.getProfile().then(function(result){
  if(!result.data && result.data.code != 0){
    return;
  }
  let profileData = result.data.resultData;

  let initOptions = {
    url: profileData.url,
    realm: profileData.realm,
    clientId: UrlsConfig.clientId,

    onLoad: 'login-required',
    checkLoginIframe: false,
  }

  init(initOptions)

});
function init(initOptions){
  let keycloak = Keycloak(initOptions);

  keycloak.init({ onLoad: initOptions.onLoad })
    .then((auth) =>{

      if(!auth){
        keycloak.login();
      }
      window.urlsConfig = UrlsConfig;
      window.keycloak = keycloak

      APICaller.interceptors.start();

      //
      app.mount("#app");
    }).catch((e) =>{
    console.error(e);
    console.error('error init keycloak ');
  });
  //app.mount("#app");
}
function getTopDomain(){

  let url = new URL(window.location.href);
  return "." + url.hostname.split(/\./).slice(-2).join('.');
}

function clearLocalCookieAndState(){
  VueCookies.remove(UrlsConfig.session_timestamp_key, '/', getTopDomain());
}

function doLogin(){
  window.keycloak.login();
}
function parseJwt (token) {
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
  }).join(''))

  return JSON.parse(jsonPayload)
}
