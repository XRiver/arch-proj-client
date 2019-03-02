// pages/evaluation/evaluation.js
const api = require('../../../utils/api.js')
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    images:[]
  },

  onChange(event) {
    const toid = event.currentTarget.dataset.uid
    const star = event.detail
    const pid = this.data.pid
    const fromid = wx.getStorageSync('openid')
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
    const value = e.detail.value
    this.setData({
      title:value
    })
  },
  handleContentInput:function(e){
    const value = e.detail.value
    this.setData({
      content:value
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

    if (title && content) {
      const arr = []

      console.log('Title and content filled.')
      
      /*

      for (let path of this.data.images) {
        arr.push(wx.UploadFile({
          //url: config.urls.question + '/image/upload',
          filePath: path,
          //name: 'qimg',
        }))
      }

      wx.showLoading({
        title: '正在创建...',
        mask: true
      })

      // 开始并行上传图片
      Promise.all(arr).then(res => {
        // 上传成功，获取这些图片在服务器上的地址，组成一个数组
        return res.map(item => JSON.parse(item.data).url)
      }).catch(err => {
        console.log(">>>> upload images error:", err)
      }).then(urls => {
        // 调用保存问题的后端接口
        return createQuestion({
          title: title,
          content: content,
          images: urls
        })
      }).then(res => {
        // 保存问题成功，返回上一页（通常是一个问题列表页）
        const pages = getCurrentPages();
        const currPage = pages[pages.length - 1];
        const prevPage = pages[pages.length - 2];

        // 将新创建的问题，添加到前一页（问题列表页）第一行
        prevPage.data.questions.unshift(res)
        $digest(prevPage)

        wx.navigateBack()
      }).catch(err => {
        console.log(">>>> create question error:", err)
      }).then(() => {
        wx.hideLoading()
      })

      */
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