<template>
  <sidebar-menu
      v-model:collapsed="collapsed"
      :menu="menuLeftList"
      :theme="selectedTheme"
      :show-one-child="true"
      @click="onToggleCollapse"
      @item-click="onItemClick"
  />

  <div
      v-if="isOnMobile && !collapsed"
      class="sidebar-overlay"
      @click="collapsed"
  />

</template>

<script>

import {SidebarMenu} from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
import {mapActions, mapGetters, mapMutations} from "vuex";

const separator = {
  template: '<hr style="border-color: rgba(0, 0, 0, 0.1); margin: 20px;">'
}

export default {
  name: "LeftMenu",
  components: {
    SidebarMenu,

  },
  props: {
    id: {
      type: String,
      default: ''
    },
    boardType: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      collapsed: true,

      selectedTheme: 'white-theme',
      isOnMobile: false,
      childListCount : 0,
      projectId : ''
    }

  },
  computed: {
    ...mapGetters('menu', ['menuTopList', 'menuLeftList', 'menuLeftInfo', 'collapsed', 'menuTopList']),
    ...mapGetters('user', ['userInfo']),
    ...mapGetters('project', ['userFirstProjectId'])
  },
  mounted() {

    this.onResize()
    window.addEventListener('resize', this.onResize)
  },

  async beforeMount() {
    await this.getInit()
  },

  methods: {

    ...mapMutations('menu', ['toggleConfigurator']),
    ...mapActions('menu', ['getLeftMenuList', 'getToggleMenuList']),
    ...mapActions('project', ['getUserFirstProjectId']),
    async getInit() {

      let param = {}
      param.userEmail = this.userInfo.userEmail
      param.userId = this.userInfo.userId


      let childList = ''
      let childListCount =  0

      for (let key in this.menuTopList) {
        // eslint-disable-next-line no-unused-vars
        childList = this.menuTopList[key].child
        if(null == childList){
          // eslint-disable-next-line no-unused-vars
          childListCount ++
        }

      }
      this.childListCount = childListCount


      let projectId = ''
      if (this.$route.params.projectId === undefined || null === this.$route.params.projectId) {
        //projectId = this.menuTopChildList[0].projectId
        await this.getUserFirstProjectId(param)
        this.projectId = this.userFirstProjectId
      } else {
        this.projectId = this.$route.params.projectId
      }

      await this.getUrlParams(projectId);
    },

    async getUrlParams() {
      let param = {}

      param.projectId = this.projectId
      param.userId = this.userInfo.userId
      await this.getLeftMenuList(param)

      this.menuLeftList.unshift(this.menuLeftInfo)
    },
    async getUrl(projectId) {
      await this.getUrlParams(projectId);
    },
    onToggleCollapse() {

      this.getToggleMenuList()
    },

    onItemClick(event, item) {

    },
    onResize() {
      if (window.innerWidth <= 767) {
        this.isOnMobile = true
        this.collapsed = true
      } else {
        this.isOnMobile = false
        this.collapsed = false
      }
    }
  },

  watch: {
    $route(to, form) {

      if (to.path !== form.path) {

        this.getUrl(to.params.projectId)
      }

    }
  },

}
</script>
<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600');
@import "vue-sidebar-menu/src/scss/vue-sidebar-menu.scss";

</style>
