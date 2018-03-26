var app = getApp()

var interval;
var varName;
var ctx = wx.createCanvasContext('canvasArcCir');

Page({
  data: {
    color:'#ffffff',
    color2:'#ffffff',
    R:'',
    G:'',
    B:'',
    BI:''
  },
  onReady: function () {
    //创建并返回绘图上下文context对象。
    
  },
  onLoad: function (options) {

  },
  b2r:function(e){
    var c2;
    var r2,g2,b2;
    if (e.detail.value.bi.length != 6 && e.detail.value.bi.length != 3){
      wx.showModal({
        title: '警告',
        content: '数据位数有误',
        success: function (res) {
          console.log(e.detail.value.bi.length)
        }
      })
      return
    }
    if (e.detail.value.bi.length == 6){
      c2=e.detail.value.bi;
      r2=c2.slice(0, 2) ;
      g2=c2.slice(2, 4);
      b2=c2.slice(4, 6);
      r2=this.b10(r2)
      g2 = this.b10(g2)
      b2 = this.b10(b2)
      
      if (isNaN(r2) || isNaN(g2) ||isNaN(b2)){
        wx.showModal({
          title: '警告',
          content: '数据值域有误',
          success: function (res) {
          }
        })
        return
      }else{
        this.setData({ color2: '#' + c2 });
        this.setData({ R: r2 });
        this.setData({ G: g2 });
        this.setData({ B: b2 });
      }
    }
  },
  r2b: function (e) {
    var r1,g1,b1;
    var c1;
    var left,right;
    if (e.detail.value.red.length!=0){
      r1=e.detail.value.red;
      left= r1%16
      right = parseInt(r1/16)
      left = this.b16(left)
      right = this.b16(right) 
      if(left==undefined||right==undefined){
        wx.showModal({
          title: '警告',
          content: '数据值域有误',
          success: function (res) {
          }
        })
        return
      }
      r1=right+left;
    }else{
      r1='00'
    }
    if (e.detail.value.green.length != 0) {
      g1 = e.detail.value.green;
      left = g1 % 16
      right = parseInt(g1 / 16)
      left =this.b16(left) 
      right = this.b16(right) 
      if (left == undefined || right == undefined) {
        wx.showModal({
          title: '警告',
          content: '数据值域有误',
          success: function (res) {
          }
        })
        return
      }
      g1 = right + left;
    }else{
      g1='00'
    }
    if (e.detail.value.blue.length != 0) {
      b1 = e.detail.value.blue;
      left = b1 % 16
      right = parseInt(b1 / 16)
      left = this.b16(left)
      right = this.b16(right) 
      if (left == undefined || right == undefined) {
        wx.showModal({
          title: '警告',
          content: '数据值域有误',
          success: function (res) {
          }
        })
        return
      }
      b1 = right + left;
    }else{
      b1='00'
    }
    c1=r1+g1+b1;
    console.log(c1);
    this.setData({ color: '#'+c1 });
  },
  b16:function(i){
    if (i == 0) return '0'
    if (i == 1) return '1'
    if (i == 2) return '2'
    if (i == 3) return '3'
    if (i == 4) return '4'
    if (i == 5) return '5'
    if (i == 6) return '6'
    if (i == 7) return '7'
    if (i == 8) return '8'
    if (i == 9) return '9'
    if (i == 10) return 'A'
    if (i == 11) return 'B'
    if (i == 12) return 'C'
    if (i == 13) return 'D'
    if (i == 14) return 'E'
    if (i == 15) return 'F'
  },
  b10:function(i){
    var m = new Map([
      ['1', 1], ['2', 2], ['3', 3], ['4', 4], ['5', 5], ['6', 6], ['7', 7], ['8', 8], ['9', 9], ['0', 0],
      ['A', 10],['B', 11],['C', 12],['D', 13],['E', 14],['F', 15],
      ['a', 10],['b', 11], ['c', 12],['d', 13],['e', 14],['f', 15],
      ]);
    m.get('Michael');
    var left,right;
    left = i.slice(0, 1);
    right = i.slice(1, 2);
    left = m.get(left);
    right = m.get(right);
    return left*16+right
  }
})