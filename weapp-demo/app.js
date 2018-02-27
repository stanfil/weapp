App({
    globalData : {
        // BASEURL : "http://localhost:3000"
        BASEURL : "https://sansisan.xin"
    },
    onLaunch: () => {
        wx.login({
            success: (res) => {
                let code = res.code;
                if (code) {
                    wx.getUserInfo({
                        success: (res) => {
                            wx.setStorageSync('user', res.userInfo);
                            wx.request({
                                url: `${getApp().globalData.BASEURL}/login`,
                                method: 'POST',
                                data: {
                                    code
                                },
                                success: res => {
                                    wx.setStorageSync('token', res.data.token);
                                }
                            })
                        }
                    })
                } else {
                    console.log("获取用户登录信息失败！" + res.errMsg)
                }
            }
        })
    },
})
