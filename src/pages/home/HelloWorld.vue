<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener">babel</a></li>
    </ul>

<!--    <button @click="modalOpen = true">-->
    <button @click="onClikckPopupOpen">
      Open popup
    </button>

<!--    <SamplePopup :modal-open="modalOpen" @dismissModal="modalOpen = false"></SamplePopup>-->
<!--    <SamplePopup :modalIsOpen="modalOpen" :modalTest="modalTest" @dismissModal="onClikckPopupClose"></SamplePopup>-->

  </div>
</template>

<script>
import SamplePopup from './component/SamplePopup'

export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  components :{
    SamplePopup
  },
  data(){
    return{
      showModal: false,
      modalOpen: false,
      modalTest :'modalTest'
    };
  },
  methods:{
    onClikckPopupOpen(){

      this.modalOpen = true
    },
    onClikckPopupClose(value){
      this.modalOpen = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
