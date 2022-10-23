<!--부서와 분류 선택 -->
<template>
  <div class="AdminSelect">
    <span>{{ radioSelectTitle }}</span>
    <div class="radio_select">
        <div class="radio_select" v-for="(item, index) in selections" :key="index">
          <input 
          type="radio" 
          :id="item.val" 
          :value="item.val"
          @change="onRadioChange"
          :name="name"
          />
          <label :for="item.val">{{item.txt}}</label>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: "AdminSelect",
  props: {
    radioSelectTitle: {
      type: String,
      default: undefined
    },
    selections: {
      type: Array,
      default: () => ({})
    },
    name:{}
    },
  methods: {
    onRadioChange(event) {
      this.$emit('change', event.target.value);
    }
    // update(key, value) {
    //   this.$emit(key, value)
    // }
  },
  // mounted: 
  // function() {
  //   console.log(this.target.value)
  // }
};
</script>

<style scoped>
.AdminSelect {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  font-family: "Noto Sans KR";
}
/*  라디오 버튼 커스텀  */
.radio_select input[type="radio"] {
  display: none;
}

.radio_select input[type="radio"] + label {
  display: inline-block;
  cursor: pointer;
  height: 40px;
  width: 80px;
  background: #d5d5d5;
  color: #333;
  text-align: center;
  font-weight: bold;
  font-size: 13px;
  justify-content: center;
}
.radio_select input[type="radio"]:checked + label {
  background-color: #44786c;
  color: #fff;
}
</style>
