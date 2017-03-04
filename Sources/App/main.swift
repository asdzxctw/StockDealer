import Vapor
import Ji

let drop = Droplet()

drop.get { req in
    return try drop.view.make("welcome", [
    	"message": drop.localization[req.lang, "welcome", "title"]
    ])
}

drop.get("/") { request in
    return "Hello World!"
}

drop.get("html") { request in
    return try drop.view.make("index.html")
}

drop.get("abcd") { request in
    return try drop.view.make("abcd.html")
}

drop.get("co") { request in
    return try drop.view.make("co.html")
}

drop.get("ccc") { request in
    return try drop.view.make("index2.html")
}

drop.get("a") { request in
    return try drop.view.make("hellow_world.html")
}

drop.get("test") { request in
    return try drop.view.make("test.html")
}

drop.get("imageIndex") { request in
    return try drop.view.make("imageView.html")
}

drop.post("hisPrice") { request in
    
    if let numStr = request.data["key"]?.string {
        if let num = Int(numStr) {
            if num>1000&&num<10000{
                let pGetter = StockPriceGetter(number:Int(numStr)!)
                if let sDate = request.data["startDate"]?.string{
                    if let eDate = request.data["endDate"]?.string{
                        
                        return try JSON(node: pGetter.getHistoryPrice(startDate: sDate, endDate: eDate))
                    }
                }
            }
        }
        
    }
    return "Error retrieving parameters."
}

drop.post("stockData") { request in
    
    if let numStr = request.data["key"]?.string {
        if let num = Int(numStr) {
            if num>1000&&num<10000{
                let pGetter = StockPriceGetter(number:Int(numStr)!)
                if let sDate = request.data["startDate"]?.string{
                    if let eDate = request.data["endDate"]?.string{
                        
                        let stockHisData = pGetter.getHistoryInformation(startDate: sDate, endDate: eDate)
                        if stockHisData.count > 1{
                            let sCacer = StockCaculator(data:stockHisData)
                            return "\(sCacer.RSI())"
                        }
                        
                        
                        return "出錯了!"
                    }
                }
            }
        }
        
    }
    return "Error retrieving parameters."
}


drop.resource("posts", PostController())

drop.run()
