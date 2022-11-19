<template>
  <div class="AdminAdd">
    <!--header-->
    <div class="header">
      <div class="header-icon" @click="isModalViewed = true">
        <img src="../assets/chevron_left_icon.svg"/>
      </div>
      <span>게시글 작성</span>
    </div>
    <AdminHeaderModal
        v-if="isModalViewed"
        @close-modal="isModalViewed = false"
    />
    <div class="conti">
      <!--date-picker-->
      <AdminCalendar @input='onDateChange' :date='date'/>
      <!-- 라디오 버튼 -->
      <div class="radio-btn">
        <!-- 부서 선택 -->
        <AdminSelect
            :selections="selectionsDepart"
            :radioSelectTitle="radioSelectDepart"
            :name="depart"
            @change='onDepartChange'
        />
        <!-- 카테고리 선택 -->
        <AdminSelect
            :selections="selectionsCategory"
            :radioSelectTitle="radioSelectCategory"
            :name="categoryId"
            @change="onCategoryChange"
        />
      </div>
      <!-- 분리 선 -->
      <div class="line"></div>
    </div>

    <!--찬양곡(제목)-->
    <div class="addsong-title">
      곡 추가
    </div>
    <!--곡 리스트 표시-->
    <div class="song-info">
      <div class="song-detail" v-for="(item, index) in songList" :key="index">
        <div>
          <div class="song-detail-title">{{ item.title }}</div>
          <!--사진/링크가 있는 경우 체크 표시-->
          <div class="song-detail-txt">
            <div class="song-detail-check">
              <div class="check-icon" :class="{'check-disabled': item.sheetList.length == 0}">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.3334 4L6.00008 11.3333L2.66675 8" stroke="#FFFFFD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              {{item.sheetList.length>0 ? `첨부사진 ${ item.sheetList.length}장` : '첨부사진 없음'}}
            </div>
            <div class="song-detail-check">
              <div class="check-icon" :class="{'check-disabled': item.link.length == 0}">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.3334 4L6.00008 11.3333L2.66675 8" stroke="#FFFFFD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              {{item.link.length > 0 ? '링크 추가' : '링크 없음'}}
            </div>
          </div>
        </div>

        <!--수정/삭제 버튼 -->
        <div class="song-detail-icons">
          <div class="song-detail-icon" @click="updateSongModal(index)">
            <img src="../assets/pencil_icon.svg" alt="수정"/>
          </div>
          <div class="song-detail-icon" @click="deleteSong(index)">
            <img src="../assets/close_icon.svg" alt="삭제">
          </div>
        </div>
      </div>
    </div>

    <!-- 곡 추가 버튼 -->
    <AdminAddSongBtn :textAddSong="textAddSong" @openBottomModal="openBottomModal"/>

    <!--바텀업 모달-->

    <AdminBottomModal class="bottom-modal" v-if="bottomModal" @closeBottomModal="bottomModal = false">
      <!-- 슬롯 콘텐츠 -->
      <div class="bottom-modal-input">
        <div class="bottom-modal-txt">
          곡 제목
        </div>
        <input
            class="bottom-modal-input-text"
            :class="{'titlelength-warning': bottomModalData.songTitle.length >= 20}"
            type="text"
            v-model="bottomModalData.songTitle"
            placeholder="곡 제목을 입력하세요"
            required
            maxlength="20"
        />
        <div class="titlelength-warning-txt" v-if="bottomModalData.songTitle.length >= 20">곡 제목은 20자를 초과할 수 없습니다.</div>
      </div>
      <!--유튜크 링크 추가-->
      <div class="bottom-modal-input">
        <div class="bottom-modal-txt">
          유튜브 링크
        </div>
        <input
            class="bottom-modal-input-text"
            type="text"
            v-model="bottomModalData.link"
            placeholder="유튜브 링크를 입력하세요"
        />
      </div>
      <!-- 악보 첨부 기능 -->
      <div class="image-upload">
        <!--이미지 업로드 버튼-->
        <div class="image-upload-input">
          <img id="image-file" class="image-input-camera" src="../assets/camera_icon.svg"/>
          <div class="image-input-txt">악보첨부</div>
          <label for="image-file"></label>
          <input
              class="image-input-button"
              name="image-file"
              type="file"
              @change="onUploadImage"
              ref="fileList"
              multiple/>
        </div>

        <!--이미지 미리보기-->
        <div class="image-preview">
          <div class="image-preview-container">
            <div class="image-preview-container-image" v-for="(file,index) in bottomModalData.updateFileList" :key="`update_${index}`">
              <div class="image-preview-close-btn" @click="deleteUpdateFile(index)" :name=file.sheetList>
                <img src="../assets/close_icon.svg" alt="삭제" style="width: 16px; height: 16px;">
              </div>
              <img class="image-preview-image" :src="file.preview"/>
            </div>
            <div class="image-preview-container-image" v-for="(file,index) in bottomModalData.addFileList" :key="`add_${index}`">
              <div class="image-preview-close-btn" @click="deleteAddFile(index)" :name=file.sheetList>
                <img src="../assets/close_icon.svg" alt="삭제" style="width: 16px; height: 16px;">
              </div>
              <img class="image-preview-image" :src="file.preview"/>
            </div>
          </div>
        </div>
      </div>
      <!--footer 콘텐츠-->
      <template slot="footer">
        <BottomButton :click-button="updateModal ? updateSong : addSong" :class="{'disabledbtn': bottomModalData.songTitle.length < 1}"
                      :textButton="textButton"/>
      </template>
      <!-- /footer -->
    </AdminBottomModal>

    <!--콘티 제출 버튼-->
    <BottomButton
        :textButton="textButton"
        v-if="bottomModal === false"
        :click-button="onClickCompleteButton"
        :class="{'disabledbtn': this.songList.length == 0}"
    />
    <!--콘티 비밀번호 설정 -->
    <AdminPasswordModal
        v-if="passwordModal == true"
        :password="password"
        :modalTitle="passwordModalTitle"
        :modalSubtext="passwordModalSubtext"
        @modalButtonClick="onSavePassword"
        @modalCloseClick="passwordModal = false"
    />
  </div>
</template>
<script>
import {AdminAddSongBtn, AdminBottomModal, AdminCalendar, AdminHeaderModal, AdminPasswordModal, AdminSelect, BottomButton} from './atoms'
import {getAdminContiAPI, postContiAPI, postFileAPI, updateContiAPI} from '../apis/admin'
import Login from "@/mixins/login";

export default {
  name      : 'AdminAdd',
  emits     : [
    'change',
    'input'
  ],
  components: {
    AdminAddSongBtn,
    AdminBottomModal,
    AdminCalendar,
    AdminHeaderModal,
    AdminSelect,
    AdminPasswordModal,
    BottomButton
  },
  mixins    : [Login],
  data() {
    return {
      contiId             : '',
      categoryId          : "",
      date                : null,
      depart              : "",
      password            : "",
      sheetList           : [],
      songList            : [],
      songOrder           : 1,
      title               : "",
      updateIndex         : 0,
      updateFileList      : [],
      tempResultData      : [],
      uploadImageIndex    : 0,
      alert_save          : false,
      isModalViewed       : false,
      bottomModal         : false,
      bottomModalData     : {
        addFileList   : [],
        updateFileList: [],
        songTitle     : "",
        link          : "",
      },
      uploadReady         : false,
      passwordModal       : false,
      updateModal         : false,
      deleteImage         : false,
      radioSelectDepart   : "소속",
      radioSelectCategory : "분류",
      textButton          : "완료",
      passwordModalTitle  : "게시글 작성",
      passwordModalSubtext: "비밀번호를 설정해주세요",
      selectionsDepart    : [{
        txt: '대학부',
        val: 'U'
      }, {
        txt: '청년부',
        val: 'Y'
      }
      ],
      selectionsCategory  : [{
        txt: '주일',
        val: 1,
      }, {
        txt: '행사',
        val: 2
      }]
    }
  },
  computed: {
    // 곡 추가 메시지
    textAddSong() {
      return `이 곳을 눌러 ${this.songList.length === 0 ? '첫번째' : '다음'} 곡을 추가하세요. `;
    },
    updating() {
      return [this.bottomModal, this.updateModal]
    },
  },
  watch   : {
    updating(newValue, oldValue) {
      if (newValue[0] == false && oldValue[1] == true) {
        this.updateModal = false
        this.removeDatas()
      }
    },
    // deleteImage(newValue) {
    //     if(newValue == true){
    //         this.sheetList = this.bottomModalData.addFileList
    //     }
    // }
  },
  created() {
    this.contiId = this.$route.params.id
    this.getContiDetail();
  },
  methods: {
    getContiDetail() {
      getAdminContiAPI(this.contiId)
          .then((res) => {
            console.log(res.result)
            this.depart = res.result.depart;
            this.date = res.result.date.join('-');
            this.songList = res.result.songList;
            if (res.result.categoryName == "주일") {
              this.categoryId = 1
            }
            if (res.result.categoryName == "행사") {
              this.categoryId = 2
            }
            res.result.songList.forEach(song => {
              song.sheetList.forEach(sheet => {
                sheet.preview = sheet.downloadUrl;
              })
              this.updateFileList.push(song.sheetList);
            })
          })
          .catch((err) => console.log(err))
    },
    onDateChange(value){
      this.date= value;
      console.log(this.date);
      //날짜로 타이틀 만들기
      const dateArr = this.date.split('-')
      this.title=dateArr[0]+"년 "+dateArr[1]+"월 "+dateArr[2]+"일";
      console.log(this.title);
    },
    onDepartChange(value){  //부서 선택
      this.depart = value;
      // console.log(this.depart)
    },
    onCategoryChange(value){    //카테고리 선택
      value=Number(value);
      this.categoryId = value;
      // console.log(this.categoryId)
    },
    openBottomModal() {
      this.bottomModal = true;
      // console.log(this.bottomModal)
    },
    toDate(dateArr) {
      dateArr[1] = dateArr[1] > 9 ? dateArr[1] : "0" + dateArr[1];
      dateArr[2] = dateArr[2] > 9 ? dateArr[2] : "0" + dateArr[2];

      return dateArr.join('-')
    },
    onSubmitConti() {
      let conti = JSON.stringify({
        "categoryId": this.categoryId,
        "depart"    : this.depart,
        "date"      : this.date,
        "title"     : this.title,
        "password"  : this.password,
        "songList"  : this.songList
      });
      postContiAPI(conti)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          })
    },
    onSavePassword(password) {   //게시글 저장 비밀번호
      this.password = password;
      console.log(this.password);
      this.passwordModal = false;
      this.contiId !== undefined ? this.onUpdateConti(this.contiId) : this.onSubmitConti()
      this.$router.push({path: "/admin/list"});
      location.reload();
    },
    onUpdateConti(contiId){
      let conti = JSON.stringify({
        "categoryId":this.categoryId,
        "contiId": contiId,
        "depart": this.depart,
        "date": this.date,
        "title": this.title,
        "password":this.password,
        "songList": this.songList
      });
      updateContiAPI(conti)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          })
    },
    closeBottomModal() {
      this.bottomModal = false;
    },
    async addSong() {     //곡 추가
      if (this.bottomModalData.songTitle.length <= 0) {
        return false;
      }
      //파일 업로드
      console.log("sheetlist length", this.sheetList.length)
      await this.uploadFile();
      console.log("uploadFile")
      console.log("sheetlist length", this.sheetList.length)

      this.songList.push({
        title    : this.bottomModalData.songTitle,
        link     : this.bottomModalData.link,
        sheetList: this.sheetList,
        songOrder: this.songOrder,
      });
      console.log("push")

      // console.log("2songList:",this.songList);
      if (this.bottomModalData.addFileList.length == 0) {
        this.updateFileList.push([{}])
        // console.log(this.updateFileList.length);
      }

      await this.removeDatas()
      this.songOrder++;
      await this.closeBottomModal();
    },
    async uploadFile() {
      const frm = new FormData();
      console.log("addFileList.length", this.bottomModalData.addFileList.length)
      let fileResult = [];
      if (this.bottomModalData.addFileList.length > 0) {
        for (let i = 0; i < this.bottomModalData.addFileList.length; i++) {
          const imageForm = this.bottomModalData.addFileList[i].file
          frm.append('fileList', imageForm)
        }
        // console.log(this.$refs.addFileList.files[0])
        //파일 등록 api
        await postFileAPI(frm)
            .then((res) => {
              if (res.data.status === 200) {
                this.sheetList = [];
                fileResult = res.data.result;
              } else {
                alert("업로드 실패");
              }
            })
            .catch((err) => console.log(err));
      }
      fileResult.forEach(file => {
        file.preview = file.downloadUrl;
      })
      this.updateFileList[this.updateIndex] = this.updateFileList[this.updateIndex].concat(fileResult)
      this.tempResultData = this.bottomModalData.updateFileList.concat(fileResult);
      this.tempResultData.forEach((temp, index) => {
        this.sheetList.push({
              fileId    : temp.fileId,
              sheetOrder: index
            });
      })
    },
    updateSongModal(index) { //곡 수정을 위한 위한 모달창 준비
      this.updateModal = true;
      this.bottomModal = true;
      // this.openUpdateModal(index);
      this.bottomModalData.songTitle = this.songList[index].title
      this.bottomModalData.link = this.songList[index].link
      this.bottomModalData.updateFileList = this.updateFileList[index]
      this.updateIndex = index;
    },
    async updateSong() {     //곡 수정
      console.log('?');
      await this.uploadFile();
      if (this.updateModal) {
        this.songList[this.updateIndex].title = this.bottomModalData.songTitle;
        this.songList[this.updateIndex].link = this.bottomModalData.link;
        this.songList[this.updateIndex].sheetList = this.sheetList;

        this.updateModal = false;
        await this.removeDatas();

        await this.closeBottomModal();
      }
    },
    deleteSong(index) {
      this.songList.splice(index, 1);
      this.updateFileList.splice(index, 1);
    },
    onUploadImage() {    //이미지 업로드
      this.uploadReady = true;
      console.log(this.$refs.fileList.files);
      let num = -1;
      for (let i = 0; i < this.$refs.fileList.files.length; i++) {
        this.bottomModalData.addFileList = [
          ...this.bottomModalData.addFileList,
          //이미지 업로드
          {
            //실제 파일
            file: this.$refs.fileList.files[i],
            //이미지 프리뷰
            preview: URL.createObjectURL(this.$refs.fileList.files[i]),
            //삭제및 관리를 위한 sheetList
            sheetList: i
          }
        ];
        num = i;
      }
      this.updateFileList.push(this.bottomModalData.addFileList);
      this.uploadImageIndex = num + 1; //이미지 index의 마지막 값 + 1 저장
      // console.log("addFileList:",this.bottomModalData.addFileList);
      // console.log(this.filesPreview);
    },
    deleteUpdateFile(index) {
      this.bottomModalData.updateFileList.splice(index, 1);
    },
    deleteAddFile(index) {
      this.bottomModalData.addFileList.splice(index, 1);
    },
    fileDeleteButton(file) {
      console.log('file', file);
      // const name = e.target.getAttribute('name');
      // console.log("deleteImage",this.deleteImage);
      // console.log("name:",name)
      // this.bottomModalData.addFileList = this.bottomModalData.addFileList.filter(songList => songList.sheetList !== Number(name));
      // this.updateFileList[this.updateIndex]=this.bottomModalData.addFileList
      // this.sheetList = this.bottomModalData.addFileList
      // console.log(this.bottomModalData.addFileList.length);
      // console.log("deleteImage",this.deleteImage);
    },
    updateDeleteButton(e) {
      const name = e.target.getAttribute(':name');
      console.log("update delete", name);
    },
    removeDatas() {
      this.bottomModalData.songTitle = "";
      this.bottomModalData.link = "";
      this.bottomModalData.addFileList = [];
    },
    onClickCompleteButton () {
      this.passwordModal = true;
    }
  }
}
</script>


<style scoped>

.AdminAdd {
  margin-left: 2rem;
  margin-right: 2rem;
}

.header {
  display: flex;
  width: 375px;
  height: 60px;
  padding-top: 30px;
  gap: 16px;
  align-items: center;
}

.radio-btn {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.line {
  width: 100%;
  height: 5px;
  left: 0px;
  background-color: var(--color-line);
  margin: 32px 0px;
}

/*곡 정보 표시 카드*/
.song-info {
  margin: 10px 0px;
  display: flex;
  flex-direction: column;
}

.song-detail {
  margin: 5px 0px;
  background: #5a5a6d;
  display: flex;
  padding: 20px 16px;
  justify-content: space-between;
  height: 84px;
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

.check-icon svg path {
  width: 16px;
  height: 16px;
  stroke: #90E5FA;
}

.check-disabled svg path {
  stroke: #ACACAE;
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
  gap: 8px;
}

/*바텀업 모달*/
.bottom-modal-input {
  margin-top: 12px;
  height: 94px;
}

.bottom-modal-txt {
  display: flex;
}

.bottom-modal-input-text {
  background: #48495B;
  border: 0;
  padding: 0;
  color: #D4D4D4;
  border-bottom: 2px solid var(--color-line);
  height: 49px;
  width: 100%;
  font-size: 16px;
}

.bottom-modal-input-text::placeholder {
  color: var(--color-bg-text);
}

.bottom-modal-input-text:focus {
  outline: none !important;
  color: #FFFFFD;
  border-bottom: 2px solid #90E5FA;
}

.titlelength-warning,
.titlelength-warning:focus {
  color: var(--color-alert);
  border-bottom: 2px solid var(--color-alert);
}

.titlelength-warning-txt {
  color: var(--color-alert);
  margin-top: 4px;
  display: flex;
  justify-items: flex-start;
  font-weight: 400;
  font-size: 12px;
}

/*이미지 프리뷰*/
.image-preview-container {
  display: flex;
  gap: 12px;
}

.image-preview-container-image {
  position: relative;
  width: 65px;
  height: 65px;
}

.image-preview-close-btn {
  position: absolute;
  top: 2px;
  right: 2px;
  width: 20px;
  height: 20px;
  background: var(--color-bg-text);
  opacity: 0.5;
  border-radius: 5px;
}

.image-preview-image {
  width: 65px;
  height: 65px;
  border-radius: 8px;
}

.disabledbtn {
  background: #505062;
  color: var(--color-bg-text);
  cursor: none;
}

.image-upload {
  display: flex;
  gap: 12px;
}

.image-upload-input {
  border-style: none;
  position: relative;
  width: 65px;
  height: 65px;
  background: #5A5A6D;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.image-upload-input input {
  opacity: 0;
  filter: alpha (opacity=0);
  cursor: pointer;
  width: 65px;
  height: 65px;
  position: absolute;
  left: 0;
  top: 0;
  gap: 3px;
}

.image-input-txt {
  font-weight: 700;
  font-size: 10px;
}

.image-input-camera {
  width: 24px;
  height: 24px;
}

/* .image-input-button::-webkit-file-upload-button {
visibility: hidden;
} */

</style>
