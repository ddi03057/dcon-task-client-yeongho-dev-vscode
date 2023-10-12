<template>
  <div
      :class="[{'collapsed' : collapsed}]"
      class="dcon-menu-left bg-light"
  >
    <div class="dcon-left">
      <div class="mb-3">
        <div class="container">
          <BreadcrumbComponent :breadcrumbItems="breadcrumbItems"/>
          <div class="mb-3">

            <label for="projectId" class="form-label">{{ $t('pages_project.create.task.project.id') }}</label>
            <input type="text" v-model="projectId" class="form-control" aria-describedby="projectId" disabled>
          </div>
          <div class="mb-3">
            <label for="taskName" class="form-label">{{ $t('pages_project.create.task.name') }}</label>
            <input type="text" class="form-control" v-model="taskName" :placeholder=taskNamePlaceHolder disabled>
          </div>

          <div class="mb-3">
            <label for="taskStatus" class="form-label">{{ $t('pages_project.create.task.status') }}</label>
            <select class="form-select" aria-label="taskStatus" v-model="taskStatusCode" @change="onChangeCodeSelect">
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
            <select class="form-select" aria-label="taskUserId" v-model="taskUserIdCode" id="taskUserIdCode" @change="onChangeTaskUser">
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
            <label for="taskStatus" class="form-label">{{ $t('pages_project.task.use.yn') }}</label>
            <select class="form-select" aria-label="taskStatus" v-model="taskUseYn" @change="taskChangeUseYn"
                    :disabled="taskUseYnDisabled">
              <option value="">{{ $t('pages_project.select.desc') }}</option>
              <option
                  v-for="(selectItem, index) in codeYnList"
                  :key="index"
                  :value="selectItem.codeId"
              >
                {{ selectItem.codeName }}
              </option>
            </select>
          </div>

          <div class="mb-3">
            <label for="dueDate" class="form-label">{{ $t('pages_project.create.task.dueDate') }}</label>
            <datepicker v-model="dueDate" :min-date="new Date()" :format="format" :enable-time-picker="false" :clearable="false" auto-apply />
          </div>

          <div class="mb-3">
            <label for="taskDesc" class="form-label">{{ $t('pages_project.create.task.desc') }}</label>
            <textarea class="form-control" v-model="taskDesc" rows="3" :placeholder="taskDescPlaceHolder"></textarea>
          </div>

          <div class="mb-3">
            <label for="subItem" class="form-label">{{ $t('pages_project.create.task.sub.item.add') }}</label>
            <div class="input-group">

              <input type="text" class="form-control" v-model="subItem" :placeholder=subItemAddPlaceHolder />
              <button type="button" class="btn btn-primary" @click="onClickSubItemAdd">
                {{ $t('common.save') }}
              </button>
            </div>
          </div>


          <div class="mb-3">
            <div class="table-wrapper-scroll-y" style="overflow: auto">
              <table class="table table-bordered table-striped mb-0">
                <caption></caption>
                <thead>
                <tr>
                  <th class='fixedHeader' style="width: 60%; text-align: center" scope="col">
                    {{ $t('pages_project.sub.item.name') }}
                  </th>

                  <th class='fixedHeader' style="width: 7%; text-align: center" scope="col">{{ $t('pages_project.sub.item.name.complete.yn') }}</th>
                  <th class='fixedHeader' style="width: 10%; text-align: center" scope="col"> {{ $t('pages_project.create.issue') }}</th>
                  <th class='fixedHeader' style="width: 25%; text-align: center" scope="col"></th>
                </tr>
                </thead>
                <tbody v-if="taskSubItemList.length > 0">
                <tr v-for="(item ,index) in taskSubItemList">
                  <td>
                    <input type="text" class="form-control" :id="'sub_'+item.seq"  v-model="item.taskSubName" />
                  </td>
                  <td>
                    <select  class="form-select" v-model="item.completeYn" @change="onClickUpdateSubItemCompleteYn(item)">
                      <option value="">{{ $t('pages_project.select.desc') }}</option>
                      <option value = 'Y'>Y</option>
                      <option value = 'N'>N</option>
                    </select>
                  </td>
                  <td>
                    <select  class="form-select" :id="'sub_useYn_'+item.seq" @change="onClickUpdateSubItemUseYn(item)">
                      <option value="">{{ $t('pages_project.select.desc') }}</option>
                      <option value = 'Y'>Y</option>
                      <option value = 'N'>N</option>
                    </select>
                    <select class="form-select" :id="'sub_status_'+item.seq" v-show="subItemStatusShowYn" @change="onClickUpdateSubItemCreateIssue(item)" >
                      <option value="">{{ $t('pages_project.select.desc') }}</option>
                      <option
                          v-for="(selectItem, index) in codeList"
                          :key="index"
                          :value="selectItem.codeId"
                      >
                        {{ selectItem.codeName }}
                        </option>
                    </select>

                  </td>
                  <td>
                    <button type="button" class="btn btn-primary"
                            @click="onClickUpdateSubItem(item)">
                      {{ $t('common.edit') }}
                    </button> &nbsp;&nbsp;&nbsp;
                    <button type="button" class="btn btn-primary"
                            @click="onClickDeleteSubItem(item)">
                      {{ $t('common.delete') }}
                    </button>
                  </td>
                </tr>
                </tbody>
                <tbody v-if="taskSubItemList.length === 0">
                <tr>
                  <td style="text-align: center" colspan="4">{{ $t('pages_project.task.no.sub.item') }}</td>                </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="mb-3">
            <label for="taskDesc" class="form-label">{{ $t('pages_project.create.task.comment') }}</label>
            <button type="button" class="btn btn-primary" @click="onClickInsertTaskComment">
              {{ $t('pages_project.create.task.comment') }}
            </button>
            <textarea class="form-control" v-model="commentDesc" rows="3"
                      :placeholder="commentDescPlaceHolder"></textarea>
          </div>

          <div class="mb-3">
            <div class="table-wrapper-scroll-y table_container">
              <table class="table table-bordered table-striped mb-0">
                <caption></caption>
                <thead>
                <tr>
                  <th class='fixedHeader' style="width: 75%; text-align: center" scope="col">
                    {{ $t('pages_project.task.comment') }}
                  </th>
                  <th class='fixedHeader' style="width: 10%; text-align: center" scope="col">
                    {{ $t('pages_project.task.comment.user.name') }}
                  </th>
                  <th class='fixedHeader' style="width: 15%; text-align: center" scope="col"></th>
                </tr>
                </thead>
                <tbody v-if="taskCommentList.length > 0">
                <tr v-for="(item ,index) in taskCommentList">
                  <td>
                    <textarea class="form-control" :id="'task_'+item.seq" rows="3" :placeholder="taskDescPlaceHolder">{{ item.commentDesc }}</textarea>
                  </td>
                  <td>{{ item.userName }}</td>
                  <td>
                    <button type="button" class="btn btn-primary" v-if=" this.userInfo.userId === item.userId"
                            @click="onClickUpdateTaskComment(item)">
                      {{ $t('common.edit') }}
                    </button> &nbsp;&nbsp;&nbsp;
                    <button type="button" class="btn btn-primary" v-if=" this.userInfo.userId === item.userId"
                            @click="onClickDeleteTaskComment(item)">
                      {{ $t('common.delete') }}
                    </button>
                  </td>
                </tr>
                </tbody>
                <tbody v-if="taskCommentList.length === 0">
                <tr>
                  <td style="text-align: center" colspan="3">{{ $t('pages_project.task.comment.no') }}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="d-grid gap-2 d-md-flex justify-content-md-end">
            <button class="btn btn-primary me-md-2" type="button" @click="onClickCancel">{{ $t('common.cancel') }}
            </button>
            <button class="btn btn-primary" type="button" @click="onClickTaskUpdate">{{ $t('common.edit') }}</button>
          </div>

        </div>
      </div>
    </div>
  </div>
  <div v-if="modalPopupChange">
    <TaskChangeConfirmPopup :modalPopupChange="modalPopupChange" :modalSubject="modalSubject"
                            :modalParam="modalParam" @taskUpdateConfirmModal="onClickPopupClose"/>
  </div>

  <div v-if="modalTaskPopup">
    <TaskConfirmPopup :modalTaskPopup="modalTaskPopup" :modalTaskCreateSubject="modalTaskCreateSubject"
                      :modalCreateTaskParam="modalCreateTaskParam"  @createTaskConfirmModal="onClickPopupTaskClose" />
  </div>
</template>
<script>
import TaskChangeConfirmPopup from '../component/TaskChangeConfirmPopup'
import {mapActions, mapGetters} from "vuex";
import {CODE_TASK_STATUS, CODE_USE_YN, DONE_TASK_STATUS} from "@/constants/constants";
import BreadcrumbComponent from "@/pages/project/component/BreadcrumbComponent";

import {v4 as uuidv4} from 'uuid';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import TaskConfirmPopup from "@/pages/project/component/TaskConfirmPopup";

export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    TaskChangeConfirmPopup,
    BreadcrumbComponent,
    Datepicker,
    TaskConfirmPopup
  },
  data() {
    return {
      collapsed: true,
      projectId: '',
      taskId: '',
      breadcrumbItems: [
        {text: 'project', link: '/project/detail/' + this.$route.params.projectId, lastItem: false},
        {text: 'issue', link: '/project/issue/' + this.$route.params.projectId, lastItem: false},
        {text: 'task detail', link: '', lastItem: true},
      ],
      modalParam: '',
      modalPopupChange: false,
      modalSubject: '',
      taskName: '',
      taskStatus: '',
      taskStatusCode: '',
      taskDesc: '',
      taskNamePlaceHolder: this.$t('pages_project.create.task.name'),
      taskDescPlaceHolder: this.$t('pages_project.create.task.desc'),
      subItemAddPlaceHolder: this.$t('pages_project.create.task.sub.item.add'),
      commentDescPlaceHolder: this.$t('pages_project.create.task.comment'),
      taskUserId: '',
      taskUserIdCode: '',
      taskUseYn: '',
      taskUseYnDisabled: false,
      commentDesc: '',
      subItem: '',
      taskSubId: '',
      dueDate:'',
      format:'yyyy-MM-dd',
      modalTaskPopup: false,
      modalCreateTaskParam: '',
      modalTaskCreateSubject: '',
      subItemStatusShowYn : false
    }
  },
  computed: {
    ...mapGetters('user', ['userInfo']),
    ...mapGetters('code', ['codeList', 'codeYnList']),
    ...mapGetters('project', ['taskDetail', 'projectUserList', 'taskCommentList',
                              'updateTaskCommentResult', 'deleteTaskCommentResult',
                              'insertTaskCommentResult','insertTaskSubItemResult','taskSubItemList',
                              'updateTaskSubItemResult','deleteTaskSubItemResult']),
  },
  methods: {
    ...mapActions('code', ['getCodeList', 'getCodeYnList']),
    ...mapActions('project', ['getTaskDetail', 'getProjectUserList', 'getTaskCommentList',
                             'updateTaskComment', 'deleteTaskComment', 'insertTaskComment','insertTaskSubItem',
                            'getTaskSubItemList','updateTaskSubItem','deleteTaskSubItem']),

    async getInit() {

      this.projectId = this.$route.params.projectId
      this.taskId = this.$route.params.taskId
      let param = {};
      param.projectId = this.projectId
      param.taskId = this.taskId
      param.userId = this.userInfo.userId

      await this.getTaskDetail(param)
      let subParam = {};
      subParam.projectId = this.projectId
      subParam.taskId = this.taskId
      await this.getTaskSubItemList(subParam)

      await this.getProjectUserList(param)
      await this.getTaskCommentList(param)

      param.codeGroupId = CODE_TASK_STATUS
      await this.getCodeList(param)
      //
      param.codeGroupId = CODE_USE_YN
      await this.getCodeYnList(param)

      this.taskUserId = this.taskDetail.taskUserId
      this.taskUserIdCode = this.taskDetail.taskUserId
      this.taskStatus = this.taskDetail.taskStatus
      this.taskStatusCode = this.taskDetail.taskStatus
      this.taskDesc = this.taskDetail.taskDesc
      this.taskName = this.taskDetail.taskName
      this.taskUseYn = this.taskDetail.useYn
      this.dueDate = new Date(this.taskDetail.dueDate)

      if ('' !== this.taskUserIdCode) {
        this.taskUseYnDisabled = false
      } else {
        this.taskUseYnDisabled = false
      }
    },
    onChangeCodeSelect() {
      this.taskStatus = this.taskStatusCode
    },
    taskChangeUseYn() {

      if ('' !== this.taskUserIdCode) {
        this.taskUseYnDisabled = true
      } else {
        this.taskUseYnDisabled = false
      }
    },
    onChangeTaskUser() {
      this.taskUserId = this.taskUserIdCode
    },
    onClickCancel() {
      history.go(-1)
    },
    onClickTaskUpdate() {

      let param = {}
      param.projectId = this.projectId
      param.taskId = this.taskId
      param.taskName = this.taskName
      param.userId = this.taskUserId
      param.taskStatus = this.taskStatus
      param.taskDesc = this.taskDesc
      param.taskUseYn = this.taskUseYn
      param.dueDate = this.dueDate.getFullYear() + '-' + this.getDueDate('month') + '-' + this.getDueDate('day')

      if ('' === this.taskUserId && DONE_TASK_STATUS === this.taskStatus) {
        let message = this.$t('pages_project.task.assign.no.done')
        this.taskSaveWarining(message)
      } else if ('' === this.taskUseYn) {
        let message = this.$t('pages_project.task.use.yn.require')
        this.taskSaveWarining(message)
      } else {
        this.modalParam = JSON.stringify(param)
        this.modalSubject = this.$t('pages_project.update.task')
        this.modalPopupChange = true
      }

    },
    taskSaveWarining(message) {
      let toastParam = {}
      toastParam.position = 'top'
      toastParam.duration = false
      toastParam.max = ''
      toastParam.type = 'error'

      this.$toast.show(message, toastParam)
      setTimeout(this.$toast.clear, 3000);
    },
    onClickPopupClose(value) {
      this.modalPopupChange = false
      if (value != null) {
        this.$router.push('/project/issue/' + this.$route.params.projectId)
      }

    },

    onClickPopupTaskClose(value){
      this.modalTaskPopup = false
      if(value != null){
        this.$router.push('/project/issue/'+ this.$route.params.projectId)
      }
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
    async onClickUpdateTaskComment(item) {
      let param = {}
      param.seq = item.seq
      param.commentDesc = document.getElementById('task_' + item.seq).value
      param.userId = this.userInfo.userId
      param.projectId = this.projectId
      param.taskId = this.taskId

      await this.updateTaskComment(param)
      let updateTaskCommentResult = this.updateTaskCommentResult
      await this.commonMessageToastPop(updateTaskCommentResult.descKr, updateTaskCommentResult.code)
      await this.getInit()

    },
    async onClickDeleteTaskComment(item) {
      let param = {}
      param.seq = item.seq
      param.projectId = this.projectId
      param.taskId = this.taskId

      await this.deleteTaskComment(param)
      let deleteTaskCommentResult = this.deleteTaskCommentResult
      await this.commonMessageToastPop(deleteTaskCommentResult.descKr, deleteTaskCommentResult.code)
      await this.getInit()
    },

    async onClickInsertTaskComment() {
      let param = {}
      param.projectId = this.projectId
      param.taskId = this.taskId
      param.userId = this.userInfo.userId
      param.commentDesc = this.commentDesc

      await this.insertTaskComment(param)
      let insertTaskCommentResult = this.insertTaskCommentResult
      await this.commonMessageToastPop(insertTaskCommentResult.descKr, insertTaskCommentResult.code)
      await this.getInit()

    },
    getDueDate(type) {

      let value;
      if ( type === 'month') {
        value = this.dueDate.getMonth() + 1
      } else {
        value = this.dueDate.getDate()
      }
      return value < 10 ? "0"+value : value;
    },

    async onClickSubItemAdd(){
      let param = {}
      param.projectId = this.projectId
      param.taskId = this.taskId
      param.taskSubId = uuidv4()
      param.taskSubName = this.subItem

      await this.insertTaskSubItem(param)
      let insertTaskSubItemResult = this.insertTaskSubItemResult
      await this.commonMessageToastPop(insertTaskSubItemResult.descKr, insertTaskSubItemResult.code)
      this.subItem = ''
      await this.getInit()
    },
    async onClickUpdateSubItem(item){

      let param = {}
      param.projectId = item.projectId
      param.taskId = item.taskId
      param.userId = this.userInfo.userId
      param.taskSubId = item.taskSubId
      param.taskSubName = item.taskSubName
      param.seq = item.seq
      param.completeYn = item.completeYn


      await this.updateTaskSubItem(param)
      let updateTaskSubItemResult = this.updateTaskSubItemResult
      await this.commonMessageToastPop(updateTaskSubItemResult.descKr, updateTaskSubItemResult.code)

      await this.getInit()

    },
    async onClickDeleteSubItem(item){
      let param = {}
      param.projectId = item.projectId
      param.taskId = item.taskId
      param.userId = this.userInfo.userId
      param.taskSubId = item.taskSubId
      param.taskSubName = item.taskSubName
      param.seq = item.seq
      param.completeYn = item.completeYn


      await this.deleteTaskSubItem(param)
      let deleteTaskSubItemResult = this.deleteTaskSubItemResult
      await this.commonMessageToastPop(deleteTaskSubItemResult.descKr, deleteTaskSubItemResult.code)

      await this.getInit()

    },
    async onClickUpdateSubItemCompleteYn(item){
      await this.onClickUpdateSubItem(item)
    },

    onClickUpdateSubItemUseYn(item){
      let useYnId = document.getElementById('sub_useYn_'+item.seq).value

      if('N' === useYnId){
        this.subItemStatusShowYn = false
      }else{
        this.subItemStatusShowYn = true
      }


    },
    onClickUpdateSubItemCreateIssue(item){
      let subStatusId = document.getElementById('sub_status_'+item.seq).value

      let toastParam = {}
      toastParam.position = 'top'
      toastParam.duration = false
      toastParam.max = ''
      toastParam.type = 'error'

      if('' ===subStatusId){

        this.$toast.show(this.$t('pages_project.status.choice'), toastParam)
        setTimeout(this.$toast.clear, 3000);
        document.getElementById('sub_status_'+item.seq).focus()
        return
      }

      if(DONE_TASK_STATUS === subStatusId){
        if(''===this.taskUserIdCode){
          this.$toast.show(this.$t('pages_project.task.assign.no.done'), toastParam)
          setTimeout(this.$toast.clear, 3000);
         document.getElementById('taskUserIdCode').focus()
          return;
        }
      }

      let param = {}
      param.projectId = item.projectId
      param.taskId = item.taskId
      param.taskName = item.taskSubName
      param.userId = this.taskUserIdCode
      param.taskStatus = subStatusId
      param.taskDesc = item.taskSubName
      param.createGubun = 'sub'
      param.taskSubId = item.taskSubId
      param.seq = item.seq
      param.dueDate = this.dueDate.getFullYear() + '-' + this.getDueDate('month', this.dueDate) + '-' + this.getDueDate('day', this.dueDate)

      this.modalCreateTaskParam = JSON.stringify(param)
      this.modalTaskCreateSubject = this.$t('pages_project.create.task')
      this.modalTaskPopup = true
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
