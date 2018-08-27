const myaudio = wx.createInnerAudioContext();
myaudio.autoplay = true;
/*if (myaudio.currentTime == 15) {
  this.stop();
}*/

Page({
  
  data: {
    songs: ['http://music.163.com/song/media/outer/url?id=413829859.mp3', 'http://music.163.com/song/media/outer/url?id=5232465.mp3', 'http://dl.stream.qqmusic.qq.com/M800002qU5aY3Qu24y.mp3?vkey=F42161A305D4BCF4625B7DF35E5FCF0FD32B85334682ED2DD5321FF4EE5F6808EE26AE2BE1F4954AF94D4671347C23940F17739A6BE26BA8&guid=5150825362&fromtag=1', 'http://music.163.com/song/media/outer/url?id=201485.mp3', 'http://dl.stream.qqmusic.qq.com/M800000Md1wq0vnwzE.mp3?vkey=DAA0B37F90E9866B0674B85370FF63D4A49F117E4A9225FC6016FA237A604A60B1F233503EB40019819E28F31F132938ECA44BCCC2583167&guid=5150825362&fromtag=1', 'http://music.163.com/song/media/outer/url?id=1294899563.mp3', 'http://music.163.com/song/media/outer/url?id=371362.mp3'],
    names:['童话镇','光阴的故事','青花瓷','千年等一回','体面','可能否','小跳蛙'],
    tpA: 'default',
    tpB: 'default',
    tpC: 'default',
    A: '',
    B: '',
    C: '',
    D: '',
    answer: '',
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.refresh();
  },
 /*跳转后台时执行停止*/
  onHide: function () {
    this.stop();
  },
  /*退出时执行停止*/
  onUnload: function () {
    this.stop();
  },

  /*onTimeUpdate: function () {
    if (myaudio.currentTime == 15) {
    this.stop()
    }
  },*/

  /*刷新*/
  refresh: function () {
    this.setData({ 
      tpA: 'default',
      tpB: 'default',
      tpC: 'default',
    });
    var that = this;
    var songs = that.data.songs;
    var names = that.data.names;
    /*随机生成答案和选项*/
    if (songs.length > 2) {
      var ans = Math.floor(Math.random() * (songs.length));
      var choice1 = Math.floor(Math.random() * (songs.length));
      while (choice1 == ans) {
        choice1 = Math.floor(Math.random() * (songs.length));
      }
      var choice2 = Math.floor(Math.random() * (songs.length));
      while (choice2 == ans || choice2 == choice1) {
        choice2 = Math.floor(Math.random() * (songs.length));
      }
      var pos = Math.floor(Math.random() * 3);
      myaudio.src = that.data.songs[ans];
      /*选项随机排序*/
      if (pos == 0) {
        this.setData({
          A: that.data.names[ans],
          B: that.data.names[choice1],
          C: that.data.names[choice2],
          answer: that.data.names[ans],
        })
      }
      if (pos == 1) {
        this.setData({
          A: that.data.names[choice1],
          B: that.data.names[ans],
          C: that.data.names[choice2],
          answer: that.data.names[ans],
        })
      }
      if (pos == 2) {
        this.setData({
          A: that.data.names[choice1],
          B: that.data.names[choice2],
          C: that.data.names[ans],
          answer: that.data.names[ans],
        })
      }
     /*剔除已播放的歌曲*/
      songs.splice(ans, 1);
      names.splice(ans, 1);
      this.setData({
        songs: songs,
        names: names
      })

    }
    else {
      wx.showModal({
        title: '恭喜',
        content: '地狱模式开启',
      })
    }
    
  },
 
  // 停止
  stop: function () {
    myaudio.stop();
  },
 /*判断选项是否正确*/
  checkA: function() {
    var that=this;
    var A=that.data.A;
    var answer=that.data.answer;
    if(A==answer){
      this.setData({ tpA:'primary'});
      /*延时刷新*/
      setTimeout(function () {
        that.refresh();
      }, 1000)
    }
    else{
      this.setData({ tpA: 'warn' });
      wx.showModal({
        title: '恭喜',
        content: '回答错误',
      })
      /*延时退出*/
      setTimeout(function () {
        wx.navigateBack({
          delta: 1
        })
      }, 1000)
    }
  },
  checkB: function () {
    var that = this;
    var B = that.data.B;
    var answer = that.data.answer;
    if (B == answer) {
      this.setData({ tpB: 'primary' });
      setTimeout(function () {
        that.refresh();
      }, 1000)
    }
    else {
      this.setData({ tpB: 'warn' });
      wx.showModal({
        title: '恭喜',
        content: '回答错误',
      })
      setTimeout(function () {
        wx.navigateBack({
          delta: 1
        })
      }, 1000)
    }
  },
  checkC: function () {
    var that = this;
    var C = that.data.C;
    var answer = that.data.answer;
    if (C == answer) {
      this.setData({ tpC: 'primary' });
      setTimeout(function () {
        that.refresh();
      }, 1000)
    }
    else {
      this.setData({ tpC: 'warn' });
      wx.showModal({
        title: '恭喜',
        content: '回答错误',
      })
      setTimeout(function () {
        wx.navigateBack({
          delta: 1
        })
      }, 1000)
    }
  }

 
})