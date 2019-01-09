// pages/trip_add/trip_add.js
const app = getApp();
const api = require('../../utils/api.js')
const util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    minHour: 10,
    maxHour: 20,
    minDate: new Date(2019, 0, 1).getTime(),
    currentDate: new Date(2019, 0, 1).getTime(),
    time: '00:00',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      placeid: options.id
    })
  },

  onChange(event){
    let timeStamp = event.detail.__viewData__.innerValue
    console.log(timeStamp)
    // const date = new Date(timeStamp/1000)
    // const formateDate = util.formatTime(date)
    this.setData({
      timeStamp: timeStamp
    })
  },

  onInput(e){
    console.log(e.detail)
    this.setData({
      message: e.detail
    })
  },

  addTrip(){
    let that = this
    const openid = wx.getStorageSync('openid')
    api.createPlan({
      data:{
        aid: that.data.placeid,
        openid: openid,
        traveltime: that.data.timeStamp,
        detail: that.data.message
      },
      success: (res) => {
        console.log(res)
        if (res.code == 0) {
          wx.showToast({
            title: '创建成功',
            icon: 'success',
          })
          setTimeout(function(){
            wx.switchTab({
              url: '/pages/place_list/place_list'
          })
          },1000)

        } else {
          app.alert({
            'content': "创建失败！请重试"
          });
        }
      }
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

  }
})