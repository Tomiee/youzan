<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swp-page swiper-slide" v-for="list in lists" :key="list.img">
        <a class="js-no-follow" :href="list.clickUrl">
          <img class="goods-main-photo fadeIn" :src="list.img">
        </a>
      </div>
    </div>
    <!-- 需要分页器 -->
    <div class="swiper-pagination"></div>
  </div>
</template>


<script>
import Swiper from "swiper";
import "swiper/dist/css/swiper.css";

export default {
  name: "swipe",
  props: {
    lists: {
      // type: Array,
      required: true
    },
    name: {}
  },
  mounted() {
    new Swiper(".swiper-container", {
      loop: true, // 循环模式选项
      // 如果需要分页器
      pagination: {
        el: ".swiper-pagination"
      },
      autoplay:true
    });
  }
};
</script>


<style scoped>
.swiper-slide img {
  width: 100%;
  height: 100%;
}
</style>
