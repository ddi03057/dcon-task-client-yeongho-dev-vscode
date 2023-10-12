import CodeServices from '../../services/CodeServices'

const types = {
    GET_CODE_LIST: '@CODE/GET_CODE_LIST',
    GET_CODE_YN_LIST: '@CODE/GET_CODE_YN_LIST',
    GET_CODE_ISSUE_SEARCH_LIST: '@CODE/GET_CODE_ISSUE_SEARCH_LIST',
    GET_CODE: '@CODE/GET_CODE',

}
export {
    types as codeTypes
}
export default {
    namespaced: true,
    state: {
        codeList: [],
        codeYnList: [],
        codeIssueSearchList: [],
        code: {},
    },

    getters: {
        codeList: (state) => {
            return state.codeList
        },
        codeYnList: (state) => {
            return state.codeYnList
        },
        code: (state) => {
            return state.code
        },
        codeIssueSearchList: (state) => {
            return state.codeIssueSearchList
        },
    },

    mutations: {
        [types.GET_CODE_LIST](state, payload) {
            state.codeList = payload.codeList
        },
        [types.GET_CODE_YN_LIST](state, payload) {
            state.codeYnList = payload.codeYnList
        },
        [types.GET_CODE](state, payload) {
            state.code = payload.code
        },
        [types.GET_CODE_ISSUE_SEARCH_LIST](state, payload) {
            state.codeIssueSearchList = payload.codeIssueSearchList
        },

    },

    actions: {
        async getCodeList({commit}, payload) {
            const {codeGroupId} = payload
            const response = await CodeServices.getCodeList({
                codeGroupId
            })
            commit(types.GET_CODE_LIST, {codeList: response.data.resultData})
            return response.data.resultData
        },
        async getCodeYnList({commit}, payload) {
            const {codeGroupId} = payload
            const response = await CodeServices.getCodeList({
                codeGroupId
            })
            commit(types.GET_CODE_YN_LIST, {codeYnList: response.data.resultData})
            return response.data.resultData
        },
        async getCodeIssueSearchList({commit}, payload) {
            const {codeGroupId} = payload
            const response = await CodeServices.getCodeList({
                codeGroupId
            })
            commit(types.GET_CODE_ISSUE_SEARCH_LIST, {codeIssueSearchList: response.data.resultData})
            return response.data.resultData
        },

        async getCode({commit}, payload) {
            const {codeGroupId, codeId} = payload
            const response = await CodeServices.getCode({
                codeGroupId, codeId
            })
            commit(types.GET_CODE, {code: response.data.resultData})
            return response.data.resultData
        },
    }
}
