Page({
  data: {
    courses: []
  },
  onLoad: function () {
    var that = this;
    wx.request({
      url: 'https://raw.githubusercontent.com/happypeter/weapp-demo/master/doc/index.json',
      success: function (res) {
        that.setData({courses: res.data.published})
      },
      fail: function () {
        console.log('fail')
      }
    })
  }
})