<template>
    <div class="goods">
        <div class="menu-wrapper" ref='menuWrapper'>
            <ul>
                <li v-for="(item,index) in goods" @click="menuClick(index,$event)" :class="index==currenIndex?'menu-item-selected':'menu-item'">
                    <span class="item"><img v-show="item.type>0" :src='"../../assets/img/"+mapType[0]+"_3@2x.png"' alt=""><span>{{item.name}}</span></span>
                </li>
            </ul>
        </div>
        <div class="foods-wrapper" ref='foodsWrapper'>
            <ul>
                <li v-for="(item,key) in goods" class="food-list food-list-hook">
                    <h1 class="title">{{item.name}}</h1>
                    <ul>
                        <li v-for="food in item.foods" class="food-item" @click="goDetail(food)">
                            <div class="icon">
                                <img :src="food.icon" alt="" width="57px">
                            </div>
                            <div class="content">
                                <h2 class="name">{{food.name}}</h2>
                                <p class="desc">{{food.description}}</p>
                                <div class="extra">
                                    <span>月售{{food.sellCount}}份</span>
                                    <span>好评率{{food.rating}}%</span>
                                </div>
                                <div class="price">
                                    <span class="now">￥{{food.price}}</span>
                                    <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}}</span>
                                </div>
                                <div class="cartcontr">
                                    <CartConView :food="food"></CartConView>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <ShopCartView :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice" :selectFoods="selectFoods"></ShopCartView>
        <FoodView :food="selectedFood" ref="myFood" v-if="selectedFood"></FoodView>
    </div>
</template>
<script>
import BScroll from 'better-scroll';
import ShopCartView from './ShopCart.vue'
import CartConView from '../com/CartCon.vue'
import FoodView from './Food.vue'
    export default{
        data(){
            return {
                goods:[],
                listHeight:[],
                foodsScrollY:0,
                seller:{},
                selectedFood:{}
            }
        },
        components:{
            ShopCartView,
            CartConView,
            FoodView
        },
        props:{

        },
        computed:{
            selectFoods(){
                let foods=[];
                this.goods.forEach((good)=>{
                    good.foods.forEach((food)=>{
                        if(food.count){
                            foods.push(food)
                        }
                    })
                })
                return foods;
            },
            currenIndex(){
                for(let i=0;i<this.listHeight.length;i++){
                    let topHeight = this.listHeight[i];
                    let bottomHeight = this.listHeight[i+1];
                    if((this.foodsScrollY<bottomHeight&&this.foodsScrollY>=topHeight)||!bottomHeight){
                        return i;
                    }
                }
                return 0;   
            }
        },
        created(){
            var _this=this;
            this.mapType=['decrease','discount','special','invoice','guarantee'];
            this.$http.get('src/data.json').then((response)=>{
                _this.goods=response.data.goods;
                _this.seller=response.data.seller;
                _this.$nextTick(()=>{                 
                    this._initScroll();
                    this._calculateHeight(); 
                })
            })
        },
        methods:{
            goDetail(food){
                this.selectedFood=food;
                this.$nextTick(()=>{
                    this.$refs.myFood.showToggle();
                })
            },
            _initScroll(){
                this.menuWrapper = new BScroll(this.$refs.menuWrapper,{
                    click:true
                });
                this.foodsScroll = new BScroll(this.$refs.foodsWrapper,{
                    probeType:3,
                    click:true
                });
                 this.foodsScroll.on('scroll',(pos)=>{
                    this.foodsScrollY = Math.abs(Math.round(pos.y));
                 })
            },
            _calculateHeight(){
                let foodList = this.$refs.foodsWrapper.querySelectorAll('.food-list-hook');
                let height = 0;
                this.listHeight.push(height);
                for(let i=0;i<foodList.length;i++){
                    height+=foodList[i].clientHeight;
                    this.listHeight.push(height);
                }
            },
            menuClick(index,event){
                if(!event._constructed){
                    return
                }
                this.foodsScroll.scrollTo(0,-this.listHeight[index],300)
            }
        }
    }
</script>
<style lang="less">
    .goods{
        display:flex;
        position:absolute;
        top:174px;
        bottom:46px;
        width:100%;
        overflow:hidden;
        .menu-wrapper{
            flex: 0 0 80px;
            width:80px;
            background:#f3f5f7;
            .menu-item,.menu-item-selected{
                display:table;
                padding:0 12px;
                width:56px;
                height:54px;
                line-height:14px;
                border-bottom:1px solid rgba(7,17,27,0.1);
                &:last-child{
                    border-bottom:none;
                }
                .item{
                    display:table-cell;
                    width:56px;
                    vertical-align:middle;
                    font-size:12px;
                    font-weight:200;
                    color:rgb(0,0,0);
                    img{
                        width:12px;
                    }
                span{
                    vertical-align:top;
                }
                }
            }
            .menu-item-selected{
                    margin-top:-1px;
                    background:#fff;
                    font-weight:700;
               }
        }
        .foods-wrapper{
            flex:1;
            .title{
                padding-left:14px;
                height:26px;
                line-height:26px;
                border-left:2px solid #d9dde1;
                font-size:12px;
                color:rgb(147,153,159);
                background-color:#f3f5f7;
            }
            .food-item{
                display:flex;
                margin:18px;
                padding-bottom:18px;
                border-bottom:1px solid rgba(7,17,27,0.1);
                .last-child{
                    border-bottom:0;
                    margin-bottom:0;
                    }
                .icon{
                    flex:0 0 57px;
                    margin-right:10px;
                }    
                .content{
                    flex:1;
                    position:relative;
                    .name{
                        margin: 2px 0 8px 0;
                        height:14px;
                        line-height:14px;
                        font-size:14px;
                        color:rgb(7,17,27);
                    }
                    .desc,.extra{
                         line-height:10px;
                        font-size:10px;
                        color:rgb(147,153,159);
                    }
                    .desc{
                        margin-bottom:8px;
                        line-height:12px;
                    }
                    .extra{
                        .count{
                            margin-right:12px;
                        }
                    }
                    .price{
                        font-weight:700;
                        line-height:24px;
                        .now{
                            margin-right:8px;
                            font-size:14px;
                            color:rgb(240,20,20);
                        }
                        .old{
                            text-decoration:line-through;
                            font-size:10px;
                            color:rgb(147,153,159);
                        }
                    }
                    .cartcontr{
                        position:absolute;
                        right:0;
                        bottom:-20px;
                        z-index:20
                    }
                }
            }
        }
    }
</style>