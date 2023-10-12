<template>
  <div
      :class="[{'collapsed' : collapsed}]"
      class="dcon-menu-left bg-light"
  >
    <div class="dcon-left">
      <div class="mb-3">
        <div class="container">
          <BreadcrumbComponent :breadcrumb-items="breadcrumbItems"/>
          <div class="mb-3">
            <label for="taskName" class="form-label">{{ $t('pages_project.project.name') }}</label>
            <input type="text" class="form-control" v-model="projectName" :placeholder=projectNamePlaceHolder>
          </div>

          <div class="mb-3">
            <label for="taskStatus" class="form-label">{{ $t('pages_project.project.use.yn') }}</label>
            <select class="form-select" aria-label="taskStatus" v-model="useYn">
              <option value="">{{ $t('pages_project.select.desc') }}</option>
              <option
                  v-for="(selectItem, index) in useYnList"
                  :key="index"
                  :value="selectItem.codeId"
              >
                {{ selectItem.codeName }}
              </option>
            </select>
          </div>

          <div class="mb-3">
            <label for="taskPrefix" class="form-label">{{ $t('pages_project.project.prefix') }}</label>
            <input type="text" class="form-control" placeholder="영문만 입력가능합니다." maxlength="10"
                   v-model="taskPrefix" @input="this.taskPrefix=this.taskPrefix.replace(/[^a-zA-Z]/g,'')">
          </div>

          <div class="mb-3">
            <div class="table-wrapper-scroll-y table_container">
              <table class="table table-bordered table-striped mb-0">
                <caption></caption>
                <thead>
                <tr>
                  <th class='fixedHeader' scope="col"> <input type="checkbox" v-model="chkAll"></th>
                  <th class='fixedHeader' scope="col">{{ $t('pages_project.project.create.userName') }}</th>
                </tr>
                </thead>
                <tbody>

                <tr v-for="(item ,index) in userList">
                  <th scope="row"><input type="checkbox" v-model="checkedUserList" name="seq" :value="item"></th>
                  <td>{{ item.userName }}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="d-grid gap-2 d-md-flex justify-content-md-end">
            <button class="btn btn-primary me-md-2" type="button" @click="onClickCancel">{{ $t('common.cancel') }}
            </button>
            <button class="btn btn-primary" type="button" @click="onClickProjectSave">{{ $t('common.save') }}</button>
          </div>

        </div>
      </div>
    </div>
  </div>
  <div v-if="modalPopupChange">
    <ProjectChangeConfirmPopup :modalPopupChange="modalPopupChange" :modalSubject="modalSubject" :modalParam="modalParam"
                               @createCancel="createCancel"  @createProgress="createProgress" :data="$data"/>
  </div>
  <div v-if="modalFailOpen">
    <ProjectChangeFailPopup :modalFailOpen="modalFailOpen" :modalFailSubject="modalFailSubject"
                            :modalFailParam="modalFailParam" @issueFailModal="createCancel"/>
  </div>
</template>

<script>

import {mapActions, mapGetters} from "vuex";
import {v4 as uuidv4} from 'uuid';
import {CODE_USE_YN} from "@/constants/constants";
import ProjectChangeConfirmPopup from './component/ProjectChangeConfirmPopup'
import BreadcrumbComponent from "@/pages/project/component/BreadcrumbComponent";
import ProjectChangeFailPopup from "@/pages/project/component/ProjectChangeFailPopup";

export default {
  components: {
    ProjectChangeConfirmPopup,
    ProjectChangeFailPopup,
    BreadcrumbComponent
  },
  data() {
    return {
      collapsed: true,
      projectId : '',
      projectName : '',
      taskPrefix: '',
      projectNamePlaceHolder : this.$t('pages_project.project.name'),
      useYn : '',
      projectErrorDesc : '',

      modalPopupChange : false,
      modalSubject:'',
      modalParam: '',

      modalFailOpen: false,
      modalFailSubject: '',
      modalFailParam: '',
      useYnList:[],

      checkedUserList : [],
      breadcrumbItems: [
          // 프로젝트 생성 플젝은 어디서 호출?
        {text: 'HOME', link: '#', lastItem : false },
        {text: 'project create', link: '', lastItem: true},
      ],
    }
  },
  computed: {
    ...mapGetters('user', ['userInfo','userList']),
    ...mapGetters('code', ['codeList']),
    ...mapGetters('project', ['projectInsertResult', 'projectPrefixExist']),

    chkAll: {
      get: function () {
        return this.userList ? this.checkedUserList.length === this.userList.length : false;
      },
      set: function (value) {
        let checked = [];
        if (value) {
          this.userList.forEach(function (user) {
            checked.push(user);
          });
        }
        this.checkedUserList = checked;
      }
    }
  },

  methods: {
    ...mapActions('code', ['getCodeList']),
    ...mapActions('user', ['getUserList']),
    ...mapActions('project', ['insertProject', 'taskPrefixExist']),

    async getInit(){
      this.projectId = uuidv4()

      let codeParam = {}
      codeParam.codeGroupId = CODE_USE_YN
      await this.getCodeList(codeParam)
      this.useYnList = this.codeList

      let param = {};
      param.userId = this.userInfo.userId
      await this.getUserList(param)
    },
    onClickCancel() {
      history.go(-1)
    },

    async onClickProjectSave() {
      if (await this.saveValidate()) {
        // confirm 팝업
        this.modalSubject = this.$t('pages_project.pages_project.add')
        let modalParam = {}
        modalParam.action = 'projectCreate'
        modalParam.okFuncName = 'createProgress'
        modalParam.cancelFuncName = 'createCancel'
        modalParam.projectName = this.projectName
        this.modalParam = JSON.stringify(modalParam)
        this.modalPopupChange = true;
      }
    },
    async saveValidate() {
      if ('' === this.projectName) {
        this.projectErrorDesc = this.$t('pages_project.project.name.require')
        this.projectSaveWarining(this.projectErrorDesc)

        return false;
      }
      if ('' === this.useYn) {
        this.projectErrorDesc = this.$t('pages_project.project.use.yn.require')
        this.projectSaveWarining(this.projectErrorDesc)

        return false;
      }
      if ('' === this.taskPrefix) {
        this.projectErrorDesc = this.$t('pages_project.project.taskPrefix.require')
        this.projectSaveWarining(this.projectErrorDesc)

        return false;
      }

      let param = {};
      param.taskPrefix = this.taskPrefix
      await this.taskPrefixExist(param)

      if ( typeof this.projectPrefixExist !== 'undefined') {
        this.projectErrorDesc = '이미 존재하는 프리픽스입니다.'
        this.projectSaveWarining(this.projectErrorDesc)
        return false;
      }
      return true;
    },
    projectSaveWarining(content){
      let toastParam = {}
      toastParam.position = 'top'
      toastParam.duration = false
      toastParam.max = ''
      toastParam.type = 'error'

      this.$toast.show(content, toastParam)
      setTimeout(this.$toast.clear, 3000);
    },
    async commonMessageToastPop(message, code) {

      let toastParam = {}
      toastParam.position = 'top'
      toastParam.duration = false
      toastParam.max = ''
      if (0 === code) {
        toastParam.type = 'success'
      } else {
        toastParam.type = 'error'
      }

      this.$toast.show(message, toastParam)
      setTimeout(this.$toast.clear, 3000);
    },

    async createProgress() {
      let param = {}
      param.projectId = this.projectId
      param.projectName = this.projectName
      param.useYn = this.useYn
      param.userList = this.checkedUserList
      param.taskPrefix = this.taskPrefix

      await this.insertProject(param)
      if (0 === this.projectInsertResult.code){
        await this.commonMessageToastPop(this.projectInsertResult.descKr,this.projectInsertResult.code)
        await this.$router.push('/project/issue/' + this.projectId)
        this.emitter.emit("projectCreated", "projectCreated");  // 헤더에 프로젝트 리프레시
      } else {
        await this.commonMessageToastPop(this.projectInsertResult.descKr,this.projectInsertResult.code)
      }
    },
    createCancel() {
      this.modalPopupChange = false
      this.modalFailOpen = false
      this.getInit()
    },
  },
  beforeMount() {
    this.getInit()
  }
}
</script>
<style scoped>
.my-custom-scrollbar {
  position: relative;
  height: 200px;
  overflow: auto;
}
.table-wrapper-scroll-y {
  display: block;
}
.table_container {
  height: 500px;
  overflow: auto;
}
.fixedHeader {
  position: sticky;
  top: 0;
}
table {
  width: 100%;
  background-color: #f1f1f2;
}
table > thead > tr > th {
  font-weight: 400;
  color: #fff;
  background-color: #311313;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}
table > tbody > tr > td {
  text-align: left;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}
</style>

