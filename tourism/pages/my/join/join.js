// pages/my/join/join.js
const util = require('../../../utils/util.js')
const api = require('../../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    trips:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const that = this;
    api.getJoinedPlanByOpenId({
      data: {
        openid: wx.getStorageSync('openid')
      },
      success: (res) => {
        console.log(res)
        for (let trip of res) {
          let date = new Date(parseInt(trip.traveltime))
          let format_time = util.formatTime(date)
          trip['formatTime'] = format_time

          let state = trip.state
          let state_ = '未出行'
          if (state == "1"){
            state_ = "正在进行"
          } 
          else if (state == "2") {
            state_ = "行程结束"
          }
          else if (state == "3"){
            state_ = "过期作废"
          }
          trip['state_'] = state_
          
          for (let announcement of trip.announcementList){
            let picUrlsArr = announcement.picUrls.split(",")
            announcement['picUrlsArr'] = picUrlsArr
            let date = new Date(announcement.createDate)
            let format_time = util.formatTime(date)
            announcement['formatTime'] = format_time
          }
        }
        that.setData({
          trips: res
        })
      }
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})