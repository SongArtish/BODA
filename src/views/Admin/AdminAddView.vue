<template>
  <div id="AdminAdd">
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

    <div class="header-subtext" v-if="bottomModal">
      <div>찬양공유에 새 글을 작성합니다.</div>
      <div>별도 표시된 부분은 필수로 입력해 주세요.</div>
    </div>



    <div>
      <!--datepicker-->
      <AdminCalendar v-model="date"/>
      
      <!--부서선택-->
      <div class="radio-btn">
        <AdminSelect :selections="selections_depart" :radioSelectTitle="radioSelectDepart" @change='onDepartChange' :name="depart"/>
        <AdminSelect :selections="selections_category" :radioSelectTitle="radioSelectCategory" @change="onCategoryChange" :name="categoryId"/>
      </div>

      <div class="line"></div>

      <!--찬양곡(제목)-->
      <div id="addsong-title">
        {{ blocktitle }}
      </div>

      <!--곡 리스트 표시-->
      <div class="song-info">
        <div class="song-detail" v-for="(item, index) in songList" :key="index">
          <div>
            <div class="song-detail-title">{{ item.title }}</div>
            <!--사진/링크가 있는 경우 체크 표시-->
            <div class="song-detail-txt">
              <div class="song-detail-check">
                <img :src="checkIcon" alt="체크" class="check-icon"/>
                첨부사진
              </div>
              <div class="song-detail-check">
                <img :src="checkIcon" alt="체크" class="check-icon" :class="{'check-disabled': item.link.length < 1}"/>
                링크 없음
              </div>
            </div>
          </div>

          <!--수정/삭제 버튼 -->
          <div class="song-detail-icons">
            <div class="song-detail-icon">
              <img :src="pencilIcon" alt="수정"/>
            </div>
            <div class="song-detail-icon" @click="deleteSong(index)">
              <img :src="closeicon" alt="삭제">
            </div>
          </div>
        </div>
      </div>

      <!--곡 추가(다음곡) 버튼-->
      <AdminAddSongBtn :textAddSong="textAddSong" @openModal="openModal"/>


      
      <!--바텀업 모달-->
      <AdminBottomModal class="bottom_modal" v-if="bottomModal" @modalClose="bottomModal = false">
        <!-- 슬롯 콘텐츠 -->
        <div class="modal-txt">곡 제목</div>
        <div>
          <input
            class = "modal-input-text"
            :class="{'titlelength-warning': song_title.length >= 20}"
            type="text"
            v-model="song_title"
            placeholder="곡 제목을 입력하세요"
            required
            maxlength="20"
          />
          <div class="titlelength-warning-txt" v-if="song_title.length >= 20">곡 제목은 20자를 초과할 수 없습니다.</div>
        </div>
        <!--유튜크 링크 추가-->
        <div class="modal-txt">유튜브 링크</div>
        <div>
          <input
            class = "modal-input-text"
            type="text"
            v-model="link"
            placeholder="유튜브 링크를 입력하세요"
          />
        </div>
        <!-- 악보 첨부 기능 -->
        <div class="song_image_upload">

        <!--이미지 업로드 버튼-->
        <label for ="image-file">악보첨부</label>
        <input class="image-upload-input" name="image-file" type="file" @change="onUploadImage()" ref="fileList" multiple/>

        <!--이미지 미리보기-->
        <div v-if="uploadReady" class="image-preview">
          <div class="image-preview-container">
            <div class="image-preview-container-image" v-for="(file,index) in fileList" :key="index"  >
              <div class="image-preview-close-btn" @click="fileDeleteButton" :name=file.number>
                <img :src="closeicon" alt="삭제" style="width: 16px; height: 16px;">
              </div>
              <img class="image-preview-image" :src="file.preview" />
            </div>
          </div>
        </div>
        </div>
        <!--footer 콘텐츠-->
        <template slot="footer">
          <AdminBtn @buttonClick="addSong" :class="{'disabledbtn': song_title.length <1}" :textButton="textButton"/>
        </template>

        <!-- /footer -->
      </AdminBottomModal>

      <AdminBtn 
      :textButton="textButton" 
      v-if="bottomModal === false" 
      @buttonClick="passwordModal = true"/>
      <!--비밀번호 입력-->
      <AdminPasswordModal 
      v-if="passwordModal == true"
      :password="password"
      @modalButtonClick="onSavePassword"
      @modalCloseClick="passwordModal = false"/>
    </div>
  </div>
</template>

<script>
import AdminSelect from "@/components/Admin/AdminSelect.vue";
// import AdminHeader from "@/components/Admin/AdminHeader.vue";
import AdminHeaderModal from "@/components/Admin/AdminHeaderModal.vue";
import AdminPasswordModal from "@/components/Admin/AdminPasswordModal.vue"
import AdminCalendar from "../../components/Admin/AdminCalendar.vue"
import "vue2-datepicker/index.css";
import AdminBottomModal from "@/components/Admin/AdminBottomModal.vue";
import AdminAddSongBtn from "../../components/Admin/AdminAddSongBtn.vue"
import AdminBtn from "@/components/Admin/AdminBtn.vue";
import {postFileAPI} from '@/api/index'

export default {
  name: "AdminAdd",
  emits:[
    'change'
  ],
  components: {
    AdminSelect,
    AdminHeaderModal,
    AdminBottomModal,
    AdminPasswordModal,
    AdminAddSongBtn,
    AdminCalendar,
    AdminBtn
  },
  props: {
    msg: String,
  },
  data() {
    return {
      alert_save: false,
      isModalViewed: false,
      bottomModal: false,
      uploadReady: false,
      passwordModal: false,
      blocktitle: "곡 추가",
      radioSelectDepart: "소속",
      radioSelectCategory: "분류",
      textButton:"완료",
      songList:[],
      depart:"",
      categoryId:"",
      date: null,
      title: "",
      song_title: "",
      link: "",
      sheetList: null,
      password:"",
      fileList:[],
      filesPreview: [],
      uploadImageIndex: 0,
      selections_depart: [{
        txt: '대학부',
        val: 'U'
      },{
        txt: '청년부',
        val: 'Y'
      }
      ],
      selections_category: [{
        txt: '주일',
        val: 1,
      },{
        txt:'행사',
        val: 2
      }],
      closeicon: require('@/assets/closeIcon.svg'),
      pencilIcon: require('@/assets/pencilIcon.svg'),
      checkIcon: require('@/assets/checkIcon.svg'),
      checkDisabledIcon: require('@/assets/checkDisabledIcon.svg')
    };
  },
  computed: {
    // 곡 추가 메시지
    textAddSong() {
      return `이 곳을 눌러 ${this.songList.length === 0 ? '첫번째' : '다음'} 곡을 추가하세요. `;
    }
  },
  methods: {
    openModal() {
      this.bottomModal = true;
    },
    closeModal() {
      this.bottomModal = false;
    },
    onInputAdminSelect(param) {
      console.log("param", param);
    },
    onDepartChange(value){
      this.depart = value;
      console.log(this.depart)
    },
    onCategoryChange(value){
      this.categoryId = value;
      console.log(this.categoryId)
    },
    addSong() {
      if (this.song_title.length <=0 ){
        return false;
      }
      this.songList.push({
        title: this.song_title,
        link: this.link,
        sheetList: this.fileList,
      });
      //파일 업로드
      const frm = new FormData();

      if (this.$refs.fileList.files.length > -1) {
        for (let i=0; i< this.$refs.fileList.files.length; i++){
          const imageForm = this.$refs.fileList.files[i]

          frm.append('fileList', imageForm)
        }
      }
      console.log(this.$refs.fileList.files[0])
      postFileAPI(frm)
        .then((res) =>{
          if(res.data.status === 200) {
            console.log(res.data.result)
          }
          else {
            alert("업로드 실패")
          }
        })
        .catch((err) => console.log(err))
      this.song_title = '';
      this.link = '';
      this.fileList = '';
      this.closeModal();
    },
    deleteSong(index) {
      this.songList.splice(index, 1);
    },
    onSavePassword(password){
      this.password = password
      console.log(this.password)
      this.passwordModal = false;
    },
    onUploadImage(){
      this.uploadReady = true;
      console.log(this.$refs.fileList.files);
      let num = -1;
      for (let i = 0; i < this.$refs.fileList.files.length; i++) {
          this.fileList = [
              ...this.fileList,
              //이미지 업로드
              {
                  //실제 파일
                  file: this.$refs.fileList.files[i],
                  //이미지 프리뷰
                  preview: URL.createObjectURL(this.$refs.fileList.files[i]),
                  //삭제및 관리를 위한 number
                  number: i
              }
          ];
          num = i;
    
      }
      this.uploadImageIndex = num + 1; //이미지 index의 마지막 값 + 1 저장
      console.log(this.fileList);
      // console.log(this.filesPreview);
    },
    fileDeleteButton(e) {
      const name = e.target.getAttribute('name');
      this.fileList = this.fileList.filter(songList => songList.number !== Number(name));
    },
  },
};
</script>

<style scoped>
html body {
  margin: 0;
  padding: 0;
  height: 100vh;
  background: #48495b;
}

#AdminAdd {
  font-family: "Noto Sans KR";
  text-align: center;
  background: #48495b;
  color: #fffffd;
  padding: 0;
  height: 100vh;
  width: 100%;
    overflow-y: auto;
  overflow-x: hidden;
  font-size: 14px;
}
.header {
  display: flex;
  width: 375px;
  height: 60px;
  padding: 30px 24px 0px 24px; 
  gap: 16px;
  align-items: center;
}
.header-subtext {
  display:flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px 24px 20px 24px;
  gap: 5px
}
.radio-btn {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.line {
  width: 100%;
  height: 5px;
  left: 0px;
  background-color: #646574;
  margin: 32px 0px;
}
#addsong-title {
  display: flex;
  padding: 0px 24px;
}
.song-info {
  margin: 10px 25px;
  display: flex;
  flex-direction: column;
}
.song-detail {
  margin: 5px 0px;
  background: #5a5a6d;
  display: flex;
  padding: 20px 16px;
  justify-content: space-between;
}
.song-detail-title {
  display: flex;
  justify-content: flext-start;
  margin-bottom: 4px;
  font-size: 16px;
}
.song-detail-check {
  display: flex;
  align-items: center;
  gap: 2px;
  color: #ACACAE;
}
.check-icon {
  width: 16px;
  height: 16px;
}
.check-disabled {
  background: src(checkDisabledIcon) no-repeat;
}
.song-detail-txt {
  display: flex;
  font-size: 12px;
  gap: 8px;
}
.song-detail-icons {
  display: flex;
  align-items: center;
}
.song-detail-icon {
  width: 20px;
  height: 20px;
  gap:8px;
}


/*바텀업 모달 인풋*/
.modal-txt {
  display: flex;
}
.modal-input-text{
  background: #48495B;
  border:0;
  color: #D4D4D4;
  border-bottom: 2px solid #646574;
  height: 49px;
  width: 100%;
  font-size: 16px;
  margin-bottom: 32px;
}
.modal-input-text::placeholder {
  color: #6E707F;
  
}
.modal-input-text:focus{
  outline: none !important;
  color: #FFFFFD;
  border-bottom: 2px solid #90E5FA;
}
.titlelength-warning:focus{
  color: #D7917F;
  border-bottom: 2px solid #D7917F;
}
.titlelength-warning-txt{
  color: #D7917F;
  margin-top: 4px;
  display: flex;
  justify-items: flex-start;
}
.image-preview-container {
  display: flex;
  gap: 12px;
}
.image-preview-container-image {
  position: relative;
  width: 65px;
  height: 65px;
}
.image-preview-close-btn{
  position: absolute;
  top:2px;
  right: 2px;
  width: 20px;
  height: 20px;
  background: #6E707F;
  opacity: 0.5;
  border-radius: 5px;
}
.image-preview-image{
  width: 65px;
  height: 65px;
  border-radius: 8px;
}
.disabledbtn {
  background: #505062;
  color: gray;
  cursor: none;
}

/*이미지 업로드 버튼*/
/* .song_image_upload{
} */
.image-upload-input{
  border-style: none;
  width: 65px;
  height: 65px;
  background: #5A5A6D;
  border-radius: 8px;
  /* background: url('') */
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
