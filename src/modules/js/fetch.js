import axios from 'axios'

function fetchGet(url,data){
  return new Promise((resolve,reject) => {
    axios.get(url,data).then(res => {
      // let status = res.data.status
      // if(status === 200){
      //   resolve(res)
      // }else if (status === 300) {
      //   location.href = 'login.html'
      //   resolve(res)
      // }else {
      //   resolve(res)
      // }
      resolve(res)
    }).catch(res => {
      reject(res)
    })
  })
}

function fetchPost(url,data){
  return new Promise((resolve,reject) => {
    axios.post(url,data).then(res => {
      // let status = res.data.status
      // if(status === 200){
      //   resolve(res)
      // }else if (status === 300) {
      //   location.href = 'login.html'
      //   resolve(res)
      // }else {
      //   resolve(res)
      // }
      resolve(res)
    }).catch(res => {
      reject(res)
    })
  })
}

export {
  fetchGet,
  fetchPost
}
