<template>
  <div class="UserContiCard" :class="[conti.depart === 'Y'? 'conti-1': 'conti-2']">
    <small v-if="conti.depart === 'Y'" class="conti-category conti-category-1">청년부 {{ conti.categoryName }}</small>
    <small v-else class="conti-category conti-category-2">대학부 {{ conti.categoryName }}</small>
    <div class="conti-date-wrapper">
      <img src="../../assets/new_icon.svg" class="new-icon" v-if="isNew" />
      <div class="conti-date">{{ conti.date[0] }}년 {{ conti.date[1] }}월 {{ conti.date[2] }}일</div>
    </div>
    <li class="conti-content"
        v-for="(songTitle, index) in conti.songTitleList"
        :key="index"
    >{{ songTitle }}</li>
  </div>
</template>
<script>

export default {
  name: 'UserContiCard',
  props: ['conti'],
  components: {
  },
  computed: {
    isNew () {
      const date = new Date(this.conti.date);
      date.setDate(date.getDate() + 5);
      return new Date() < date;
    }
  },
  created() {
  },
  methods: {
    // buttonClick() {
    //   this.$emit('buttonClick')
    // }
  }
}
</script>
<style scoped>
.UserContiCard {
    width: 100%;
    /*height: 8rem;*/
    background: #6E707F;
    border-style: solid;
    border-color: hsl(240, 10%, 35%);
    border-radius: .5rem;
    margin-bottom: 1rem;
    padding: 1rem;
}
.conti-1 {
    border-left: .7rem solid var(--color-blue);
}
.conti-2 {
    border-left: .7rem solid var(--color-green);
}
.conti-category-1 {
    color: var(--color-blue);
}
.conti-category-2 {
    color: var(--color-green);
}
.conti-date-wrapper {
  margin-bottom: 1rem;
  height: 1.7rem;
}
.new-icon {
  display: inline;
  width: 20px;
  height: 20px;
  margin: 0.2rem;
  vertical-align: middle;
}
.conti-date {
    display: inline;
    font-size: 1.1rem;
    font-weight: bold;
  vertical-align: middle;
}
.conti-content {
    font-size: .8rem;
    color: #D4D4D4;
}
</style>
