import APICaller from '../library/APICaller'

// Controller 이름
const ProjectServices = {
    getIssueList({projectId, taskStatus,issueSearchCode,issueSearchUser}) {
        return APICaller.get('/api/v1/project/issueList', {projectId, taskStatus,issueSearchCode,issueSearchUser})
    },

    updateIssueStatus({projectId, taskStatus, taskId}) {
        return APICaller.get(`/api/v1/project/taskStatus/${projectId}/${taskId}/${taskStatus}`,
            {projectId, taskStatus, taskId})
    },
    updateIssueTaskAssign({projectId, taskStatus, taskId, userId}) {
        return APICaller.get(`/api/v1/project/taskAssign/${projectId}/${taskId}`,
            {projectId, taskStatus, taskId, userId})
    },
    insertProjectTask({
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
                      }) {

        return APICaller.post(`/api/v1/project/taskAdd/`,
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
            })
    },

    getTaskDetail({projectId, taskId}) {
        return APICaller.get(`/api/v1/project/taskDetail`,
            {projectId, taskId})
    },
    updateTaskDetail({projectId, taskStatus, taskId, updateId, userId, taskDesc, useYn, dueDate}) {

        return APICaller.put(`/api/v1/project/taskDetail/update/`,
            {projectId, taskStatus, taskId, updateId, userId, taskDesc, useYn, dueDate})
    },

    updateIssueStatusList({projectId, taskStatus, taskIdList, updateId, userId}) {
        return APICaller.put(`/api/v1/project/taskStatus/${projectId}/taskList/${taskStatus}`,
            {projectId, taskStatus, taskIdList, updateId, userId})
    },
    getProjectUserList({projectId}) {
        return APICaller.get('/api/v1/project/projectUserList', {projectId})
    },
    getUserFirstProjectId({userId}) {
        return APICaller.get(`/api/v1/project/userFirstProjectId/${userId}`,
            {userId})
    },
    getProjectDetail({projectId}) {
        return APICaller.get(`/api/v1/project/projectDetail`,
            {projectId})
    },
    updateProject({projectId, useYn, userList}) {
        return APICaller.put(`/api/v1/project/${projectId}`,
            {projectId, useYn, userList})
    },
    deleteTaskList({taskIdList, userId}) {
        return APICaller.delete(`/api/v1/project/taskList`,
            {taskIdList, userId})
    },
    insertProject({projectId, projectName, useYn, userList, taskPrefix}) {
        return APICaller.post(`/api/v1/project/projectAdd/`,
            {projectId, projectName, useYn, userList, taskPrefix})
    },
    getTaskCommentList({projectId, taskId}) {
        return APICaller.get(`/api/v1/project/taskDetail/commentList`,
            {projectId, taskId})
    },
    updateTaskComment({projectId, taskId, userId, commentDesc, seq}) {

        return APICaller.put(`/api/v1/project/taskComment/update/${taskId}`,
            {projectId, taskId, userId, commentDesc, seq})
    },
    deleteTaskComment({projectId, taskId, seq}) {

        return APICaller.delete(`/api/v1/project/taskComment/delete/${taskId}`,
            {projectId, taskId, seq})
    },
    insertTaskComment({projectId, taskId, userId, commentDesc}) {

        return APICaller.post(`/api/v1/project/taskComment/insert/${taskId}`,
            {projectId, taskId, userId, commentDesc})
    },
    insertTaskSubItem({projectId, taskId, taskSubId, taskSubName}) {

        return APICaller.post(`/api/v1/project/taskSubItem/insert/${taskId}`,
            {projectId, taskId, taskSubId, taskSubName})
    },
    getTaskSubItemList({projectId, taskId}) {

        return APICaller.get(`/api/v1/project/taskSubItem/list/${taskId}`,
            {projectId, taskId})
    },
    updateTaskSubItem({projectId, taskId, userId, taskSubId, taskSubName, seq, completeYn}) {

        return APICaller.put(`/api/v1/project/task/subItemList/update/${taskSubId}`,
            {projectId, taskId, userId, taskSubId, taskSubName, seq, completeYn})
    },
    deleteTaskSubItem({projectId, taskId, userId, taskSubId, taskSubName, seq}) {

        return APICaller.delete(`/api/v1/project/task/subItemList/delete/${taskSubId}`,
            {projectId, taskId, userId, taskSubId, taskSubName, seq})
    },
    taskPrefixExist({taskPrefix}) {
        return APICaller.get(`/api/v1/project/taskPrefixExist`,
            { taskPrefix})
    }
}

export default ProjectServices