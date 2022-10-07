<template>
  <div id="AdminBottomModal">
    <div class="modal modal_overlay">
      <div class="modal-card">
        <div class="modal-content">
          <slot />
        </div>
        <footer class="modal-footer">
          <slot name="footer">
            <button @click="$emit('close')">Close</button>
          </slot>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminBottomModal",
};
</script>

<style scoped>
.modal_overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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
