<template>
  <div
      :class="[{'collapsed' : collapsed}]"
      class="dcon-menu-left bg-light"
  >
    <div class="dcon-left">
      <div class="mb-3">
        <div class="container">
          <BreadcrumbComponent :breadcrumbItems="breadcrumbItems"/>
          <div class="row">
            <div class="col-4">
              <select class="form-select" aria-label="taskStatus" id="codeIssueSearchCode"
                      v-model="codeIssueSearchCode" @change="onChangeIssueSearchCode">
                <option value="">{{ $t('pages_project.select.desc') }}</option>
                <option
                    v-for="(selectItem, index) in codeIssueSearchList"
                    :key="index"
                    :value="selectItem.codeId"
                >
                  {{ selectItem.codeName }}
                </option>
              </select>
            </div>
            <div class="col-4">
              <select class="form-select" aria-label="taskStatus" v-model="codeIssueSearchUser"
                      @change="onChangeIssueSearch">
                <option value="">{{ $t('pages_project.select.desc') }}</option>
                <option
                    v-for="(selectItem, index) in projectUserList"
                    :key="index"
                    :value="selectItem.userId"
                >
                  {{ selectItem.userName }}
                </option>
              </select>
            </div>
          </div>

          <br/>


          <div class="row">

            <div class="col-4">
              <div class="list-group" id="list-tab" role="tabList">
                <ul class="list-group">
                  <li class="list-group-item d-flex justify-content-between align-items-start bg-light">
                    <div class="ms-2 me-auto">
                      <div>{{ $t('pages_project.todo.issue') }}
                        <span class="badge bg-primary rounded-pill">{{ openIssueLength }}</span>
                        {{ $t('pages_project.issue') }}
                        <button type="button" class="btn btn-primary" @click="onClickCreateIssue">
                          {{ $t('pages_project.create.issue') }}
                        </button>
                      </div>
                    </div>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-start"
                      v-for="(item,index) in issueOpenList">
                    <div class="ms-2 me-auto">
                      <div>
                        <span style="cursor: pointer" @click="onClickTaskDetail(item.projectId,item.taskId)">
                        {{ item.taskName }}
                      </span>
                      </div>
                      <span style="cursor: pointer"
                            @click="onClickTaskDetail(item.projectId,item.taskId)">{{ item.taskDesc }}</span>
                      <br/>
                      <select v-model="item.taskStatus" @change="onChangeOpenCodeSelect(item)" >
                        <option
                            v-for="(selectItem, index) in codeList"
                            :key="index"
                            :value="selectItem.codeId"
                            :selected="selectItem.codeId === item.taskStatus"
                        >
                          {{ selectItem.codeName }}
                        </option>
                      </select>
                      <select class="ms-2 select"  v-model="item.userId"
                              @change="onChangeOpenTaskUser(item)">
                        <option value="">{{ $t('pages_project.select.desc') }}</option>
                        <option
                            v-for="(selectItem, index) in projectUserList"
                            :key="index"
                            :value="selectItem.userId"
                        >
                          {{ selectItem.userName }}
                        </option>
                      </select>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <!--progress -->
            <div class="col-4">
              <div class="list-group" id="list-tab" role="tablist">
                <ul class="list-group">
                  <li class="list-group-item d-flex justify-content-between align-items-start bg-light">
                    <div class="ms-2 me-auto">
                      <div>{{ $t('pages_project.inprogress.issue') }}
                        <span class="badge bg-primary rounded-pill">{{ progressIssueLength }}</span>
                        {{ $t('pages_project.issue') }}
                      </div>
                    </div>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-start"
                      v-for="(item,index) in issueProgressList">
                    <div class="ms-2 me-auto">
                      <div>
                        <span style="cursor: pointer" @click="onClickTaskDetail(item.projectId,item.taskId)">
                        {{ item.taskName }}
                      </span>
                      </div>
                      <span style="cursor: pointer"
                            @click="onClickTaskDetail(item.projectId,item.taskId)">{{ item.taskDesc }}</span>
                      <br/>
                      <select v-model="item.taskStatus"
                              @change="onChangeProgressCodeSelect(item)">
                        <option
                            v-for="(selectItem, index) in codeList"
                            :key="index"
                            :value="selectItem.codeId"
                        >
                          {{ selectItem.codeName }}
                        </option>
                      </select>
                      <select class="ms-2 select"  v-model="item.userId"
                              @change="onChangeProgressTaskUser(item)">
                        <option value="">{{ $t('pages_project.select.desc') }}</option>
                        <option
                            v-for="(selectItem, index) in projectUserList"
                            :key="index"
                            :value="selectItem.userId"
                        >
                          {{ selectItem.userName }}
                        </option>
                      </select>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <!--complete -->
            <div class="col-4">
              <div class="list-group" id="list-tab" role="tablist">
                <ul class="list-group">
                  <li class="list-group-item d-flex justify-content-between align-items-start bg-light">
                    <div class="ms-2 me-auto">
                      <div>{{ $t('pages_project.complete.issue') }}
                        <span class="badge bg-primary rounded-pill">{{ completeIssueLength }}</span>
                        {{ $t('pages_project.issue') }}
                      </div>
                    </div>
                  </li>

                  <li class="list-group-item d-flex justify-content-between align-items-start"
                      v-for="(item,index) in issueCompleteList">
                    <div class="ms-2 me-auto">
                      <div>
                        <span style="cursor: pointer" @click="onClickTaskDetail(item.projectId,item.taskId)">
                        {{ item.taskName }}
                      </span>
                      </div>
                      <span style="cursor: pointer"
                            @click="onClickTaskDetail(item.projectId,item.taskId)">{{ item.taskDesc }}</span>
                      <br/>
                      <select v-model="item.taskStatus" disabled>
                        <option
                            v-for="(selectItem, index) in codeList"
                            :key="index"
                            :value="selectItem.codeId"
                        >
                          {{ $t('pages_project.complete.issue') }}

                        </option>
                      </select>
                      <select class="ms-2 select" :id="'complete_task_'+item.seq" v-model="item.userId" disabled>
                        <option value="">{{ $t('pages_project.select.desc') }}</option>
                        <option
                            v-for="(selectItem, index) in projectUserList"
                            :key="index"
                            :value="selectItem.userId"
                        >
                          {{ selectItem.userName }}
                        </option>
                      </select>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="modalPopupChange">
    <IssueChangeConfirmPopup :modalPopupChange="modalPopupChange" :modalSubject="modalSubject" :modalParam="modalParam"
                             @issueConfirmModal="onClickPopupClose"/>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {
  CODE_ASSIGN,
  CODE_STATUS,
  CODE_TASK_STATUS,
  DONE_TASK_STATUS,
  ISSUE_SEARCH,
  OPEN_TASK_STATUS,
  PROGRESS_TASK_STATUS
} from '@/constants/constants'
import IssueChangeConfirmPopup from '../component/IssueChangeConfirmPopup'
import BreadcrumbComponent from "@/pages/project/component/BreadcrumbComponent";

export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    IssueChangeConfirmPopup,
    BreadcrumbComponent
  },
  data() {
    return {
      collapsed: true,
      issueUrl: '/project/issue/' + this.$route.params,
      projectDetailUrl: '/project/detail/' + this.$route.params,
      projectId: '',
      breadcrumbItems: [
        {text: 'project', link: '/project/detail/' + this.$route.params.projectId, lastItem: false},
        {text: 'issue', link: '/project/issue/' + this.$route.params.projectId, lastItem: true},
      ],
      openIssueLength: 0,
      progressIssueLength: 0,
      completeIssueLength: 0,
      modalParam: '',
      openStatusUserParam: '',
      modalPopupChange: false,
      modalSubject: '',
      codeIssueSearchCode: '',
      codeIssueSearchUser: '',

    }
  },
  computed: {
    ...mapGetters('user', ['userInfo']),
    ...mapGetters('project', ['issueOpenList', 'issueProgressList', 'issueCompleteList', 'projectUserList']),
    ...mapGetters('code', ['codeList', 'codeIssueSearchList']),
  },
  methods: {
    ...mapActions('project', ['getOpenIssueList', 'getProgressIssueList', 'getCompleteIssueList', 'getProjectUserList']),
    ...mapActions('code', ['getCodeList', 'getCodeIssueSearchList']),

    async getInit() {

      let param = {};
      param.projectId = this.$route.params.projectId
      param.taskStatus = OPEN_TASK_STATUS
      param.userId = this.userInfo.userId
      param.issueSearchCode = this.codeIssueSearchCode
      param.issueSearchUser = this.codeIssueSearchUser

      await this.getOpenIssueList(param)
      this.openIssueLength = this.issueOpenList.length

      await this.getProjectUserList(param)

      let codeParam = {}
      codeParam.codeGroupId = CODE_TASK_STATUS
      await this.getCodeList(codeParam)

      codeParam.codeGroupId = ISSUE_SEARCH
      await this.getCodeIssueSearchList(codeParam)


      await this.getProgress()
      await this.getComplete()

    },

    async getProgress() {
      let param = {};
      param.projectId = this.$route.params.projectId
      param.taskStatus = PROGRESS_TASK_STATUS
      param.userId = this.userInfo.userId
      param.issueSearchCode = this.codeIssueSearchCode
      param.issueSearchUser = this.codeIssueSearchUser

      await this.getProgressIssueList(param)
      this.progressIssueLength = this.issueProgressList.length


    },
    async getComplete() {
      let param = {};
      param.projectId = this.$route.params.projectId
      param.taskStatus = DONE_TASK_STATUS
      param.userId = this.userInfo.userId
      param.issueSearchCode = this.codeIssueSearchCode
      param.issueSearchUser = this.codeIssueSearchUser

      await this.getCompleteIssueList(param)
      this.completeIssueLength = this.issueCompleteList.length

    },

    onClickCreateIssue() {
      this.$router.push('/project/issue/task/create/' + this.$route.params.projectId + '?taskType=issue')
    },

   // onChangeCodeSelectCommon(taskCodeId, seq, taskId, taskName) {
    onChangeCodeSelectCommon(item) {
      // 담당자가 없는 경우 완료 상태로 변경 못한다.
      // 오픈, 진행중 상태 목록을 돌리며 taskId로 변경하려는 task에 담당자 할당여부를 체크한다.
      let notAssignOpenList = this.issueOpenList.filter(task => task.taskId === item.taskId && (this.strEmptyChk(task.userId)))
      let notAssignProgressList = this.issueProgressList.filter(task => task.taskId === item.taskId && (this.strEmptyChk(task.userId)))

      if (DONE_TASK_STATUS === item.taskStatus &&
          (notAssignOpenList.length > 0 || notAssignProgressList.length > 0)) {
        this.projectErrorDesc = this.$t('pages_project.task.assign.no.done')
        this.projectSaveWarning(this.projectErrorDesc)
        this.getInit()
      } else {
        let param = {}
        param.projectId = this.$route.params.projectId
        param.taskId = item.taskId
        param.taskName = item.taskName
        param.taskStatus = item.taskStatus
        param.task = CODE_STATUS

        this.modalParam = JSON.stringify(param)
        this.modalSubject = this.$t('pages_project.change.code')
        this.modalPopupChange = true
      }
    },
    onChangeOpenCodeSelect(item) {
      this.onChangeCodeSelectCommon(item)
    },

    onChangeTaskUserCommon(item) {
      let param = {}
      param.projectId = this.$route.params.projectId
      param.taskId = item.taskId
      param.taskName = item.taskName
      param.userId = item.userId
      param.task = CODE_ASSIGN

      this.modalParam = JSON.stringify(param)

      this.modalSubject = this.$t('pages_project.change.assign')
      this.modalPopupChange = true
    },
    onChangeOpenTaskUser(item) {
      this.onChangeTaskUserCommon(item)
    },

    onChangeProgressCodeSelect(item) {
      this.onChangeCodeSelectCommon(item)
    },
    onChangeProgressTaskUser(item) {
      this.onChangeTaskUserCommon(item)
    },
    onClickPopupClose() {
      this.modalPopupChange = false
      this.getInit()
    },

    onClickTaskDetail(projectId, taskId) {
      this.$router.push('/project/issue/task/detail/' + projectId + "/" + taskId)
    },

    projectSaveWarning(content) {
      let toastParam = {}
      toastParam.position = 'top'
      toastParam.duration = false
      toastParam.max = ''
      toastParam.type = 'error'

      this.$toast.show(content, toastParam)
      setTimeout(this.$toast.clear, 3000);
    },
    onChangeIssueSearch() {
      if ('' === this.codeIssueSearchCode) {
        this.projectSaveWarning(this.$t('pages_project.issue.search.code'))
        document.getElementById('codeIssueSearchCode').focus()
      }
      if ('' === this.codeIssueSearchUser) {
        this.codeIssueSearchUser = ''
      }
      this.getInit()
    },
    onChangeIssueSearchCode() {
      if ('' === this.codeIssueSearchCode) {
        this.codeIssueSearchUser = ''
        this.getInit()
      }
    },
    strEmptyChk(str) {
      return !!(null === str || 'null' === str || '' === str);
    },
    changeStatusCheck(item, event, obj) {

      let oldStatus = item.taskStatus
      console.log("changeStatusCheck")
      console.log("item : ", item)
      console.log("event : ", event.target.value)

      console.log("obj : ", obj)
      // 담당자가 없는 경우 완료 상태로 변경 못한다.
      // 오픈, 진행중 상태 목록을 돌리며 taskId로 변경하려는 task에 담당자 할당여부를 체크한다.
      let notAssignOpenList = this.issueOpenList.filter(task => task.taskId === item.taskId && (this.strEmptyChk(task.userId)))
      let notAssignProgressList = this.issueProgressList.filter(task => task.taskId === item.taskId && (this.strEmptyChk(task.userId)))

      if (DONE_TASK_STATUS === event.target.value &&
          (notAssignOpenList.length > 0 || notAssignProgressList.length > 0)) {

        console.log(111)
        this.projectErrorDesc = this.$t('pages_project.task.assign.no.done')
        this.projectSaveWarning(this.projectErrorDesc)

        alert(item.taskStatus);  // Old value
        alert(event.target.value);  // New value
        obj.value = oldStatus;  // Actual assignment


      }
    }
  },

  beforeMount() {
    this.getInit()
  },
  watch: {
    $route(to, form) {
      if (to.path !== form.path) {
        this.getInit()
      }
    },
  }
}
</script>
