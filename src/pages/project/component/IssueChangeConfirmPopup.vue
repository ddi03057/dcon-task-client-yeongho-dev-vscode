<template>
  <div class="modal-mask" v-if="modalPopupChange">
    <div class="modal-wrapper">
      <div class="modal-container">

        <div class="modal-header">
          <slot name="header">
            <h3 class="modal-header">{{ modalSubject }}</h3>
          </slot>
        </div>

        <div class="modal-body" v-if=" 'status' === task">
          <slot name="body">
            <p>
              {{ taskName }}{{ $t('pages_project.statusof') }}
              {{ codeName }}{{ $t('pages_project.code.change.to') }}

            </p>
            <p v-if="'done' === taskStatus">
              {{ $t('pages_project.change.done.desc') }}
            </p>

          </slot>
        </div>
        <div class="modal-body" v-else-if=" 'assign' === task">
          <slot name="body">
            <p v-if=" '' !== userId ">

              {{ taskName }}  {{ $t('pages_project.task.user.change') }}
              {{ projectUserDetail.userName }}{{ $t('pages_project.code.change.to') }}

            </p>
            <p v-else>
              {{$t('pages_project.task.no.user')}}
            </p>

          </slot>
        </div>

        <div class="modal-footer" style="margin-left: 80px">
          <slot name="footer">
            <button type="button" style="width: 100px" class="btn btn-primary" @click="onClickClosePop">
              {{ $t('common.cancel') }}
            </button>
            <button type="button" style="width: 100px" class="btn btn-primary" @click="onClickChangeStatus">
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
import {CODE_ASSIGN, CODE_STATUS, CODE_TASK_STATUS} from "@/constants/constants";

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
      taskId: '',
      taskStatus: '',
      taskName: '',
      taskStatusName: '',
      task: '',
      modalFailSubject: '',
      modalFailParam: '',
      userId : '',
      codeName : '',
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
    ...mapGetters('project', ['updateResult','updateAssignResult'])
  },
  methods: {
    ...mapActions('code', ['getCode']),
    ...mapActions('project', ['putIssueStatus','putIssueTaskAssign']),
    ...mapActions('user', ['getProjectUserDetail']),

    async getInit() {
      let paramValue = JSON.parse(this.modalParam)

      this.projectId = paramValue.projectId
      this.taskId = paramValue.taskId
      this.taskStatus = paramValue.taskStatus
      this.taskName = paramValue.taskName
      this.task = paramValue.task
      this.userId = paramValue.userId

      if (CODE_ASSIGN === this.task) {
        let param = {}
        if('' !== this.userId){
          param.userId = this.userId
          await this.getProjectUserDetail(param)
        }

      }else{
        let CodeParam = {}
        CodeParam.codeGroupId = CODE_TASK_STATUS
        CodeParam.codeId = paramValue.taskStatus
        console.log('CodeParam::{}',CodeParam)
        console.log('modalSubject::{}',this.modalSubject)
        await this.getCode(CodeParam)
        this.codeName = this.code.codeName

      }

    },
    onClickClosePop(e) {
      e.preventDefault()
      e.stopPropagation()
      this.$emit('issueConfirmModal')
    },
    async onClickChangeStatus() {
      let param = {}
      param.projectId = this.projectId
      param.taskId = this.taskId
      param.taskStatus = this.taskStatus
      param.task = this.task
      param.userId = this.userId

      if (CODE_STATUS === this.task) {
        await this.updateStatus(param)
      } else {
        await this.updateTaskUserChange(param)
      }


    },
    async updateTaskUserChange(param){
      let toastParam ={}
      toastParam.position = 'top'
      toastParam.duration = false
      toastParam.max = ''
      toastParam.type = 'success'

      await this.putIssueTaskAssign(param)

      let updateResult = this.updateAssignResult
      if (0 === updateResult.code) {
        this.$toast.show(this.$t('pages_project.change.task.user.ok'), toastParam)
        setTimeout(this.$toast.clear, 3000);

        this.$emit('issueConfirmModal', param)
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
