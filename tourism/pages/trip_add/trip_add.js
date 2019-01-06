// pages/trip_add/trip_add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    minHour: 10,
    maxHour: 20,
    minDate: new Date(2019, 0, 1).getTime(),
    maxDate: new Date(2025, 10, 1).getTime(),
    currentDate: new Date(2018, 2, 1).getTime(),
    time: '00:00',
    loading: false
  },
  changeDate(event) {
    let y = event.detail.__data__.pickerValue[0]
    let m = event.detail.__data__.pickerValue[1]
    let d = event.detail.__data__.pickerValue[2]
    let year = event.detail.__data__.columns[0][y]
    let month = event.detail.__data__.columns[1][m]
    let day = event.detail.__data__.columns[2][d]
    console.log(`${year}-${month}-${day}`)
  },
  changeTime(event){
    let h = event.detail.__data__.pickerValue[0]
    let min = event.detail.__data__.pickerValue[1]
    let hour = event.detail.__data__.columns[0][h]
    let minute = event.detail.__data__.columns[1][min]
    console.log(`${hour}-${minute}`)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
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