<template>
  <header>
    <div id="EditModal">
      <div class="editmodal-overlay"></div>
      <div class="editmodal-card">

        <div class="editmodalcard-text">
          <div class="editmodalcard-title">게시글 수정</div>
          <img src="@/assets/close_icon.svg" class="close-icon" @click="$emit('close-modal')"/>
        </div>
        
        <small class="editmodalcard-subtext">게시글 비밀번호를 입력해 주세요.</small>

        <input 
        class="password-input"
        type="password"
        placeholder="비밀번호를 입력해주세요"
        v-model="password"
        >

        <div class="editmodalcard-button">
          <button @click="editCard">확인</button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "editModal",
  data()  {
    return {
      password: "",
    }
  },
  methods: {
    pageAdminList() {
      this.$router.push({ path: "/admin/list" });
    },
    editCard() {
      this.$router.push({ path: `/admin/edit` });
    },
  }
}
</script>

<style scoped>
.editmodal-overlay {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  opacity: 0.5;
  z-index: 3;
  background-color: black;
}
.editmodal-card {
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
.editmodalcard-text {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
    width: 293px;
}
.editmodalcard-title{
  line-height: 20px;
  letter-spacing: -0.025em;
  font-weight: 700;
}
.editmodalcard-subtext{
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
.editmodalcard-button{
  position: absolute;
  bottom: 0;
  left: 0;
}
.editmodalcard-button button {
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

<!--

<template>
  <header>
    <div id="EditModal">
      <div class="modal_overlay"></div>
      <div class="modal_card">
        <form @submit.prevent="login">
        <div class="login-form">
        <span>게시글 수정
          <font-awesome-icon @click="$emit('close-modal')" icon="fa-solid fa-xmark" />
        </span>
        <label for="password">게시글 비밀번호를 입력하여 주세요</label>
        <input
          class="login-box"
          id="password"
          type="password"
          v-model="password"
        />
      </div>
      <button @click="goAdminEdit()" id="login-btn" type="submit">
        확인
      </button>
-->
      <!-- <button @click="test">테스트</button> -->
<!--
    </form>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      password: null,
    };
  },
  name: "EditModal",
  methods: {
    goAdminEdit() {
			this.$router.push({ path: "/admin/edit" });
			}
  },
};
</script>

<style>
.modal_overlay {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  opacity: 0.5;
  background-color: black;
}
.modal_card {
    width: 100%;
    height: 10rem;
    background: #6E707F;
    border-style: solid;
    border-color: hsl(240, 10%, 35%);
    border-radius: .5rem;
    margin-bottom: 2rem;
    padding: 1rem;

    display: flex;
    justify-content: space-between;
  
}
</style>

-->