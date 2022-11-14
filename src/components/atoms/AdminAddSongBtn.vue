<template>
    <div class="AdminAddSongBtn" @click="openModal" >
        <img src="../../assets/plus_icon.svg"/>
        {{ textAddSong }}
    </div>
</template>

<script>
export default {
    name: "AdminAddSongBtn",
    props: ['textAddSong'],
    methods: {
        openModal() {
            this.$emit('openBottomModal')
    }
    }
};
</script>

<style scoped>
.AdminAddSongBtn{
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
    height: 50px;
    border-bottom: 2px solid #646574;
    color: #6E707F;
    cursor: pointer;
    margin-bottom: 24px;
}

</style>
