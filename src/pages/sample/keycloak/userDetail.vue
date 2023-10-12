<template>
  <div>

    <h2>사용자 상세정보</h2>
    <div>
      <table id="sample-table" border="1">
        <caption> 사용자 상세 정보</caption>
        <colgroup>
          <col style="width: 150px;"/>
          <col/>
        </colgroup>
        <tbody>

        {{ $t('pages_user.info.userEmail') }}


        <tr>
          <th scope="col">{{ $t('pages_user.info.userEmail') }}</th>
          <td>{{ loginUserDetail.userEmail }}</td>
        </tr>
        <tr>
          <th scope="col">{{ $t('pages_user.info.fullName') }}</th>
          <td>{{ loginUserDetail.userName }}</td>
        </tr>

        <tr>
          <th scope="col">{{ $t('pages_user.info.userName') }}</th>
          <td>{{ loginUserDetail.userFullName }}</td>
        </tr>
        <tr>
          <th scope="col">{{ $t('pages_user.info.errorCnt') }}</th>
          <td>{{ loginUserDetail.errorCnt }}</td>
        </tr>
        <tr>
          <th scope="col">{{ $t('pages_user.info.updateDate') }}</th>
          <td>{{ loginUserDetail.updateDate }}</td>
        </tr>
        <tr>
          <th scope="col">{{ $t('pages_user.info.updateId') }}</th>
          <td>{{ loginUserDetail.updateId }}</td>
        </tr>
        <tr>
          <th scope="col">{{ $t('pages_user.info.userLocale') }}</th>
          <td>{{ loginUserDetail.userLocale }}</td>
        </tr>
        <tr>
          <th scope="col">{{ $t('pages_user.info.useYn') }}</th>
          <td>{{ loginUserDetail.useYn }}</td>
        </tr>
        <tr>
          <th scope="col">{{ $t('pages_user.info.userAuth') }}</th>
          <td>{{ loginUserDetail.userAuth }}</td>
        </tr>
        </tbody>
      </table>
    </div>


    <h2>회원가입</h2>
    <div>
      <table id="sample-table" border="1">
        <caption>기본정보</caption>
        <colgroup>
          <col style="width: 150px;"/>
          <col/>
        </colgroup>
        <tbody>
        <tr>
          <th scope="col">{{ $t('pages_user.info.userEmail') }}</th>
          <td><input type="text" v-model="userEmail"></td>
        </tr>
        <tr>
          <th scope="col">{{ $t('pages_user.info.firstName') }}</th>
          <td><input type="text" v-model="firstName"></td>
        </tr>
        <tr>
          <th scope="col">{{ $t('pages_user.info.lastName') }}</th>
          <td><input type="text" v-model="lastName"></td>
        </tr>
        </tbody>
      </table>


      <table id="sample-table" border="1">
        <caption>추가정보</caption>
        <colgroup>
          <col style="width: 150px;"/>
          <col/>
        </colgroup>
        <tbody>
        <tr>
          <th scope="col">{{ $t('pages_user.info.userAuth') }}</th>
          <td>
            <select class="form-select" aria-label="taskStatus" v-model="userAuth" @change="onChangeCodeSelect">
              <option value="" selected="selected">{{ $t('pages_project.select.desc') }}</option>
              <option
                  v-for="(selectItem, index) in codeList"
                  :key="index"
                  :value="selectItem.codeId"
              >
                {{ selectItem.codeName }}
              </option>
            </select>
          </td>
        </tr>
        <tr>
          <th scope="col">{{ $t('pages_user.info.userLocale') }}</th>
          <td><input type="text" v-model="userLocale"></td>
        </tr>
        <tr>
          <th scope="col">
            {{ $t('pages_user.info.useYn') }}
          </th>
          <td>
            <select class="form-select" aria-label="taskStatus" v-model="useYn" @change="onChangeCodeSelect">
              <option value="Y">Y</option>
              <option value="N">N</option>

            </select>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <button type="button" id="user-signup"
            @click="onClickUserSignUp()">
      <span class="material-icons">{{ $t('common.save') }}</span>
    </button>


    <br><br><br><br><br>
    <h2>사용자 정보 수정</h2>
    <!-- 사용자 정보 업데이트-->
    <div>
      <table id="sample-table" border="1">
        <caption>추가정보</caption>
        <colgroup>
          <col style="width: 150px;"/>
          <col/>
        </colgroup>
        <tbody>
        <tr>
          <th scope="col">{{ $t('pages_user.info.userAuth') }}</th>
          <td>
            <select class="form-select" aria-label="taskStatus" v-model="updateUserAuth">
              <option value="" selected="selected">{{ $t('pages_project.select.desc') }}</option>
              <option
                  v-for="(selectItem, index) in codeList"
                  :key="index"
                  :value="selectItem.codeId"
              >
                {{ selectItem.codeName }}
              </option>
            </select>
          </td>
        </tr>
        <tr>
          <th scope="col">{{ $t('pages_user.info.userLocale') }}</th>
          <td><input type="text" v-model="updateUserLocale"></td>
        </tr>
        <tr>
          <th scope="col">
            {{ $t('pages_user.info.useYn') }}
          </th>
          <td>
            <select class="form-select" aria-label="taskStatus" v-model="updateUseYn">
              <option value="Y">Y</option>
              <option value="N">N</option>
            </select>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <button type="button" id="user-signup"
            @click="onClickUserInfoUpdate()">
      <span class="material-icons">{{ $t('common.save') }}</span>
    </button>


    <br><br><br><br><br>
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


    <br><br><br><br><br>
    <h2>사용자 탈퇴</h2>
    <!-- 사용자 정보 업데이트-->
    <button type="button" id="user-signup"
            @click="onClickUserDelete()">
      <input type="text" v-model="deleteUserId"/>
      <span class="material-icons">회원탈퇴</span>
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
    userDetailActionMessage(message, type) {
      let toastParam = {}
      toastParam.position = 'top'
      toastParam.duration = false
      toastParam.max = ''
      toastParam.type = type
      this.$toast.show(this.$t(message), toastParam)

      setTimeout(this.$toast.clear, 3000);
    },

    async onClickUserSignUp() {

      let param = {}
      param.userEmail = this.userEmail
      param.firstName = this.firstName
      param.lastName = this.lastName
      param.userAuth = this.userAuth
      param.userLocale = this.userLocale
      param.errorCnt = this.errorCnt
      param.useYn = this.useYn
      if (validateEmail(this.userEmail)) {
        await this.insertUserInfo(param)
        if (0 === this.userInsertResult.code) {
          this.userDetailActionMessage(this.$t('common.save.ok.message1'),'success')
        }
      } else {
        this.userDetailActionMessage(this.$t('pages_sample.sample.email.incorrect','error'))
      }
    },
    async onClickUserInfoUpdate() {
      let param = {}
      param.userEmail = this.loginUserDetail.userEmail

      param.userAuth = this.updateUserAuth
      param.userLocale = this.updateUserLocale
      param.useYn = this.updateUseYn

      await this.updateUserInfo(param)

      if (0 === this.userUpdateResult.code) {
        this.userDetailActionMessage(this.$t('common.edit.ok.message'),'success')
      } else {
        this.userDetailActionMessage(this.userUpdateResult.descKr,'error')
      }
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
    async onClickUserDelete() {
      let param = {};
      param.userId = this.deleteUserId

      await this.deleteUserInfo(param)

      if (0 === this.deleteUser.code) {
        this.userDetailActionMessage(this.$t('common.delete.ok.message'),'success')
      } else {
        this.userDetailActionMessage(this.$t(this.deleteUser.descKr),'error')
      }
    },
  },
  async beforeMount() {
    await this.getInit();
  },
}
</script>
