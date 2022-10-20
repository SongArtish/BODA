<template>
  <div class="UserHome">
    <div v-if="isLoaded" class="wrapper">
      <NavBar :textNavbar='textNavbar' />
      <div class="header">
          <h1 class="header-title">{{ date.year }}년 가을🍂</h1>
          <div class="header-content">여호와를 찬송하라 여호와는 선하시며 그의 이름이 아름다우니 그의 이름을 찬양하라(시편 135:3)</div>
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
      <div v-if="contiList.length > 0" class="content">
        <div
          class="conti"
          v-for="conti in contiListCategorized"
          :key="conti.contiId"
          @click="toDetail(conti.contiId)"
        >
          <ContiCard :conti="conti" />
        </div>
      </div>
      <div v-else class="content-none">
        <h3 class="content-none-message">등록된 찬양곡이 없습니다 😢</h3>
      </div>
      <footer class="footer">
          03136 서울특별시 종로구 창경궁로 129-11 <br />
          TEL 02-765-7761~2 | FAX 02-765-7763 <br /><br />
          중앙프로젝트 우리팀이름 뭐라할까
      </footer>
    </div>
  </div>
</template>
<script>
import { ContiCard, NavBar } from './atoms'
import { getCategoryAPI, getContiListAPI } from '../apis/user'

export default {
  name: 'UserHome',
  components: {
    ContiCard,
    NavBar
  },
  data() {
    return {
      category: [],
      categoryValue: 0,
      contiList: [],
      date: {
        year: null,
        month: null,
      },
      isLoaded: false,
      textNavbar: '　　찬양공유',
    }
  },
  computed: {
    contiListCategorized() {
      if (this.categoryValue == 0) return this.contiList
      else if (this.categoryValue == 1) return this.contiList.filter((item) => item.categoryName == "주일")
      else return this.contiList.filter((item) => item.categoryName == "행사")
    }
  },
  created() {
    let today = new Date()
    this.date.year = today.getFullYear();
    // 여기 수정해야 합니다!!!!
    // this.date.month = today.getMonth() + 1;
    this.date.month = 9

    getCategoryAPI()
      .then((res) => {
        console.log(res)
        this.category = res.result
      })
      .catch((err) => console.log(err))

    getContiListAPI(this.date.year, this.date.month)
      .then((res) => {
        console.log(res)
        this.contiList = res.result.contents
        this.isLoaded = true
      })
      .catch((err) => console.log(err))
  },
  methods: {
    toDetail(id) {
      this.$router.push({ path: `/conti/${id}` })
    },
    select(e) {
      this.categoryValue = e.target.value
    }
  }
}
</script>
<style scoped>
.header {
  margin-left: 2rem;
  margin-right: 2rem;
}
.header-title {
  font-weight: bold;
}
.header-content {
  color: #D4D4D4;
  font-size: .5rem;
}
.category {
  margin: 2rem;
}
.category-title {
  color: #D4D4D4;
  font-size: .5rem;
}
.category-dropdown {
  background: #6E707F;
  border: 1px solid #505062;
  border-radius: .2rem;
  color: #D4D4D4;
  height: 2rem;
  width: 100%;
}
.category-item {
  color: #D4D4D4;
  width: 100%;
}
.conti {
  cursor: pointer;
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
.footer {
  bottom: 0;
  font-size: .3rem;
  /* position: absolute; */
  margin: 2rem;
}
</style>