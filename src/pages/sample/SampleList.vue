<template>
  <div
      :class="[{'collapsed' : collapsed}]"
      class="dcon-menu-left bg-light"
  >

    <div>
      <div>
        <button type="button" id="sample-logout"
                @click="onClickLogout()">
          <span class="material-icons">로그아웃</span>
        </button>
      </div>
    </div>
    userInfo=={{ userInfo }}
    detail=={{ detail }}
    <div class="dcon-left">
      <div class="container_menu">
        <div>
          {{ $t('pages_sample.sample.list') }}
        </div>
        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item"><a class="page-link" href="#">Previous</a></li>
            <li class="page-item"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item"><a class="page-link" href="#">Next</a></li>
          </ul>
        </nav>
        <br>

        <g-dropdown
            id="customer-list-auth"
            dropdown-type="button"
            variant="secondary"
            class="-width-50"
            style="width:160px"
            v-model="searchGroup">
          <g-dropdown-item-wrap>
            <g-dropdown-item
                v-for="group in list"
                :key="group.userName"
                :text="group.userEmail"
                :value="group.userName"
            />
          </g-dropdown-item-wrap>
        </g-dropdown>


        <br>
        <div>
          <div>
            <table id="sample-table" border="1">
              <caption> {{ $t('pages_sample.sample.list') }}</caption>
              <colgroup>
                <col style="width: 150px;"/>
                <col/>
              </colgroup>
              <tbody>
              <tr>
                <th scope="col">{{ $t('pages_sample.sample.list.seq') }}</th>
                <th scope="col">{{ $t('pages_sample.sample.list.userName') }}</th>
                <th scope="col">{{ $t('pages_sample.sample.list.userEmail') }}</th>

              </tr>
              <tr v-for="(item, index) in list">
                <td>{{ item.seq }}</td>
                <td>{{ item.userName }}</td>
                <td>{{ item.userEmail }}</td>

              </tr>
              </tbody>
            </table>
          </div>
          <br>
          <div>
            {{ $t('common.edit') }}
            <input type="text" v-model="seq">
            {{ $t('pages_sample.sample.list.userEmail') }}: : <input type="text" v-model="userEmail">
            {{ $t('pages_sample.sample.list.userName') }} : <input type="text" v-model="userName">
            <button type="button" id="sample-edit"
                    @click="onClickSampleEdit(seq)">
              <span class="material-icons">{{ $t('common.edit') }}</span>
            </button>
          </div>

          <br>
          <div>
            {{ $t('common.delete') }}
            {{ $t('pages_sample.sample.list.seq') }} : {{ detail.seq }}
            {{ $t('pages_sample.sample.list.userEmail') }}:} : {{ detail.userEmail }}
            {{ $t('pages_sample.sample.list.userName') }} : {{ detail.username }}
            <button type="button" id="sample-delete"
                    @click="onClickSampleDelete(seq)">
              <span class="material-icons">{{ $t('common.delete') }}</span>
            </button>
          </div>

          <br>
          <div>
            insert
            {{ $t('common.save') }}

            {{ $t('pages_sample.sample.list.userEmail') }}: <input type="text" v-model="insertUserEmail">
            {{ $t('pages_sample.sample.list.userName') }} :<input type="text" v-model="insertUserName">
            <button type="button" id="sample-insert"
                    @click="onClickSampleInsert()">
              <span class="material-icons">{{ $t('common.save') }}</span>
            </button>
          </div>

        </div>
        <div v-for="(item, index) in list">
          <div class="-wrapper v-center- " style="width: calc(100% - 95px);"
               :id="'dashboard-contract-top3-click-move-'+index">
            {{ $t('pages_sample.sample.list.seq') }}: <span class="-font-size-12">{{ item.seq }}.</span>
            <span :id="'dashboard-contract-top3-'" class="-ml-4 -font-size-14 -ellipsis "
                  style=" line-height: 1.125; flex: 1">
            {{ $t('pages_sample.sample.list.userName') }}::: {{ item.userName }}
            {{ $t('pages_sample.sample.list.userEmail') }}::: {{ item.userEmail }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


import {mapActions, mapGetters, mapState} from "vuex";
import {validateEmail} from "@/utils/validation";
import {v4 as uuidv4} from 'uuid';

export default {
  components: {
    //   LeftMenu,
    //  Footer
  },
  data() {
    return {
      userEmail: '',
      userName: '',
      seq: '',
      insertUserEmail: '',
      insertUserName: '',
      isOnMobile: false,
      searchGroup: ''
      // collapsed:false
    }
  },
  props: {},

  computed: {
    ...mapGetters('sample', ['list', 'detail', 'updateResult', 'deleteResult', 'insertResult']),
    ...mapGetters('menu', ['menuTopList', 'menuLeftList', 'menuLeftInfo']),
    ...mapState('menu', ['collapsed']),
    ...mapGetters('user', ['userInfo']),

  },
  methods: {

    ...mapActions('sample', ['getSampleList', 'Sample', 'getSampleDetail'
      , 'putSample', 'Sample', 'insertSample']),


    async getInit() {
      this.collapsed = true
      let param = {};
      param.userEmail = this.userInfo.userEmail
      param.searchGubun = 'email'
      console.log("param::::{}", param)
      await this.getSampleList(param);
      await this.getSampleDetail(param);
      this.userEmail = this.detail.userEmail
      this.userName = this.detail.userName
      this.seq = this.detail.seq


      console.log('  uuidv4():{}', uuidv4())
      console.log('  uuidv4():{}', uuidv4())

    },

    async onClickSampleEdit(value) {
      let param = {};
      param.userEmail = this.userEmail
      param.userName = this.userName
      param.id = value


      if (validateEmail(this.userEmail)) {
        await this.putSample(param)
        let updateResult = await this.updateResult

        if (0 === updateResult.code) {
          alert(this.$t('pages_sample.sample.update.ok'))
          await this.getInit()
        }
      } else {

        alert(this.$t('pages_sample.sample.email.incorrect'))
      }
    },

    async onClickSampleDelete(value) {
      let param = {};
      param.userEmail = this.userEmail
      param.userName = this.userName
      param.id = value

      if (validateEmail(this.userEmail)) {
        await this.deleteSample(param)
        let deleteResult = await this.deleteResult

        if (0 === deleteResult.code) {
          alert(this.$t('pages_sample.sample.delete.ok'))
          await this.getInit();
        }
      } else {
        alert(this.$t('pages_sample.sample.email.incorrect'))
      }
    },

    async onClickSampleInsert() {
      let param = {};
      param.userEmail = this.insertUserEmail
      param.userName = this.insertUserName


      if (validateEmail(this.insertUserEmail)) {
        await this.insertSample(param)
        let insertResult = await this.insertResult

        if (0 === insertResult.code) {
          alert(this.$t('pages_sample.sample.insert.ok'))
          await this.getInit();
        }
      } else {
        alert(this.$t('pages_sample.sample.email.incorrect'))
      }

    },

    async onClickLogout() {
      console.log('before logout')
      console.log("keycloak : ", keycloak)
      // await this.logoutUser();
      // var logoutOptions = { redirectUri : "http://localhost:4000" };

      let redirectUri = "http://localhost:4000/hello"
      let logoutOptions = {};

      console.log("idToken : ", keycloak.idToken)

      // logoutOptions.redirectUri= encodeURIComponent(redirectUri);
      // logoutOptions.idToken = keycloak.idToken;
      //
      // window.keycloak.logout.apply()
      // window.keycloak.createLogoutUrl("http://localhost:4000")
      // console.log("window.keycloak : ", window.keycloak)
      // window.keycloak.logout(logoutOptions);

      window.keycloak.logout();

      // window.keycloak.logout(logoutOptions).then((success) => {
      //   console.log("--> log: logout success ", success );
      // }).catch((error) => {
      //   console.log("--> log: logout error ", error );
      // });

      console.log('after logout')
    },
  },

  async beforeMount() {

    await this.getInit();

  },
}
</script>


