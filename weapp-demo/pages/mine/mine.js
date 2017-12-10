// mypages/mine/mine.js
Page({
  data: {
    userInfo: {}
  },

  onLoad: function (options) {
    const value = wx.getStorageSync('user')
    this.setData({userInfo:value});
  },


})