<template>
  <div class="AdminAdd">
    <AdminHeader />
    <form>
      <!--datepicker-->
      <div class="Date-Picker">
        <span>* 날짜</span>
        <date-picker v-model="date" valueType="format"></date-picker>
        <!-- <span>{{ date }}</span> -->
      </div>
      <!--선택-->
      <div class="RadioBtn">
        <AdminSelect />
      </div>
      <!--찬양곡(제목)-->
      <div id="block-title">
        <span>{{ blocktitle }}</span>
      </div>

      <div
        class="title"
        v-for="(songinfo, counter) in songinfos"
        v-bind:key="counter"
      >
        <!--곡 삭제 버튼-->
        <div @click="deleteSong(counter)">
          <font-awesome-icon icon="fa-regular fa-trash-can" />
        </div>

        <label>
          {{ counter + 1 }}) 곡 제목
          <input type="text" v-model="songinfo.title" required />
        </label>

        <!--악보 첨부-->

        <label>
          유튜브 링크
          <input type="text" v-model="songinfo.youtubelink" required />
        </label>
      </div>
      <br /><br />
      <!--곡 추가 버튼-->
      <button @click="addSong">곡 추가하기</button>
      <br />
    </form>
  </div>
</template>

<script>
import AdminHeader from "@/components/Admin/AdminHeader.vue";
import DatePicker from "vue2-datepicker";
import AdminSelect from "@/components/Admin/AdminSelect.vue";
import "vue2-datepicker/index.css";

export default {
  name: "AdminAdd",
  components: {
    AdminHeader,
    DatePicker,
    AdminSelect,
  },
  props: {
    msg: String,
  },
  data() {
    return {
      blocktitle: "찬양곡",
      date: null,
      songinfos: [
        {
          title: "",
          youtubelink: "",
        },
      ],
    };
  },
  methods: {
    addSong() {
      this.songinfos.push({
        title: "",
        youtubelink: "",
      });
    },
    deleteSong(counter) {
      this.songinfos.splice(counter, 1);
    },
  },
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}
.AdminAdd {
  font-family: "Noto Sans KR";
  text-align: center;
  color: #2c3e50;
  margin: 0px 50px;
  padding: 0;
}
</style>
