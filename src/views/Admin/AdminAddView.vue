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

    <div v-if="bottommodal">
      <div>찬양공유에 새 글을 작성합니다.</div>
      <div>별도 표시된 부분은 필수로 입력해 주세요.</div>
    </div>



    <form>
      <!--datepicker-->
      <div>날짜</div>
      <input 
      type="date"
      data-placeholder="날짜를 선택해 주세요"
      required
      v-model="date"
      class="date-picker"
      pattern="\d{4}-\d{2}-\d{2}"
      />
      
      
      <!--부서선택-->
      <div class="RadioBtn">
        <AdminSelect />
      </div>

      <div class="line"></div>

      <!--찬양곡(제목)-->
      <div id="block-title">
        <span>{{ blocktitle }}</span>
      </div>

      <!--곡 추가(첫번째 곡) 버튼-->
      <AdminAddSongBtn v-if="data.length == 0 " :textAddSong="textAddSong_1" @openModal="openModal"/>


      <!--곡 리스트 표시-->
      <div class="song_info">
        <div class="song_detail" v-for="(item, index) in data" :key="index">
          <div>
            <div id="song_detail_title">{{ item.song_title }}</div>
            <!--사진/링크가 있는 경우 체크 표시-->
            <div>
              <font-awesome-icon icon="fa-solid fa-check" />
              첨부사진
              <font-awesome-icon icon="fa-solid fa-check" />
              링크
            </div>
          </div>

          <!--수정/삭제 버튼 -->
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

      <!--곡 추가(다음곡) 버튼-->
      <AdminAddSongBtn v-if="data.length !=0 " :textAddSong="textAddSong_2" @openModal="openModal"/>


      
      <!--바텀업 모달-->
      <AdminBottomModal class="bottom_modal" v-if="bottommodal">
        <!-- 슬롯 콘텐츠 -->
        <p>곡 제목</p>
        <div>
          <input
            class = "modal-input-text"
            type="text"
            v-model="song_title"
            placeholder="곡 제목을 입력하세요"
            required
            maxlength="20"
          />
          <div v-if="song_title.length >= 20">곡 제목은 20자를 초과할 수 없습니다.</div>
        </div>
        <!--유튜크 링크 추가-->
        <p>유튜브 링크</p>
        <div>
          <input
            class = "modal-input-text"
            type="text"
            v-model="song_youtube"
            placeholder="유튜브 링크를 입력하세요"
          />
        </div>
        <!-- 악보 첨부 기능 -->
        <div class="song_image_upload">

        <!--이미지 업로드 버튼-->
        <label for ="image_file">악보첨부</label>
        <input class="image_upload__input" name="image_file" type="file" @change="onUploadImage()" ref="files" multiple/>

        <!--이미지 미리보기-->
        <div v-if="uploadReady" class="image_preview">
          <div class="image_preview_container">
            <div class="image_preview_container__image" v-for="(file,index) in files" :key="index"  >
              <div class="image_preview_close__btn" @click="fileDeleteButton" :name=file.number>x</div>
              <img :src="file.preview" />
            </div>
          </div>

        </div>


        </div>

        <!--footer 콘텐츠-->
        <template slot="footer">
          <button @click.prevent="addSong" :disabled="song_title.length <1 ">완료</button>
        </template>

        <!-- /footer -->
      </AdminBottomModal>

      <input type="submit" value="완료"/>

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
import AdminAddSongBtn from "../../components/Admin/AdminAddSongBtn.vue"
import data from "../../data/index.js";

export default {
  name: "AdminAdd",
  components: {
    DatePicker,
    AdminSelect,
    AdminHeaderModal,
    AdminBottomModal,
    AdminAddSongBtn
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
      uploadReady: false,
      blocktitle: "곡 추가",
      textAddSong_1:"이 곳을 눌러 첫번째 곡을 추가하세요",
      textAddSong_2:"이 곳을 눌러 다음 곡을 추가하세요",
      date: null,
      song_title: "",
      song_youtube: "",
      song_image: null,
      files:[],
      filesPreview: [],
      uploadImageIndex: 0

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
    onUploadImage(){
      this.uploadReady = true;
      console.log(this.$refs.files.files);

      let num = -1;
      for (let i = 0; i < this.$refs.files.files.length; i++) {
          this.files = [
              ...this.files,
              //이미지 업로드
              {
                  //실제 파일
                  file: this.$refs.files.files[i],
                  //이미지 프리뷰
                  preview: URL.createObjectURL(this.$refs.files.files[i]),
                  //삭제및 관리를 위한 number
                  number: i
              }
          ];
          num = i;
    
      }
      this.uploadImageIndex = num + 1; //이미지 index의 마지막 값 + 1 저장
      console.log(this.files);
      // console.log(this.filesPreview);
    },
    fileDeleteButton(e) {
      const name = e.target.getAttribute('name');
      this.files = this.files.filter(data => data.number !== Number(name));
    },
  },
};
</script>

<style scoped>
html,
body {
  margin: 0;
  padding: 0;
  overflow: hidden;
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
/*date-picker*/

.date-picker {
  box-sizing: border-box;
  position: relative;
  content: attr(data-placeholder);
  padding: 13px 40px;
  background: url(../../assets/CalendarIcon.png),url(../../assets/ChevrondownIcon.png);
  background-position: left, right; 
  background-size: 24px,24px; 
  background-repeat:no-repeat;
  width: 90%;
  border: 0px;
  border-bottom: 2px solid #646574;
  color: #fffffd;
}
.date-picker::-webkit-clear-button{display: none;}
.date-picker::-webkit-inner-spin-button {display: none;}
.date-picker::-webkit-calendar-picker-indicator {
  position: absolute;
  left:0;
  top: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  color: transparent;
  cursor: pointer;
}
.date-picker::before {
  content: attr(data-placeholder);
  width: 100%;
}
.date-picker:valid::before{
  display: none;
}

/*바텀업 모달 인풋*/
.modal-input-text{
  background: #48495B;
  border:0;
  color: #6E707F;
  border-bottom: 2px solid #646574;
  height: 49px;
  width: 80%;
}
.modal-input-text:focus{
  outline: none !important;
  color: #FFFFFD;
  border-bottom: 2px solid #90E5FA;
}
/*이미지 업로드 버튼*/
.image_upload__input{
  border-style: none;
  width: 65px;
  height: 65px;
  background: #5A5A6D;
  border-radius: 8px;
  background-image: src('')
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
