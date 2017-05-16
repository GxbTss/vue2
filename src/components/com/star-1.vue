<template>
    <div class="star" :class="startype">
        <span v-for="(itemclass,key) in itemclasses" :key="key" class="star-item" :class="itemclass"></span>
    </div>
</template>
<script>
const LENGTH = 5;
const CLS_ON= 'on';
const CLS_HALF='half';
const CLS_OFF = 'off';
    export default{
        props:{
            size:{
                type:Number
            },
            score:{
                type:Number
            }
        },
        computed:{
            startype(){
                return 'star-'+this.size;
            },
           itemclasses(){
                let res=[];
                let score=Math.floor(this.score*2)/2;
                let hasdeti=score%1!==0;
                let integer = Math.floor(score);
                for(let i=0;i<integer;i++){
                    res.push(CLS_ON);
                }
                if(hasdeti){
                    res.push(CLS_HALF);
                }
                while(res.length<LENGTH){
                    res.push(CLS_OFF);
                }
                return res;
           } 
        }
    }
    
</script>
<style lang="less">
    .star{
        font-size:0;
        .star-item{
            display:inline-block;
            background-repeat:no-repeat;
        }
    }
    .star-48{
        .star-item{
            width:20px;
            height:20px;
            margin-right:22px;
            background-size:20px 20px;
            &.last-child{
                margin-right:0;
            }
            &.on{
                background-image:url('../../assets/img/star48_on@2x.png')
            }
            &.off{
                background-image:url('../../assets/img/star48_off@2x.png')
            }
            &.half{
                background-image:url('../../assets/img/star48_half@2x.png')
            }
        }
    }
     &.star-36{
        .star-item{
            width:15px;
            height:15px;
            margin-right:6px;
            background-size:15px 15px;
            &.last-child{
                margin-right:0;
            }
            &.on{
                background-image:url('../../assets/img/star48_on@2x.png')
            }
            &.off{
                background-image:url('../../assets/img/star48_off@2x.png')
            }
            &.half{
                background-image:url('../../assets/img/star48_half@2x.png')
            }
        }
    }
        &.star-24{
        .star-item{
            width:20px;
            height:20px;
            margin-right:22px;
            background-size:20px 20px;
            &.last-child{
                margin-right:0;
            }
            &.on{
                background-image:url('../../assets/img/star48_on@2x.png')
            }
            &.off{
                background-image:url('../../assets/img/star48_off@2x.png')
            }
            &.half{
                background-image:url('../../assets/img/star48_half@2x.png')
            }
        }
    }
</style>