
var csv = ".txt";
var dataPath = "https://cocoflyliu.github.io/stock_crawler/data/";
var f1 = document.getElementById("form1")
var f2 = document.getElementById("form2")
var f3 = document.getElementById("form3")
var f4 = document.getElementById("form4")
var namePath = dataPath+"name"+csv
var datalist = ["EPS","NATPM","ROE","IT","DY","NVPS","OP","OPMGR","OPM","LR","NIGR","DR","ATNI","PS","PE","PBR"];
var dataResult = [];

var testrequest = {target:f1.target1.value, comparison:f1.comparison1.value , data:f1.text1.value, searchable:f1.checkValidity()}
var testrequest2 = {target:f2.target2.value, comparison:f2.comparison2.value , data:f2.text2.value, searchable:f2.checkValidity()}
var testrequest3 = {target:f3.target3.value, comparison:f3.comparison3.value , data:f3.text3.value, searchable:f3.checkValidity()}
var testrequest4 = {target:f4.target4.value, comparison:f4.comparison4.value , data:f4.text4.value, searchable:f4.checkValidity()}
document.getElementById("form1").target1.option

var result1 = []
var result2 = []
var result3 = []
var result4 = []
var outIndex = []
var outcome = []

function checkHealth(){
    if($('#healthResult').is(":visible")){
        $('#healthResult').fadeOut(400);
        setTimeout("getSharpe()", 400 )
    }else{
        setTimeout("getSharpe()", 400 )
    }
}

function getURL(request){
    var filename = request.target
    var dataURL = dataPath+filename+csv;
    //alert(dataURL);
    return dataURL
}

function display(dsp){
    if(dsp=="EPS"){
        var res = "每股盈餘(元)"
        return res
    }
    else if(dsp=="NATPM"){
        var res = "稅後淨利率(%)"
        return res
    }
    else if(dsp=="ROE"){
        var res = "股東權益報酬率(%)"
        return res
    }
    else if(dsp=="IT"){
        var res = "存貨週轉率(%)"
        return res
    }
    else if(dsp=="DY"){
        var res = "殖利率(%)"
        return res
    }
    else if(dsp=="NVPS"){
        var res = "淨值(元)"
        return res
    }
    else if(dsp=="OP"){
        var res = "營業毛利率(%)"
        return res
    }
    else if(dsp=="OPMGR"){
        var res = "營收成長率(%)"
        return res
    }
    else if(dsp=="OPM"){
        var res = "營業利益率(%)"
        return res
    }
    else if(dsp=="LR"){
        var res = "流動比率(%)"
        return res
    }
    else if(dsp=="NIGR"){
        var res = "稅後淨利成長率(%)"
        return res
    }
    else if(dsp=="DR"){
        var res = "負債比率(%)"
        return res
    }
    else if(dsp=="ATNI"){
        var res = "稅後淨利(千元)"
        return res
    }
    else if(dsp=="PS"){
        var res = "每股營業額(元)"
        return res
    }
    else if(dsp=="PE"){
        var res = "本益比"
        return res
    }
    else if(dsp=="PBR"){
        var res = "股價淨值比"
        return res
    }
    
}
// var getData = d3.csv(dataPath+"name"+csv, function g(gd){
//     console.log(gd);
// })

function sentID(id){
    var ic = "s"+id
    $('html,body').animate({scrollTop:$("#s"+id).offset().top-90},800);
    if (testrequest.searchable==true){
        var tar = document.getElementById(ic)
        if(tar.name=="did"){
            if(testrequest.searchable == true){
                tar.parentNode.deleteRow(tar.rowIndex)
            }
            if(testrequest2.searchable == true){
                tar.parentNode.deleteRow(tar.rowIndex)
            }
            if(testrequest3.searchable == true){
                tar.parentNode.deleteRow(tar.rowIndex)
            }
            if(testrequest4.searchable == true){
                tar.parentNode.deleteRow(tar.rowIndex)
            }
            
            tar.name=""
        }else{
            tar.name="did"
            if(testrequest.searchable == true){
                singlestock(ic,testrequest.target);
            }
            if(testrequest2.searchable == true){
                singlestock(ic,testrequest2.target);
            }
            if(testrequest3.searchable == true){
                singlestock(ic,testrequest3.target);
            }
            if(testrequest4.searchable == true){
                singlestock(ic,testrequest4.target);
            }
            
        }
    }
};

function clear2(){
    document.getElementById("form1").reset();
    document.getElementById("form2").reset();
    document.getElementById("form3").reset();
    document.getElementById("form4").reset();
    var ddd =  document.getElementById("table1");
    ddd.removeChild(document.getElementById("tbody1"))
    var fff =document.createElement("tbody")
    fff.setAttribute("id", "tbody1");
    //    fff.setAttribute("border", "1");
    //    fff.setAttribute("width", "100%");
    //    var qqq = document.createElement("tr")
    //    var sss = document.createElement("td")
    //    sss.innerHTML="股票代號"
    //    var mmm = document.createElement("td")
    //    mmm.innerHTML="公司名稱"
    //    fff.appendChild(sss)
    //    fff.appendChild(mmm)
    ddd.appendChild(fff)
    
    
};

function clear3(){
    $('#healthResult').fadeOut(1000);
}

function parsepin(aaa){
    return parseFloat(aaa)*parseFloat(aaa)
}


function getSharpe(){
    tech = "https://cocoflyliu.github.io/stock_crawler/data/"
    var ss = document.getElementById("stockIndex")
    var stockIndex = ss.value
    var a = []
    
    
    var stock_i = 0;
    
    path = tech + "ROE" + ".txt";
    
    d3.csv(path,function(data){
           
           var avg = 0
           var sd = 0
           var sharpValue = 0
           
           for(i=0;i<data.length;i++){
            if(data[i]["index"] == stockIndex){
              stock_i = i;
              var stockName = document.getElementById("stockName")
              stockName.innerHTML = data[i]["index"] + data[i]["company name"]
              break;
            }
           }
           
           console.log("stockIndex",stockIndex)
           var x = data[stock_i];
           
           for (i=2012;i<=2015; i++){
           
           var sum = parseFloat(x[i+"Q1"])+ parseFloat(x[i+"Q2"])+parseFloat(x[i+"Q3"])+parseFloat(x[i+"Q4"])
           avg  += parseFloat(sum);
           
           
           }
           var sum = parseFloat(x["2016Q1"])+parseFloat(x["2016Q2"])+parseFloat(x["2016Q3"])
           avg  += parseFloat(sum);
           
           console.log("sum",avg)
           avg = avg/19
           
           for (i=2012;i<=2015; i++){
           
           sd += parsepin(x[i+"Q1"])
           sd += parsepin(x[i+"Q2"])
           sd += parsepin(x[i+"Q3"])
           sd += parsepin(x[i+"Q4"])
           
           }
           
           sd += parsepin(x["2016Q1"])
           sd += parsepin(x["2016Q2"])
           sd += parsepin(x["2016Q3"])
           
           sd = sd/19
           
           sd -= avg*avg
           sd = Math.sqrt(sd)
           
           console.log("avg",avg)
           console.log("sd",sd)
           
           var sharpe = parseFloat(x["2016Q1"])+parseFloat(x["2016Q2"])+parseFloat(x["2016Q3"])+parseFloat(x["2015Q4"])
           
           sharpe = sharpe/4
           console.log("nearFour",sharpe)
           
           sharpe = sharpe/sd
           
           console.log("shape",sharpe)
           
           var resultxx = document.getElementById("resultx");
           resultxx.innerHTML = ""
           var sharpeP = document.createElement("p");
           sharpeP.innerHTML="sharpe:  " + sharpe
           resultxx.appendChild(sharpeP);
           var sdP = document.createElement("p");
           sdP.innerHTML="sd:  " + sd
           resultxx.appendChild(sdP);
           var roeP = document.createElement("p");
           roeP.innerHTML="roe:  " + avg
           resultxx.appendChild(roeP);
           
           
           var warningText = document.getElementById("warning");
           warningText.innerHTML = ""
           var points = 0
           if(sharpe > 0.57){
            points += 1
           }else{
            warningText.innerHTML += "此股夏普指數過低，有危險。<br>"
           }
           
           if(avg > 3.115875){
           points += 1
           }else{
            warningText.innerHTML += "此股股本報酬率過低，有危險。<br>"
           }
           
           if(sd < 5.4476){
           points += 1
           }else{
            warningText.innerHTML += "此股動盪過大過低，有危險。"
           }
           
           if(warningText.innerHTML == ""){
            warningText.innerHTML = "此股可說是非常安全，推薦購買。"
           }
           
           var stares = 0
           if(points == 3){
           stares = 5
           }else if(points == 2){
           stares = 3
           }else if(points == 1){
           stares = 1
           }else if(points == 0){
           stares = 0
           }
           
           var stareline = document.getElementById("stare-line");
           stareline.innerHTML = ""
           for(i=0;i<5;i++){
              if(i<stares){
               stareline.innerHTML += "<li><img src=\"images/stare.png\" class=\"img-responsive inline-block animated flip \" style=\" animation-delay: " + (i*0.2+1) + "s; \"></li>"
                 }else{
                    stareline.innerHTML += "<li><img src=\"images/stare-white.png\" class=\"img-responsive inline-block animated fadeIn \" style=\" animation-delay: " + (i*0.2+1.5) + "s; \"></li>"
                }
           
           }
           
           document.getElementById("stockImg").innerHTML = ""
           
           //長條圖
           var w = 500, h = 250, padding = 30, barMargin = 120;
           var stockData = [Math.round(sharpe*100)/100,
                            Math.round(avg*100)/100,
                            Math.round(sd*100)/100]
           
           stockData2 = [{c:"夏普" , n:Math.round(sharpe*100)/100},
                         {c:"ROE" , n:Math.round(avg*100)/100},
                         {c:"浮動度" , n:Math.round(sd*100)/100}]
           
           //這個函示可以取得資料的最大值、最小值
           var Ymax = d3.max(stockData, function(d){return d}),
           Ymin = d3.min(stockData, function(d){return d})
           
           //輸出的範圍是左邊的padd距離，到右邊的padding
           var xScale = d3.scaleLinear() //產生一個屬於X軸的線性尺度
           .domain([0, stockData.length]) //傳入的值改為資料的數量
           .range([padding , w - padding])
           
           //類似X軸的尺度
           var yScale = d3.scaleLinear()
           .domain([Ymin, Ymax])
           .range([30, h - 30])
           
           //算出每一個bar的寬度
           var barWidth = (w - padding*2) / stockData.length - barMargin;
           
           
           var s = d3.select('#stockImg').append('svg').attr("width",w).attr("height",h);
           
           console.log("dadata")

           var imgText = ["夏普","ROE ","浮動度"]
           
           s.selectAll('rect')
           .data(stockData)
           .enter()
           .append('rect')
           .attr('fill','#09c')
           .attr('width',barWidth + padding)
           .attr('height',0)
           .attr('x',function(d, i){return xScale(i) + barWidth +10})
           .attr('y',h)
           .transition()
           .duration(1500)
           .delay(500)
           .attr('height',function(d){return yScale(d)})
           .attr('y',function(d){return h - yScale(d)});
           
           
           s.selectAll('text').data(stockData2).enter() //補上資料數值
           .append('text')
           .text(function(d){return (d.c+d.n)}) //將值寫到SVG上
           .attr('fill','black')
           .attr('x',function(d, i){return xScale(i) + barWidth/2 + barWidth + 24})
           .attr('y',h)
           .attr('text-anchor','middle')
           .attr('font-size','15px')
           .transition()
           .duration(1500)
           .delay(300)
           .attr('y',function(d){return h - yScale(d.n) -10})
           
           
           
           
           
           
           //document.getElementById("healthResult").style.display = "block"
           
           })
    
    
    var q = d3.queue()
    
    for(i=0;i<datalist.length;i++){
        q.defer(d3.csv, tech + datalist[i] +".txt")
    }
    q.await(processData);
    
    //取得所有資料
    function processData(error, data1, data2, data3, data4, data5, data6, data7, data8, data9, data10, data11, data12, data13, data14, data15, data16) {
        var datas = [data1, data2, data3, data4, data5, data6, data7, data8, data9, data10, data11, data12, data13, data14, data15, data16]
        var dataValues = []
        
        for(u=0;u<datas.length;u++){
            console.log("u",u)
            var x = datas[u][stock_i];
            var avg = 0
            
            for (i=2012;i<=2015; i++){
                
                var sum = parseInt(x[i+"Q1"])+ parseInt(x[i+"Q2"])+parseInt(x[i+"Q3"])+parseInt(x[i+"Q4"])
                avg  += parseInt(sum);
                
                
            }
            var sum = parseInt(x["2016Q1"])+parseInt(x["2016Q2"])+parseInt(x["2016Q3"])
            avg  += parseInt(sum);
            
            console.log("sum",avg)
            avg = Math.round((avg/19)*100)/100
            
            dataValues.push(avg)
            
        }
        
        console.log(dataValues)
        
        var stockTbody = document.getElementById("stockTbody")
        stockTbody.innerHTML = ""
        
        for(i=0;i<datalist.length/2;i++){
            var sData = document.createElement("tr")
            var sName1 = document.createElement("td")
            sName1.innerHTML = display(datalist[i*2])
            var sName2 = document.createElement("td")
            sName2.innerHTML = display(datalist[i*2+1])
            var sNum1 = document.createElement("td")
            sNum1.innerHTML = dataValues[i*2]
            var sNum2 = document.createElement("td")
            sNum2.innerHTML = dataValues[i*2+1]
            
            sData.appendChild(sName1)
            sData.appendChild(sNum1)
            sData.appendChild(sName2)
            sData.appendChild(sNum2)
            stockTbody.appendChild(sData)
            
        }
        
        
    }
    
    $('html,body').animate({scrollTop:$('#stockexam').offset().top},1000);
    if($('#healthResult').is(":visible")){
        $('#healthResult').fadeOut(500);
        $('#healthResult').fadeIn(1500);
    }else{
        $('#healthResult').fadeIn(2000);
    }
    //$('#healthResult').fadeIn(2000);
    
    
}




////取得所有指數
//function getData(){
//    tech = "https://cocoflyliu.github.io/stock_crawler/data/"
//    var ss = document.getElementById("stockIndex")
//    var stockIndex = ss.value
//    var a = []
//    
//    var stock_i = 0;
//    
//    path = tech + "EPS" + ".txt";
//    
//    
//    d3.csv(path,function(data){
//           
//           for(i=0;i<data.length;i++){
//           if(data[i]["index"] == stockIndex){
//           stock_i = i;
//           break;
//           }
//           }
//           
//           
//           
//           
//           
//    })
//    
//    for(i=0;i<datalist.length;i++){
//        
//        path = tech + datalist[i] + ".txt";
//        var typetype = datalist[i];
//        //alert(datalist[i]);
//        
//        d3.csv( path,function(data){
//               
//               var x = data[stock_i];
//               var resultxx = document.getElementById("resultx");
//               var kkk = document.createElement("p");
//               kkk.innerHTML=x["2012Q1"];
//               resultxx.appendChild(kkk);
//               dataResult.push(x["2012Q1"]);
//               if(dataResult.length == 16){
//               console.log(dataResult);
//               }
//               })
//    }
//    
//}



function isNum(){
    if( isNaN(parseFloat(f1.text1.value))&&f1.text1.value!="" ){
        alert("請輸入數字!")
    }else if( isNaN(parseFloat(f2.text2.value))&&f2.text2.value!="" ){
        alert("請輸入數字!")
    }else if( isNaN(parseFloat(f3.text3.value))&&f3.text3.value!="" ){
        alert("請輸入數字!")
    }else if( isNaN(parseFloat(f4.text4.value))&&f4.text4.value!="" ){
        alert("請輸入數字!")
    }else{
        $('html,body').animate({scrollTop:$('#resultHere').offset().top-70},800);
        $("#resultHere").fadeOut(1000)
        setTimeout("search()",800)
    }
}


function search(){
    
    //取得表格資料
    testrequest = {target:f1.target1.value, comparison:f1.comparison1.value , data:f1.text1.value, searchable:f1.text1.value!=""}
    testrequest2 = {target:f2.target2.value, comparison:f2.comparison2.value , data:f2.text2.value, searchable:f2.text2.value!=""}
    testrequest3 = {target:f3.target3.value, comparison:f3.comparison3.value , data:f3.text3.value, searchable:f3.text3.value!=""}
    testrequest4 = {target:f4.target4.value, comparison:f4.comparison4.value , data:f4.text4.value, searchable:f4.text4.value!=""}
    
    
    var startYear = parseInt(document.getElementById("startyear").value) + 2011
    var endYear = parseInt( document.getElementById("endyear").value) + 2011
    
    //重建表格
    var ddd =  document.getElementById("table1");
    ddd.removeChild(document.getElementById("tbody1"))
    var fff =document.createElement("tbody")
    fff.setAttribute("id", "tbody1");
    //    fff.setAttribute("border", "1");
    //    fff.setAttribute("width", "100%");
    ddd.appendChild(fff)
    
    //初始化
    outcome = []
    outIndex = []
    outIndex1 = []
    result1 = []
    result2 = []
    result3 = []
    result4 = []
    
    var searchcount = 0
    var seacherNum = []
    
    if(testrequest.searchable == true){
        searchcount += 1
        seacherNum.push(1)
    }
    if(testrequest2.searchable == true){
        searchcount += 1
        seacherNum.push(2)
    }
    if(testrequest3.searchable == true){
        searchcount += 1
        seacherNum.push(3)
    }
    if(testrequest4.searchable == true){
        searchcount += 1
        seacherNum.push(4)
    }
    
    if (searchcount > 0){
        
        
        
        //取得資料
        var q = d3.queue()
        q.defer(d3.csv, getURL(testrequest) )
        .defer(d3.csv, getURL(testrequest2) )
        .defer(d3.csv, getURL(testrequest3) )
        .defer(d3.csv, getURL(testrequest4) )
        .await(processData);
        
        
        function processData(error, data1, data2, data3, data4) {
            // do something with the data
            console.log("Data1", data1);
            console.log("Data2", data2);
            console.log("Data3", data3);
            console.log("Data4", data3);
            
            
            //Result1
            if(testrequest.searchable == true){
                var k ;
                
                for(k=0; k<data1.length; k++){
                    var x= data1[k];
                    
                    var summary =0;
                    
                    var i;
                    //the function for endyear=2016
                    if(parseInt(endYear) > 2015){
                        for (i=parseInt(startYear);i<=2015; i++){
                            
                            var sum = parseInt(x[i+"Q1"])+ parseInt(x[i+"Q2"])+parseInt(x[i+"Q3"])+parseInt(x[i+"Q4"])
                            summary  += parseInt(sum);
                        }
                        var value2016 =parseInt(x["2016Q1"])+parseInt(x["2016Q2"])+parseInt(x["2016Q3"])
                        
                        var average = (summary+value2016)/((2015-parseInt(startYear)+1)*4+3)
                    }
                    //the function for endyear is not 2016
                    
                    else{
                        for (i=parseInt(startYear);i<=parseInt(endYear); i++){
                            
                            sum = parseInt(x[i+"Q1"])+ parseInt(x[i+"Q2"])+parseInt(x[i+"Q3"])+parseInt(x[i+"Q4"])
                            
                            summary += parseInt(sum) ;
                        }
                        var average = summary/((parseInt(endYear)-parseInt(startYear)+1)*4)
                        
                    }
                    
                    //function for >,<
                    if (testrequest.comparison == 1){
                        if (average >= testrequest.data ){
                            result1.push({id: parseInt(x["index"]) , companyName:x["company name"], value: average})
                        }
                        
                    }
                    else if (testrequest.comparison ==2){
                        if (average <= testrequest.data){
                            result1.push({id: parseInt(x["index"]) ,companyName:x["company name"], value: average})
                        }
                    }
                }
                console.log("result1",result1)
            }
            
            
            
            //Result2
            if(testrequest2.searchable == true){
                var k ;
                
                for(k=0; k<data2.length; k++){
                    var x= data2[k];
                    
                    var summary =0;
                    
                    var i;
                    //the function for endyear=2016
                    if(parseInt(endYear) > 2015){
                        for (i=parseInt(startYear);i<=2015; i++){
                            
                            var sum = parseInt(x[i+"Q1"])+ parseInt(x[i+"Q2"])+parseInt(x[i+"Q3"])+parseInt(x[i+"Q4"])
                            summary  += parseInt(sum);
                        }
                        var value2016 =parseInt(x["2016Q1"])+parseInt(x["2016Q2"])+parseInt(x["2016Q3"])
                        
                        var average = (summary+value2016)/((2015-parseInt(startYear)+1)*4+3)
                    }
                    //the function for endyear is not 2016
                    
                    else{
                        for (i=parseInt(startYear);i<=parseInt(endYear); i++){
                            
                            sum = parseInt(x[i+"Q1"])+ parseInt(x[i+"Q2"])+parseInt(x[i+"Q3"])+parseInt(x[i+"Q4"])
                            
                            summary += parseInt(sum) ;
                        }
                        var average = summary/((parseInt(endYear)-parseInt(startYear)+1)*4)
                        
                    }
                    
                    //function for >,<
                    if (testrequest2.comparison == 1){
                        if (average >= testrequest2.data ){
                            result2.push({id: parseInt(x["index"]) , companyName:x["company name"], value: average})
                        }
                        
                    }
                    else if (testrequest2.comparison ==2){
                        if (average <= testrequest2.data){
                            result2.push({id: parseInt(x["index"]) ,companyName:x["company name"], value: average})
                        }
                    }
                }
                console.log("result2",result2)
            }
            
            
            
            //Result3
            if(testrequest3.searchable == true){
                var k ;
                
                for(k=0; k<data3.length; k++){
                    var x= data3[k];
                    
                    var summary =0;
                    
                    var i;
                    //the function for endyear=2016
                    if(parseInt(endYear) > 2015){
                        for (i=parseInt(startYear);i<=2015; i++){
                            
                            var sum = parseInt(x[i+"Q1"])+ parseInt(x[i+"Q2"])+parseInt(x[i+"Q3"])+parseInt(x[i+"Q4"])
                            summary  += parseInt(sum);
                        }
                        var value2016 =parseInt(x["2016Q1"])+parseInt(x["2016Q2"])+parseInt(x["2016Q3"])
                        
                        var average = (summary+value2016)/((2015-parseInt(startYear)+1)*4+3)
                    }
                    //the function for endyear is not 2016
                    
                    else{
                        for (i=parseInt(startYear);i<=parseInt(endYear); i++){
                            
                            sum = parseInt(x[i+"Q1"])+ parseInt(x[i+"Q2"])+parseInt(x[i+"Q3"])+parseInt(x[i+"Q4"])
                            
                            summary += parseInt(sum) ;
                        }
                        var average = summary/((parseInt(endYear)-parseInt(startYear)+1)*4)
                        
                    }
                    
                    //function for >,<
                    if (testrequest3.comparison == 1){
                        if (average >= testrequest3.data ){
                            result3.push({id: parseInt(x["index"]) , companyName:x["company name"], value: average})
                        }
                        
                    }
                    else if (testrequest3.comparison ==2){
                        if (average <= testrequest3.data){
                            result3.push({id: parseInt(x["index"]) ,companyName:x["company name"], value: average})
                        }
                    }
                }
                console.log("result3",result3)
            }
            
            
            
            //Result4
            if(testrequest4.searchable == true){
                var k ;
                
                for(k=0; k<data4.length; k++){
                    var x= data4[k];
                    
                    var summary =0;
                    
                    var i;
                    //the function for endyear=2016
                    if(parseInt(endYear) > 2015){
                        for (i=parseInt(startYear);i<=2015; i++){
                            
                            var sum = parseInt(x[i+"Q1"])+ parseInt(x[i+"Q2"])+parseInt(x[i+"Q3"])+parseInt(x[i+"Q4"])
                            summary  += parseInt(sum);
                        }
                        var value2016 =parseInt(x["2016Q1"])+parseInt(x["2016Q2"])+parseInt(x["2016Q3"])
                        
                        var average = (summary+value2016)/((2015-parseInt(startYear)+1)*4+3)
                    }
                    //the function for endyear is not 2016
                    
                    else{
                        for (i=parseInt(startYear);i<=parseInt(endYear); i++){
                            
                            sum = parseInt(x[i+"Q1"])+ parseInt(x[i+"Q2"])+parseInt(x[i+"Q3"])+parseInt(x[i+"Q4"])
                            
                            summary += parseInt(sum) ;
                        }
                        var average = summary/((parseInt(endYear)-parseInt(startYear)+1)*4)
                        
                    }
                    
                    //function for >,<
                    if (testrequest4.comparison == 1){
                        if (average >= testrequest4.data ){
                            result4.push({id: parseInt(x["index"]) , companyName:x["company name"], value: average})
                        }
                        
                    }
                    else if (testrequest4.comparison ==2){
                        if (average <= testrequest4.data){
                            result4.push({id: parseInt(x["index"]) ,companyName:x["company name"], value: average})
                        }
                    }
                }
                console.log("result4",result4)
            }
            
            outIndex1 = []
            
            for(r=1100;r<10000;r++){
                outIndex1[r] = 0
            }
            
            if(testrequest.searchable==true){
                for(r=0;r<result1.length;r++){
                    if(result1[r].id<10000){
                        outIndex1[result1[r].id] += 1
                    }
                }
            }
            if(testrequest2.searchable==true){
                for(r=0;r<result2.length;r++){
                    if(result2[r].id<10000){
                        outIndex1[result2[r].id] += 1
                    }
                }
            }
            if(testrequest3.searchable==true){
                for(r=0;r<result3.length;r++){
                    if(result3[r].id<10000){
                        outIndex1[result3[r].id] += 1
                    }
                }
            }
            if(testrequest4.searchable==true){
                for(r=0;r<result4.length;r++){
                    if(result4[r].id<10000){
                        outIndex1[result4[r].id] += 1
                    }
                }
            }
            
            console.log("outIndex1",outIndex1)
            
            for(r=0;r<outIndex1.length;r++){
                if(outIndex1[r]>=searchcount){
                    outIndex.push(r)
                }
            }
            
            console.log("outIndex",outIndex)
            
            for(hh=0;hh<outIndex.length;hh++){
                var id = outIndex[hh]
                var companyName = ""
                var value1 = 0
                var value2 = 0
                var value3 = 0
                var value4 = 0
                //console.log("result1.count",result1.length)
                for(ee=0;ee<result1.length;ee++){
                    if(result1[ee].id == id){
                        companyName = result1[ee].companyName
                        value1 = result1[ee].value
                    }
                }
                for(ee=0;ee<result2.length;ee++){
                    if(result2[ee].id == id){
                        companyName = result2[ee].companyName
                        value2 = result2[ee].value
                    }
                }
                for(ee=0;ee<result3.length;ee++){
                    if(result3[ee].id == id){
                        companyName = result3[ee].companyName
                        value3 = result3[ee].value
                    }
                }
                for(ee=0;ee<result4.length;ee++){
                    if(result4[ee].id == id){
                        companyName = result4[ee].companyName
                        value4 = result4[ee].value
                    }
                }
                outcome.push({id: id, companyName: companyName, value1: value1, value2: value2, value3: value3, value4})
                
            }
            console.log("outcome",outcome)
            
            //名稱與號碼
            var firstRow = document.createElement("tr")
            var stockNumber = document.createElement("th")
            stockNumber.innerHTML = "股票代號"
            var stockName = document.createElement("th")
            stockName.innerHTML = "公司名稱"
            firstRow.appendChild(stockNumber)
            firstRow.appendChild(stockName)
            
            //數值
            if(testrequest.searchable == true){
                var dataValue = document.createElement("th")
                dataValue.innerHTML = display(testrequest["target"])
                firstRow.appendChild(dataValue)
            }
            if(testrequest2.searchable == true){
                var dataValue = document.createElement("th")
                dataValue.innerHTML = display(testrequest2["target"])
                firstRow.appendChild(dataValue)
            }
            if(testrequest3.searchable == true){
                var dataValue = document.createElement("th")
                dataValue.innerHTML = display(testrequest3["target"])
                firstRow.appendChild(dataValue)
            }
            if(testrequest4.searchable == true){
                var dataValue = document.createElement("th")
                dataValue.innerHTML = display(testrequest4["target"])
                firstRow.appendChild(dataValue)
            }
            var title = document.getElementById("thead1")
            title.innerHTML = ""
            title.appendChild(firstRow)
            
            
            for(m=0;m<outcome.length;m++){
                var y =outcome[m]
                var row = document.createElement("tr")
                //row.style.animation-delay = String(m*0.1)+"s"
                //row.setAttribute("class", "wow fadeInRightBig")
                //row.setAttribute("data-wow-delay", String(m*0.1)+"s")
                row.setAttribute("id", "s"+y["id"])
                var num = document.createElement("td")
                num.setAttribute("class", "animated  fadeInLeft")
                num.setAttribute("style", "animation-duration: 1s;animation-delay: "+String(m*0.1)+"s")
                var button = document.createElement("button")
                button.innerHTML = y["id"]
                var alpha = "sentID("+y["id"]+")"
                button.setAttribute("onclick", alpha)
                num.appendChild(button)
                var name = document.createElement("td")
                name.innerHTML = y["companyName"]
                name.setAttribute("class", "animated  zoomInDown")
                name.setAttribute("style", "animation-duration: 1s;animation-delay: "+String(m*0.1+0.5)+"s")
                row.appendChild(num)
                row.appendChild(name)
                
                if(testrequest.searchable == true){
                    var data = document.createElement("td")
                    data.innerHTML = Math.round(y["value1"]*100)/100
                    data.setAttribute("class", "animated  fadeInRight")
                    data.setAttribute("style", "animation-duration: 2s;animation-delay: "+String(m*0.1+1)+"s")
                    row.appendChild(data)
                }
                if(testrequest2.searchable == true){
                    var data = document.createElement("td")
                    data.innerHTML = Math.round(y["value2"]*100)/100
                    data.setAttribute("class", "animated  fadeInRight")
                    data.setAttribute("style", "animation-duration: 2s;animation-delay: "+String(m*0.1+1.5)+"s")
                    row.appendChild(data)
                }
                if(testrequest3.searchable == true){
                    var data = document.createElement("td")
                    data.innerHTML = Math.round(y["value3"]*100)/100
                    data.setAttribute("class", "animated  fadeInRight")
                    data.setAttribute("style", "animation-duration: 2s;animation-delay: "+String(m*0.1+2)+"s")
                    row.appendChild(data)
                }
                if(testrequest4.searchable == true){
                    var data = document.createElement("td")
                    data.innerHTML = Math.round(y["value4"]*100)/100
                    data.setAttribute("class", "animated  fadeInRight")
                    data.setAttribute("style", "animation-duration: 2s;animation-delay: "+String(m*0.1+2.5)+"s")
                    row.appendChild(data)
                }
                
                
                var tit = document.getElementById("tbody1")
                
                tit.appendChild(row);
                
            }
            
            
            $("#resultHere").fadeIn(600)
            
            
        }
        
        
        
        //result1
//        d3.csv( getURL(testrequest),
//               
//               function first(data1){
//               console.log(data1);
//               var k ;
//               
//               for(k=0; k<data1.length; k++){
//               var x= data1[k];
//               
//               var summary =0;
//               
//               var i;
//               //the function for endyear=2016
//               if(parseInt(endYear) > 2015){
//               for (i=parseInt(startYear);i<=2015; i++){
//               
//               var sum = parseInt(x[i+"Q1"])+ parseInt(x[i+"Q2"])+parseInt(x[i+"Q3"])+parseInt(x[i+"Q4"])
//               summary  += parseInt(sum);
//               }
//               var value2016 =parseInt(x["2016Q1"])+parseInt(x["2016Q2"])+parseInt(x["2016Q3"])
//               
//               var average = (summary+value2016)/((2015-parseInt(startYear)+1)*4+3)
//               }
//               //the function for endyear is not 2016
//               
//               else{
//               for (i=parseInt(startYear);i<=parseInt(endYear); i++){
//               
//               sum = parseInt(x[i+"Q1"])+ parseInt(x[i+"Q2"])+parseInt(x[i+"Q3"])+parseInt(x[i+"Q4"])
//               
//               summary += parseInt(sum) ;
//               }
//               var average = summary/((parseInt(endYear)-parseInt(startYear)+1)*4)
//               
//               }
//               
//               //function for >,<
//               if (testrequest.comparison == 1){
//               if (average >= testrequest.data ){
//               result1.push({id: parseInt(x["index"]) , companyName:x["company name"], value: average})
//               }
//               
//               }
//               else if (testrequest.comparison ==2){
//               if (average <= testrequest.data){
//               result1.push({id: parseInt(x["index"]) ,companyName:x["company name"], value: average})
//               }
//               }
//               }
//               console.log(result1)
//               
//               
//               for(i=0; i< result1.length; i++){
//               var r1 = result1[i]
//               outcome.push({id:r1["id"], companyName:r1["companyName"],value1: r1["value"]})}
//               
//               console.log(outcome)
//               var firstRow = document.createElement("tr")
//               var stockNumber = document.createElement("th")
//               stockNumber.innerHTML = "股票代號"
//               var stockName = document.createElement("th")
//               stockName.innerHTML = "公司名稱"
//               var dataValue = document.createElement("th")
//               dataValue.innerHTML = display(testrequest["target"])
//               firstRow.appendChild(stockNumber)
//               firstRow.appendChild(stockName)
//               firstRow.appendChild(dataValue)
//               var title = document.getElementById("thead1")
//               title.innerHTML = ""
//               title.appendChild(firstRow)
//               
//               
//               for(m=0;m<outcome.length;m++){
//               var y =outcome[m]
//               var row = document.createElement("tr")
//               //row.style.animation-delay = String(m*0.1)+"s"
//               //row.setAttribute("class", "wow fadeInRightBig")
//               //row.setAttribute("data-wow-delay", String(m*0.1)+"s")
//               row.setAttribute("id", "s"+y["id"])
//               var num = document.createElement("td")
//               num.setAttribute("class", "animated  fadeInLeft")
//               num.setAttribute("style", "animation-duration: 1s;animation-delay: "+String(m*0.1)+"s")
//               var button = document.createElement("button")
//               button.innerHTML = y["id"]
//               var alpha = "sentID("+y["id"]+")"
//               button.setAttribute("onclick", alpha)
//               num.appendChild(button)
//               var name = document.createElement("td")
//               name.innerHTML = y["companyName"]
//               name.setAttribute("class", "animated  zoomInDown")
//               name.setAttribute("style", "animation-duration: 1s;animation-delay: "+String(m*0.1+0.5)+"s")
//               var data = document.createElement("td")
//               data.innerHTML = Math.round(y["value1"]*100)/100
//               data.setAttribute("class", "animated  fadeInRight")
//               data.setAttribute("style", "animation-duration: 2s;animation-delay: "+String(m*0.1+1)+"s")
//               
//               row.appendChild(num)
//               row.appendChild(name)
//               row.appendChild(data)
//               var tit = document.getElementById("tbody1")
//               
//               tit.appendChild(row);
//               
//               }
//               
//               
//               }
//               
//               )
        
        
    }
}



