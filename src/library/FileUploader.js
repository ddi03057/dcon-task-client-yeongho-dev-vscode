import FileService from '@/services/FileServices'
import _ from 'loadsh'

export class FileUploader {

  constructor ({
    file,
    chunkSize = 1024 * 1023,
    fileFolderPath,
    start = () => {},
    upload = () => {},
    end = () => {}
  }) {
    this.file = file
    this.chunkSize = chunkSize
    this.fileFolderPath = fileFolderPath
    this.startCallback = start
    this.uploadCallback = _.throttle(upload, 300)
    this.endCallback = end

    this.id = null
    this.index = 0
    this.chunkFileList = []
    this.chunkedCount = 0
    this.params = {}
    this.init()
  }
  
  /**
   * 내부 로직 실행
   */
  init () {
    this.makeChunkFileList()
  }
  
  /**
   * @description 파일 업로드 실행 
   * @param  {Object} params 외부에서 받은 값을 콜백에 넘기기위함
   */
  upload (params) {
    this.params = params
    this.startCallback(this.getParams())
    this.doUpload(FileService.postFiles).then(this.endCallback)
  }

  
  /**
   * @description startCallback, endCallback, uploadCallback에 동일한 정보를 넘기기 위함
   * @returns {Object} startCallback, endCallback, uploadCallback에 보낼 클래스 내부 값
   */
  getParams () {
    return {
      id: this.id,
      index: this.index,
      chunkSize: this.chunkSize,
      chunkedCount: this.chunkedCount,
      fileFolderPath: this.fileFolderPath,
      file: this.file.blob,
      params: this.params
    }
  }
  
  /**
   * @description 청크파일 리스트 생성
   */
  makeChunkFileList () {
    let offset = 0

    while (offset <= this.file.size) {
      this.chunkFileList.push(this.file.blob.slice(offset, offset + this.chunkSize))
      offset += this.chunkSize;
    }
    this.chunkedCount = this.chunkFileList.length
  }

  
  /**
   * @description 실질적으로 파일을 업로드 하는 곳
   * @param  {Function} service 매 업로드 시 실행할 서비스
   */
  doUpload (service) {
    return new Promise(async (resolve, reject) => {
      for (let chunkFile of this.chunkFileList) {
        this.index += 1
        const formData = new FormData()
        formData.set('chunkedCount', this.chunkedCount)
        formData.set('fileFolderPath', this.fileFolderPath)
        formData.set('index', this.index)
        formData.set('id', this.id)
        formData.set('file', chunkFile, this.file.name)

        const response = await service(formData)
        if (response.data.resultData) {
          this.id = response.data.resultData.id || null  
        }
        await new Promise((resolve) => {setTimeout(() => {resolve()}, 300)})
        this.uploadCallback(this.getParams())
      }
      resolve(this.getParams())
    })
  }
}
