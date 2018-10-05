// all querystrings are in here for mysql.


const getOpenJobs = ()=>{
    let qStr = "SELECT * FROM demand_data.tb_master where processStatus = 'on' and jobStatusAwsApi = 'done' and jobStatusBuyboxPage = 'open' ORDER BY batchId asc Limit 20";
    return qStr;
}

const updateOn = (jsonArray, cb)=>{
  let idList = "";

  let itemsProcessed = 0;

  jsonArray.forEach( function(e){
       idList = idList + e.id;
       itemsProcessed++;
       if(itemsProcessed === jsonArray.length){
           let qStr = "UPDATE demand_data.tb_master set jobStatusBuyboxPage = 'on' where id in ("+idList+")";
           cb(qStr);
       } else idList = idList + ",";
  })
};

const updateDoneComplete = (x, cb)=>{ //jsonArray is the row that contains matched.
    //jobstatus api
    let qStr = ''
    let inv_amazonInventory = 0;
    let total_Inventory = x.result.numberOfFbaSeller;
    if(x.result.isAmazonSeller == 'Yes'){
      inv_amazonInventory = Math.floor((Math.random() * 100) + 1);
      total_Inventory = inv_amazonInventory;
    }
    if(x.result.numberOfFbaSeller > 0){
      total_Inventory = total_Inventory + Math.floor((Math.random() * 200) + 1);
    }
    // let priceStr = x.aws_lowestPrice;
    // if (priceStr == 'null' || priceStr == '-' || priceStr == 'Too low to display'){
    //     qStr = "UPDATE demand_data.tb_master set jobStatusBuyboxPage = 'done' , aws_lowestPrice = '"+x.result.+"',inv_primeInventoryTotal = '"+total_Inventory+"', s1_numberOfFbaSeller = '"+x.result.numberOfFbaSeller+"',s1_isAmazonSeller = '"+x.result.isAmazonSeller+"',s1_amzOfferListingId = '"+x.result.amzOfferListingId+"',s1_amazonPrice = '"+x.result.amzPrice+"',inv_amazonInventory = '"+inv_amazonInventory+"' where id = '"+x.id+"'";
    //     console.log(qStr);
    // }
    // qStr = "UPDATE demand_data.tb_master set jobStatusBuyboxPage = 'done' , inv_primeInventoryTotal = '"+total_Inventory+"', s1_numberOfFbaSeller = '"+x.result.numberOfFbaSeller+"',s1_isAmazonSeller = '"+x.result.isAmazonSeller+"',s1_amzOfferListingId = '"+x.result.amzOfferListingId+"',s1_amazonPrice = '"+x.result.amzPrice+"',inv_amazonInventory = '"+inv_amazonInventory+"' where id = '"+x.id+"'";

    qStr = "UPDATE demand_data.tb_master set jobStatusBuyboxPage = 'done', s1_isAmazonSeller = '"+x.result.isAmazonSeller+"' where id = '"+x.id+"'";
    console.log(qStr);
    cb(qStr);
}

module.exports = {
  getOpenJobs         :   getOpenJobs,
  updateOn            :   updateOn,
  updateDoneComplete  :   updateDoneComplete
};
