// pages/register/register.js
const app = getApp();
const api = require('../../utils/api.js')
const util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      openid:options.openid
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },





  onShareAppMessage: function () {

  },
  formSubmit(e) {
    // console.log('form发生了submit事件，携带数据为：', e.detail.value)
    this.setData({
      realInfo: e.detail.value
    })

    const regData = app.globalData.userInfo
    
    regData['realname'] = this.data.realInfo.realname
    regData['school'] = this.data.realInfo.school
    regData['openid'] = app.globalData.openid

    if(!regData['realname'] || !regData['school']) {
      app.alert({
        content:'请填写所有字段'
      })
      return;
    }

    api.register({
      data:util.setAttrsTo(
        util.wxUInfo2backUInfo(regData),
        {openid:app.globalData.openid}
      ),
      success:(res)=>{
        console.log(res)
        if(res.code == 0) {
          app.alert({
            'content': "注册成功"
          });
          wx.switchTab({
            url:'/pages/place_list/place_list'
          })
        } else {
          app.alert({
            'content': "注册失败！请重试"
          });
        }
      }
    })
  },
})