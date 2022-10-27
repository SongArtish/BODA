<template>
    <div class="AdminAddSongBtn" @click="openModal" >
        <font-awesome-icon icon="fa-solid fa-plus" />
        {{ textAddSong }}
    </div>
</template>

<script>
export default {
    name: "AdminAddSongBtn",
    props: ['textAddSong'],
    methods: {
        openModal() {
            this.$emit('openModal')
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
    cursor: pointer;
    margin: 0px 24px 24px 24px;
}

</style>
