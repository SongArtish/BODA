<template>
    <div id="AdminCalendar">
        <div>날짜</div>
        <input 
        type="date"
        data-placeholder="날짜를 선택해 주세요"
        required
        v-model="date"
        class="date-picker"
        />

    </div>
</template>

<script>
export default {
    name: "AdminCalendar",
};
</script>

<style scoped>
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
</style>
