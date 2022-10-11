<template>
	<div class="AdminListpage">
		<!--헤더-->
		<UserHeader></UserHeader>
		
        <div class="cate">
			<label>카테고리:</label>
			<select v-model="selectedCate">
				<option v-for="(category, index) in categories" :key="index">{{category}}</option>
			</select>
		</div>

		<div>
			<AdminCard></AdminCard>
		</div>
		<div>
			<AdminCard></AdminCard>
		</div>

		<div class="add-button">
			<font-awesome-icon class="add-btn" @click="goAdminEdit" icon="fa-solid fa-circle-plus" />
		</div>
		<UserFooter></UserFooter>
	</div>

</template>

<script>
import AdminCard from '@/components/Admin/AdminCard.vue'
import UserHeader from '@/components/UserHeader.vue'
import UserFooter from '@/components/UserFooter.vue'

export default {
	components: {
		AdminCard
		,UserHeader
    ,UserFooter
		}
	,data() { //변수생성
		return{
			body:'' //리스트 페이지 데이터전송
			,categories: ['전체', '대학부', '청년부']
			,selectedCate: '전체'
		}
	}
	,created() {
		this.$axios.get('http://localhost:8080/api/conti/list').then(res => {
        console.log('conti', res.data)
        this.article = res.data.result
      })
			.then(err => {
      console.log(err)
      })
  }
//	,mounted() { //페이지 시작하면은 자동 함수 실행
//		this.fnGetList();
//	}
	,methods:{
		goAdminEdit() {
			this.$router.push({ path: "/admin/edit" });
			}

		
/*		,fnGetList() { //데이터 가져오기 함수
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
*/

	}
}
</script>

<style scoped>
	.AdminListpage {
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