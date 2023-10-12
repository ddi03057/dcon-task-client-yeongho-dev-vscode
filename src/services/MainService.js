import APICaller from '../library/APICaller'

// Controller 이름
const MainService = {

  /**
   * 포로파일 조회
   * @return {Promise}
   */
  getProfile () {
    return APICaller.get('/api/v1/front-profile')
  }
}

export default MainService
