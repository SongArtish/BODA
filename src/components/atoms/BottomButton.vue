<template>
  <div class="BottomButton" @click="clickButton">
    {{ textButton }}
  </div>
</template>
<script>

export default {
  name: 'BottomButton',
  props: {
    textButton: {
      type: String
    },
    clickButton: {
      type: Function,
      default: () => {}
    }
  },
  components: {
  }
}
</script>
<style scoped>
.BottomButton {
    /* Auto layout */
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 13px 0px;
    gap: 10px;

    position: fixed;
    width: 100%;
    height: 3rem;
    bottom: 0;
    left: 0;

    /* Point/admin */

    background: var(--color-main);
    cursor: pointer;
}
</style>
