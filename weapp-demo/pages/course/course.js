// pages/course/course.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    link:"",
    detail: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let url = "https://sansisan.xin/course/details";
    let data = {id: options.id};
    wx.request({
      url,
      data,
      method: "POST",
      success: function(res){
        let course = res.data;
        course.content = JSON.parse(course.content);
        that.setData({
          detail: course,
          link: course.introvideolink,
        });
        // console.log(that.data.link);
      },
      fail: function(){
        console.log("fail");
      }
    })
  },

  setLink(event) {
    this.setData({
      link: event.currentTarget.dataset.link
    });
  }
})
