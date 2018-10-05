var countryLanguage = [];
var referralRatio = 0;
var fbaData;
countryLanguage['de'] = 'de_DE';
countryLanguage['it'] = 'it_IT';
countryLanguage['es'] = 'es_ES';
countryLanguage['co.uk'] = 'en_GB';
countryLanguage['fr'] = 'fr_FR';
countryLanguage['ca'] = 'en_CA';
countryLanguage['com'] = 'en_US';
countryLanguage['com.mx'] = 'es_MX';

String.prototype.getNums= function(){
    var rx=/[+-]?((\.\d+)|(\d+(\.\d+)?)([eE][+-]?\d+)?)/g,
    mapN= this.match(rx) || [];
    return mapN.map(Number);
};
var hasJustUpdated = 0;
var updateTableSorter = function() {
    if ($("table#main-table .small-loader").length == 0)
    {
        $("table#main-table").trigger("update");
    }
    else
    {
        if (hasJustUpdated == 0)
        {
            $("table#main-table").trigger("update");
            hasJustUpdated = 1;
            setTimeout(function(){
                hasJustUpdated = 0;
            }, 2000);
        }
    }
};

var getEstimatedSales = function(Category, SalesRank) {
  Category = $.trim(Category);

  if (!IsNumeric(SalesRank)) {
    return;
  }

  var EstimatedSales;
  if (Category == "Toys & Games") {
    Slop = -0.910196205564476;
    Offset = 63866.5924884108;
    LogOffset = Math.log10(Offset);
    LogRank = Math.log10(SalesRank);
    LogES = (Slop * LogRank) + LogOffset;
    EstimatedSales = Math.pow(10, LogES);
    if (SalesRank < 400) {
      EstimatedSales = (1 + ( 0.0004 * (400 - SalesRank))) * 76;
      Adjust = 1; //Constant
    } else if (SalesRank < 600)
    Adjust = 0.3;
    else if (SalesRank < 800)
    Adjust = 0.3;
    else if (SalesRank < 1000)
    Adjust = 0.35;
    else if (SalesRank < 2000)
    Adjust = 0.4;
    else if (SalesRank < 4000)
    Adjust = 0.7;
    else if (SalesRank < 6000)
    Adjust = 0.9;
    else if (SalesRank < 8000)
    Adjust = 0.9;
    else if (SalesRank < 10000)
    Adjust = 0.9;
    else if (SalesRank < 20000)
    Adjust = 0.9;
    else if (SalesRank < 40000)
    Adjust = 0.8;
    else if (SalesRank < 60000)
    Adjust = 0.8;
    else if (SalesRank < 80000)
    Adjust = 0.7;
    else if (SalesRank < 100000)
    Adjust = 0.7;
    else if (SalesRank < 200000)
    Adjust = 0.7;
    else if (SalesRank < 400000)
    Adjust = 0.35;
    else if (SalesRank < 600000)
    Adjust = 0.25;
    else if (SalesRank < 800000)
    Adjust = 0.25;
    else if (SalesRank < 1000000)
    Adjust = 0.15;
    else if (SalesRank >= 1000000)
    Adjust = 0.10; //constant

    EstimatedSales = EstimatedSales * Adjust;
  } else if (Category == "Automotive" || Category == "Tools & Home Improvement") {
    Slop = -0.633136406198535;
    Offset = 1459.97464905557;
    LogOffset = Math.log10(Offset);
    LogRank = Math.log10(SalesRank);
    LogES = (Slop * LogRank) + LogOffset;
    EstimatedSales = Math.pow(10, LogES)

    if (SalesRank < 400) {
      EstimatedSales = (1 + ( 0.0004 * (400 - SalesRank))) * 63;
      Adjust = 0.65; //Constant
    } else if (SalesRank < 600)
    Adjust = 0.65;
    else if (SalesRank < 800)
    Adjust = 0.65;
    else if (SalesRank < 1000)
    Adjust = 0.7;
    else if (SalesRank < 2000)
    Adjust = 0.7;
    else if (SalesRank < 4000)
    Adjust = 0.7;
    else if (SalesRank < 6000)
    Adjust = 0.9;
    else if (SalesRank < 8000)
    Adjust = 0.9;
    else if (SalesRank < 10000)
    Adjust = 0.9;
    else if (SalesRank < 20000)
    Adjust = 0.9;
    else if (SalesRank < 40000)
    Adjust = 0.8;
    else if (SalesRank < 60000)
    Adjust = 0.8;
    else if (SalesRank < 80000)
    Adjust = 0.7;
    else if (SalesRank < 100000)
    Adjust = 0.7;
    else if (SalesRank < 200000)
    Adjust = 0.7;
    else if (SalesRank < 400000)
    Adjust = 0.35;
    else if (SalesRank < 600000)
    Adjust = 0.25;
    else if (SalesRank < 800000)
    Adjust = 0.25;
    else if (SalesRank < 1000000)
    Adjust = 0.15;
    else if (SalesRank >= 1000000)
    Adjust = 0.10; //constant

    EstimatedSales = EstimatedSales * Adjust;
  } else if (Category == "Home Improvements") {
    Slop = -0.892647454978935;
    Offset = 31871.6649985098;
    LogOffset = Math.log10(Offset);
    LogRank = Math.log10(SalesRank);
    LogES = (Slop * LogRank) + LogOffset;
    EstimatedSales = Math.pow(10, LogES)

    if (SalesRank < 400) {
      EstimatedSales = (1 + ( 0.0004 * (400 - SalesRank))) * 88;
      Adjust = 1; //Constant
    } else if (SalesRank < 600)
    Adjust = 0.3;
    else if (SalesRank < 800)
    Adjust = 0.3;
    else if (SalesRank < 1000)
    Adjust = 0.35;
    else if (SalesRank < 2000)
    Adjust = 0.4;
    else if (SalesRank < 4000)
    Adjust = 0.7;
    else if (SalesRank < 6000)
    Adjust = 0.9;
    else if (SalesRank < 8000)
    Adjust = 0.9;
    else if (SalesRank < 10000)
    Adjust = 0.9;
    else if (SalesRank < 20000)
    Adjust = 0.9;
    else if (SalesRank < 40000)
    Adjust = 0.8;
    else if (SalesRank < 60000)
    Adjust = 0.8;
    else if (SalesRank < 80000)
    Adjust = 0.7;
    else if (SalesRank < 100000)
    Adjust = 0.7;
    else if (SalesRank < 200000)
    Adjust = 0.7;
    else if (SalesRank < 400000)
    Adjust = 0.35;
    else if (SalesRank < 600000)
    Adjust = 0.25;
    else if (SalesRank < 800000)
    Adjust = 0.25;
    else if (SalesRank < 1000000)
    Adjust = 0.15;
    else if (SalesRank >= 1000000)
    Adjust = 0.10; //constant

    EstimatedSales = EstimatedSales * Adjust;
  } else if (Category == "Kitchen & Dining") {
    Slop = -1.01410732238537;
    Offset = 101201.296675844;
    LogOffset = Math.log10(Offset);
    LogRank = Math.log10(SalesRank);
    LogES = (Slop * LogRank) + LogOffset;
    EstimatedSales = Math.pow(10, LogES)

    if (SalesRank < 400) {
      EstimatedSales = (1 + ( 0.0004 * (400 - SalesRank))) * 98;
      Adjust = 1; //Constant
    } else if (SalesRank < 600)
    Adjust = 0.3;
    else if (SalesRank < 800)
    Adjust = 0.3;
    else if (SalesRank < 1000)
    Adjust = 0.35;
    else if (SalesRank < 2000)
    Adjust = 0.4;
    else if (SalesRank < 4000)
    Adjust = 0.7;
    else if (SalesRank < 6000)
    Adjust = 0.9;
    else if (SalesRank < 8000)
    Adjust = 0.9;
    else if (SalesRank < 10000)
    Adjust = 0.9;
    else if (SalesRank < 20000)
    Adjust = 0.9;
    else if (SalesRank < 40000)
    Adjust = 0.8;
    else if (SalesRank < 60000)
    Adjust = 0.8;
    else if (SalesRank < 80000)
    Adjust = 0.7;
    else if (SalesRank < 100000)
    Adjust = 0.7;
    else if (SalesRank < 200000)
    Adjust = 0.7;
    else if (SalesRank < 400000)
    Adjust = 0.35;
    else if (SalesRank < 600000)
    Adjust = 0.25;
    else if (SalesRank < 800000)
    Adjust = 0.25;
    else if (SalesRank < 1000000)
    Adjust = 0.15;
    else if (SalesRank >= 1000000)
    Adjust = 0.10; //constant

    EstimatedSales = EstimatedSales * Adjust;
  } else if (Category == "Home and Kitchen" || Category == "Home & Kitchen") {
    Slop = -0.829847569905984;
    Offset = 32355.1377081117;
    LogOffset = Math.log10(Offset);
    LogRank = Math.log10(SalesRank);
    LogES = (Slop * LogRank) + LogOffset;
    EstimatedSales = Math.pow(10, LogES)

    if (SalesRank < 400) {
      EstimatedSales = (1 + ( 0.0004 * (400 - SalesRank))) * 128;
      Adjust = 1; //Constant
    } else if (SalesRank < 600)
    Adjust = 0.3;
    else if (SalesRank < 800)
    Adjust = 0.3;
    else if (SalesRank < 1000)
    Adjust = 0.35;
    else if (SalesRank < 2000)
    Adjust = 0.4;
    else if (SalesRank < 4000)
    Adjust = 0.7;
    else if (SalesRank < 6000)
    Adjust = 0.9;
    else if (SalesRank < 8000)
    Adjust = 0.9;
    else if (SalesRank < 10000)
    Adjust = 0.9;
    else if (SalesRank < 20000)
    Adjust = 0.9;
    else if (SalesRank < 40000)
    Adjust = 0.8;
    else if (SalesRank < 60000)
    Adjust = 0.8;
    else if (SalesRank < 80000)
    Adjust = 0.7;
    else if (SalesRank < 100000)
    Adjust = 0.7;
    else if (SalesRank < 200000)
    Adjust = 0.7;
    else if (SalesRank < 400000)
    Adjust = 0.35;
    else if (SalesRank < 600000)
    Adjust = 0.25;
    else if (SalesRank < 800000)
    Adjust = 0.25;
    else if (SalesRank < 1000000)
    Adjust = 0.15;
    else if (SalesRank >= 1000000)
    Adjust = 0.10; //constant

    EstimatedSales = EstimatedSales * Adjust;
  } else if (Category == "Health & Personal Care") {
    Slop = -1.11221344800393;
    Offset = 402609.1695426;
    LogOffset = Math.log10(Offset);
    LogRank = Math.log10(SalesRank);
    LogES = (Slop * LogRank) + LogOffset;
    EstimatedSales = Math.pow(10, LogES)

    if (SalesRank < 400) {
      EstimatedSales = (1 + ( 0.0004 * (400 - SalesRank))) * 158;
      Adjust = 1; //Constant
    } else if (SalesRank < 600)
    Adjust = 0.3;
    else if (SalesRank < 800)
    Adjust = 0.3;
    else if (SalesRank < 1000)
    Adjust = 0.35;
    else if (SalesRank < 2000)
    Adjust = 0.4;
    else if (SalesRank < 4000)
    Adjust = 0.7;
    else if (SalesRank < 6000)
    Adjust = 0.9;
    else if (SalesRank < 8000)
    Adjust = 0.9;
    else if (SalesRank < 10000)
    Adjust = 0.9;
    else if (SalesRank < 20000)
    Adjust = 0.9;
    else if (SalesRank < 40000)
    Adjust = 0.8;
    else if (SalesRank < 60000)
    Adjust = 0.8;
    else if (SalesRank < 80000)
    Adjust = 0.7;
    else if (SalesRank < 100000)
    Adjust = 0.7;
    else if (SalesRank < 200000)
    Adjust = 0.7;
    else if (SalesRank < 400000)
    Adjust = 0.35;
    else if (SalesRank < 600000)
    Adjust = 0.25;
    else if (SalesRank < 800000)
    Adjust = 0.25;
    else if (SalesRank < 1000000)
    Adjust = 0.15;
    else if (SalesRank >= 1000000)
    Adjust = 0.10; //constant

    EstimatedSales = EstimatedSales * Adjust;
  } else if (Category == "Sports & Outdoors") {
    Slop = -0.890277344864231;
    Offset = 30790.3538325155;
    LogOffset = Math.log10(Offset);
    LogRank = Math.log10(SalesRank);
    LogES = (Slop * LogRank) + LogOffset;
    EstimatedSales = Math.pow(10, LogES)

    if (SalesRank < 400) {
      EstimatedSales = (1 + ( 0.0004 * (400 - SalesRank))) * 97;
      Adjust = 1; //Constant
    } else if (SalesRank < 600)
    Adjust = 0.3;
    else if (SalesRank < 800)
    Adjust = 0.3;
    else if (SalesRank < 1000)
    Adjust = 0.35;
    else if (SalesRank < 2000)
    Adjust = 0.4;
    else if (SalesRank < 4000)
    Adjust = 0.7;
    else if (SalesRank < 6000)
    Adjust = 0.9;
    else if (SalesRank < 8000)
    Adjust = 0.9;
    else if (SalesRank < 10000)
    Adjust = 0.9;
    else if (SalesRank < 20000)
    Adjust = 0.9;
    else if (SalesRank < 40000)
    Adjust = 0.8;
    else if (SalesRank < 60000)
    Adjust = 0.8;
    else if (SalesRank < 80000)
    Adjust = 0.7;
    else if (SalesRank < 100000)
    Adjust = 0.7;
    else if (SalesRank < 200000)
    Adjust = 0.7;
    else if (SalesRank < 400000)
    Adjust = 0.35;
    else if (SalesRank < 600000)
    Adjust = 0.25;
    else if (SalesRank < 800000)
    Adjust = 0.25;
    else if (SalesRank < 1000000)
    Adjust = 0.15;
    else if (SalesRank >= 1000000)
    Adjust = 0.10; //constant

    EstimatedSales = EstimatedSales * Adjust;
  } else if (Category == "Beauty" || Category == "Beauty & Personal Care"  || Category == "Health & Household" || Category == "Products") {
    Slop = -0.935079666570251;
    Offset = 44648.3295127306;
    LogOffset = Math.log10(Offset);
    LogRank = Math.log10(SalesRank);
    LogES = (Slop * LogRank) + LogOffset;
    EstimatedSales = Math.pow(10, LogES)

    if (SalesRank < 600) {
      EstimatedSales = (1 + ( 0.0004 * (400 - SalesRank))) * 84;
      Adjust = 1; //Constant
    } else if (SalesRank < 600)
    Adjust = 0.4;
    else if (SalesRank < 800)
    Adjust = 0.4;
    else if (SalesRank < 1000)
    Adjust = 0.45;
    else if (SalesRank < 2000)
    Adjust = 0.5;
    else if (SalesRank < 4000)
    Adjust = 0.8;
    else if (SalesRank < 6000)
    Adjust = 0.9;
    else if (SalesRank < 8000)
    Adjust = 0.9;
    else if (SalesRank < 10000)
    Adjust = 0.9;
    else if (SalesRank < 20000)
    Adjust = 0.9;
    else if (SalesRank < 40000)
    Adjust = 0.8;
    else if (SalesRank < 60000)
    Adjust = 0.8;
    else if (SalesRank < 80000)
    Adjust = 0.7;
    else if (SalesRank < 100000)
    Adjust = 0.7;
    else if (SalesRank < 200000)
    Adjust = 0.7;
    else if (SalesRank < 400000)
    Adjust = 0.35;
    else if (SalesRank < 600000)
    Adjust = 0.25;
    else if (SalesRank < 800000)
    Adjust = 0.25;
    else if (SalesRank < 1000000)
    Adjust = 0.15;
    else if (SalesRank >= 1000000)
    Adjust = 0.10; //constant

    EstimatedSales = EstimatedSales * Adjust;
  } else if (Category == "Patio, Lawn & Garden") {
    Slop = -0.8687913834089;
    Offset = 12942.373575964;
    LogOffset = Math.log10(Offset);
    LogRank = Math.log10(SalesRank);
    LogES = (Slop * LogRank) + LogOffset;
    EstimatedSales = Math.pow(10, LogES)

    if (SalesRank < 400) {
      EstimatedSales = (1 + ( 0.0004 * (400 - SalesRank))) * 116;
      Adjust = 1; //Constant
    } else if (SalesRank < 600)
    Adjust = 0.3;
    else if (SalesRank < 800)
    Adjust = 0.3;
    else if (SalesRank < 1000)
    Adjust = 0.35;
    else if (SalesRank < 2000)
    Adjust = 0.4;
    else if (SalesRank < 4000)
    Adjust = 0.7;
    else if (SalesRank < 6000)
    Adjust = 0.9;
    else if (SalesRank < 8000)
    Adjust = 0.9;
    else if (SalesRank < 10000)
    Adjust = 0.9;
    else if (SalesRank < 20000)
    Adjust = 0.9;
    else if (SalesRank < 40000)
    Adjust = 0.8;
    else if (SalesRank < 60000)
    Adjust = 0.8;
    else if (SalesRank < 80000)
    Adjust = 0.7;
    else if (SalesRank < 100000)
    Adjust = 0.7;
    else if (SalesRank < 200000)
    Adjust = 0.7;
    else if (SalesRank < 400000)
    Adjust = 0.35;
    else if (SalesRank < 600000)
    Adjust = 0.25;
    else if (SalesRank < 800000)
    Adjust = 0.25;
    else if (SalesRank < 1000000)
    Adjust = 0.15;
    else if (SalesRank >= 1000000)
    Adjust = 0.10; //constant

    EstimatedSales = EstimatedSales * Adjust;
  } else if (Category == "Grocery & Gourmet Food") {
    Slop = -1.19433041346734;
    Offset = 579199.138930291;
    LogOffset = Math.log10(Offset);
    LogRank = Math.log10(SalesRank);
    LogES = (Slop * LogRank) + LogOffset;
    EstimatedSales = Math.pow(10, LogES)

    if (SalesRank < 400) {
      EstimatedSales = (1 + ( 0.0004 * (400 - SalesRank))) * 106;
      Adjust = 1; //Constant
    } else if (SalesRank < 600)
    Adjust = 0.3;
    else if (SalesRank < 800)
    Adjust = 0.3;
    else if (SalesRank < 1000)
    Adjust = 0.35;
    else if (SalesRank < 2000)
    Adjust = 0.4;
    else if (SalesRank < 4000)
    Adjust = 0.7;
    else if (SalesRank < 6000)
    Adjust = 0.9;
    else if (SalesRank < 8000)
    Adjust = 0.9;
    else if (SalesRank < 10000)
    Adjust = 0.9;
    else if (SalesRank < 20000)
    Adjust = 0.9;
    else if (SalesRank < 40000)
    Adjust = 0.8;
    else if (SalesRank < 60000)
    Adjust = 0.8;
    else if (SalesRank < 80000)
    Adjust = 0.7;
    else if (SalesRank < 100000)
    Adjust = 0.7;
    else if (SalesRank < 200000)
    Adjust = 0.7;
    else if (SalesRank < 400000)
    Adjust = 0.35;
    else if (SalesRank < 600000)
    Adjust = 0.25;
    else if (SalesRank < 800000)
    Adjust = 0.25;
    else if (SalesRank < 1000000)
    Adjust = 0.15;
    else if (SalesRank >= 1000000)
    Adjust = 0.10; //constant

    EstimatedSales = EstimatedSales * Adjust;
  } else if (Category == "Clothing") {
    Slop = -0.890301317849426;
    Offset = 50229.0970635419;
    LogOffset = Math.log10(Offset);
    LogRank = Math.log10(SalesRank);
    LogES = (Slop * LogRank) + LogOffset;
    EstimatedSales = Math.pow(10, LogES)

    if (SalesRank < 400) {
      EstimatedSales = (1 + ( 0.0004 * (400 - SalesRank))) * 44;
      Adjust = 1; //Constant
    } else if (SalesRank < 600)
    Adjust = 0.3;
    else if (SalesRank < 800)
    Adjust = 0.3;
    else if (SalesRank < 1000)
    Adjust = 0.35;
    else if (SalesRank < 2000)
    Adjust = 0.4;
    else if (SalesRank < 4000)
    Adjust = 0.7;
    else if (SalesRank < 6000)
    Adjust = 0.9;
    else if (SalesRank < 8000)
    Adjust = 0.9;
    else if (SalesRank < 10000)
    Adjust = 0.9;
    else if (SalesRank < 20000)
    Adjust = 0.9;
    else if (SalesRank < 40000)
    Adjust = 0.8;
    else if (SalesRank < 60000)
    Adjust = 0.8;
    else if (SalesRank < 80000)
    Adjust = 0.7;
    else if (SalesRank < 100000)
    Adjust = 0.7;
    else if (SalesRank < 200000)
    Adjust = 0.7;
    else if (SalesRank < 400000)
    Adjust = 0.35;
    else if (SalesRank < 600000)
    Adjust = 0.25;
    else if (SalesRank < 800000)
    Adjust = 0.25;
    else if (SalesRank < 1000000)
    Adjust = 0.15;
    else if (SalesRank >= 1000000)
    Adjust = 0.10; //constant

    EstimatedSales = EstimatedSales * Adjust;
  } else if (Category == "Musical Instruments") {
    Slop = -1.02683869745013;
    Offset = 15479.6763443842;
    LogOffset = Math.log10(Offset);
    LogRank = Math.log10(SalesRank);
    LogES = (Slop * LogRank) + LogOffset;
    EstimatedSales = Math.pow(10, LogES)

    if (SalesRank < 400) {
      EstimatedSales = (1 + ( 0.0004 * (400 - SalesRank))) * 56;
      Adjust = 1; //Constant
    } else if (SalesRank < 600)
    Adjust = 0.3;
    else if (SalesRank < 800)
    Adjust = 0.3;
    else if (SalesRank < 1000)
    Adjust = 0.35;
    else if (SalesRank < 2000)
    Adjust = 0.4;
    else if (SalesRank < 4000)
    Adjust = 0.7;
    else if (SalesRank < 6000)
    Adjust = 0.9;
    else if (SalesRank < 8000)
    Adjust = 0.9;
    else if (SalesRank < 10000)
    Adjust = 0.9;
    else if (SalesRank < 20000)
    Adjust = 0.9;
    else if (SalesRank < 40000)
    Adjust = 0.8;
    else if (SalesRank < 60000)
    Adjust = 0.8;
    else if (SalesRank < 80000)
    Adjust = 0.7;
    else if (SalesRank < 100000)
    Adjust = 0.7;
    else if (SalesRank < 200000)
    Adjust = 0.7;
    else if (SalesRank < 400000)
    Adjust = 0.35;
    else if (SalesRank < 600000)
    Adjust = 0.25;
    else if (SalesRank < 800000)
    Adjust = 0.25;
    else if (SalesRank < 1000000)
    Adjust = 0.15;
    else if (SalesRank >= 1000000)
    Adjust = 0.10; //constant

    EstimatedSales = EstimatedSales * Adjust;
  } else if (Category == "Pet Supplies") {
    Slop = -1.10627691729796;
    Offset = 154077.608501638;
    LogOffset = Math.log10(Offset);
    LogRank = Math.log10(SalesRank);
    LogES = (Slop * LogRank) + LogOffset;
    EstimatedSales = Math.pow(10, LogES)

    if (SalesRank < 400) {
      EstimatedSales = (1 + ( 0.0004 * (400 - SalesRank))) * 68;
      Adjust = 1; //Constant
    } else if (SalesRank < 600)
    Adjust = 0.3;
    else if (SalesRank < 800)
    Adjust = 0.3;
    else if (SalesRank < 1000)
    Adjust = 0.35;
    else if (SalesRank < 2000)
    Adjust = 0.4;
    else if (SalesRank < 4000)
    Adjust = 0.7;
    else if (SalesRank < 6000)
    Adjust = 0.9;
    else if (SalesRank < 8000)
    Adjust = 0.9;
    else if (SalesRank < 10000)
    Adjust = 0.9;
    else if (SalesRank < 20000)
    Adjust = 0.9;
    else if (SalesRank < 40000)
    Adjust = 0.8;
    else if (SalesRank < 60000)
    Adjust = 0.8;
    else if (SalesRank < 80000)
    Adjust = 0.7;
    else if (SalesRank < 100000)
    Adjust = 0.7;
    else if (SalesRank < 200000)
    Adjust = 0.7;
    else if (SalesRank < 400000)
    Adjust = 0.35;
    else if (SalesRank < 600000)
    Adjust = 0.25;
    else if (SalesRank < 800000)
    Adjust = 0.25;
    else if (SalesRank < 1000000)
    Adjust = 0.15;
    else if (SalesRank >= 1000000)
    Adjust = 0.10; //constant

    EstimatedSales = EstimatedSales * Adjust;
  } else if (Category == "Office Products") {
    Slop = -0.947430145186706;
    Offset = 31553.6757228578;
    LogOffset = Math.log10(Offset);
    LogRank = Math.log10(SalesRank);
    LogES = (Slop * LogRank) + LogOffset;
    EstimatedSales = Math.pow(10, LogES)

    if (SalesRank < 400) {
      EstimatedSales = (1 + ( 0.0004 * (400 - SalesRank))) * 82;
      Adjust = 1; //Constant
    } else if (SalesRank < 600)
    Adjust = 0.3;
    else if (SalesRank < 800)
    Adjust = 0.3;
    else if (SalesRank < 1000)
    Adjust = 0.35;
    else if (SalesRank < 2000)
    Adjust = 0.4;
    else if (SalesRank < 4000)
    Adjust = 0.7;
    else if (SalesRank < 6000)
    Adjust = 0.9;
    else if (SalesRank < 8000)
    Adjust = 0.9;
    else if (SalesRank < 10000)
    Adjust = 0.9;
    else if (SalesRank < 20000)
    Adjust = 0.9;
    else if (SalesRank < 40000)
    Adjust = 0.8;
    else if (SalesRank < 60000)
    Adjust = 0.8;
    else if (SalesRank < 80000)
    Adjust = 0.7;
    else if (SalesRank < 100000)
    Adjust = 0.7;
    else if (SalesRank < 200000)
    Adjust = 0.7;
    else if (SalesRank < 400000)
    Adjust = 0.35;
    else if (SalesRank < 600000)
    Adjust = 0.25;
    else if (SalesRank < 800000)
    Adjust = 0.25;
    else if (SalesRank < 1000000)
    Adjust = 0.15;
    else if (SalesRank >= 1000000)
    Adjust = 0.10; //constant

    EstimatedSales = EstimatedSales * Adjust;
  } else if (Category == "Industrial & Scientific") {
    Slop = -0.749611336516322;
    Offset = 2511.66293051382;
    LogOffset = Math.log10(Offset);
    LogRank = Math.log10(SalesRank);
    LogES = (Slop * LogRank) + LogOffset;
    EstimatedSales = Math.pow(10, LogES)

    if (SalesRank < 400) {
      EstimatedSales = (1 + ( 0.0004 * (400 - SalesRank))) * 41;
      Adjust = 1; //Constant
    } else if (SalesRank < 600)
    Adjust = 0.3;
    else if (SalesRank < 800)
    Adjust = 0.3;
    else if (SalesRank < 1000)
    Adjust = 0.35;
    else if (SalesRank < 2000)
    Adjust = 0.4;
    else if (SalesRank < 4000)
    Adjust = 0.7;
    else if (SalesRank < 6000)
    Adjust = 0.9;
    else if (SalesRank < 8000)
    Adjust = 0.9;
    else if (SalesRank < 10000)
    Adjust = 0.9;
    else if (SalesRank < 20000)
    Adjust = 0.9;
    else if (SalesRank < 40000)
    Adjust = 0.8;
    else if (SalesRank < 60000)
    Adjust = 0.8;
    else if (SalesRank < 80000)
    Adjust = 0.7;
    else if (SalesRank < 100000)
    Adjust = 0.7;
    else if (SalesRank < 200000)
    Adjust = 0.7;
    else if (SalesRank < 400000)
    Adjust = 0.35;
    else if (SalesRank < 600000)
    Adjust = 0.25;
    else if (SalesRank < 800000)
    Adjust = 0.25;
    else if (SalesRank < 1000000)
    Adjust = 0.15;
    else if (SalesRank >= 1000000)
    Adjust = 0.10; //constant

    EstimatedSales = EstimatedSales * Adjust;
  } else if (Category == "Arts, Craft & Sewing") {
    Slop = -0.829766707830769;
    Offset = 7819.72839867913;
    LogOffset = Math.log10(Offset);
    LogRank = Math.log10(SalesRank);
    LogES = (Slop * LogRank) + LogOffset;
    EstimatedSales = Math.pow(10, LogES)

    if (SalesRank < 400) {
      EstimatedSales = (1 + ( 0.0004 * (400 - SalesRank))) * 78;
      Adjust = 1; //Constant
    } else if (SalesRank < 600)
    Adjust = 0.3;
    else if (SalesRank < 800)
    Adjust = 0.3;
    else if (SalesRank < 1000)
    Adjust = 0.35;
    else if (SalesRank < 2000)
    Adjust = 0.4;
    else if (SalesRank < 4000)
    Adjust = 0.7;
    else if (SalesRank < 6000)
    Adjust = 0.9;
    else if (SalesRank < 8000)
    Adjust = 0.9;
    else if (SalesRank < 10000)
    Adjust = 0.9;
    else if (SalesRank < 20000)
    Adjust = 0.9;
    else if (SalesRank < 40000)
    Adjust = 0.8;
    else if (SalesRank < 60000)
    Adjust = 0.8;
    else if (SalesRank < 80000)
    Adjust = 0.7;
    else if (SalesRank < 100000)
    Adjust = 0.7;
    else if (SalesRank < 200000)
    Adjust = 0.7;
    else if (SalesRank < 400000)
    Adjust = 0.35;
    else if (SalesRank < 600000)
    Adjust = 0.25;
    else if (SalesRank < 800000)
    Adjust = 0.25;
    else if (SalesRank < 1000000)
    Adjust = 0.15;
    else if (SalesRank >= 1000000)
    Adjust = 0.10; //constant

    EstimatedSales = EstimatedSales * Adjust;
  } else if (Category == "Videogames") {
    Slop = -1.07764010379412;
    Offset = 18381.5268612669;
    LogOffset = Math.log10(Offset);
    LogRank = Math.log10(SalesRank);
    LogES = (Slop * LogRank) + LogOffset;
    EstimatedSales = Math.pow(10, LogES)

    if (SalesRank < 400) {
      EstimatedSales = (1 + ( 0.0004 * (400 - SalesRank))) * 72;
      Adjust = 1; //Constant
    } else if (SalesRank < 600)
    Adjust = 0.3;
    else if (SalesRank < 800)
    Adjust = 0.3;
    else if (SalesRank < 1000)
    Adjust = 0.35;
    else if (SalesRank < 2000)
    Adjust = 0.4;
    else if (SalesRank < 4000)
    Adjust = 0.7;
    else if (SalesRank < 6000)
    Adjust = 0.9;
    else if (SalesRank < 8000)
    Adjust = 0.9;
    else if (SalesRank < 10000)
    Adjust = 0.9;
    else if (SalesRank < 20000)
    Adjust = 0.9;
    else if (SalesRank < 40000)
    Adjust = 0.8;
    else if (SalesRank < 60000)
    Adjust = 0.8;
    else if (SalesRank < 80000)
    Adjust = 0.7;
    else if (SalesRank < 100000)
    Adjust = 0.7;
    else if (SalesRank < 200000)
    Adjust = 0.7;
    else if (SalesRank < 400000)
    Adjust = 0.35;
    else if (SalesRank < 600000)
    Adjust = 0.25;
    else if (SalesRank < 800000)
    Adjust = 0.25;
    else if (SalesRank < 1000000)
    Adjust = 0.15;
    else if (SalesRank >= 1000000)
    Adjust = 0.10; //constant

    EstimatedSales = EstimatedSales * Adjust;
  } else if (Category == "Jewelry") {
    Slop = -1.01346421616392;
    Offset = 22758.7833803613;
    LogOffset = Math.log10(Offset);
    LogRank = Math.log10(SalesRank);
    LogES = (Slop * LogRank) + LogOffset;
    EstimatedSales = Math.pow(10, LogES);

    if (SalesRank < 400) {
      EstimatedSales = (1 + ( 0.0004 * (400 - SalesRank))) * 43;
      Adjust = 1; //Constant
    } else if (SalesRank < 600)
    Adjust = 0.3;
    else if (SalesRank < 800)
    Adjust = 0.3;
    else if (SalesRank < 1000)
    Adjust = 0.35;
    else if (SalesRank < 2000)
    Adjust = 0.4;
    else if (SalesRank < 4000)
    Adjust = 0.7;
    else if (SalesRank < 6000)
    Adjust = 0.9;
    else if (SalesRank < 8000)
    Adjust = 0.9;
    else if (SalesRank < 10000)
    Adjust = 0.9;
    else if (SalesRank < 20000)
    Adjust = 0.9;
    else if (SalesRank < 40000)
    Adjust = 0.8;
    else if (SalesRank < 60000)
    Adjust = 0.8;
    else if (SalesRank < 80000)
    Adjust = 0.7;
    else if (SalesRank < 100000)
    Adjust = 0.7;
    else if (SalesRank < 200000)
    Adjust = 0.7;
    else if (SalesRank < 400000)
    Adjust = 0.35;
    else if (SalesRank < 600000)
    Adjust = 0.25;
    else if (SalesRank < 800000)
    Adjust = 0.25;
    else if (SalesRank < 1000000)
    Adjust = 0.15;
    else if (SalesRank >= 1000000)
    Adjust = 0.10; //constant

    EstimatedSales = EstimatedSales * Adjust;
  } else if (Category == "Baby") {
    Slop = -1.03098161074877;
    Offset = 39812.0435636674;
    LogOffset = Math.log10(Offset);
    LogRank = Math.log10(SalesRank);
    LogES = (Slop * LogRank) + LogOffset;
    EstimatedSales = Math.pow(10, LogES)

    if (SalesRank < 400) {
      EstimatedSales = (1 + ( 0.0004 * (400 - SalesRank))) * 82;
      Adjust = 1; //Constant
    } else if (SalesRank < 600)
    Adjust = 0.3;
    else if (SalesRank < 800)
    Adjust = 0.3;
    else if (SalesRank < 1000)
    Adjust = 0.35;
    else if (SalesRank < 2000)
    Adjust = 0.4;
    else if (SalesRank < 4000)
    Adjust = 0.7;
    else if (SalesRank < 6000)
    Adjust = 0.9;
    else if (SalesRank < 8000)
    Adjust = 0.9;
    else if (SalesRank < 10000)
    Adjust = 0.9;
    else if (SalesRank < 20000)
    Adjust = 0.9;
    else if (SalesRank < 40000)
    Adjust = 0.8;
    else if (SalesRank < 60000)
    Adjust = 0.8;
    else if (SalesRank < 80000)
    Adjust = 0.7;
    else if (SalesRank < 100000)
    Adjust = 0.7;
    else if (SalesRank < 200000)
    Adjust = 0.7;
    else if (SalesRank < 400000)
    Adjust = 0.35;
    else if (SalesRank < 600000)
    Adjust = 0.25;
    else if (SalesRank < 800000)
    Adjust = 0.25;
    else if (SalesRank < 1000000)
    Adjust = 0.15;
    else if (SalesRank >= 1000000)
    Adjust = 0.10; //constant

    EstimatedSales = EstimatedSales * Adjust;
  } else if (Category == "Cell Phones & Accessories") {
    Slop = -0.733958399561946;
    Offset = 5453.1139257706;
    LogOffset = Math.log10(Offset);
    LogRank = Math.log10(SalesRank);
    LogES = (Slop * LogRank) + LogOffset;
    EstimatedSales = Math.pow(10, LogES)

    if (SalesRank < 400) {
      EstimatedSales = (1 + ( 0.0004 * (400 - SalesRank))) * 85;
      Adjust = 1; //Constant
    } else if (SalesRank < 600)
    Adjust = 0.3;
    else if (SalesRank < 800)
    Adjust = 0.3;
    else if (SalesRank < 1000)
    Adjust = 0.35;
    else if (SalesRank < 2000)
    Adjust = 0.4;
    else if (SalesRank < 4000)
    Adjust = 0.7;
    else if (SalesRank < 6000)
    Adjust = 0.9;
    else if (SalesRank < 8000)
    Adjust = 0.9;
    else if (SalesRank < 10000)
    Adjust = 0.9;
    else if (SalesRank < 20000)
    Adjust = 0.9;
    else if (SalesRank < 40000)
    Adjust = 0.8;
    else if (SalesRank < 60000)
    Adjust = 0.8;
    else if (SalesRank < 80000)
    Adjust = 0.7;
    else if (SalesRank < 100000)
    Adjust = 0.7;
    else if (SalesRank < 200000)
    Adjust = 0.7;
    else if (SalesRank < 400000)
    Adjust = 0.35;
    else if (SalesRank < 600000)
    Adjust = 0.25;
    else if (SalesRank < 800000)
    Adjust = 0.25;
    else if (SalesRank < 1000000)
    Adjust = 0.15;
    else if (SalesRank >= 1000000)
    Adjust = 0.10; //constant

    EstimatedSales = EstimatedSales * Adjust;
  } else if (Category == "Home and Garden") {
    Slop = -0.537265153086811;
    Offset = 494.172227898278;
    LogOffset = Math.log10(Offset);
    LogRank = Math.log10(SalesRank);
    LogES = (Slop * LogRank) + LogOffset;
    EstimatedSales = Math.pow(10, LogES)

    if (SalesRank < 400) {
      EstimatedSales = (1 + ( 0.0004 * (400 - SalesRank))) * 30;
      Adjust = 1; //Constant
    } else if (SalesRank < 600)
    Adjust = 0.3;
    else if (SalesRank < 800)
    Adjust = 0.3;
    else if (SalesRank < 1000)
    Adjust = 0.35;
    else if (SalesRank < 2000)
    Adjust = 0.4;
    else if (SalesRank < 4000)
    Adjust = 0.7;
    else if (SalesRank < 6000)
    Adjust = 0.9;
    else if (SalesRank < 8000)
    Adjust = 0.9;
    else if (SalesRank < 10000)
    Adjust = 0.9;
    else if (SalesRank < 20000)
    Adjust = 0.9;
    else if (SalesRank < 40000)
    Adjust = 0.8;
    else if (SalesRank < 60000)
    Adjust = 0.8;
    else if (SalesRank < 80000)
    Adjust = 0.7;
    else if (SalesRank < 100000)
    Adjust = 0.7;
    else if (SalesRank < 200000)
    Adjust = 0.7;
    else if (SalesRank < 400000)
    Adjust = 0.35;
    else if (SalesRank < 600000)
    Adjust = 0.25;
    else if (SalesRank < 800000)
    Adjust = 0.25;
    else if (SalesRank < 1000000)
    Adjust = 0.15;
    else if (SalesRank >= 1000000)
    Adjust = 0.10; //constant

    EstimatedSales = EstimatedSales * Adjust;
  } else if (Category == "Watches") {
    Slop = -0.870661992348441;
    Offset = 2130.44370633452;
    LogOffset = Math.log10(Offset);
    LogRank = Math.log10(SalesRank);
    LogES = (Slop * LogRank) + LogOffset;
    EstimatedSales = Math.pow(10, LogES)

    if (SalesRank < 400) {
      EstimatedSales = (1 + ( 0.0004 * (400 - SalesRank))) * 72;
      Adjust = 1; //Constant
    } else if (SalesRank < 600)
    Adjust = 0.3;
    else if (SalesRank < 800)
    Adjust = 0.3;
    else if (SalesRank < 1000)
    Adjust = 0.35;
    else if (SalesRank < 2000)
    Adjust = 0.4;
    else if (SalesRank < 4000)
    Adjust = 0.7;
    else if (SalesRank < 6000)
    Adjust = 0.9;
    else if (SalesRank < 8000)
    Adjust = 0.9;
    else if (SalesRank < 10000)
    Adjust = 0.9;
    else if (SalesRank < 20000)
    Adjust = 0.9;
    else if (SalesRank < 40000)
    Adjust = 0.8;
    else if (SalesRank < 60000)
    Adjust = 0.8;
    else if (SalesRank < 80000)
    Adjust = 0.7;
    else if (SalesRank < 100000)
    Adjust = 0.7;
    else if (SalesRank < 200000)
    Adjust = 0.7;
    else if (SalesRank < 400000)
    Adjust = 0.35;
    else if (SalesRank < 600000)
    Adjust = 0.25;
    else if (SalesRank < 800000)
    Adjust = 0.25;
    else if (SalesRank < 1000000)
    Adjust = 0.15;
    else if (SalesRank >= 1000000)
    Adjust = 0.10; //constant

    EstimatedSales = EstimatedSales * Adjust;
  } else if (Category == "Camera & Photo") {
    Slop = -0.810813891501792;
    Offset = 1086.23732510221;
    LogOffset = Math.log10(Offset);
    LogRank = Math.log10(SalesRank);
    LogES = (Slop * LogRank) + LogOffset;
    EstimatedSales = Math.pow(10, LogES)

    if (SalesRank < 400) {
      EstimatedSales = (1 + ( 0.0004 * (400 - SalesRank))) * 35;
      Adjust = 1; //Constant
    } else if (SalesRank < 600)
    Adjust = 0.3;
    else if (SalesRank < 800)
    Adjust = 0.3;
    else if (SalesRank < 1000)
    Adjust = 0.35;
    else if (SalesRank < 2000)
    Adjust = 0.4;
    else if (SalesRank < 4000)
    Adjust = 0.7;
    else if (SalesRank < 6000)
    Adjust = 0.9;
    else if (SalesRank < 8000)
    Adjust = 0.9;
    else if (SalesRank < 10000)
    Adjust = 0.9;
    else if (SalesRank < 20000)
    Adjust = 0.9;
    else if (SalesRank < 40000)
    Adjust = 0.8;
    else if (SalesRank < 60000)
    Adjust = 0.8;
    else if (SalesRank < 80000)
    Adjust = 0.7;
    else if (SalesRank < 100000)
    Adjust = 0.7;
    else if (SalesRank < 200000)
    Adjust = 0.7;
    else if (SalesRank < 400000)
    Adjust = 0.35;
    else if (SalesRank < 600000)
    Adjust = 0.25;
    else if (SalesRank < 800000)
    Adjust = 0.25;
    else if (SalesRank < 1000000)
    Adjust = 0.15;
    else if (SalesRank >= 1000000)
    Adjust = 0.10; //constant

    EstimatedSales = EstimatedSales * Adjust;
  } else if (Category == "Electronics") {
    Slop = -0.58633189502591;
    Offset = 505.052282708312;
    LogOffset = Math.log10(Offset);
    LogRank = Math.log10(SalesRank);
    LogES = (Slop * LogRank) + LogOffset;
    EstimatedSales = Math.pow(10, LogES);

    if (SalesRank < 400) {
      EstimatedSales = (1 + ( 0.0004 * (400 - SalesRank))) * 30;
      Adjust = 1; //Constant
    } else if (SalesRank < 600)
    Adjust = 0.3;
    else if (SalesRank < 800)
    Adjust = 0.3;
    else if (SalesRank < 1000)
    Adjust = 0.35;
    else if (SalesRank < 2000)
    Adjust = 0.4;
    else if (SalesRank < 4000)
    Adjust = 0.7;
    else if (SalesRank < 6000)
    Adjust = 0.9;
    else if (SalesRank < 8000)
    Adjust = 0.9;
    else if (SalesRank < 10000)
    Adjust = 0.9;
    else if (SalesRank < 20000)
    Adjust = 0.9;
    else if (SalesRank < 40000)
    Adjust = 0.8;
    else if (SalesRank < 60000)
    Adjust = 0.8;
    else if (SalesRank < 80000)
    Adjust = 0.7;
    else if (SalesRank < 100000)
    Adjust = 0.7;
    else if (SalesRank < 200000)
    Adjust = 0.7;
    else if (SalesRank < 400000)
    Adjust = 0.35;
    else if (SalesRank < 600000)
    Adjust = 0.25;
    else if (SalesRank < 800000)
    Adjust = 0.25;
    else if (SalesRank < 1000000)
    Adjust = 0.15;
    else if (SalesRank >= 1000000)
    Adjust = 0.10; //constant

    EstimatedSales = EstimatedSales * Adjust;
  } else if (Category == "Computers & Accessories") {
    Slop = -0.794057157841841;
    Offset = 1385.00773607183;
    LogOffset = Math.log10(Offset);
    LogRank = Math.log10(SalesRank);
    LogES = (Slop * LogRank) + LogOffset;
    EstimatedSales = Math.pow(10, LogES)

    if (SalesRank < 400) {
      EstimatedSales = (1 + ( 0.0004 * (400 - SalesRank))) * 31;
      Adjust = 1; //Constant
    } else if (SalesRank < 600)
    Adjust = 0.3;
    else if (SalesRank < 800)
    Adjust = 0.3;
    else if (SalesRank < 1000)
    Adjust = 0.35;
    else if (SalesRank < 2000)
    Adjust = 0.4;
    else if (SalesRank < 4000)
    Adjust = 0.7;
    else if (SalesRank < 6000)
    Adjust = 0.9;
    else if (SalesRank < 8000)
    Adjust = 0.9;
    else if (SalesRank < 10000)
    Adjust = 0.9;
    else if (SalesRank < 20000)
    Adjust = 0.9;
    else if (SalesRank < 40000)
    Adjust = 0.8;
    else if (SalesRank < 60000)
    Adjust = 0.8;
    else if (SalesRank < 80000)
    Adjust = 0.7;
    else if (SalesRank < 100000)
    Adjust = 0.7;
    else if (SalesRank < 200000)
    Adjust = 0.7;
    else if (SalesRank < 400000)
    Adjust = 0.35;
    else if (SalesRank < 600000)
    Adjust = 0.25;
    else if (SalesRank < 800000)
    Adjust = 0.25;
    else if (SalesRank < 1000000)
    Adjust = 0.15;
    else if (SalesRank >= 1000000)
    Adjust = 0.10; //constant

    EstimatedSales = EstimatedSales * Adjust;
  } else if (Category == "Appliances") {
    Slop = -0.861357686991442;
    Offset = 451.610316995561;
    LogOffset = Math.log10(Offset);
    LogRank = Math.log10(SalesRank);
    LogES = (Slop * LogRank) + LogOffset;
    EstimatedSales = Math.pow(10, LogES)

    if (SalesRank < 400) {
      EstimatedSales = (1 + ( 0.0004 * (400 - SalesRank))) * 19;
      Adjust = 1; //Constant
    } else if (SalesRank < 600)
    Adjust = 0.3;
    else if (SalesRank < 800)
    Adjust = 0.3;
    else if (SalesRank < 1000)
    Adjust = 0.35;
    else if (SalesRank < 2000)
    Adjust = 0.4;
    else if (SalesRank < 4000)
    Adjust = 0.7;
    else if (SalesRank < 6000)
    Adjust = 0.9;
    else if (SalesRank < 8000)
    Adjust = 0.9;
    else if (SalesRank < 10000)
    Adjust = 0.9;
    else if (SalesRank < 20000)
    Adjust = 0.9;
    else if (SalesRank < 40000)
    Adjust = 0.8;
    else if (SalesRank < 60000)
    Adjust = 0.8;
    else if (SalesRank < 80000)
    Adjust = 0.7;
    else if (SalesRank < 100000)
    Adjust = 0.7;
    else if (SalesRank < 200000)
    Adjust = 0.7;
    else if (SalesRank < 400000)
    Adjust = 0.35;
    else if (SalesRank < 600000)
    Adjust = 0.25;
    else if (SalesRank < 800000)
    Adjust = 0.25;
    else if (SalesRank < 1000000)
    Adjust = 0.15;
    else if (SalesRank >= 1000000)
    Adjust = 0.10; //constant

    EstimatedSales = EstimatedSales * Adjust;
  } else if (Category == "Music") {
    Slop = -0.662910080313591;
    Offset = 738.200160843942;
    LogOffset = Math.log10(Offset);
    LogRank = Math.log10(SalesRank);
    LogES = (Slop * LogRank) + LogOffset;
    EstimatedSales = Math.pow(10, LogES)

    if (SalesRank < 400) {
      EstimatedSales = (1 + ( 0.0004 * (400 - SalesRank))) * 45;
      Adjust = 1; //Constant
    } else if (SalesRank < 600)
    Adjust = 0.3;
    else if (SalesRank < 800)
    Adjust = 0.3;
    else if (SalesRank < 1000)
    Adjust = 0.35;
    else if (SalesRank < 2000)
    Adjust = 0.4;
    else if (SalesRank < 4000)
    Adjust = 0.7;
    else if (SalesRank < 6000)
    Adjust = 0.9;
    else if (SalesRank < 8000)
    Adjust = 0.9;
    else if (SalesRank < 10000)
    Adjust = 0.9;
    else if (SalesRank < 20000)
    Adjust = 0.9;
    else if (SalesRank < 40000)
    Adjust = 0.8;
    else if (SalesRank < 60000)
    Adjust = 0.8;
    else if (SalesRank < 80000)
    Adjust = 0.7;
    else if (SalesRank < 100000)
    Adjust = 0.7;
    else if (SalesRank < 200000)
    Adjust = 0.7;
    else if (SalesRank < 400000)
    Adjust = 0.35;
    else if (SalesRank < 600000)
    Adjust = 0.25;
    else if (SalesRank < 800000)
    Adjust = 0.25;
    else if (SalesRank < 1000000)
    Adjust = 0.15;
    else if (SalesRank >= 1000000)
    Adjust = 0.10; //constant

    EstimatedSales = EstimatedSales * Adjust;
  } else if (Category == "Movies & TV") {
    Slop = -1.01605292985309;
    Offset = 33318.4010560254;
    LogOffset = Math.log10(Offset);
    LogRank = Math.log10(SalesRank);
    LogES = (Slop * LogRank) + LogOffset;
    EstimatedSales = Math.pow(10, LogES)

    if (SalesRank < 400) {
      EstimatedSales = (1 + ( 0.0004 * (400 - SalesRank))) * 38;
      Adjust = 1; //Constant
    } else if (SalesRank < 600)
    Adjust = 0.3;
    else if (SalesRank < 800)
    Adjust = 0.3;
    else if (SalesRank < 1000)
    Adjust = 0.35;
    else if (SalesRank < 2000)
    Adjust = 0.4;
    else if (SalesRank < 4000)
    Adjust = 0.7;
    else if (SalesRank < 6000)
    Adjust = 0.9;
    else if (SalesRank < 8000)
    Adjust = 0.9;
    else if (SalesRank < 10000)
    Adjust = 0.9;
    else if (SalesRank < 20000)
    Adjust = 0.9;
    else if (SalesRank < 40000)
    Adjust = 0.8;
    else if (SalesRank < 60000)
    Adjust = 0.8;
    else if (SalesRank < 80000)
    Adjust = 0.7;
    else if (SalesRank < 100000)
    Adjust = 0.7;
    else if (SalesRank < 200000)
    Adjust = 0.7;
    else if (SalesRank < 400000)
    Adjust = 0.35;
    else if (SalesRank < 600000)
    Adjust = 0.25;
    else if (SalesRank < 800000)
    Adjust = 0.25;
    else if (SalesRank < 1000000)
    Adjust = 0.15;
    else if (SalesRank >= 1000000)
    Adjust = 0.10; //constant

    EstimatedSales = EstimatedSales * Adjust;
  }else{
    Slop = -1.10627691729796;
    Offset = 154077.608501638;
    LogOffset = Math.log10(Offset);
    LogRank = Math.log10(SalesRank);
    LogES = (Slop * LogRank) + LogOffset;
    EstimatedSales = Math.pow(10, LogES)

    if (SalesRank < 400) {
      EstimatedSales = (1 + ( 0.0004 * (400 - SalesRank))) * 80;
      Adjust = 1; //Constant
    } else if (SalesRank < 600)
    Adjust = 0.3;
    else if (SalesRank < 800)
    Adjust = 0.3;
    else if (SalesRank < 1000)
    Adjust = 0.35;
    else if (SalesRank < 2000)
    Adjust = 0.4;
    else if (SalesRank < 4000)
    Adjust = 0.7;
    else if (SalesRank < 6000)
    Adjust = 0.9;
    else if (SalesRank < 8000)
    Adjust = 0.9;
    else if (SalesRank < 10000)
    Adjust = 0.9;
    else if (SalesRank < 20000)
    Adjust = 0.9;
    else if (SalesRank < 40000)
    Adjust = 0.8;
    else if (SalesRank < 60000)
    Adjust = 0.8;
    else if (SalesRank < 80000)
    Adjust = 0.7;
    else if (SalesRank < 100000)
    Adjust = 0.7;
    else if (SalesRank < 200000)
    Adjust = 0.7;
    else if (SalesRank < 400000)
    Adjust = 0.35;
    else if (SalesRank < 600000)
    Adjust = 0.25;
    else if (SalesRank < 800000)
    Adjust = 0.25;
    else if (SalesRank < 1000000)
    Adjust = 0.15;
    else if (SalesRank >= 1000000)
    Adjust = 0.10; //constant

    if (country == 'de' || country == 'fr' || country == 'es' || country == 'it' || country == 'uk' || country == 'ca' ||country == 'in' || country == 'jp' || country == 'mx' || country == 'com.mx')
			EstimatedSales = EstimatedSales * Adjust;
	else		
			EstimatedSales = EstimatedSales * 0.15;

  }

  return EstimatedSales;
}

var fnCalcuteSalesOnePage = function() {
  var SalesRank = localStorage["jv_one_page_rank"];
  var Category = localStorage["jv_one_page_category"];
  var Price = localStorage["jv_one_page_price"];

  if(SalesRank === "null"){
    $('.local-EstSales').text("NA");
    $('.local-EstRevenue').html("NA");
    return;
  }

  //console.log("getting pure: " + Price);
  SalesRank = parseFloat(SalesRank.replace(',',''));
  Price = parseFloat(getPureNumber(Price));
  /**/
  EstimatedSales = getEstimatedSales(Category, SalesRank);

    if (country == 'de' || country == 'fr' || country == 'es' || country == 'it' || country == 'uk' || country == 'ca')
      EstimatedSales = EstimatedSales*0.41; //reduce
    if (country == 'in' || country == 'jp' || country == 'mx' || country == 'com.mx'  )
      EstimatedSales = EstimatedSales*0.15; //reduce
    
  var m = new Date();

  if ((m.getMonth() + 1) == 11 || (m.getMonth() + 1) == 12) {
    EstimatedSales = EstimatedSales * 1;
  }
  else {
	EstimatedSales = EstimatedSales * 0.85;  
  }

  EstimatedSales = EstimatedSales * 30;

  var EstimatedRevenue = 0.00;

  if (IsNumeric(EstimatedSales)){
    if (EstimatedSales < 1 && EstimatedSales>0){
      var denominator = 1/EstimatedSales;
      denominator = parseInt(denominator);
      if (denominator == 1)
        denominator++;
      $('.local-EstSales').text('1 each '+parseInt(denominator)+' months');
    }else{
      EstimatedSales = parseInt(EstimatedSales);
      $('.local-EstSales').text(EstimatedSales);
    }

    if (isset(Price)){
      var EstimatedRevenue = EstimatedSales*Price;
      $('.local-EstRevenue').html(getMoneySymbol()+EstimatedRevenue.format(2));
    }
  }

  return
}

function checkCategoryAndSalesrank(htmlSource, country) {
    var cname;
    var salesrank = "";

    if(country === "co.uk") {
        salesrank = $.trim($(htmlSource).find("#SalesRank").text()).split("#")[0];
    } else {
        salesrank = $.trim($(htmlSource).find("#SalesRank").text()).split("#")[1];
    }

    if(salesrank && salesrank.indexOf(" 100") > -1) {
        cname = scrapCategory(salesrank);
    } else {
        var productDetails = $(htmlSource).find("#productDetails_detailBullets_sections1").find("tr");
        productDetails.each(function(){
            if($.trim($(this).find("th").text()) === "Best Sellers Rank"){
                var bestSellers = $.trim($($(this).find("td > span > span")).text());
                if(bestSellers.indexOf("in ") > -1 && bestSellers.indexOf(" (") > -1){
                    cname = bestSellers.split("in ")[1].split(" (")[0];
                }
            }
        });
    }
    return cname;
}

function scrapCategory(salesrank) {
    var cname;
    if(salesrank && salesrank.indexOf(" 100") > -1){
        if (country == "fr"){
            cname = salesrank.substring(salesrank.indexOf(" en") + 4, salesrank.indexOf(" ("));
        } else if (country == "de"){
            cname = salesrank.substring(salesrank.indexOf(" in") + 4, salesrank.indexOf(" ("));
        } else if (country == "es"){
            cname = salesrank.substring(salesrank.indexOf(" en") + 4, salesrank.indexOf(" ("));
        } else if (country == "it"){
            cname = salesrank.substring(salesrank.indexOf(" in") + 4, salesrank.indexOf(" ("));
        } else {
            cname = salesrank.substring(salesrank.indexOf(" in") + 4, salesrank.indexOf(" ("));
        }
    }
    return cname;
}

var calculateSales = function(dom)
{
    //if the price is not there yet reload later
    //if ($(dom+localStorage['defaultPrice']).find('img').length > 0)
    //    setTimeout(function(){calculateSales(dom)}, 1000);

    var SalesRank = $(dom+'SalesRank').text();
    var Category = $(dom+'Category').text();
    var Price = $(dom+localStorage['defaultPrice']).text();
    var Rating = $(dom+'Rating').text();
    if (!isset(Rating) || Rating == '0.0')
      Rating = '42';

    SalesRank = parseFloat(SalesRank.replace(',',''));
    Rating = parseFloat(Rating.replace(',','').replace('.',''));
    Price = parseFloat(getPureNumber(Price));

    /**/
    EstimatedSales = getEstimatedSales(Category, SalesRank);

    if (country == 'de' || country == 'fr' || country == 'es' || country == 'it' || country == 'uk' || country == 'ca')
      EstimatedSales = EstimatedSales*0.41; //reduce
    if (country == 'in' || country == 'jp' || country == 'mx' || country == 'com.mx'  )
      EstimatedSales = EstimatedSales*0.15; //reduce

    var m = new Date();


	 if ((m.getMonth() + 1) == 11 || (m.getMonth() + 1) == 12) {
		EstimatedSales = EstimatedSales * 1;
	}
	else {
		EstimatedSales = EstimatedSales * 0.85;  
	}

    EstimatedSales = EstimatedSales * 30;

    var EstimatedRevenue = 0.00;

    if (IsNumeric(EstimatedSales))
    {
        if (EstimatedSales < 1 && EstimatedSales>0)
        {
            var denominator = 1/EstimatedSales;
            denominator = parseInt(denominator);
            if (denominator == 1)
                denominator++;
            $(dom+'EstSales').text('1 each '+parseInt(denominator)+' months');
        }
        else
        {
            EstimatedSales = parseInt(EstimatedSales);
            $(dom+'EstSales').text(EstimatedSales);
        }

        if (isset(Price))
        {
            var EstimatedRevenue = EstimatedSales*Price;
            $(dom+'EstRevenue').html(getMoneySymbol()+EstimatedRevenue.format(2));
        }
    }

    updateTableSorter();
};

//AUX FUNCTIONS
function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;

    var CSV = '';
    //Set Report title in first row or line

    CSV += ReportTitle + '\r\n\n';

    //This condition will generate the Label/Header
    if (ShowLabel) {
        var row = "";

        //This loop will extract the label from 1st index of on array
        for (var index in arrData[0]) {

            //Now convert each value to string and comma-seprated
            row += index + ',';
        }

        row = row.slice(0, -1);

        //append Label row with line break
        CSV += row + '\r\n';
    }

    //1st loop is to extract each row
    for (var i = 0; i < arrData.length; i++) {
        var row = "";

        //2nd loop will extract each column and convert it in string comma-seprated
        for (var index in arrData[i]) {
            row += '"' + arrData[i][index] + '",';
        }

        row.slice(0, row.length - 1);

        //add a line break after each row
        CSV += row + '\r\n';
    }

    if (CSV == '') {
        alert("Invalid data");
        return;
    }

    //Generate a file name
    var fileName = "MyReport_";
    //this will remove the blank-spaces from the title and replace it with an underscore
    fileName += ReportTitle.replace(/ /g,"_");

    //Initialize file format you want csv or xls
    var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);

    // Now the little tricky part.
    // you can use either>> window.open(uri);
    // but this will not work in some browsers
    // or you will not get the correct file extension

    //this trick will generate a temp <a /> tag
    var link = document.createElement("a");
    link.href = uri;

    //set the visibility hidden so it will not effect on your web-layout
    link.style = "visibility:hidden";
    link.download = fileName + ".csv";

    //this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

Number.prototype.format = function(n, x) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};
var getPureNumber = function(val){
    if (!val || val === undefined || val == undefined || val == 'undefined')
        return val;

    if (val.length <=0)
        return val;

    if (!isset(val))
        return val;

    if (typeof val != 'string')
        val = val.toString();

    val = val.replace(getMoneySymbol(), '');
    val = val.replace(/,/g, '.');

    var temp = '';
    var first = false;
    for(var i=val.length-1; i>=0; i--)
    {
        if (val[i] == '.')
        {
            if (!first)
            {
                temp = val[i]+temp
                first = true;
            }
        }
        else
        {
            temp = val[i]+temp
        }
    }

    return temp;
};
var country = '';
var addLoaderToColumn = function(place){
    $(place).html('<img src="../images/loader_small.svg" class="small-loader" />');
};
var moneySymbol = '';
var getMoneySymbol = function(price){
    if (moneySymbol == '' && isset(price))
    {
        price = price.trimLeft();
        var temp = '';
        for (var i = 0, len = price.length; i < len; i++)
        {
            if (IsNumeric(price[i]))
            {
                moneySymbol = temp;
                return moneySymbol;
            }
            else
            {
                temp = temp + price[i];
            }
        }
    }
    else
    {
        return moneySymbol;
    }
};
var isset = function(el){
    if ((typeof(el) == 'undefined') || el.length == 0 || !el)
    {
        return false;
    }
    else
    {
        return true;
    }
};
var showError = function(error){
    $('.error-message').addClass('error-visible').html(error);
    $('.error-message').fadeIn();

    $('.table-scroll').css('marginTop', $('.error-message').outerHeight());
    setTimeout(function(){
        $('.error-message').hide().removeClass('error-visible');
        $('.table-scroll').css('marginTop', '0');
    }, 10000);
};
var terminalError = function(error){
    showError(error);
    $('.content').hide();
    $('body').addClass('smallBody');
    setTimeout(function(){
        window.close();
    }, 10000);
};
var copyToClipboard = function(textContent) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val(textContent).select();
    document.execCommand("copy");
    $temp.remove();
}
var crand = function (min, max)
{
    return min + Math.floor(Math.random() * (max - min));
};
var getDomain = function(decodedUrl)
{
    if (decodedUrl.indexOf('target.com') != -1)
        return 'target';

    if (decodedUrl.indexOf('asda.com') != -1)
        return 'asda';

    var match = decodedUrl.match(/(?:https?:\/\/)?(?:www\.)?(.*?)\//);
    var domain = match[match.length-1];
    domain = domain.split('.');
    domain = domain[0];
    return domain;
};
var cleanHTML = function(data)
{
    if (data)
    {
        data = data.replace(/<script/g, '<section');
        data = data.replace(/script>/g, 'section>');
        data = data.replace(/<img/g, '<section');
        return data;
    }
};
var setCookie = function(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
};
var getCookie = function(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
};

var setCountry = function(local) {
    country = local;
}
var setLocalStorage = function(source, url){
    var storage = 'st'+crand(1,999);

    try {
        localStorage['source'+storage] = source;
        localStorage['tab'+storage] = url;
        localStorage['storage']=storage;

        return storage;
    } catch (err) {
        for (var i = 0; i < localStorage.length; i++){
            if ((localStorage.key(i).indexOf('tab') == 0) || (localStorage.key(i).indexOf('source') == 0))
                delete localStorage[localStorage.key(i)];
        }

        terminalError(err.message);
        setLocalStorage(source, url);
    }
};
var IsNumeric = function (input) {
    var RE = /^-{0,1}\d*\.{0,1}\d+$/;
    return (RE.test(input));
}

    var netToken = "";
    var marketPlaceId = "";
    var currencyCode = "";
    var labelsAmazonFees = [];
    var failedNetPayoutTimeout = 50;
    var FAIL_PETICION_FAB = false;

    /*Get percentage Referral Fees by category*/
    var getPerRefFeeProductType = function (asin, amzPrice) {
      var element = $("#main-table tbody").find('.tbl-ASIN:contains("' + asin + '")').parents('tr');
      var category = element.find('.tbl-Category').text();
      var referralFee = 0;

      if (category == "3D Printed Products") {
        referralFee = 0.12 * amzPrice;
      }else if (category == "Amazon Device Accessories") {
        referralFee = 0.45 * amzPrice;

        if (referralFee < 1){
          referralFee = 1
        }
      }else if (category == "Automotive & Powersports") {
        referralFee = 0.12 * amzPrice;

        if (referralFee < 1){
          referralFee = 1;
        }
      }else if (category == "Camera and Photo") {
        referralFee = 0.08 * amzPrice
      }else if (category == "Cell Phone Devices") {
        referralFee = 0.08 * amzPrice
      }else if (category == "Consumer Electronics") {
        referralFee = 0.08 * amzPrice;

        if (referralFee < 1){
          referralFee = 1;
        }
      }else if (category == "Jewelry") {
        referralFee = 0.20 * amzPrice;

        if (referralFee < 2){
          referralFee = 2;
        }
      }else if (category == "Personal Computers") {
        referralFee = 0.06 * amzPrice;

        if (referralFee < 1){
          referralFee = 1;
        }
      }else if (category == "Sports Collectibles") {
        referralFee = 0.20 * amzPrice
      }else if (category == "Video Game Consoles") {
        referralFee = 0.08 * amzPrice
      }else {
        referralFee = 0.15 * amzPrice
      }

      return parseFloat(referralFee.format(2));
    }
	
	var mwsGetFBA = function (asin) {
		var url = "http://asinspector.com/rest/get_fba_data_mws.php";
		var data = {};
		data.seller_id = localStorage['seller_id'];
		data.marketplace_id = localStorage['marketplace_id'];
		data.access_key = localStorage['access_key'];
		data.secret_key = localStorage['secret_key'];
		data.asin = asin.asin;
		data.l_price = asin.l_price;
		console.log(data);
		$.ajax({
        method: "POST",
        url: url,
        data: data,
        dataType: 'json'
      })
      .success(function(data) {
        console.log(data);
      })
	  .fail(function (d)
	  {
		  //mwsGetFBA();
	  });
	}

    var fnGetMeFba = function(data, amzPrice) {
	
		if(localStorage['seller_id'] && localStorage['marketplace_id'] && localStorage['access_key'] && localStorage['secret_key'] && false)
		{
			var d = {};
			d.asin = data.asin;
			d.l_price = amzPrice;
			mwsGetFBA(d);
			return;
		}
		else
		{
			//console.log(country);
			if(country == "com")
				var url = "http://asinspector.com/rest/getMeFBA.php";
			else if(country == "ca" )
				var url = "http://asinspector.com/rest/getMeFBA2.php";
			else if(country == "it" || country == "fr" || country == "co.uk" || country == "de" || country == "es")
				var url = "http://asinspector.com/rest/getMeFBAOther.php";
			else{
				getFBAPopup(data.asin, amzPrice);
				return;
			}
		}
		
		data.site = country;
      $.ajax({
        method: "POST",
        url: url,
        data: data,
        dataType: 'json'
      })
      .success(function(data) {
        var textFees = "";
        data.dataFba.referralFee = getPerRefFeeProductType(data.asin, amzPrice);
        data.dataFba.closingFees = 0.99;
        data.dataFba.variableClosingFees = 0.00;

        textFees+= '<br /><b>Order Handling Fee: </b>' + getMoneySymbol() + parseFloat(data.dataFba.orderHandling).format(2) + '<br /><br />';
        textFees+= '<b>Storage Fee: </b>' + getMoneySymbol() + parseFloat(data.dataFba.fbaStorageFee).format(2) + '<br /><br />';
        textFees+= '<b>Pick And Pack Fee: </b>' + getMoneySymbol() + parseFloat(data.dataFba.pickAndPack).format(2) + '<br /><br />';
        textFees+= '<b>Referral Fee: </b>' + getMoneySymbol() + parseFloat(data.dataFba.referralFee).format(2) + '<br /><br />';

        if (localStorage['fixedClosingFee'] == 1) {
          textFees+= '<b>Fixed Closing Fees: </b>' + getMoneySymbol() + parseFloat(data.dataFba.closingFees).format(2) + '<br /><br />';
        }

        textFees+= '<b>Variable Closing Fees: </b>' + getMoneySymbol() + parseFloat(data.dataFba.variableClosingFees).format(2) + '<br /><br />';
        textFees+= '<b>Weight Handling Fee: </b>' + getMoneySymbol() + parseFloat(data.dataFba.weightHandling).format(2) + '<br /><br />';

        if (localStorage['fixedClosingFee'] == 1) {
        var totalFee = parseFloat(data.dataFba.fees) + parseFloat(data.dataFba.referralFee) + parseFloat(data.dataFba.closingFees) + parseFloat(data.dataFba.variableClosingFees);
		}
		else{
		var totalFee = parseFloat(data.dataFba.fees) + parseFloat(data.dataFba.referralFee)  + parseFloat(data.dataFba.variableClosingFees);		
		}
		
        textFees = textFees + '<br /><b>Total: </b>' + getMoneySymbol() + parseFloat(totalFee).format(2)+ '<br /><br />';

        var element = $("#main-table tbody").find('.tbl-ASIN:contains("' + data.asin + '")').parents('tr');
        $(element).find(".tbl-FBATablefee").html(getMoneySymbol() + (parseFloat(totalFee).format(2)) +
            ' <small class="extra-info-column"><a class="colorbox-rel" rel="' + textFees +
            '"><img src="../images/info.png" /></a></small>')
        .attr('title', textFees);

        var breakCost = parseFloat(getPureNumber(amzPrice)) - parseFloat(totalFee).format(2);
        $(element).find(".tbl-BreakEven").html(getMoneySymbol() + (parseFloat(breakCost).format(2)));

        $(element).find(".tbl-FBATablefee").attr('mecalculatefba',JSON.stringify(data.dataFba));


        $("table#main-table").trigger("update");
      })
	  .fail(function (d)
	  {
		  fnGetMeFba(data, amzPrice);
	  });
    }

	var recalculateFBA = function (amzPrice, myPrice) {
		var fees = 0.00;
		  var textFees = '';
		  for (var name in globalData) {
            if(name === 'orderHandlingFee' || name === 'weightHandlingFee') {
                continue;
            }
            
			if ((localStorage['fixedClosingFee'] == '1' && name == 'fixedClosingFee') || name != 'fixedClosingFee') {
				var referralFee;
			  if(labelsAmazonFees[name] == "Referral Fee")
			  {
				  referralFee = referralRatio * parseFloat(amzPrice);
				  globalData[name] = referralRatio * parseFloat(amzPrice);
			  }
			  
			  if (globalData[name]) {
				fees = parseFloat(fees) + parseFloat(globalData[name]);
			  }

			  if (!isset(labelsAmazonFees[name])) {
				var readableFeeName = name[0].toUpperCase();
				for (var yn = 1; yn < name.length; yn++) {
				  if (name[yn] == name[yn].toUpperCase()) {
					readableFeeName = readableFeeName + ' ' + name[yn];
				  } else {
					readableFeeName = readableFeeName + name[yn];
				  }
				}
				labelsAmazonFees[name] = readableFeeName;
			  }

              if(name === 'pickAndPackFee'){
                textFees = '<b>' + labelsAmazonFees[name] + ': </b>' + getMoneySymbol() +
                    parseFloat(globalData[name]).format(2) + '<br />' + textFees;
              } else {
                textFees = textFees + '<b>' + labelsAmazonFees[name] + ': </b>' + getMoneySymbol() +
                    parseFloat(globalData[name]).format(2) + '<br />';
              }
			  
			}
		  }

		  var totalFees = parseFloat(fees).format(2);
          totalFBAFee = parseFloat(totalFees);
		  textFees = textFees + '<br /><b>Total: </b>' + getMoneySymbol() + totalFees;
		  $("#ntp_breakEven").attr("data-total-fees",totalFees);
		  $('#result-net-payout .fba-fees-description').html(textFees);
	};

    var getFBAPopup = function(asin, amzPrice) {
     var language = countryLanguage[country];
        if (!language) {
            language = 'en_US';
        }
		
	$.ajaxSetup({async:false});
		$.get('https://sellercentral.amazon.'+country+'/fba/profitabilitycalculator/index?lang='+language, function(data){

             data = $(cleanHTML(data));
             netToken = data.find('input[name=profitcalcToken]').val();
      })
      $.ajaxSetup({async:true});
	  
        var urlProductInfo = 'https://sellercentral.amazon.' + country + '/hz/fba/profitabilitycalculator/productmatches?searchKey=' + asin + '&language=' + language + '&profitcalcToken=' + netToken;

        $.getJSON(urlProductInfo, function(data) {
          data = data['data'][0];

          if (!data) {
            return;
          }

          data["selected"] = true;
          data["language"] = "en_US";
          data["price"] = amzPrice;
          data["revenueTotal"] = 0;
          data["prep-service"] = 0;
          data["fulfillmentTotal"] = 0;
          data["undefined"] = 0;

          var netUrl = 'https://sellercentral.amazon.' + country + '/hz/fba/profitabilitycalculator/getafnfee?profitcalcToken=' + netToken;

          $.ajax({
            type: 'POST',
            async: false,
            url: netUrl,
            data: '{"productInfoMapping":' + JSON.stringify(data) + ',"afnPriceStr":' + amzPrice + ',"mfnPriceStr":0,"mfnShippingPriceStr":0,"currency":"' + currencyCode + '","marketPlaceId":"' + marketPlaceId + '","hasFutureFee":false,"futureFeeDate":"2015-05-05 00:00:00"}',
            success: function(data) {
              try {
                data = data['data']['afnFees'];
              } catch (err) {
                return;
              }

			  globalData = data;
              var fees = 0.00;
              var textFees = '';
              for (var name in data) {
                if ((localStorage['fixedClosingFee'] == '1' && name == 'fixedClosingFee') || name != 'fixedClosingFee') {
                  if (data[name]) {
                    fees = parseFloat(fees) + parseFloat(data[name]);
                  }

                  if (!isset(labelsAmazonFees[name])) {
                    var readableFeeName = name[0].toUpperCase();
                    for (var yn = 1; yn < name.length; yn++) {
                      if (name[yn] == name[yn].toUpperCase()) {
                        readableFeeName = readableFeeName + ' ' + name[yn];
                      } else {
                        readableFeeName = readableFeeName + name[yn];
                      }
                    }
                    labelsAmazonFees[name] = readableFeeName;
                  }

                  textFees = textFees + '<b>' + labelsAmazonFees[name] + ': </b>' + getMoneySymbol() + parseFloat(data[name]).format(2) + '<br />';
				  if(labelsAmazonFees[name] == "Referral Fee")
				  {
					  referralRatio = parseFloat(data[name])/amzPrice;
				  }
                }
              }

              var totalFees = parseFloat(fees).format(2);
			  
              textFees = textFees + '<br /><b>Total: </b>' + getMoneySymbol() + totalFees;
              $("#ntp_price").val(parseFloat(amzPrice));
              var breAkCost = parseFloat(amzPrice - totalFees).format(2);
              $("#ntp_breakEven").val(breAkCost);
              $("#ntp_breakEven").attr("data-total-fees",totalFees);

              var intFees = parseFloat(totalFees) + parseFloat(breAkCost);
              intFees = parseFloat(intFees.format(2));
              intFees = parseFloat(getPureNumber(amzPrice)) - intFees;

              var roi = parseInt(parseFloat(intFees / breAkCost) * 100);
              intFees = intFees.format(2);

              var element = $("#main-table tbody").find('.tbl-ASIN:contains("' + data.asin + '")').parents('tr');
			$(element).find(".tbl-FBATablefee").html(getMoneySymbol() + (parseFloat(fees).format(2)) +
                ' <small class="extra-info-column"><a class="colorbox-rel" rel="' + textFees +
                '"><img src="../images/info.png" /></a></small>')
            .attr('title', textFees);

			var breakCost = parseFloat(getPureNumber(amzPrice)) - parseFloat(fees).format(2);
			$(element).find(".tbl-BreakEven").html(getMoneySymbol() + (parseFloat(breakCost).format(2)));
            },
            contentType: "application/json",
            dataType: 'json'
          }).fail(function(data) {
            /*Show Error*/
          });
        }).fail(function(data) {
          console.log("Error 503");
          /*Show Error*/
        });
      
    }
	
    var showFBAOnePage = function(asin, amzPrice, myPrice) {
      var value = localStorage["SELECT_" + asin];

      if (value != null) {
        var listFBA = JSON.parse(value);
        var totalFees = parseFloat(parseFloat(listFBA.fees) +  parseFloat(listFBA.referralFee) + parseFloat(listFBA.closingFees)).format(2);

        var textFees = "";
        textFees+= '<b>Order Handling Fee: </b>' + getMoneySymbol() + parseFloat(listFBA.orderHandling).format(2) + '<br />';
        textFees+= '<b>Storage Fee: </b>' + getMoneySymbol() + parseFloat(listFBA.fbaStorageFee).format(2) + '<br />';
        textFees+= '<b>Pick And Pack Fee: </b>' + getMoneySymbol() + parseFloat(listFBA.pickAndPack).format(2) + '<br />';
        textFees+= '<b>Referral Fee: </b>' + getMoneySymbol() + parseFloat(listFBA.referralFee).format(2) + '<br />';
        textFees+= '<b>Closing Fees: </b>' + getMoneySymbol() + parseFloat(listFBA.closingFees).format(2) + '<br />';
        textFees+= '<b>Weight Handling Fee: </b>' + getMoneySymbol() + parseFloat(listFBA.weightHandling).format(2) + '<br />';
        textFees = textFees + '<br /><b>Total: </b>' + getMoneySymbol() + totalFees;
        $('#result-net-payout .fba-fees-description').html(textFees);
        $("#ntp_price").val(parseFloat(amzPrice));
        var breAkCost = parseFloat(amzPrice - totalFees).format(2);
        $("#ntp_breakEven").attr("data-total-fees",totalFees);
        $("#ntp_breakEven").val(breAkCost);

        var intFees = parseFloat(totalFees) + parseFloat(breAkCost);
        intFees = parseFloat(intFees.format(2));
        intFees = parseFloat(getPureNumber(amzPrice)) - intFees;

        var roi = parseInt(parseFloat(intFees / breAkCost) * 100);
        intFees = intFees.format(2);

        $("#net_payout_id").html(intFees + " &nbsp;&nbsp;" + roi + "%");
        if (intFees < 0) {
          $("#net_payout_id").css("color","red");
        }else{
          $("#net_payout_id").css("color","green");
        }
      }else{
        var language = countryLanguage[country];
        if (!language) {
            language = 'en_US';
        }
		
        var urlProductInfo = 'https://sellercentral.amazon.' + country + '/hz/fba/profitabilitycalculator/productmatches?searchKey=' + asin + '&language=' + language + '&profitcalcToken=' + netToken;

        $.getJSON(urlProductInfo, function(data) {

          if (!data || !data['data']) {
            /*Show Error*/
            if (data.status != "503") {
              /*Show Error*/
            }

            return;
          }

          data = data['data'][0];

          data["selected"] = true;
          data["language"] = "en_US";
          data["price"] = amzPrice;
          data["revenueTotal"] = 0;
          data["inbound-delivery"] = myPrice;
          data["prep-service"] = 0;
          data["fulfillmentTotal"] = 0;
          data["undefined"] = 0;

          var netUrl = 'https://sellercentral.amazon.' + country + '/hz/fba/profitabilitycalculator/getafnfee?profitcalcToken=' + netToken;

          $.ajax({
            type: 'POST',
            async: false,
            url: netUrl,
            data: '{"productInfoMapping":' + JSON.stringify(data) + ',"afnPriceStr":' + amzPrice + ',"mfnPriceStr":0,"mfnShippingPriceStr":0,"currency":"' + currencyCode + '","marketPlaceId":"' + marketPlaceId + '","hasFutureFee":false,"futureFeeDate":"2015-05-05 00:00:00"}',
            success: function(data) {
              try {
                data = data['data']['afnFees'];
              } catch (err) {
                if (callback && data.status != "503") {
                  setTimeout(function() {
                    if (failedNetPayoutTimeout > 0) {
                      callback();
                      failedNetPayoutTimeout--;
                    }
                  }, 5000);
                }
                return;
              }

			  globalData = data;
              var fees = 0.00;
              var textFees = '';
              for (var name in data) {
                if(name === 'orderHandlingFee' || name === 'weightHandlingFee') {
                    continue;
                }
                if ((localStorage['fixedClosingFee'] == '1' && name == 'fixedClosingFee') || name != 'fixedClosingFee') {
                  if (data[name]) {
                    fees = parseFloat(fees) + parseFloat(data[name]);
                  }

                  if (!isset(labelsAmazonFees[name])) {
                    var readableFeeName = name[0].toUpperCase();
                    for (var yn = 1; yn < name.length; yn++) {
                      if (name[yn] == name[yn].toUpperCase()) {
                        readableFeeName = readableFeeName + ' ' + name[yn];
                      } else {
                        readableFeeName = readableFeeName + name[yn];
                      }
                    }
                    if(readableFeeName === "Pick And Pack Fee") {
                        readableFeeName = "Fulfillment Fee";
                    }
                    labelsAmazonFees[name] = readableFeeName;
                  }

                  if (name === 'pickAndPackFee')  {
                    textFees = '<b>' + labelsAmazonFees[name] + ': </b>' +
                        getMoneySymbol() + parseFloat(data[name]).format(2) + '<br />' + textFees;
                  } else {
                    textFees = textFees + '<b>' + labelsAmazonFees[name] + ': </b>' +
                        getMoneySymbol() + parseFloat(data[name]).format(2) + '<br />';
                  }

				  if(labelsAmazonFees[name] == "Referral Fee")
				  {
					  referralRatio = parseFloat(data[name])/amzPrice;
				  }
                }
              }

              var totalFees = parseFloat(fees).format(2);
              totalFBAFee = totalFees;

              textFees = textFees + '<br /><b>Total: </b>' + getMoneySymbol() + totalFees;
              $("#ntp_price").val(parseFloat(amzPrice));
              var breAkCost = parseFloat(amzPrice - totalFees).format(2);
              $("#ntp_breakEven").val(breAkCost);
              $("#ntp_breakEven").attr("data-total-fees",totalFees);

              var intFees = parseFloat(totalFees) + parseFloat(breAkCost);
              intFees = parseFloat(intFees.format(2));
              intFees = parseFloat(getPureNumber(amzPrice)) - intFees;

              var roi = parseInt(parseFloat(intFees / breAkCost) * 100);
              intFees = intFees.format(2);

              $("#net_payout_id").html(intFees + " &nbsp;&nbsp;" + roi + "%");
              if (intFees < 0) {
                $("#net_payout_id").css("color","red");
              }else{
                $("#net_payout_id").css("color","green");
              }
              $('#result-net-payout .fba-fees-description').html(textFees);

              $('.price-currency').html(getMoneySymbol());
            },
            contentType: "application/json",
            dataType: 'json'
          }).fail(function(data) {
            /*Show Error*/
          });
        }).fail(function(data) {
          console.log("Error 503");
          /*Show Error*/
        });
      }
    }

    var getNETPayoutToken = function(asin)
    {
      if (netToken != "") { return; }

      var language = countryLanguage[country];
      if (!language) {
        language = 'en_US';
      }

      $.ajaxSetup({async:false});
      $.get('https://sellercentral.amazon.'+country+'/fba/profitabilitycalculator/index?lang='+language, function(data){
             var rawData = data;
             var marketPlaceData = data.substring(data.indexOf("marketplaceIdHidden"));
             var marketPlaceVal = marketPlaceData.substring(marketPlaceData.indexOf("=") + 1,marketPlaceData.indexOf("\"/>"));
             marketPlaceVal = marketPlaceVal.replace(" ","");
             marketPlaceId = marketPlaceVal.substring(1);

             var currencyCodeData = data.substring(data.indexOf("currencyCodeHidden"));
             var currencyCodeVal = currencyCodeData.substring(currencyCodeData.indexOf("=") + 1,currencyCodeData.indexOf("\"/>"));
             currencyCodeVal = currencyCodeVal.replace(" ","");
             currencyCode = currencyCodeVal.substring(1);

             data = $(cleanHTML(data));

             //currencyCode = data.find('#currencyCodeHidden').val();
             //marketPlaceId = data.find('#marketplaceIdHidden').val();
             netToken = data.find('input[name=profitcalcToken]').val();
      }).fail(function(data){

        if (data.status != "503") {
          setTimeout(function(){
            if (failedNetPayoutTimeout > 0) {
              getNETPayoutToken(asin);
              failedNetPayoutTimeout --;
            }
          }, crand(5000,10000));
        }
      });
      $.ajaxSetup({async:true});

    };
    var getAmazonFees = function(asin, amzPrice, dom){
        addLoaderToColumn(dom+'FBATablefee');
        addLoaderToColumn(dom+'BreakEven');

        if (!isset(asin) || !isset(amzPrice)){
            $(dom+'FBATablefee').text('Not found');
            $(dom+'BreakEven').text('Not found');
        }
    };
    var getAmazonFbaFeesForAll = function(){
        var language = countryLanguage[country];
        if (!language) {
            language = 'en_US';
        }
        if(netToken=="") {
            $.ajaxSetup({async:false});
        
            //console.log("netToken:" + netToken);
        
            $.get('https://sellercentral.amazon.'+country+'/fba/profitabilitycalculator/index?lang='+language, function(data){

             data = $(cleanHTML(data));
             netToken = data.find('input[name=profitcalcToken]').val();
            });
            $.ajaxSetup({async:true});
        }


        var products = $("#main-table tbody").find('tr');
        var data = [];
        var dataList = [];
        for(var i=0; i<products.length; i++){
            data.push({
                asin: $(products[i]).find('td.tbl-ASIN').text()
            });

            var packageDimensions = $(products[i]).find(".tbl-PackageDimensions").text();
            var ListDimension = packageDimensions.split(" ");
            var dimension = {};
            for (var j = 0; j < ListDimension.length; j++) {
                var keyVal = ListDimension[j].split(":");
                dimension[keyVal[0]] = keyVal[1];
            }
            if (!dimension.hasOwnProperty("WE")) {
                data[data.length-1]["weight"] = 0;
            } else {
                data[data.length-1]["weight"] = dimension["WE"];
            }

            if (!dimension.hasOwnProperty("W")) {
                data[data.length-1]["width"] = 0;
            } else {
                data[data.length-1]["width"] = dimension["W"];
            }

            if (!dimension.hasOwnProperty("L")) {
                data[data.length-1]["length"] = 0;
            } else {
                data[data.length-1]["length"] = dimension["L"];
            }

            if (!dimension.hasOwnProperty("H")) {
                data[data.length-1]["height"] = 0;
            } else {
                data[data.length-1]["height"] = dimension["H"];
            }

            if(data["weight"] == 0)
            {
              $.ajax({
                method: "GET",
                url: "https://sellercentral.amazon." + country + "/hz/fba/profitabilitycalculator/productmatches?searchKey=" + asin + "&language=en_US&profitcalcToken=" + netToken,
                dataType: 'json'
              })
              .success(function(ddd) {
                  if(ddd["data"].length > 0)
                  {
                    data[data.length-1]["weight"] = parseInt(ddd["data"][0]["weight"]) * 100;
                  } else {
                    getFBAPopup(data[data.length-1].asin, amzPrice);
                  }
              });
              
            }

           if(data.length == 10 || i == products.length-1){
                dataList.push(data);
                data = [];
            }
        }

        for(var i=0; i<dataList.length; i++){
            var params = {
                getFBAFeesForListAsins: 1,
                data: dataList[i]
            }
            getFbaFeeTimeout(params, i);
        }

    }
    var getFbaFeeTimeout = function(params, index){
        setTimeout(function(){
            $.ajax({
                method: "POST",
                url: 'http://asinspector.com/rest/getFBAFees.php',
                data: params,
                dataType: 'json'
              })
              .success(function(data) {
                for(var i=0; i<data.dataFba.length; i++){
                    var fbaData = data.dataFba[i];
                    var textFees = "";
                    var element = $("#main-table tbody").find('.tbl-ASIN:contains("' + fbaData.asin + '")').parents('tr');
                    var amzPrice = getPureNumber($(element).find(".tbl-" + localStorage['defaultPrice']).text());
                    fbaData.referralFee = getPerRefFeeProductType(fbaData.asin, amzPrice);
                    if(!isset(fbaData.asin) || !isset(amzPrice)){
                        continue;
                    }
                    fbaData.closingFees = 0.99;
                    fbaData.variableClosingFees = 0.00;

                    textFees+= '<br /><b>Order Handling Fee: </b>' + getMoneySymbol() + parseFloat(fbaData.orderHandling).format(2) + '<br /><br />';
                    textFees+= '<b>Storage Fee: </b>' + getMoneySymbol() + parseFloat(fbaData.fbaStorageFee).format(2) + '<br /><br />';
                    textFees+= '<b>Pick And Pack Fee: </b>' + getMoneySymbol() + parseFloat(fbaData.pickAndPack).format(2) + '<br /><br />';
                    textFees+= '<b>Referral Fee: </b>' + getMoneySymbol() + parseFloat(fbaData.referralFee).format(2) + '<br /><br />';

                    if (localStorage['fixedClosingFee'] == 1) {
                      textFees+= '<b>Fixed Closing Fees: </b>' + getMoneySymbol() + parseFloat(fbaData.closingFees).format(2) + '<br /><br />';
                    }

                    textFees+= '<b>Variable Closing Fees: </b>' + getMoneySymbol() + parseFloat(fbaData.variableClosingFees).format(2) + '<br /><br />';
                    textFees+= '<b>Weight Handling Fee: </b>' + getMoneySymbol() + parseFloat(fbaData.weightHandling).format(2) + '<br /><br />';

                    if (localStorage['fixedClosingFee'] == 1) {
                    var totalFee = parseFloat(fbaData.fees) + parseFloat(fbaData.referralFee) + parseFloat(fbaData.closingFees) +
                        parseFloat(fbaData.variableClosingFees);
                    }
                    else{
                    var totalFee = parseFloat(fbaData.fees) + parseFloat(fbaData.referralFee)  + parseFloat(fbaData.variableClosingFees);        
                    }
                    
                    textFees = textFees + '<br /><b>Total: </b>' + getMoneySymbol() + parseFloat(totalFee).format(2)+ '<br /><br />';

                    $(element).find(".tbl-FBATablefee").html(getMoneySymbol() + (parseFloat(totalFee).format(2)) +
                        ' <small class="extra-info-column"><a class="colorbox-rel" rel="' + textFees +
                        '"><img src="../images/info.png" /></a></small>').attr('title', textFees);

                    $(element).find(".tbl-FBATablefee").attr('mecalculatefba',JSON.stringify(fbaData));

                    var breakCost = parseFloat(getPureNumber(amzPrice)) - parseFloat(totalFee).format(2);
                    $(element).find(".tbl-BreakEven").html(getMoneySymbol() + (parseFloat(breakCost).format(2)));
                }

                $("table#main-table").trigger("update");
              })
        }, index * 1000);
    }
    var getNETPayout = function(asin, amzPrice, myPrice, kind, dom, callback)
    {
        //getNETPayoutToken(asin);
        $('#calculate-net-payout').hide();
        $('#discover-breakeven-cost').hide();
        $('#loader-net-payout').fadeIn();

        var language = countryLanguage[country];
        if (!language) {
            language = 'en_US';
        }

        //if (netToken == "") { return false; }
        /*Get manual payout*/
        var element = $("#main-table tbody").find('.tbl-ASIN:contains("' + asin + '")').parents('tr');
        var listFBA = JSON.parse($(element).find(".tbl-FBATablefee").attr('mecalculatefba'));

		var referralFee = amzPrice * 0.15;
        var totalFees = parseFloat(parseFloat(listFBA.fees) +  referralFee + parseFloat(listFBA.closingFees)).format(2);

        var textFees = "";
        textFees+= '<b>Order Handling Fee: </b>' + getMoneySymbol() + parseFloat(listFBA.orderHandling).format(2) + '<br />';
        textFees+= '<b>Storage Fee: </b>' + getMoneySymbol() + parseFloat(listFBA.fbaStorageFee).format(2) + '<br />';
        textFees+= '<b>Pick And Pack Fee: </b>' + getMoneySymbol() + parseFloat(listFBA.pickAndPack).format(2) + '<br />';
        textFees+= '<b>Referral Fee: </b>' + getMoneySymbol() + referralFee.format(2) + '<br />';

        if (localStorage['fixedClosingFee'] == 1) {
          textFees+= '<b>Fixed Closing Fees: </b>' + getMoneySymbol() + parseFloat(listFBA.closingFees).format(2) + '<br />';
        }

        textFees+= '<b>Variable Closing Fees: </b>' + getMoneySymbol() + parseFloat(listFBA.variableClosingFees).format(2) + '<br />';
        textFees+= '<b>Weight Handling Fee: </b>' + getMoneySymbol() + parseFloat(listFBA.weightHandling).format(2) + '<br />';
        textFees = textFees + '<br /><b>Total: </b>' + getMoneySymbol() + totalFees;

        var fees = totalFees;

        fees = parseFloat(fees) + parseFloat(myPrice);
        fees = parseFloat(fees.format(2));

        fees = parseFloat(getPureNumber(amzPrice)) - fees;

        var roi = parseInt(parseFloat(fees / myPrice) * 100);
        fees = fees.format(2);
//console.log("cp3");
        $('#result-net-payout .fba-fees-payout').text(totalFees).attr('title', textFees);
        $('#result-net-payout .fba-fees-description').html(textFees);

        $('#result-net-payout .net-payout').text(fees);
        $('#result-net-payout .roi').text(roi + '%');

        $('#calculate-net-payout').fadeIn();
        $('#loader-net-payout').hide();
        $('#result-net-payout').fadeIn();

        return;


        var urlProductInfo = 'https://sellercentral.amazon.'+country+'/hz/fba/profitabilitycalculator/productmatches?searchKey='+asin+'&language='+language+'&profitcalcToken='+netToken;

        $.getJSON(urlProductInfo, function( data ) {
            data = data['data'][0];

            if (!data)
            {
                $('#calculate-net-payout').fadeIn();
                $('#discover-breakeven-cost').fadeIn();

                $('#loader-net-payout').hide();
                $('#result-net-payout').hide();

                if (kind != 'table')
                {
                    alert('Fees could not be found for this product.');
                }
                else
                {
                    $(dom+'FBATablefee').html('Not found');
                    $(dom+'BreakEven').html('Not found');

                }

                if (callback && data.status != "503")
                {
                    setTimeout(function(){
                      if (failedNetPayoutTimeout > 0) {
                        callback();
                        failedNetPayoutTimeout --;
                      }
                    }, 5000);
                }

                return;
            }

            data["selected"] = true;
            data["language"] = "en_US";
            data["price"] = amzPrice;
            data["revenueTotal"] = 0;
            data["inbound-delivery"] = myPrice ;
            data["prep-service"] = 0 ;
            data["fulfillmentTotal"] = 0 ;
            data["undefined"] = 0 ;


            var netUrl = 'https://sellercentral.amazon.'+country+'/hz/fba/profitabilitycalculator/getafnfee?profitcalcToken='+netToken;

            $.ajax({
                type: 'POST',
                async: false,
                url: netUrl,
                data: '{"productInfoMapping":'+JSON.stringify(data)+',"afnPriceStr":'+amzPrice+',"mfnPriceStr":0,"mfnShippingPriceStr":0,"currency":"'+currencyCode+'","marketPlaceId":"'+marketPlaceId+'","hasFutureFee":false,"futureFeeDate":"2015-05-05 00:00:00"}',
                success: function(data) {
                    try {
                        data = data['data']['afnFees'];
                    } catch (err) {
                        if (callback && data.status != "503")
                        {
                            setTimeout(function(){
                                if (failedNetPayoutTimeout > 0) {
                                  callback();
                                  failedNetPayoutTimeout --;
                                }
                            }, 5000);
                        }
                        return;
                    }
                    var fees = 0.00;
                    var textFees = '';
                    for (var name in data)
                    {
                        if ((localStorage['fixedClosingFee'] == '1' && name == 'fixedClosingFee') || name != 'fixedClosingFee') {
                            if (data[name]) {
                                fees = parseFloat(fees) + parseFloat(data[name]);
                            }

                            if (!isset(labelsAmazonFees[name]))
                            {
                                var readableFeeName = name[0].toUpperCase();
                                for(var yn=1; yn<name.length; yn++)
                                {
                                    if (name[yn] == name[yn].toUpperCase())
                                    {
                                        readableFeeName = readableFeeName+' '+name[yn];
                                    }
                                    else
                                    {
                                        readableFeeName = readableFeeName+name[yn];
                                    }
                                }
                                labelsAmazonFees[name] = readableFeeName;
                            }

                            textFees = textFees + '<b>'+labelsAmazonFees[name]+': </b>'+getMoneySymbol()+parseFloat(data[name]).format(2)+'<br />';
                        }
                    }
                    var totalFees = parseFloat(fees).format(2);
                    textFees = textFees+'<br /><b>Total: </b>'+getMoneySymbol()+totalFees;

                    if (kind == 'table')
                    {

                        $(dom+'FBATablefee').html(getMoneySymbol()+(parseFloat(fees).format(2)) +
                            ' <small class="extra-info-column"><a class="colorbox-rel" rel="'+textFees+
                            '"><img src="../images/info.png" /></a></small>')
                        .attr('title', textFees);
                        $(dom+'BreakEven').html(getMoneySymbol()+(parseFloat(getPureNumber(amzPrice)) -  parseFloat(fees).format(2)).format(2));
                        if (callback && data.status != "503")
                        {
                            setTimeout(function(){
                                if (failedNetPayoutTimeout > 0) {
                                  callback();
                                  failedNetPayoutTimeout --;
                                }
                            }, 5000);
                        }

                        updateTableSorter();

                        return;
                    }



                    fees = fees + parseFloat(myPrice);
                    fees = parseFloat(getPureNumber(amzPrice)) - fees;

                    var roi = parseInt(parseFloat(fees/myPrice)*100);

                    fees = fees.format(2);
//console.log("cp4");
                    $('#result-net-payout .fba-fees-payout').text(totalFees).attr('title', textFees);
                    $('#result-net-payout .fba-fees-description').html(textFees);

                    $('#result-net-payout .net-payout').text(fees);
                    $('#result-net-payout .roi').text(roi+'%');

                    $('#calculate-net-payout').fadeIn();
                    $('#discover-breakeven-cost').fadeIn();

                    $('#loader-net-payout').hide();
                    $('#result-net-payout').fadeIn();



                    $.colorbox.resize();
                },
                contentType: "application/json",
                dataType: 'json'
            }).fail(function(data){
                  if (kind == 'table' && data.status != "503")
                  {
                      setTimeout(function(){
                        if (failedNetPayoutTimeout > 0) {
                          getNETPayout(asin, amzPrice, myPrice, kind, dom);
                          failedNetPayoutTimeout --;
                        }
                    }, crand(5000,15000));
                }
            });
        }).fail(function(data){
            if (kind == 'table' && data.status != "503")
            {
                setTimeout(function(){
                    if (failedNetPayoutTimeout > 0) {
                      getNETPayout(asin, amzPrice, myPrice, kind, dom);
                      failedNetPayoutTimeout --;
                    }
                }, crand(5000,15000));
            }
        });
    };


var fixCSVField = function(value) {
    var fixedValue = value;
    var addQuotes = (value.indexOf(',') !== -1) || (value.indexOf('\r') !== -1) || (value.indexOf('\n') !== -1);
    var replaceDoubleQuotes = (value.indexOf('"') !== -1);

    if (replaceDoubleQuotes) {
        fixedValue = fixedValue.replace(/"/g, '""');
    }
    if (addQuotes || replaceDoubleQuotes) {
        fixedValue = '"' + fixedValue + '"';
    }
    return fixedValue;
};

var tableToCSV = function(table) {
    var data = "";
    for (var i = 0, row; row = table.rows[i]; i++) {
      var $row = $(row);
      //console.log($row.hasClass('active-line-cb'));
      if ($row.is(':visible') && ($row.hasClass('active-line-cb') || $row.hasClass('tablesorter-headerRow')))
        {
            for (var j = 0, col; col = row.cells[j]; j++) {
                if ($(col).is(":visible") || $(col).hasClass("tbl-Actions"))
                {
                    var tempCol = '<div>'+col.innerHTML+'</div>';

                    if ($(col).find('.extra-info-column').length > 0)
                        tempCol = '<div>'+$(tempCol).clone().children().remove().end().text()+'</div>';

                    if ($(col).find('.smallText').length > 0)
                        tempCol = $(col).find('.fullText').html();

                    if ($(col).hasClass('tbl-Actions'))
                    {
                        if ($.trim($(col).text()) == '')
                            tempCol = $(row).find('.tbl-DetailPageURL').text();
                        else
                            tempCol = 'Link';
                    }


                    data = data + (j ? ',' : '') + fixCSVField(strip_tags(tempCol, ''));
                }
            }
            data = data + "\r\n";

        }
    }
    return data;
};

var tableToCSVAll = function(table) {
    var data = "";
    for (var i = 0, row; row = table.rows[i]; i++) {
      var $row = $(row);
      //console.log($row.hasClass('active-line-cb'));
      if ($row.is(':visible') || $row.hasClass('tablesorter-headerRow'))
        {
            for (var j = 0, col; col = row.cells[j]; j++) {
                if ($(col).is(":visible") || $(col).hasClass("tbl-Actions"))
                {
                    var tempCol = '<div>'+col.innerHTML+'</div>';

                    if ($(col).find('.extra-info-column').length > 0)
                        tempCol = '<div>'+$(tempCol).clone().children().remove().end().text()+'</div>';

                    if ($(col).find('.smallText').length > 0)
                        tempCol = $(col).find('.fullText').html();

                    if ($(col).hasClass('tbl-Actions'))
                    {
                        if ($.trim($(col).text()) == '')
                            tempCol = $(row).find('.tbl-DetailPageURL').text();
                        else
                            tempCol = 'Link';
                    }


                    data = data + (j ? ',' : '') + fixCSVField(strip_tags(tempCol, ''));
                }
            }
            data = data + "\r\n";

        }
    }
    return data;
};

var strip_tags = function (input, allowed) {
    allowed = (((allowed || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join(''); // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
    var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
        commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
    return input.replace(commentsAndPhpTags, '').replace(tags, function ($0, $1) {
        return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
    });
};


function convertCsvToXls(data, callback)
{
    $.ajax({
        type: 'POST',
        // url: 'http://localhost:8888/upwork/247labs/asinspector/php-export-xls/index.php',
        url: 'http://asinspector.com/php-export-xls/index.php',
        dataType: 'json',
        data: {
            csv: data
        },
        success: function(response)
        {
            callback(response);
        },
        error: function(){

        }
    });
}

var getSearchURLStore = function (store, search) {
    var url = [];
    var tempCountry = country;
    if (tempCountry.indexOf('.') > 0) {
        tempCountry = country.split('.');
        tempCountry = tempCountry[1];
    }
    if (tempCountry == 'com') {
        tempCountry = 'www';
    }

    var getAliexpressSearchText = function(search){
        var acceptableLength = 40;
        var maxLength = 50;
        if(search.length < maxLength){
            return search;
        } else {
            return search.substring(0, acceptableLength) + " " + search.split("%20").splice(-1)[0];
        }
    }

    search = encodeURIComponent(search.replace(/"/g, '')).replace('/%2F/g', '');
    url['walmart'] = 'http://www.walmart.com/search/?query=' + search;
    url['overstock'] = 'http://www.overstock.com/search?keywords=' + search;

    url['toysrus'] = 'http://www.toysrus.com/search/index.jsp?kw=' + search;
    if (country == 'co.uk') {
        url['toysrus'] = 'http://www.toysrus.co.uk/toys/s?Ntt=' + search;
    }
    url['pcworld'] = 'http://www.pcworld.co.uk/gbuk/search-keywords/xx_xx_xx_xx_xx/' + search.replace(/%C2/g, "+").replace(/%20/g, "+").toLowerCase() + '/xx-criteria.html';

    url['wayfair'] = 'http://www.wayfair.' + country + '/keyword.php?keyword=' + search;
    url['kohls'] = 'http://www.kohls.com/search.jsp?search=' + search;
    url['homedepot'] = 'http://www.homedepot.com/s/' + search;

    url['target'] = 'http://www.target.com/s?searchTerm=' + search;
    url['ebay'] = 'http://www.ebay.' + country + '/sch/i.html?&_nkw=' + search;
    url['asda'] = 'http://direct.asda.com/on/demandware.store/Sites-ASDA-Site/default/Search-Show?q=' + search;
    url['argos'] = 'http://www.argos.co.uk/static/Search/searchTerm/' + search.replace(/%20/g, '+') + '.htm';
    url['alibaba'] = 'http://www.alibaba.com/trade/search?SearchText=' + search;
    url['aliexpress'] = 'http://www.aliexpress.com/wholesale?SearchText=' + getAliexpressSearchText(search);
    url['camelcamelcamel'] = 'http://' + tempCountry + '.camelcamelcamel.com/search?sq=' + search;
    url['net-payout'] = '#net-payout';
    url['compare-prices'] = '#compare-prices';
    url['get-product-keywords'] = '#get-product-keywords';
    url['delete-this-product'] = '#delete-this-product';
    url['open-new-page'] = '#open-new-page';
    url['frequently-bought-together'] = '#frequently-bought-together';
    url['get-product-variations'] = '#get-product-variations';
    url['get-product-stock'] = '#get-product-stock';
    url['ecomtracker'] = '#send-to-ecomtracker';
    url['storesbutton'] = '#';

    url['amazoncompletiondomainco.uk'] = 'amazon.co.uk';
    url['amazonautocompleteco.uk'] = '3';
    url['amazoncompletiondomaincom'] = 'amazon.com';
    url['amazonautocompletecom'] = '1';
    url['amazoncompletiondomainca'] = 'amazon.com';
    url['amazonautocompleteca'] = '7';
    url['amazoncompletiondomainca'] = 'amazon.com';
    url['amazonautocompleteca'] = '7';
    url['amazoncompletiondomainde'] = 'amazon.co.uk';
    url['amazonautocompletede'] = '4';
    url['amazoncompletiondomainit'] = 'amazon.co.uk';
    url['amazonautocompleteit'] = '35691';
    url['amazoncompletiondomainfr'] = 'amazon.co.uk';
    url['amazonautocompletefr'] = '5';
    url['amazoncompletiondomainin'] = 'amazon.co.uk';
    url['amazonautocompletein'] = '44571';
    url['amazoncompletiondomaines'] = 'amazon.co.uk';
    url['amazonautocompletees'] = '44551';
    url['amazoncompletiondomainco.jp'] = 'amazon.co.jp';
    url['amazonautocompleteco.jp'] = '6';

    return url[store];
};

function frequentlyBoughtTogether(_this, showPopup = true){
    if(showPopup){
        openColorbox(_this);
    }
    var fbt = [];
    fbt[0] = _this.attr('alt');
    var newpage = 'https://www.amazon.' + country + '/-/dp/' + fbt[0] + '/';
    $.get(newpage, function (data) {
        data = $(cleanHTML(data));

        data.find('#sims-fbt-content a').each(function () {
            var temp = $(this).attr('href');

            if (isset(temp)) {
                if (temp.indexOf('/e/') == -1) {

                    if (isset(temp))
                        temp = temp.match("/([a-zA-Z0-9]{10})(?:[/?]|$)");
                    if (temp && temp[1] && temp[1].substr(0, 1) == 'B')
                        fbt[fbt.length] = temp[1];
                }
            }
        });

        fbt = arrayUnique(fbt);

        if (fbt.length <= 1) {
            alert('Nothing found on the "Frequently Bought Together" of this product.');
            $.colorbox.close();
            return;
        }

        var searchasins = fbt.join(' | ');

        var tempUrl = 'http://www.amazon.' + country + '/s/field-keywords=' + encodeURIComponent(searchasins);
        var tempstorage = 'st' + fbt[0] + 'fbt';

        localStorage['source' + tempstorage] = '';
        localStorage['tab' + tempstorage] = tempUrl;

        window.open('popup.html?' + tempstorage);
        $.colorbox.close();

    }).fail(function () {
        alert('Please try again later - Connection rest');
        $.colorbox.close();
    });

    return;
}

var getVariationsFromAsin = function (asin, country) {
    var urlVariations = invokeRequest('ItemLookup', asin, 'VariationMatrix', country);
    $.get(urlVariations, function (data) {

        var data = $(data);
        var fbt = [];
        fbt[fbt.length] = asin;
        data.find('Variations>Item>ASIN').each(function () {
            //console.log($(this).text());
            fbt[fbt.length] = $(this).text();
        });

        if (fbt.length <= 1) {
            alert('No Child/Variations products found for this product.');
            $.colorbox.close();
            return;
        }

        localStorage[fbt[0]] = 'http://amazon.' + country + '/';
        var myJsonString = JSON.stringify(fbt);
        window.open(chrome.extension.getURL("html/popup.html") + '?STORE' + myJsonString);

        $.colorbox.close();
    }).fail(function () {
        alert('Please try again later - Not possible to connect to Amazon');
        $.colorbox.close();
    });
};

var openColorbox = function (el) {
    var eltitle = el.attr('title');
    var elhref = el.attr('href');

    if (elhref == '#')
        elhref = '';

    var content = "";

    if (!elhref) {
        content = el.attr('rel');

        var td = el;
        if (!el.is('td'))
            el.closest('td');

        var css = el.attr('class').split(' ');
        css = css[0];

        if (css == 'colorbox-rel') {
            try {
                css = el.closest('td').attr('class');
                css = css.split(' ');
                css = css[0];
            } catch (err) {}
        }

        eltitle = $('th.' + css).text();
    }

    var insideTitle = el.closest('tr').find('.tbl-Title .fullText').text();
    if (!insideTitle)
        insideTitle = el.closest('tr').find('.tbl-Title').text();

    if (insideTitle.length > 100)
        insideTitle = '<img src="../images/logo-new.png" class="compare-logo">'+
        '<h3 title="' + insideTitle + '">' + insideTitle.substr(0, 100) + '...</h3>';
    else if (insideTitle.length > 0)
        insideTitle = '<img src="../images/logo-new.png" class="compare-logo"><h3>' + insideTitle + '</h3>';
    else
        insideTitle = '<img src="../images/logo-new.png" class="compare-logo">';

    if (insideTitle && content)
        content = insideTitle + content;

    if (elhref) {

        if ($(elhref + '>div h3').length > 0) {
            $(elhref + '>div h3').remove();
        }

        if ($(elhref + '>div img').length > 0) {
            $(elhref + '>div img').remove();
        }

        $(elhref + '>div').prepend(insideTitle);
    }

    if ($(content).find('.graph').length > 0)
        content = '<div class="w900px">' + content + '</div><br /><br />';
    else if (content)
        content = '<div class="w500px">' + content + '</div><br /><br />';

    if (eltitle == '' || eltitle === undefined)
        eltitle = el.attr('oldtitle');

    if (elhref)
        $.colorbox({
            title: eltitle,
            inline: true,
            href: elhref + '>div'
        });
    else if (content)
        $.colorbox({
            title: eltitle,
            html: content
        });

    resizeColorbox();
    var keyword = localStorage['keyword'] ? localStorage['keyword'] : '';
    $('.favorite-url-add-text').val(keyword);
};
var resizeColorbox = function () {
    $.colorbox.resize({
        height: '90%'
    });
}
var arrayUnique = function (arr) {
    return arr.filter(function () {
        var seen = {};
        return function (element, index, array) {
            return !(element in seen) && (seen[element] = 1);
        };
    }
        ());
};

$(window).bind('beforeunload', function() {
  console.log("::");

});
