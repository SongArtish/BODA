<template>
  <div class="UserHome">
    <div v-if="isLoaded" class="wrapper">
      <NavBar :textNavbar='textNavbar' />
      <div class="header">
          <h1 class="header-title">{{ date.year }}년
            <div class="semiannual-dropdown-wrapper">
              <select class="semiannual-dropdown" @change="selectSemiannual" :value="semiannual.id" @focus="focusSemiannualSelect">
                <option
                v-for="item in semiannualList"
                :key="item.id"
                :value="item.id"
                >{{item.name}}</option>
              </select>
<!--              <img class="semiannual-select-icon" src="../assets/chevron_down_icon.svg"/>-->
            </div>
          </h1>
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
      <div v-if="contiListCategorized.length > 0" class="content">
        <div
          class="conti"
          v-for="conti in contiListCategorized"
          :key="conti.contiId"
          @click="toDetail(conti.contiId)"
        >
          <UserContiCard :conti="conti" />
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
import { UserContiCard, NavBar } from './atoms'
import {getContiListByHalfYearAPI} from '../apis/user'

export default {
  name: 'UserHome',
  components: {
    UserContiCard,
    NavBar
  },
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
      season: "",
      seasonList: {
        "spring": {
          "seasonName": "봄",
          "seasonNumList": [3, 4, 5]
        },
        "summer": {
          "seasonName": "여름",
          "seasonNumList": [6, 7, 8]
        },
        "fall": {
          "seasonName": "가을",
          "seasonNumList": [9, 10, 11]
        },
        "winter": {
          "seasonName": "겨울",
          "seasonNumList": [12, 1, 2]
        }
      },
      semiannual: 0,
      semiannualList: [
        {
          id: 0,
          name: '상반기',
          months: [1,2,3,4,5,6]
        },
        {
          id: 1,
          name: '하반기',
          months: [7,8,9,10,11,12]
        }
      ],
      textNavbar: '찬양공유',
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

    // 계절 구하기
    // if (3 <= this.date.month && this.date.month <= 5) this.season = this.seasonList.spring.seasonName
    // else if (6 <= this.date.month && this.date.month <= 8) this.season = this.seasonList.summer.seasonName
    // else if (9 <= this.date.month && this.date.month <= 11) this.season = this.seasonList.fall.seasonName
    // else this.season = this.seasonList.winter.seasonName
    this.semiannual = this.semiannualList.find(semi => {return semi.months.includes(this.date.month)});
    this.getContiList(this.semiannual.id);
  },
  methods: {
    toDetail(id) {
      this.$router.push({ path: `/conti/${id}` })
    },
    select(e) {
      this.categoryValue = e.target.value
    },
    selectSemiannual(e) {
      this.semiannual = this.semiannualList[e.target.value];
      this.getContiList(e.target.value);
    },
    getContiList(semiannual) {
      // getContiListAPI(this.date.year, this.date.month)
      getContiListByHalfYearAPI(this.date.year, semiannual)
          .then((res) => {
            this.contiList = res.result.contents
            this.isLoaded = true
          })
          .catch((err) => console.log(err))
    },
    focusSemiannualSelect (e) {
      console.log('e', e);
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
  /* color: #D4D4D4; */
  font-size: .5rem;
}
.semiannual-dropdown-wrapper {
  position: relative;
  width: 90px;
  height: inherit;
  display: inline-block;
}
.semiannual-dropdown {
  background: inherit;
  width: inherit;
  height: inherit;
  border: 0;
  color: var(--color-light-1);
  font-weight: bold;
  font-size: 1.5rem;
  /*-o-appearance: none;*/
  /*-webkit-appearance: none;*/
  /*-moz-appearance: none;*/
  /*appearance: none;*/
}
/* https://wazacs.tistory.com/34 */
.semiannual-select-icon {
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  height: inherit;
  justify-content: center;
  align-items: center;
}
.semiannual-dropdown-wrapper:focus + .semiannual-select-icon img {
   transform: rotate(180deg);
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
  border-radius: .5rem;
  color: var(--color-light-1);
  height: 3rem;
  padding-left: 10px;
  padding-right: 10px;
  width: 100%;
  /*-o-appearance: none;*/
  /*-webkit-appearance: none;*/
  /*-moz-appearance: none;*/
  /*appearance: none;*/
}
.category-item {
  color: var(--color-light-1);
  width: 100%;
}
.conti {
  cursor: pointer;
}
.content-none {
  display: flex;
  margin: 5rem 2rem;
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
