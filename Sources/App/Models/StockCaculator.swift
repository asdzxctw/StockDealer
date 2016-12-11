//
//  StockCaculator.swift
//  StockDealer
//
//  Created by 陳奕嘉 on 2016/12/11.
//
//

import Foundation

class StockCaculator{
    var start:[Double] = []
    var end:[Double] = []
    var highest:[Double] = []
    var lowest:[Double] = []
    
    init(data:[[Double]]) {
        for index in 0...data.count-1 {
            end.append(data[index][0])
            start.append(data[index][1])
            highest.append(data[index][2])
            lowest.append(data[index][3])
        }
    }
    
    func RSI() -> Double {
        var AUn:Double = 0
        var ADn:Double = 0
        var up:Double = 0
        var down:Double = 0
        for index in 1...end.count-1 {
            if(end[index]>end[index-1]){
                AUn+=end[index]-end[index-1]
                up += 1
            }
            else{
                ADn+=end[index-1]-end[index]
                down += 1
            }
        }
        
        AUn /= up;
        ADn /= down;
        return AUn/(AUn+ADn)*100;
    }
    
    
}
