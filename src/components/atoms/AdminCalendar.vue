<template>
    <div class="AdminCalendar">
        <div class="date-picker-title">날짜</div>
        <input 
        class="date-picker"
        type="date"
        data-placeholder="날짜를 선택해 주세요"
        required
        :value = "date"
        @input="onDateChange"
        />

    </div>
</template>
<script>
export default {
    name: "AdminCalendar",
    props: {
        date:{}
    },
            methods: {
            onDateChange(event) {
                this.$emit('input', event.target.value);
            }
        },
};
</script>

<style scoped>
/*date-picker*/
.AdminCalendar{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-top: 32px;
    padding-bottom: 24px;
    gap: 4px;
}

.date-picker {
    box-sizing: border-box;
    position: relative;
    content: attr(data-placeholder);
    padding: 13px 40px;
    background: url(../../assets/calendar_icon.svg),url(../../assets/chevron_down_icon.svg);
    background-position: left, right; 
    background-size: 24px,24px; 
    background-repeat:no-repeat;
    width: 100%;
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
</style>
