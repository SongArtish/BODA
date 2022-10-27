<template>
    <div class="AdminBtn" @click="buttonClick">
        {{ textButton }}
    </div>
</template>
<script>
export default {
    name: 'AdminBtn',
    props: ['textButton'],
    components: {
    },
    methods: {
    buttonClick() {
        this.$emit('buttonClick')
    }
    }
}
</script>
<style scoped>
.AdminBtn {
    /* Auto layout */
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    gap: 10px;
    width: 100%;
    height: 60px;
    bottom: 0;
    left: 0;
    background: #44786C;
    cursor: pointer;
}
</style>