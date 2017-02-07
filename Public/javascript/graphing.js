//  Single Stock    //
function singlestock(id) {
    var docwidth = $(document).width();
    var width = docwidth*0.7;
    var height = 450;
    var canvasDiv = document.createElement('div');
    canvasDiv.id = id + "div";
    document.getElementById(id).appendChild(canvasDiv);
    var canvas = d3.select("#" + id + "div").append("svg").attr("class", "Ssingle").attr("width", "100%").attr("height", height);
    // var stockId = "s"+ id; 
    // var canvas = d3.select("#" + id).append("div").attr("class","SsingleCanvas").attr("width", width+200).attr("height", height+200);
    // var canvas = d3.select(".SsingleCanvas").append("svg").attr("class", "Ssingle").attr("width", width).attr("height", height*0.8);

    //  Append Data Type //  
    var filename = testrequest.target;
    var type = document.createElement('div');
    type.id="p" + id;
    type.className='col-md-12 text-center datatype';
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


//  Single Stock 2   //
function singlestock2(id) {
    var docwidth = $(document).width();
    var width = docwidth*0.7;
    var height = 450;
    var canvasDiv2 = document.createElement('div');
    canvasDiv2.id = id + "div_2";
    document.getElementById(id).appendChild(canvasDiv2);
    var canvas2 = d3.select("#" + id + "div_2").append("svg").attr("class", "Ssingle").attr("width", "100%").attr("height", height);
    // stockId = "s"+ stockId;

    // var canvas = d3.select("#" + id).append("div").attr("class","SsingleCanvas").attr("width", width+200).attr("height", height+200);
    

    //  Append Data Type //
    var filename = testrequest2.target;
    var type = document.createElement('div');
    type.id="p" + id + "_2";
    type.className='col-md-12 text-center datatype';
    document.getElementById(id+ "div_2").appendChild(type);
    if(filename=="EPS"){
            var res = "每股盈餘(元)"
            document.getElementById("p" + id + "_2").innerHTML = res;
        }
        else if(filename=="NATPM"){
            var res = "稅後淨利率(%)"
            document.getElementById("p" + id + "_2").innerHTML = res;
        }
         else if(filename=="ROE"){
            var res = "股東權益報酬率(%)"
            document.getElementById("p" + id + "_2").innerHTML = res;
        }
         else if(filename=="IT"){
            var res = "存貨週轉率(%)"
            document.getElementById("p" + id + "_2").innerHTML = res;
        }       
         else if(filename=="DY"){
            var res = "殖利率(%)"
            document.getElementById("p" + id + "_2").innerHTML = res;
        }        
         else if(filename=="NVPS"){
            var res = "淨值(元)"
            document.getElementById("p" + id + "_2").innerHTML = res;
        }     
         else if(filename=="OP"){
            var res = "營業毛利率(%)"
            document.getElementById("p" + id + "_2").innerHTML = res;
        }     
         else if(filename=="OPMGR"){
            var res = "營收成長率(%)"
            document.getElementById("p" + id + "_2").innerHTML = res;
        }        
         else if(filename=="OPM"){
            var res = "營業利益率(%)"
            document.getElementById("p" + id + "_2").innerHTML = res;
        } 
         else if(filename=="LR"){
            var res = "流動比率(%)"
            document.getElementById("p" + id + "_2").innerHTML = res;
        }                
         else if(filename=="NIGR"){
            var res = "稅後淨利成長率(%)"
            document.getElementById("p" + id + "_2").innerHTML = res;
        }             
         else if(filename=="DR"){
            var res = "負債比率(%)"
            document.getElementById("p" + id + "_2").innerHTML = res;
        }        
         else if(filename=="ATNI"){
            var res = "稅後淨利(千元)"
            document.getElementById("p" + id + "_2").innerHTML = res;
        }        
         else if(filename=="PS"){
            var res = "每股營業額(元)"
            document.getElementById("p" + id + "_2").innerHTML = res;
        }        
         else if(filename=="PE"){
            var res = "本益比"
            document.getElementById("p" + id + "_2").innerHTML = res;
        }
         else if(filename=="PBR"){
            var res = "股價淨值比"
            document.getElementById("p" + id + "_2").innerHTML = res;
        } 
        
    //  Get URL //
    function getURL(testrequest2){
        var dataPath = "https://cocoflyliu.github.io/stock_crawler/data/";
        var D3fileType = "-r,d3.csv";
        var dataURL = dataPath + filename + D3fileType;
        return dataURL;
    };

    d3.csv(getURL(testrequest2), 
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
        canvas2.append("path").data([data]).attr("d", lines).attr("stroke", "#A496B5").attr("stroke-width", "2").attr("fill", "none");
        canvas2.selectAll(".point").data(data).enter().append("svg:circle") .attr("stroke", "#A496B5").attr("fill", "#A496B5").attr("cx", function(d, i) {return i*(width/ln)}).attr("cy", function(d) {return scaleY(d[id])}) .attr("r", 4);

    //  Axis  //
        var Dates = [{"quarter": "2012/Q1"},{"quarter": "2012/Q2"},{"quarter": "2012/Q3"},{"quarter": "2012/Q4"},{"quarter": "2013/Q1"},{"quarter": "2013/Q2"},{"quarter": "2013/Q3"},{"quarter": "2013/Q4"},{"quarter": "2014/Q1"},{"quarter": "2014/Q2"},{"quarter": "2014/Q3"},{"quarter": "2014/Q4"},{"quarter": "2015/Q1"},{"quarter": "2015/Q2"},{"quarter": "2015/Q3"},{"quarter": "2015/Q4"},{"quarter": "2016/Q1"},{"quarter": "2016/Q2"},{"quarter": "2016/Q3"},]
        var scaleX = d3.scaleLinear().range([0, width*0.95]).domain([0,18]);
        var axisX = d3.axisTop().scale(scaleX).tickValues([2,6,10,14,18]) .tickFormat(function(d, i){return d*0 + (2016 - i);});
        var axisY = d3.axisLeft().scale(scaleY).ticks(10);
        canvas2.append('g').call(axisX).attr({'fill':'none', 'stroke':'#000'}); 
        canvas2.append('g').call(axisY).attr({'fill':'none', 'stroke':'#000'});
        var axisYGrid = d3.axisLeft().scale(scaleY).ticks(10).tickFormat("").tickSize(-width,0);
        canvas2.append('g').call(axisYGrid).attr({'fill':'none',});
        }
    );

        //  index line    //
//        var indexdata = [ {x:0, y:height*0.12},
//                          {x:width, y:height*0.12} ]
//        var indexline = d3.line().x(function(l){return l.x;}).y(function(l){return l.y;});
//        canvas2.append("path").data([indexdata]).attr("d", indexline).attr("stroke", "blue").attr("stroke-width", "1").attr("fill", "none");
    //}
};

//  Single Stock 3   //
function singlestock3(id) {
    var docwidth = $(document).width();
    var width = docwidth*0.7;
    var height = 450;
    var canvasDiv3 = document.createElement('div');
    canvasDiv3.id = id + "div_3";
    document.getElementById(id).appendChild(canvasDiv3);
    var canvas3 = d3.select("#" + id + "div_3").append("svg").attr("class", "Ssingle").attr("width", "100%").attr("height", height);
    // stockId = "s"+ stockId;

    // var canvas = d3.select("#" + id).append("div").attr("class","SsingleCanvas").attr("width", width+200).attr("height", height+200);
    

    //  Append Data Type //
    var filename = testrequest3.target;
    var type = document.createElement('div');
    type.id="p" + id + "_3";
    type.className='col-md-12 text-center datatype';
    document.getElementById(id + "div_3").appendChild(type);
    if(filename=="EPS"){
            var res = "每股盈餘(元)"
            document.getElementById("p"  +  id  +  "_3").innerHTML = res;
        }
        else if(filename=="NATPM"){
            var res = "稅後淨利率(%)"
            document.getElementById("p"  +  id  +  "_3").innerHTML = res;
        }
         else if(filename=="ROE"){
            var res = "股東權益報酬率(%)"
            document.getElementById("p"  +  id  +  "_3").innerHTML = res;
        }
         else if(filename=="IT"){
            var res = "存貨週轉率(%)"
            document.getElementById("p"  +  id  +  "_3").innerHTML = res;
        }       
         else if(filename=="DY"){
            var res = "殖利率(%)"
            document.getElementById("p"  +  id  +  "_3").innerHTML = res;
        }        
         else if(filename=="NVPS"){
            var res = "淨值(元)"
            document.getElementById("p"  +  id  +  "_3").innerHTML = res;
        }     
         else if(filename=="OP"){
            var res = "營業毛利率(%)"
            document.getElementById("p"  +  id  +  "_3").innerHTML = res;
        }     
         else if(filename=="OPMGR"){
            var res = "營收成長率(%)"
            document.getElementById("p"  +  id  +  "_3").innerHTML = res;
        }        
         else if(filename=="OPM"){
            var res = "營業利益率(%)"
            document.getElementById("p"  +  id  +  "_3").innerHTML = res;
        } 
         else if(filename=="LR"){
            var res = "流動比率(%)"
            document.getElementById("p"  +  id  +  "_3").innerHTML = res;
        }                
         else if(filename=="NIGR"){
            var res = "稅後淨利成長率(%)"
            document.getElementById("p"  +  id  +  "_3").innerHTML = res;
        }             
         else if(filename=="DR"){
            var res = "負債比率(%)"
            document.getElementById("p"  +  id  +  "_3").innerHTML = res;
        }        
         else if(filename=="ATNI"){
            var res = "稅後淨利(千元)"
            document.getElementById("p"  +  id  +  "_3").innerHTML = res;
        }        
         else if(filename=="PS"){
            var res = "每股營業額(元)"
            document.getElementById("p"  +  id  +  "_3").innerHTML = res;
        }        
         else if(filename=="PE"){
            var res = "本益比"
            document.getElementById("p"  +  id  +  "_3").innerHTML = res;
        }
         else if(filename=="PBR"){
            var res = "股價淨值比"
            document.getElementById("p"  +  id  +  "_3").innerHTML = res;
        } 
    
    //  Get URL //
    function getURL(testrequest3){
        var dataPath = "https://cocoflyliu.github.io/stock_crawler/data/";
        var D3fileType = "-r,d3.csv";
        var dataURL = dataPath + filename + D3fileType;
        return dataURL;
    };

    d3.csv( getURL(testrequest3),
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
        canvas3.append("path").data([data]).attr("d", lines).attr("stroke", "#A496B5").attr("stroke-width", "2").attr("fill", "none");
        canvas3.selectAll(".point").data(data).enter().append("svg:circle") .attr("stroke", "#A496B5").attr("fill", "#A496B5").attr("cx", function(d, i) {return i*(width/ln)}).attr("cy", function(d) {return scaleY(d[id])}) .attr("r", 4);

    //  Axis  //
        var Dates = [{"quarter": "2012/Q1"},{"quarter": "2012/Q2"},{"quarter": "2012/Q3"},{"quarter": "2012/Q4"},{"quarter": "2013/Q1"},{"quarter": "2013/Q2"},{"quarter": "2013/Q3"},{"quarter": "2013/Q4"},{"quarter": "2014/Q1"},{"quarter": "2014/Q2"},{"quarter": "2014/Q3"},{"quarter": "2014/Q4"},{"quarter": "2015/Q1"},{"quarter": "2015/Q2"},{"quarter": "2015/Q3"},{"quarter": "2015/Q4"},{"quarter": "2016/Q1"},{"quarter": "2016/Q2"},{"quarter": "2016/Q3"},]
        var scaleX = d3.scaleLinear().range([0, width*0.95]).domain([0,18]);
        var axisX = d3.axisTop().scale(scaleX).tickValues([2,6,10,14,18]) .tickFormat(function(d, i){return d*0 + (2016 - i);});
        var axisY = d3.axisLeft().scale(scaleY).ticks(10);
        canvas3.append('g').call(axisX).attr({'fill':'none', 'stroke':'#000'}); 
        canvas3.append('g').call(axisY).attr({'fill':'none', 'stroke':'#000'});
        var axisYGrid = d3.axisLeft().scale(scaleY).ticks(10).tickFormat("").tickSize(-width,0);
        canvas3.append('g').call(axisYGrid).attr({'fill':'none',});
        }
    );

        //  index line    //
//        var indexdata = [ {x:0, y:height*0.12},
//                          {x:width, y:height*0.12} ]
//        var indexline = d3.line().x(function(l){return l.x;}).y(function(l){return l.y;});
//        canvas3.append("path").data([indexdata]).attr("d", indexline).attr("stroke", "blue").attr("stroke-width", "1").attr("fill", "none");
    //}
};


//  Single Stock 4   //
function singlestock4(id) {
    var docwidth = $(document).width();
    var width = docwidth*0.7;
    var height = 450;
    var canvasDiv4 = document.createElement('div');
    canvasDiv4.id = id + "div_4";
    document.getElementById(id).appendChild(canvasDiv4);
    var canvas4 = d3.select("#" + id + "div_4").append("svg").attr("class", "Ssingle").attr("width", "100%").attr("height", height);
    // stockId = "s"+ stockId;

    // var canvas = d3.select("#" + id).append("div").attr("class","SsingleCanvas").attr("width", width+200).attr("height", height+200);
    

    //  Append Data Type //
    var filename = testrequest4.target;
    var type = document.createElement('div');
    type.id="p" + id + "_4";
    type.className='col-md-12 text-center datatype';
    document.getElementById(id + "div_4").appendChild(type);
        // document.getElementById("p" + id + "_4").innerHTML=(filename);
    if(filename=="EPS"){
            var res = "每股盈餘(元)"
            document.getElementById("p"  +  id + "_4").innerHTML = res;
        }
        else if(filename=="NATPM"){
            var res = "稅後淨利率(%)"
            document.getElementById("p"  +  id + "_4").innerHTML = res;
        }
         else if(filename=="ROE"){
            var res = "股東權益報酬率(%)"
            document.getElementById("p"  +  id + "_4").innerHTML = res;
        }
         else if(filename=="IT"){
            var res = "存貨週轉率(%)"
            document.getElementById("p"  +  id + "_4").innerHTML = res;
        }       
         else if(filename=="DY"){
            var res = "殖利率(%)"
            document.getElementById("p"  +  id + "_4").innerHTML = res;
        }        
         else if(filename=="NVPS"){
            var res = "淨值(元)"
            document.getElementById("p"  +  id + "_4").innerHTML = res;
        }     
         else if(filename=="OP"){
            var res = "營業毛利率(%)"
            document.getElementById("p"  +  id + "_4").innerHTML = res;
        }     
         else if(filename=="OPMGR"){
            var res = "營收成長率(%)"
            document.getElementById("p"  +  id + "_4").innerHTML = res;
        }        
         else if(filename=="OPM"){
            var res = "營業利益率(%)"
            document.getElementById("p"  +  id + "_4").innerHTML = res;
        } 
         else if(filename=="LR"){
            var res = "流動比率(%)"
            document.getElementById("p"  +  id + "_4").innerHTML = res;
        }                
         else if(filename=="NIGR"){
            var res = "稅後淨利成長率(%)"
            document.getElementById("p"  +  id + "_4").innerHTML = res;
        }             
         else if(filename=="DR"){
            var res = "負債比率(%)"
            document.getElementById("p"  +  id + "_4").innerHTML = res;
        }        
         else if(filename=="ATNI"){
            var res = "稅後淨利(千元)"
            document.getElementById("p"  +  id + "_4").innerHTML = res;
        }        
         else if(filename=="PS"){
            var res = "每股營業額(元)"
            document.getElementById("p"  +  id + "_4").innerHTML = res;
        }        
         else if(filename=="PE"){
            var res = "本益比"
            document.getElementById("p"  +  id + "_4").innerHTML = res;
        }
         else if(filename=="PBR"){
            var res = "股價淨值比"
            document.getElementById("p"  +  id + "_4").innerHTML = res;
        }
    
    // Get URL  //
    function getURL(testrequest4){
        var dataPath = "https://cocoflyliu.github.io/stock_crawler/data/";
        var D3fileType = "-r,d3.csv";
        var dataURL = dataPath + filename + D3fileType;
        return dataURL;
    };

    d3.csv( getURL(testrequest4),
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
        canvas4.append("path").data([data]).attr("d", lines).attr("stroke", "#A496B5").attr("stroke-width", "2").attr("fill", "none");
        canvas4.selectAll(".point").data(data).enter().append("svg:circle") .attr("stroke", "#A496B5").attr("fill", "#A496B5").attr("cx", function(d, i) {return i*(width/ln)}).attr("cy", function(d) {return scaleY(d[id])}) .attr("r", 4);

    //  Axis  //
        var Dates = [{"quarter": "2012/Q1"},{"quarter": "2012/Q2"},{"quarter": "2012/Q3"},{"quarter": "2012/Q4"},{"quarter": "2013/Q1"},{"quarter": "2013/Q2"},{"quarter": "2013/Q3"},{"quarter": "2013/Q4"},{"quarter": "2014/Q1"},{"quarter": "2014/Q2"},{"quarter": "2014/Q3"},{"quarter": "2014/Q4"},{"quarter": "2015/Q1"},{"quarter": "2015/Q2"},{"quarter": "2015/Q3"},{"quarter": "2015/Q4"},{"quarter": "2016/Q1"},{"quarter": "2016/Q2"},{"quarter": "2016/Q3"},]
        var scaleX = d3.scaleLinear().range([0, width*0.95]).domain([0,18]);
        var axisX = d3.axisTop().scale(scaleX).tickValues([2,6,10,14,18]) .tickFormat(function(d, i){return d*0 + (2016 - i);});
        var axisY = d3.axisLeft().scale(scaleY).ticks(10);
        canvas4.append('g').call(axisX).attr({'fill':'none', 'stroke':'#000'}); 
        canvas4.append('g').call(axisY).attr({'fill':'none', 'stroke':'#000'});
        var axisYGrid = d3.axisLeft().scale(scaleY).ticks(10).tickFormat("").tickSize(-width,0);
        canvas4.append('g').call(axisYGrid).attr({'fill':'none',});
        }
    );

        //  index line    //
//        var indexdata = [ {x:0, y:height*0.12},
//                          {x:width, y:height*0.12} ]
//        var indexline = d3.line().x(function(l){return l.x;}).y(function(l){return l.y;});
//        canvas4.append("path").data([indexdata]).attr("d", indexline).attr("stroke", "blue").attr("stroke-width", "1").attr("fill", "none");
    //}
};


//  Compare Stock   //
function coefficient(AstockId,BstockId){
    d3.selectAll("#coefficientGraph > *").remove();
    var Astock = document.getElementById("form5");
    var AstockId = "s" + Astock.company1.value;
    var Bstock = document.getElementById("form5");
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
