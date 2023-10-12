import APICaller from '../library/APICaller'

// Controller 이름
const UserServices = {
  // [HttpMethod][APIName] (path, queryString | data ) {}


  /**
   *
   * @param userEmail
   * @returns {Promise}
   */
  getUserInfo () {
    return APICaller.get(`/api/v1/user/user-info` )
  },

  getUserLogin({ userEmail, userPwd}) {
    return APICaller.post(`/api/v1/auth/login`, { userEmail ,userPwd})
  },
  // getUserList({userId}) {
  //   return APICaller.get('/api/v1/user/allUser/${userId}', { userId})
  // },
  getUserList({userId}) {
    return APICaller.get(`/api/v1/user/task/allUser`,{ userId})
  },
  getProjectUserDetail({userId}) {
    return APICaller.get(`/api/v1/user/task/allUser/${userId}`, { userId})
  },
  getLoginUserDetail({userId}) {
    return APICaller.get(`/api/v1/user/${userId}`,{ userId})
  },
  insertUserInfo({userEmail, firstName, lastName, userAuth, userLocale, errorCnt, useYn}) {
    return APICaller.post(`/api/v1/user/`, { userEmail, firstName, lastName, userAuth, userLocale, errorCnt, useYn})
  },
  updateUserInfo({userEmail, userAuth, userLocale, useYn}) {
    return APICaller.put(`/api/v1/user/`, { userEmail, userAuth, userLocale, useYn})
  },
  updatePassword({email, newCredential, newCredentialConfirm}) {
    return APICaller.put(`/api/v1/user/update-password`, { email, newCredential, newCredentialConfirm})
  },
  getCheckPassword({newCredential}) {
    return APICaller.get(`/api/v1/user/passwordCheck`,{ newCredential})
  },
  deleteUserInfo({userId}) {
    return APICaller.delete(`/api/v1/user/${userId}`,
        { userId})
  },
}

export default UserServices
