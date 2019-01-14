const api = require('../../../utils/api')

const app = getApp()
// pages/my/info/info.js
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
    applylist:Array()
      /*
      包含自定义类型：
      {
      applyid:123,
      plan:{Plan},
      user:{User},
      encoded:用来当uriParam传递的字符串
      }
      */
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this
    api.getPlanByOpenId({
      data:{
        openid:wx.getStorageSync('openid'),
        state:'0' // 只有未出行计划才可以加入成员
      },
      success:function(res) {
        console.log(res)
        that.setData({
          planlist:res //根据API文档，这样应该可以设好每一个Plan
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
    this.data.applylist = Array()
    this.setApplyList()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setApplyList();
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
    for(var i in that.data.planlist) {
      let plan = that.data.planlist[i]
      //再查询所有plan的申请者
      api.getPlanNewApplicants({
        data:{
          pid:plan.pid
        },
        success:function(res) {
          //把每条申请信息加入Page.data

          /* res格式：
                {
                  'code'： number  //0-查询成功  1-查询失败
                  'msg':   string  //说明 
                  'data':  [{"mess": string,"applyid": number,"applicant":{User实体类}}，]   
                }
          */
          if(res.code == 1) { // 返回“查询失败”
            console.log(res)
            app.alert({
              content:'网络异常，信息可能显示不全'
            })
          } else if(res.code == 0) { // 查询成功
            that.setData({
              applylist:Array() // Initialize
            })
            for(var j in res.data) {
              let applyinfo = res.data[j]
              console.log(applyinfo)
              let prepared = {
                applyid:applyinfo.applyid,
                plan:plan,
                user:applyinfo.applicant
              }
              let jsonstr = encodeURI(JSON.stringify(prepared))
              prepared.encoded = jsonstr
              that.data.applylist.push(prepared)
              that.setData({
                applylist:that.data.applylist
              })
            }
          }
          console.log(that.data)
        }
      })
    }
  }
})