<template>
    <div class="requirements">
        <div class="title-wrapper" >
            <div class="inner-title">
                <TitleSection title="System requirement" />
                <span class="platform">for {{platform}}</span>
            </div>
            <div class="line-title"></div>
        </div>
        <div class="wrapper-requirements">
            <div class="des-requirements" v-html="requirements.minimum"></div>
            <div class="des-requirements" v-html="requirements.recommended"></div>
        </div>
    </div>
</template>

<script setup>
import TitleSection from '../../componentUI/TitleSection.vue';
    const {requirements,platform} = defineProps({
        requirements:{type:Object,requare:true},
        platform:{type:Object,requare:true}
    })
</script>

<style lang="scss" scoped>
@import  '@/assets/mixin.layout.scss';
@import '@/assets/variable.scss';
.requirements{
    @include center-align-col;
    width: 80%;
    margin: 0 auto;
    font:$font-regular;
    .wrapper-requirements{
        display: flex;
        align-content: center;
        height: 40%;
        width: 100%;
        gap: 20px;
    }
    .des-requirements{
        font-size: 2vmin;
        
    }
    .title-wrapper {
        width: 100%;
        .inner-title{
            width: inherit;
            display: flex;
        }
        .platform{
            @include font-paragraph;
            margin: 1vw 0vw 2vw 8px;
        }
    }
}
</style>