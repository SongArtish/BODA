<template>
  <header>
    <div id="DeleteModal">
      <div class="modal_overlay"></div>
      <div class="modal_card">
        <span>게시글을 삭제하시겠습니까?</span>
        <button @click="$emit('close-modal')">취소</button>
        <button @click="deleteCard(index)">삭제</button>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "DeleteModal",
  methods: {
    deleteCard(index) {
      this.cardinfos.splice(index, 1);
    },
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