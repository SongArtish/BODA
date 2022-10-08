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
        <!-- 슬롯 콘텐츠 -->
        <div
          class="songtitle"
          v-for="(songinfos, counter) in songinfos"
          v-bind:key="counter"
        ></div>
        <!--곡 제목-->
        <p>곡 제목</p>
        <div>
          <input
            type="text"
            v-model="songinfos.song_title"
            placeholder="곡 제목을 입력하세요"
            required
          />
        </div>
        <!--유튜크 링크 추가-->
        <p>유튜브 링크</p>
        <div>
          <input
            type="text"
            v-model="songinfos.song_youtube"
            placeholder="유튜브 링크를 입력하세요"
          />
        </div>
        <!-- 악보 첨부-->
        <input type="file" accept="image/*" ref="song_image" />
        <!--footer 콘텐츠-->
        <template slot="footer">
          <button @click="saveSong">완료</button>
        </template>
        <!-- /footer -->
      </AdminBottomModal>
    </form>
  </div>
</template>

<script>
import DatePicker from "vue2-datepicker";
import AdminSelect from "@/components/Admin/AdminSelect.vue";
// import AdminHeader from "@/components/Admin/AdminHeader.vue";
import AdminHeaderModal from "@/components/Admin/AdminHeaderModal.vue";
import "vue2-datepicker/index.css";
import AdminBottomModal from "@/components/Admin/AdminBottomModal.vue";

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
          song_title: "",
          song_youtube: "",
          song_image: null,
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
    saveSong() {
      this.songinfos.push({
        songtitle: "",
        youtubelink: "",
        songimage: null,
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

.AdminAdd {
  font-family: "Noto Sans KR";
  text-align: center;
  background: #48495b;
  color: #fffffd;
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
