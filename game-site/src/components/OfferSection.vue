<template>
    <div class="block-offer grid">
            <div class=" grid-5fr">
                <slot name="5fr"></slot>
            </div>
            <div class=" grid-3fr">
                <slot name="3fr"></slot>
            </div>
            <div class=" grid-2fr">
                <slot name="2fr"></slot>
            </div>
    </div>
</template>

<script>

</script>

<style lang="scss" scoped>
@import '../assets/components-style/offer_section.scss';

</style>