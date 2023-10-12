<template>

  <div class="modal-mask" v-if="modalPopupLogout">
    <div class="modal-wrapper">
      <div class="modal-container">

        <div class="modal-header">
          <slot name="header">
            <h3 class="modal-header">{{ $t('common.logout') }}</h3>
          </slot>
        </div>

        <div class="modal-body">
          <slot name="body">
            <p>
             {{ $t('common.logout.require') }}


            </p>


          </slot>
        </div>

        <div class="modal-footer" style="margin-left: 80px">
          <slot name="footer">
            <button type="button" style="width: 100px" class="btn btn-primary" @click="onClickClosePop">
              {{ $t('common.cancel') }}
            </button>
            <button type="button" style="width: 100px" class="btn btn-primary" @click="onClickLogOut">
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
  name: "LogOutModal",
  data() {
    return {

    }
  },
  props: {
    modalPopupLogout: {
      type: Boolean,
      default: false
    },
  },
  methods: {

    onClickClosePop(e) {
      e.preventDefault()
      e.stopPropagation()
      this.$emit('logOutConfirmModal')
    },

    onClickLogOut(e){
      e.preventDefault()
      e.stopPropagation()
      this.$emit('logOutConfirmModal', 'OK')
    }
  },
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
