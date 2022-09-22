<template>
  <div class="AdminSelect">
    <span>소속</span>
    <div class="Select1">
      <input type="radio" id="U" value="Univ" v-model="select1" />
      <label for="U">대학부</label>
      <input type="radio" id="Y" value="Youth" v-model="select1" />
      <label for="Y">청년부</label>
    </div>

    <span>분류</span>
    <div class="Select2">
      <input type="radio" id="S" value="Sunday" v-model="select2" />
      <label for="S">주일</label>
      <input type="radio" id="O" value="Others" v-model="select2" />
      <label for="O">행사</label>
    </div>
  </div>
</template>
<!-- https://www.youtube.com/watch?v=rAMScov1RO4 -->
<script>
export default {
  data() {
    return {
      data: "대학부/청년부",
      select1: "",
      select2: "",
    };
  },
};
</script>

<style scoped>
.AdminSelect {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  font-family: "Noto Sans KR";
}

.Select1 label,
.Select2 label {
  margin-left: 15px;
  margin-right: 30px;
  font-weight: 400;
  font-size: 20px;
  line-height: 18px;
}
</style>
