// pages/my/join/join.js
const util = require('../../../utils/util.js')
const api = require('../../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    trips: [{
      uname: "张三",
      aname: "总统府",
      travelTime: "2019-01-01",
      detail: "come on guys!!!",
      photo: "http://photos.breadtrip.com/photo_2018_11_30_39a7b486bbcb2000f56be30167bfbde5.jpg?imageView/2/w/960/q/85",
      photo_info: {
        h: 900,
        w: 1600
      },
      text: "西藏一直是我最爱和向往的圣地，第三次进藏，终于圆了走一次阿里大环线的梦。从拉萨出发，经日喀则、珠峰、萨嘎、冈仁波齐、札达、狮泉河、尼玛、班戈、再由纳木错回到拉萨，把藏地巡游一周。西藏以西，天上阿里，被誉为中国的最后一片净土。它34.5万平方公里的土地上，却只有9万多人口，是世界上人口密度最少的地方。但就是这样一个高原上的荒芜之地，却藏着无数的极致风光，孕育了神秘而灿烂的古代文明。喜马拉雅山和冈底斯山在这里汇集，雅鲁藏布江和印度河在这里发源，无数的稀有野生动植物在这里生存。这里有着净化心灵的静谧美好，有着满是传奇的神秘色彩，有着天高云阔的遗世独立。",
      photo_webtrip: "http://photos.breadtrip.com/photo_2018_11_30_39a7b486bbcb2000f56be30167bfbde5.jpg?imageView/2/w/640/q/85"
    }],
    local_time: "2018-09-29 12:00:00"
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