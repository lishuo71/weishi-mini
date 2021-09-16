//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    url: 'https://ws.gugensoft.com',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function (option) {
    console.log("index option: " + JSON.stringify(option))
    let buy = option.buy;
    if (option && buy != null) {
      if (buy=="success") {
        this.setData({
          url: encodeURI('https://ws.gugensoft.com/r/s?buy=success')
        })
      } else {
        this.setData({
          url: encodeURI('https://ws.gugensoft.com/r/s?buy=fail')
        })
      }
    }
    
    if (app.globalData.page != null){
      let page = app.globalData.page;
      if (page == "menu") {
        let userInfo = app.globalData.userInfo;
        let query = "?mini=true&realName=" + userInfo.me.realName;
        query = query + "&uuid=" + userInfo.me.uuid;
        query = query + "&phone=" + userInfo.me.phone;
        query = query + "&headimgurl=" + userInfo.me.headimgurl;
        query = query + "&token=" + userInfo.token;
        this.setData({
          url: encodeURI('https://ws.gugensoft.com/r/m'+query)
        })
      } else if (page == "phone") {
        this.setData({
          url: encodeURI('https://ws.gugensoft.com/r/m/phone')
        })
      }
    }
  },
  
  onShareAppMessage: function (res) {
    return {
      title: '有了卫士算法交易信号，人人都是顶尖交易员！',
      path: '/pages/index/index',
      imageUrl: 'https://www.gugensoft.com/img/weishi.png'
    }
  },
  onShareTimeline: function (res) {
    return {
      title: '有了卫士算法交易信号，人人都是顶尖交易员！'
    }
  },
  onAddToFavorites(res) {
    // webview 页面返回 webviewUrl
    console.log('WebviewUrl: ', res.webviewUrl)
    return {
      title: '有了卫士算法交易信号，人人都是顶尖交易员！',
      imageUrl: 'http://gugensoft.png'
    }
  }
})
