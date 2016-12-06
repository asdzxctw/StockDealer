//此check()函式在最後的「傳送」案鈕會用到
function check()
{
    //若<form>屬性name值為reg裡的文字方塊值為空字串，則顯示「未輸入姓名」
    if(reg2.key.value == "")
    {
        alert("未輸入股票代碼");
    }else if(reg2.startDate.value == "")
    {
        alert("未輸入開始日期");
    }else if(reg2.endDate.value == "")
    {
        alert("未輸入結束日期");
    }
    
    else reg2.submit();
}
