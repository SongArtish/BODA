<template>
  <div id="AdminBottomModal">
    <div class="bottom_modal_overlay" @click.self="$emit('close')"></div>
    <div class="bottom_modal_card">
      <div class="modal_content">
        <slot />
      </div>
      <footer class="modal_footer">
        <slot name="footer">
          <button @click="$emit('close')">Close</button>
        </slot>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminBottomModal",
};
</script>

<style scoped>
.bottom_modal_overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(37, 37, 44, 0.85);
}

.bottom_modal_card {
  position: relative;
  background: #48495b;
  color: #fffffd;
  bottom: 0;
  left: 0;
  width: 100%;
}
</style>
