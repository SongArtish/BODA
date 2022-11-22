<template>
    <header>
    <div id="AdminPasswordModal">
        <div class="modal-overlay"></div>
        <div class="modal-card">
        <div class="modal-text">
            <div class="modal-title">
                {{ modalTitle }}
            </div>
            <img 
            class="modal-close-icon" 
            src="../../assets/close_icon.svg"
            alt="닫기"
            @click="modalCloseClick" />
        </div>
        
        <div class="modalcard-subtext">{{ modalSubtext }}</div>
        <input 
        class="password-input"
        type="password"
        placeholder="비밀번호를 입력해주세요"
        v-model="password"
        autofocus
        @keyup.enter="modalButtonClick"
        >
        <button 
        class="confirm-btn" 
        :class="{'disabled' : password.length < 4 }" 
        @click="modalButtonClick">확인</button>
        </div>
    </div>
    </header>
</template>

<script>
export default {
    name: "AdminPasswordModal",
    props: ['modalTitle','modalSubtext'],
    data() {
        return {
            password: "",
        }
    },
    methods: {
    modalButtonClick() {
        this.$emit('modalButtonClick', this.password)
    },
    modalCloseClick(){
        this.$emit('modalCloseClick')
    }
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
    position: fixed;
    z-index: 4;
    left: calc(50% - 327px/2 + 1px);
    top: calc(50% - 220px/2);
    width: 327px;
    height: 220px;
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
.modal-text {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
    width: 293px;
}
.modal-title{
    line-height: 20px;
    letter-spacing: -0.025em;
    font-weight: 700;
}
.modal-close-icon{
    width: 20px;
    height: 20px;
}
.modalcard-subtext{
    margin-bottom: 24px;
}
.password-input {
    background-color: transparent;
    border: none;
    width: 293px;
    height: 39px;
    border-bottom: 1px solid #646574;
    display: flex;
    text-align: center;
    color: #FFFFFD;
}
.password-input:focus {
    outline: none !important;
    color: #FFFFFD;
    border-bottom: 2px solid #90E5FA;
}
.modalcard-button{
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 0;
}
.confirm-btn {
    cursor: pointer;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 327px;
    height: 53px;
    font-family: 'Noto Sans KR';
    font-style: normal;
    border:0;
    border-radius: 0px 0px 8px 8px;
    color: #FFFFFD;
    background: #44786C;
}
.disabled {
    background: #505062;
    color: gray;
    cursor: none;
}

</style>
