const { myRequest } = require("../../utils");

// pages/zhuce/zhuce.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lastSelectCharacter:null,
    showButton:false,
    characterList:[{
      character:'库管员',
      showItem:false,
      signUpMsg:'请输入您的姓名'
    },{
      character:'检察员',
      showItem:false,
      signUpMsg:'请输入您的姓名'
    },{
      character:'采购员',
      showItem:false,
      signUpMsg:'请输入您的姓名'
    },{
      character:'一般使用人员',
      showItem:false,
      signUpMsg:'请输入您的姓名'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(option){
    //console.log("zhuce....")
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  onClickPowerInfo(e) {
    const index = e.currentTarget.dataset.index;
    const characterList = this.data.characterList;
    let lastStatus = characterList[index].showItem
    characterList.forEach(item=> item.showItem = false)
    characterList[index].showItem = !lastStatus;
    let showButton = !lastStatus
    let lastSelectCharacter = null
    if(showButton){
      lastSelectCharacter = characterList[index].character
    }
    this.setData({
      showButton,
      characterList,
      lastSelectCharacter
    });
    },
    
  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value.input)
    console.log('form发生了submit事件，携带数据为：', this.data.lastSelectCharacter)
    wx.checkSession({
      success:()=>{
        myRequest({
          path:'/signUp',
          data:{
            name: e.detail.value.input,
            character:this.data.lastSelectCharacter,
            code:getApp().globalData.loginCode
          },
          method:'GET'
        })
      },
      fail:()=>{
        wx.login({
          success:(res)=>{
            getApp().globalData.loginCode = res.code
            myRequest({
              path:'/signUp',
              data:{
                name: e.detail.value.input,
                character:this.data.lastSelectCharacter,
                code:res.code
              },
              method:'GET'
            })
          }
        })
      }
    })
  },
  },


)