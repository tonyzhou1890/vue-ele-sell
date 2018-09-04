<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <router-link to="/goods" class="tab-item">商品</router-link>
      <router-link to="/ratings" class="tab-item">评论</router-link>
      <router-link to="/seller" class="tab-item">商家</router-link>
    </div>
    <div class="content">
      <keep-alive>
        <router-view
          :seller="seller"
        />
      </keep-alive>
      
    </div>
  </div>
</template>

<script>
import header from "./components/header/header.vue";

import {urlParse} from "./common/js/util";

const ERR_OK = 0;

export default {
  name: 'App',
  data() {
    return {
      seller: {
        id: (() => {
          let queryParam = urlParse();
          console.log(queryParam);
          return queryParam.id;
        })()
      },
      goods: []
    }
  },
  created() {
    this.$axios.get('./static/data.json').then((res) => {
      let data = res.data;
      this.seller = Object.assign({},this.seller,data.seller);
      this.goods = data.goods;
      console.log(this.seller);
    }).catch((e) => {
      console.log('error');
    })
  },
  components: {
   'v-header': header
  }
}
</script>

<style lang="less" scoped>
@import './common/style/index.less';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#app {
  .tab {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    .border-1px(rgba(7,17,27,0.1));
    .tab-item {
      flex: 1;
      font-size: 14px;
      color: rgb(77,85,93);
      &.active {
        color: rgb(240,20,20)
      }
    }
  }
}
</style>
