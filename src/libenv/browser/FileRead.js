/**
 * Created by huangxinxin on 16/9/5.
 */

class FileRead {
  constructor (files) {
    this.files = files
    this.readTypeChoice = [ 'readAsArrayBuffer', 'readAsBinaryString', 'readAsDataURL', 'readAsText' ]
    return this
  }

  filter (callback) {
    this.filterCallback = callback

    return this
  }

  readAs (type) {
    if (this.readTypeChoice.indexOf(type) === -1) {
      throw new Error('readAs type not in ' + JSON.stringify(this.readTypeChoice))
    }
    this.readType = type
    return this
  }

  onReadStart (callback) {
    this.onLoadStartCallback = callback
    return this
  }

  onReadEnd (callback) {
    this.onLoadEndCallback = callback
    return this
  }

  read () {
    let self = this
    if (this.files instanceof FileList) {
      for (let i = 0; i < this.files.length; i++) {
        let file = this.files[ i ]
        if (file instanceof File) {
          _read(file)
        }
      }
    } else if (this.files instanceof File) {
      _read(this.files)
    }

    function _read (f) {
      let reader = new FileReader()
      if (reader[ self.readType ] instanceof Function) {
        reader[ self.readType ](f)
        if (self.filterCallback instanceof Function && self.filterCallback(f) || !self.filterCallback) {
          reader.onloadstart = function (e) {
            self.onLoadStartCallback instanceof Function && self.onLoadStartCallback(e, f)
          }
          reader.onloadend = function (e) {
            self.onLoadEndCallback instanceof Function && self.onLoadEndCallback(e, f, e.target.result)
          }
        }
      }
    }
  }
}

export default FileRead
