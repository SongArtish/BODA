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

      <div class="block">
        <br />
        <div
          class="songtitle"
          v-for="(songinfo, counter) in songinfos"
          v-bind:key="counter"
        >
          <!--곡 삭제 버튼-->
          <div @click="deleteSong(counter)">
            <font-awesome-icon icon="fa-regular fa-trash-can" />
          </div>

          <label>
            {{ counter + 1 }}) 곡 제목
            <input type="text" v-model="songinfo.songtitle" required />
          </label>
          <span>*최대 20글자</span>

          <!--악보 첨부-->
          <div class="block-song-image">
            <span>악보 첨부</span>
            <label id="block-song-image-btn" for="input-file"> 악보추가 </label>
            <input
              id="input-file"
              @change="onInputImage"
              type="file"
              ref="songImage"
              style="display: none"
              accept="image/*"
            />
          </div>

          <label>
            유튜브 링크
            <input type="text" v-model="songinfo.youtubelink" />
          </label>
        </div>
        <br /><br />
      </div>
      <!--곡 추가 버튼-->
      <button id="add-song-btn" @click="addSong">곡 추가하기</button>
      <br />

      <!--submit-->
      <button id="save-btn" @click="onFormSave">저장</button>
    </form>
  </div>
</template>

<script>
import AdminHeader from "@/components/Admin/AdminHeader.vue";
import DatePicker from "vue2-datepicker";
import AdminSelect from "@/components/Admin/AdminSelect.vue";
import "vue2-datepicker/index.css";

export default {
  name: "AdminEdit",
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
          songtitle: "",
          songimage: null,
          youtubelink: "",
        },
      ],
    };
  },
  methods: {
    addSong() {
      this.songinfos.push({
        songtitle: "",
        youtubelink: "",
        songimage: null,
      });
    },
    deleteSong(counter) {
      this.songinfos.splice(counter, 1);
    },
    onInputImage(e) {
      console.log(e.target.files);
    },
    onFormSave() {
      this.$router.push({
        name: "uploadConfirm",
        params: {
          input: this.input,
        },
      });
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
.Date-Picker {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.block {
  background: #d9d9d9;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  margin: 10px;
}
#add-song-btn {
  background: #074ee8;
  border-radius: 48px;
  color: #ffffff;
  width: 110px;
  height: 48px;
  margin: 10px;
  border: 0px;
}
#block-song-image-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
  background: #074ee8;
  border-radius: 4px;
  /*폰트*/
  color: #ffffff;
  font-weight: 400;
  font-size: 16px;
}
#save-btn {
  width: 100%;
  background: #074ee8;
  height: 60px;
  color: #ffffff;
  font-size: 16px;
  text-align: center;
  border: 0px;
}
</style>
