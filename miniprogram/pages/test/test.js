import {myRequest} from '../../utils'

// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let container = getApp().globalData.container
    wx.login({
      success: res => {
        getApp().globalData.loginCode = res.code
        console.log('calling container')
        myRequest({
          path: "/login",method: "GET",
          data: {
            "code": res.code
          },
          success (res) {
            if(res.data == "new user"){
              wx.redirectTo({
                url: '/pages/zhuce/zhuce',
              })
            }else{
              console.log('welcome')
              wx.redirectTo({
                url: '/pages/zhuce/zhuce',
              })
            }
          },
              
          fail(res){
            console.log(res)
            console.log("saf")
          }
        })
      },
      fail(){console.log("login failed")}
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  onReachBottom:function(){
    wx.login({
      success: res => {
        wx.request({
          url: 'http://localhost:8080/login', 
          data: {
            "code":res.code
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success (res) {
            console.log(res.data)
          },
          fail(res){
            console.log(res)
            console.log("saf")
          }
        })
      },
      fail(){console.log("login failed")}
    })
  }
})