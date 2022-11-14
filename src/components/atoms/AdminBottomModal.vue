<template>
    <div class="AdminBottomModal">
        <div class="bottom-modal-overlay" @click="modalClose"></div>
        <div class="bottom-modal-card">
            
            <div class="bottom-modal-content">
                <div class="bottom-modal-top">
                    <div class="bottom-modal-top-line"></div>
                </div>
                <slot />
            </div>
            <footer class="bottom-modal-footer">
                <slot name="footer">
                </slot>
            </footer>
        </div>
    </div>
</template>

<script>
export default {
    name: "AdminBottomModal",
    methods: {
        modalClose() {
            this.$emit('closeBottomModal')
        }
    }
};
</script>

<style scoped>
.AdminBottomModal {
    display: flex;
    bottom: 0;
    overflow: hidden;
}
.bottom-modal-overlay {
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(37, 37, 44, 0.85);
}
.bottom-modal-content {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    padding:0px 24px;
    width: 100%;
}
.bottom-modal-top {
    display: flex;
    justify-content: center;
    margin-bottom: 36px;
}
.bottom-modal-top-line {
    width: 70px;
    height: 5px;
    left: 153px;
    top: 10px;
    background: #FFFFFF;
    border-radius: 50px;
}
.bottom-modal-card {
    background: #48495b;
    display: flex;
    color: #fffffd;
    position: fixed;
    bottom: 0;
    left:0;
    right: 0;
    width: 100%;
    height: 430px;
    border-radius: 30px 30px 0px 0px;
}
</style>
