<template>
    <header>
    <div id="AdminHeaderModal">
        <div class="modal-overlay"></div>
        <div class="modal-card">
        <div class="modalcard-title">게시글 취소</div>
        <div class="modalcard-subtext">게시글을 저장하지 않고 나가시겠어요?</div>
        <div class="modalcard-button">
            <button @click="$emit('close-modal')">취소</button>
            <button @click="pageAdminList">확인</button>
        </div>
        </div>
    </div>
    </header>
</template>

<script>
export default {
    name: "AdminHeaderModal",
    methods: {
    pageAdminList() {
        this.$router.push({ path: "/admin/list" });
    },
    },
};
</script>

<style scoped>
.modal-overlay {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    opacity: 0.5;
    z-index: 3;
    background-color: black;
}

.modal-card {
    position: relative;
    position: absolute;
    z-index: 4;
    left: calc(50% - 327px/2 + 1px);
    top: calc(50% - 153px/2);
    width: 327px;
    height: 153px;
    background-color: #48495b;
    color: #D5D5D5;
    border-radius: 8px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    padding: 24px 16px;
    align-items: flex-start;
    font-family: 'Noto Sans KR';
    font-size: 14px;
}
.modalcard-title{
    line-height: 20px;
    letter-spacing: -0.025em;
    font-weight: 700;
    margin-bottom: 12px;
}
.modalcard-subtext{
    margin-bottom: 24px;    
}
.modalcard-button{
    position: absolute;
    bottom: 0;
    left: 0;

}
.modalcard-button button {
    cursor: pointer;
    width: 163.5px;
    height: 53px;
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 700;
    color: #FFFFFD;
    border:0;
}
.modalcard-button button:first-child{
    background: #595865;
    border-radius: 0px 0px 0px 8px;
}
.modalcard-button button:last-child{
    background: #44786C;
    border-radius: 0px 0px 8px 0px;
}
</style>
