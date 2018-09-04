<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar ilb">
        <img
          :src="seller.avatar"
        />
      </div>
      <div class="content ilb">
        <div class="title"><span class="brand"></span><span class="name"
          v-text="seller.name"
        ></span></div>
        <div class="description"
          v-text="seller.description + '/' + seller.deliveryTime"
        ></div>
        <div class="support"
          v-if="seller.supports"
        >
          <span class="icon"
            :class="classMap[seller.supports[0].type]"
          ></span>
          <span class="text"
            v-text="seller.supports[0].description"
          ></span>
        </div>
      </div>
      <div 
        v-if="seller.supports"
        class="support-count"
      >
        <span 
          class="count"
          v-text="seller.supports.length + '个'"
        ></span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper">
      <span class="bulletin-title"></span>
      <span class="bulletin-text"
        v-text="seller.bulletin"
      ></span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    seller: {
      type: Object
    }
  },
  created(){
    this.classMap = ['decrease','discount','special','invoice','guarantee'];
  }
}
</script>

<style lang="less" scoped>
@import "../../common/style/mixin.less";

@color: white;
@bgc: #999;
.header {
  text-align: left;
  color: @color;
  background-color: @bgc;
  .content-wrapper {
    position: relative;
    padding: 24px 12px 18px 24px;
    font-size: 0;
    .avatar {
      display: inline-block;
      img {
        width: 64px;
        height: 64px;
        border-radius: 2px;
      }
    }
    .content {
      display: inline-block;
      vertical-align: top;
      font-size: 14px;
      margin-left: 16px;
      .title {
        margin: 2px 0 8px 0;
        .brand {
          display: inline-block;
          vertical-align: top;
          width: 30px;
          height: 18px;
          .bg-image('brand');
          background-size: 30px 18px;
          background-repeat: no-repeat;
        }
        .name {
          margin-left: 6px;
          font-size: 16px;
          line-height: 18px;
          font-weight: bold;
        }
      }
      .description {
        margin-bottom: 10px;
        line-height: 12px;
        font-size: 12px;

      }
      .support {
        .icon {
          display: inline-block;
          vertical-align: top;
          width: 12px;
          height: 12px;
          margin-right: 4px;
          background-size: 12px 12px;
          background-repeat: no-repeat;
          &.decrease {
            .bg-image('decrease_1');
          }
          &.discount {
            .bg-image('discount_1');
          }
          &.guarantee {
            .bg-image('guarantee_1');
          }
          &.invoice {
            .bg-image('invoice_1');
          }
          &.special {
            .bg-image('special_1');
          }
        }
        .text {
          line-height: 12px; 
          font-size: 10px;
        }
      }
    }
    .support-count {
      position: absolute;
      right: 12px;
      bottom: 14px;
      padding: 0 8px;
      height: 24px;
      line-height: 24px;
      border-radius: 14px;
      background-color: rgba(0,0,0,.2);
      text-align: center;
      .count {
        font-size: 10px;
      }
      i {
        margin-left: 2px;
        font-size: 10px;
        line-height: 24px;
      }
    }
  }
  .bulletin-wrapper {
    height: 28px;
    line-height: 28px;
    padding: 0 22px 0 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
