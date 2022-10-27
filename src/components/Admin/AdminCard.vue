<template>
  <div class="ContiCard" :class="[conti.depart === 'Y'? 'conti-1': 'conti-2']">
    <small v-if="conti.depart === 'Y'" class="conti-category conti-category-1">대학부 {{ conti.categoryName }}</small>
    <small v-else class="conti-category conti-category-2">청년부 {{ conti.categoryName }}</small>
    <div class="conti-date">{{ conti.date[0] }}년 {{ conti.date[1] }}월 {{ conti.date[2] }}일</div>
    
    <font-awesome-icon @click="isEditModalViewed = true" icon="fa-solid fa-pen" />
    <font-awesome-icon @click="isDeleteModalViewed = true" icon="fa-solid fa-xmark" />
    
    <DeleteModal
      v-if="isDeleteModalViewed"
      @close-modal="isDeleteModalViewed = false"
    />

    <EditModal
      v-if="isEditModalViewed"
      @close-modal="isEditModalViewed = false"
    />

  </div>

  
  
</template>
<script>
import DeleteModal from '@/components/Admin/DeleteModal.vue'
import EditModal from '@/components/Admin/EditModal.vue'

export default {
  name: 'ContiCard',
  props: ['conti'],
  components: {
    DeleteModal
    ,EditModal
  },
  data() {
    return {
      isDeleteModalViewed: false,
      isEditModalViewed: false
    }
  },
  methods:{
		pageAdminEdit() {
			this.$router.push({ path: "/admin/edit" });
			}
  }
}
</script>

<style scoped>
.ContiCard {
    width: 100%;
    height: 120px;
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
  <div class="AdminCardBlock" >
    <div class="AdminCard" >

    <div class="card_category">
      {{ cardname }}
    </div>

    <div class="card_data">
      <span>{{ cardyear }}년 {{ cardmonth }}월
        <font-awesome-icon @click="isEditModalViewed = true" icon="fa-solid fa-pen" />
        <font-awesome-icon @click="isDeleteModalViewed = true" icon="fa-solid fa-xmark" />
      </span>
    </div>

    <DeleteModal
      v-if="isDeleteModalViewed"
      @close-modal="isDeleteModalViewed = false"
    />

    <EditModal
      v-if="isEditModalViewed"
      @close-modal="isEditModalViewed = false"
    />
    </div>
  </div>

</template>

<script>
import DeleteModal from '@/components/Admin/DeleteModal.vue'
import EditModal from '@/components/Admin/EditModal.vue'

export default {
  components: {
		DeleteModal
    ,EditModal
		},
  props: ['cardname', 'cardyear', 'cardmonth']
  ,data() {
    return {
      alert_save: false,
      isDeleteModalViewed: false,
      isEditModalViewed: false,

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

.AdminCardBlock {
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

.card_data {
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
