// pages/course/course.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    link: "",
    detail: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.request({
      url: `https://raw.githubusercontent.com/happypeter/weapp-demo/master/doc/${options.link}.json`,
      success: function(res){
        that.setData({
          detail: res.data, 
          link: `http://o86bpj665.bkt.clouddn.com/${options.link}/index.mp4`,
          });
          console.log(that.data.link);
      },
      fail: function(){
        console.log("fail");
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