<template>
  <header>
    <div id="DeleteModal">
      <div class="deletemodal-overlay"></div>
      <div class="deletemodal-card">

        <div class="deletemodalcard-text">
          <div class="deletemodalcard-title">게시글 삭제</div>
          <img src="@/assets/close_icon.svg" class="close-icon" @click="$emit('close-modal')"/>
        </div>

        <small class="deletemodalcard-subtext">게시글 비밀번호를 입력해 주세요.</small>

        <input 
        class="password-input"
        type="password"
        placeholder="비밀번호를 입력해주세요"
        v-model="password"
        >

        <div class="deletemodalcard-button">
          <button @click="deleteCard">확인</button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { deleteContiAPI } from '@/apis/admin'

export default {
  name: "DeleteModal",
  data()  {
    return {
      password: "",
    }
  },
  methods: {
    pageAdminList() {
      this.$router.push({ path: "/admin/list" });
    },
    deleteCard() {
      deleteContiAPI(this.contiIndex)
          .then((res) => {
          console.log(res)
          this.$router.go();
        })
        .catch((err) => console.log(err))
    }
  },
};
</script>

<style scoped>
.deletemodal-overlay {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  opacity: 0.5;
  z-index: 3;
  background-color: black;
}
.deletemodal-card {
  position: relative;
  position: absolute;
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
.deletemodalcard-text {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
    width: 293px;
}
.deletemodalcard-title{
  line-height: 20px;
  letter-spacing: -0.025em;
  font-weight: 700;
}
.deletemodalcard-subtext{
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
.deletemodalcard-button{
  position: absolute;
  bottom: 0;
  left: 0;
}
.deletemodalcard-button button {
  cursor: pointer;
  width: 327px;
  height: 53px;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  color: #FFFFFD;
  border:0;
  background: #44786C;
  border-radius: 0px 0px 8px 8px;
}
.close-icon {
  width: 20px;
  height: 20px;
}
</style>