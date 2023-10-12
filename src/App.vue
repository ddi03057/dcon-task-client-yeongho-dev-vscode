<template v-if="isLoadedUserData && Object.keys(userInfo).length > 0">
  <div id="app">
    <router-view></router-view>
  </div>
</template>


<script>

import {mapActions, mapGetters} from "vuex";
import APICaller, {APIEventName} from './library/APICaller'


export default {
  name: "App",
  components: {

  },
  data () {
    return {
      visibleToast: false,
      toastMessage: null,
      isLoadedUserData: false
    }
  },
  computed: {
    ...mapGetters('user', ['userInfo','user']),

  },
  methods: {
    ...mapActions('user', ['getUserInfo']),
      getAPIException (e) {
        if (!this.visibleToast) {
          if (e && e.response && e.response.data && e.response.data.codeName) {
            try {
              this.toastMessage = `[ ${e.response.data.codeName} (${e.response.data.code}) ] - ${e.response.data.desc}`
            } catch (e) {}
          } else {
            this.toastMessage = `[ ${e.response.status}) ] - ${e.response.statusText}`
          }
        }
      },
    getLoginStatusException(e){
      if(!this.isLogoutForced){
        this.isLogoutForced = true
      }
    },
  },
  async beforeMount () {

    await this.getUserInfo()
    this.isLoadedUserData = true

    if ( "Y" === this.userInfo.passwordInitYn ) {
     await this.$router.push("/keycloak/user/passwordUpdate/"+this.userInfo.userId);
    }
  },

  async mounted () {

   // let user =  this.getUserInfo
    // this.$eventBus.$on(CodeEventBus.SHOW_TOAST, this.showToast)
    // this.$eventBus.$on(CodeEventBus.SHOW_SPINNER, this.showSpinner)
    APICaller.interceptors.addListener(APIEventName.responseException, this.getAPIException)
    APICaller.interceptors.addListener(APIEventName.loginStatusException, this.getLoginStatusException)
  },
};
</script>
<style lang="scss">
@import 'bootstrap/scss/bootstrap';
@import '@fortawesome/fontawesome-free/css/all.css';

//@import "custom-var.scss";
@import "vue-sidebar-menu/src/scss/vue-sidebar-menu.scss";
@import "../src/scss/vue-sidebar-menu";
@import 'bootstrap/scss/bootstrap';
</style>
<style src="./assets/styles/custom.css"></style>
<style src="bootstrap/dist/css/bootstrap.css"></style>



