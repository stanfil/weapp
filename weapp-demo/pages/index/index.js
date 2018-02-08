Page({
  data: {
    courses: [[],[],[],[]],
    searchKeyword: "",
    labels: ["All", "Hot", "Own", "Like"],
    tabs: ["全部","热门","已购买","收藏"],  //全部课程按时间排序，热门按热度
    stv: {
      windowWidth: 0,
      lineWidth: 0,
      offset: 0,
      tStart: false
    },
    activeTab: 0
  },
  onLoad: function () {
    //初始化标签栏
    try {
      let { tabs } = this.data;
      var res = wx.getSystemInfoSync()
      this.windowWidth = res.windowWidth;
      this.data.stv.lineWidth = this.windowWidth / this.data.tabs.length;
      this.data.stv.windowWidth = res.windowWidth;
      this.setData({ stv: this.data.stv })
      this.tabsCount = tabs.length;
    } catch (e) {
    
    }
    // //初始化课程内容
    // var that = this;
    // let {courses} = this.data;
    this.getCourses();
    // wx.request({
    //   url: 'https://raw.githubusercontent.com/happypeter/weapp-demo/master/doc/index.json',
    //   success: function (res) {
    //     for (let i in courses) {
    //       courses[i]=res.data.published;
    //     }
    //     that.setData({courses});
    //   },
    //   fail: function () {
    //     console.log('fail')
    //   }
    // })
  },

  //get search keyword
  getKeyword: function(event){
    this.setData({
      searchKeyword: event.detail.value.trim()
    });
  },

  //click search
  search: function(){
    // console.log(this.data.searchKeyword);
    this.getCourses();
  },

  //get courses
  getCourses: function(){
    let that = this;
    let data = {
      keyword:this.data.searchKeyword.trim(),    // 搜索关键词
      label:this.data.labels[this.data.activeTab]    // 标签
    };
    let url = 'http://localhost:3000/course/index'
    wx.request({
      url,
      data,
      method: "POST",
      success(res){
        console.log(res);
        let {courses} = that.data;
        courses[that.data.activeTab] = res.data;
        that.setData({ courses });
      },
      fail(res){
        console.log("request failed");
      }
    });
  },

  //可滑动标签组件事件处理函数
  handlerStart(e) {
    let { clientX, clientY } = e.touches[0];
    this.startX = clientX;
    this.tapStartX = clientX;
    this.tapStartY = clientY;
    this.data.stv.tStart = true;
    this.tapStartTime = e.timeStamp;
    this.setData({ stv: this.data.stv })
  },
  handlerMove(e) {
    let { clientX, clientY } = e.touches[0];
    let { stv } = this.data;
    let offsetX = this.startX - clientX;
    this.startX = clientX;
    stv.offset += offsetX;
    if (stv.offset <= 0) {
      stv.offset = 0;
    } else if (stv.offset >= stv.windowWidth * (this.tabsCount - 1)) {
      stv.offset = stv.windowWidth * (this.tabsCount - 1);
    }
    this.setData({ stv: stv });
  },
  handlerCancel(e) {

  },
  handlerEnd(e) {
    let { clientX, clientY } = e.changedTouches[0];
    let endTime = e.timeStamp;
    let { tabs, stv, activeTab } = this.data;
    let { offset, windowWidth } = stv;
    //快速滑动
    if (endTime - this.tapStartTime <= 300) {
      //向左
      if (Math.abs(this.tapStartY - clientY) < 50) {
        if (this.tapStartX - clientX > 5) {
          if (activeTab < this.tabsCount - 1) {
            this.setData({ activeTab: ++activeTab })
          }
        } else {
          if (activeTab > 0) {
            this.setData({ activeTab: --activeTab })
          }
        }
        stv.offset = stv.windowWidth * activeTab;
      } else {
        //快速滑动 但是Y距离大于50 所以用户是左右滚动
        let page = Math.round(offset / windowWidth);
        if (activeTab != page) {
          this.setData({ activeTab: page })
        }
        stv.offset = stv.windowWidth * page;
      }
    } else {
      let page = Math.round(offset / windowWidth);
      if (activeTab != page) {
        this.setData({ activeTab: page })
      }
      stv.offset = stv.windowWidth * page;
    }
    stv.tStart = false;
    this.setData({ stv: this.data.stv });
    //this.getCourses();
  },
  _updateSelectedPage(page) {
    let { tabs, stv, activeTab } = this.data;
    activeTab = page;
    this.setData({ activeTab: activeTab })
    stv.offset = stv.windowWidth * activeTab;
    this.setData({ stv: this.data.stv })
    //this.getCourses();
  },
  handlerTabTap(e) {
    this._updateSelectedPage(e.currentTarget.dataset.index);
  }
})