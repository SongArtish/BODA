<template>
  <div class="AdminList">
    <NavBar :textNavbar="textNavbar" />
    <h1>AdminList</h1>
    <BottomButton :textButton="textButton" @buttonClick="create" />
  </div>
</template>
<script>
import { BottomButton, NavBar } from './atoms'

export default {
  name: 'AdminList',
  components: {
    BottomButton,
    NavBar
  },
  data() {
    return {
      textNavbar: '찬양공유 관리자시스템',
      textButton: '새 콘티 추가'
    }
  },
  methods: {
    create() {
      console.log('hello')
    }
  }
}
</script>
<style scoped>

</style>