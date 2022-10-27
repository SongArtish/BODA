<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
:root {
  --color-bg: #48495B;
  --color-main: #44786C;
  --color-light-1: #FFFFFD;
  --color-light-2: #D4D4D4;
  --color-green: #A9B66E;
  --color-blue: #86C8EA;
}
body {
  background: var(--color-bg);
  user-select: none;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--color-light-1);
  text-align: left;
  overflow: hidden;
}
</style>