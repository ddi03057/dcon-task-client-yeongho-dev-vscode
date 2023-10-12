import axios from 'axios'
import buildURL from 'axios/lib/helpers/buildURL'
import {v4 as uuidv4} from 'uuid';

const APISetting = {
  debugMode: false,
  timeout: 50 * 1000,
}
//
let delayTime = 0
if (process.env.NODE_ENV === 'production') {
  delayTime = 0
}

function fakeResult(fn, method, url, data) {
  return new Promise((resolve, reject) => {
    let response = {}
    if (method === 'post' || method === 'put') {
      response = fn(url, data)
      response = {
        ...response,
        config: {
          url,
          method,
          data: JSON.stringify(data)
        }
      }
    } else {
      response = fn(buildURL(url, data))
      response = {
        ...response,
        config: {
          url,
          method,
          params: data
        }
      }
    }
    if (response && response.data && response.data.error) {
      response = {
        ...response,
        response: {
          status: response.data.error
        }
      }
      reject(response)
    } else {
      resolve(response)
    }
  })
}

function getQueryString(url, params) {
  let _url = url
  const keys = Object.keys(params || {})
  for (const k of keys) {
    if (params[k]) {
      _url = _url + (_url === url ? '?' : '&')
      _url = _url + `${k}=${encodeURIComponent(params[k])}`
    }
  }
  return _url
}

class APIWrapper {
  constructor({timeout, withCredentials} = {timeout: APISetting.timeout, withCredentials: true}) {
    this._axiosInstance = axios.create({
      timeout,
      withCredentials
    })

    this._interceptors = new APIInterceptors(this)
  }

  /**
   * HTTP GET
   * @param  {String} url
   * @param  {Object} [params]
   * @returns {Promise}
   */
  get(url, params) {
    return process.env.NODE_ENV === 'test' && APIFaker.get[url]
      ? fakeResult(APIFaker.get[url], 'get', url, params)
      : this._axiosInstance.get(getQueryString(url, params)).then(value => new Promise((resolve) => {
        setTimeout(() => {
          resolve(value)
        }, delayTime)
      }))
  }

  /**
   * HTTP POST
   * @param  {String} url
   * @param  {Object} data
   * @returns {Promise}
   */
  post(url, data) {
    if (process.env.NODE_ENV === 'test' && APIFaker.post[url]) {
      return fakeResult(APIFaker.post[url], 'post', url, data)
    } else {

      return this._axiosInstance.post(url, data || {}).then(value => new Promise((resolve) => {
        setTimeout(() => {
          resolve(value)
        }, delayTime)
      }))
    }
  }

  /**
   * HTTP PUT
   * @param  {String} url
   * @param  {Object} [data]
   */
  put(url, data) {
    if (process.env.NODE_ENV === 'test' && APIFaker.put[url]) {
      return fakeResult(APIFaker.put[url], 'put', url, data)
    } else {
      return this._axiosInstance.put(url, data || {}).then(value => new Promise((resolve) => {
        setTimeout(() => {
          resolve(value)
        }, delayTime)
      }))
    }
  }

  /**
   * HTTP DELETE
   * @param  {String} url
   * @param  {Object} [params]
   */
  delete(url, params) {
    if (process.env.NODE_ENV === 'test' && APIFaker.put[url]) {
      return fakeResult(APIFaker.delete[url], 'delete', getQueryString(url, params))
    } else {
      return this._axiosInstance.delete(getQueryString(url, params)).then(value => new Promise(resolve => {
        setTimeout(() => {
          resolve(value)
        }, delayTime)
      })).catch(e => {
        return Promise.reject(e)
      })
    }
  }

  /**
   * 파일 업로드
   * @param  {String} url
   * @param  {FormData} formData
   * @param  {Function} [onUploadProgress] (e) => { let progress = Math.round((e.loaded * 100) / e.total) }
   */
  postUpload(url, formData, onUploadProgress = null) {
    const options = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }

    if (onUploadProgress) {
      options.onUploadProgress = onUploadProgress
    }

    return this._axiosInstance.post(url,
      formData,
      options
    ).then(value => new Promise(resolve => {
      setTimeout(() => {
        resolve(value)
      }, delayTime)
    }))
  }

  /**
   * 파일 업로드
   * @param  {String} url
   * @param  {FormData} formData
   * @param  {Function} [onUploadProgress] (e) => { let progress = Math.round((e.loaded * 100) / e.total) }
   */
  putUpload(url, formData, onUploadProgress = null) {
    const options = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }

    if (onUploadProgress) {
      options.onUploadProgress = onUploadProgress
    }

    return this._axiosInstance.put(url,
      formData,
      options
    ).then(value => new Promise(resolve => {
      setTimeout(() => {
        resolve(value)
      }, delayTime)
    }))
  }

  /**
   * 파일 다운로드
   * @param  {String} url
   * @param fileName
   */
  download(url, fileName) {
    return this._axiosInstance.get(url, {
      responseType: 'arraybuffer',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      const type = response.headers['content-type']
      const blob = new Blob([response.data], {type: type, encoding: 'UTF-8'})
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = fileName
      link.click()
    })
  }

  get interceptors() {
    return this._interceptors
  }
}

const APIEventName = {
  request: 'request',
  requestException: 'requestException',
  response: 'response',
  responseException: 'responseException',
  loginStatusException: 'loginStatusException'
}

class APIInterceptors {
  constructor(apiWrapper, exceptionCallback = null) {
    this._axiosInstance = apiWrapper._axiosInstance
    this._interceptors = apiWrapper._axiosInstance.interceptors
    this._exceptionCallback = exceptionCallback

    this.listeners = {
      [APIEventName.request]: [],
      [APIEventName.requestException]: [],
      [APIEventName.response]: [],
      [APIEventName.responseException]: [],
      [APIEventName.loginStatusException]: []
    }

    this._instanceInterceptor = {
      request: null,
      response: null
    }
  }

  addListener(eventName, listener) {
    this.listeners[eventName].push(listener)
  }

  removeListener(eventName, listener) {
    if (listener) {
      const index = this.listeners[eventName].indexOf(listener)
      this.listeners[eventName].splice(index, 1)
    } else if (eventName) {
      this.listeners[eventName] = []
    }
  }

  _fireEvent(eventName, e) {
    for (const listener of this.listeners[eventName]) {
      if (typeof listener === 'function') {
        listener(e)
      }
    }
  }

  start() {
    this._instanceInterceptor.request = this._interceptors.request.use(async (config) => {
      APISetting.debugMode === true
      try {
        this._fireEvent(APIEventName.request, config) // APIEventName.reques == request
      } catch (e) {

        console.error(e)
      }

      if(!!window.keycloak){
        let sessionTime = 1000 * 60 * 60 * 10;
        //  let sessionTime = keycloak.refreshTokenParsed["exp"] - keycloak.refreshTokenParsed["iat"]
    //    VueCookies.set(window.urlsConfig.session_timestamp_key, Math.floor(Date.now() / 1000) + sessionTime, '1y', '/', getTopDomain())

        config.headers.transactionId = uuidv4()
        config.headers.userId = window.keycloak["tokenParsed"]["sub"]

        if (window.keycloak['token']) {

          if (!config.headers.Authorization) {
            config.headers.Authorization = `Bearer ${keycloak['token']}`
          }
        }



      }

      return config
    }, (error) => {
      APISetting.debugMode === true && console.error('%cHTTP REQUEST ERROR\n', 'color: red', error)
      try {
        this._fireEvent(APIEventName.requestException, error)
      } catch (e) {
        console.error(e)
      }

      if (this._exceptionCallback) {
        this._exceptionCallback(error)
      }

      return Promise.reject(error)
    })

    this._instanceInterceptor.response = this._interceptors.response.use((response) => {
      APISetting.debugMode === true && console.log('%cHTTP RESPONSE %s\n', 'color: blue', response.config.url, response)
      try {
        this._fireEvent(APIEventName.response, response)
      } catch (e) {
        console.error(e)
      }

      return response
    }, (error) => {
      if (!!error.response) {
        if (error.response.status === 401 || error.response.status === 403) {
          clearLocalCookieAndState()
          //  window.keycloak.logout()
          return Promise.reject(error)
        } else if (error.response.status == 409) {
          this._fireEvent(APIEventName.loginStatusException, error)
          return Promise.reject(error)
        }
      }

      APISetting.debugMode === true && console.error('%cHTTP RESPONSE ERROR\n%s', 'color: red', error)
      try {
        this._fireEvent(APIEventName.responseException, error)
      } catch (e) {
        console.error(e)
      }

      if (this._exceptionCallback) {
        this._exceptionCallback(error)
      }

      return Promise.reject(error)
    })
  }

  stop() {
    this._instanceInterceptor.request && this._interceptors.request.eject(this._instanceInterceptor.request)
    this._instanceInterceptor.response && this._interceptors.response.eject(this._instanceInterceptor.response)
  }
}

const APIFaker = {
  get: {},
  post: {},
  put: {},
  delete: {},
  clear(method) {
    if (method) {
      this[method] = {}
    } else {
      this.get = {}
      this.post = {}
      this.put = {}
      this.delete = {}
    }
  }
}

function clearLocalCookieAndState() {
  //VueCookies.remove(window.urlsConfig.session_timestamp_key, '/', getTopDomain())
}

function getTopDomain() {
  var url = new URL(window.location.href)
  return "." + url.hostname.split(/\./).slice(-2).join('.')
}

const APIObject = {}

if (!APIObject.APICaller) {
  APIObject.APICaller = new APIWrapper()
  //APIObject.APICaller.interceptors.start() start by main.js
}

export {
  APIWrapper,
  APIInterceptors,
  APIFaker,
  APISetting,
  APIEventName
}

export default APIObject.APICaller
