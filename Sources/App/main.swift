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

drop.get("test") { request in
    return "test個毛啊"
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


drop.resource("posts", PostController())

drop.run()
