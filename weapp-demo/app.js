App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    wx.login({
      success: (res) => {
        if (res.code) {
          wx.getUserInfo({
            success: (res) => {
              wx.setStorageSync('user', res.userInfo);
            }
          })
        } else {
          console.log("获取用户登录信息失败！" + res.errMsg)
        }
      }
    })
  },
})