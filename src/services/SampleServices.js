import APICaller from '../library/APICaller'

// Controller 이름
const SampleServices = {
  // [HttpMethod][APIName] (path, queryString | data ) {}


  /**
   * SampleList
   * @param userEmail
   * @param searchGubun
   * @returns {Promise}
   */
  getSampleList ({ userEmail,searchGubun}) {

    return APICaller.get('/api/v1/sample/list', { userEmail,searchGubun})
  },
  getSampleDetail({ userEmail,searchGubun}) {
    return APICaller.get('/api/v1/sample/detail', { userEmail,searchGubun})
  },
  updateSample ({  userEmail,userName}) {
    return APICaller.put(`/api/v1/sample/${userEmail}`,
        { userEmail,userName})
  },
  deleteSample ({ userEmail}) {
    return APICaller.delete(`/api/v1/sample/sample/${userEmail}`,
        { userEmail})
  },


  insertSample( {userEmail,userName}) {
    return APICaller.post(`/api/v1/sample/insert`,
        { userEmail,userName})
  }
}

export default SampleServices
