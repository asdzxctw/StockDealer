
    var csv = ".txt";
    var dataPath = "https://cocoflyliu.github.io/stock_crawler/data/";
    var f1 = document.getElementById("form1")
    console.log(f1);
    var f2 = document.getElementById("form2")
    var f3 = document.getElementById("form3")
    var f4 = document.getElementById("form4")
    var namePath = dataPath+"name"+csv

    var testrequest = {target:f1.target1.value, comparison:f1.comparison1.value , data:f1.text1.value, searchable:f1.checkValidity()}
    var testrequest2 = {target:f2.target2.value, comparison:f2.comparison2.value , data:f2.text2.value, searchable:f2.checkValidity()}
    var testrequest3 = {target:f3.target3.value, comparison:f3.comparison3.value , data:f3.text3.value, searchable:f3.checkValidity()}
    var testrequest4 = {target:f4.target4.value, comparison:f4.comparison4.value , data:f4.text4.value, searchable:f4.checkValidity()}
    document.getElementById("form1").target1.option

     var result1 = []
     var result2 = []
     var result3 = []
     var result4 = []
     var outcome = []
    
    
    function getURL(request){
        var filename = request.target
        var dataURL = dataPath+filename+csv;
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
    if (testrequest.searchable==true){
        singlestock(ic);
    }
    if (testrequest2.searchable==true){
        singlestock2(ic);
    }
    if (testrequest3.searchable==true){
        singlestock3(ic);
    }
    if (testrequest4.searchable==true){
        singlestock4(ic);
    }
};
    function clear2(){
    document.getElementById("form1").reset();
    document.getElementById("form2").reset();
    document.getElementById("form3").reset();
    document.getElementById("form4").reset();
    var ddd =  document.getElementById("resultHere");
    ddd.removeChild(document.getElementById("mytable2"))
    var fff =document.createElement("div")
    fff.setAttribute("id", "mytable2");
    fff.setAttribute("class", "col-md-12 col-xs-12 ");
    ddd.appendChild(fff)

};

function search(){
    testrequest = {target:f1.target1.value, comparison:f1.comparison1.value , data:f1.text1.value, searchable:f1.text1.value!=""}
    testrequest2 = {target:f2.target2.value, comparison:f2.comparison2.value , data:f2.text2.value, searchable:f2.text2.value!=""}
    testrequest3 = {target:f3.target3.value, comparison:f3.comparison3.value , data:f3.text3.value, searchable:f3.text3.value!=""}
    testrequest4 = {target:f4.target4.value, comparison:f4.comparison4.value , data:f4.text4.value, searchable:f4.text4.value!=""}
    var startYear = parseInt(document.getElementById("startyear").value) + 2011
    var endYear = parseInt( document.getElementById("endyear").value) + 2011
    var ddd =  document.getElementById("resultHere");
    ddd.removeChild(document.getElementById("mytable2"))
    var fff =document.createElement("div")
    fff.setAttribute("id", "mytable2");
    fff.setAttribute("class", "col-md-12 col-xs-12 ");
    ddd.appendChild(fff)
     var outcome = []
     var result1 = []
     var result2 = []
     var result3 = []
     var result4 = []
     if (testrequest.searchable==true){
     //result1   
    d3.csv( getURL(testrequest), 

    function first(data1){
    console.log(data1);
    var k ;
    
    for(k=0; k<data1.length; k++){
        var x= data1[k];
    
    var summary =0
    
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
console.log(result1)

//result2
if(testrequest2.searchable==true){
     d3.csv( getURL(testrequest2), 

    function (data2){
    console.log(data2);
    var k ;
    
    for(k=0; k<data2.length; k++){
        var x= data2[k];
    var summary =0
    
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
                                    result2.push({id: parseInt(x["index"]) ,companyName:x["company name"], value: average})                         }
                            }
                                
}


console.log(result2)

//result3
if(testrequest3.searchable == true){
     d3.csv( getURL(testrequest3), 

    function (data3){
    console.log(data3);
    var k ;
    
    for(k=0; k<data3.length; k++){
        var x= data3[k];
    
    var summary =0
    
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
                                    result3.push({id: parseInt(x["index"]) ,companyName:x["company name"], value: average})                         }
                            }
                                
    
    
    
   
}


console.log(result3)

//result4
if(testrequest4.searchable == true){
     d3.csv( getURL(testrequest4), 

    function (data4){
    console.log(data4);
    var k ;
    
    for(k=0; k<data4.length; k++){
        var x= data4[k];


    var summary =0
    
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
                                    result4.push({id: parseInt(x["index"]) ,companyName:x["company name"], value: average})                         }
                            }
                                
    
    
   
}


console.log(result4)


for (i=0; i< result1.length ; i++){
    var r1 = result1[i]
    for (j=0;j<result2.length;j++){
        var r2 =result2[j]
        if (r1["id"]==r2["id"]){
            for(k=0;k<result3.length; k++){
            var r3 = result3[k]
            if(r1["id"]== r3["id"]){
                for(l=0;l<result4.length;l++){
                    var r4 = result4[l]
                    if(r1["id"]==r4["id"]){
                        outcome.push({id: r1["id"], companyName:r1["companyName"], value1: r1["value"], value2: r2["value"], value3: r3["value"], value4:r4["value"]})

                    }
                }
            }
}
}
}
}
            console.log(outcome)
                     var stockNumber = document.createElement("div")
                     stockNumber.innerHTML = "股票代號";
                     stockNumber.style.backgroundColor = "skyblue"
                     stockNumber.style.textAlign = "center"
                     stockNumber.style.display = "inline-block"
                     stockNumber.style.height = "40px"
                     stockNumber.style.paddingTop = "10px"
                     stockNumber.style.width = "16%"
                     var dataValue = document.createElement("div")
                     dataValue.innerHTML = "公司名稱";
                     dataValue.style.textAlign = "center"
                     dataValue.style.display = "inline-block"
                     dataValue.style.backgroundColor = "skyblue"
                     dataValue.style.height = "40px"
                     dataValue.style.paddingTop = "10px"    
                     dataValue.style.width = "16%"

                     var dataValue2 = document.createElement("div")
                     dataValue2.innerHTML = display(testrequest["target"])
                     dataValue2.style.textAlign = "center"
                     dataValue2.style.display = "inline-block"
                     dataValue2.style.backgroundColor = "skyblue"
                     dataValue2.style.height = "40px"
                     dataValue2.style.paddingTop = "10px"    
                     dataValue2.style.width = "16%"

                     var dataValue3 = document.createElement("div")
                     dataValue3.innerHTML = display(testrequest2["target"])
                     dataValue3.style.textAlign = "center"
                     dataValue3.style.display = "inline-block"
                     dataValue3.style.backgroundColor = "skyblue"
                     dataValue3.style.height = "40px"
                     dataValue3.style.paddingTop = "10px"    
                     dataValue3.style.width = "16%"

                     var dataValue4 = document.createElement("div")
                     dataValue4.innerHTML = display(testrequest3["target"])
                     dataValue4.style.textAlign = "center"
                     dataValue4.style.display = "inline-block"
                     dataValue4.style.backgroundColor = "skyblue"
                     dataValue4.style.height = "40px"
                     dataValue4.style.paddingTop = "10px"    
                     dataValue4.style.width = "16%"

                     var dataValue5 = document.createElement("div")
                     dataValue5.innerHTML = display(testrequest4["target"])
                     dataValue5.style.textAlign = "center"
                     dataValue5.style.display = "inline-block"
                     dataValue5.style.backgroundColor = "skyblue"
                     dataValue5.style.height = "40px"
                     dataValue5.style.paddingTop = "10px"    
                     dataValue5.style.width = "16%"
                     var title = document.getElementById("mytable2")
                     title.appendChild(stockNumber)
                     title.appendChild(dataValue)
                     title.appendChild(dataValue2)
                     title.appendChild(dataValue3)
                     title.appendChild(dataValue4)
                     title.appendChild(dataValue5)

                    for(m=0;m<outcome.length;m++){
                     // alert("hi");
                     var y = outcome[m]
                     var divId = "s"+y["id"]
                     var bigDiv = document.createElement("div")
                     bigDiv.setAttribute("id", divId);
                     var containerDiv = document.getElementById("mytable2")
                     containerDiv.appendChild(bigDiv)
                     bigDiv.style.width = "100%"
                    }

                    for(n=0;n<outcome.length;n++){
                    var y = outcome[n]
                     var newDiv = document.createElement("button"); 
                     var alpha = "sentID("+y["id"]+")";
                     newDiv.setAttribute("onclick", alpha) ;                    
                     newDiv.style.backgroundColor = "Gainsboro";
                     newDiv.style. width = "16%"
                     newDiv.style.textAlign = "center"
                     newDiv.style.borderStyle = "solid"
                     newDiv.style.borderWidth = "1px"
                     newDiv.style.height = "100%"

                     var demo = document.getElementById("s"+y["id"]);

                     demo.appendChild(newDiv);
                      var newContent = document.createTextNode(y["id"]); 
                      newDiv.appendChild(newContent);
                      var currentDiv = document.getElementById("div"); 
                      demo.insertBefore(newDiv, currentDiv);
                      demo.style.display = "inline-block";
                      //value1 display
                    var newDiv2 =document.createElement("button")
                    newDiv2.style.backgroundColor="papayawhip"
                    newDiv2.style.width = "16%"
                    newDiv2.style.textAlign = "center"
                    newDiv2.style.borderStyle = "solid";
                    newDiv2.style.borderWidth = "1px";
                    newDiv2.style.height = "100%"
                    var demo2 = document.getElementById("s"+y["id"])
                    demo2.appendChild(newDiv2);
                    var newContent2 = document.createTextNode(y["companyName"])
                    newDiv2.appendChild(newContent2);
                    var currentDiv2 = document.getElementById("div");
                    demo2.insertBefore(newDiv2, currentDiv2);   
                    demo2.style.display = "inline-block";

                     var newDiv3 =document.createElement("button")
                    newDiv3.style.backgroundColor="papayawhip"
                    newDiv3.style.width = "16%"
                    newDiv3.style.textAlign = "center"
                    newDiv3.style.borderStyle = "solid";
                    newDiv3.style.borderWidth = "1px";
                    newDiv3.style.height = "100%"
                    var demo3 = document.getElementById("s"+y["id"])
                    demo3.appendChild(newDiv3);
                    var newContent3 = document.createTextNode(Math.round(y["value1"]*100)/100)
                    newDiv3.appendChild(newContent3);
                    var currentDiv3 = document.getElementById("div");
                    demo3.insertBefore(newDiv3, currentDiv3);   
                    demo3.style.display = "inline-block";

                    var newDiv4 =document.createElement("button")
                    newDiv4.style.backgroundColor="papayawhip"
                    newDiv4.style.width = "16%"
                    newDiv4.style.textAlign = "center"
                    newDiv4.style.borderStyle = "solid";
                    newDiv4.style.borderWidth = "1px";
                    newDiv4.style.height = "100%"
                    var demo4 = document.getElementById("s"+y["id"])
                    demo4.appendChild(newDiv4);
                    var newContent4 = document.createTextNode(Math.round(y["value2"]*100)/100)
                    newDiv4.appendChild(newContent4);
                    var currentDiv4 = document.getElementById("div");
                    demo4.insertBefore(newDiv4, currentDiv4);   
                    demo4.style.display = "inline-block";

                    var newDiv5 =document.createElement("button")
                    newDiv5.style.backgroundColor="papayawhip"
                    newDiv5.style.width = "16%"
                    newDiv5.style.textAlign = "center"
                    newDiv5.style.borderStyle = "solid";
                    newDiv5.style.borderWidth = "1px";
                    newDiv5.style.height = "100%"
                    var demo5 = document.getElementById("s"+y["id"])
                    demo5.appendChild(newDiv5);
                    var newContent5 = document.createTextNode(Math.round(y["value3"]*100)/100)
                    newDiv5.appendChild(newContent5);
                    var currentDiv5 = document.getElementById("div");
                    demo5.insertBefore(newDiv5, currentDiv5);   
                    demo5.style.display = "inline-block";

                    var newDiv6 =document.createElement("button")
                    newDiv6.style.backgroundColor="papayawhip"
                    newDiv6.style.width = "16%"
                    newDiv6.style.textAlign = "center"
                    newDiv6.style.borderStyle = "solid";
                    newDiv6.style.borderWidth = "1px";
                    newDiv6.style.height = "100%"
                    var demo6 = document.getElementById("s"+y["id"])
                    demo6.appendChild(newDiv6);
                    var newContent6 = document.createTextNode(Math.round(y["value4"]*100)/100)
                    newDiv6.appendChild(newContent6);
                    var currentDiv6 = document.getElementById("div");
                    demo6.insertBefore(newDiv6, currentDiv6);   
                    demo6.style.display = "inline-block";                   

                    }

}

)


}
//if result4.searchable ==0
else{
    for (i=0; i< result1.length ; i++){
    var r1 = result1[i]
    for (j=0;j<result2.length;j++){
        var r2 =result2[j]
        if (r1["id"]==r2["id"]){
            for(k=0;k<result3.length; k++){
            var r3 = result3[k]
            if(r1["id"]== r3["id"]){
                 outcome.push({id:r1["id"], companyName:r1["companyName"] ,value1:r1["value"], value2:r2["value"], value3:r3["value"]})

            }
            }
        }
        }
        }
                    console.log(outcome)
                     var stockNumber = document.createElement("div")
                     stockNumber.innerHTML = "股票代號";
                     stockNumber.style.backgroundColor = "skyblue"
                     stockNumber.style.textAlign = "center"
                     stockNumber.style.display = "inline-block"
                     stockNumber.style.height = "40px"
                     stockNumber.style.paddingTop = "10px"
                     stockNumber.style.width = "20%"
                     var dataValue = document.createElement("div")
                     dataValue.innerHTML = "公司名稱";
                     dataValue.style.textAlign = "center"
                     dataValue.style.display = "inline-block"
                     dataValue.style.backgroundColor = "skyblue"
                     dataValue.style.height = "40px"
                     dataValue.style.paddingTop = "10px"    
                     dataValue.style.width = "20%"

                     var dataValue2 = document.createElement("div")
                     dataValue2.innerHTML = display(testrequest["target"])
                     dataValue2.style.textAlign = "center"
                     dataValue2.style.display = "inline-block"
                     dataValue2.style.backgroundColor = "skyblue"
                     dataValue2.style.height = "40px"
                     dataValue2.style.paddingTop = "10px"    
                     dataValue2.style.width = "20%"

                     var dataValue3 = document.createElement("div")
                     dataValue3.innerHTML = display(testrequest2["target"])
                     dataValue3.style.textAlign = "center"
                     dataValue3.style.display = "inline-block"
                     dataValue3.style.backgroundColor = "skyblue"
                     dataValue3.style.height = "40px"
                     dataValue3.style.paddingTop = "10px"    
                     dataValue3.style.width = "20%"

                     var dataValue4 = document.createElement("div")
                     dataValue4.innerHTML = display(testrequest3["target"])
                     dataValue4.style.textAlign = "center"
                     dataValue4.style.display = "inline-block"
                     dataValue4.style.backgroundColor = "skyblue"
                     dataValue4.style.height = "40px"
                     dataValue4.style.paddingTop = "10px"    
                     dataValue4.style.width = "20%"

                     var title = document.getElementById("mytable2")
                     title.appendChild(stockNumber)
                     title.appendChild(dataValue)
                     title.appendChild(dataValue2)
                     title.appendChild(dataValue3)
                     title.appendChild(dataValue4)

            for(m=0;m<outcome.length;m++){
                     // alert("hi");
                     var y = outcome[m]
                     var divId = "s"+y["id"]
                     var bigDiv = document.createElement("div")
                     bigDiv.setAttribute("id", divId);
                     var containerDiv = document.getElementById("mytable2")
                     containerDiv.appendChild(bigDiv)
                     bigDiv.style.width = "100%"
                    }

                    for(n=0;n<outcome.length;n++){
                    var y = outcome[n]
                     var newDiv = document.createElement("button"); 
                     var alpha = "sentID("+y["id"]+")";
                     newDiv.setAttribute("onclick", alpha);                     
                     newDiv.style.backgroundColor = "Gainsboro";
                     newDiv.style. width = "20%"
                     newDiv.style.textAlign = "center"
                     newDiv.style.borderStyle = "solid"
                     newDiv.style.borderWidth = "1px"
                     newDiv.style.height = "100%"

                     var demo = document.getElementById("s"+y["id"]);

                     demo.appendChild(newDiv);
                      var newContent = document.createTextNode(y["id"]); 
                      newDiv.appendChild(newContent);
                      var currentDiv = document.getElementById("div"); 
                      demo.insertBefore(newDiv, currentDiv);
                      demo.style.display = "inline-block";
                      //value1 display
                    var newDiv2 =document.createElement("button")
                    newDiv2.style.backgroundColor="papayawhip"
                    newDiv2.style.width = "20%"
                    newDiv2.style.textAlign = "center"
                    newDiv2.style.borderStyle = "solid";
                    newDiv2.style.borderWidth = "1px";
                    newDiv2.style.height = "100%"
                    var demo2 = document.getElementById("s"+y["id"])
                    demo2.appendChild(newDiv2);
                    var newContent2 = document.createTextNode(y["companyName"])
                    newDiv2.appendChild(newContent2);
                    var currentDiv2 = document.getElementById("div");
                    demo2.insertBefore(newDiv2, currentDiv2);   
                    demo2.style.display = "inline-block";

                     var newDiv3 =document.createElement("button")
                    newDiv3.style.backgroundColor="papayawhip"
                    newDiv3.style.width = "20%"
                    newDiv3.style.textAlign = "center"
                    newDiv3.style.borderStyle = "solid";
                    newDiv3.style.borderWidth = "1px";
                    newDiv3.style.height = "100%"
                    var demo3 = document.getElementById("s"+y["id"])
                    demo3.appendChild(newDiv3);
                    var newContent3 = document.createTextNode(Math.round(y["value1"]*100)/100)
                    newDiv3.appendChild(newContent3);
                    var currentDiv3 = document.getElementById("div");
                    demo3.insertBefore(newDiv3, currentDiv3);   
                    demo3.style.display = "inline-block";

                    var newDiv4 =document.createElement("button")
                    newDiv4.style.backgroundColor="papayawhip"
                    newDiv4.style.width = "20%"
                    newDiv4.style.textAlign = "center"
                    newDiv4.style.borderStyle = "solid";
                    newDiv4.style.borderWidth = "1px";
                    newDiv4.style.height = "100%"
                    var demo4 = document.getElementById("s"+y["id"])
                    demo4.appendChild(newDiv4);
                    var newContent4 = document.createTextNode(Math.round(y["value2"]*100)/100)
                    newDiv4.appendChild(newContent4);
                    var currentDiv4 = document.getElementById("div");
                    demo4.insertBefore(newDiv4, currentDiv4);   
                    demo4.style.display = "inline-block";

                    var newDiv5 =document.createElement("button")
                    newDiv5.style.backgroundColor="papayawhip"
                    newDiv5.style.width = "20%"
                    newDiv5.style.textAlign = "center"
                    newDiv5.style.borderStyle = "solid";
                    newDiv5.style.borderWidth = "1px";
                    newDiv5.style.height = "100%"
                    var demo5 = document.getElementById("s"+y["id"])
                    demo5.appendChild(newDiv5);
                    var newContent5 = document.createTextNode(Math.round(y["value3"]*100)/100)
                    newDiv5.appendChild(newContent5);
                    var currentDiv5 = document.getElementById("div");
                    demo5.insertBefore(newDiv5, currentDiv5);   
                    demo5.style.display = "inline-block";
                }


}

}

)
}
// if result3.searchable == 0
else{
    for (i=0; i< result1.length ; i++){
    var r1 = result1[i]
    for (j=0;j<result2.length;j++){
        var r2 =result2[j]
        if (r1["id"]==r2["id"]){
            outcome.push({id:r1["id"], companyName:r1["companyName"], value1: r1["value"],value2: r2["value"]})
        }
        }
        }
                    console.log(outcome)
                     var stockNumber = document.createElement("div")
                     stockNumber.innerHTML = "股票代號";
                     stockNumber.style.backgroundColor = "skyblue"
                     stockNumber.style.textAlign = "center"
                     stockNumber.style.display = "inline-block"
                     stockNumber.style.height = "40px"
                     stockNumber.style.paddingTop = "10px"
                     stockNumber.style.width = "25%"
                     var dataValue = document.createElement("div")
                     dataValue.innerHTML = "公司名稱";
                     dataValue.style.textAlign = "center"
                     dataValue.style.display = "inline-block"
                     dataValue.style.backgroundColor = "skyblue"
                     dataValue.style.height = "40px"
                     dataValue.style.paddingTop = "10px"    
                     dataValue.style.width = "25%"

                     var dataValue2 = document.createElement("div")
                     dataValue2.innerHTML = display(testrequest["target"])
                     dataValue2.style.textAlign = "center"
                     dataValue2.style.display = "inline-block"
                     dataValue2.style.backgroundColor = "skyblue"
                     dataValue2.style.height = "40px"
                     dataValue2.style.paddingTop = "10px"    
                     dataValue2.style.width = "25%"

                     var dataValue3 = document.createElement("div")
                     dataValue3.innerHTML = display(testrequest2["target"])
                     dataValue3.style.textAlign = "center"
                     dataValue3.style.display = "inline-block"
                     dataValue3.style.backgroundColor = "skyblue"
                     dataValue3.style.height = "40px"
                     dataValue3.style.paddingTop = "10px"    
                     dataValue3.style.width = "25%"

                     var title = document.getElementById("mytable2")
                     title.appendChild(stockNumber)
                     title.appendChild(dataValue)
                     title.appendChild(dataValue2)
                     title.appendChild(dataValue3)

                   for(m=0;m<outcome.length;m++){
                     // alert("hi");
                     var y = outcome[m]
                     var divId = "s"+y["id"]
                     var bigDiv = document.createElement("div")
                     bigDiv.setAttribute("id", divId);
                     var containerDiv = document.getElementById("mytable2")
                     containerDiv.appendChild(bigDiv)
                     bigDiv.style.width = "100%"
                    }

                    for(n=0;n<outcome.length;n++){
                    var y = outcome[n]
                     var newDiv = document.createElement("button"); 
                     var alpha = "sentID("+y["id"]+")"
                     newDiv.setAttribute("onclick", alpha)                    
                     newDiv.style.backgroundColor = "Gainsboro";
                     newDiv.style. width = "25%"
                     newDiv.style.textAlign = "center"
                     newDiv.style.borderStyle = "solid"
                     newDiv.style.borderWidth = "1px"
                     newDiv.style.height = "25%"
                     newDiv.style.display = "inline-block"
                     var demo = document.getElementById("s"+y["id"]);

                     demo.appendChild(newDiv);
                      var newContent = document.createTextNode(y["id"]); 
                      newDiv.appendChild(newContent);
                      var currentDiv = document.getElementById("div"); 
                      demo.insertBefore(newDiv, currentDiv);
                      //value1 display
                    var newDiv2 =document.createElement("button")
                    newDiv2.style.backgroundColor="papayawhip"
                    newDiv2.style.width = "25%"
                    newDiv2.style.textAlign = "center"
                    newDiv2.style.borderStyle = "solid";
                    newDiv2.style.borderWidth = "1px";
                    newDiv2.style.height = "25%"
                    newDiv2.style.display = "inline-block"

                    var demo2 = document.getElementById("s"+y["id"])
                    demo2.appendChild(newDiv2);
                    var newContent2 = document.createTextNode(y["companyName"])
                    newDiv2.appendChild(newContent2);
                    var currentDiv2 = document.getElementById("div");
                    demo2.insertBefore(newDiv2, currentDiv2);   

                     var newDiv3 =document.createElement("button")
                    newDiv3.style.backgroundColor="papayawhip"
                    newDiv3.style.width = "25%"
                    newDiv3.style.textAlign = "center"
                    newDiv3.style.borderStyle = "solid";
                    newDiv3.style.borderWidth = "1px";
                    newDiv3.style.height = "25%"
                    newDiv3.style.display = "inline-block"
                    var demo3 = document.getElementById("s"+y["id"])
                    demo3.appendChild(newDiv3);
                    var newContent3 = document.createTextNode(Math.round(y["value1"]*100)/100)
                    newDiv3.appendChild(newContent3);
                    var currentDiv3 = document.getElementById("div");
                    demo3.insertBefore(newDiv3, currentDiv3);   

                    var newDiv4 =document.createElement("button")
                    newDiv4.style.backgroundColor="papayawhip"
                    newDiv4.style.width = "25%"
                    newDiv4.style.textAlign = "center"
                    newDiv4.style.borderStyle = "solid";
                    newDiv4.style.borderWidth = "1px";
                    newDiv4.style.height = "25%"
                    newDiv4.style.display = "inline-block"
                    var demo4 = document.getElementById("s"+y["id"])
                    demo4.appendChild(newDiv4);
                    var newContent4 = document.createTextNode(Math.round(y["value2"]*100)/100)
                    newDiv4.appendChild(newContent4);
                    var currentDiv4 = document.getElementById("div");
                    demo4.insertBefore(newDiv4, currentDiv4);   
                }
}
}
)
}

//if result2.searchable ==0
else{
    for(i=0; i< result1.length; i++){
            var r1 = result1[i]
    outcome.push({id:r1["id"], companyName:r1["companyName"],value1: r1["value"]})

}
            console.log(outcome)
                     var stockNumber = document.createElement("div")
                     stockNumber.innerHTML = "股票代號";
                     stockNumber.style.backgroundColor = "skyblue"
                     stockNumber.style.textAlign = "center"
                     stockNumber.style.display = "inline-block"
                     stockNumber.style.height = "40px"
                     stockNumber.style.paddingTop = "10px"
                     stockNumber.style.width = "33%"
                     var dataValue = document.createElement("div")
                     dataValue.innerHTML = "公司名稱";
                     dataValue.style.textAlign = "center"
                     dataValue.style.display = "inline-block"
                     dataValue.style.backgroundColor = "skyblue"
                     dataValue.style.height = "40px"
                     dataValue.style.paddingTop = "10px"    
                     dataValue.style.width = "33%"

                     var dataValue2 = document.createElement("div")
                     dataValue2.innerHTML = display(testrequest["target"])
                     dataValue2.style.textAlign = "center"
                     dataValue2.style.display = "inline-block"
                     dataValue2.style.backgroundColor = "skyblue"
                     dataValue2.style.height = "40px"
                     dataValue2.style.paddingTop = "10px"    
                     dataValue2.style.width = "33%"



                     var title = document.getElementById("mytable2")
                     title.appendChild(stockNumber)
                     title.appendChild(dataValue)
                     title.appendChild(dataValue2)

                   for(m=0;m<outcome.length;m++){
                     // alert("hi");
                     var y = outcome[m]
                     var divId = "s"+y["id"]
                     var bigDiv = document.createElement("div")
                     bigDiv.setAttribute("id", divId);
                     var containerDiv = document.getElementById("mytable2")
                     containerDiv.appendChild(bigDiv)
                     bigDiv.style.width = "100%"
                    }

                    for(n=0;n<outcome.length;n++){
                    var y = outcome[n]
                     var newDiv = document.createElement("button"); 
                     newDiv.style.backgroundColor = "Gainsboro";

                     var alpha = "sentID("+y["id"]+")"

                     newDiv.setAttribute("onclick", alpha)

                     newDiv.style. width = "33%"
                     newDiv.style.textAlign = "center"
                     newDiv.style.borderStyle = "solid"
                     newDiv.style.borderWidth = "1px"
                     newDiv.style.height = "33%"
                     newDiv.style.display = "inline-block"
                     var demo = document.getElementById("s"+y["id"]);

                     demo.appendChild(newDiv);
                      var newContent = document.createTextNode(y["id"]); 
                      newDiv.appendChild(newContent);
                      var currentDiv = document.getElementById("div"); 
                      demo.insertBefore(newDiv, currentDiv);
                      //value1 display
                    var newDiv2 =document.createElement("button")
                    newDiv2.style.backgroundColor="papayawhip"
                    newDiv2.style.width = "33%"
                    newDiv2.style.textAlign = "center"
                    newDiv2.style.borderStyle = "solid";
                    newDiv2.style.borderWidth = "1px";
                    newDiv2.style.height = "33%"
                    newDiv2.style.display = "inline-block"

                    var demo2 = document.getElementById("s"+y["id"])
                    demo2.appendChild(newDiv2);
                    var newContent2 = document.createTextNode(y["companyName"])
                    newDiv2.appendChild(newContent2);
                    var currentDiv2 = document.getElementById("div");
                    demo2.insertBefore(newDiv2, currentDiv2);   

                     var newDiv3 =document.createElement("button")
                    newDiv3.style.backgroundColor="papayawhip"
                    newDiv3.style.width = "33%"
                    newDiv3.style.textAlign = "center"
                    newDiv3.style.borderStyle = "solid";
                    newDiv3.style.borderWidth = "1px";
                    newDiv3.style.height = "33%"
                    newDiv3.style.display = "inline-block"
                    var demo3 = document.getElementById("s"+y["id"])
                    demo3.appendChild(newDiv3);
                    var newContent3 = document.createTextNode(Math.round(y["value1"]*100)/100)
                    newDiv3.appendChild(newContent3);
                    var currentDiv3 = document.getElementById("div");
                    demo3.insertBefore(newDiv3, currentDiv3);
                    }                      

}
}
)
}
}



