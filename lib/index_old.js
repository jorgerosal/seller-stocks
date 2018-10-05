
function screenCapturer(worker, asinList){
  // console.log(asinList)
  const Nightmare = require('nightmare');
  const nightmare = Nightmare({ show: true,
                                webPreferences: {images: true}
                              });
  const browser = require('./nightmare');
  const qS = require('./queryString');
  const db = require('./database');

  /*
    1. Initiate browser and login to amazon using electron
    2. Once logged in, callback to getRandomOpen Jobs to DB and update DB to 'On'
    3. Run browseEach and dead-end update data to DB and 'complete'
    4. Loopback to step2.
  */

  //1st step: login to amazon using dummy
  browser.login(nightmare, worker, asinList, startTheJob);
  console.log('I\'m browsing asins')
  function startTheJob(worker, asinList){
    browser.browseBatch(nightmare, asinList , worker, callback);

    function callback(){
      console.log('complete!');
    }
  }
};

////////////////////////////////////////////////////////
//global declaration
const qs = require('./queryString');
const db = require('./database');
const browser = require('./nightmare');

const asinReviewScraper = (worker)=>{ //worker is just a name of the instance
  const Nightmare = require('nightmare');
  const nightmare = Nightmare({ show: true,
                                webPreferences: {images: true}
                              });

  /*
    1. Initiate browser and login to amazon using electron
    2. Once logged in, callback to getRandomOpen Jobs to DB and update DB to 'On'
    3. Run browseEach and dead-end update data to DB and 'complete'
    4. Loopback to step2.
  */

  amazonLogin(worker, nightmare, (worker)=>{
    // startTheJob(startTheJob);
    startTheJob(worker, nightmare);
  })
};

function startTheJob(worker, nightmare){
  getOpenJobs(worker, (data)=>{
    if (data === 'nores'){
      console.log(worker+": no job. chill in 30sec.")
      setTimeout(()=>{startTheJob(worker, nightmare);},30000);
    }
    else{
      runScraper(worker, nightmare, data, (msg)=>{
          console.log(worker+": done! "+ msg);
          startTheJob(worker, nightmare);
      });
    }
  })
}

function amazonLogin(worker, nightmare, cb){
    browser.amzLogin(nightmare, (msg) =>{
      if(msg === 'okay') cb(worker);
      else console.log(worker+': It ends here at login. :(');
    })
}

function getOpenJobs (worker, cb){
  let qStr = qs.getOpenJobs();
  let qsUpdateOn = qs.updateOn;
  db.queryDbGetSomething(qStr, (res)=>{
    //if no available jobs, settimeout and repeat
    if(res.length == 0) cb('nores');
    else{
      qsUpdateOn(res,(qStrOn)=>{
        console.log(qStrOn);
        db.queryDb(qStrOn, (msg)=>{
          if (msg === 'success') cb(res);
          else console.log(worker+": failed to update jobs to On.")
        });
      });
    }
  });
}


function runScraper(worker, nightmare, data, cb){
  ss(0);
  function ss(i){
    let dataRow = data[i];
    console.log('browsing asin '+ dataRow.aws_asin+'.')
    browser.browseEach(worker, nightmare, dataRow , call);

    function call (cho){
      if (cho === 'weGotErrors'){
        // browser.browseEach(worker, nightmare, asin, call);
        console.log('error alert')
      } else {
        i++;
        // console.log(cho)

        qs.updateDoneComplete(cho,(qStr)=>{
          db.queryDb(qStr,(msg)=>{
            console.log(worker+": done with "+ cho.aws_asin+ " review: "+ cho.s3_asinTotalCustomerReview+", "+cho.s3_catalogTotalCustomerReview+". " + msg);
          })
        })
        if(i === data.length) cb('done!')
        else setTimeout(()=>{ss(i);},2000);
      }
    }
  }
}

// asinReviewScraper('Jorge');
module.exports = asinReviewScraper;
