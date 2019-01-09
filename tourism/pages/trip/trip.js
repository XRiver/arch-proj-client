// pages/trip/trip.js
const api = require('../../utils/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    trips:[{
      creatorName:"张三",
      aName: "总统府",
      travelTime:"2019-01-01",
      detail:"come on guys!!!"
    }]
  },

  onChange(e) {
    this.setData({
      condition: e.detail
    });
  },

  onSearch(event) {
    let that = this
    if (that.data.condition) {
      api.searchPlan({
        data:{
          condition: that.data.condition
        },
        success:(res)=>{
          console.log(res)
        }
      })
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