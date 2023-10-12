import {FILE_ICON_TYPES} from '@/code/CodeFileType'

export default {
  getFileIcon (fileName) {
    if (!fileName) {
      return null
    }
    let fileSplit = fileName.split('.')
    if (fileSplit.length > 1) {
      const fileType = fileSplit[fileSplit.length - 1].toLowerCase()
      if (FILE_ICON_TYPES[fileType]) {
        return `ci-file-${FILE_ICON_TYPES[fileType]}`
      }
    }
    return 'insert_drive_file'
  },
  async fileDownload (fileIds) {
    const downloadAsync = (fileId) => {
      return new Promise((resolve) => {
        let a = document.createElement('a')
        a.target = "_blank"
        a.href = `${location.origin}/api/v1/files/${fileId}`
        document.body.appendChild(a)
        a.onclick = function() {
          setTimeout(() => {
            resolve()
          }, 1000)
          document.body.removeChild(a)
        }
        a.click()
      })
    }

    if (fileIds.constructor === Array) {
      for (const fileId of fileIds) {
        await downloadAsync(fileId)
      }
    } else if (fileIds.constructor === String) {
      await downloadAsync(fileIds)
    }
  }
}
