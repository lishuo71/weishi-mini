var app = getApp()
const userInfoUrl = require('../../config').userInfoUrl

Page({
  data: {
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function() {
    var that = this
    // 查看是否授权
    wx.getSetting({
      success (res){
        console.log("getSetting result:" + JSON.stringify(res))
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function(res) {
              console.log("get user info from onLoad: " + JSON.stringify(res))
              that.GetUserInfoFromEncryptedData(res.signature,res.rawData,res.encryptedData, res.iv);
              app.globalData.userInfo.me.realName = res.userInfo.nickName
              app.globalData.userInfo.me.headimgurl = res.userInfo.avatarUrl
              app.globalData.page = 'menu'
              wx.redirectTo({
                url: '../index/index'
              })
            }
          })
        } else {
          that.getUserInfo();
        }
      }
    })
  },
  getUserInfo: function () {
    var that = this

    if (app.globalData.hasLogin === false) {
      wx.login({
        success: _getUserInfo
      })
    } else {
      _getUserInfo()
    }

    function _getUserInfo() {
      wx.getUserInfo({
        withCredentials: true,
        success: function (resUI) {
          // 将 resUI 发送给后台解码出 unionId
          console.log('getUserInfo:' + JSON.stringify(resUI))
          
          var encryptedData = encodeURIComponent(resUI.encryptedData);//一定要把加密串转成URI编码
          var iv = resUI.iv
          var rawData  = resUI.rawData
          var signature = resUI.signature

          //请求自己的服务器
          that.GetUserInfo(signature,rawData,encryptedData, iv)

          that.globalData.userInfo = resUI.userInfo     

          that.setData({
            hasUserInfo: true,
            userInfo: res.userInfo
          })
        },
        fail: function () {
          //获取用户信息失败后。请跳转授权页面
          wx.showModal({
           title: '错误',
           content: '尚未进行授权，请点击授权登录！',
           success: function (res) {
            if (!res.confirm) {
             //跳转到授权界面
             wx.redirectTo({
              url: '/pages/index/index',
             })
            }
           }
          })
         }
      })
    }
  },
  
  bindGetUserInfo (e) {
    console.log("get user info by button: " + JSON.stringify(e))
    if (e.detail.errMsg != null && e.detail.errMsg != 'getUserInfo:ok') {
      wx.showModal({
        title: '提示',
        content: '您点击了拒绝。授权登录不会泄露您的隐私，请点击授权登录按钮！'
       })
    } else {
      let d =  e.detail
      this.GetUserInfoFromEncryptedData(d.signature,d.rawData,d.encryptedData, d.iv);
      app.globalData.userInfo.me.realName = e.detail.userInfo.nickName
      app.globalData.userInfo.me.headimgurl = e.detail.userInfo.avatarUrl
      app.globalData.page = 'menu'
      wx.redirectTo({
        url: '../index/index'
      })
    }
  },
  GetUserInfoFromEncryptedData: function (signature,rawData,encryptedData, iv){
    var that = this
    var header = {
      'content-type': 'application/json; charset=utf-8',
      'cookie': wx.getStorageSync("sessionid"),
      'Authorization':'Bearer ' + app.globalData.userInfo.token
    };
    wx.request({
      url: userInfoUrl,
      data: {
        encryptedData: encryptedData,
        iv: iv,
        signature: signature,
        rawData: rawData
      },
      header: header, //请求时带上这个请求头
      success: function (res) {
        console.log('GetUserInfoFromEncryptedData :' + JSON.stringify(res))
      }
    })
  }
})