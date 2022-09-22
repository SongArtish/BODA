<template>
  <div class="AdminListpage">
    <!--헤더-->
    <AdminHeader />
    <!--리스트-->
    <div class="admin-list-box">
      <div class="list-items-info">
        <span class="list-song-info" id="list-song-title">곡 제목</span>
        <div class="list-song-info">
          <span>청년부 주일</span>
          <span>2022/09/12</span>
        </div>
      </div>
      <div class="list-items-btn">수정</div>
      <div class="list-items-btn">삭제</div>
    </div>
  </div>
</template>

<script>
import AdminHeader from "@/components/Admin/AdminHeader.vue";

export default {
  name: "AdminList",
  components: {
    AdminHeader,
  },
};
</script>
<style scoped>
html,
body {
  margin: 0;
  padding: 0;
}
.AdminListpage {
  font-family: "Noto Sans KR";
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}
.admin-list-box {
  display: flex;
  height: 80px;
  margin: 0px 20px;
  justify-content: space-between;
}
.list-items-info {
  display: flex;
  flex-direction: column;
}
.list-items-btn {
  background: #074ee8;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  width: 50px;
  height: 30px;
}
.list-song-info {
  display: flex;
}
</style>
