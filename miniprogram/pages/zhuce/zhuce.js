const { myRequest } = require("../../utils");

// pages/zhuce/zhuce.js
const globalData = getApp().globalData
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lastSelectCharacter:null,
    showButton:false,
    characterList:[{
      title:'库管员',
      character:'keeper',
      showItem:false,
      signUpMsg:'请输入您的姓名'
    },{
      title:'检察员',
      character:'inspector',
      showItem:false,
      signUpMsg:'请输入您的姓名'
    },{
      title:'采购员',
      character:'buyer',
      showItem:false,
      signUpMsg:'请输入您的姓名'
    },{
      title:'一般使用人员',
      character:'guest',
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
    myRequest({
      path:'/signup',
      data:{
        openId: globalData.openId,
        nickName: globalData.nickName,
        userName: e.detail.value.input,
        role : this.data.lastSelectCharacter
      }
    })
  },
  },


)