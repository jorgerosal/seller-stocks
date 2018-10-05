var counter = 0;

function amzLogin(nightmare, callback){
  const loginInfo = require('./credentials').amzLogin();


  nightmare
  // .viewport(1024, 1024)
  .goto(loginInfo.url)
  .wait('#ap_email')
  .type('#ap_email', loginInfo.user+'\u000d')
  .wait('#ap_password')
  .type('#ap_password', loginInfo.password+'\u000d')
  .wait('#twotabsearchtextbox')
  .then(function(data){
      callback('okay');
  })
  .catch(function (error) {
    console.error('Error:', error);
    callback('duh');
  });
}

function browseEach(worker, nightmare, dataRow , callback){
  let asin = dataRow.aws_asin;
  const url = "https://www.amazon.com/gp/offer-listing/"+asin+"/ref=olp_f_new?ie=UTF8&f_all=true&f_new=true&f_primeEligible=true";
  nightmare
  .goto(url)
  .wait('div.olpSellerColumn')
  .evaluate(() => document.querySelector('body').outerHTML)
  .then(function(htmlbody){
      getSellerList(htmlbody, asin, (data)=>{
        dataRow.result = data;
        counter++;
        callback(dataRow);
      });
  })
  .catch(function (error) {
    console.log('Error:', error);
    dataRow.result = {
      rows              : 0,
      numberOfFbaSeller : 0,
      isAmazonSeller    : 'No',
      amzOfferListingId : '-',
      amzPrice          : '-'
    };
    counter++;
    callback(dataRow);

    // callback('weGotErrors')
  });
}

function getSellerList(html, asin, cb){
  /*
  count fba sellers
  check if amazon is a sellers
  if yes, then post amazon inventory

  this function returns:
            {
              #ofFbaSeller : int,
              isAmazonSeller: boolean,
              amzOfferListingId: string if amazon is a seller, NA
          }
  */
  const cheerio = require('cheerio');
  const $ = cheerio.load(html);
  const row = [];

  // $('#olpOfferList > div > div > div.olpOffer').each(function(i, elem) {
  $('div.olpOffer').each(function(i, elem) {

      let $ = cheerio.load(this);

      let seller = $('div.olpSellerColumn > h3 > span > a').html();
      let merchantId = $('div.olpSellerColumn > h3 > span > a').attr('href');
      let price = cho($('div.olpPriceColumn > span.olpOfferPrice').html());
      let offerListingId = $('form > input[name*="offeringID"]').attr('value');
      let primeBadge = $('i').hasClass('a-icon-prime');
      let amazonSeller = $('div.olpSellerColumn > h3 > img').attr('alt');
      let amazonSeller2 = $('h3.olpSellerName > img').attr('alt');
      let amazonWh = $('div.olpSellerColumn > h3 > a > img').attr('alt');



      // console.log(seller);
      if (amazonSeller == 'Amazon.com' || amazonSeller2 == 'Amazon.com'){
          console.log('Amazon is a seller.');
          seller = 'Amazon.com';
          merchantId = 'ATVPDKIKX0DER';
      }

      if (amazonWh == 'Amazon Warehouse'){
        console.log('Amazon Warehouse is a seller.');
        seller = 'Amazon Warehouse';
        merchantId = 'A2L77EE7U53NWQ';
      }
       // if (seller == null){
       //  seller = 'Uknown';
       //  merchantId = 'NA'

        // merchantId = cleanText(merchantId);


      // if (seller == "Zappos.com"){
      //     merchantId = "A38MYE29B8LFR"
      // }

      row[i] = {
        'asin'   : asin,
        'seller' : seller,
        'amazonSeller': amazonSeller,
        'merchantId': merchantId,
        'offerListingId': offerListingId,
        'price'  : price,
        'primeBadge': primeBadge
      };
  });

  let amzData = row.filter(function(e){
    return e.seller == "Amazon.com";
  });

  let primeList = row.filter(function(e){
    return e.seller == "Amazon.com" || e.primeBadge == true;
  });

  let numberOfFbaSeller = primeList.length;
  let isAmazonSeller = 'No';
  let amzOfferListingId = 'NA';
  let amzPrice = 'NA';
  if(amzData.length == 1){
    isAmazonSeller = 'Yes';
    amzOfferListingId = amzData[0].offerListingId;
    amzPrice = amzData[0].price;
  }

  let result = {
    rows              : row,
    numberOfFbaSeller : numberOfFbaSeller,
    isAmazonSeller    : isAmazonSeller,
    amzOfferListingId : amzOfferListingId,
    amzPrice          : amzPrice
  };
  console.log(result);
  cb(result);
} // end of getSellerList function

function cleanText (srt){
    if(srt == null) return 'NA';
    return srt
            .match(/seller=(.*$)/g)[0]
            .replace("seller=", "")
}

function cho(srt){
  if(srt == null){
    return srt;
  } else{
    return srt.trim();
  }
}

module.exports = {
  amzLogin    : amzLogin,
  browseEach  : browseEach
}
