<template>
  <div class="AdminContiCard" :class="[conti.depart === 'Y'? 'conti-1': 'conti-2']">
    <div>
      <small v-if="conti.depart === 'Y'" class="conti-category conti-category-1">청년부 {{ conti.categoryName }}</small>
      <small v-else class="conti-category conti-category-2">대학부 {{ conti.categoryName }}</small>
    </div>
    <div class="conti-date-wrapper">
      <div class="conti-date">{{ conti.date[0] }}년 {{ conti.date[1] }}월 {{ conti.date[2] }}일</div>
      <div class="conti-button-wrapper">
<!--        <img src="../../assets/pencil_icon.svg" class="button-update icon" @click="updateConti" />-->
        <img src="../../assets/close_icon.svg" class="button-delete icon" @click="deleteConti" />
      </div>
    </div>
  </div>
</template>
<script>
// import { deleteContiAPI } from '../../apis/admin'

export default {
  name: 'AdminContiCard',
  props: ['conti'],
  components: {
  },
  methods: {
    deleteConti() {
      this.$emit('deleteConti')
      // deleteContiAPI(this.conti.contiId)
      //   .then((res) => {
      //   console.log(res)
      // })
      // .catch((err) => console.log(err))
    },
    updateConti() {
      this.$emit('updateConti')
    },
    // toDetail() {
    //   this.$router.push({ path: `/admin/${this.conti.contiId}` })
    // },
  }
}
</script>
<style scoped>
.AdminContiCard {
    width: 100%;
    height: 6rem;
    background: #6E707F;
    border-style: solid;
    border-color: hsl(240, 10%, 35%);
    border-radius: .5rem;
    margin-bottom: 2rem;
    padding: 1rem;

    /*display: flex;*/
    justify-content: space-between;
}
.buttons {
  display: flex;
  align-items: center;
}
.button {
  align-content: center;
  height: 1.5rem;
  width: 1.5rem;
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
  display: flex;
  justify-content: space-between;
}
.conti-date {
    font-size: 1.1rem;
    font-weight: bold;
    margin-bottom: 1rem;
}
.conti-content {
    font-size: .8rem;
    color: var(--color-light2);
}
.icon:last-child {
  margin-left: 0.5rem;
}
</style>
