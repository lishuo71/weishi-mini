// pages/miniPay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasBuy: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log('buy options:' + JSON.stringify(options))
    let packages = options.package;
    packages = packages.replace('*','=')
    wx.requestPayment(
      {
        'timeStamp': options.timestamp,
        'nonceStr': options.nonceStr,
        'package': packages,
        'signType': options.signType,
        'paySign': options.paySign,
        'success': function (res) {
          console.log('Pay success.')
          that.setData({
            hasBuy: true
          });

          setTimeout(function(){
            wx.redirectTo({
              url: '../index/index?buy=success'
            })
          },200)

         },
        'fail': function (res) { 
          console.log('Pay fail.' + JSON.stringify(res))
          that.setData({
            hasBuy: false
          });
          wx.redirectTo({
            url: '../index/index?buy=fail'
          })
        },
        'complete': function (res) { 
          console.log('Pay complete.')
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

  }
})