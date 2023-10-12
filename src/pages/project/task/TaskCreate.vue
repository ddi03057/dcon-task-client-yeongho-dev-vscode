<template>
  <div
      :class="[{'collapsed' : collapsed}]"
      class="dcon-menu-left bg-light"
  >
    <div class="dcon-left">
      <div class="mb-3">
        <div class="container">
          <BreadcrumbComponent :breadcrumbItems="breadcrumbItems" />
          <div class="mb-3">
            <label for="projectId" class="form-label">{{ $t('pages_project.create.task.project.id') }}</label>
            <input type="text" v-model="projectId" class="form-control" aria-describedby="projectId" disabled>
          </div>
          <div class="mb-3">
            <label for="taskName" class="form-label">{{ $t('pages_project.create.task.name') }}</label>
            <input type="text" class="form-control" v-model="taskName" :placeholder=taskNamePlaceHolder>
          </div>

          <div class="mb-3">
            <label for="taskStatus" class="form-label">{{ $t('pages_project.create.task.status') }}</label>
            <select class="form-select" aria-label="taskStatus" v-model="taskStatus" @change="onChangeCodeSelect">
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
            <label for="taskUserId" class="form-label">{{ $t('pages_project.create.task.task.user.id') }}</label>
            <select class="form-select" aria-label="taskUserId" v-model="taskUserIdCode" @change="onChangeTaskUser">
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

          <div class="mb-3">
            <label for="dueDate" class="form-label">{{ $t('pages_project.create.task.dueDate') }}</label>
            <datepicker v-model="dueDate" :min-date="new Date()" :format="format" :enable-time-picker="false" :clearable="false" auto-apply />
          </div>

          <div class="mb-3">
            <label for="dueDate" class="form-label">멀티 칼렌더 테스트용</label>
            <Datepicker v-model="fromToDate" range multiCalendars :min-date="new Date()" :format="format" :enable-time-picker="false" :clearable="false" auto-apply/>
          </div>

          <div class="mb-3">
            <label for="taskDesc" class="form-label">{{ $t('pages_project.create.task.desc') }}</label>
            <textarea class="form-control" v-model="taskDesc" rows="3" :placeholder="taskDescPlaceHolder"></textarea>
          </div>

          <div class="d-grid gap-2 d-md-flex justify-content-md-end">
            <button class="btn btn-primary me-md-2" type="button" @click="onClickCancel">{{ $t('common.cancel') }}
            </button>
            <button class="btn btn-primary" type="button" @click="onClickTaskSave">{{ $t('common.ok') }}</button>
          </div>

        </div>
      </div>
    </div>
  </div>
  <div v-if="modalTaskPopup">
    <TaskConfirmPopup :modalTaskPopup="modalTaskPopup" :modalTaskCreateSubject="modalTaskCreateSubject"
                      :modalCreateTaskParam="modalCreateTaskParam"  @createTaskConfirmModal="onClickPopupClose" />
  </div>
</template>
<script>
import TaskConfirmPopup from '../component/TaskConfirmPopup'
import {mapActions, mapGetters} from "vuex";
import {v4 as uuidv4} from 'uuid';
import BreadcrumbComponent from "@/pages/project/component/BreadcrumbComponent";
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    TaskConfirmPopup,
    BreadcrumbComponent,
    Datepicker

  },
  data() {
    return {
      collapsed: true,
      issueUrl: '/project/issue/' + this.$route.params,
      taskType: this.$route.query.taskType,
      taskStatusSelectedCode: '',
      breadcrumbItems: [
        {text: 'project', link: '/project/detail/'+ this.$route.params.projectId, lastItem : false },
        {text: this.$route.query.taskType, link: '/project/'+this.$route.query.taskType+'/'+ this.$route.params.projectId, lastItem: false},
        {text: 'task create', link: '', lastItem: true},
      ],
      modalCreateTaskParam: '',
      modalTaskPopup: false,
      modalTaskCreateSubject: '',
      taskId: '',
      dueDate: new Date(),
      isFocused: false,
      projectId: '',
      taskName: '',
      taskStatus: '',
      taskDesc: '',
      taskNamePlaceHolder: this.$t('pages_project.create.task.name'),
      taskDescPlaceHolder: this.$t('pages_project.create.task.desc'),
      taskUserId : '',
      taskUserIdCode : '',
      format:'yyyy-MM-dd',
      fromToDate:[],
    }
  },
  computed: {
    ...mapGetters('user', ['userInfo']),
    ...mapGetters('code', ['codeList']),
    ...mapGetters('project', ['projectUserList']),
  },
  methods: {
    ...mapActions('code', ['getCodeList']),
    ...mapActions('project', ['getProjectUserList']),

   async getInit() {
      this.projectId = this.$route.params.projectId
      this.taskType = this.$route.query.taskType
      this.taskId = uuidv4()

      if ('backlog' === this.taskType) {
        this.taskStatus = 'backlog'
      } else {
        this.taskStatus = 'open'
      }

      let param = {};
      param.projectId = this.projectId
      param.userId = this.userInfo.userId
      await this.getProjectUserList(param)
    },
    onChangeCodeSelect() {
      // this.taskStatus = this.taskStatusCode
    },
    onChangeTaskUser(){
     this.taskUserId = this.taskUserIdCode
    },
    onClickCancel() {
      history.go(-1)
    },
    onClickTaskSave() {

      let param = {}
      param.projectId = this.projectId
      param.taskId = this.taskId
      param.taskName = this.taskName
      param.userId = this.taskUserId
      param.taskStatus = this.taskStatus
      param.taskDesc = this.taskDesc
      param.dueDate = this.dueDate.getFullYear() + '-' + this.getDueDate('month', this.dueDate) + '-' + this.getDueDate('day', this.dueDate)

      // 데이트피커 멀티셀렉트
      // let fromDate = this.fromToDate[0]
      // let toDate = this.fromToDate[1]
      // param.fromDate = fromDate.getFullYear() + '-' + this.getDueDate('month', fromDate) + '-' + this.getDueDate('day', fromDate)
      // param.toDate = toDate.getFullYear() + '-' + this.getDueDate('month', toDate) + '-' + this.getDueDate('day', toDate)

      if(this.taskName === ''){
        this.taskSaveWarining('taskName')
      } else if( this.taskStatus === 'done' && this.taskUserId === ''){
        this.taskSaveWarining('taskUserId')
      } else{
        this.modalCreateTaskParam = JSON.stringify(param)
        this.modalTaskCreateSubject = this.$t('pages_project.create.task')
        this.modalTaskPopup = true
      }
    },
    taskSaveWarining(reason){
      let toastParam = {}
      toastParam.position = 'top'
      toastParam.duration = false
      toastParam.max = ''
      toastParam.type = 'error'

      if ( reason === 'taskName' ) {
        this.$toast.show(this.$t('pages_project.create.no.task.name'), toastParam)
      } else if ( reason === 'taskUserId' ) {
        this.$toast.show(this.$t('pages_project.task.assign.no.done'), toastParam)
      }

      setTimeout(this.$toast.clear, 3000);
    },
    onClickPopupClose(value) {
      this.modalTaskPopup = false
      if(value != null){
        this.$router.push('/project/' + this.taskType + '/'+ this.$route.params.projectId)
      }
    },
    getDueDate(type, date) {

      let value;
      if ( type === 'month') {
        value = date.getMonth() + 1
      } else {
        value = date.getDate()
      }
      return value < 10 ? "0"+value : value;
    }
  },
  beforeMount() {
    this.getInit()
  }
}
</script>