<template>
  <div id="app">
    <HeaderView></HeaderView>
    <div class="table-content border_1px">
        <div class="table-item">
            <router-link to="/goods">商品</router-link>
        </div>
        <div class="table-item">
            <router-link to="/ratings">评论</router-link>
        </div>
        <div class="table-item">
            <router-link to="/sellers">商家</router-link>
        </div>
    </div>
    <router-view></router-view>  
  </div>
</template>

<script>
import HeaderView from './components/Header.vue'
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components:{
      HeaderView
  }
}
</script>

<style lang="less">
    @import './static/less/mixin.less';
    .table-content{
        display:flex;
        width:100%;
        height:40px;
        line-height:40px;
        //border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        .table-item{
            flex:1;
            text-align:center;
            &>a{
                display:block;
                font-size:14px;
                color:rgb(77,85,93);
                &.router-link-active{
                    color:rgb(240,20,20)
                }
            }
        }
    }
    //移动端1px问题
    .border_1px{
        position: relative;
        &:after{
            display: block;
            position: absolute;
            left: 0;
            bottom: 0;
            border-bottom: 1px solid rgba(7,17,27,.1);
            width:100%;
            content: ' '
        }
    }
    @media (-webkit-min-device-pixel-ratio:1.5),(min-device-pixel-ratio:1.5){
        .border_1px::after{
            -webkit-transform:scaleY(0.7);
            transform:scaleY(0.7)
        }
    }
     @media (-webkit-min-device-pixel-ratio:2),(min-device-pixel-ratio:2){
        .border_1px::after{
            -webkit-transform:scaleY(0.5);
            transform:scaleY(0.5)
        }
    }
</style>
