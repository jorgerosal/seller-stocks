const fs = require('fs');
var dataFile = fs.createWriteStream("dataRes.txt", 'utf8');
// var jsonFile = fs.createWriteStream("dataRes.JSON", 'utf8');

const cheerio = require('cheerio');

const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true,
                              webPreferences: {images: true}
                            });

function amzLogin(callback){
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


function browseEach(asin, callback){
  console.log('browsing asin: '+ asin);
  const url = "https://www.amazon.com/dp/"+asin+"/ref=olp_product_details?_encoding=UTF8&me=";

  nightmare
  .goto(url)
  .wait('#twotabsearchtextbox')
  .wait(2000)
  .evaluate(() => document.querySelector('body').outerHTML)
  .then(function(htmlbody){
      console.log('success')
      getProductDetails(htmlbody, asin);
      setTimeout(()=> callback(), 2000);
  })
  .catch(function (error) {
    console.log('Error:', error);
    callback('weGotErrors')
  });
}


function getProductDetails(html, asin){
  // console.log('Im here')
  const $ = cheerio.load(html);
  const row = [];
// #altImages > ul > li:nth-child(2)
      let image1 = $('#landingImage').attr('data-old-hires');
      let image2 = $('#landingImage').attr('src');
      let image3 = $('#altImages > ul > li:nth-child(2) > span > span > span > span[id*="autoid-"] > img').attr('src');
      let image4 = $('#altImages > ul > li:nth-child(3) > span > span > span > span[id*="autoid-"] > img').attr('src');
      let image5 = $('#altImages > ul > li:nth-child(4) > span > span > span > span[id*="autoid-"] > img').attr('src');
      let image6 = $('#altImages > ul > li:nth-child(5) > span > span > span > span[id*="autoid-"] > img').attr('src');
      let image7 = $('#altImages > ul > li:nth-child(6) > span > span > span > span[id*="autoid-"] > img').attr('src');
      let image8 = $('#altImages > ul > li:nth-child(7) > span > span > span > span[id*="autoid-"] > img').attr('src');
      let image9 = $('#altImages > ul > li:nth-child(8) > span > span > span > span[id*="autoid-"] > img').attr('src');
      let description = cho($('#productDescription').text());
      let bullet = cho($('#feature-bullets > ul').html());
      let bullet1 = cho($('#feature-bullets > ul > li:nth-child(1) > span').text());
      let bullet2 = cho($('#feature-bullets > ul > li:nth-child(2) > span').text());
      let bullet3 = cho($('#feature-bullets > ul > li:nth-child(3) > span').text());
      let bullet4 = cho($('#feature-bullets > ul > li:nth-child(4) > span').text());
      let bullet5 = cho($('#feature-bullets > ul > li:nth-child(5) > span').text());


      var out = '>' + asin +
                '\t>' + image1 +
                '\t>' + image2 +
                '\t>' + image3 +
                '\t>' + image4 +
                '\t>' + image5 +
                '\t>' + image6 +
                '\t>' + image7 +
                '\t>' + image8 +
                '\t>' + image9 +
                '\t>' + description +
                '\t>' + bullet +
                '\t>' + bullet1 +
                '\t>' + bullet2 +
                '\t>' + bullet3 +
                '\t>' + bullet4 +
                '\t>' + bullet5  + '\n';

      dataFile.write(out,'utf8');
      // jsonFile.write(JSON.stringify(x)+',\n', 'utf8');
}


function cho(str){
 if (str == null) { // test for null or undefined
        return "";
      } else{

        return str.replace(/(?:\r\n\s|\r|\s|\n|\s\s+)/g, ' ').replace(/ +(?= )/g,'');
      }


}



function cleanText (srt){
    return srt
            .match(/seller=(.*$)/g)[0]
            .replace("seller=", "")
}


amzLogin(()=>{
  console.log('done');
  let asinList = arr();
  query(0);

  function query(i){
    let asin = asinList[i];

    browseEach(asin, ()=>{


      console.log('done with asin: '+ asin);


      i++;
      if(i === asinList.length){
        console.log('done all!')
      }
      else query(i);
    })

  }


})


function arr(){
return [
'B00212GDWE',
'B00205C34Y',
'B002056UX4',
'B00205FIFU',
'B00205C3NA',
'B00212Q27U',
'B00212MGIE',
'B00212OH68',
'B001S3OS9M',
'B00212KE42',
'B00205E12G',
'B00212Q036',
'B002056U9S',
'B001S3IX7K',
'B002056TF8',
'B00TJ1UFXI',
'B00212OMFO',
'B0021Z1JGG',
'B016GYV04I',
'B00212GDHE',
'B00212MJT0',
'B00212IBSI',
'B07BYTLY6Z',
'B07CBJSSM2',
'B07CBK5QJZ',
'B07BYSB8FF',
'B07BYQVWGR',
'B074T3CWGH',
'B07BYVQCTR',

];

}
