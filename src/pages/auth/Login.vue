<template>
  <div class="vue-tempalte">
    <form>
      <h3>Sign In</h3>
      <div class="form-group">
        <label>Email address</label>
        <input type="email" class="form-control form-control-lg" v-model="userEmail"/>
      </div>
      <div class="form-group">
        <label>Password</label>
        <input type="password" class="form-control form-control-lg" v-model="userPwd"/>
      </div>
      <button type="button" class="btn btn-dark btn-lg btn-block" @click="getLogin">Sign In</button>
      <p class="forgot-password text-right mt-2 mb-4">
        <router-link to="/forgot-password">Forgot password ?</router-link>
      </p>
      <div class="social-icons">
        <ul>
          <li><a href="#"><i class="fa fa-google"></i></a></li>
          <li><a href="#"><i class="fa fa-facebook"></i></a></li>
          <li><a href="#"><i class="fa fa-twitter"></i></a></li>
        </ul>
      </div>
    </form>
  </div>
</template>


<script>
import {mapActions, mapGetters, mapState} from "vuex";
import {strLength, validateEmail, validatePassWord} from "@/utils/validation";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Login',

  data() {
    return {
      userEmail: '',
      userPwd: '',
      loginRequire: true

    }
  },
  computed: {
    ...mapState('menu', ['collapsed']),
    ...mapGetters('user', ['userDetail', 'user', 'loginCode']),
    ...mapGetters('sample', ['list', 'detail', 'updateResult', 'deleteResult', 'insertResult']),

  },
  methods: {
    ...mapActions('user', ['getUserLogin','getUserInfo']),
    ...mapActions('sample', ['getSampleList', 'deleteSample', 'getSampleDetail'
      , 'putSample', 'deleteSample', 'insertSample']),


    async getLogin() {

      let param = {}

      let toastParam = {}
      toastParam.position = 'top'
      toastParam.duration = false
      toastParam.max = ''
      toastParam.type = 'error'

      if (!validateEmail(this.userEmail)) {
        this.loginRequire = false
        this.$toast.show(this.$t('pages_user.email.incorrect'), toastParam)
        setTimeout(this.$toast.clear, 3000);
        return false
      }

      if (!validatePassWord(this.userPwd)
        || (strLength(this.userPwd) < 8 && strLength(this.userPwd) > 16)) {
        this.loginRequire = false
        this.$toast.show(this.$t('pages_user.password.incorrect'), toastParam)
        setTimeout(this.$toast.clear, 3000);
        return false
      }


      if (this.loginRequire) {

        param.userEmail = this.userEmail
        param.userPwd = btoa(this.userPwd);

        await this.getUserLogin(param)

        if (0 === await this.loginCode.code) {
          let user = this.user

          localStorage.setItem('token', JSON.stringify(user.token));
          await this.getUserInfo(param)
          await this.$router.push('/home')

        } else {

          this.$toast.show(this.loginCode.codeName, toastParam)
          setTimeout(this.$toast.clear, 3000);
        }
      }

    },


    async getInit() {
      let param = {}
      param.userEmail = 'suseokpark@dc-on.co.kr'
    },

    loginCheck() {
      // if (localStorage.getItem('token')) {
      //   this.$router.push('/home')
      // }
    }
  },


  beforeMount() {
    this.loginCheck()
  }
}
</script>
<style lang="scss" scoped>
.vue-select {
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  width: 150px;
  border-radius: 4px;
  border: 1px solid #999;
  box-sizing: border-box;
  outline: none;
}


.modal {
  width: 300px;
  padding: 30px;
  box-sizing: border-box;
  background-color: #fff;
  font-size: 20px;
  text-align: center;
}

.p-dropdown {
  width: 14rem;
}

.country-item-value {
  img.flag {
    width: 17px;
  }
}


</style>
