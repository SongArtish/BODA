<template>
  <div class="UserDetail">
    <div v-if="isLoaded" class="wrapper" @mouseup="closeList()">
      <div class="navbar">
        <div class="navbar-home" @click="toHome()">〈</div>
        <div class="navbar-title">{{ conti.date[0] }}년 {{ conti.date[1] }}월 {{ conti.date[2] }}일</div>
        <div class="navbar-button" @click="share()"><img class="navbar-button-img" src="../assets/share_button.png" alt="공유하기" /></div>
      </div>
      <div class="content">
        <small v-if="conti.depart == 'Y'" class="category-1">청년부 {{ conti.categoryName }}</small>
        <small v-else class="category-2">대학부 {{ conti.categoryName }}</small>

        <div class="title">{{ conti.songList[songIndex].songOrder }}. {{ conti.songList[songIndex].title }}</div>
        <div class="sheet">
          <img class="sheet-image" v-for="sheet in conti.songList[songIndex].sheetList" :key="sheet.sheetId" :src="sheet.downloadUrl"  />
        </div>
        <div v-if="getVideoLink !== null" class="video">
          <iframe class="video-content" :src="getVideoLink" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <div v-if="getNothing == null"> </div>
        <div v-if="getVideoLink == null" class="nullVideo"></div>
      </div>
    </div>
    <BottomBar :songList="conti.songList" :songIndex="songIndex" @selectSong="selectSong" ref="bottombar" />
  </div>
</template>
<script src="https://t1.kakaocdn.net/kakao_js_sdk/2.0.0/kakao.min.js" integrity="sha384-PFHeU/4gvSH8kpvhrigAPfZGBDPs372JceJq3jAXce11bVA6rMvGWzvP4fMQuBGL" crossorigin="anonymous" />
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
      conti: {},
      contiId: this.$route.params.id,
      songOrder: 0,
      songIndex: 0,
      videoLink: '',
      isLoaded: false,
    }
  },
  computed: {
    getVideoLink() {
      if (this.isLoaded) {
        let url = this.conti.songList[this.songOrder].link
        if (url.includes("/embed/"))
          return url
        else
          return "https://www.youtube.com/embed/" + url.slice(-11)
      }
      else return null
    }
  },

  created() {
    getContiDetailAPI(this.$route.params.id)
        .then((res) => {
          this.conti = res.result
          const zero = this.conti.songList.find(song => {
            song.songOrder == 0
          });
          if (!zero) {
            this.songOrder = 1
          }
          this.isLoaded = true
        })
        .catch((err) => console.log(err))
  },
  methods: {
    toHome() {
      this.$router.push('/')
    },
    closeList() {
      this.$refs.bottombar.closeList()
    },
    share() {
      if (!Kakao.isInitialized()) {
        window.Kakao.init(process.env.VUE_APP_KAKAO_API_KEY)
      }
      Kakao.Share.sendDefault({
        objectType: 'text',
        text:
            `${this.conti.songList[this.songIndex].title}를 공유하셨습니다.`,
        link: {
          mobileWebUrl: process.env.VUE_APP_SERVER_URL+ this.$route.path,
          webUrl: process.env.VUE_APP_SERVER_URL+ this.$route.path
        },
      });
    },
    selectSong(songIndex) {
      this.songIndex = songIndex-1
    },
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
.navbar-button {
  cursor: pointer;
}
.navbar-button-img {
  width: 1rem;
}
.category-1 {
  color: var(--color-blue);
}
.category-2 {
  color: var(--color-green);
}
.title {
  font-weight: bold;
  margin: .5rem 0;
}
.sheet-image {
  margin: 1rem 0;
  object-fit: contain;
  width: 100%;
}
.video {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 비율 */
  margin-top: 1rem;
  margin-bottom: 5rem;
}
.video-content {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>