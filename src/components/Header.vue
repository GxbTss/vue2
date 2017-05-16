<template>
    <div class="header">
        <div class="seller-content">
            <div class="seller-content-left">
                <img :src="sellers.avatar" alt="">
            </div>
            <div class="seller-content-right">
                <div class="seller-brand">
                <span class="icon"></span>
                    <img src="../assets/img/brand@2x.png" alt=""><span class="name">{{sellers.name}}</span>
                </div>
                <div class="seller-trans">
                    <span>{{sellers.description}}/{{sellers.deliveryTime}}分钟到达</span>
                </div>
                <div class="seller-discount" v-if="sellers.supports">
                    <img :src='"../assets/img/"+mapType[sellers.supports[0].type]+"_1@2x.png"' alt=""><span>{{sellers.supports[0].description}}</span>
                </div>
            </div>
            <div class="seller-more" @click="detail()">
                <span class="hel">{{this.mapType.length}}个</span>
            </div>
        </div>
        <div class="seller-tip" @click="detail()">
        <img src="../assets/img/bulletin@2x.png" alt=""><span class="tip-content">{{sellers.bulletin}}</span>
        </div>
        <div class="seller-bg">
            <img :src="sellers.avatar" alt="" width="100%" height="100%">
        </div>
        <transition name="fade">
            <div v-show="detailShow" class="detail">
                <div class="detail-wrapper clearfix">
                    <div class="detail-main">
                        <h1 class="name">{{sellers.name}}</h1>
                        <div class="star-wrapper">
                            <StarView :size="48" :score="sellers.score"></StarView>
                        </div>
                        <div class="title">
                            <div class="line"></div>
                            <div class="text">优惠信息</div>
                            <div class="line"></div>
                        </div>
                        <ul v-if="sellers.supports" class="supports">
                            <li class="support-item" v-for="(support,key) in sellers.supports">
                                <img :src='"../assets/img/"+mapType[sellers.supports[key].type]+"_2@2x.png"' alt=""><span>{{sellers.supports[key].description}}</span>
                            </li>
                        </ul>
                        <div class="title">
                            <div class="line"></div>
                            <div class="text">商家公告</div>
                            <div class="line"></div>
                        </div>
                        <div class="bulletin">
                            <p class="content">{{sellers.bulletin}}</p>
                        </div>
                    </div>
                </div>
                <div class="detail-close">
                    <img src="../assets/images/x.png" width="32" height="32" alt="" @click="hideDetail()">
                </div>
            </div>        
        </transition>
    </div>
</template>
<script>
import StarView from './com/Star.vue'
    export default{
        data(){
            return {
                sellers:{},
                supports:[],
                detailShow:false
            }
        },
        created(){
            this.mapType=['decrease','discount','special','invoice','guarantee'];
        },
        mounted(){
            this.$http.get('src/data.json').then(function(res){
                this.sellers=res.data['seller'];               
            }.bind(this)).catch(function(err){
                console.log(err)
            })
        },
        methods:{
            detail(){
                this.detailShow=true;
            },
            hideDetail(){
                this.detailShow=false;
            }
        },
        components:{
            StarView
        }
    }
</script>
<style lang="less">
    .header{
        position:relative;
        background:rgba(7,17,27,.5);
        .seller-content{
            position:relative;
            .seller-content-left{
                display:inline-block;
                padding:24px 16px 18px 24px; 
                img{
                    width:64px;
                    border-radius:4px;
                }
            }
            .seller-content-right{
                display:inline-block;
                .seller-brand{
                    padding-top:2px;
                    img{
                        width:30px;
                        height:18px;
                    }
                    span.name{
                        padding-left:6px;
                        line-height:18px;
                        vertical-align:top;
                        font-size:16px;
                        font-weight:bold;
                        color:#fff;
                    }
                }
                .seller-trans{
                    margin:8px 0 10px 0;
                    line-height:12px;
                    font-size:12px;
                    font-weight:200;
                    color:#fff;
                }
                .seller-discount{
                    padding-bottom:2px;
                    line-height:12px;
                    font-size:10px;
                    color:#fff;
                    font-weight:200;
                    img{
                        width:12px;
                        height:12px;
                    }
                    span{
                        padding-left: 4px;
                        vertical-align:top;
                    }
                }
            }
            .seller-more{
                position:absolute;
                right:12px;
                bottom:18px;
                padding:7px 8px;
                width:30px;
                height:10px;
                border-radius:12px;
                text-align:center;
                background-color:rgba(0,0,0,0.2);  
                cursor:pointer;            
                span.hel{
                    vertical-align:top;
                    font-size:10px;
                    font-weight:200;
                    color:#fff;
                }
            }
        }
        .seller-tip{
            padding: 0 12px;
            height:28px;
            line-height:28px;
            white-space:nowrap;
            text-overflow:ellipsis;
            overflow:hidden;
            background-color:rgba(7,17,27,.2);
            color:#fff;
            img{
                width:22px;
                height:12px;
            }
            span{
                padding: 0 4px;
                vertical-align:top;                
                font-size:10px;
                font-weight:200;
                
            }
        }
        .seller-bg{
           position:absolute;
           left:0;
           top:0;
           width:100%;
           height:100%;
           z-index:-1;
           -webkit-filter:blur(10px);
        }
        .fade-enter-active,.fade-leave-active{
            transition: 3s all;
            background:rgba(7,17,27,0);
            opacity:0
        }
        .fade-enter-active{
            background:rgba(7,17,27,0.8);
            opacity:0
        }
        .fade-enter,.fade-leave{
            background:rgba(7,17,27,0.8);
            opacity:1
        }
        .detail{
            position:fixed;
            left:0;
            top:0;
            z-index:100;
            width:100%;
            height:100%;
            overflow:auto;
            color:#fff;
            background:rgba(7,17,27,.8);
            //-webkit-filter:blur(10px);
            &-wrapper{
                width:100%;
                min-height:100%;
            }
            &-main{
                margin-top:64px;
                padding-bottom:64px;
                color:#fff;
                h1.name{
                    width:100%;
                    line-height:16px;
                    text-align:center;
                    font-size:16px;
                    font-weight:700;
                }
                .star-wrapper{
                    margin-top:18px;
                    padding:2px 0;
                    text-align:center;
                }
                .title{
                    display:flex;
                    width:80%;
                    margin:28px auto 24px auto;
                    .line{
                        flex:1;
                        position:relative;
                        top:-6px;
                        border-bottom:1px solid rgba(255,255,255,.2);
                    }
                    .text{
                        padding:0 12px;
                        font-size:14px;
                        font-weight:700;
                    }
                }
                .supports{
                    width:80%;
                    margin: 0 auto;
                    .support-item{
                        margin-bottom:12px;
                        padding:0 12px;
                        &.last-child{
                            margin-bottom:0;
                        }
                        img{
                            width:16px;
                            height:16px;
                        }
                        span{
                            display:inline-block;
                            vertical-align:top;
                            margin-left:6px;
                            line-height:16px;
                            height:16px;
                            font-size:12px;
                            font-weight:200;
                            color:#fff;
                        }
                    }
                }
                .bulletin{
                    margin:0 auto;
                    width:80%;
                    .content{
                        padding:0 12px;
                        line-height:24px;
                        font-size:12px;
                    }
                }
            }
            &-close{
                position:relative;
                width:100%;
                height:32px;
                margin:-64px auto 0 auto;
                clear:both;
                font-size:32px;
                text-align:center;
            }
        }
    }
    .clearfix{
        display:inline-block;
        &:after{
            dispaly:block;
            content:' ';
            height:0;
            line-height:0;
            clear:both;
            visibility:hidden;
        }
    }
</style>