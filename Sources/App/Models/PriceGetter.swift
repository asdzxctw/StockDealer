import Vapor
import HTTP
import Foundation
import Ji

class StockPriceGetter{
    var stockNum:Int
    
    init(number:Int) {
        self.stockNum = number
        
    }
    
    func getHistoryPrice(startDate:String,endDate:String) -> [String:String] {
        
        let hisStockURL = "http://www.cnyes.com/twstock/ps_historyprice/\(stockNum).htm"
        var reDic:[String:String] = [:]
        print(startDate)
        print(endDate)
        
        let dropp = Droplet()
        do{
            
            let respond = try dropp.client.request(.other(method:"Post"),
                                                   hisStockURL,headers: ["Content-Type": "application/x-www-form-urlencoded"],
                                                   query:[:],
                                                   body:"ctl00$ContentPlaceHolder1$startText=\(startDate)&ctl00$ContentPlaceHolder1$endText=\(endDate)")
            
            
            let result = try String(bytes: respond.body.bytes!)
            let jiDoc = Ji(htmlString: result)!
            let endPriceNodes = jiDoc.xPath("//div[@id='main3']/div[@class='mbx bd3']/div[@class='tab']/table/tr/td[5]")
            let timeNodes = jiDoc.xPath("//div[@id='main3']/div[@class='mbx bd3']/div[@class='tab']/table/tr/td[1]")
            
            if endPriceNodes!.count > 0{
                for index in 0...endPriceNodes!.count-1{
                    reDic["\(timeNodes![index].content!)"] = "\(endPriceNodes![index].content!)"
                }
                
            }else{
                reDic = ["訊息":"抓不出資料"]
            }
            
        }catch{
            print("getDataError")
            reDic = ["訊息":"資料取得失敗"]
        }
        
        return reDic
        
    }
    
    
    func getHistoryInformation(startDate:String,endDate:String) -> [[Double]] {
        
        let hisStockURL = "http://www.cnyes.com/twstock/ps_historyprice/\(stockNum).htm"
        var reDic:[[Double]] = []
        print(startDate)
        print(endDate)
        
        let dropp = Droplet()
        do{
            
            let respond = try dropp.client.request(.other(method:"Post"),
                                                   hisStockURL,headers: ["Content-Type": "application/x-www-form-urlencoded"],
                                                   query:[:],
                                                   body:"ctl00$ContentPlaceHolder1$startText=\(startDate)&ctl00$ContentPlaceHolder1$endText=\(endDate)")
            
            
            let result = try String(bytes: respond.body.bytes!)
            let jiDoc = Ji(htmlString: result)!
            let startPriceNodes = jiDoc.xPath("//div[@id='main3']/div[@class='mbx bd3']/div[@class='tab']/table/tr/td[2]")
            let hightestPriceNodes = jiDoc.xPath("//div[@id='main3']/div[@class='mbx bd3']/div[@class='tab']/table/tr/td[3]")
            let lowestPriceNodes = jiDoc.xPath("//div[@id='main3']/div[@class='mbx bd3']/div[@class='tab']/table/tr/td[4]")
            let endPriceNodes = jiDoc.xPath("//div[@id='main3']/div[@class='mbx bd3']/div[@class='tab']/table/tr/td[5]")
            let timeNodes = jiDoc.xPath("//div[@id='main3']/div[@class='mbx bd3']/div[@class='tab']/table/tr/td[1]")
            
            //收盤,開盤,最高,最低
            if endPriceNodes!.count > 0{
                for index in 0...endPriceNodes!.count-1{
                    reDic.append([
                        "\(endPriceNodes![index].content!)".double!,
                        "\(startPriceNodes![index].content!)".double!,
                        "\(hightestPriceNodes![index].content!)".double!,
                        "\(lowestPriceNodes![index].content!)".double!,
                    ])
                }
                
            }else{
                reDic = [[0.0]]
            }
            
        }catch{
            print("getDataError")
            reDic = [[0.0]]
        }
        
        return reDic
        
    }
    
    
    
    
    
    func getPriceNow() -> [String:String] {
        
        print("getPriceNow")
        
        let stockUrl = "https://tw.stock.yahoo.com/q/q?s=\(stockNum)"
        var reDic:[String:String]!
        var resultArray:[String] = []
        
        do{
            
            let data = try String(contentsOf: URL(string:stockUrl)!)
            
            
            let jiDoc = Ji(htmlString: data, encoding: String.Encoding.unicode)!
            let stockNode = jiDoc.xPath("/html/body/center/table/tr/td/table/tr[2]/td")
            
            if stockNode!.count > 5{
                for element in stockNode!{
                    resultArray.append("\(element.content!)")
                }
                
                resultArray.removeLast()
                reDic = [
                    "股票代號":"\(self.stockNum)",
                    "時間":resultArray[1],
                    "成交":resultArray[2],
                    "買進":resultArray[3],
                    "賣出":resultArray[4],
                    "漲跌":"\(Double(resultArray[2])!-Double(resultArray[7])!)",
                    "張數":resultArray[6],
                    "昨收":resultArray[7],
                    "開盤":resultArray[8],
                    "最高":resultArray[9],
                    "最低":resultArray[10],
                ]
            }else{
                return ["訊息":"找不到股票呢QQ"]
            }
            
        }catch{
            print("getDataError")
            reDic = ["訊息":"資料取得失敗"]
        }
        
        return reDic
        
    }
    
}
