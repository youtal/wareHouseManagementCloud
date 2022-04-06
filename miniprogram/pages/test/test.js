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
    console.log(getApp().globalData.openid)
    myRequest({
      path:'/login',
      data:{
        openid:getApp().globalData.openid
      },
      success:(res)=>{
        console.log(res)
      },
      fail:(res)=>{
        console.log(res)
        console.log('login failed')
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