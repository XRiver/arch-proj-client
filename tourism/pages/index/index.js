//login.js
//获取应用实例
var app = getApp();
import { HTTP } from '../../utils/http.js'
let http = new HTTP()

const api = require('../../utils/api.js')

Page({
  data: {
    remind: '加载中',
    angle: 0,
    userInfo: {},
    regFlag: true,
    openid:null
  },
  goToPlaceList: function() {
    wx.switchTab({
      url: '/pages/place_list/place_list',
    })
    // wx.navigateTo({
    //   url: '/pages/place_list/place_list',
    // })
  },
  onLoad: function() {
    this.setOpenId()
    // this.checkLogin()
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
          }
        })
      }
    });
  },

  getUrl: function(code) {
    let url = `https://api.weixin.qq.com/sns/jscode2session?appid=wx45b48d336eb355e4&secret=80969c1bc96945caa3991ca0908055a6&js_code=${code}&grant_type=authorization_code`
    return url
  },

  checkLogin: function (event) {
    const that = this
    /* 
    http.request({
      url: "login?openid =" + this.data.openid,
      success: function (res) {
        if (res.data.status != 1) {
          that.setData({
            regFlag: false
          });
        }
      }
    })
    */
    API.login({
      data:{
        openId: this.data.openid
      },
      success: function(res) {
        if (res.data.status != 1) {
          that.setData({
            regFlag: false
          });
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
    console.log(userInfo)
    that.goToRegister();
  },

  goToRegister:function(){
    wx.navigateTo({
      url: '/pages/register/register',
    })
  }
});