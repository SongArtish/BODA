<template>
  <div class="AdminEditpage">
    <!--헤더-->
    <AdminHeader />
    <!--todo: datepicker-->
    <div class="Date-Picker">
      <span>* 날짜</span>
      <date-picker v-model="date" valueType="format"></date-picker>
    </div>

    <!--선택-->
    <div class="RadioBtn">
      <AdminSelect />
    </div>

    <div id="block-title">
      <span>{{ blocktitle }}</span>
    </div>
    <!--edit카드-->
    <AdminEditBlock />

    <button v-on:click="addEditBlock">곡 추가하기</button>
  </div>
</template>

<script>
import AdminHeader from "@/components/Admin/AdminHeader.vue";
import AdminSelect from "@/components/Admin/AdminSelect.vue";
import AdminEditBlock from "@/components/Admin/AdminEditBlock.vue";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";

export default {
  name: "AdminEdit",

  components: {
    AdminHeader,
    AdminSelect,
    AdminEditBlock,
    DatePicker,
  },
  data() {
    return {
      blocktitle: "찬양곡",
      date: null,
    };
  },
  methods: {
    addEditBlock() {
      this.AdminEditBlock.push({
        songtitle: "",
        youtubelink: "",
      });
    },
  },
};
</script>

<style scoped>
html,
body {
  margin: 0;
  padding: 0;
}
.AdminEditpage {
  font-family: "Noto Sans KR";
  text-align: center;
  color: #2c3e50;
  margin: 0px 50px;
  padding: 0;
}

.Date-Picker {
  font-weight: 400;
  font-size: 14px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  text-align: left;
}

#block-title {
  margin: 10px 0px;
  margin-top: 30px;
  font-weight: 700;
  font-size: 16px;
  display: flex;
  text-align: left;
}
</style>
