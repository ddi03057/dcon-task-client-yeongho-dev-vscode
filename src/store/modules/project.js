import ProjectServices from '../../services/ProjectServices'

const types = {
    GET_PROJECT_BOARD_TODO_LIST: '@PROJECT/GET_PROJECT_BOARD_TODO_LIST',
    GET_PROJECT_BOARD_PROGRESS_LIST: '@PROJECT/GET_PROJECT_BOARD_PROGRESS_LIST',
    GET_PROJECT_BOARD_COMPLETE_LIST: '@PROJECT/GET_PROJECT_BOARD_COMPLETE_LIST',
    GET_PROJECT_BACKLOG_SPRINT_IST: '@PROJECT/GET_PROJECT_BACKLOG_SPRINT_IST',
    GET_PROJECT_BACKLOG_LIST: '@PROJECT/GET_PROJECT_BACKLOG_LIST',
    GET_PROJECT_ISSUES_LIST: '@PROJECT/GET_PROJECT_ISSUES_LIST',
    GET_UPDATE_STATUS: '@PROJECT/GET_UPDATE_STATUS',
    GET_UPDATE_TASK_ASSIGN: '@PROJECT/GET_UPDATE_TASK_ASSIGN',
    GET_INSERT_TASK: '@PROJECT/GET_INSERT_TASK',
    GET_TASK_DETAIL: '@PROJECT/GET_TASK_DETAIL',
    GET_DETAIL_UPDATE: '@PROJECT/GET_DETAIL_UPDATE',
    GET_PROJECT_USER_LIST: '@PROJECT/GET_PROJECT_USER_LIST',
    GET_PROJECT_FIRST_ID: '@PROJECT/GET_PROJECT_FIRST_ID',
    GET_PROJECT_DETAIL: '@PROJECT/GET_PROJECT_DETAIL',
    GET_PROJECT_UPDATE_STATUS: '@PROJECT/GET_PROJECT_UPDATE_STATUS',
    GET_INSERT_PROJECT: '@PROJECT/GET_INSERT_PROJECT',
    GET_DELETE_TASK_LIST: '@PROJECT/GET_DELETE_TASK_LIST',
    GET_PROJECT_TASK_COMMENT_LIST: '@PROJECT/GET_PROJECT_TASK_COMMENT_LIST',
    GET_UPDATE_TASK_COMMENT: '@PROJECT/GET_UPDATE_TASK_COMMENT',
    GET_DELETE_TASK_COMMENT: '@PROJECT/GET_DELETE_TASK_COMMENT',
    GET_INSERT_TASK_COMMENT: '@PROJECT/GET_INSERT_TASK_COMMENT',
    GET_INSERT_TASK_SUB_ITEM: '@PROJECT/GET_INSERT_TASK_SUB_ITEM',
    GET_PROJECT_TASK_SUB_ITEM_LIST: '@PROJECT/GET_PROJECT_TASK_SUB_ITEM_LIST',
    GET_PROJECT_TASK_SUB_ITEM_UPDATE: '@PROJECT/GET_PROJECT_TASK_SUB_ITEM_UPDATE',
    GET_PROJECT_TASK_SUB_ITEM_DELETE: '@PROJECT/GET_PROJECT_TASK_SUB_ITEM_DELETE',
    GET_PROJECT_PREFIX_EXIST: '@PROJECT/GET_PROJECT_PREFIX_EXIST',
}
export {
    types as projectTypes
}
export default {
    namespaced: true,
    state: {
        issueList: [],
        issueOpenList: [],
        issueProgressList: [],
        issueCompleteList: [],
        updateResult: {},
        updateAssignResult: {},
        backlogList: [],
        taskInsertResult: {},
        taskDetail: {},
        taskDetailUpdateResult: {},
        projectUserList: [],
        userFirstProjectId: {},
        deleteTaskListResult: {},
        projectInsertResult: {},
        projectDetail: {},
        updateProjectResult: {},
        taskCommentList: [],
        updateTaskCommentResult: {},
        deleteTaskCommentResult: {},
        insertTaskCommentResult: {},
        insertTaskSubItemResult: {},
        updateTaskSubItemResult: {},
        deleteTaskSubItemResult: {},
        taskSubItemList: [],
        projectPrefixExist: {},
    },

    getters: {
        issueList: (state) => {
            return state.issueList
        },
        issueOpenList: (state) => {
            return state.issueOpenList
        },
        issueProgressList: (state) => {
            return state.issueProgressList
        },
        issueCompleteList: (state) => {
            return state.issueCompleteList
        },
        updateResult: (state) => {
            return state.updateResult
        },
        updateAssignResult: (state) => {
            return state.updateAssignResult
        },
        backlogList: (state) => {
            return state.backlogList
        },
        taskInsertResult: (state) => {
            return state.taskInsertResult
        },
        taskDetail: (state) => {
            return state.taskDetail
        },
        taskDetailUpdateResult: (state) => {
            return state.taskDetailUpdateResult
        },
        projectUserList: (state) => {
            return state.projectUserList
        },
        userFirstProjectId: (state) => {
            return state.userFirstProjectId
        },
        projectDetail: (state) => {
            return state.projectDetail
        },
        updateProjectResult: (state) => {
            return state.updateProjectResult
        },
        projectInsertResult: (state) => {
            return state.projectInsertResult
        },
        taskCommentList: (state) => {
            return state.taskCommentList
        },
        updateTaskCommentResult: (state) => {
            return state.updateTaskCommentResult
        },
        deleteTaskCommentResult: (state) => {
            return state.deleteTaskCommentResult
        },
        insertTaskCommentResult: (state) => {
            return state.insertTaskCommentResult
        },
        insertTaskSubItemResult: (state) => {
            return state.insertTaskSubItemResult
        },
        taskSubItemList: (state) => {
            return state.taskSubItemList
        },
        updateTaskSubItemResult: (state) => {
            return state.updateTaskSubItemResult
        },
        deleteTaskSubItemResult: (state) => {
            return state.deleteTaskSubItemResult
        },
        projectPrefixExist: (state) => {
            return state.projectPrefixExist
        },
    },

    mutations: {
        [types.GET_PROJECT_BOARD_TODO_LIST](state, payload) {
            state.issueOpenList = payload.issueOpenList
        },
        [types.GET_PROJECT_BOARD_PROGRESS_LIST](state, payload) {
            state.issueProgressList = payload.issueProgressList
        },
        [types.GET_PROJECT_BOARD_COMPLETE_LIST](state, payload) {
            state.issueCompleteList = payload.issueCompleteList
        },
        [types.GET_UPDATE_STATUS](state, payload) {
            state.updateResult = payload.updateResult
        },
        [types.GET_UPDATE_TASK_ASSIGN](state, payload) {
            state.updateAssignResult = payload.updateAssignResult
        },

        [types.GET_PROJECT_BACKLOG_LIST](state, payload) {
            state.backlogList = payload.backlogList
        },
        [types.GET_INSERT_TASK](state, payload) {
            state.taskInsertResult = payload.taskInsertResult
        },
        [types.GET_TASK_DETAIL](state, payload) {
            state.taskDetail = payload.taskDetail
        },
        [types.GET_DETAIL_UPDATE](state, payload) {
            state.taskDetailUpdateResult = payload.taskDetailUpdateResult
        },
        [types.GET_PROJECT_USER_LIST](state, payload) {
            state.projectUserList = payload.projectUserList
        },
        [types.GET_PROJECT_FIRST_ID](state, payload) {
            state.userFirstProjectId = payload.userFirstProjectId
        },
        [types.GET_PROJECT_DETAIL](state, payload) {
            state.projectDetail = payload.projectDetail
        },

        [types.GET_PROJECT_UPDATE_STATUS](state, payload) {
            state.updateProjectResult = payload.updateProjectResult
        },
        [types.GET_INSERT_PROJECT](state, payload) {
            state.projectInsertResult = payload.projectInsertResult
        },
        [types.GET_PROJECT_TASK_COMMENT_LIST](state, payload) {
            state.taskCommentList = payload.taskCommentList
        },
        [types.GET_UPDATE_TASK_COMMENT](state, payload) {
            state.updateTaskCommentResult = payload.updateTaskCommentResult
        },
        [types.GET_DELETE_TASK_COMMENT](state, payload) {
            state.deleteTaskCommentResult = payload.deleteTaskCommentResult
        },
        [types.GET_INSERT_TASK_COMMENT](state, payload) {
            state.insertTaskCommentResult = payload.insertTaskCommentResult
        },
        [types.GET_INSERT_TASK_SUB_ITEM](state, payload) {
            state.insertTaskSubItemResult = payload.insertTaskSubItemResult
        },
        [types.GET_PROJECT_TASK_SUB_ITEM_LIST](state, payload) {
            state.taskSubItemList = payload.taskSubItemList
        },
        [types.GET_PROJECT_TASK_SUB_ITEM_UPDATE](state, payload) {
            state.updateTaskSubItemResult = payload.updateTaskSubItemResult
        },
        [types.GET_PROJECT_TASK_SUB_ITEM_DELETE](state, payload) {
            state.deleteTaskSubItemResult = payload.deleteTaskSubItemResult
        },
        [types.GET_PROJECT_PREFIX_EXIST](state, payload) {
            state.projectPrefixExist = payload.projectPrefixExist
        },
    },

    actions: {
        async getOpenIssueList({commit}, payload) {
            const {projectId, taskStatus, issueSearchCode,issueSearchUser} = payload
            const response = await ProjectServices.getIssueList({
                projectId, taskStatus,issueSearchCode,issueSearchUser
            })

            commit(types.GET_PROJECT_BOARD_TODO_LIST, {issueOpenList: response.data.resultData})
            return response.data.resultData
        },

        async getProgressIssueList({commit}, payload) {
            const {projectId, taskStatus, issueSearchCode,issueSearchUser} = payload
            const response = await ProjectServices.getIssueList({
                projectId, taskStatus,issueSearchCode,issueSearchUser
            })

            commit(types.GET_PROJECT_BOARD_PROGRESS_LIST, {issueProgressList: response.data.resultData})
            return response.data.resultData
        },

        async getCompleteIssueList({commit}, payload) {
            const {projectId, taskStatus, issueSearchCode,issueSearchUser} = payload
            const response = await ProjectServices.getIssueList({
                projectId, taskStatus,issueSearchCode,issueSearchUser
            })

            commit(types.GET_PROJECT_BOARD_COMPLETE_LIST, {issueCompleteList: response.data.resultData})
            return response.data.resultData
        },

        async putIssueStatus({commit}, payload) {
            const {projectId, taskStatus, taskId} = payload
            const response = await ProjectServices.updateIssueStatus({
                projectId, taskStatus, taskId
            })
            console.log("updateResult : ", response.data)
            commit(types.GET_UPDATE_STATUS, {updateResult: response.data})
            return response.data.result
        },
        async putIssueTaskAssign({commit}, payload) {
            const {projectId, taskStatus, taskId, userId} = payload
            const response = await ProjectServices.updateIssueTaskAssign({
                projectId, taskStatus, taskId, userId
            })
            commit(types.GET_UPDATE_TASK_ASSIGN, {updateAssignResult: response.data})
            return response.data.result
        },
        async getBacklogList({commit}, payload) {
            const {projectId, taskStatus} = payload
            const response = await ProjectServices.getIssueList({
                projectId, taskStatus
            })

            commit(types.GET_PROJECT_BACKLOG_LIST, {backlogList: response.data.resultData})
            return response.data.resultData
        },

        async insertProjectTask({commit}, payload) {
            const {
                projectId,
                taskId,
                taskName,
                taskStatus,
                taskDesc,
                userId,
                userName,
                userEmail,
                dueDate,
                createGubun,
                taskSubId,
                seq
            } = payload

            const response = await ProjectServices.insertProjectTask(
                {
                    projectId,
                    taskId,
                    taskName,
                    taskStatus,
                    taskDesc,
                    userId,
                    userName,
                    userEmail,
                    dueDate,
                    createGubun,
                    taskSubId,
                    seq
                }
            )

            commit(types.GET_INSERT_TASK, {taskInsertResult: response.data});
            return response.data
        },
        async putIssueStatusList({commit}, payload) {
            const {projectId, taskStatus, taskIdList} = payload
            const response = await ProjectServices.updateIssueStatusList({
                projectId, taskStatus, taskIdList
            })
            commit(types.GET_UPDATE_STATUS, {updateResult: response.data})
            return response.data.result

        },

        async getTaskDetail({commit}, payload) {
            const {projectId, taskId} = payload
            const response = await ProjectServices.getTaskDetail({
                projectId, taskId
            })
            commit(types.GET_TASK_DETAIL, {taskDetail: response.data.resultData})
            return response.data.resultData
        },

        async putTaskDetailUpdate({commit}, payload) {
            const {projectId, taskStatus, taskId, userId, taskDesc, useYn, dueDate} = payload
            const response = await ProjectServices.updateTaskDetail({
                projectId, taskStatus, taskId, userId, taskDesc, useYn, dueDate
            })
            commit(types.GET_DETAIL_UPDATE, {taskDetailUpdateResult: response.data})
            return response.data.result
        },

        async getProjectUserList({commit}, payload) {
            const {projectId} = payload
            const response = await ProjectServices.getProjectUserList({
                projectId
            })

            commit(types.GET_PROJECT_USER_LIST, {projectUserList: response.data.resultData})
            return response.data.resultData
        },


        async getUserFirstProjectId({commit}, payload) {
            const {userId} = payload
            const response = await ProjectServices.getUserFirstProjectId({
                userId
            })

            commit(types.GET_PROJECT_FIRST_ID, {userFirstProjectId: response.data.resultData})
            return response.data.resultData
        },

        async getProjectDetail({commit}, payload) {
            const {projectId} = payload
            const response = await ProjectServices.getProjectDetail({
                projectId
            })
            commit(types.GET_PROJECT_DETAIL, {projectDetail: response.data.resultData})
            return response.data.resultData
        },

        async updateProject({commit}, payload) {
            const {projectId, useYn, userList} = payload
            const response = await ProjectServices.updateProject({
                projectId, useYn, userList
            })
            commit(types.GET_PROJECT_UPDATE_STATUS, {updateProjectResult: response.data})
            return response.data.resultData
        },

        async deleteTaskList({commit}, payload) {
            const {taskIdList, updateId} = payload
            const response = await ProjectServices.deleteTaskList({
                taskIdList, updateId
            })
            commit(types.GET_DELETE_TASK_LIST, {deleteTaskListResult: response.data})
            return response.data.result
        },
        async insertProject({commit}, payload) {
            const {projectId, projectName, useYn, userList, taskPrefix} = payload
            const response = await ProjectServices.insertProject({
                projectId, projectName, useYn, userList, taskPrefix
            })

            commit(types.GET_INSERT_PROJECT, {projectInsertResult: response.data});
            return response.data
        },

        async getTaskCommentList({commit}, payload) {
            const {projectId, taskId} = payload
            const response = await ProjectServices.getTaskCommentList({
                projectId, taskId
            })
            commit(types.GET_PROJECT_TASK_COMMENT_LIST, {taskCommentList: response.data.resultData});
            return response.data
        },

        async updateTaskComment({commit}, payload) {
            const {projectId, taskId, userId, commentDesc, seq} = payload
            const response = await ProjectServices.updateTaskComment({
                projectId, taskId, userId, commentDesc, seq
            })
            commit(types.GET_UPDATE_TASK_COMMENT, {updateTaskCommentResult: response.data})
            return response.data
        },
        async deleteTaskComment({commit}, payload) {
            const {projectId, taskId, seq} = payload
            const response = await ProjectServices.deleteTaskComment({
                projectId, taskId, seq
            })
            commit(types.GET_DELETE_TASK_COMMENT, {deleteTaskCommentResult: response.data})
            return response.data
        },

        async insertTaskComment({commit}, payload) {
            const {projectId, taskId, userId, commentDesc} = payload
            const response = await ProjectServices.insertTaskComment({
                projectId, taskId, userId, commentDesc
            })
            commit(types.GET_INSERT_TASK_COMMENT, {insertTaskCommentResult: response.data})
            return response.data
        },

        async insertTaskSubItem({commit}, payload) {
            const {projectId, taskId, taskSubId, taskSubName} = payload
            const response = await ProjectServices.insertTaskSubItem({
                projectId, taskId, taskSubId, taskSubName
            })
            commit(types.GET_INSERT_TASK_SUB_ITEM, {insertTaskSubItemResult: response.data})
            return response.data
        },
        async getTaskSubItemList({commit}, payload) {
            const {projectId, taskId} = payload
            const response = await ProjectServices.getTaskSubItemList({
                projectId, taskId
            })
            commit(types.GET_PROJECT_TASK_SUB_ITEM_LIST, {taskSubItemList: response.data.resultData})
            return response.data.resultData
        },

        async updateTaskSubItem({commit}, payload) {
            const {projectId, taskId, userId, taskSubId, taskSubName, seq, completeYn} = payload
            const response = await ProjectServices.updateTaskSubItem({
                projectId, taskId, userId, taskSubId, taskSubName, seq, completeYn
            })
            commit(types.GET_PROJECT_TASK_SUB_ITEM_UPDATE, {updateTaskSubItemResult: response.data})
            return response.data
        },

        async deleteTaskSubItem({commit}, payload) {
            const {projectId, taskId, userId, taskSubId, taskSubName, seq} = payload
            const response = await ProjectServices.deleteTaskSubItem({
                projectId, taskId, userId, taskSubId, taskSubName, seq
            })
            commit(types.GET_PROJECT_TASK_SUB_ITEM_DELETE, {deleteTaskSubItemResult: response.data})
            return response.data
        },

        async taskPrefixExist({commit}, payload) {
            const {taskPrefix} = payload
            const response = await ProjectServices.taskPrefixExist({
                 taskPrefix
            })
            commit(types.GET_PROJECT_PREFIX_EXIST, {projectPrefixExist: response.data.resultData})
            return response.data.resultData
        },
    }
}
