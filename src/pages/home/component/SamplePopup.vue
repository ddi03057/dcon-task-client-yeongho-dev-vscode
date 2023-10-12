<template>
  <div v-if="modalIsOpen" class="modal">
    <div>
      <h3 class="modal-header">{{ modalTest }}</h3>
      <div>
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
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
          when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          It has survived not only five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged
        </p>
      </div>
<!--      <button @click="$emit('dismissModal')">-->
      <button @click="closePopup">
        Close
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
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

    // modal-open
   // "modalOpen"

  },
  methods:{
    closePopup(){
      let param = {}
      param.userId = 'userId'
      param.userEmail = 'userEmail'
      param.userName = 'userName'

      // this.$emit('dismissModal', param)
    }
  }

}
</script>
<style scoped>
.modal {
  position: fixed;
  width: 500px;
  min-height: 300px;
  top: 19%;
  left: 33%;
  padding: 10px;
  border: 6px solid #cccc;
}
.modal-header {
  border-bottom: 2px solid #ccc;
}
button {
  margin-top: 20px;
  width: 100%;
  background: #881c2b;
  color: #fff;
  padding-top: 11px;
  padding-bottom: 11px;
  border-radius: 5px;
}
</style>
