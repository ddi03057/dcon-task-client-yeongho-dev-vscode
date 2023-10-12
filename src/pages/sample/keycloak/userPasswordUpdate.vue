<template>
  <div>

    <h2>사용자 패스워드 수정</h2>
    <!-- 사용자 정보 업데이트-->
    <div>
      <table id="sample-table" border="1">
        <caption>패스워드 정보</caption>
        <colgroup>
          <col style="width: 150px;"/>
          <col/>
        </colgroup>
        <tbody>
        <tr>
          <th scope="col">이메일</th>
          <td><input type="text" v-model="email"></td>
        </tr>
        <tr>
          <th scope="col">패스워드</th>
          <td><input type="text" v-model="newCredential"></td>
        </tr>
        <tr>
          <th scope="col">패스워드 확인</th>
          <td><input type="text" v-model="newCredentialConfirm"></td>
        </tr>
        </tbody>
      </table>
    </div>
    <button type="button" id="user-signup"
            @click="onClickUserPasswordUpdate()">
      <span class="material-icons">비밀번호 수정</span>
    </button>

  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {CODE_USER_AUTH} from "@/constants/constants";
import {validatePassWord, validateEmail} from "@/utils/validation";

export default {
  data() {
    return {
      userEmail: '',
      fullName: '',
      userName: '',

      firstName: '',
      lastName: '',

      errorCnt: 0,
      updateDate: '',
      updateId: '',
      userAuth: '',
      userLocale: '',
      useYn: 'Y',

      updateUserAuth: '',
      updateUserLocale: '',
      updateUseYn: 'Y',

      email: '',
      newCredential: '',
      newCredentialConfirm: '',
      deleteUserId: '',

    }
  },
  computed: {
    ...mapGetters('code', ['codeList']),
    ...mapGetters('user', ['loginUserDetail', 'userInsertResult', 'userUpdateResult', 'userUpdatePasswordResult', 'checkPassword', 'deleteUser']),
  },
  methods: {
    ...mapActions('code', ['getCodeList']),
    ...mapActions('user', ['getLoginUserDetail', 'insertUserInfo', 'updateUserInfo', 'updatePassword', 'getCheckPassword', 'deleteUserInfo']),

    async getInit() {

      let param = {};
      param.userId = this.$route.params.userId

      await this.getLoginUserDetail(param)

      let codeParam = {}
      codeParam.codeGroupId = CODE_USER_AUTH
      await this.getCodeList(codeParam)

    },
    async passwordCheck(newCredential, newCredentialConfirm) {
      if (newCredential !== newCredentialConfirm) {
        this.userDetailActionMessage(this.$t('pages_user.no.incorrect'),'error')
      }
    },
    async passwordEmailCheck(email, newCredential) {
      if (email === newCredential) {
        this.userDetailActionMessage(this.$t('pages_user.email.password.no'),'error')
      }
    },
    async onClickUserPasswordUpdate() {
      let param = {};
      param.email = this.email;
      param.newCredential = this.newCredential
      param.newCredentialConfirm = this.newCredentialConfirm

      await this.passwordCheck(this.newCredential, this.newCredentialConfirm)
      await this.passwordEmailCheck(this.email, this.newCredential)

      if (validateEmail(this.email)) {
        if (validatePassWord(this.newCredential)) {

          await this.getCheckPassword(param)
          let checkPasswordResult = this.checkPassword

          if ("N" === checkPasswordResult) {
            await this.updatePassword(param)
            if (0 === this.userUpdatePasswordResult.code) {
              this.userDetailActionMessage(this.$t('common.edit.ok.message'),'success')
              this.$router.push("/keycloak/user/"+this.loginUserDetail.userId)
            } else {
              this.userDetailActionMessage(this.$t(this.userUpdatePasswordResult.descKr),'error')
            }
          } else {
            this.userDetailActionMessage(this.$t('pages_user.update.org.new.password.no'),'error')
          }
        } else {
          this.userDetailActionMessage(this.$t('pages_user.no.password.invalid'),'error')
        }
      } else {
        this.userDetailActionMessage(this.$t('pages_sample.sample.email.incorrect'),'error')
      }
    },
    userDetailActionMessage(message, type) {
      let toastParam = {}
      toastParam.position = 'top'
      toastParam.duration = false
      toastParam.max = ''
      toastParam.type = type
      this.$toast.show(this.$t(message), toastParam)

      setTimeout(this.$toast.clear, 3000);
    },
  },
  async beforeMount() {
    await this.getInit();
  },
}
</script>
