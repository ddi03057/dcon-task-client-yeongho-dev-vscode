import PageLayout from '@/pages/layout/PageLayout'
import Issue from '@/pages/project/issue/IssueList'
import BackLog from '@/pages/project/backlog/BackLogList'
import TaskCreate from '@/pages/project/task/TaskCreate'
import TaskDetail from '@/pages/project/task/TaskDetail'
import ProjectCreate from '@/pages/project/ProjectCreate'
import ProjectDetail from '@/pages/project/ProjectDetail'

const children = [
    {
        path: '/project/issue/:projectId',
        name: 'issueList',
        component: Issue
    },
    {
        path: '/project/issue/task/create/:projectId',
        name: 'TaskCreate',
        component: TaskCreate
    },
    {
        path: '/project/issue/task/detail/:projectId/:taskId',
        name: 'TaskDetail',
        component: TaskDetail
    },
    {
        path: '/project/backLog/:projectId',
        name: 'backLogList',
        component: BackLog
    },
    {
        path: '/project/create',
        name: 'ProjectCreate',
        component: ProjectCreate
    },
    {
        path: '/project/detail/:projectId',
        name: 'ProjectDetail',
        component: ProjectDetail
    },
]

export default [{
    path: '/',
    component: PageLayout,
    children
}]
