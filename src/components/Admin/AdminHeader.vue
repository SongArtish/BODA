<template>
  <header>
    <div class="black-bg" v-if="alert_save == true">
      <div class="white-bg">
        <span>게시글을 저장하지 않고 나가시겠어요?</span>
        <button @click="alert_save = false">취소</button>
        <button @click="pageAdminList">나가기</button>
      </div>
    </div>

    <!-- <button>이전으로</button> -->
    <font-awesome-icon
      @click="alert_save = true"
      icon="fa-solid fa-chevron-left"
    />
    <h1>찬양공유관리자시스템</h1>
    <div class="form-group"></div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      alert_save: false,
    };
  },
  methods: {
    pageAdminList() {
      this.$router.push({ path: "/admin/list" });
    },
  },
};
</script>

<style scoped>
header {
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;

  align-items: center;
  justify-content: center;
  height: 100px;
}
header h1 {
  display: flex;
  text-align: center;
  font-size: 15px;
  top: 0;
  left: 100px;
}
div {
  box-sizing: border-box;
}
.black-bg {
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  padding: 20px;
  display: flex;
  margin: 20px;
}
.white-bg {
  width: 100%;
  background: white;
  margin: 20px;
  border-radius: 8px;
  border: 2px solid #aaaaaa;
  font-weight: 400;
  font-size: 15px;
}
</style>
