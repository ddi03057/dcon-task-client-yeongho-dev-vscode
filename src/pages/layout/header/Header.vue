<template>
  <div
      :class="[{'collapsed' : collapsed}]"
      calss="dcon-menu-left bg-light"
      style="padding-left: 150px"
  >
    <nav class="navbar navbar-expand-lg navbar-light bg-white">
      <div class="container-fluid">
        <div class="collapse navbar-collapse" id="navbarExample01">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0" v-if="menuTopList.length ===childListCount">

            <li :class="item.menuLiClass" v-for="(item, index) in menuTopList">
<!--              item=={{item}}-->
              <a :class="item.menuLiAClass" style="cursor: pointer" :id=item.menuId
                 role="button" data-bs-toggle="dropdown" aria-expanded="false">
                {{ item.menuName }}
              </a>
              <ul class="dropdown-menu">
                <li v-if=" 'Home' === item.menuName ">
                  <a class="dropdown-item" style="cursor: pointer" @click="onClickMoveMenu(item)">Home</a>
                </li>
                <li v-if=" 'Project' === item.menuName ">
                  <a class="dropdown-item" style="cursor: pointer" @click="onClickProjectAdd">{{ $t('pages_project.add') }}</a>
                </li>
                <li v-else-if=" 'MyInfo' === item.menuName ">
                  <a class="dropdown-item" style="cursor: pointer" @click="onClickLogOutConfirm">{{ $t('common.logout') }}</a>
                </li>
              </ul>

           </li>
          </ul>
          <ul class="navbar-nav me-auto mb-2 mb-lg-0" v-else>
            <li :class="item.menuLiClass" v-for="(item, index) in menuTopList">
              <a :class="item.menuLiAClass" style="cursor: pointer" :id=item.menuId
                 role="button" data-bs-toggle="dropdown" aria-expanded="false">
                {{ item.menuName }}
              </a>
              <ul class="dropdown-menu" v-for="(children,idx) in item.child"
                  :aria-labelledby=children.menuId>
                <li v-for="(childrenIdx,idx) in item.child">

                  <a class="dropdown-item" @click="onClickMoveMenu(childrenIdx)"
                     style="cursor: pointer">{{ childrenIdx.projectName }}</a>
                </li>
                <li v-if=" 'Project' === item.menuName ">
                  <a class="dropdown-item" style="cursor: pointer" @click="onClickProjectAdd">{{ $t('pages_project.add') }}</a>
                </li>
                <li v-else-if=" 'MyInfo' === item.menuName ">
                  <a class="dropdown-item" style="cursor: pointer" @click="onClickLogOutConfirm">{{ $t('common.logout') }}</a>
                </li>
              </ul>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  </div>
  <div v-if="modalPopupLogout">
    <LogOutConfirm :modalPopupLogout="modalPopupLogout" @logOutConfirmModal="onClickPopupClose"/>
  </div>
</template>
<script>

import {mapActions, mapGetters} from "vuex";
import {USER_HOME, USER_MY_INFO, USER_PROJECT} from "@/constants/constants";
import LogOutConfirm from './LogOutConfirm'


export default {
  name: 'DCON_Header',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    LogOutConfirm
  },
  data() {
    return {
      userEmail: '',
      userName: '',
      seq: '',
      insertUserEmail: '',
      insertUserName: '',
      isOnMobile: false,
      collapsed: true,
      modalPopupLogout: false,
      childListCount : 0,
    }
  },
  props: {},

  computed: {
    ...mapGetters('menu', ['menuTopList']),
    ...mapGetters('user', ['userInfo']),
    ...mapGetters('project', ['userFirstProjectId']),
  },
  methods: {

    ...mapActions('menu', ['getTopMenuList']),
    ...mapActions('project', ['getUserFirstProjectId']),

    onClickMoveMenu(item) {

      if(USER_HOME === item.menuName){
        this.$router.push('/home')
      }else  if(USER_PROJECT === item.menuName){
        this.$router.push('/project/issue/' + item.projectId)
      }else  if(USER_MY_INFO === item.menuName){
        alert('준비중 입니다.')
      }
    },
    onClickProjectAdd() {
      this.$router.push('/project/create')
    },
    getInit: async function () {
      let param = {}
      param.userEmail = this.userInfo.userEmail
      param.userId = this.userInfo.userId

      await this.getTopMenuList(param)
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
      if (undefined === this.$route.params.projectId || null === this.$route.params.projectId) {

        await this.getUserFirstProjectId(param)
        this.projectId = this.userFirstProjectId
      } else {
        this.projectId = this.$route.params.projectId
      }
      // await this.$router.push('/project/issue/' + this.projectId)

    },
    async onClickLogOut() {
      window.keycloak.logout();
    },

    async onClickLogOutConfirm() {
     this.modalPopupLogout = true
    },

    onClickPopupClose(value) {
      this.modalPopupLogout = false
      if(undefined !== value){
        this.onClickLogOut()
      }
    },
  },
  beforeMount() {
    this.getInit()
  },
  mounted() {
    this.emitter.on("projectCreated", isOpen => {
      // this.isOpen = isOpen;
      this.getInit();
    });
  },
  watch: {
    $route(to, form) {

      if (to.path !== form.path) {
        this.$router.push(to.path)
      }
    },
  }
}
</script>

