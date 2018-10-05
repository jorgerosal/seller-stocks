////////////////////////////////////////////////////////
//global declaration
const qs = require('./queryString');
const db = require('./database');
const browser = require('./nightmare');

const asinReviewScraper = (worker)=>{ //worker is just a name of the instance
  const Nightmare = require('nightmare');
  const nightmare = Nightmare({ show: true,
                                webPreferences: {images: true},
                                waitTimeout: 7000 // in ms
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
            console.log(worker+": done with "+ cho.aws_asin+ " amazon: "+ cho.result.isAmazonSeller+", "+cho.result.numberOfFbaSeller+". " + msg);
          })
        })
        if(i === data.length) cb('done!')
        else setTimeout(()=>{ss(i);},1000);
      }
    }
  }
}

// asinReviewScraper('Jorge');
module.exports = asinReviewScraper;
