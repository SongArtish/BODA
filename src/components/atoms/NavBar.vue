<template>
  <div class="wrapper">
    <div class="navbar">
      <div class="navbar-title">찬양공유 <span v-if="isAdmin">관리자시스템</span></div>
      <div class="navbar-button" v-if="isAdmin">
        <button class="navbar-button-logout" @click="logout"><small>로그아웃</small></button>
      </div>
    </div>
    <div class="navbar-area"></div>
  </div>
</template>
<script>

export default {
  name: 'NavBar',
  components: {
  },
  props: ['textNavbar'],
  computed: {
    isAdmin () {
      return window.location.href.includes('admin');
    }
  },
  methods: {
    logout() {
      this.$emit('logout');
    }
  }
}
</script>
<style scoped>
.wrapper {
  margin-bottom: 35px;
}

.navbar {
  position: fixed;

  height: 60px;
  width: 100%;
  background: var(--color-bg);
  z-index: 4;
}

.navbar-title{
  height: 20px;
  margin: 0 24px;
}

.navbar-area {
  height: 60px;
}

.navbar-button-logout {
  background: #6E707F;
  border: 0;
  border-radius: .3rem;
  margin: 0 24px;
  color: white;
}

.navbar-button-logout {
  background: #6E707F;
  border: 0;
  border-radius: .3rem;
  color: white;
}
</style>
