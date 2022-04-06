function myRequest(ops){
  let env = getApp().globalData.envVersion
  if(env === 'develop'){
    wx.request({
      url: 'http://localhost:8080'+ops.path, 
      data:ops.data,
      header:{
        'content-type': 'application/json' // 默认值
      },
      success:ops.success,
      fail:ops.fail,
      complete:ops.complete,
      method:ops.method
    })
  }else{
    wx.cloud.callContainer({
      config: {
        env: "prod-2gd1bahie642dd9b"
      },
      path:ops.path,
      header:{
        "X-WX-SERVICE": "p",
        "content-type": "application/json"
      },
      data: ops.data,
      fail:ops.fail,
      complete:ops.complete,
      method:ops.method
    })
  }
}


export {myRequest}