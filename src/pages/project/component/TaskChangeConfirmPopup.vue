<template>
  <div class="modal-mask" v-if="modalPopupChange">
    <div class="modal-wrapper">
      <div class="modal-container">

        <div class="modal-header">
          <slot name="header">
            <h3 class="modal-header">{{ modalSubject }}</h3>
          </slot>
        </div>

        <div class="modal-body">
          <slot name="body">
            <p>
              {{ $t('pages_project.create.task.name') }} : {{ taskName }}<br/>
              {{ $t('pages_project.create.task.status') }} : {{ code.codeName }}<br/>
              {{ $t('pages_project.create.task.task.user.id') }} : {{ userName }}<br/>

              {{ $t('pages_project.code.change.to') }}
            </p>
            <p v-if="'done' === taskStatus">
              {{ $t('pages_project.change.done.desc') }}
            </p>

          </slot>
        </div>


        <div class="modal-footer" style="margin-left: 80px">
          <slot name="footer">
            <button type="button" style="width: 100px" class="btn btn-primary" @click="onClickClosePop">
              {{ $t('common.cancel') }}
            </button>
            <button type="button" style="width: 100px" class="btn btn-primary" @click="onClickUpdateTask">
              {{ $t('common.edit') }}
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
import {CODE_TASK_STATUS} from "@/constants/constants";

export default {
  name: "IssueModal",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    IssueChangeFailPopup
  },
  data() {
    return {
      modalFailOpen: false,
      projectId: '',
      updateId: '',
      taskId: '',
      taskStatus: '',
      taskName: '',
      taskStatusName: '',
      task: '',
      modalFailSubject: '',
      modalFailParam: '',
      userId : '',
      taskDesc: '',
      userName : '',
      useYn : '',
      dueDate : '',
    }
  },
  props: {
    modalSubject: {
      type: String,
      default: ''
    },
    modalPopupChange: {
      type: Boolean,
      default: false
    },
    modalParam: {
      type: String,
      default: ''
    },
  },
  computed: {
    ...mapGetters('code', ['code']),
    ...mapGetters('user', ['userInfo','projectUserDetail']),
    ...mapGetters('project', ['taskDetailUpdateResult'])
  },
  methods: {
    ...mapActions('code', ['getCode']),
    ...mapActions('project', ['putTaskDetailUpdate']),
    ...mapActions('user', ['getProjectUserDetail']),

    async getInit() {
      let paramValue = JSON.parse(this.modalParam)

      this.projectId = paramValue.projectId
      this.updateId = this.userInfo.userId
      this.taskId = paramValue.taskId
      this.taskStatus = paramValue.taskStatus
      this.taskDesc = paramValue.taskDesc
      this.taskName = paramValue.taskName
      this.userId = paramValue.userId
      this.useYn = paramValue.taskUseYn
      this.dueDate = paramValue.dueDate

      if('' !== this.userId ){
        let param = {}
        param.userId = this.userId
        await this.getProjectUserDetail(param)
        this.userName = this.projectUserDetail.userName
      }else{

        this.userName = this.$t('pages_project.task.assign.no')
      }

      let CodeParam = {}
      CodeParam.codeGroupId = CODE_TASK_STATUS
      CodeParam.codeId = paramValue.taskStatus

      await this.getCode(CodeParam)

    },
    onClickClosePop(e) {

      e.preventDefault()
      e.stopPropagation()
      this.$emit('taskUpdateConfirmModal')
    },
    async onClickUpdateTask() {
      let param = {}
      param.projectId = this.projectId
      param.taskStatus = this.taskStatus
      param.taskId = this.taskId
      param.updateId = this.updateId
      param.userId = this.userId
      param.taskDesc = this.taskDesc
      param.useYn = this.useYn
      param.dueDate = this.dueDate
      await this.putIssueTaskUpdate(param)

    },
    async putIssueTaskUpdate(param){
      let toastParam ={}
      toastParam.position = 'top'
      toastParam.duration = false
      toastParam.max = ''
      toastParam.type = 'success'

      await this.putTaskDetailUpdate(param)

      let updateResult = this.taskDetailUpdateResult
      if (0 === updateResult.code) {
        this.$toast.show(this.$t('pages_project.task.update.ok'), toastParam)
        setTimeout(this.$toast.clear, 3000);

        this.$emit('taskUpdateConfirmModal', param)
      }else{
        this.modalFailSubject = updateResult.descKr

        let modalParam = {}
        modalParam.modalFailSubject = this.modalFailSubject
        modalParam.modalFailParam = this.$t('pages_project.error')
        this.modalFailParam = JSON.stringify(modalParam)
        this.modalFailOpen = true
      }

    },
    async updateStatus(param) {

      let toastParam ={}
      toastParam.position = 'top'
      toastParam.duration = false
      toastParam.max = ''
      toastParam.type = 'success'

      await this.putIssueStatus(param)

      let updateResult = this.updateResult
      if (0 === updateResult.code) {

        this.$toast.show(this.$t('pages_project.change.status.ok'), toastParam)
         setTimeout(this.$toast.clear, 3000);

         this.$emit('issueConfirmModal', param)
      } else {

        this.modalFailSubject = updateResult.descKr

        let modalParam = {}
        modalParam.modalFailSubject = this.modalFailSubject
        modalParam.modalFailParam = this.$t('pages_project.error')
        this.modalFailParam = JSON.stringify(modalParam)
        this.modalFailOpen = true

      }
    },
    onClickPopupClose(value) {

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
