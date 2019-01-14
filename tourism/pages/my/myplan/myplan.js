const api = require('../../../utils/api')

const app = getApp()
// pages/my/myplan/myplan.js
// 功能：根据自己创建的出行计划，获取所有未审批的计划申请者
//      并且根据申请者进入对应审批页面
Page({

  data: {
    planlist:[],
    /*
    Plan实体
    pid: Integer;  计划编号
  	aid: Integer;  景点编号
    openid: String;  创建者openid
  	aname：String；   景点名称
  	uname：String；   创建者姓名
    traveltime: String;出行时间 时间戳
    detail: String;  计划详细信息
    state:int; 计划的状态

    applylist：String； 申请者的编号，以逗号分隔
    
    User实体格式
    openid: string;  微信号唯一标识
    uname： string;  真实姓名
	  school: string;  学校名称
    pictureurl：string； 用户头像地址
    sex: string;  (必须为汉字"男"或“女”)  性别
    nickname:string  用户昵称
    city: string    用户所在城市
    */
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.refreshPlans()    
  },

  refreshPlans:function() {
    const that = this
    api.getPlanByOpenId({
      data:{
        openid:wx.getStorageSync('openid'),
        state:'0123' // 只有未出行计划才可以加入成员
      },
      success:function(res) {
        console.log(res)
        that.setData({
          planlist:res //根据API文档，这样应该可以设好每一个Plan
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
    this.refreshPlans()
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

  handleButton:function(e) {
    const action = e.target.id.split('.')
    console.log(action)
    switch(action[0]) {
      case 'setState':
        this.setState(parseInt(action[1]),parseInt(action[2]));
        break;
      case 'getDetail':
        this.getDetail(parseInt(action[1]));
        break;
      default:
      break;
    }
  },

  setState:function(pid,state) {
    const that = this
    api.switchPlanState({
      data:{
        pid:pid,
        state:state
      },
      success:function(res) {
        console.log(res)
        switch(res.code) {
          case 0:
          app.alert({
            content:'修改成功'
          });
          break;
          default:
          app.alert({
            content:'修改失败'
          })
          break;
        }
        that.refreshPlans()
      }
    })
  },

  getDetail:function(pid) {
    wx.navigateTo({
      url:`../plan_detail/plan_detail?pid=${pid}`
    })
  }
})