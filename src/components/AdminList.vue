<template>
  <div class="AdminList">
    <div v-if="isLoaded" class="wrapper">
      <div class="navbar">
        <div class="navbar-title">찬양공유 관리자시스템</div>
        <div class="navbar-button"><button class="navbar-button-logout" @click="logout"><small>로그아웃</small></button></div>
      </div>
      <div class="category">
          <div class="category-title">소속</div>
          <select class="category-dropdown" name="category" @change="select($event)">
            <option class="category-item" value="0" selected>전체</option>
            <option
              class="category-item"
              v-for="item in category"
              :key="item.categoryId"
              :value="item.categoryId"
            >{{item.categoryName}}</option>
          </select>
      </div>
      <div v-if="contiListCategorized.length > 0" class="content">
        <div
          class="conti"
          v-for="conti in contiListCategorized"
          :key="conti.contiId"
        >
          <AdminContiCard :conti="conti" @deleteConti="deleteConti(conti.contiId)" />
        </div>
      </div>
      <div v-else class="content-none">
        <h3 class="content-none-message">등록된 찬양곡이 없습니다 😢</h3>
      </div>
      <AdminPasswordModal 
        v-if="passwordModal == true"
        :modalTitle="passwordModalTitle"
        :modalSubtext="passwordModalSubtext"
        @modalCloseClick="passwordModal = false"
        @modalButtonClick="deleteConti(this.conti.contiId)"
      />
    <button class="button-add">+</button>
    </div>
  </div>
</template>
<script>
import { AdminContiCard, AdminPasswordModal } from './atoms'
import { getContiListAPI, deleteContiAPI } from '../apis/admin'
import Login from "@/mixins/login";

export default {
  name: 'AdminList',
  components: {
    AdminContiCard,
    AdminPasswordModal
  },
  mixins: [Login],
  data() {
    return {
      category: [
        {
          categoryId: 1,
          categoryName: "대학부"
        },
        {
          categoryId: 2,
          categoryName: "청년부"
        }
      ],
      categoryValue: 0,
      contiList: [],
      date: {
        year: null,
        month: null,
      },
      isLoaded: false,
      passwordModal: false,
      passwordModalTitle:"게시글 삭제",
      passwordModalSubtext:"게시글 비밀번호를 입력해주세요",

    }
  },
  computed: {
    contiListCategorized() {
      if (this.categoryValue == 0) return this.contiList
      else if (this.categoryValue == 1) return this.contiList.filter((item) => item.depart == "U")
      else return this.contiList.filter((item) => item.depart == "Y")
    }
  },
  created() {
    let today = new Date()
    this.date.year = today.getFullYear();
    this.date.month = today.getMonth() + 1;

    getContiListAPI(this.date.year, this.date.month)
      .then((res) => {
        this.contiList = res.result.contents
        this.isLoaded = true
      })
      .catch((err) => console.log(err))
  },
  methods: {
    select(e) {
      this.categoryValue = e.target.value
    },
    async deleteConti(contiId) {
      deleteContiAPI(contiId)
        .then((res) => {
        console.log(res)
      })
      .catch((err) => console.log(err))
    }
  }
}
</script>
<style scoped>
.navbar {
  margin: 3rem 2rem;
}
.navbar-button-logout {
  background: #6E707F;
  border: 0;
  border-radius: .3rem;
  color: white;
}
.category {
  margin: 2rem;
}
.category-title {
  /* color: #D4D4D4; */
  font-size: .5rem;
}
.category-dropdown {
  background: #6E707F;
  border: 1px solid #505062;
  border-radius: .2rem;
  color: var(--color-light-1);
  height: 2rem;
  width: 100%;
}
.category-item {
  color: var(--color-light-1);
  width: 100%;
}
.content-none {
  display: flex;
  margin-left: 2rem;
  margin-right: 2rem;
  min-height: 20vh;
  text-align: center;
}
.content-none-message {
  margin: auto;
}
.button-add {
  background: var(--color-main);
  border: .15rem solid #436172;
  border-radius: 2rem;
  bottom: 1.5rem;
  color: white;
  font-size: 2rem;
  height: 3.5rem;
  position: absolute;
  right: 1.5rem;
  width: 3.5rem;
}
</style>
