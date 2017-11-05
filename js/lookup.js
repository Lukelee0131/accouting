var fdb = new ForerunnerDB();
var db = fdb.db("accounting");
var accountingCollection = db.collection('accounting');
accountingCollection.load();



function Search() {
    if ($('input:checked').val() == "curMonth") {
        $("#lookupTable2").find("tr").remove();
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
                $orderBy: {"date": -1}
            }
        );
        for (var i = 0; i < accountings.length; i++) {
            var date = accountings[i].date;
            var category = accountings[i].category;
            var item = accountings[i].item;
            var cost = accountings[i].cost;
            $("#lookupTable2").append(
                "<tr><td>" + date +
                "</td><td>" + category +
                "</td><td>" + item +
                "</td><td>" + cost +
                "</td></tr>");
        }
    } else {
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
            $("#lookupTable2").append(
                "<tr><td>" + date +
                "</td><td>" + category +
                "</td><td>" + item +
                "</td><td>" + cost +
                "</td></tr>");
        }
    }

};

