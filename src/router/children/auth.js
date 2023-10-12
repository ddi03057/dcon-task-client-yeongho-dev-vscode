import PageLayout from '@/pages/layout/PageLayout'
// import Hello from '@/pages/home/HelloWorld'
import Login from '@/pages/auth/Login'

const children = [{
  path: '/login',
  name: 'login',
  component: Login
}]

export default [{
  path: '/',
  component: PageLayout,
  children
}]
