<template>
  <div class="UserDetail">
    <div class="wrapper">
      <div class="navbar">
        <div class="navbar-title">{{ conti.date[0] }}년 {{ conti.date[1] }}월 {{ conti.date[2] }}일</div>
        <div class="navbar-button" @click="share()"><img class="navbar-button-img" src="../assets/share_button.png" alt="공유하기" /></div>
      </div>
      <div class="content">
        <div class="category">{{ conti.categoryName }}</div>
        <div class="title">{{ conti.songList }}</div>
        <div class="sheet"></div>
      </div>
    </div>
    <BottomBar :songList="this.conti.songList" />
  </div>
</template>
<script>
import { BottomBar } from './atoms'
import { getContiDetailAPI } from '../apis/user'

export default {
  name: 'UserDetail',
  components: {
    BottomBar
  },
  data() {
    return {
      conti: {
        categoryName: '',
        contiId: '',
        date: [],
        depart: '',
        title: '',
        songList: []
      },
      song: {

      }
    }
  },
  created() {
    getContiDetailAPI(this.$route.params.pk)
      .then((res) => {
        this.conti = res.result
        console.log(res.result)
      })
      .catch((err) => console.log(err))
  },
  methods: {
    share() {
      console.log('share-button')
    }
  }
}
</script>
<style scoped>
.wrapper {
  margin-left: 2rem;
  margin-right: 2rem;
}
.navbar {
    width: 100%;
    left: 0px;
    margin: 3rem 0;
}
.navbar-title {

}
.navbar-button {
  cursor: pointer;
}
.navbar-button-img {
  width: 1rem;
}
</style>