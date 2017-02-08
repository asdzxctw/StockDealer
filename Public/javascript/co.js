//alert("work");
function getCo(astock,bstock){

    //var ;
    var co;
    d3.csv("https://seanlee128.github.io/stock-filter/test.csv", function(data) {
            //dataset=data
			var nullElement="";
			
			for(i=0;i<data.length;i++){
			 if(data[i][""]==astock)
					co=data[i][bstock];
			}
			//alert("co  "+co)
			console.log("co  "+co);
			var p = document.createElement('div');
			p.id='coHere';
			
			document.getElementById("coefficientGraph").appendChild(p);
			document.getElementById("coHere").innerHTML=("相關係數為"+co);
			return co;
           });
    
}
function onClickCo(){
    var aCompany="s"+document.getElementById("compareForm").company1.value;
    
    var bCompany="s"+document.getElementById("compareForm").company2.value;
    var coEffNum=getCo(aCompany,bCompany);
   // alert("coEffNum "+coEffNum);
   // coefficeint(aCompany,bCompany);
	 //coefficient();


}
    //var dataset;

function clear3(){
    document.getElementById("compareForm").reset();
    var ddd =  document.getElementById("coefficientGraph");
    ddd.innerHTML = "";
    
};

//onClickCo();

