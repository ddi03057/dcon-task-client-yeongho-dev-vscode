import PageLayoutUser from '@/pages/layout/PageLayoutUser'
import Keycloak from "@/pages/sample/keycloak/userDetail"
import UserPasswordUpdate from "@/pages/sample/keycloak/userPasswordUpdate"

const children = [
    {
        path: '/keycloak/user/:userId',
        name: 'userDetail',
        component: Keycloak
    },
    {
        path: '/keycloak/user/passwordUpdate/:userId',
        name: 'userPasswordUpdate',
        component: UserPasswordUpdate
    },
]

export default [{
    path: '/',
    component: PageLayoutUser,
    children
}]