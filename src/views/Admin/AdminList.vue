<template>
	<div>
		<UserHeader></UserHeader>
		
        <div class="cate">
			<label>카테고리:</label>
			<select v-model="category">
				<option v-for="(category, index) in categories" :key="index">{{category}}</option>
			</select>
		</div>

		<div>
			<AdminCard></AdminCard>
			<AdminCard></AdminCard>
		</div>

		<div class="add-button">
				<a class="add-btn" href="/api/conti">+</a>
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
	.add-btn{margin:10px 0 10px 10px;}
	.add-button {display: flex; position: fixed; right: 20px; bottom: 15px; z-index: 999;}
</style>