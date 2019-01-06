// pages/register/register.js
const app = getApp();
const api = require('../../utils/api.js')

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

  /**
   * 用户点击右上角分享
   */
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
    regData['openid'] = this.data.openid
    // console.log(regData)
    api.register({
      data:{
        openid: regData.openid,
        uname: regData.realname,
        school: regData.school,
        pictureurl: regData.avatarUrl,
        sex: regData.gender,
        nickname: regData.nickName,
        city: regData.city
      },
      success:(res)=>{
        console.log(res)
      }
    })
  },
})