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
            <input type="text" class="form-control" v-model="projectName" :placeholder=projectNamePlaceHolder disabled>
          </div>

          <div class="mb-3">
            <label for="taskStatus" class="form-label">{{ $t('pages_project.project.use.yn') }}</label>
            <select class="form-select" aria-label="taskStatus" v-model="useYn">
              <option value="">{{ $t('pages_project.select.desc') }}</option>
              <option
                  v-for="(selectItem, index) in codeList"
                  :key="index"
                  :value="selectItem.codeId"
              >
                {{ selectItem.codeName }}
              </option>
            </select>
          </div>

          <div class="mb-3">
            <div class="table-wrapper-scroll-y my-custom-scrollbar">
              <table class="table table-bordered table-striped mb-0">
                <caption></caption>
                <thead>
                <tr>
                  <th scope="col"> <input type="checkbox" v-model="chkAll"></th>
                  <th scope="col">{{ $t('pages_project.project.create.userName') }}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item ,index) in userList">
                  <th scope="row">
                    <input type="checkbox" v-model="checkedUserIdList" name="seq" :value="item.userId"
                           :disabled="userDisabledCheck(item)"
                           @change="onChangeCheckedUser($event, item)">
                  </th>
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
                               @updateCancel="updateCancel"  @updateProgress="updateProgress" :data="$data"/>
  </div>
  <div v-if="modalFailOpen">
    <ProjectChangeFailPopup :modalFailOpen="modalFailOpen" :modalFailSubject="modalFailSubject"
                            :modalFailParam="modalFailParam" @issueFailModal="onCliickPopupClose"/>
  </div>
</template>

<script>

import {mapActions, mapGetters} from "vuex";
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
      projectNamePlaceHolder : this.$t('pages_project.project.name'),
      useYn : '',
      projectErrorDesc : '',

      modalPopupChange : false,
      modalSubject:'',
      modalParam: '',

      modalFailOpen: false,
      modalFailSubject: '',
      modalFailParam: '',

      checkedUserIdList : [],
      checkedUserList : [],
      disabledUserList : [],

      breadcrumbItems: [
          // 프로젝트 생성 플젝은 어디서 호출?
        {text: 'HOME', link: '/hello', lastItem : false },
        {text: 'project create', link: '', lastItem: true},
      ],

    }
  },
  computed: {
    ...mapGetters('user', ['userInfo','userList']),
    ...mapGetters('code', ['codeList']),
    ...mapGetters('project', ['projectUserList', 'projectDetail', 'updateProjectResult']),

    chkAll: {
      get: function () {
        return this.userList ? this.checkedUserIdList.length === this.userList.length : false;
      },
      set: function (value) {
        this.projectUserListCheckedProc(this.userList, "chkAll", value);
      }
    }
  },

  methods: {
    ...mapActions('code', ['getCodeList']),
    ...mapActions('user', ['getUserList']),
    ...mapActions('project', ['getProjectUserList', 'getProjectDetail', 'updateProject']),

    async getInit(){

      this.projectId = this.$route.params.projectId

      let codeParam = {}
      codeParam.codeGroupId = CODE_USE_YN
      await this.getCodeList(codeParam)

      let param = {};
      param.projectId = this.projectId
      await this.getProjectDetail(param)
      this.projectName = this.projectDetail.projectName;
      this.useYn = this.projectDetail.useYn;

      // 프로젝트에 할당된 유저 목록
      await this.getProjectUserList(param)

      param.userId = this.userInfo.userId
      // Realm에 등록된 유저 전부 목록
      await this.getUserList(param)
      await this.projectUserListCheckedProc(this.projectUserList, "init", false);
    },
    projectUserListCheckedProc(targetList, callType, value) {
      let checkedId = [];
      let checkedUser = [];
      let userListTemp = this.userList;

      if ( targetList.length > 0) {
        if ( callType === 'init' || (callType === 'chkAll' && value)) {
          targetList.forEach(function (user) {
            if ( callType === 'init') {
              let userExist = userListTemp.filter(userTemp => userTemp.userId === user.userId)
              if(userExist.length > 0) {
                checkedId.push(user.userId);
                checkedUser.push(user)
              }
            } else {
              checkedId.push(user.userId);
              checkedUser.push(user)
            }
          });
        }
      }
      this.checkedUserIdList = checkedId;
      this.checkedUserList = checkedUser;
    },
    onClickCancel() {
      history.go(-1)
    },

    async onClickProjectSave() {
      if (this.saveValidate()) {
        // confirm 팝업
        this.modalSubject = this.$t('pages_project.pages_project.update')
        let modalParam = {}
        modalParam.action = 'projectUpdate'
        modalParam.okFuncName = 'updateProgress'
        modalParam.cancelFuncName = 'updateCancel'
        modalParam.projectName = this.projectName
        this.modalParam = JSON.stringify(modalParam)
        this.modalPopupChange = true;
      }
    },
    saveValidate() {
      if('' === this.useYn){
        this.projectErrorDesc = this.$t('pages_project.project.use.yn.require')
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
    async updateProgress() {
      let param = {}
      param.projectId = this.projectId
      param.useYn = this.useYn
      param.userList = this.checkedUserList
      param.disabledUserList = this.disabledUserList

      await this.updateProject(param)
      this.modalPopupChange = false

      if (0 === this.updateProjectResult.code) {
        let toastParam ={}
        toastParam.position = 'top'
        toastParam.duration = false
        toastParam.max = ''
        toastParam.type = 'success'
        this.$toast.show(this.$t('pages_project.change.status.ok'), toastParam)
        setTimeout(this.$toast.clear, 3000);
      } else {
        this.modalFailSubject = this.updateProjectResult.descKr

        let failParam = {}
        failParam.modalFailSubject = this.modalFailSubject
        failParam.modalFailParam = this.$t('pages_project.error')
        this.modalFailParam = JSON.stringify(param)
        this.modalFailOpen = true
      }

      await this.getInit()
    },
    updateCancel() {
      this.modalPopupChange = false
      this.getInit()
    },
    onChangeCheckedUser(e, item) {
      if (e.target.checked) {
        this.checkedUserList.push(item)
      } else {
        this.checkedUserList = this.checkedUserList.filter(user => user.userId !== item.userId);
      }
    },
    onCliickPopupClose() {
      this.modalPopupChange = false
      this.modalFailOpen = false
      this.getInit()
    },
    userDisabledCheck(item){
      let taskAssignCnt = this.projectUserList.filter(user => user.userId === item.userId && user.taskAssignCnt > 0);
      return taskAssignCnt.length > 0;
    },
  },

  watch:{
    checkedUserIdList(){
      if (this.checkedUserList.length === 0) {
        let checkedId = [];
        let checkedUser = [];

        this.projectUserList.forEach(function (user) {
          if (user.taskAssignCnt > 0) {
              checkedId.push(user.userId);
              checkedUser.push(user)
          }
        });
        this.checkedUserIdList = checkedId;
        this.checkedUserList = checkedUser
      }
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
  height: 600px;
  overflow: auto;
}
.table-wrapper-scroll-y {
  display: block;
}
</style>
