<template>
  <div class="NavBar">
    {{ textNavbar }}
  </div>
</template>
<script>

export default {
  name: 'NavBar',
  components: {
  },
  props: ['textNavbar']
}
</script>
<style scoped>
.NavBar {
    width: 100%;
    left: 0px;
    margin: 3rem 2rem;
    /* display: block; */
    /* position: absolute; */
    /* height: 60px; */
}
</style>