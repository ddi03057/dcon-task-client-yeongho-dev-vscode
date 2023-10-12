import UserServices from '../../services/UserServices'

const types = {
    GET_USER_INFO: '@USER/GET_USER_INFO',
    GET_USER_LOGIN: '@USER/GET_USER_LOGIN',
    GET_USER_LOGIN_CODE: '@USER/GET_USER_LOGIN_CODE',
    GET_USER_LIST: '@USER/GET_USER_LIST',
    GET_USER_DETAIL: '@USER/GET_USER_DETAIL',
    GET_PROJECT_USER_LIST: '@USER/GET_PROJECT_USER_LIST',
    GET_PROJECT_USER_DETAIL: '@USER/GET_PROJECT_USER_DETAIL',
    GET_USER_INSERT_RESULT: '@USER/GET_USER_INSERT_RESULT',
    GET_USER_UPDATE_RESULT: '@USER/GET_USER_UPDATE_RESULT',
    GET_USER_UPDATE_PASSWORD_RESULT : '@USER/GET_USER_UPDATE_PASSWORD_RESULT',
    GET_USER_PASSWORD_CHECK : '@USER/GET_USER_PASSWORD_CHECK',
    GET_USER_DELETE : '@USER/GET_USER_DELETE',

}
export {
    types as userTypes
}
export default {
    namespaced: true,
    state: {
        userInfo: {},
        user: {},
        loginCode: {},
        userList: [],
        projectUserList: [],
        projectUserDetail: {},
        loginUserDetail: {},
        userInsertResult: {},
        userUpdateResult: {},
        userUpdatePasswordResult: {},
        checkPassword:{},
        deleteUser:{},
    },

    getters: {
        userInfo: state => state.userInfo,
        user: state => state.user,
        loginCode: state => state.loginCode,
        userList: state => state.userList,
        projectUserList: state => state.projectUserList,
        projectUserDetail: state => state.projectUserDetail,
        loginUserDetail: state => state.loginUserDetail,
        userInsertResult: state => state.userInsertResult,
        userUpdateResult: state => state.userUpdateResult,
        userUpdatePasswordResult: state => state.userUpdatePasswordResult,
        checkPassword: state => state.checkPassword,
        deleteUser: state => state.deleteUser,
    },

    mutations: {

        [types.GET_USER_INFO](state, payload) {
            state.userInfo = payload.userInfo
        },
        [types.GET_USER_LOGIN](state, payload) {
            state.user = payload.user
        },
        [types.GET_USER_LOGIN_CODE](state, payload) {
            state.loginCode = payload.loginCode
        },
        [types.GET_USER_LIST](state, payload) {
            state.userList = payload.userList
        },
        [types.GET_PROJECT_USER_LIST](state, payload) {
            state.projectUserList = payload.projectUserList
        },
        [types.GET_PROJECT_USER_DETAIL](state, payload) {
            state.projectUserDetail = payload.projectUserDetail
        },
        [types.GET_USER_DETAIL](state, payload) {
            state.loginUserDetail = payload.loginUserDetail
        },
        [types.GET_USER_INSERT_RESULT](state, payload) {
            state.userInsertResult = payload.userInsertResult
        },
        [types.GET_USER_UPDATE_RESULT](state, payload) {
            state.userUpdateResult = payload.userUpdateResult
        },
        [types.GET_USER_UPDATE_PASSWORD_RESULT](state, payload) {
            state.userUpdatePasswordResult = payload.userUpdatePasswordResult
        },
        [types.GET_USER_PASSWORD_CHECK](state, payload) {
            state.checkPassword = payload.checkPassword
        },
        [types.GET_USER_DELETE](state, payload) {
            state.deleteUser = payload.deleteUser
        },
    },

    actions: {
        async getUserLogin({commit}, payload) {

            const {userEmail, userPwd} = payload
            const response = await UserServices.getUserLogin({userEmail, userPwd})
            commit(types.GET_USER_LOGIN, {user: response.data.resultData})
            commit(types.GET_USER_LOGIN_CODE, {loginCode: response.data})
            return response.data.resultData
        },
        async getUserInfo({commit}) {

            const response = await UserServices.getUserInfo()
            commit(types.GET_USER_INFO, {

                userInfo: response.data.resultData,
            })
            return response.data.resultData
        },

        // async getUserList({commit}, payload) {
        //     const {userId} = payload
        //     const response = await UserServices.getUserList({
        //         userId
        //     })
        //     commit(types.GET_USER_LIST, {userList: response.data.resultData})
        //     return response.data.resultData
        // },

        async getUserList({commit}, payload) {
            const {userId} = payload
            const response = await UserServices.getUserList({
                userId
            })
            commit(types.GET_USER_LIST, {userList: response.data.resultData})
            return response.data.resultData
        },
        async getProjectUserDetail({commit}, payload) {
            const {userId} = payload
            const response = await UserServices.getProjectUserDetail({
                userId
            })
            commit(types.GET_PROJECT_USER_DETAIL, {projectUserDetail: response.data.resultData})
            return response.data.resultData
        },
        async getLoginUserDetail({commit}, payload) {
            const {userId} = payload
            const response = await UserServices.getLoginUserDetail({
                userId
            })
            commit(types.GET_USER_DETAIL, {loginUserDetail: response.data.resultData})
            return response.data.resultData
        },
        async insertUserInfo({commit}, payload) {
            const {userEmail, firstName, lastName, userAuth, userLocale, errorCnt, useYn} = payload
            const response = await UserServices.insertUserInfo({
                userEmail, firstName, lastName, userAuth, userLocale, errorCnt, useYn
            })
            commit(types.GET_USER_INSERT_RESULT, {userInsertResult: response.data})
            return response.data
        },

        async updateUserInfo({commit}, payload) {
            const {userEmail, userAuth, userLocale, useYn} = payload
            const response = await UserServices.updateUserInfo({
                userEmail, userAuth, userLocale, useYn
            })
            commit(types.GET_USER_UPDATE_RESULT, {userUpdateResult: response.data})
            return response.data
        },
        async updatePassword({commit}, payload) {
            const {email, newCredential, newCredentialConfirm} = payload
            const response = await UserServices.updatePassword({
                email, newCredential, newCredentialConfirm
            })
            commit(types.GET_USER_UPDATE_PASSWORD_RESULT, {userUpdatePasswordResult: response.data})
            return response.data
        },

        async getCheckPassword({commit}, payload) {
            const { newCredential} = payload
            const response = await UserServices.getCheckPassword({
                newCredential
            })
            commit(types.GET_USER_PASSWORD_CHECK, {checkPassword: response.data.resultData.result})
            return response.data.resultData.result
        },
        async deleteUserInfo({commit}, payload) {
            const { userId} = payload
            const response = await UserServices.deleteUserInfo({
                userId
            })
            commit(types.GET_USER_DELETE, {deleteUser: response.data})
            return response.data
        },




    }
}