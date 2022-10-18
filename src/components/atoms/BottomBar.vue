<template>
  <div class="BottomBar">
    <div class="item" @click="toPrevious()">이전 곡</div>
    <!-- <div class="item item-bold" @click="openModal()">찬양 목록</div> -->
    <div class="dropup" @click="openList()">
        <div class="item item-bold">찬양 목록</div>
        <div class="dropup-content">
            <a href="#">Link 1</a>
            <a href="#">Link 2</a>
            <a href="#">Link 3</a>
        </div>
    </div>
    <div class="item" @click="toNext()">다음 곡</div>

  </div>
</template>
<script>
export default {
  name: 'BottomBar',
  props: ['songList'],
  components: {
  },
  methods: {
    openList() {
        let list = document.querySelector(".dropup-content")
        list.style.display = "block"
    },
    closeList() {
        let list = document.querySelector(".dropup-content")
        list.style.display = "none"
    },
    toPrevious() {
        console.log('hello')
    },
    toNext() {
        console.log('hello')
    }
    // buttonClick() {
    //   this.$emit('buttonClick')
    // }
  }
}
</script>
<style scoped>
.BottomBar {
    background: #9b9dad;
    opacity: 0.8;
    border-radius: 1.2rem;
    width: 80%;

    text-align: center;
    overflow: hidden;
    display: flex;
    /* flex-direction: row; */
    /* justify-content: center; */
    align-items: center;
    padding: 8px 25px;
    gap: 28px;
    margin: 0 auto;

    left: 10%;
    position: absolute;
    bottom: 1.5rem;

    user-select: none;
}
.item {
    flex: 1;
    font-size: .8rem;
    float: left;
    display: block;
    color: #f2f2f2;
    text-align: center;
    margin: 0 auto;
    /* padding: 14px 16px; */
    text-decoration: none;
    cursor: pointer;
}
/* .item:hover {
    background-color: #ddd;
    color: black;
} */
.item-bold {
    color: white;
    font-weight: bold;
}
.dropup {
  display: inline-block;
}
.dropup-content {
  display: none;
  position: fixed;
  bottom: 4.5rem;
  left: 20%;
  background-color: #f1f1f1;
  width: 60%;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.dropup-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}
.dropup-content a:hover {
    background-color: #ddd
}
</style>