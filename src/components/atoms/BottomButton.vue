<template>
  <div class="BottomButton" @click="buttonClick">
    {{ textButton }}
  </div>
</template>
<script>

export default {
  name: 'BottomButton',
  props: ['textButton'],
  components: {
  },
  methods: {
    buttonClick() {
      this.$emit('buttonClick')
    }
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

    position: absolute;
    width: 100%;
    height: 3rem;
    bottom: 0;
    left: 0;

    /* Point/admin */

    background: #44786C;
    cursor: pointer;
}
</style>