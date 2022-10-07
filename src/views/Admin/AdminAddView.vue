<template>
  <div class="AdminAdd">
    <!--헤더-->
    <!-- <AdminHeader /> -->
    <div class="header">
      <font-awesome-icon
        @click="isModalViewed = true"
        icon="fa-solid fa-chevron-left"
      />
      <span>게시글 작성</span>
    </div>
    <AdminHeaderModal
      v-if="isModalViewed"
      @close-modal="isModalViewed = false"
    />
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

      <div class="line"></div>

      <!--찬양곡(제목)-->
      <div id="block-title">
        <span>{{ blocktitle }}</span>
      </div>

      <!--곡 추가 버튼-->
      <div class="song_add_btn">
        <font-awesome-icon icon="fa-solid fa-plus" @click="openModal" />
        <span>이 곳을 눌러 첫번째 곡을 추가하세요</span>
      </div>

      <!--바텀업 모달-->
      <AdminBottomModal v-if="bottommodal">
        <!-- default 슬롯 콘텐츠 -->
        <p>Vue.js Modal Window!</p>
      </AdminBottomModal>

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
      <!--곡 추가 버튼-->
      <button @click="addSong">곡 추가하기</button>
      <br />

      <!--submit-->
      <button id="save-btn" @click="onFormSave">저장</button>
    </form>
  </div>
</template>

<script>
import DatePicker from "vue2-datepicker";
import AdminSelect from "@/components/Admin/AdminSelect.vue";
// import AdminHeader from "@/components/Admin/AdminHeader.vue";
import AdminHeaderModal from "@/components/Admin/AdminHeaderModal.vue";
import "vue2-datepicker/index.css";
import AdminBottomModal from "../../components/Admin/AdminBottomModal.vue";

export default {
  name: "AdminAdd",
  components: {
    DatePicker,
    AdminSelect,
    AdminHeaderModal,
    AdminBottomModal,
  },
  props: {
    msg: String,
  },
  data() {
    return {
      alert_save: false,
      isModalViewed: false,
      bottommodal: false,
      blocktitle: "곡 추가",
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
    openModal() {
      this.bottommodal = true;
    },
    closeModal() {
      this.bottommodal = false;
    },
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
  padding: 0;
}
.line {
  width: 100%;
  height: 5px;
  left: 0px;
  background-color: #646574;
  margin: 30px 0px;
}
#block-song-image-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
  background: #074ee8;
  border-radius: 4px;
  color: #ffffff;
  font-weight: 400;
  font-size: 16px;
}
</style>
