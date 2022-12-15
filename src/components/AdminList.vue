<template>
  <div class="AdminList">
    <div v-if="isLoaded" class="wrapper">
      <NavBar @logout="logout"/>
      <div class="header">
        <h1 class="header-title">
          <div class="semiannual-dropdown-wrapper">
            <select class="semiannual-dropdown" @change="selectSemiannual" :value="semiannual">
              <option
                  class="semiannual-dropdown-option"
                  v-for="item in GET_MONTH_FILTER_LIST"
                  :key="item.id"
                  :value="item.id"
              >{{ `${item.year} ${semiannualList[item.semiannual].name}` }}
              </option>
            </select>
            <span class="semiannual-select-icon"><img src="../assets/vector.svg"/></span>
          </div>
        </h1>
        <div class="header-content">여호와를 찬송하라 여호와는 선하시며 그의 이름이 아름다우니 <br> 그의 이름을 찬양하라(시편 135:3)</div>
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
          >{{ item.categoryName }}
          </option>
        </select>
      </div>
      <div v-if="contiListCategorized.length > 0" class="content">
        <div
          class="conti"
          v-for="conti in contiListCategorized"
          :key="conti.contiId"
        >
          <AdminContiCard :conti="conti" @deleteConti="openDeletePasswordModal(conti.contiId)" @updateConti="openUpdatePasswordModal(conti.contiId)"/>
        </div>
      </div>
      <div v-else class="content-none">
        <div class="content-none-message1">콘티가 없습니다. <br>다른 시기를 선택해 주세요.
          <div class="content-none-message2"><br>주의 인자가 생명보다 나으므로 내 입술이 주를 찬양할 것이라<br>(시편 63:3)</div>
        </div>
      </div>

      <footer class="footer">
        03136 서울특별시 종로구 창경궁로 129-11 <br/>
        TEL 02-765-7761~2 | FAX 02-765-7763 <br/><br/>
        <div class="team">
          서울중앙교회 청대학부 찬양목록
          <span class="team-tooltip">
              Credits<br/>
              구평모 국채림 김아진 김재훈 박다은<br/>
              오건영 윤이영 이송영 이예영 이주아
            </span>
        </div>
      </footer>
      <!--수정-->
      <AdminPasswordModal
          v-if="updatePasswordModal == true"
          :password="password"
          :modalTitle="updateModalTitle"
          :modalSubtext="modalSubtext"
          @modalCloseClick="updatePasswordModal = false"
          @modalButtonClick="updateConti"
      />
      <!-- 삭제 -->
      <AdminPasswordModal
          v-if="deletePasswordModal == true"
          :password="password"
          :modalTitle="deleteModalTitle"
          :modalSubtext="modalSubtext"
          @modalCloseClick="deletePasswordModal = false"
          @modalButtonClick="deleteConti"
      />
      <img src="@/assets/plus_circle.svg" class="button-add" @click="toAddPage"/>
    </div>
  </div>
</template>
<script>
import {AdminContiCard, AdminPasswordModal} from './atoms'
import {contiPasswordAPI, deleteContiAPI, getContiListByHalfYearAPI} from '../apis/admin'
import Login from "@/mixins/login";
import {mapActions, mapGetters, mapMutations} from 'vuex';
import NavBar from "@/components/atoms/NavBar";

export default {
  name: 'AdminList',
  components: {
    NavBar,
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
      semiannualList: [
        {
          id: 0,
          name: '상반기',
          months: [1, 2, 3, 4, 5, 6]
        },
        {
          id: 1,
          name: '하반기',
          months: [7, 8, 9, 10, 11, 12]
        }
      ],
      semiannual: 0,
      contiList: [],
      contiIndex: "",
      isLoaded: false,
      deletePasswordModal: false,
      updatePasswordModal: false,
      password: "",
      passwordCheck: false,
      deleteModalTitle: "게시글 삭제",
      modalSubtext: "게시글 비밀번호를 입력해주세요",
      updateModalTitle: "게시글 수정",
    }
  },
  computed: {
    ...mapGetters({
      GET_ADMIN_FILTER: 'GET_ADMIN_FILTER',
      GET_MONTH_FILTER_LIST: 'GET_MONTH_FILTER_LIST'
    }),
    contiListCategorized() {
      if (this.categoryValue == 0) return this.contiList
      else if (this.categoryValue == 1) return this.contiList.filter((item) => item.depart == "U")
      else return this.contiList.filter((item) => item.depart == "Y")
    }
  },
  watch: {
    categoryValue(val) {
      this.SET_ADMIN_FILTER_CATEGORY(val);
    },
    semiannual(val) {
      this.SET_ADMIN_FILTER_MONTH_FILTER(val);
    }
  },
  created() {
    this.init();
    this.getContiList();
  },
  methods: {
    ...mapMutations({
      SET_ADMIN_FILTER_CATEGORY: 'SET_ADMIN_FILTER_CATEGORY',
      SET_ADMIN_FILTER_MONTH_FILTER: 'SET_ADMIN_FILTER_MONTH_FILTER'
    }),
    ...mapActions({
      INIT_MONTH_FILTER: 'INIT_MONTH_FILTER'
    }),
    init() {
      this.INIT_MONTH_FILTER();
      this.semiannual = this.GET_ADMIN_FILTER.monthFilter;
      this.categoryValue = this.GET_ADMIN_FILTER.category;
    },
    selectCategory(e) {
      this.categoryValue = e.target.value
    },
    selectSemiannual(e) {
      this.semiannual = e.target.value;
      this.getContiList();
    },
    getContiList() {
      // getContiListAPI(this.date.year, this.date.month)
      getContiListByHalfYearAPI(this.GET_MONTH_FILTER_LIST[this.semiannual].year, this.GET_MONTH_FILTER_LIST[this.semiannual].semiannual)
          .then((res) => {
            this.contiList = res.result.contents
            this.isLoaded = true
          })
          .catch((err) => console.log(err))
    },
    openDeletePasswordModal(contiId) {
      this.contiIndex = contiId
      this.deletePasswordModal = true;
    },
    openUpdatePasswordModal(contiId) {
      this.contiIndex = contiId
      this.updatePasswordModal = true;
    },
    toAddPage() {
      this.$router.push({path: "/admin/add"})
    },
    async contiPasswordCheck(password) {
      // console.log("2");
      return await contiPasswordAPI(this.contiIndex, password)
          .then((res) => {
            console.log(res.result.result)
            if (res.result.result == true) {
              console.log("비밀번호 확인")
              return true;
            } else {
              // console.log("비밀번호 틀림")
              alert("비밀번호가 틀렸습니다.")
              return false;
            }
          })
          .catch((err) => console.log(err))
    },
    async deleteConti(password) {
      this.contiPasswordCheck(password)
          .then(bool => {
            if (bool == true) {
              deleteContiAPI(this.contiIndex)
                  .then((res) => {
                    console.log(res)
                    this.deletePasswordModal = false;
                    this.$router.go();
                  })
                  .catch((err) => console.log(err))
            } else {
              this.deletePasswordModal = false;
            }
          })

    },
    async updateConti(password) {
      const id = this.contiIndex
      this.contiPasswordCheck(password)
          .then(bool => {
            if (bool == true) {
              this.$router.push({path: `/admin/add/${id}`})
            } else {
              this.updatePasswordModal = false;
            }
          });
    }
  }
}
</script>
<style scoped>
.header {
  margin-left: 25px;
  margin-right: 25px;
}

.header-title {
  font-weight: bold;
}

.header-content {
  /* color: #D4D4D4; */
  font-size: 11px;
}

select::-ms-expand {
  display: none;
}

.semiannual-dropdown-wrapper {
  position: relative;
  display: inline-block;
  width: 200px;
}

.semiannual-dropdown {
  background: inherit;
  width: inherit;
  height: inherit;
  color: var(--color-light-1);
  font-weight: bold;
  font-size: 30px;
  -o-appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: transparent;
  border: 0 none;
  outline: 0 none;
  padding: 0 0;
  position: relative;
  z-index: 3;
}

.semiannual-dropdown-option {
  background: #6E707F;
}

/* https://wazacs.tistory.com/34 */
.semiannual-select-icon {
  position: absolute;
  top: 0;
  right: 0px;
  z-index: 1;
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.semiannual-dropdown-wrapper .semiannual-select-icon img {
  width: 50%;
  transition: .3s;
}

.semiannual-dropdown-wrapper:focus + .semiannual-select-icon img {
  transform: rotate(180deg);
}

.category {
  margin: 70px 25px 50px 25px;
}

.category-title {
  /* color: #D4D4D4; */
  font-size: 14px;
}

.category-dropdown {
  background: #6E707F;
  border: 1px solid #505062;
  border-radius: 7px;
  color: var(--color-light-1);
  height: 50px;
  padding-left: 10px;
  padding-right: 10px;
  width: 100%;
}

.category-item {
  color: var(--color-light-1);
  width: 100%;
  font-size: 16px;
}

.content-none {
  display: flex;
  text-align: center;
}

.content-none-message1 {
  font-size: 13px;
  margin: auto;
  color: #D4D4D4;
  padding-top: 30px;
}

.content-none-message2 {
  font-size: 11px;
  margin: auto;
  color: #ACACAE;
  padding-bottom: 30px;
}

.button-add {
  bottom: 32pt;
  right: 32pt;
  position: fixed;
}

.footer {
  bottom: 0;
  font-size: 11px;
  /* position: absolute; */
  margin: 68px 25px 40px 25px;
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
