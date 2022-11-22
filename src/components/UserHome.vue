<template>
  <div class="UserHome">
    <div v-if="isLoaded" class="wrapper">
      <NavBar :textNavbar='textNavbar' />
      <div class="header">
          <h1 class="header-title">
            <div class="semiannual-dropdown-wrapper">
              <select class="semiannual-dropdown" @change="selectSemiannual" :value="semiannual">
              <!-- @focus="focusSemiannualSelect" -->
                <option
                class="semiannual-dropdown-option"
                v-for="item in monthFilterList"
                :key="item.id"
                :value="item.id"
                >{{`${item.year} ${semiannualList[item.semiannual].name}`}}</option>
              </select>
<!--              <img class="semiannual-selectCategory-icon" src="../assets/chevron_down_icon.svg"/>-->
            </div>
          </h1>
          <div class="header-content">여호와를 찬송하라 여호와는 선하시며 그의 이름이 아름다우니 그의 이름을 찬양하라(시편 135:3)</div>
      </div>
      <div class="category">
          <div class="category-title">소속</div>
          <select class="category-dropdown" name="category" @change="selectCategory($event)" :value="categoryValue">
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
          <div class="team">
            중앙프로젝트
            <span class="team-tooltip">
              Credits<br/>
              구평모 국채림 김아진 김재훈 박다은<br/>
              오건영 윤이영 이송영 이예영 이주아
            </span>
          </div>
      </footer>
    </div>
  </div>
</template>
<script>
import {NavBar, UserContiCard} from './atoms'
import {getContiListByHalfYearAPI} from '../apis/user'
import {mapGetters, mapMutations} from 'vuex';

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
        semiannual: null
      },
      isLoaded: false,
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
      monthFilterList: [],
      textNavbar: '찬양공유',
    }
  },
  computed: {
    ...mapGetters({
      GET_USER_FILTER: 'GET_USER_FILTER'
    }),
    contiListCategorized() {
      if (this.categoryValue == 0) return this.contiList
      else if (this.categoryValue == 1) return this.contiList.filter((item) => item.depart == "U")
      else return this.contiList.filter((item) => item.depart == "Y")
    }
  },
  watch: {
    categoryValue(val) {
      this.SET_USER_FILTER_CATEGORY(val);
    },
    semiannual(val) {
      this.SET_USER_FILTER_MONTH_FILTER(val);
    }
  },
  created() {
    this.init();
    this.getContiList();
  },
  methods: {
    ...mapMutations({
      SET_USER_FILTER_CATEGORY: 'SET_USER_FILTER_CATEGORY',
      SET_USER_FILTER_MONTH_FILTER: 'SET_USER_FILTER_MONTH_FILTER'
    }),
    init() {
      let today = new Date()
      this.date.year = today.getFullYear();
      this.date.month = today.getMonth() + 1;

      this.date.semiannual = this.semiannualList.find(semi => {return semi.months.includes(this.date.month)});
      let year = 2020;
      let id = 0;
      this.monthFilterList.push({year, semiannual: 1, id});id++;
      year++;
      for (; year <= this.date.year; year++) {
        if (year < this.date.year) {
          this.monthFilterList.push({year, semiannual: 0, id}); id++;
          this.monthFilterList.push({year, semiannual: 1, id});id++;
        } else {
          if (this.date.semiannual === 0) {
            this.monthFilterList.push({year, semiannual: 0, id});id++;
          } else {
            this.monthFilterList.push({year, semiannual: 0, id}); id++;
            this.monthFilterList.push({year, semiannual: 1, id});id++;
          }
        }
      }
      this.semiannual = this.GET_USER_FILTER.monthFilter ? this.GET_USER_FILTER.monthFilter : id - 1;
      this.categoryValue = this.GET_USER_FILTER.category;
    },
    toDetail(id) {
      this.$router.push({ path: `/conti/${id}` })
    },
    selectCategory(e) {
      this.categoryValue = e.target.value;
    },
    selectSemiannual(e) {
      this.semiannual = e.target.value;
      this.getContiList();
    },
    getContiList() {
      // getContiListAPI(this.date.year, this.date.month)
      getContiListByHalfYearAPI(this.monthFilterList[this.semiannual].year, this.monthFilterList[this.semiannual].semiannual)
          .then((res) => {
            this.contiList = res.result.contents
            this.isLoaded = true
          })
          .catch((err) => console.log(err))
    },
    // focusSemiannualSelect (e) {
    //   console.log('e', e);
    // }
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
  font-size: .8rem;
}

select::-ms-expand {
  display: none;
}
.semiannual-dropdown-wrapper {
  position: relative;
  /* width: 90px; */
  /* height: inherit; */
  display: inline-block;
}
.semiannual-dropdown {
  background: inherit;
  /* width: inherit; */
  /* height: inherit; */
  border: 0;
  color: var(--color-light-1);
  font-weight: bold;
  font-size: 100%;
  -o-appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: url('../assets/vector.svg') no-repeat 100% 50%;
  background-size: 20px;
}
.semiannual-dropdown-option {
  background: #6E707F;
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
  font-size: 1rem;
  margin-left: .4rem;
}
.category-dropdown {
  background: #6E707F;
  border: 1px solid #505062;
  border-radius: 7px;
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
  font-size: .8rem;
  /* position: absolute; */
  margin: 2rem;
}
.team {
  cursor: initial;
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black;
}
.team .team-tooltip {
  visibility: hidden;
  width: 15rem;
  background-color: #555;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;

  /* Position the tooltip text */
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -60px;

  /* Fade in tooltip */
  opacity: 0;
  transition: opacity 0.3s;
}
.team .team-tooltip::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}
.team:hover .team-tooltip {
  visibility: visible;
  opacity: 1;
}
</style>
