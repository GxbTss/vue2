<template>
    <div class="cart-main">
        <div class="shopcart">
            <div class="content">
                <div class="content-left" @click="listToggle">
                    <div class="logo-wrapper">
                        <div class="logo" :class="{'highlight':totalCount}">
                            <span class="logo-gwc" :class="{'highlight':totalCount}"></span>
                        </div>
                        <div class="num" v-if="totalCount>0">
                            {{totalCount}}
                        </div>
                    </div>
                    <div class="price" :class="{'highlight':totalPrice}">￥{{totalPrice}}</div>
                    <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
                </div>
                <div class="content-right" @click="pay">
                    <div class="pay" :class="{'enough':totalPrice>=minPrice}">
                    {{payDesc}}
                    </div>
                </div>
            </div>
            <div class="ball-container">
            
            </div>
            <transition name="transHeight">
                <div class="shopcart-list" v-show="listShow">
                    <div class="list-header">
                        <h1 class="title">购物车</h1>
                        <span class="empty" @click="setEmpty">清空</span>
                    </div>
                    <div class="list-content" ref="foodlist">
                        <ul>
                            <li class="food" v-for="food in selectFoods">
                                <span class="name">{{food.name}}</span>
                                <div class="price">
                                    <span>￥{{food.price*food.count}}</span>
                                </div>
                                <div class="cartcontrol-wrapper">
                                    <CartConView :food="food"></CartConView>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </transition>
            
        </div>
        <transition name="cartmask">
            <div class="cart-mask" v-show="listShow" @click="hideCart"></div>
        </transition>
    </div>   
</template>
<script>
import CartConView from '../com/CartCon.vue'
import BScroll from 'better-scroll';
    export default{
        props:{
            selectFoods:{
                type:Array,
                default:[]
            },
            deliveryPrice:{
                type:Number,
                default:0
            },
            minPrice:{
                type:Number,
                default:0
            }
        },
        data(){
            return {
                listShow:false
            }
        },
        components:{
            CartConView
        },
        methods:{
            pay(){
                if(this.totalPrice<this.minPrice){
                    return
                }
                window.alert(`需支付${this.totalPrice}元`)
            },
            hideCart(){
                this.listShow=false;
            },
            setEmpty(){
                this.selectFoods.forEach((food)=>{
                    food.count=0;
                })
            },
            listToggle(){
                if(!this.selectFoods.length){
                    return
                }
                this.listShow=!this.listShow;
                if(this.listShow){
                    this.$nextTick(()=>{
                        if(!this.foodlistScroll){
                            this._initScroll();
                        }else{
                            this.foodlistScroll.refresh();
                        }
                    })
                }
            },
            _initScroll(){
                this.foodlistScroll=new BScroll(this.$refs.foodlist,{
                    click:true
                })
            }
        },
        computed:{
            totalPrice(){
                let total = 0;
                this.selectFoods.forEach((food)=>{
                    total+=food.price*food.count;
                })
                return total;
            },
            totalCount(){
                let count=0;
                this.selectFoods.forEach((food)=>{
                    count+=food.count;
                })
                if(count==0){
                    this.listShow=false;
                }
                return count;
            },
            payDesc(){
                let diff = this.minPrice-this.totalPrice;
                if(!this.totalPrice){
                    return `￥${this.minPrice}起送`;
                }else if(diff>0){
                    return `还差￥${diff}元`
                }else{
                    return '去结算'
                }
            }
        }
    }
</script>
<style lang="less">
    .shopcart{
        position:fixed;
        left:0;
        bottom:0;
        z-index:50;
        width:100%;
        height:48px;
        .content{
            display:flex;
            background:#141d47;
            font-size:0;
            .content-left{
                flex:1;
                .logo-wrapper{
                    display:inline-block;
                    position:relative;
                    top:-10px;
                    margin: 0 12px;
                    padding:6px;
                    width:56px;
                    height:56px;
                    box-sizing:boder-box;
                    vertical-align:top;
                    border-radius:50%;
                    background:#141d47;
                    .logo{
                        width:100%;
                        height:100%;
                        border-radius:50%;
                        background:#2b343c;
                        text-align:center;
                        &.highlight{
                            background:rgb(0,160,240);
                        }
                        .logo-gwc{
                            display:inline-block;
                            width:100%;
                            height:100%;
                            line-height:24px;
                            font-size:24px;
                            color:#80858a;
                            background:url('../../assets/images/gwc.png') no-repeat 16px;
                            background-size:24px;
                            &.highlight{
                                background:url('../../assets/images/gwc.active.png') no-repeat 16px;
                                background-size:24px;
                            }
                        }
                    }
                }
                .num{
                    position:absolute;
                    top:0;
                    right:0;
                    width:24px;
                    height:16px;
                    line-height:16px;
                    text-align:center;
                    border-radius:16px;
                    font-size:9px;
                    font-weight:700;
                    color:#fff;
                    background:red;
                    box-shadow:0 4px 8px rgba(0,0,0,0.4);
                }
                .price{
                    display:inline-block;
                    vertical-align:top;
                    margin-top:12px;
                    line-height:24px;
                    padding-right:12px;
                    box-sizing:border-box;
                    border-right:1px solid rgba(255,255,255,.1);
                    font-size:16px;
                    font-weight:700;
                    color:rgba(255,255,255,.4);
                    &.highlight{
                        color:#fff;
                    }
                }
                .desc{
                    display:inline-block;
                    vertical-align:top;
                    margin:12px 0 0 12px;
                    line-height:24px;
                    font-size:10px;
                    color:rgba(255,255,255,.4);
                }
            }
            .content-right{
                flex:0 0 105px;
                width:105px;
                .pay{
                    height:48px;
                    line-height:48px;
                    text-align:center;
                    background:#2b333b;
                    font-size:12px;
                    font-weight:700;
                    color:rgba(255,255,255,.4);
                    &.enough{
                        background: #00b43c;
                        color: white
                    }
                }
            }
        }
        .shopcart-list{
            position:absolute;
            top:0;
            left:0;
            width:100%;
            background:#Fff;
            transform:translate3d(0,-100%,0);
            z-index:-1;
             &.transHeight-enter-active,&.transHeight-leave-active{
                 transition: all 0.5s;
             }
             &.transHeight-enter,&.transHeight-leave-active{
                 transform:translate3d(0,0,0)
             }
            .list-header{
                height:40px;
                line-height:40px;
                background:#f3f5f7;
                border-bottom:1px solid rgba(7,17,27,.1);
                .title{
                    display:inline-block;
                    font-size:14px;
                    font-weight:200;
                    color:rgb(7,17,27);
                    padding-left:18px;
                } 
                .empty{
                    position:absolute;
                    right:8px;
                    font-size:12px;
                    color:rgb(0,160,220);
                    padding:0 10px;
                }
            }
            .list-content{
                max-height:217px;
                overflow:hidden;
                .food{
                    position:relative;
                    display:flex;
                    height:48px;
                    margin:0 18px;
                    border-bottom:1px solid rgba(7,17,27,.1);
                    .name{
                        flex:1;
                        font-size:14px;
                        color:rgb(7,17,27);
                        line-height:48px;
                        font-weight:700;
                    }
                    .price{
                        font-size:14px;
                        font-weight:700;
                        color:rgb(240,20,20);
                        padding:0 12px 0 18px;
                        line-height:48px;
                    }
                    .caretcontrol-wrapper{
                        font-size:14px;
                        margin-top:6px;
                    }
                }
            }
            
        }
    }
    .cart-mask{
        position:fixed;
        top:0;
        left:0;
        width:100%;
        height:100%;
        background:rgba(7,17,27,.6);
        filter:blur(10px);
        z-index:40;
        &.cartmask-enter-active,&.cartmask-leave-active{
            opacity :0.5;
        }
        &.cartmask-enter,&.cartmask-leave-active{
            opacity :0;
        }
    }
</style>