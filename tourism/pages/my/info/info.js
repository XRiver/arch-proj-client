const api = require('../../../utils/api')

const app = getApp()
// pages/my/info/info.js
// 功能：根据自己创建的出行计划，获取所有未审批的计划申请者
//      并且根据申请者进入对应审批页面
Page({

  /**
   * 页面的初始数据
   */
  data: {
    applylist:[{
      applyid:123,
      plan:{
        details:"详细说明"
      },
      user:{
        uname:"徐江河"
      },
      encoded:encodeURI(
        JSON.stringify({
          applyid:123,
          plan:{
            details:"详细说明"
          },
          user:{
            uname:"徐江河"
          }
        })
      )
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this
    api.getMyPlans({
      data:{
        openid:wx.getStorageSync('openid')
      },
      success:function(res) {
        that.setData({
          //TODO 可以将plan信息置入页面
          planList:[]
        })
        that.data.applylist = []
        that.setApplyList()
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.data.applylist = []
    this.setApplyList()
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

  setApplyList: function() {
    let that = this
    for(var plan in that.data.planList) {
      //再查询所有plan的申请者
      api.getPlanApplicants({
        data:{
          pid:plan.pid
        },
        success:function(res) {
          //把每条申请信息加入Page.data
          if(res.code == 1) { // 返回“查询失败”
            console.log(res)
            app.alert({
              content:'网络异常，信息可能显示不全'
            })
          } else if(res.code == 0) { // 查询成功
            for(var applyinfo in res.data) {
              let prepared = {
                applyid:applyinfo.applyid,
                plan:plan,
                user:applyinfo.applicant
              }
              let jsonstr = encodeURI(JSON.stringify(prepared))
              prepared.encoded = jsonstr
              that.data.applylist.push(prepared)
            }
          }
        }
      })
    }
  }
})