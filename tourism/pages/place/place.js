// pages/place/place.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    trips:[
    { id: 1, name: "夫子庙", content: "夫子庙是个好地方" }, 
    { id: 2, name: "中山陵", content: "中山陵是个好地方"}],
    trip:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    const id = options.id;
    this.setData({
      options,
      trip:that.data.trips[id-1]
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const that = this;
    wx.setNavigationBarTitle({
      title: that.data.options.name,
    });
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