const {myRequest } = require("../../utils")

// pages/page0/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    readyToLoad:false,
    openId:"",
    projects:[{index:0,title:'C70E',id:'202204C70E'}]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    if(app.globalData.checkLogIn){
      that.setData({
        readyToLoad : true,
        openId : app.globalData.openId
      })
    }else{
      app.checkLoginReadyCallback = res=>{
        that.setData({
          readyToLoad : true,
          openId : res
        })
      }
    }
  },

  onTapButton:function(e){
    console.log("click page0 button");
    const idx = e.currentTarget.dataset.idx
    console.log(idx);
    wx.getUserProfile({
      desc: 'get nickName',
    }).then(res=>{
      app.globalData.nickName = res.userInfo.nickName
      myRequest({
        method:'GET',
        path:'/login',
        data:{
          openId:this.data.openId,
          project:this.data.projects[idx].title
        },
        success:(res)=>{
          if(res.data === 'new user'){
            wx.redirectTo({
              url: '/pages/zhuce/zhuce?envId=0'
            })
          }else{
            wx.redirectTo({
              url: `/pages/page1/index?role=${res.data}`,
            })
          }
        },
        fail:(res)=>{
          console.log(res)
        }
      })
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