var fdb = new ForerunnerDB();
var db = fdb.db("accounting");
var accountingCollection = db.collection('accounting');
accountingCollection.load(function(){
    var accountings = accountingCollection.find(
        {},
        {
            $orderBy: {"date": -1},
            $limit: 10    
        }
    );
    for(var i = 0;i < accountings.length; i++){
        var date = accountings[i].date;
        var category = accountings[i].category;
        var item = accountings[i].item;
        var cost = accountings[i].cost;
        $("#accountingTable").append(
            "<tr><td>" + date +
            "</td><td>" + category +
            "</td><td>" + item +
            "</td><td>" + cost +
            "</td></tr>"); 
    }
});
