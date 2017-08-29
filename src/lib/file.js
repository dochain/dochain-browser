import fileSaver from 'file-saver'

const rebuildFileSaver = {
  __proto__: fileSaver,
  saveText (filename, content, suffix = 'txt') {
    var blob = new Blob([content], {type: 'text/plain;charset=utf-8'})
    fileSaver.saveAs(blob, `${filename}.${suffix}`)
  },
  getContent (fileObject) {
    let reader = new FileReader()
    reader.readAsText(fileObject, 'UTF-8')

    // 返回Promise对象
    return new Promise((resolve, reject) => {
      reader.onload = (evt) => {
        resolve(evt.target.result)
      }
    })
  }
}

export default rebuildFileSaver
