<template>
  <div class="ContiCard" :class="[conti.depart === 'Y'? 'conti-1': 'conti-2']">
    <small v-if="conti.depart === 'Y'" class="conti-category conti-category-1">대학부 {{ conti.categoryName }}</small>
    <small v-else class="conti-category conti-category-2">청년부 {{ conti.categoryName }}</small>
    <div class="conti-date">{{ conti.date[0] }}년 {{ conti.date[1] }}월 {{ conti.date[2] }}일</div>
    <li class="conti-content">{{ conti.title }}</li>
  </div>
</template>
<script>
export default {
  name: 'ContiCard',
  props: ['conti'],
  components: {
  },
  methods: {
    // buttonClick() {
    //   this.$emit('buttonClick')
    // }
  }
}
</script>
<style scoped>
.ContiCard {
    width: 100%;
    height: 136px;
    background: #6E707F;
    border-style: solid;
    border-color: hsl(240, 10%, 35%);
    border-radius: .5rem;
    margin-bottom: 2rem;
    padding: 1rem;
}
.conti-1 {
    border-left: .7rem solid #A9B66E;
}
.conti-2 {
    border-left: .7rem solid #86C8EA;
}
.conti-category-1 {
    color: #A9B66E;
}
.conti-category-2 {
    color: #86C8EA;
}
.conti-date {
    font-size: 1.1rem;
    font-weight: bold;
    margin-bottom: 1rem;
}
.conti-content {
    font-size: .8rem;
    color: #D4D4D4;
}
</style>


<!--
<template>
  <div class="UserCardBlock">

    <div class="card_category">
      <span>대학부 주일</span>
    </div>

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
-->