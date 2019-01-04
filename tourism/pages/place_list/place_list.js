// pages/place_list/place_list.js

const getAttractions = require('../../utils/api.js').getAttractions


Page({

  /**
   * 页面的初始数据
   */
  data: {
    trips:[{
      id:1,
      name:'夫子庙',
      cover_image_w640: "http://photos.breadtrip.com/photo_2017_07_08_646eb65bf7e95d734467fa6c8e36da03.jpg?imageView/1/w/640/h/480/q/85"
    },{
        id: 2,
        name: '中山陵',
        cover_image_w640: "http://photos.breadtrip.com/photo_2017_10_26_862ba742c7ef598283234de7bf155e50.jpg?imageView/1/w/640/h/480/q/85"
    }]
  },

  viewTrip(e) {
    const ds = e.currentTarget.dataset;
    console.log(ds)
    wx.navigateTo({
      url: `../place/place?id=${ds.id}&name=${ds.name}`,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getAttractions({
      success:(res)=>{
      this.setData({
        places:res
      })}
    })
    // console.log("hh", getAttractions)
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