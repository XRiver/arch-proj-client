// pages/trip_add/trip_add.js
const api = require('../../utils/api.js')

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
    this.setData({
      timeStamp: timeStamp/1000
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
    api.createPlan({
      data:{
        traveltime: that.data.timeStamp,
        detail: that.data.message
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