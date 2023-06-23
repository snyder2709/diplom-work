<template>
    <div ref='vantaRef' class="vanta">
        Foreground content here
    </div>
</template>

<script>


// import VANTA from 'vanta/dist/vanta.three.min.js';
import { defineComponent } from 'vue';
import NET from 'vanta/dist/vanta.net.min.js';

export default defineComponent({
    mounted() {
        this.vantaEffect = NET({
            el: this.$refs.vantaRef,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: .5,
            scaleMobile: 1.00,
            color: "gold",
            backgroundColor: "#1e1e1e",
            maxDistance: 15.00,
            spacing: 13.00,
            showDots: false

        });
    },
    beforeDestroy() {
        if (this.vantaEffect) {
            this.vantaEffect.destroy();
        }
    },
});

</script>

<style lang="scss" scoped>
.vanta {
    width: 100%;
    height: 100%;
    position: absolute;
    color: #ffffff00;
    background-color: transparent;
    top: 0;
    left: 0;
    z-index: -1;
}
</style>