<template>
    <button>
        <font-awesome-icon icon="fa-solid fa-arrow-down" />
    </button>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>


button{
    position: fixed;
    width:4rem;
    height:4rem;
    bottom: 2rem;
    right: 2rem;
    border-radius: 50%;
    cursor: pointer;
    border: 1px solid rgb(1, 1, 179);
    transition: 0.3s ease-out;
    &:hover {
        box-shadow: 0px 2px 10px 0px rgba(1, 1, 179, 0.568);
    }
}
</style>