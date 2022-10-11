<template>
  <div class="UserCardBlock">

    <div class="card_category">
      <span>대학부 주일</span>
    </div>

    <!--곡 제목-->
    <div class="card_date">
      <span>2022년 09월 29일</span>
    </div>

    <div class="card_song_title">
      <ul>
        <li v-for="song_title in song_titles" :key="song_title">{{ song_title }}</li>
      </ul>
    </div>

  </div>
</template>

<script>
export default {
  components: {
		
		}
  ,data() {
    return {
      song_titles: ['밤이나 낮이나','주 은혜임을', '내 마음 속 전부를']
    };
  },
  methods:{
		pageAdminEdit() {
			this.$router.push({ path: "/admin/edit" });
			}
  }
}
</script>

<style scoped>
html,
body {
  margin: 0;
  padding: 0;
}

.UserCardBlock {
  text-align: center;
  color: #2c3e50;

  padding: 10px;
  background: #d9d9d9;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  margin: 0 10px 20px 10px
}

.card_category {
  display: flex;
  flex-direction: column;
  text-align: left;
  margin: 5px 20px;
}

.card_date {
  display: flex;
  flex-direction: column;
  text-align: left;
  margin: 5px 20px;
}

.card_song_title {
  display: flex;
  flex-direction: column;
  text-align: left;
  margin: 5px 10px;
}

.black-bg {
  background: rgba(0, 0, 0, 0.5);
  position: static;
  padding: 20px;
  display: flex;
  margin: 20px;
}
.white-bg {
  width: 100%;
  background: white;
  margin: 20px;
  border-radius: 8px;
  border: 2px solid #aaaaaa;
  font-weight: 400;
  font-size: 15px;
}
</style>
