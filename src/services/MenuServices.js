import APICaller from '../library/APICaller'

// Controller 이름
const MenuServices = {
  getLeftMenuList ({ userId, projectId}) {
    return APICaller.get('/api/v1/menu/menuLeftList', {  userId, projectId})
  },

  getTopMenuList ({userId}) {
    return APICaller.get('/api/v1/menu/menuTop', { userId })
  },



}

export default MenuServices
