<template>
  <div class="AdminBottomModal">
    <div class="bottom-modal-overlay" @click="modalClose"></div>
    <div class="bottom-modal-card">
      <div class="modal_content">
        <slot />
      </div>
      <footer class="modal_footer">
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
      this.$emit('modalClose')
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
.modal_content {
  display: flex;
  flex-direction: column;
  margin-top: 63px;
  padding:0px 24px;
  width: 100%;
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
