import SampleServices from '../../services/SampleServices'

const types = {
  GET_SAMPLE_LIST: '@SAMPLE/GET_SAMPLE_LIST',
  GET_SAMPLE_DETAIL: '@SAMPLE/GET_SAMPLE_DETAIL',
  GET_SAMPLE_UPDATE: '@SAMPLE/GET_SAMPLE_UPDATE',
  GET_SAMPLE_DELETE: '@SAMPLE/GET_SAMPLE_DELETE',
  GET_SAMPLE_INSERT: '@SAMPLE/GET_SAMPLE_INSERT',
}

export {
  types as sampleTypes
}

export default {
  namespaced: true,
  state: {
    list: [],
    detail: {}

  },

  getters: {
    list: (state) => {
      return state.list
    },
    detail: (state) => {
      return state.detail;
    },
    updateResult: (state) => {
      return state.updateResult;
    },
    deleteResult: (state) => {
      return state.deleteResult;
    },
    insertResult: (state) => {
      return state.insertResult;
    },
  },

  mutations: {
    [types.GET_SAMPLE_LIST](state, payload) {
      state.list = payload.list
    },
    [types.GET_SAMPLE_DETAIL](state, payload) {
      state.detail = payload.detail
    },
    [types.GET_SAMPLE_UPDATE](state, payload) {
      state.updateResult = payload.updateResult
    },
    [types.GET_SAMPLE_DELETE](state, payload) {
      state.deleteResult = payload.deleteResult
    },
    [types.GET_SAMPLE_INSERT](state, payload) {
      state.insertResult = payload.insertResult
    },
  },

  actions: {
    async getSampleList({commit}, payload) {
      const { userEmail, searchGubun } = payload
      const response = await SampleServices.getSampleList({
        userEmail, searchGubun
      })

      commit(types.GET_SAMPLE_LIST, {list: response.data.resultData.list})
      return response.data.resultData
    },
    async getSampleDetail({commit}, payload) {
      const {userEmail, searchGubun} = payload
      const response = await SampleServices.getSampleDetail({
        userEmail, searchGubun
      })

      commit(types.GET_SAMPLE_DETAIL, {detail: response.data.resultData})
      return response.data.resultData

    },
    async putSample({commit}, payload) {
      const { userEmail, userName} = payload
      const response = await SampleServices.updateSample(
          {
             userEmail, userName
          })
      commit(types.GET_SAMPLE_UPDATE, {updateResult: response.data});
      return response.data
    },

    async deleteSample({commit}, payload) {
      const {userEmail} = payload
      const response = await SampleServices.deleteSample(
          {userEmail})
      commit(types.GET_SAMPLE_DELETE, {deleteResult: response.data});
      return response.data
    },


    async insertSample ({ commit }, payload) {
      const {userEmail, userName} = payload
      const response = await SampleServices.insertSample(
          {
            userEmail, userName
          }
      )

      commit(types.GET_SAMPLE_INSERT, { insertResult: response.data});
      return response.data
    },
  }
}
