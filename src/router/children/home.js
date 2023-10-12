import PageLayout from '@/pages/layout/PageLayout'
import Home from '@/pages/home'

const children = [{
  path: '/home',
  name: 'home',
  component: Home
}]

export default [{
  path: '/',
  component: PageLayout,
  children
}]
