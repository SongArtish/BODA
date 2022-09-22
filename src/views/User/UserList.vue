<template>
	<div>
		<MyHeader></MyHeader>
		<div class="cate">
			<label>카테고리:</label>
			<select v-model="category">
				<option v-for="(category, index) in categories" :key="index">{{category}}</option>
			</select>
		</div>
		
		<div>
			<UserCard></UserCard>
			<UserCard></UserCard>
		</div>


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
		<div class="add-button">
				<a class="add-btn" href="/api/conti">+</a>
		</div>
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
			,categories: ['대학부', '청년부']
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