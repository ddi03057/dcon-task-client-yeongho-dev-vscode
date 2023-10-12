<template>
<!--
    <div class="pop-wrap"  v-if="modalIsOpen">
      <div class="pop-cont -bg-white" style="width: 600px">
        <slot>
          <div class="pop-head -wrapper-between -py-3 -border-bottom">
            <span></span>
            <slot name="header">
              <h1 class="-h1 -font-weight-medium">{{ modalTest }}</h1>
            </slot>
            <g-button
              class="btn-close"
              variant="borderless"
              size="small"
              icon-only
              @click="onClickClose">
              <g-icon name="close" size="small" color="gray-1"></g-icon>
            </g-button>
          </div>
          <div class="pop-body -p-5" style="width: 600px">
            <slot name="body"></slot>
          </div>
          <div class="pop-foot -wrapper end- -p-5 -border-top" v-if="$slots.footer">
            <slot name="footer"></slot>
          </div>
        </slot>
      </div>
    </div>
  -->

<div class="modal" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p>Modal body text goes here.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary">Save changes</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  <div class="modal-mask" v-if="modalIsOpen">
    <div class="modal-wrapper">
      <div class="modal-container">

        <div class="modal-header">
          <slot name="header">
            <h3 class="modal-header">{{ modalTest }}</h3>
          </slot>
        </div>

        <div class="modal-body">
          <slot name="body">
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
              when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              It has survived not only five centuries, but also the leap into electronic typesetting,
              remaining essentially unchanged
            </p>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
              when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              It has survived not only five centuries, but also the leap into electronic typesetting,
              remaining essentially unchanged
            </p>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
              when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              It has survived not only five centuries, but also the leap into electronic typesetting,
              remaining essentially unchanged
            </p>
          </slot>
        </div>

        <div class="modal-footer" style="margin-left: 80px">
          <slot name="footer">

            <g-button variant="secondary" style="width: 150px" @click="onClickClose"><span>{{ $t('common.cancel') }}</span></g-button>
            <g-button variant="primary" style="width: 150px"  @click="closePopup"><span>{{ $t('common.ok') }}</span></g-button>
          </slot>
        </div>
      </div>
    </div>
  </div>
<!--  <SampleFailPopup :modalFailOpen="modalFailOpen" :modalTest="modalTest" :modalContents="modalContents" @dismissFailModal="onClikckPopupClose"></SampleFailPopup>-->
</template>

<script>
import SampleFailPopup from './SampleFailPopup'

export default {
  name: "Modal",
  components: {
    SampleFailPopup
  },

  data() {
    return {
      modalFailOpen : false,
      modalContents :''
    }
  },
  props: {

    modalTest: {
      type: String,
      default: ''
    },
    value: {
      type: Number,
      default: 0
    },
    tabNames: {
      required: true,
      type: Array,
      default: () => []
    },
    modalIsOpen: {
      type: Boolean,
      default: false
    },


  },
  methods:{
    onClickClose (e) {
      e.preventDefault()
      e.stopPropagation()

      // this.$emit('dismissModal')
      //this.display = false
    },
    onClickCancel(){
      // this.$emit('dismissModal')
    },
    onClikckPopupClose(value){
      this.modalFailOpen = false
    },

    closePopup(){
      let param = {}
      param.userId = 'userId-test'
      param.userEmail = 'ass'
      param.userName = 'ggg'


      this.modalContents = param
      this.modalFailOpen = true

     // this.$emit('dismissModal', param)
    }
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
  align-items:center;
  justify-content:center;
  height:100%;
}

.modal-container {
  display:inline-block;
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

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

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
