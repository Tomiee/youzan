import Foot from 'components/Foot.vue'

let mixin = {
  filters: {
    priceSwitch(x) {
      //强制保留两位小数
      var f = parseFloat(x);
      if (isNaN(f)) return false;
      var f = Math.round(x * 100) / 100;
      var s = f.toString();
      var rs = s.indexOf('.');
      if (rs < 0) {
        rs = s.length;
        s += '.';
      }
      while (s.length < (rs + 1) + 2) {
        s += '0';
      }
      //每三位用一个逗号隔开
      var leftNum = s.split(".")[0];
      var rightNum = "." + s.split(".")[1];
      var result;
      //定义数组记录截取后的价格
      var resultArray = new Array();
      if (leftNum.length > 3) {
        var i = true;
        while (i) {
          resultArray.push(leftNum.slice(-3));
          leftNum = leftNum.slice(0, leftNum.length - 3);
          if (leftNum.length < 4) {
            i = false;
          }
        }
        //由于从后向前截取，所以从最后一个开始遍历并存到一个新的数组，顺序调换
        var sortArray = new Array();
        for (var i = resultArray.length - 1; i >= 0; i--) {
          sortArray.push(resultArray[i]);
        }
        result = leftNum + "," + sortArray.join(",") + rightNum;
      } else {
        result = s;
      }
      return result;
    }
  },
  components: {
    Foot
  }
}


export default mixin
