<template>
	<div class="AdminList">
		
		<div v-if="isLoaded">
		<UserHeader></UserHeader>
		
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
        >
          <AdminCard :conti="conti" />
        </div>
      </div>
      <div v-else class="content-none">
        <h3 class="content-none-message">등록된 찬양곡이 없습니다 😢</h3>
      </div>


		<div class="add-button">
			<font-awesome-icon class="add-btn" @click="goAdminEdit" icon="fa-solid fa-circle-plus" />
		</div>
		<UserFooter></UserFooter>
		</div>
	</div>

</template>

<script>
import AdminCard from '@/components/Admin/AdminCard.vue'
import UserHeader from '@/components/UserHeader.vue'
import UserFooter from '@/components/UserFooter.vue'
import { getCategoryAPI, getContiListAPI, deleteContiCardAPI } from '@/api/user'

export default {

	components: {
		AdminCard
		,UserHeader
    ,UserFooter
		},
	data() { //변수생성
		return{
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

		deleteContiCardAPI()
      .then((res) => {
        console.log(res.result)
        this.category = res.result
      })
      .catch((err) => console.log(err))

		deleteContiCardAPI(this.contiId)
			.then((res) => {
				console.log(res.result)
				this.contiList = res.result
			})
			.catch((err) => console.log(err))
  },
  methods: {
    toDetail(id) {
      this.$router.push({ path: `/conti/${id}` })
    },
    select(e) {
      this.categoryValue = e.target.value
    },
		goAdminEdit() {
			this.$router.push({ path: `/admin/edit` })
		}
  }
}
</script>
		
<!--
		,fnGetList() { //데이터 가져오기 함수
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
		,getList() {
			this.$axios.get("http://localhost:3000/api/board")
			.then((res)=>{
				console.log(res);
			})
			.then((err)=>{
				console.log(err);
			})
		}
		,fnAdd() {
			this.$router.push("./write");
		}
		,fnSearch() { //검색
			this.paging.page = 1;
			this.fnGetList();
		}
		, fnPage(n) {//페이징 이
			if(this.page !== n) {
				this.page = n;
				this.fnGetList();
			}
		}
-->



<style scoped>
	.AdminList {
		text-align: center;
		color: #2c3e50;
		margin: 0px 20px;
		padding: 0;
	}
	.searchWrap .btnSearch {display:inline-block; margin-left:10px;}
	.cate {border:1px solid #888; border-radius:5px; text-align:center; padding:20px 0; margin-bottom:40px;}
	.cate select {width:60%; height:36px; border-radius:3px; padding:0 10px; border:1px solid #888;}
	.add-btn {margin:10px 0 10px 10px;}
	.add-button {display: flex; position: fixed; right: 20px; bottom: 15px; z-index: 999;}
</style>