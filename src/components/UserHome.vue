<template>
  <div class="UserHome">
    <NavBar :textNavbar='textNavbar' />
    <div class="header">
        <h1 class="header-title">{{ date.year }}년 가을🍂</h1>
        <div class="header-content">여호와를 찬송하라 여호와는 선하시며 그의 이름이 아름다우니 그의 이름을 찬양하라(시편 135:3)</div>
    </div>
    <div class="category">
        <div class="category-title">소속</div>
        <select class="category-dropdown" name="category">
          <option class="category-item" value="0" selected>전체</option>
          <option
            class="category-item"
            v-for="item in category"
            :key="item.categoryId"
            :value="item.categoryId"
          >{{item.categoryName}}</option>
        </select>
    </div>
    <div
      class="conti"
      v-for="conti in contiList"
      :key="conti.contiId"
      @click="toDetail(conti.contiId)"
    >
      <ContiCard :conti="conti" />
    </div>
    <footer class="footer">
        03136 서울특별시 종로구 창경궁로 129-11 <br />
        TEL 02-765-7761~2 | FAX 02-765-7763 <br /><br />
        중앙프로젝트 우리팀이름 뭐라할까
    </footer>
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
      contiList: [],  // sorting한 리스트
      contiListAll: [],
      date: {
        year: null,
        month: null,
      },
      textNavbar: '　　찬양공유',
    }
  },
  created() {
    let today = new Date()
    this.date.year = today.getFullYear();
    // this.date.month = today.getMonth() + 1;
    this.date.month = 9

    getCategoryAPI()
      .then((res) => {
        this.category = res.result
      })
      .catch((err) => console.log(err))

    getContiListAPI(this.date.year, this.date.month)
      .then((res) => {
        // 이거 수정해야 합니다!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        console.log(res.result.contents)
        this.contiList = res.result.contents
        this.contiListAll = res.result.contents
      })
      .catch((err) => console.log(err))
  },
  methods: {
    toDetail(id) {
      this.$router.push({ path: `/conti/${id}` })
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
.footer {
  bottom: 0;
  font-size: .3rem;
  /* position: absolute; */
  margin: 2rem;
}
</style>