var fdb = new ForerunnerDB();
var db = fdb.db("accounting");
var accountingCollection = db.collection('accounting');
accountingCollection.load();



function Search() {
    $("#lookupTable2").find("tr").remove();
    if ($('input:checked').val() == "curMonth") {
        var date = new Date();//new 一個叫做Date的物件
        var year = date.getUTCFullYear();// 取得當前的年份,2017_\
        var month = date.getUTCMonth() + 1;// 取得當前月份
        //把一位數補足成兩位數
        if (month < 10) {
            month = "0" + month;
        }
        //日期格式: 2017-10-01
        var dateString = year + "-" + month + "-01";
        var accountings = accountingCollection.find(
            {
                date: {
                    $gte: dateString
                }
            },
            {
                $orderBy: { "date": -1 }
            }
        );
        var eatCost = 0;
        var playCost = 0;
        var otherCost = 0;
        var totalCost = 0;
        for (var i = 0; i < accountings.length; i++) {
            var date = accountings[i].date;
            var category = accountings[i].category;
            var item = accountings[i].item;
            var cost = accountings[i].cost;
            var id = accountings[i]._id;

            $("#lookupTable2").append(
                "<tr><td>" + date +
                "</td><td>" + category +
                "</td><td>" + item +
                "</td><td>" + cost +
                "</td><td>" + "<button class=\"btn btn-danger little\" onclick=\"remove('"+id+"')\">刪除</button>" +
                "</td></tr>");
            if (accountings[i].category == "吃的") {
                eatCost += accountings[i].cost / 1
                console.log(eatCost)
            }
            if (accountings[i].category == "玩的") {
                playCost += accountings[i].cost / 1
                console.log(playCost)
            }
            if (accountings[i].category == "其他") {
                otherCost += accountings[i].cost / 1
                console.log(otherCost)
            }
        }
        totalCost = eatCost + playCost + otherCost;
    } else {
        var eatCost = 0;
        var playCost = 0;
        var otherCost = 0;
        var totalCost = 0;
        var accountings = accountingCollection.find(
            {
                date: {
                    $gte: $("#fromTime").val(),
                    $lte: $("#toTime").val()
                }
            },
            {
                $orderBy: {
                    "date": -1
                }
            }
        );
        for (var i = 0; i < accountings.length; i++) {
            var date = accountings[i].date;
            var category = accountings[i].category;
            var item = accountings[i].item;
            var cost = accountings[i].cost;
            var id = accountings[i]._id;

            $("#lookupTable2").append(
                "<tr><td>" + date +
                "</td><td>" + category +
                "</td><td>" + item +
                "</td><td>" + cost +
                "</td><td>" + "<button class=\"btn btn-danger little\" onclick=\"remove('"+id+"')\">刪除</button>" +
                "</td></tr>");
            if (accountings[i].category == "吃的") {
                eatCost += accountings[i].cost / 1
                console.log(eatCost)
            }
            if (accountings[i].category == "玩的") {
                playCost += accountings[i].cost / 1
                console.log(playCost)
            }
            if (accountings[i].category == "其他") {
                otherCost += accountings[i].cost / 1
                console.log(otherCost)
            }
        }
        totalCost = eatCost + playCost + otherCost;

    }
    $("#eatCost").text(eatCost)
    $("#playCost").text(playCost)
    $("#otherCost").text(otherCost)
    $("#totalCost").text(totalCost)
    $("#eatper").text(Math.round(eatCost/totalCost*100)+"%")
    $("#playper").text(Math.round(playCost/totalCost*100)+"%")
    $("#otherper").text(Math.round(otherCost/totalCost*100)+"%")
}
function remove(id){
       accountingCollection.remove({
           _id: id
       });
       accountingCollection.save();
       Search()
    }

