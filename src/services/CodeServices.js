import APICaller from '../library/APICaller'

// Controller 이름
const CodeServices = {
    getCodeList({codeGroupId}) {
        return APICaller.get('/api/v1/code/codeList', {codeGroupId})
    },


    getCode({codeGroupId,codeId}) {
      return APICaller.get('/api/v1/code/code', {codeGroupId,codeId})
    }
}

export default CodeServices
