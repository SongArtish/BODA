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
            <AdminCalendar @input='onDateChange'/>
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
                            <div class="check-icon" :class="{'check-disabled': item.sheetList.length < 0}">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.3334 4L6.00008 11.3333L2.66675 8" stroke="#FFFFFD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>
                            첨부사진 {{item.sheetList.length}}장
                        </div>
                        <div class="song-detail-check">
                            <div class="check-icon" :class="{'check-disabled': item.link.length > 0}">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.3334 4L6.00008 11.3333L2.66675 8" stroke="#FFFFFD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>
                            링크 없음
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
                    class = "bottom-modal-input-text"
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
                <div class="bottom-modal-input">
                    <div class="bottom-modal-txt">
                        유튜브 링크
                    </div>
                    <input
                    class = "bottom-modal-input-text"
                    type="text"
                    v-model="link"
                    placeholder="유튜브 링크를 입력하세요"
                    />
                </div>
                <!-- 악보 첨부 기능 -->
                <div class="image-upload">
                    <!--이미지 업로드 버튼-->
                    <div class="image-upload-input">
                        <img class="image-input-camera" src="../assets/camera_icon.svg"/>
                        <div class="image-input-txt">악보첨부</div>
                        <label for ="image-file"></label>
                        <input
                        class="image-input-button"
                        name="image-file"
                        type="file"
                        @change="onUploadImage()"
                        ref="fileList"
                        multiple />
                    </div>

                    <!--이미지 미리보기-->
                    <div v-if="uploadReady" class="image-preview">
                        <div class="image-preview-container">
                            <div class="image-preview-container-image" v-for="(file,index) in fileList" :key="index" >
                                <div class="image-preview-close-btn" @click="fileDeleteButton" :name=file.sheetList>
                                <img src="../assets/close_icon.svg" alt="삭제" style="width: 16px; height: 16px;">
                                </div>
                                <img class="image-preview-image" :src="file.preview" />
                            </div>
                        </div>
                    </div>
                </div>
                <!--footer 콘텐츠-->
                <template slot="footer">
                    <BottomButton @buttonClick=" updateModal==true ? updateSong() : addSong()" :class="{'disabledbtn': song_title.length < 1}" :textButton="textButton"/>
                </template>
        <!-- /footer -->
        </AdminBottomModal>

        <!--콘티 제출 버튼-->
        <BottomButton
            :textButton="textButton"
            v-if="bottomModal === false"
            @buttonClick="passwordModal = true"
            :class="{'disabledbtn': this.songList.length == 0}"
        />
        <!--콘티 비밀번호 설정 -->
        <AdminPasswordModal
            v-if="passwordModal == true"
            :password="password"
            @modalButtonClick="onSavePassword"
            @modalCloseClick="passwordModal = false"
        />
    </div>
</template>
<script>
import { AdminAddSongBtn, AdminBottomModal, AdminCalendar, AdminHeaderModal, AdminSelect, AdminPasswordModal, BottomButton} from './atoms'
import { postFileAPI, postContiAPI } from '../apis/admin'
import Login from "@/mixins/login";

export default {
    name: 'AdminAdd',
    emits: [
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
    mixins: [Login],
    data() {
        return {
            categoryId:"",
            date:null,
            depart: "",
            fileList:[],
            filesPreview: [],
            link:"",
            password: "",
            sheetList: [],
            song_title:"",
            songList:[],
            songOrder:0,
            title:"",
            updateIndex: "",
            updateFileList:[],
            tempResultData:[],
            uploadImageIndex:0,
            alert_save: false,
            isModalViewed: false,
            bottomModal: false,
            uploadReady: false,
            passwordModal: false,
            updateModal: false,
            radioSelectDepart: "소속",
            radioSelectCategory: "분류",
            textButton: "완료",
            selectionsDepart: [{
                txt: '대학부',
                val: 'U'
            },{
                txt: '청년부',
                val: 'Y'
            }
            ],
            selectionsCategory: [{
                txt: '주일',
                val: 1,
            },{
                txt:'행사',
                val: 2
            }],
        }
    },
    computed: {
        // 곡 추가 메시지
        textAddSong() {
            return `이 곳을 눌러 ${this.songList.length === 0 ? '첫번째' : '다음'} 곡을 추가하세요. `;
        }
    },
    methods: {
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
        onSubmitConti(){
            let conti = JSON.stringify({
                "categoryId":this.categoryId,
                "depart": this.depart,
                "date": this.date,
                "title": this.title,
                "password":this.password,
                "songList": this.songList
            });

            postContiAPI(conti)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
        },
        onSavePassword(password){   //게시글 저장 비밀번호
            this.password = password;
            console.log(this.password);
            this.passwordModal = false;
            this.onSubmitConti();
            this.$router.push({ path: "/admin/list" });
        },
        closeBottomModal() {
            this.bottomModal = false;
        },
        async addSong() {     //곡 추가
            if (this.song_title.length <= 0 ){
                return false;
            }
            //파일 업로드
            await this.uploadFile();

            this.songList.push({
                title: this.song_title,
                link: this.link,
                sheetList: this.sheetList,
                songOrder: this.songOrder,
            });

            console.log("2songList:",this.songList);

            this.song_title = '';
            this.link = '';
            this.fileList = '';
            this.songOrder++;
            await this.closeBottomModal();
        },
        async uploadFile() {
            const frm = new FormData();

            if (this.$refs.fileList.files.length > 0 ) {
                for (let i=0; i< this.$refs.fileList.files.length; i++){
                    const imageForm = this.$refs.fileList.files[i]
                    frm.append('fileList', imageForm)
                }
                // console.log(this.$refs.fileList.files[0])
                //파일 등록 api
                await postFileAPI(frm)
                .then((res) =>{
                    if(res.data.status === 200) {
                        this.sheetList=[];
                        this.tempResultData = res.data.result;
                        console.log('1tempResultData =',this.tempResultData[0].fileId);
                        // console.log(res.data.result);
                        // console.log(res.data.result[0].fileId)
                    }
                    else {
                    alert("업로드 실패");
                    }
                })
                .then(()=>{
                    for ( let i=0; i <= this.tempResultData.length; i++) {
                            this.sheetList=
                            [...this.sheetList,{
                                fileId: this.tempResultData[i].fileId,
                                sheetOrder: i
                            }];
                        }
                })
                .catch((err) => console.log(err));
            }
        },
        updateSongModal(index){ //곡 수정을 위한 위한 모달창 준비
            this.updateModal = true;
            this.bottomModal = true;
            // this.openUpdateModal(index);
            this.song_title = this.songList[index].title
            this.link = this.songList[index].link
            this.fileList = [this.updateFileList[index]]
            this.updateIndex = index;
        },
        async updateSong(){     //곡 수정
            await this.uploadFile();
            this.songList[this.updateIndex].title = this.song_title;
            this.songList[this.updateIndex].link = this.link;
            this.songList[this.updateIndex].sheetList = this.sheetList;

            console.log("초기화")
            this.updateModal = false;
            this.song_title = "";
            this.link="";
            this.fileList = '';

            await this.closeBottomModal();
        },
        deleteSong(index) {
            this.songList.splice(index, 1);
            this.updateFileList.splice(index,1);
        },
        onUploadImage(){    //이미지 업로드
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
                        //삭제및 관리를 위한 sheetList
                        sheetList: i
                    }
                ];
                num = i;
            }
            this.updateFileList.push(this.fileList);
            this.uploadImageIndex = num + 1; //이미지 index의 마지막 값 + 1 저장
            console.log("fileList:",this.fileList);
            // console.log(this.filesPreview);
        },
        fileDeleteButton(e) {
            const name = e.target.getAttribute('name');
            this.fileList = this.fileList.filter(songList => songList.sheetList !== Number(name));
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
    gap:8px;
}

/*바텀업 모달*/
.bottom-modal-input {
    margin-top: 12px;
    height: 94px;
}
.bottom-modal-txt {
    display: flex;
}
.bottom-modal-input-text{
    background: #48495B;
    border:0;
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
.image-preview-close-btn{
    position: absolute;
    top:2px;
    right: 2px;
    width: 20px;
    height: 20px;
    background: var(--color-bg-text);
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
    color: var(--color-bg-text);
    cursor: none;
}
.image-upload {
    display: flex;
    gap: 12px;
}
.image-upload-input{
    border-style: none;
    position:relative;
    width: 65px;
    height: 65px;
    background: #5A5A6D;
    border-radius: 8px;
    display:flex;
    flex-direction: column;
    align-items:center;
    justify-content: center;
}
.image-upload-input input{
    opacity:0;
    filter: alpha  (opacity=0);
    cursor: pointer;
    width: 65px;
    height: 65px;
    position: absolute;
    left:0;
    top:0;
    gap:3px;
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
