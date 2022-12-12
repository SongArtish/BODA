<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
function checkMobile () {
  document.body.dataset.is_mobile = navigator.userAgent.includes('Mobi');
}
checkMobile();
console.log('is mobile? ', document.body.dataset.is_mobile);
</script>

<style>
:root {
  --color-bg: #48495B;
  --color-main: #44786C;
  --color-light-1: #FFFFFD;
  --color-light-2: #D4D4D4;
  --color-green: #A9B66E;
  --color-blue: #86C8EA;
  --color-alert: #D7917F;
  --color-line: #646574;
  --color-bg-text: #6E707F;
}
body {
  background: var(--color-bg);
  user-select: none;
  margin: 0 auto;
  /* position: absolute; */
}
body[data-is_mobile = false] {
  max-width: 375px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--color-light-1);
  text-align: left;
  overflow: hidden;
  height: 100%;
}
</style>
