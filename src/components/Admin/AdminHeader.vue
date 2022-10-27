<template>
  <header class="admin-header">
    <div class="alert_block__bg" v-if="isModalViewed">
      <div class="alert_block">
        <span>게시글을 저장하지 않고 나가시겠어요?</span>
        <button @click="alert_save == false">취소</button>
        <button @click="pageAdminList">나가기</button>
      </div>
    </div>

    <!-- <button>이전으로</button> -->
    <font-awesome-icon
      @click="isModalViewed = true"
      icon="fa-solid fa-chevron-left"
    />
    <span>게시글 작성</span>
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
admin-header {
  width: 100%;
  margin-top: 30px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
}

div {
  box-sizing: border-box;
}
.alert_block__bg {
  background: rgba(0, 0, 0, 0.5);
}
.alert_block {
  background: #48495b;
}
</style>
