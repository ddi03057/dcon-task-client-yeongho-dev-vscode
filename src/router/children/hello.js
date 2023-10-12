import PageLayout from '@/pages/layout/PageLayout'
import Hello from '@/pages/sample/SampleList'

const children = [{
  path: '/hello',
  name: 'hello',
  component: Hello
}]

export default [{
  path: '/',
  component: PageLayout,
  children
}]
