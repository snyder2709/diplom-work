<template>
    <div class="requirements">
        <div class="title-wrapper" >
            <TitleSection title="System requirement" />
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
    .title-wrapper{
        width: 90%;
        border: 1px solid ;
        
    }
}
</style>