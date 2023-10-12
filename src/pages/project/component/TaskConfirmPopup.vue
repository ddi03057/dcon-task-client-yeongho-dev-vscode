<template>
  <div class="modal-mask" v-if="modalTaskPopup">
    <div class="modal-wrapper">
      <div class="modal-container">

        <div class="modal-header">
          <slot name="header">
            <h3 class="modal-header">{{ modalTaskCreateSubject }}</h3>
          </slot>
        </div>

        <div class="modal-body">
          <slot name="body">
            <div v-if="projectUserDetail.userName === ''">
              <p>
              {{ $t('pages_project.create.task.name') }} : {{ taskName }}<br/>
              {{ $t('pages_project.create.task.status') }} : {{ code.codeName }}<br/>
              {{ $t('pages_project.create.task.task.user.id') }} : {{ projectUserDetail.userName }}<br/>
              </p>
            </div>

            <div v-else>
              <p>
              {{ $t('pages_project.create.task.name') }} : {{ taskName }}<br/>
              {{ $t('pages_project.create.task.status') }} : {{ code.codeName }}<br/>
              </p>
            </div>
            {{ $t('pages_project.create.task.require') }}
          </slot>
        </div>
        <div class="modal-footer" style="margin-left: 80px">
          <slot name="footer">
            <button type="button" style="width: 100px" class="btn btn-primary" @click="onClickClosePop">
              {{ $t('common.cancel') }}
            </button>
            <button type="button" style="width: 100px" class="btn btn-primary" @click="onClickCreateTask">
              {{ $t('common.ok') }}
            </button>
          </slot>
        </div>
      </div>
    </div>
  </div>
  <div v-if="modalFailOpen">
    <IssueChangeFailPopup :modalFailOpen="modalFailOpen" :modalFailSubject="modalFailSubject"
                          :modalFailParam="modalFailParam" @issueFailModal="onClickPopupClose"/>
  </div>
</template>

<script>
import IssueChangeFailPopup from './IssueChangeFailPopup'
import {mapActions, mapGetters} from "vuex";
import {CODE_TASK_STATUS, OPEN_TASK_STATUS} from "@/constants/constants";

export default {
  name: "TaskCreateModal",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    IssueChangeFailPopup
  },
  data() {
    return {
      modalFailOpen: false,
      projectId: '',
      taskId: '',
      taskStatus: '',
      taskName: '',
      taskStatusName: '',
      task: '',
      modalFailSubject: '',
      modalFailParam: '',
      userId: '',
      userName: '',
      userEmail: '',
      taskDesc: '',
      dueDate: '',
      createGubun: '',
      taskSubId: '',
      seq: '',
    }
  },
  props: {
    modalTaskCreateSubject: {
      type: String,
      default: ''
    },
    modalTaskPopup: {
      type: Boolean,
      default: false
    },
    modalCreateTaskParam: {
      type: String,
      default: ''
    },
  },
  computed: {
    ...mapGetters('user', ['userInfo', 'projectUserDetail']),
    ...mapGetters('project', ['taskInsertResult']),
    ...mapGetters('code', ['code']),

  },
  methods: {
    ...mapActions('project', ['insertProjectTask']),
    ...mapActions('user', ['getProjectUserDetail']),
    ...mapActions('code', ['getCode']),

    async getInit() {
      let paramValue = JSON.parse(this.modalCreateTaskParam)

      this.projectId = paramValue.projectId
      this.taskId = paramValue.taskId
      this.taskName = paramValue.taskName
      this.taskStatus = paramValue.taskStatus
      this.createGubun = paramValue.createGubun
      this.dueDate = paramValue.dueDate
      this.createGubun = paramValue.createGubun
      this.taskSubId = paramValue.taskSubId
      this.seq = paramValue.seq



      if (paramValue.taskStatus === '') {

        let toastParam = {}
        toastParam.position = 'top'
        toastParam.duration = false
        toastParam.max = ''
        toastParam.type = 'warning'

        this.taskStatus = OPEN_TASK_STATUS

        this.$toast.show(this.$t('pages_project.create.no.task'), toastParam)
        setTimeout(this.$toast.clear, 3000);
      }
      this.taskDesc = paramValue.taskDesc
      this.userId = paramValue.userId


      let param = {}
      param.userId = this.userInfo.userId

      await this.getProjectUserDetail(param)

      param.userName = this.projectUserDetail.userName
      param.userEmail = this.projectUserDetail.userEmail
      this.userName = this.projectUserDetail.userName
      this.userEmail = this.projectUserDetail.userEmail

      let CodeParam = {}
      CodeParam.codeGroupId = CODE_TASK_STATUS
      CodeParam.codeId = this.taskStatus

      await this.getCode(CodeParam)

    },
    onClickClosePop(e) {
      e.preventDefault()
      e.stopPropagation()
      // eslint-disable-next-line vue/no-mutating-props
      this.$emit('createTaskConfirmModal')
    },
    async onClickCreateTask() {
      let param = {}

      param.projectId = this.projectId
      param.taskId = this.taskId
      param.taskName = this.taskName
      param.taskStatus = this.taskStatus
      param.taskDesc = this.taskDesc
      param.userId = this.userId

      param.userName = this.userName
      param.dueDate = this.dueDate
      param.createGubun = this.createGubun
      param.taskSubId = this.taskSubId
      param.seq = this.seq

      await this.createTask(param)
    },
    async createTask(param) {
      let toastParam = {}
      toastParam.position = 'top'
      toastParam.duration = false
      toastParam.max = ''
      toastParam.type = 'success'

      await this.insertProjectTask(param)

      let insertResult = this.taskInsertResult
      if (0 === insertResult.code) {
        this.$toast.show(this.$t('pages_project.create.task.ok'), toastParam)
        setTimeout(this.$toast.clear, 3000);

        this.$emit('createTaskConfirmModal', param)
      } else {
        this.modalFailSubject = insertResult.descKr

        let param = {}
        param.modalFailSubject = this.modalFailSubject
        param.modalFailParam = this.$t('pages_project.error')
        this.modalFailParam = JSON.stringify(param)
        this.modalFailOpen = true
      }
    },

    onClickPopupClose() {
      this.modalFailOpen = false
    },
  },
  beforeMount() {
    this.getInit()
  }
}
</script>
<style scoped>


button {
  margin-top: 20px;
  width: 100%;
  background: #881c2b;
  color: #fff;
  padding-top: 11px;
  padding-bottom: 11px;
  border-radius: 5px;
}


.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.modal-container {
  display: inline-block;
  /*width: auto;*/
  width: 500px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
  border-bottom: 2px solid #ccc;
}

.modal-body {
  margin: 20px 0;
  overflow: auto;
}

.modal-default-button {
  float: right;
}


.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
