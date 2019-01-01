import {config} from '../config.js'

const tips = {
  1: '抱歉，出现了一个错误',
}

class HTTP{
  request(params){
    // params中会传递url，data，method,success回调函数
    if (!params.method) {
      params.method = "GET"
    }

    wx.request({
      url: config.api_base_url+params.url,
      data:params.data,
      method:params.method,
      header: {
        'content-type': 'application/json',
      },
      success:(res)=>{
        let code = res.statusCode.toString()
        if (code.startsWith('2')){
          // 这句话先判断params.success是不是空，
          // 如果是空不会执行params.success(res.data)这个方法
          params.success && params.success(res.data)
        }
        // 服务器异常
        else{
          let error_code = res.data.error_code
          this._show_error(error_code)
        }
      },
      // api调用失败,将电脑断网就可以调试这个方法
      fail:(err)=>{
        this._show_error(1)
      }
    })
  }

  _show_error(error_code) {
    if (!error_code) {
      error_code = 1
    }
    const tip = tips[error_code]
    wx.showToast({
      title: tip ? tip : tips[1],
      icon: 'none',
      duration: 2000
    })
  }


}

export {HTTP}