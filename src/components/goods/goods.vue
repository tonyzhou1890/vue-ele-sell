<template>
  <div class="goods">
    <div
      class="menu-wrapper"
      ref="menuWrapper"
    >
      <ul>
        <li
          v-for="(item,index) in goods"
          :key="index"
          class="menu-item"
          :class="{'current': index === currentIndex}"
          @click="selectMenu(index,$event)"
        >
          <span
            class="text border-1px"
            ><span class="icon"
              :class="classMap[item.type]"
              v-show="item.type !== -1"
            ></span>{{item.name}}</span>
        </li>
      </ul>
    </div>
    <div 
      class="foods-wrapper"
      ref="foodsWrapper"
    >
      <ul>
        <li
          v-for="(item,index) in goods"
          :key="index"
          class="food-list food-list-hook"
        >
          <h1 class="title"
            v-text="item.name"
          ></h1>
          <ul>
            <li
              v-for="(food,index) in item.foods"
              :key="index"
              class="food-item border-1px"
              @click="selectFood(food,$event)"
            >
              <div
                class="icon"
              >
                <img :src="food.icon" alt="">
              </div>
              <div class="content">
                <h2 class="name"
                  v-text="food.name"
                ></h2>
                <p class="desc"
                  v-text="food.description"
                ></p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol
                    :food="food"
                    @add="addFood"
                  ></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart
      :selectFoods="selectedFoods"
      :d="seller.deliveryPrice"
      :m="seller.minPrice"
      ref="shopcart"
    ></shopcart>
    <food
      :food="selectedFood"
      ref="food"
      @add="addFood"
    ></food>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import shopcart from "../shopcart/shopcart";
import cartcontrol from "../cartcontrol/cartcontrol";
import food from "../food/food";

export default {
  props: {
    seller: {
      type: Object
    }
  },
  data(){
    return {
      goods: [],
      classMap: [],
      listHeight: [],
      scrollY: 0,
      selectedFood: {}
    }
  },
  components: {
    shopcart,
    cartcontrol,
    food
  },
  created() {
    this.$axios.get('/static/data.json').then((res) => {
      let data = res.data;
      this.goods = data.goods;
      this.$nextTick(() => {
        this._initScroll();
        this._calculateHeight();
      });
    }).catch((e) => {
      console.log('error');
    });
    this.classMap = ['decrease','discount','special','invoice','guarantee'];
  },
  computed: {
    currentIndex() {
      for(let i = 0,len = this.listHeight.length;i , len;i++){
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        if(!height2 || (this.scrollY >= height1 && this.scrollY < height2)){
          return i;
        }
      }
    },
    selectedFoods() {
      let foods = [];
      this.goods.forEach((item) => {
        item.foods.forEach((food) => {
          if(food.count) {
            foods.push(food);
          }
        });
      });
      return foods;
    }
  },
  methods: {
    selectMenu(index,e){
      console.log(e);
      if(!e._constructed){
        return;
      }
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
      let el = foodList[index];
      console.log(el);
      this.foodsScroll.scrollToElement(el, 300, 0 ,1);
      console.log(index);
    },
    selectFood(food,e) {
      if(!e._constructed){
        return;
      }
      this.selectedFood = food;
      this.$refs.food.show();
    },
    addFood(target){
      this.$nextTick(() => {
        this.$refs.shopcart.drop(target);
      });
    },
    _initScroll() {
      this.menuScroll = new BScroll(this.$refs.menuWrapper,{
        click: true
      });
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper,{
        click: true,
        probeType: 3
      });

      this.foodsScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y));
      })
    },
    _calculateHeight() {
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
      let height = 0;
      this.listHeight.push(height);
      for(let i = 0, len = foodList.length; i < len; i++){
        let item = foodList[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
      console.log(this.listHeight);
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../common/style/mixin.less';
@bgc: #f3f5f7;
.goods {
  display: flex;
  overflow: hidden;
  position: absolute;
  top: 174px;
  bottom: 46px;
  width: 100%;
  .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    background-color: @bgc;
    .menu-item {
      display: table;
      height: 54px;
      width: 56px;
      padding: 0 12px;
      line-height: 14px;
      &.current {
        position: relative;
        z-index: 10;
        margin-top: -1px;
        background-color: #fff;
        font-weight: 700;
        .text {
          .border-none();
        }
      }
      .icon {
        display: inline-block;
        vertical-align: top;
        width: 12px;
        height: 12px;
        margin-right: 2px;
        background-size: 12px 12px;
        background-repeat: no-repeat;
        &.decrease {
          .bg-image('decrease_3');
        }
        &.discount {
          .bg-image('discount_3');
        }
        &.guarantee {
          .bg-image('guarantee_3');
        }
        &.invoice {
          .bg-image('invoice_3');
        }
        &.special {
          .bg-image('special_3');
        }
      }
      .text {
        display: table-cell;
        width: 56px;
        vertical-align: middle;
        .border-1px(rgba(7, 17, 27, 0.1));
        font-size: 12px;
      }
    }
  }
  .foods-wrapper {
    flex: 1;
    .title {
      padding-left: 14px;
      height: 26px;
      line-height: 26px;
      border-left: 2px solid #d9dde1;
      font-size: 12px;
      color: rgb(147,153,159);
      background-color: #f3f5f7;
    }
    .food-item {
      display: flex;
      padding: 18px;
      .border-1px(rgba(7, 17, 27, 0.1));
      &:last-child {
        .border-none()
      }
      .icon {
        flex: 0 0 57px;
        margin-right: 10px;
        img {
          width: 57px;
          height: 57px;
        }
      }
      .content {
        flex: 1;
        .name {
          margin: 2px 0 8px 0;
          height: 14px;
          line-height: 14px;
          font-size: 14px;
          color: rgb(7,17,27);
        }
        .desc, .extra {
          margin-bottom: 8px;
          line-height: 10px;
          font-size: 10px;
          color: rgb(147,153,159);
        }
        .desc {
          line-height: 12px;
        }
        .extra {
          margin-bottom: 0;
          .count {
            margin-right: 12px;
          }
        }
        .price {
          font-weight: 700;
          line-height: 24px;
          .now {
            margin-right: 8px;
            font-size: 14px;
            color: rgb(240,20,20);
          }
          .old {
            text-decoration: line-through;
            font-size: 10px;
            color: rgb(147,153,159);
          }
        }
        .cartcontrol-wrapper {
          position: absolute;
          right: 0;
          bottom: 12px;
        }
      }
    }
  }
}
</style>
