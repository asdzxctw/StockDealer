
function insertAfter(newElement, targetElement){
    // 取得目標元素的上層節點
    var tParent = targetElement.parentNode;
    
    // 檢查是否有子元素
    if (tParent.lastChild == targetElement){
        // 附加至子節點後
        tParent.appendChild(newElement);
    }else{
        tParent.insertBefore(newElement, targetElement.nextSibling);
    }
}



//  Single Stock    //
function singlestock(id) {
    var docwidth = $(document).width();
    var width = docwidth*0.7;
    var height = 450;
    var canvasTr = document.createElement('tr');
    var canvasTd = document.createElement('td');
    canvasTd.id = id + "div";
    canvasTd.setAttribute("colspan", 3)
    var br = document.createElement('br')
    canvasTd.appendChild(br)
    canvasTr.appendChild(canvasTd)
    insertAfter(canvasTr, document.getElementById(id))
    
    var canvas = d3.select("#" + id + "div").append("svg").attr("width", "100%").attr("height", height);
    // var stockId = "s"+ id; 
    // var canvas = d3.select("#" + id).append("div").attr("class","SsingleCanvas").attr("width", width+200).attr("height", height+200);
    // var canvas = d3.select(".SsingleCanvas").append("svg").attr("class", "Ssingle").attr("width", width).attr("height", height*0.8);

    //  Append Data Type //  
    var filename = testrequest.target;
    var type = document.createElement('div');
    type.id="p" + id;
    type.setAttribute("align", "center")
    //type.className='col-md-12 text-center datatype';
    document.getElementById(id + "div").appendChild(type);
    if(filename=="EPS"){
            var res = "每股盈餘(元)"
            document.getElementById("p" + id).innerHTML = res;
        }
        else if(filename=="NATPM"){
            var res = "稅後淨利率(%)"
            document.getElementById("p" + id).innerHTML = res;
        }
         else if(filename=="ROE"){
            var res = "股東權益報酬率(%)"
            document.getElementById("p" + id).innerHTML = res;
        }
         else if(filename=="IT"){
            var res = "存貨週轉率(%)"
            document.getElementById("p" + id).innerHTML = res;
        }       
         else if(filename=="DY"){
            var res = "殖利率(%)"
            document.getElementById("p" + id).innerHTML = res;
        }        
         else if(filename=="NVPS"){
            var res = "淨值(元)"
            document.getElementById("p" + id).innerHTML = res;
        }     
         else if(filename=="OP"){
            var res = "營業毛利率(%)"
            document.getElementById("p" + id).innerHTML = res;
        }     
         else if(filename=="OPMGR"){
            var res = "營收成長率(%)"
            document.getElementById("p" + id).innerHTML = res;
        }        
         else if(filename=="OPM"){
            var res = "營業利益率(%)"
            document.getElementById("p" + id).innerHTML = res;
        } 
         else if(filename=="LR"){
            var res = "流動比率(%)"
            document.getElementById("p" + id).innerHTML = res;
        }                
         else if(filename=="NIGR"){
            var res = "稅後淨利成長率(%)"
            document.getElementById("p" + id).innerHTML = res;
        }             
         else if(filename=="DR"){
            var res = "負債比率(%)"
            document.getElementById("p" + id).innerHTML = res;
        }        
         else if(filename=="ATNI"){
            var res = "稅後淨利(千元)"
            document.getElementById("p" + id).innerHTML = res;
        }        
         else if(filename=="PS"){
            var res = "每股營業額(元)"
            document.getElementById("p" + id).innerHTML = res;
        }        
         else if(filename=="PE"){
            var res = "本益比"
            document.getElementById("p" + id).innerHTML = res;
        }
         else if(filename=="PBR"){
            var res = "股價淨值比"
            document.getElementById("p" + id).innerHTML = res;
        } 
                
    //  Get URL //
    function getURL(testrequest){
        var dataPath = "https://cocoflyliu.github.io/stock_crawler/data/";
        var D3fileType = "-r,d3.csv";
        var dataURL = dataPath + filename + D3fileType;
        return dataURL;
    };

    d3.csv( getURL(testrequest),
        function(data)
        {
        var ln = data.length;
        var miny = d3.min(data, function(d){return +d[id];});
        var Nminy = Number(miny);
        var maxy = d3.max(data, function(d){return +d[id];});
        var Nmaxy = Number(maxy);
        var gapAdjust = Nmaxy - Nminy;
        var minFinal = Nminy - Number(gapAdjust*0.075); 
        var maxFinal = Nmaxy + Number(gapAdjust*0.075); 
        var scaleY = d3.scaleLinear().domain([minFinal, maxFinal]).range([height*0.9, 0]);

        var lines = d3.line().x(function(d,i){return i*(width/ln);}).y(function(d){return scaleY(d[id])});
        canvas.append("path").data([data]).attr("d", lines).attr("stroke", "#A496B5").attr("stroke-width", "2").attr("fill", "none");
        canvas.selectAll(".point").data(data).enter().append("svg:circle") .attr("stroke", "#A496B5").attr("fill", "#A496B5").attr("cx", function(d, i) {return i*(width/ln)}).attr("cy", function(d) {return scaleY(d[id])}) .attr("r", 4);

    //  Axis  //
        var Dates = [{"quarter": "2016"},{"quarter": " "},{"quarter": " "},
                     {"quarter": "2015"},{"quarter": " "},{"quarter": " "},{"quarter": " "},
                     {"quarter": "2014"},{"quarter": " "},{"quarter": " "},{"quarter": " "},
                     {"quarter": "2013"},{"quarter": " "},{"quarter": " "},{"quarter": " "},
                     {"quarter": "2012"},{"quarter": " "},{"quarter": " "},{"quarter": " "}]
        var scaleX = d3.scaleLinear().range([0, width*0.95]).domain([0,18]);
        var axisX = d3.axisTop().scale(scaleX).tickValues([2,6,10,14,18]) .tickFormat(function(d, i){return d*0 + (2016 - i);});
        var axisY = d3.axisLeft().scale(scaleY).ticks(10);
        canvas.append('g').call(axisX).attr({'fill':'none', 'stroke':'#000'}); 
        canvas.append('g').call(axisY).attr({'fill':'none', 'stroke':'#000'});
        var axisYGrid = d3.axisLeft().scale(scaleY).ticks(10).tickFormat("").tickSize(-width,0);
        canvas.append('g').call(axisYGrid).attr({'fill':'none',});
        }
    );

    //  index line    //
//        var indexdata = [ {x:0, y:height*0.12},
//                          {x:width, y:height*0.12} ]
//        var indexline = d3.line().x(function(l){return l.x;}).y(function(l){return l.y;});
//        canvas.append("path").data([indexdata]).attr("d", indexline).attr("stroke", "blue").attr("stroke-width", "1").attr("fill", "none");
//}
};


//  Compare Stock   //
function coefficient(AstockId,BstockId){
    d3.selectAll("#coefficientGraph > *").remove();
    var Astock = document.getElementById("compareForm");
    var AstockId = "s" + Astock.company1.value;
    var Bstock = document.getElementById("compareForm");
    var BstockId = "s" + Bstock.company2.value;  
    var docwidth = $(document).width();
    var width = docwidth*0.7;
    var height = 450;
    var canvasCo = d3.select("#coefficientGraph").append("svg").attr("class", "canvasCo").attr("width", "100%").attr("height", height*0.9);
    
    d3.csv("https://cocoflyliu.github.io/stock_crawler/data/SP-r,d3.csv",
        function(data)
        {
        var ln = data.length;
        var Aminy = d3.min(data, function(d){return +d[AstockId];});
        var Amaxy = d3.max(data, function(d){return +d[AstockId];});
        var Bminy = d3.min(data, function(d){return +d[BstockId];});
        var Bmaxy = d3.max(data, function(d){return +d[BstockId];});
        
        var NAminy = Number(Aminy);
        var NAmaxy = Number(Amaxy);
        var NBminy = Number(Bminy);
        var NBmaxy = Number(Bmaxy);
        
        var extremes = [NAminy, NAmaxy, NBminy, NBmaxy];
        var ABminy = d3.min(extremes);
        var ABmaxy = d3.max(extremes);
        
        var gapAdjust = Number(ABmaxy) - Number(ABminy);
        var minFinal = Number(ABminy) - Number(gapAdjust*0.075); 
        var maxFinal = Number(ABmaxy) + Number(gapAdjust*0.075); 
        
        var scaleY = d3.scaleLinear().domain([minFinal,maxFinal]).range([height*0.8, 0]);
        var Alines = d3.line().x(function(d,i){return i*(width/ln);}).y(function(d){return scaleY(+d[AstockId])});
        var Blines = d3.line().x(function(d,i){return i*(width/ln);}).y(function(d){return scaleY(+d[BstockId])});
        canvasCo.append("path").data([data]).attr("d", Alines).attr("stroke", "blue").attr("stroke-width", "2").attr("fill", "none");
        canvasCo.append("path").data([data]).attr("d", Blines).attr("stroke", "red").attr("stroke-width", "2").attr("fill", "none");
        
//      canvasCo.selectAll(".point").data(data).enter().append("svg:circle") .attr("stroke", "blue").attr("fill", "blue").attr("cx", function(d, i) {return i*(width/ln)}).attr("cy", function(d) {return scaleY(d[AstockId])}).attr("r", 4);
//      canvasCo.selectAll(".point").data(data).enter().append("svg:circle") .attr("stroke", "red").attr("fill", "red").attr("cx", function(d, i) {return i*(width/ln)}).attr("cy", function(d) {return scaleY(d[BstockId])}).attr("r", 4);

        //  Axis  //
        var scaleX = d3.scaleLinear().range([0, width]).domain([0,1228]);
        var axisX = d3.axisTop().scale(scaleX).tickValues([238,482,730,976,1226]) .tickFormat(function(d, i){return d*0 + (2016 - i);});
        var axisY = d3.axisLeft().scale(scaleY).ticks(10);               
        canvasCo.append('g').call(axisX).attr({'fill':'none', 'stroke':'#000'}); 
        canvasCo.append('g').call(axisY).attr({'fill':'none', 'stroke':'#000'});
        var axisYGrid = d3.axisLeft().scale(scaleY).ticks(10).tickFormat("").tickSize(-width,0);
        canvasCo.append('g').call(axisYGrid).attr({'fill':'none',});
        }
        );
};





//      optimization needed so far:
//      -indexline??
//      2017-1-10
