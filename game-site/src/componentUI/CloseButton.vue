<template>
    <div class="outer">
        <div class="inner">
            <label>{{ text }}</label>
        </div>
    </div>
</template>

<script setup>
const { text } = defineProps({
    text:{
        type:String,
        requere:true
    }
})
</script>

<style lang="scss" scoped>
.outer {
    position: absolute;
    right: 10px;
    top: 10px;
    margin: auto;
    width: 42px;
    cursor: pointer;
    overflow: hidden;
}

.inner {
    width: inherit;
    text-align: center;
}

label {
    font-size: .8em;
    text-transform: uppercase;
    color: #fff;
    transition: all .3s ease-in;
    opacity: 0;
    cursor: pointer;
}

.inner:before,
.inner:after {
    position: absolute;
    content: '';
    height: 2px;
    width: inherit;
    background: #FFC107;
    left: 0;
    transition: all .3s ease-in;
}

.inner:before {
    top: 50%;
    transform: rotate(45deg);
}

.inner:after {
    bottom: 50%;
    transform: rotate(-45deg);
}

.outer:hover label {
    opacity: 1;
}

.outer:hover .inner:before,
.outer:hover .inner:after {
    transform: rotate(0);
}

.outer:hover .inner:before {
    top: 0;
}

.outer:hover .inner:after {
    bottom: 0;
}
</style>