// pages/evaluation/evaluation.js
const api = require('../../../utils/api.js')
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    images:[],
    selectOpen:1,
    memberListChecked:true
  },

  onChange(event) {
    const toid = event.currentTarget.dataset.uid
    const star = event.detail
    const pid = this.data.pid
    const fromid = wx.getStorageSync('openid')

    this.setData({
      openid:fromid
    })

    api.evaluateMember({
      data:{
        pid,
        fromid,
        toid,
        star
      },
      success: (res) => {
        console.log(res)
        if (res.code == 0) {
          wx.showToast({
            title: '评价成功',
            icon: 'success',
          })
        } else {
          app.alert({
            'content': "评价失败！请重试"
          });
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const pid = options.pid
    this.setData({
      pid:pid
    })
    api.getPlanByPid({
      data:{
        pid:pid
      },
      success:(res)=>{
        console.log(res)
        this.setData({
          state:res.state,
          userList:res.userList
        })
      }
    })
  },

  addImage: function(e) {
    wx.chooseImage({
      sizeType: ['original', 'compressed'],  //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: res => {
        const images = this.data.images.concat(res.tempFilePaths)
        // 限制最多只能留下3张照片
        this.data.images = images.length <= 3 ? images : images.slice(0, 3) 
        this.setData({images:images})
        console.log(images)
      }
    })
  },

  handleTitleInput:function(e){
    this.setData({
      title:e.detail.value
    })
  },
  handleContentInput:function(e){
    this.setData({
      content:e.detail.value
    })
  },
  handleSelectOpen:function(e) {
    console.log('Selecting:'+e.detail.value)
    this.setData({
      selectOpen:e.detail.value
    })
  },

  handleImagePreview: function(e) {
    const idx = e.target.dataset.idx
    const images = this.data.images
    wx.previewImage({
      current: images[idx],  //当前预览的图片
      urls: images,  //所有要预览的图片
    })
  },
  removeImage: function(e) {
    const idx = e.target.dataset.idx
    this.data.images.splice(idx, 1)
    this.setData({
      images:this.data.images
    })
  },

  submitForm: function(e) {
    const title = this.data.title
    const content = this.data.content
    const that = this

    if (title && content) {
      const retArr = []
      console.log('Title and content filled.')

      const collectRet = function(retData) {
        if(retData) {
          retArr.push(JSON.parse(retData))
        }
        
        if(retArr.length == that.data.images.length) {
          var data = {
            openid:that.data.openid,
            pid:that.data.pid,
            picUrls:retArr.map(item => item.data.url).join(','),
            content:'《'+title+'》  '+content,
          }
          if(that.data.state==0) { // 公告
            data.open = that.data.selectOpen
            api.createAnnouncement({
              data:data,
              success:function(res) {
                console.log(res)
              }
            })
          } else { // 评价
            api.createSummary({
              data:data,
              success:function(res) {
                console.log(res)
              }
            })
          }
          wx.navigateBack()
          wx.hideLoading()
        } else {
          console.log(retArr)
        }
      }

      for (let path of this.data.images) {
        wx.uploadFile({
          url:'https://sm.ms/api/upload',
          name:'smfile',
          filePath: path,
          //success:function(res){},
          complete: function(res) {
            console.log(res.data)
            collectRet(res.data)
          }
        })
      } 
      
      
      wx.showLoading({
        title: '正在创建...',
        mask: true
      })
      
      if(that.data.images.length == 0) {
        collectRet(null)
      }
    }
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