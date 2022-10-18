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