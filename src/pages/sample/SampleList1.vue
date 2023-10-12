<template>

<!--  <div-->
<!--    id="dcon-menu-left"-->
<!--    :class="[{'collapsed' : false}]"-->
<!--    class="bg-light"-->
<!--  >-->
<!--
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
        <div class="-wrapper-stretch v-center-" style="width: 800px;" >
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
        </div>

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
            {{ $t('common.save') }}

            {{ $t('pages_sample.sample.list.userEmail') }}: <input type="text" v-model="insertUserEmail">
            {{ $t('pages_sample.sample.list.userName') }} :<input type="text" v-model="insertUserName">
            <button type="button" id="sample-insert"
                    @click="onClickSampleInsert()">
              <span class="material-icons">{{ $t('common.save') }}</span>
            </button>
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
    </div>-->
<!--  </div>-->
  <Footer/>
</template>

<script>


import {mapActions, mapGetters, mapState} from "vuex";
import {validateEmail} from "@/utils/validation";
//import LeftMenu from "@/pages/layout/sidebar/LeftMenu";
//import Footer from "@/pages/layout/footer/footer";
import {v4 as uuidv4} from 'uuid';

const NAMESPACE ="2fa87fba-be32-4f98-972e-edf4befb8cd7\n"
export default {
  components: {
  //  LeftMenu,
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
  props: {

  },

  computed: {
    ...mapGetters('sample', ['list', 'detail', 'updateResult', 'deleteResult', 'insertResult']),
    ...mapGetters('menu', ['menuTopList','menuLeftList','menuLeftInfo']),
    ...mapState('menu', ['collapsed']),
    ...mapGetters('user', ['userDetail']),

  },
  methods: {

    ...mapActions('sample', ['getSampleList', 'deleteSample', 'getSampleDetail'
      , 'putSample', 'deleteSample', 'insertSample']),


    async getInit() {
      this.collapsed = true
      let param = {};
      param.userEmail = 'test1@dc-on.co.kr'
      param.searchGubun = 'email'

      await this.getSampleList(param);
      await this.getSampleDetail(param);
      this.userEmail = this.detail.userEmail
      this.userName = this.detail.userName
      this.seq = this.detail.seq


       console.log('  uuidv4():{}',  uuidv4())
       console.log('  this.$refs():{}',  this.$refs)
      console.log('this11.>{}',this)


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
          await this.getInit();
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
  },

  created() {

  },

  async beforeMount() {

    await this.getInit();

  },
}
</script>


