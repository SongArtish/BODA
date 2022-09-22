<template>
  <div class="AdminEditBlock">
    <!--곡 제목-->
    <div class="block-song-title">
      <span>곡 제목</span>
      <!-- <font-awesome-icon icon="fa-regular fa-trash-can" /> -->
      <input v-model="songtitle" placeholder="곡 제목을 입력해주세요" />
      <span>*최대 20글자</span>
    </div>

    <!--악보 첨부-->
    <div class="block-song-image">
      <span>악보 첨부</span>
      <label id="block-song-image-btn" for="input-file"> 악보추가 </label>
      <input type="file" id="input-file" style="display: none" />
    </div>

    <!--유튜브 링크-->
    <div class="block-youtube-link">
      <span>유튜브 링크</span>
      <input v-model="youtubelink" placeholder="링크를 입력해주세요" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      songtitle: "",
      youtubelink: "",
    };
  },
};
</script>

<style scoped>
html,
body {
  margin: 0;
  padding: 0;
}
.AdminEditBlock {
  font-family: "Noto Sans KR";
  text-align: center;
  color: #2c3e50;

  padding: 10px;
  background: #d9d9d9;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
}
#block-title {
  margin: 10px 0px;
  font-weight: 700;
  font-size: 16px;
  text-align: left;
}

.block-song-title {
  display: flex;
  flex-direction: column;
  text-align: left;
  margin: 20px 0px;
}

.block-youtube-link {
  display: flex;
  flex-direction: column;
  text-align: left;
  margin: 20px 0px;
}

.block-song-image {
  display: flex;
  flex-direction: column;
  text-align: left;
  margin: 20px 0px;
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
</style>
