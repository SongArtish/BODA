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

      <!--곡 표시-->
      <div class="song_info">
        <div class="song_detail" v-for="(item, index) in data" :key="index">
          <div>
            <div id="song_detail_title">{{ item.song_title }}</div>
            <div>
              <font-awesome-icon icon="fa-solid fa-check" />
              첨부사진
              <font-awesome-icon icon="fa-solid fa-check" />
              링크
            </div>
          </div>

          <div class="song_detail__icons">
            <div class="song_detail_icon">
              <font-awesome-icon icon="fa-regular fa-pen-to-square" />
            </div>
            <div class="song_detail_icon" @click="deleteSong(index)">
              <font-awesome-icon icon="fa-solid fa-xmark" />
            </div>
          </div>
        </div>
      </div>

      <!--곡 추가 버튼-->
      <div class="song_add_btn">
        <font-awesome-icon icon="fa-solid fa-plus" @click="openModal" />
        <span>이 곳을 눌러 첫번째 곡을 추가하세요</span>
      </div>

      <!--바텀업 모달-->
      <AdminBottomModal v-if="bottommodal">
        <!-- 슬롯 콘텐츠 -->
        <p>곡 제목</p>
        <div>
          <input
            type="text"
            v-model="song_title"
            placeholder="곡 제목을 입력하세요"
            required
          />
        </div>
        <!--유튜크 링크 추가-->
        <p>유튜브 링크</p>
        <div>
          <input
            type="text"
            v-model="song_youtube"
            placeholder="유튜브 링크를 입력하세요"
          />
        </div>
        <!-- 악보 첨부-->
        <input type="file" @change="onInputImage()" ref="song_image" />
        <!--footer 콘텐츠-->
        <template slot="footer">
          <button @click.prevent="addSong">완료</button>
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
import data from "../../data/index.js";

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
      data,
      alert_save: false,
      isModalViewed: false,
      bottommodal: false,
      blocktitle: "곡 추가",
      date: null,
      song_title: "",
      song_youtube: "",
      song_image: null,
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
      this.data.push({
        song_title: this.song_title,
        song_youtube: this.song_youtube,
        song_image: this.song_image,
      });
      this.closeModal();
    },
    deleteSong(index) {
      this.data.splice(index, 1);
    },
    onInputImage() {
      this.data.song_image = this.$refs.song_image.files;
      console.log(this.data.song_image);
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
.song_info {
  margin: 10px 25px;
  display: flex;
  flex-direction: column;
}
.song_detail {
  margin: 5px 0px;
  background: #5a5a6d;
  display: flex;
  justify-content: space-between;
}
.song_detail__icons {
  display: flex;
}
.song_detail_icon {
  margin: 0px 10px;
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
