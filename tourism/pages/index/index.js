//login.js
const app = getApp();

import { HTTP } from '../../utils/http.js'
const api = require('../../utils/api.js')
const util = require('../../utils/util.js')

let http = new HTTP()

Page({
  data: {
    remind: '加载中',
    angle: 0,
    userInfo: {},
    regFlag: false,
    openid:null
  },
  onLoad: function() {
    const storedOpenId = wx.getStorageSync('openid')
    const that = this
    if(storedOpenId) {
      console.log('detected openid storage')
      app.globalData.openid = storedOpenId
      that.checkLogin()
    } else {
      console.log('No openid storage')
      that.setOpenId()
    }
  },
  onShow: function() {

  },
  onReady: function() {
    
    var that = this;
    setTimeout(function() {
      that.setData({
        remind: ''
      });
    }, 1000);
    wx.onAccelerometerChange(function(res) {
      var angle = -(res.x * 30).toFixed(1);
      if (angle > 14) {
        angle = 14;
      } else if (angle < -14) {
        angle = -14;
      }
      if (that.data.angle !== angle) {
        that.setData({
          angle: angle
        });
      }
    });
  },

  // 设置openid
  setOpenId:function() {
    var that = this
    wx.login({
      success: function (res) {
        if (!res.code) {
          app.alert({
            'content': '登录失败，请再次点击~~'
          });
          return;
        }
        var url = that.getUrl(res.code)
        http.request({
          url: url,
          success: (res) => {
            that.setData({
              openid:res.openid
            })
            app.globalData.openid = res.openid
            wx.setStorage({
              key:'openid',
              data:res.openid,
              complete: that.checkLogin
            })
          }
        })
      }
    });
  },

  getUrl: function(code) {
    let url = `https://api.weixin.qq.com/sns/jscode2session?appid=wx45b48d336eb355e4&secret=80969c1bc96945caa3991ca0908055a6&js_code=${code}&grant_type=authorization_code`
    return url
  },

  checkLogin: function () {
    const that = this

    api.login({
      data:{
        openid: wx.getStorageSync('openid')
      },
      success: function(res) {
        console.log(res)
        if (res.code == 0) { // 登录成功，可以读取userInfo
          app.globalData.userInfo = util.backUInfo2wxUInfo(res.data)
          that.goToPlaceList()
        } else {
          // 本openid登陆失败
          // 也就是之前存储过openid，却没有注册过，那么就走正常路线
        }
      }
    })
  },
  
  login: function(e) {
    var that = this;
    // 通过e获取用户信息
    if (!e.detail.userInfo) {
      app.alert({
        'content': "登录失败！请重试"
      });
      return
    }
    // 获取用户信息
    var userInfo = e.detail.userInfo;
    console.log(e.detail)
    app.globalData.userInfo = userInfo
    that.goToRegister();
  },

  goToRegister:function(){
    let openid = this.data.openid
    wx.navigateTo({
      url: `/pages/register/register?openid=${openid}`
    })
  },

  goToPlaceList:function() {
    wx.switchTab({
      url:'/pages/place_list/place_list'
    })
  }
});