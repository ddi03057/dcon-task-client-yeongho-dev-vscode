<template>
  <div class="modal-mask" v-if="modalPopupChange">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <slot name="header">
            <h3 class="modal-header">{{ modalSubject }}</h3>
          </slot>
        </div>

        <!-- 태크스 상태 변경 -->
        <div class="modal-body" v-if=" 'changeTaskStatus' === action">
          <slot name="body">
            <p>
              선택된 항목{{ $t('pages_project.statusof') }}
              {{ taskStatusName }}{{ $t('pages_project.code.change.to') }}
            </p>
            <p v-if="'done' === taskStatus">
              {{ $t('pages_project.change.done.desc') }}
            </p>
          </slot>
        </div>
        <!-- 담당자 할당 -->
        <div class="modal-body" v-else-if=" 'assign' === action">
          <slot name="body">
            <p>
              {{ taskName }}  {{ $t('pages_project.task.user.change') }}
              {{ selectedUserName }}{{ $t('pages_project.code.change.to') }}
            </p>
          </slot>
        </div>

        <!-- 프로젝트 추가 -->
        <div class="modal-body" v-else-if=" 'projectCreate' === action">
          <slot name="body">
            <p>
              {{ projectName }} 이름으로 프로젝트를 생성하시겠습니까?
            </p>
          </slot>
        </div>
        <!-- 태스크 삭제, 프로젝트 수정 -->
        <div class="modal-body" v-else>
          <slot name="body">
            <p>
              {{ printString }}
            </p>
          </slot>
        </div>

        <div class="modal-footer" style="margin-left: 80px">
          <slot name="footer">
            <button type="button" style="width: 100px" class="btn btn-primary" @click="onClickClosePop">
              {{ $t('common.cancel') }}
            </button>
            <button type="button" style="width: 100px" class="btn btn-primary" @click="onClickProgress">
              {{ $t('common.ok') }}
            </button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProjectTaskModal",
  data() {
    return {
      action: '',
      projectName:'',
      taskStatus:'',
      taskStatusName: '',
      taskName:'',
      selectedUserName: '',
      okFuncName:'',
      cancelFuncName:'',
      printString:'',
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

  methods: {
    async getInit() {

      if ( this.modalParam !== null && this.modalParam !== '') {
        let paramValue = JSON.parse(this.modalParam)

        this.action = paramValue.action
        this.okFuncName = paramValue.okFuncName
        this.cancelFuncName = paramValue.cancelFuncName

        if ('changeTaskStatus' === this.action) {
          this.taskStatus = paramValue.taskStatus
          this.taskStatusName = paramValue.taskStatusName
        } else if('assign' === this.action) {
          this.taskName = paramValue.taskName
          this.selectedUserName = paramValue.selectedUserName
        } else if('projectCreate' === this.action) {
          this.projectName = paramValue.projectName
        } else if('projectUpdate' === this.action) {
          this.printString = '프로젝트를 수정하시겠습니까?'
        } else if('deleteTaskList' === this.action) {
            this.printString = '선택된 태스크를 삭제하시겠습니까?'
        }
      }
    },
    onClickClosePop(e) {
      e.preventDefault()
      e.stopPropagation()
      this.$emit(this.cancelFuncName)
    },
    onClickProgress() {
      this.$emit(this.okFuncName)
    }
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
