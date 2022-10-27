<template>
  <div class="UserHome">
    <div v-if="isLoaded" class="wrapper">
    
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
          <UserCard :conti="conti" />
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
import UserCard from '@/components/User/UserCard.vue'
import { getCategoryAPI, getContiListAPI } from '@/api/user'

export default {
  name: 'UserHome',
  components: {
    UserCard
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
        console.log(res.result)
        this.category = res.result
      })
      .catch((err) => console.log(err))

    getContiListAPI(this.date.year, this.date.month)
      .then((res) => {
        console.log(res.result)
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


<!--
<template>
  <div>
    <MyHeader></MyHeader>
    <div class="cate">
      <label>카테고리:</label>
      <select v-model="selectedCate">
        <option v-for="(category, index) in categories" :key="index">{{category}}</option>
      </select>
    </div>

    <div>
      <UserCard></UserCard>
    
      <UserCard></UserCard>
    </div>
-->

    <!--
        <div class="listWrap">
          <table class="tbList">
            <colgroup>
              <col width="6%" />
              <col width="*" />
              <col width="10%" />
              <col width="15%" />
            </colgroup>
            <tr>
              <th>no</th>
              <th>제목</th>
              <th>카테고리</th>
              <th>날짜</th>
            </tr>
            <tr v-for="(row, idx) in list" :key="idx">
              <td>{{no-idx}}</td>
              <td class="txt_left"><a href="javascript:;">{{row.subject}}</a></td>
              <td>{{row.id}}</td>
              <td>{{row.regdate.substring(0,10)}}</td>
            </tr>
            <tr v-if="list.length == 0">
              <td colspan="4">데이터가 없습니다.</td>
            </tr>
          </table>
        </div>
    -->

    <!--
        <div class="pagination" v-if="paging.totalCount > 0">
          <a href="javascript:;" @click="fnPage(1)" class="first">&lt;&lt;</a>
          <a href="javascript:;" v-if="paging.start_page > 10" @click="fnPage(`${paging.start_page-1}`)"  class="prev">&lt;</a>
          <template v-for=" (n,index) in paginavigation()">
            <template v-if="paging.page==n">
              <strong :key="index">{{n}}</strong>
            </template>
            <template v-else>
              <a href="javascript:;" @click="fnPage(`${n}`)" :key="index">{{n}}</a>
            </template>
          </template>
          <a href="javascript:;" v-if="paging.total_page > paging.end_page" @click="fnPage(`${paging.end_page+1}`)"  class="next">&gt;</a>
          <a href="javascript:;" @click="fnPage(`${paging.total_page}`)" class="last">&gt;&gt;</a>
        </div>

        <div class="btnRightWrap">
          <a @click="fnAdd" class="btn">+</a>
        </div>
    -->

<!--
    <MyFooter></MyFooter>
  </div>
</template>

<script>
import UserCard from '@/components/User/UserCard.vue'
import MyHeader from '@/components/UserHeader.vue'
import MyFooter from '@/components/UserFooter.vue'
export default {
  components: {
    'UserCard': UserCard
    ,MyHeader
    ,MyFooter
  }
  ,data() { //변수생성
    return{
      body:'' //리스트 페이지 데이터전송
      ,board_code:'news' //게시판코드
      ,list:[
        {
          subject: "제목", id: 1, regdate: "20220101"
        }
      ] //리스트 데이터
      ,category:''
      ,no:'' //게시판 숫자처리
      ,paging:'' //페이징 데이터
      ,start_page:'' //시작페이지
      ,page:this.$route.query.page ? this.$route.query.page:1
      ,keyword:this.$route.query.keyword
      ,paginavigation:function() { //페이징 처리 for문 커스텀
        var pageNumber = [];
        var start_page = this.paging.start_page;
        var end_page = this.paging.end_page;
        for (var i = start_page; i <= end_page; i++) pageNumber.push(i);
        return pageNumber;
      }
      ,categories: ['전체', '대학부', '청년부']
      ,selectedCate: '전체'
    }
  }
  ,mounted() { //페이지 시작하면은 자동 함수 실행
    this.fnGetList();
  }
  , methods:{
    fnGetList() { //데이터 가져오기 함수
      this.body = { // 데이터 전송
        board_code:this.board_code
        ,keyword:this.keyword
        ,page:this.page
      }
      this.$axios.get('http://localhost:3000/api/board',{params:this.body})
          .then((res)=>{
            if(res.data.success) {
              this.list = res.data.list;
              this.paging = res.data.paging;
              this.no = this.paging.totalCount - ((this.paging.page-1) * this.paging.ipp);
            } else {
              alert("실행중 실패했습니다.\n다시 이용해 주세요.");
            }
          })
          .catch((err)=>{
            console.log(err);
          })
    }
    ,fnAdd() {
      this.$router.push("./write");
    }
    ,getList() {
      this.$axios.get("http://localhost:3000/api/board")
          .then((res)=>{
            console.log(res);
          })
          .then((err)=>{
            console.log(err);
          })
    }
    ,fnSearch() { //검색
      this.paging.page = 1;
      this.fnGetList();
    }
    , fnPage(n) {//페이징 이
      if(this.page != n) {
        this.page = n;
        this.fnGetList();
      }
    }
  }
}
</script>

<style scoped>
.searchWrap .btnSearch{display:inline-block; margin-left:10px;}
.cate{border:1px solid #888; border-radius:5px; text-align:center; padding:20px 0; margin-bottom:40px;}
.cate select{width:60%; height:36px; border-radius:3px; padding:0 10px; border:1px solid #888;}
.tbList th{border-top:1px solid #888;}
.tbList th, .tbList td{border-bottom:1px solid #eee; padding:5px 0;}
.tbList td.txt_left{text-align:left;}
.btnRightWrap{text-align:right; margin:10px 0 10px 10px;}
.pagination{margin:20px 0 0 0; text-align:center;}
.first, .prev, .next, .last{border:1px solid #666; margin:0 5px;}
.pagination span{display:inline-block; padding:0 5px; color:#333;}
.pagination a{text-decoration:none; display:inline-blcok; padding:0 5px; color:#666;}
.add-button {display: flex; position: fixed; right: 20px; bottom: 15px; z-index: 999;}
</style>
-->