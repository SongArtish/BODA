<template>
  <div class = "all">
    <header class = "header">
      <div class="buttond">
        <button @click="goBack" style="float:left; width:10%; border:0; outline:0; background-color:transparent; margin-top:4%; font-weight: bolder;">〈</button>
      </div>
      <div class="hymndate"  :data="article">
<!--        <span class = "date"><b>{{ article.date[0] }}년{{ article.date[1] }}월{{ article.date[2] }}일</b></span>-->
      </div>
      <div class="share">
        <p>공유버튼자리</p>
      </div>
    </header>
    <main class = "main">
      <div class = "title">
        <b>{{ article.title }}</b><br><hr>
      </div>
      <div class="img" style="text-align:center; margin-top: 4%;">
        <img src="https://mblogthumb-phinf.pstatic.net/MjAyMjA1MTZfMjI3/MDAxNjUyNjY1NDUzMTU5.mE3ILhpFNzOTlsIOM3KKVsdQLpIaN3xSso0S7JW5-Nog.xRjtoMGH62ccbApYsNo_vel69vqZMFGfTwu5HX4AlG0g.PNG.ireworld/%EC%A3%BC%EB%8B%98%EB%AC%B4%EC%96%B4%EB%9D%BC%EB%A7%90%ED%95%A0%EA%B9%8C%EC%9A%94(8883-E).png?type=w800" style="width:95%;">
      </div><br>
      <iframe width="350" height="280" src="https://www.youtube.com/embed/H9ZNXLhnI7M?autoplay=1&mute=1" title="[AGAPAO Worship] 주님 무어라 말할까요 (주님 내 주님) / Lord, no words can explain" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </main>
    <footer class = "footer" style="text-align:center;">
      <nav class="nav">
        <a href="#" class="nav__link" style="text-align: center;">
          <span class="nav__text" @click="previousSong">이전곡</span>
        </a>
        <a href="#" class="nav__link" style="text-align: center;">
          <span class="nav__text" @click="previousSong">목록</span>
        </a>
        <a href="#" class="nav__link" style="text-align: center;">
          <span class="nav__text" @click="nextSong">다음곡</span>
        </a>
      </nav>
    </footer>
  </div>
</template>

<script>

export default {
  name: 'detail1',
  data : function() {
    return {
      article: [],
    }
  },
  beforeCreated() {
    this.$axios.get('http://localhost:8080/api/conti/2').then(response => {
      console.log('article', response.data)
      // if(data && article.length > 0){
      //   console.log('article', response.data)
      // }
      this.article = response.data.result
    }).catch(error => {
      console.log(error)
    })
  },
  mounted(){
    //  this.$axios.get('http://localhost:8080/api/conti/2').then(response => {
    //     console.log('article', response.data)
    //     this.article = response.data.result
    //   }).catch(error => {
    //     console.log(error)
    //   })
  },
  methods: {
    goBack(){
      this.$router.go(-1)
    },
    previousSong () {
      this.$router.go(-1)// 이전 페이지로 이동하는 메소드
    },
    nextSong () {
      this.$router.go(-1)
    }
  }
}
</script>
<style scoped>
/*.all{*/
/*  background-color: #50508C	;*/
/*}*/
.date{
  float: left;
  margin-top:3.8%;
  margin-left: 2%;
  font-size: 2vh;
  color: #969696;

}
.title{
  margin-top: 13%;
  font-weight: bolder;
  color: #282828;
  font-size: 3vh;
}
hr{
  width: 90%;
}
.share{
  text-align : right;
  margin-right: 5%;
}
.nav {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 2%;
  box-shadow: 0 0 0px rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
  display: flex;
  overflow-x: auto;
}
.nav__link {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  flex-grow: 1;
  min-width: 50px;
  overflow: hidden;
  white-space: nowrap;
  font-family: sans-serif;
  font-size: 13px;
  color: #444444;
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;
  transition: background-color 0.1s ease-in-out;
}
.nav__link:hover {
  background-color: #eeeeee;
}
div > iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
