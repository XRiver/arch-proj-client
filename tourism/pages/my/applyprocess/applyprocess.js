const api = require('../../../utils/api')

const app = getApp()
// pages/my/info/applyprocess.js
Page({

  /**
   * 页面的初始数据
   * info格式应为：
   * {
      applyid:..,
      plan:{Plan},
      user:{User}
     }
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      info:JSON.parse(decodeURI(options.info))
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

  },
  process:function(choice) {
    let that = this
    let pass = choice?1:0
    api.processApply({
      data:{
        applyid:that.data.info.applyid,
        pass:pass
      },
      success:function(res){
        console.log('已完成审批'+choice)
        console.log(res)
        if(res.code == 0) { //成功
          // app.alert('审批成功！已经' + choice ? '同意' : '拒绝')
          wx.navigateBack({
            delta:1
          })
        } else { // 失败
          app.alert({
            content:"由于未知原因审批失败"
          })
        }
      }
    })
  },
  approve:function(){
    this.process(true)
  },
  reject:function(){
    this.process(false)
  }
})