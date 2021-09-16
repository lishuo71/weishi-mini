// pages/login/login.js
const loginUrl = require('../../config').loginUrl
const userInfoUrl = require('../../config').userInfoUrl

var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasLogin: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.setData({
      hasLogin: app.globalData.hasLogin
    })

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.showToast({
          title: '正在登录...',
          icon: 'loading',
          duration: 10000
        });
        //请求服务器
        wx.request({
          url: loginUrl,
          data: {
            code: res.code
          },
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: {
            'content-type': 'application/json'
          }, // 设置请求的 header
          success: resp => {
            // success
            console.log('服务器返回:' + JSON.stringify(resp))

            var cookie = resp.header["Set-Cookie"];
            if (cookie != null) {
              wx.setStorageSync("sessionid", resp.header["Set-Cookie"].split(";")[0]);
            }
            
            app.globalData.hasLogin = true
            
            if (resp.data.token != ""){
              wx.setStorageSync('token', resp.data.token) 
            }
            if (resp.data.me.realName != null && resp.data.me.realName != ""){
              let me = resp.data.me;
              let userInfo = {
                'token':resp.data.token,
                'me':{
                  'realName':me.realName,
                  'uuid':me.uuid,
                  'phone':me.phone,
                  'headimgurl':me.headimgurl
                }
              };
              app.globalData.userInfo = userInfo
              app.globalData.page = 'menu'
              wx.setStorageSync('realName', resp.data.me.realName) 
              wx.setStorageSync('headimgurl', resp.data.me.headimgurl) 
              wx.redirectTo({
                url: '../index/index'
              })
            } else {
              let userInfo = {
                'token':resp.data.token,
                'me':{
                  'uuid':resp.data.me.uuid
                }
              };
              app.globalData.userInfo = userInfo
              app.globalData.page = 'menu'
              wx.redirectTo({
                url: '../user/user'
              })
            }
          },
          fail: function () {
            // fail
            console.log("wx.login fail")
          },
          complete: function () {
            // complete
            wx.hideToast();
          }
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
  login: function () {
    var that = this
    wx.login({
      success: function (res) {
        app.globalData.hasLogin = true
        that.setData({
          hasLogin: true
        })
        that.update()
      }
    })
  }

})