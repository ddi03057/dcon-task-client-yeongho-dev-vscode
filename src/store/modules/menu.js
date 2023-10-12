import MenuServices from '../../services/MenuServices'

const types = {
  GET_LEFT_MENU_LIST: '@MENU/GET_LEFT_MENU_LIST',
  GET_LEFT_MENU_INFO: '@MENU/GET_LEFT_MENU_INFO',
  GET_TOP_MENU_LIST: '@MENU/GET_TOP_MENU_LIST',
  GET_TOP_CHILD_LIST: '@MENU/GET_TOP_CHILD_LIST',

}
export {
  types as menuTypes
}
export default {
  namespaced: true,
  state: {
    collapsed: false,
    menuLeftList: [],
    menuLeftInfo: {},
    menuTopList: [],
    menuTopChildList: [],
    isNavOpen: false,
  },

  getters: {
    menuLeftList: (state) => {
      return state.menuLeftList
    },
    menuTopList: (state) => {
      return state.menuTopList
    },
    menuLeftInfo: (state) => {
      return state.menuLeftInfo
    },
    menuTopChildList: (state) => {
      return state.menuTopChildList
    },
    collapsed: (state) => {
      return state.collapsed
    },

    isNavOpen: (state) => {
      return state.isNavOpen
    },
  },

  mutations: {
    setIsNavOpen(state) {
      state.isNavOpen = !state.state;;
    },
    toggleNav(state) {
      state.isNavOpen = !state.isNavOpen;
    },
    toggleConfigurator(state) {
      state.collapsed = !state.collapsed;
    },

    [types.GET_LEFT_MENU_LIST](state, payload) {
      state.menuLeftList = payload.menuLeftList
    },

    [types.GET_TOP_MENU_LIST](state, payload) {
      state.menuTopList = payload.menuTopList
    },
    [types.GET_LEFT_MENU_INFO](state, payload) {
      state.menuLeftInfo = payload.menuLeftInfo
    },
    [types.GET_TOP_CHILD_LIST](state, payload) {
      state.menuTopChildList = payload.menuTopChildList
    },
  },

  actions: {

    async getToggleMenuList({commit}) {

      commit('toggleConfigurator')
    },
    async getLeftMenuList({commit}, payload) {
      const {userId, projectId} = payload

      const response = await MenuServices.getLeftMenuList({
        userId, projectId
      })
      commit(types.GET_LEFT_MENU_LIST, {menuLeftList: response.data.resultData.list})
      commit(types.GET_LEFT_MENU_INFO, {menuLeftInfo: response.data.resultData.info})
      return response.data.resultData
    },

    async getTopMenuList({commit}, payload) {
      const {userId} = payload
      const response = await MenuServices.getTopMenuList({
        userId
      })

      commit(types.GET_TOP_MENU_LIST, {menuTopList: response.data.resultData})
      return response.data.resultData
    },
    async getTopChildList({commit}, payload) {
      const {userId, projectId} = payload
      const response = await MenuServices.getTopChildList({
         userId, projectId
       })
       commit(types.GET_TOP_CHILD_LIST, {menuTopChildList: response.data.resultData})
      return response.data.resultData
    },
  }
}
