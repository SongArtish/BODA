<!--부서와 분류 선택 -->
<template>
    <div class="AdminSelect">
    <span>{{ radioSelectTitle }}</span>
    <div class="radio-select-group">
        <div class="radio-select" v-for="(item, index) in selections" :key="index">
            <input 
            type="radio" 
            :id="item.val" 
            @change="onRadioChange"
            :name="name"
            :checked = "item.val == name"
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
            default: () => ({})
        },
        name:{},
        value: {
            type: String,
            default: ''
        }
        },
    methods: {
    onRadioChange(event) {
        this.$emit('change', event.target.id);
    }
    },
};
</script>

<style scoped>
.AdminSelect {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    font-family: "Noto Sans KR";
}
/*  라디오 버튼 커스텀  */
.radio-select-group {
    display: flex;
    background: #d5d5d5;
    font-weight: bold;
    font-size: 14px;
    color: #333;
    border-radius: 5px;
}

.radio-select input[type="radio"] {
    display: none;
}

.radio-select input[type="radio"] + label {
    display: inline-block;
    display: flex;
    cursor: pointer;
    height: 40px;
    width: 78.75px;
    justify-content: space-around;
    align-items: center;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
}
.radio-select-group div:first-child input[type="radio"] + label {
    border-radius: 5px 0px 0px 5px;
}
.radio-select-group div:last-child input[type="radio"] + label {
    border-radius: 0px 5px 5px 0px;
}
.radio-select input[type="radio"]:checked + label {
    background-color: #44786c;
    color: #fff;
    font-weight: 700;
}
</style>
