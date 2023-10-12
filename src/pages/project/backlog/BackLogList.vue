<template>
  <div
      :class="[{'collapsed' : collapsed}]"
      class="dcon-menu-left bg-light">

    <div class="dcon-left">
      <div class="mb-3">
        <div class="container">
          <BreadcrumbComponent :breadcrumb-items="breadcrumbItems" />
          <select id="backlog_task_code" @change="changeStatus($event)">
            <option value="">{{ $t('pages_project.status') }}</option>
            <option
                v-for="(selectItem, index) in codeList"
                :key="index"
                :value="selectItem.codeId"
                v-show="selectItem.codeId !== 'backlog'"
            >
              {{ selectItem.codeName }}
            </option>
          </select>
          &nbsp;&nbsp;
          <button type="button" class="btn btn-primary" @click="onClickMoveTask()">
            {{ $t('pages_project.move') }}
          </button>
          &nbsp;&nbsp;
          <button type="button" class="btn btn-primary" @click="onClickCreateTask()">
            {{ $t('pages_project.create') }}
          </button>
          &nbsp;&nbsp;
          <button type="button" class="btn btn-primary" @click="onClickDeleteTask">
            {{ $t('pages_project.delete') }}
          </button>

          <br>
          <br>

          <div class="mb-3">
            <div class="table-wrapper-scroll-y my-custom-scrollbar">
              <table id="sample-table" class="table">
                <caption> </caption>
                <colgroup>
                  <col style="width: 150px;"/>
                  <col/>
                </colgroup>
                <tbody>
                  <tr>
                    <th scope="col"> <input type="checkbox" v-model="selectAll"> </th>
                    <th scope="col">{{ $t('pages_project.create.task.name') }}</th>
                    <th scope="col">{{ $t('pages_project.create.task.task.user.id') }}</th>
                  </tr>
                  <tr v-for="(item) in backlogList" v-bind:key="item.taskId">
                    <td> <input type="checkbox" v-model="taskIdList" :value="item.taskId" @change="addBacklogCheckedList(item)"> </td>
                    <td>{{ item.taskName }}</td>
                    <td>
                      <select class="ms-2 select"
                              @change="onChangeTaskUser($event, item.taskId,item.taskName)">
                        <option value="">{{ $t('pages_project.select.desc') }}</option>
                        <option
                            v-for="(selectItem, index) in projectUserList"
                            :key="index"
                            :value="selectItem.userId"
                            :selected="selectItem.userId === item.userId"
                        >
                          {{ selectItem.userName }}
                        </option>
                      </select>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="modalPopupChange">
    <ProjectChangeConfirmPopup :modalPopupChange="modalPopupChange" :modalSubject="modalSubject" :modalParam="modalParam"
                            @changeCancel="onCliickPopupClose"  @changeProgress="changeProgress" :data="$data"/>
  </div>
  <div v-if="modalFailOpen">
    <ProjectChangeFailPopup :modalFailOpen="modalFailOpen" :modalFailSubject="modalFailSubject"
                         :modalFailParam="modalFailParam" @issueFailModal="onCliickPopupClose"/>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapState} from "vuex";
import {BACKLOG_TASK_STATUS, CODE_ASSIGN, CODE_TASK_STATUS} from "@/constants/constants";
import ProjectChangeConfirmPopup from "@/pages/project/component/ProjectChangeConfirmPopup";
import BreadcrumbComponent from "@/pages/project/component/BreadcrumbComponent";
import ProjectChangeFailPopup from "@/pages/project/component/ProjectChangeFailPopup";

export default {
  components: {
    ProjectChangeConfirmPopup,
    ProjectChangeFailPopup,
    BreadcrumbComponent,
    //   LeftMenu,
    //  Footer
  },
  data() {
    return {
      taskId : '',
      taskIdList : [],
      selectedStatus : '',
      selectedStatusName: '',
      selectedUserId: '',
      selectedUserName: '',
      modalPopupChange: false,
      modalParam: '',
      modalSubject:'',
      projectId: this.$route.params.projectId,
      action: '',

      modalFailOpen: false,
      modalFailSubject: '',
      modalFailParam: '',

      backlogCheckedList:[],

      breadcrumbItems: [
        {text: 'project', link: '/project/detail/'+ this.$route.params.projectId, lastItem : false },
        {text: 'backlog', link: '', lastItem: true},
      ],
    }
  },
  computed: {
    ...mapState('menu', ['collapsed']),
    ...mapGetters('user', ['userInfo']),
    ...mapGetters('code', ['codeList']),
    ...mapGetters('project', ['backlogList', 'projectUserList', 'updateAssignResult']),

    selectAll: {
      get: function () {
        return this.backlogList ? this.taskIdList.length === this.backlogList.length : false;
      },
      set: function (value) {

        let selected = [];

        if (value) {
          this.backlogCheckedList = this.backlogList;
          this.backlogList.forEach(function (task) {
            selected.push(task.taskId);
          });
        } else {
          this.backlogCheckedList = []
        }
        this.taskIdList = selected;
      }
    }
  },
  methods: {
    ...mapActions('code', ['getCodeList']),
    ...mapActions('project', ['getBacklogList', 'putIssueStatusList', 'getProjectUserList', 'putIssueTaskAssign', 'deleteTaskList']),

    async getInit() {
      let codeParam = {}
      codeParam.codeGroupId = CODE_TASK_STATUS
      await this.getCodeList(codeParam)

      let param = {};
      param.projectId = this.$route.params.projectId
      param.taskStatus = BACKLOG_TASK_STATUS
      param.userId = this.userInfo.userId

      this.projectId = param.projectId
      await this.getBacklogList(param)
    },

    async onClickMoveTask() {
      // todo : 팝업으로 처리
      if (this.selectedStatus === "") {
        alert(this.$t('pages_project.status.choice'));
        return false;
      } else if (this.taskIdList.length === 0) {
        alert(this.$t('pages_project.task.choice'))
        return false;
      }

      // 수정 컨펌 팝업 시작
      this.action = 'changeTaskStatus'
      this.modalSubject = this.$t('pages_project.change.code')
      let popupParam = {}
      popupParam.action = this.action
      popupParam.okFuncName = 'changeProgress'
      popupParam.cancelFuncName = 'changeCancel'
      popupParam.taskStatus = this.selectedStatus
      popupParam.taskStatusName = this.selectedStatusName
      this.modalParam = JSON.stringify(popupParam)
      this.modalPopupChange = true
      // 수정 컨펌 팝업 끝

    },
    async moveTaskProgress() {
      let param = {};
      param.projectId = this.projectId
      param.taskStatus = this.selectedStatus;
      param.taskIdList = this.taskIdList;
      param.updateId = this.userInfo.userId
      param.userId = this.userInfo.userId

      await this.putIssueStatusList(param);
      param.taskStatus = BACKLOG_TASK_STATUS
      await this.getBacklogList(param);
    },
    changeProgress() {
      if ('changeTaskStatus' === this.action) {
        this.moveTaskProgress();
      } else if (CODE_ASSIGN === this.action) {
        this.assignTaskUserProgress();
      } else if('deleteTaskList' === this.action) {
        this.deleteTaskProgress();
      }
      this.action = '';
      this.onCliickPopupClose();
    },
    changeStatus(event) {
      this.selectedStatus = event.target.value;
      this.selectedStatusName = event.target.options[event.target.options.selectedIndex].text;
    },

    onCliickPopupClose() {
      this.modalPopupChange = false
      this.getInit()

    },
    onChangeTaskUser(event,taskId, taskName) {
      this.action = CODE_ASSIGN
      this.selectedUserId = event.target.value;
      this.selectedUserName = event.target.options[event.target.options.selectedIndex].text;
      this.taskId = taskId

      let popupParam = {}
      popupParam.action = this.action
      popupParam.okFuncName = 'changeProgress'
      popupParam.cancelFuncName = 'changeCancel'
      popupParam.taskId = this.taskId
      popupParam.taskName = taskName
      popupParam.selectedUserName = this.selectedUserName

      this.modalParam = JSON.stringify(popupParam)

      this.modalSubject = this.$t('pages_project.change.assign')
      this.modalPopupChange = true
    },
    async assignTaskUserProgress() {

      let param = {};
      param.projectId = this.$route.params.projectId
      param.taskId = this.taskId
      param.taskStatus = ''
      param.userId = this.selectedUserId
      param.useYn = 'Y'

      await this.putIssueTaskAssign(param)

      let updateResult = this.updateAssignResult

      let toastParam ={}
      toastParam.position = 'top'
      toastParam.duration = false
      toastParam.max = ''
      toastParam.type = 'success'

      if (0 === updateResult.code) {
        this.$toast.show(this.$t('pages_project.change.task.user.ok'), toastParam)
        setTimeout(this.$toast.clear, 3000);
      }else{
        this.modalFailSubject = updateResult.descKr

        let param = {}
        param.modalFailSubject = this.modalFailSubject
        param.modalFailParam = this.$t('pages_project.error')
        this.modalFailParam = JSON.stringify(param)
        this.modalFailOpen = true
      }
    },
    onClickCreateTask() {
      this.$router.push('/project/issue/task/create/' + this.$route.params.projectId + '?taskType=backlog')
    },
    addBacklogCheckedList(item) {
      let duplicateIndex = this.backlogCheckedList
          .map(task => task.taskId)
          .indexOf(item.taskId);
      if ( duplicateIndex < 0) {
        this.backlogCheckedList.push(item)
      } else {
        this.backlogCheckedList.splice(duplicateIndex, 1);
      }
    },
    async onClickDeleteTask() {
      if ( this.backlogCheckedList !== null && this.backlogCheckedList.length > 0 ) {
        let assignedTask = this.backlogCheckedList
            .filter(task => task.userId !== null && task.userId !== 'null' && task.userId !== '')

        console.log("assignedTask : " , assignedTask)
        console.log("assignedTask.length :: ", assignedTask.length)



        if ( assignedTask != null && assignedTask.length > 0) {
          alert(this.$t('pages_project.assign.task.delete'))
        } else {
          if (this.taskIdList !== null && this.taskIdList.length > 0) {

            // 태스크 삭제 컨펌 팝업 시작
            this.action = 'deleteTaskList'
            let popupParam = {}
            popupParam.action = this.action
            popupParam.okFuncName = 'changeProgress'
            popupParam.cancelFuncName = 'changeCancel'
            this.modalParam = JSON.stringify(popupParam)

            this.modalSubject = '태스크 삭제'
            this.modalPopupChange = true
            // 태스크 삭제 컨펌 팝업 끝
          }
        }
      } else {
        alert(this.$t('pages_project.task.choice'))
      }
    },
    async deleteTaskProgress() {
      let param = {};
      param.taskIdList = this.taskIdList
      param.updateId = this.userInfo.userId;
      await this.deleteTaskList(param);
      await this.getInit();
    }
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
