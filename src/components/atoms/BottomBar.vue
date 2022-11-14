<template>
  <div class="BottomBar">
    <div v-if="songIndex <= 0" class="item">이전 곡</div>
    <div v-else class="item item-enabled" @click="toPrevious()">이전 곡</div>
    <div class="dropup" >
        <div class="item item-enabled item-bold" @click="toggleList()">찬양 목록</div>
        <div v-if="isOpen" class="dropup-content">
            <div class="dropup-item" v-for="(song, index) in songList" :key="song.songId" @click="selectSong(index)">{{ song.title }}</div>
        </div>
    </div>
    <div v-if="songList && songIndex >= songList.length-1" class="item">다음 곡</div>
    <div v-else class="item item-enabled" @click="toNext()">다음 곡</div>
  </div>
</template>
<script>
export default {
  name: 'BottomBar',
  props: ['songList', 'songIndex'],
  data() {
    return {
      isOpen: false
    }
  },
  methods: {
    closeList:function() {
        this.isOpen = false
    },
    toggleList() {
      this.isOpen = !this.isOpen
    },
    selectSong(songIndex) {
      if (this.songIndex != songIndex) {
        // this.closeList()
        this.$emit('selectSong', songIndex + 1)
        // window.location.reload(true);
      }
      this.isOpen = !this.isOpen;
    },
    toPrevious() {
      this.$emit('selectSong', this.songIndex)
    },
    toNext() {
      this.$emit('selectSong', this.songIndex+2)
    },
  }
}
</script>
<style scoped>
.BottomBar {
    background: #9b9dad;
    opacity: 0.9;
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
    /* position: absolute; */
    position: fixed;
    bottom: 1.5rem;
}
.item {
    flex: 1;
    font-size: .8rem;
    float: left;
    display: block;
    color: #f2f2f2;
    text-align: center;
    margin: 0 auto;
    text-decoration: none;
}
/* .item:hover {
    background-color: #ddd;
    color: black;
} */
.item-enabled {
    cursor: pointer;
}
.item-bold {
    color: white;
    font-weight: bold;
}
.dropup {
  display: inline-block;
}
.dropup-content {
  /* display: none; */
  display: block;
  position: fixed;
  bottom: 4.5rem;
  left: 20%;
  background-color: #f1f1f1;
  width: 60%;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}
.dropup-item {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  cursor: pointer;
  margin: 0 1rem;
  text-align: left;
}
.dropup-item:hover {
    background-color: #ddd
}
</style>