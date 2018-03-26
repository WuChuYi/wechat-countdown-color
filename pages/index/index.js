//index.js
//获取应用实例
const app = getApp()
var interval;
var varName;
var ctx = wx.createCanvasContext('canvasArcCir');
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    show:true,
    countdown:false,
    total:0,
    h:0,
    m:0,
    s:0,
    count:0,
    bind:'drawCircle',
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onReady: function () {
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  setTime:function(e){
    var seconds=0;  
    if (e.detail.value.hour.length != 0) 
    { seconds = e.detail.value.hour * 3600; }
    if (e.detail.value.min.length != 0)
    { seconds = parseInt(seconds) + parseInt(e.detail.value.min * 60);  }
    if(e.detail.value.sec.length != 0) 
    { seconds = parseInt(seconds) + parseInt(e.detail.value.sec); console.log(seconds); }
    if (e.detail.value.min.length == 0 && e.detail.value.hour.length == 0 && e.detail.value.sec.length == 0) { 
      wx.showModal({
        title: '警告',
        content: '输入的数值不合法',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      }) 
      return
      }else if(seconds<=0){
      wx.showModal({
        title: '警告',
        content: '所有时间不得少于1秒',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      return
      }else{
      this.setData({ show: false });
      this.setData({ countdown: true });
      this.setData({ h: parseInt(seconds / 3600) });
      this.setData({ m: parseInt(seconds / 60) % 60 });
      this.setData({ s: seconds%60 });
      this.setData({ total: seconds });
      }
  },
  drawCircle: function () {
    this.setData({bind:''})
    clearInterval(varName);
    function drawArc(s, e) {
      ctx.setFillStyle('white');
      ctx.clearRect(0, 0, 200, 200);
      ctx.draw();
      var x = 100, y = 100, radius = 96;
      ctx.setLineWidth(8);
      ctx.setStrokeStyle('#556B2F');
      ctx.setLineCap('round');
      ctx.beginPath();
      ctx.arc(x, y, radius, s, e, false);
      ctx.stroke()
      ctx.draw()
    }
    var step = 1, startAngle = 1.5 * Math.PI, endAngle = 0;
    var animation_interval = 1000, n = this.data.total;
    var that=this;
    var animation = function () {
      if ((n - step) >= 0) {
        that.setData({ s: (n - step) % 60 });
        that.setData({ h: parseInt((n - step) / 3600) });
        that.setData({ m: parseInt((n - step) / 60) % 60 });
      }
      if (step <= n) {
        endAngle = step * 2 * Math.PI / n + 1.5 * Math.PI;
        drawArc(startAngle, endAngle);
        step++;
      } else {
        clearInterval(varName);
        wx.vibrateLong();
      }
    
    };
    varName = setInterval(animation, animation_interval);
  },
back:function(){
  this.setData({ show: true });
  this.setData({ countdown: false });
  this.setData({ bind: 'drawCircle' })
  ctx.clearRect(0, 0, 200, 200);
  ctx.draw();
  clearInterval(varName);
}
})
