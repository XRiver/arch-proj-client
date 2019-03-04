// pages/trip/trip.js
const api = require('../../utils/api.js')
const util = require('../../utils/util.js')
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // trips:null
    // trips1:[{
    //   uname:"张三",
    //   aname: "总统府",
    //   travelTime:"2019-01-01",
    //   detail:"come on guys!!!"
    // }]
  },

  onChange(e) {
    this.setData({
      searchInfo: e.detail
    });
  },

  onSearch(event) {
    let that = this
    if (that.data.searchInfo) {
      api.searchPlanByAname({
        data:{
          aname: that.data.searchInfo
        },
        success:(res)=>{
          for (let trip of res) {
            let date = new Date(parseInt(trip.traveltime))
            let format_time = util.formatTime(date)
            trip['formatTime'] = format_time

            let state = trip.state
            let state_ = '未出行'
            if (state == "1") {
              state_ = "正在进行"
            }
            else if (state == "2") {
              state_ = "行程结束"
            }
            else if (state == "3") {
              state_ = "过期作废"
            }
            trip['state_'] = state_
            
          }
          console.log(res)

          that.setData({
            trips1:res
          })
        }
      })

      api.searchPlanByUname({
        data: {
          uname: that.data.searchInfo
        },
        success: (res) => {
          console.log(res)
          that.setData({
            trips2: res
          })
        }
      })

      // let trips = that.data.trips1 == [] ? that.data.trips2 : that.data.trips1
      
      // that.setData({
      //   trips: trips
      // })
    }

  },

  onCancel() {
    wx.showToast({
      title: '取消',
      icon: 'none'
    });
  },

  onClear() {
    wx.showToast({
      title: '清空',
      icon: 'none'
    });
  },

  inputMsg(event){
    this.setData({
      mess: event.detail
    })
  },

  apply(e){
    const pid = e.currentTarget.dataset.pid
    const openid = wx.getStorageSync('openid')
    const that =this
    api.applyPlan({
      data:{
        pid:pid,
        openid: openid,
        mess: that.data.mess
      },
      success: (res) => {
        console.log(res)
        if (res.code == 0) {
          wx.showToast({
            title: '申请成功',
            icon: 'success',
          })
        } else {
          app.alert({
            'content': "您已申请过此出行计划，请勿重复申请。"
          });
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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