// pages/evaluation/evaluation.js
const api = require('../../../utils/api.js')
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  onChange(event) {
    const toid = event.currentTarget.dataset.uid
    const star = event.detail
    const pid = this.data.pid
    const fromid = wx.getStorageSync('openid')
    api.evaluateMember({
      data:{
        pid,
        fromid,
        toid,
        star
      },
      success: (res) => {
        console.log(res)
        if (res.code == 0) {
          wx.showToast({
            title: '评价成功',
            icon: 'success',
          })
        } else {
          app.alert({
            'content': "评价失败！请重试"
          });
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const pid = options.pid
    this.setData({
      pid
    })
    api.getPlanByPid({
      data:{
        pid:pid
      },
      success:(res)=>{
        console.log(res)
        this.setData({
          state:res.state,
          userList:res.userList
        })
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