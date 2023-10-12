<template>

</template>


<script>
import {mapActions, mapGetters} from "vuex";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Home',

  data() {
    return {
      projectId : ''
    }
  },
  computed: {
    ...mapGetters('user', ['userInfo']),
  },
  methods:{


    ...mapActions('project', ['getUserFirstProjectId']),
    async getInit() {

      let param = {}
      param.userEmail = this.userInfo.userEmail
      param.userId = this.userInfo.userId

      this.projectId = await this.getUserFirstProjectId(param)
     // await this.$router.push('/project/issue/' + this.projectId)
    },


  },

  beforeMount() {
    this.getInit()
  },

}
</script>
<style lang="scss" scoped>
.vue-select {
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  width: 150px;
  border-radius: 4px;
  border: 1px solid #999;
  box-sizing: border-box;
  outline: none;
}


  .modal {
    width: 300px;
    padding: 30px;
    box-sizing: border-box;
    background-color: #fff;
    font-size: 20px;
    text-align: center;
  }

  .p-dropdown {
    width: 14rem;
  }

  .country-item-value {
    img.flag {
      width: 17px;
    }
  }

</style>
