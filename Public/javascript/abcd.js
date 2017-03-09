
    var csv = ".txt";
    var dataPath = "https://cocoflyliu.github.io/stock_crawler/data/";
    var f1 = document.getElementById("form1")
    var namePath = dataPath+"name"+csv
    var datalist = ["EPS","NATPM","ROE","IT","DY","NVPS","OP","OPMGR","OPM","LR","NIGR","DR","ATNI","PS","PE","PBR"]
    var dataResult = [];

    var testrequest = {target:f1.target1.value, comparison:f1.comparison1.value , data:f1.text1.value, searchable:f1.checkValidity()}
    document.getElementById("form1").target1.option

     var result1 = []
     var outcome = []
    
    
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
    if (testrequest.searchable==true){
        var tar = document.getElementById(ic)
        if(tar.name=="did"){
            tar.parentNode.deleteRow(tar.rowIndex+1)
            tar.name=""
        }else{
            tar.name="did"
            singlestock(ic);
        }
    }
};
function clear2(){
    document.getElementById("form1").reset();
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

function getData(){
    tech = "https://cocoflyliu.github.io/stock_crawler/data/"
    var ss = document.getElementById("stockIndex")
    var stockIndex = ss.value
    var a = []
    
    var stock_i = 0;
    
    path = tech + "EPS" + ".txt";
    
    
    d3.csv(path,function(data){
       
       for(i=0;i<data.length;i++){
        if(data[i]["index"] == stockIndex){
         stock_i = i;
         break;
        }
       }
       
       }
    )
    
    for(i=0;i<datalist.length;i++){
        
        path = tech + datalist[i] + ".txt";
        var typetype = datalist[i];
        //alert(datalist[i]);
        
        d3.csv( path,function(data){
               
               var x = data[stock_i];
               var resultxx = document.getElementById("resultx");
               var kkk = document.createElement("p");
               kkk.innerHTML=x["2012Q1"];
               resultxx.appendChild(kkk);
               dataResult.push(x["2012Q1"]);
               if(dataResult.length == 16){
               console.log(dataResult);
               }
        })
    }
    
}

function search(){
    testrequest = {target:f1.target1.value, comparison:f1.comparison1.value , data:f1.text1.value, searchable:f1.text1.value!=""}
    var startYear = parseInt(document.getElementById("startyear").value) + 2011
    var endYear = parseInt( document.getElementById("endyear").value) + 2011
    var ddd =  document.getElementById("table1");
    ddd.removeChild(document.getElementById("tbody1"))
    var fff =document.createElement("tbody")
    fff.setAttribute("id", "tbody1");
//    fff.setAttribute("border", "1");
//    fff.setAttribute("width", "100%");
    ddd.appendChild(fff)
     var outcome = []
     var result1 = []
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


    for(i=0; i< result1.length; i++){
            var r1 = result1[i]
    outcome.push({id:r1["id"], companyName:r1["companyName"],value1: r1["value"]})}
           
           console.log(outcome)
           var firstRow = document.createElement("tr")
           var stockNumber = document.createElement("th")
           stockNumber.innerHTML = "股票代號"
           var stockName = document.createElement("th")
           stockName.innerHTML = "公司名稱"
           var dataValue = document.createElement("th")
           dataValue.innerHTML = display(testrequest["target"])
           firstRow.appendChild(stockNumber)
           firstRow.appendChild(stockName)
           firstRow.appendChild(dataValue)
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
            var button = document.createElement("button")
            button.innerHTML = y["id"]
            var alpha = "sentID("+y["id"]+")"
            button.setAttribute("onclick", alpha)
            num.appendChild(button)
            var name = document.createElement("td")
            name.innerHTML = y["companyName"]
            var data = document.createElement("td")
            data.innerHTML = Math.round(y["value1"]*100)/100
           
            row.appendChild(num)
            row.appendChild(name)
            row.appendChild(data)
            var tit = document.getElementById("tbody1")
           
            setTimeout(tit.appendChild(row),100*m)
           
           }


}
)
}
}



