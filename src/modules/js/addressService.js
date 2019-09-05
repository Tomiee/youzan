import {fetchGet,fetchPost} from './fetch'
import url from 'js/api.js'

class Address {
  static list() {
    return fetchGet(url.addressLists)
  }
  static add(data) {
    return fetchPost(url.addressAdd,data)
  }
  static remove(id) {
    return fetchPost(url.addressRemove,id)
  }
  static update(data) {
    return fetchPost(url.addressUpdate,data)
  }
  static setDefault(id) {
    return fetchPost(url.addressSetDefault,id)
  }
}

export default Address
