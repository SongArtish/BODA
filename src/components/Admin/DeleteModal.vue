<template>
  <header>
    <div id="DeleteModal">
      <div class="modal_overlay"></div>
      <div class="modal_card">
        <form @submit.prevent="login">
        <div class="login-form">
        <span>게시글 삭제
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
      <button @click="deleteContiCardAPI(contiId)" id="login-btn" type="submit">
        확인
      </button>
      <!-- <button @click="test">테스트</button> -->
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
  name: "DeleteModal",
  methods: {
    DeleteCard(index) {
      this.cardinfos.splice(index, 1);
    },
    remove (index) {
      this.$delete(this.finds, index)
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
  position: relative;
  max-width: 80%;
  margin-top: 30px;
  background-color: #48495b;
  color: #d4d4d4;
}
</style>