<template>
  <div class="AdminDetail">
    <h1>AdminDetail</h1>
  </div>
</template>
<script>
import Login from "@/mixins/login";

export default {
  name: 'AdminDetail',
  components: {
  },
  mixins: [Login]
}
</script>
<style scoped>
.AdminDetail {
  margin-left: 2rem;
  margin-right: 2rem;
}
</style>
