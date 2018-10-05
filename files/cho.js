"use strict";
function getRank(t) {
    var e = $(t, "body").find("#SalesRank").clone().find("ul,style,li").remove().end().text() || $(t, "body").find("#prodDetails th:contains('" + bestSellerRankText + "')").next().text();
    if (e = e ? e.match(/((\#)|(Nr.\s))?[0-9,.]+|(\>)/gi) : null,
    e = e && ($.inArray(">", e) == -1 || $.inArray(">", e) > 1) ? e[0].replace(/(\#)|(Nr.)|(\,)|(\.)/gi, "").trim() : null,
    !e)
        try {
            var a = $(t).text();
            a = a.split("Amazon Best Sellers Rank:"),
            a = a[1].split("#");
            var i = a[1].split(" ");
            if (i[0] && (e = i[0],
            a[1])) {
                var n = a[1].replace(e, "").replace("in", "");
                n = n.split(">"),
                n = n[0],
                n = $.trim(n),
                "N.A." == $(".category").text() && n && $(".category").text(n)
            }
        } catch (r) {}
    return e
}
function getCategory(t) {
    var e = $(t, "body").find("#SalesRank").clone().find("ul,style,li").remove().end().text() || $(t, "body").find("#prodDetails th:contains('" + bestSellerRankText + "')").next().text()
      , a = e ? e.match(/(in|en)[\s\u00BF-\u1FFF\u2C00-\uD7FF\w\&\,\-]+[\(\>]?/g) : null;
    return a = a ? a[0] : null,
    a = a && a.indexOf(">") == -1 ? a.replace(/^(in|en)|(\()/g, "").trim() : "N.A."
}
function getReviewCount(t, e) {
    var a = "https://www.amazon." + t + "/product-reviews/" + e + "?formatType=current_format";
    $.ajax({
        url: a,
        type: "GET",
        contentType: "application/x-www-form-urlencoded;charset=UTF-8"
    }).always(function(t) {
        try {
            var a = /Showing \d+-\d+ of (\d+) reviews/i
              , i = t.match(a)[1];
            $("tr." + e + " td.reviews").html(i)
        } catch (n) {
            $("tr." + e + " td.reviews").html('0<span class="empty">' + Math.random() + "</span>")
        }
        startTable()
    })
}
function getStock(t, e, a, i) {
    a && (stockCheckQueue[i].push({
        country: t,
        asin: e,
        offerId: a
    }),
    null !== stockTimeout[i] && "undefined" != typeof stockTimeout[i] && clearTimeout(stockTimeout[i]),
    stockCheckQueue[i].length >= 10 ? (getMultiStock(i),
    stockCheckQueue[i] = []) : stockTimeout[i] = setTimeout(function() {
        getLastMultistock(i)
    }, 2e3))
}
function getLastMultistock(t) {
    stockCheckQueue[t].length > 0 && (getMultiStock(t),
    stockCheckQueue[t] = [])
}
function getMultiStock(t) {
    for (var e = guid(), a = "", i = 0; i < stockCheckQueue[t].length; i++) {
        var n = i + 1;
        a += "&OfferListingId." + n + "=" + stockCheckQueue[t][i].offerId + "&Quantity." + n + "=995"
    }
    invokeLocalRequest("CartCreate", a, "Cart", country, function(i) {
        chrome.runtime.sendMessage({
            messageID: e,
            command: "start_quantity_request",
            country: country,
            payload: a,
            ignoreTimeout: !0
        }),
        chrome.runtime.onMessage.addListener(retrieveDataContainer[e] = function(a, i, n) {
            if ("return_data" == a.command && a.messageID == e) {
                for (var r = 0; r < a.data.length; r++) {
                    var s = a.data[r]
                      , o = s.asin
                      , c = s.stock
                      , l = s.price;
                    $("tr." + o + " td.price").html();
                    console.log(o + " " + l + " " + t),
                    999 == c && (c = "999+"),
                    c ? $("tr." + o + " td.outofstock").text("No") : (c = "Stock not found",
                    "stock" == t && $("tr." + o + " td.outofstock").text("Yes")),
                    $("tr." + o + " td." + t).html(c)
                }
                chrome.runtime.onMessage.removeListener(retrieveDataContainer[e])
            }
        }
        )
    })
}
function getSellers(t, e) {
    setTimeout(function(t) {
        $.get("http://www.amazon." + country + "/gp/offer-listing/" + t + "/ref=olp_tab_new?ie=UTF8&f_new=true&condition=new", function(e) {
            e = $(e);
            var a = e.find(".olpOfferPrice")
              , i = e.find("#olpProductImage").find("img").attr("src")
              , n = $.trim(a.first().text()).replace(/[^0-9.]/g, "")
              , r = 0
              , s = 0;
            a.each(function() {
                1 == s && (r = $.trim($(this).text()).replace(/[^0-9.]/g, "")),
                s++
            });
            var o = '<div class="addform" style="display:none;">' + e.find(".olpBuyColumn").first().html() + "</div>";
            $("tr." + t + " td.actions").append(o),
            $("tr." + t + " td.img").html('<img id="' + t + 'img" class="productImage" style="cursor:pointer;" src="' + i + '"/>'),
            $("#" + t + "img").click(function() {
                toggleImageSize(t + "img")
            }),
            $("tr." + t + " td.price").html(n);
            var c = e.find(".olpOffer").length;
            e.find(".a-pagination").length > 0 && (c = $.trim(e.find(".a-pagination .a-last").prev().text()).replace("Page", ""),
            c = 10 * parseInt(c)),
            $("tr." + t + " td.offers").html(c);
            var l = e.find('input[name="offeringID.1"]').first().val();
            if ($("tr." + t + " td.actions").append('<input type="button" value="Add to cart" class="btn-xs btn addcart btn-primary" rel="' + l + '"  data-toggle="modal" data-target="#myModal2" />'),
            $("tr." + t + " .checkboxloader").hide(),
            $("tr." + t + " .checkbox").show(),
            hideVariations.stock || getStock(country, t, l, "stock"),
            c > 1) {
                var d = 0;
                e.find('input[name="offeringID.1"]').each(function() {
                    if (1 == d) {
                        var e = $(this).val();
                        hideVariations["next-stock"] || getStock(country, t, e, "nextstock")
                    }
                    d++
                }),
                $("tr." + t + " td.nextprice").html(r),
                $("tr." + t + " td.pricediff").html((r - n).format(2)),
                1 == d && $("tr." + t + " td.nextstock").html('<span class="empty">0</span>')
            } else
                $("tr." + t + " td.nextprice").html('<span class="empty">0</span>'),
                $("tr." + t + " td.nextstock").html('<span class="empty">0</span>'),
                $("tr." + t + " td.pricediff").html('<span class="empty">0</span>');
            hideVariations["number-reviews"] || getReviewCount(country, t);
            var h = "Amazon";
            e.find(".olpSellerName").first().find("span>a").length > 0 && (h = e.find(".olpSellerName").first().find("span>a").text()),
            $("tr." + t + " td.merchantname").text(h),
            0 == c ? ($("tr." + t + " td.instock").html("No"),
            $("tr." + t + " td.price").html('<span class="empty">0</span>'),
            $("tr." + t + " td.stock").html('<span class="empty">0</span>'),
            $("tr." + t + " td.merchantname").html('<span class="empty">0</span>'),
            $("tr." + t + " td.actions  input.addcart").remove()) : $("tr." + t + " td.instock").html("Yes"),
            startTable()
        }).fail(function() {
            setTimeout(function() {
                getSellers(t, e)
            }, 1e3)
        })
    }, 800 * e, t)
}
function getProductPageData(t, e) {
    $.get("https://www.amazon." + t + "/gp/product/" + e + "/", function(a) {
        productPage = $(a),
        $(".category").text(getCategory(a)),
        $(".salesRank").text(getRank(a)),
        chrome.runtime.sendMessage({
            action: "getEstimatedSales",
            data: $(".salesRank").text() + "||" + $(".category").text() + "||" + t
        }, function(t) {
            var e = t.sales;
            e || (e = "Not found."),
            $(".estimatedSales").text(e)
        });
        var i = productPage.find("#productTitle").text();
        "" != i ? $(".parentTitle").text(i) : $(".parentTitle").text(productPage.find("h1").text()),
        getVariationMatrix(t, e)
    }).fail(function() {
        setTimeout(function() {
            getProductPageData(t, e)
        }, 1e3)
    })
}
function getVariationMatrix(t, e) {
    chrome.runtime.sendMessage({
        action: "getPaidSecret"
    }, function(a) {
        var i = a.secret
          , n = "https://howmanyextension.com/api/variations";
        $.ajax({
            url: n,
            data: {
                secret: i,
                asin: e,
                marketplace: t
            },
            type: "POST",
            crossDomain: !0,
            dataType: "json",
            success: function(a) {
                a = $(a.data);
                var i = a.find("Relationships").children();
                if (0 == i.length)
                    return void alert("No variations found for given product.");
                if ("variationparent" == i.first().prop("tagName").toLowerCase())
                    return e = i.first().find("ASIN").text(),
                    void getVariationMatrix(t, e);
                $(".totalVariations").text(i.length);
                var n = "<tr>";
                n += "<th></th><th></th><th>ASIN</th>";
                var r = "";
                variationscnt = 0;
                var s = [];
                i.first().children().each(function() {
                    if ($(this).prop("tagName").toLowerCase().indexOf("ns2") > -1) {
                        var t = $(this).prop("tagName").toLowerCase().replace("ns2:", "");
                        s.unshift(t),
                        r = "<th>" + t + "</th>" + r,
                        variationscnt++
                    }
                }),
                n += r + '<th title="Instock">In Stock</th><th title="Price">Price</th><th>Next Price</th><th># offers</th><th># reviews</th><th title="How many in stock">Stock</th><th title="Next lowest offer (How many are in stock)">Next Stock</th><th title="Difference in price between current price and next lowest offer">Price diff.</th><th>Merchant Name</th><th class="actions">Actions</th></tr>',
                $("#result thead").prepend(n);
                var o = 0;
                i.each(function() {
                    var e = this
                      , a = $(this).find("ASIN").text()
                      , i = '<tr class="' + a + '">';
                    i += '<td><img style="position:absolute;" src="../images/loader_small.svg" class="checkboxloader"/><input type="checkbox" class="checkbox" style="display:none; margin-left: 7px !important; margin-right: -10px !important;" /></td>',
                    i += '<td class="img"><img src="../images/loader_small.svg"/></td>',
                    i += '<td><a target="_blank" href="http://www.amazon.' + t + "/gp/offer-listing/" + a + '/ref=olp_tab_new?ie=UTF8&f_new=true&condition=new">' + a + "</a></td>",
                    s.forEach(function(t) {
                        var a = "";
                        $(e).children().each(function() {
                            $(this).prop("tagName").toLowerCase() == "ns2:" + t && (a = $(this).text())
                        }),
                        i += "<td>" + a + "</td>"
                    }),
                    i += '<td class="instock"><span class="empty">-1</span><img src="../images/loader_small.svg"/></td>',
                    i += '<td class="price"><span class="empty">-1</span><img src="../images/loader_small.svg"/></td>',
                    i += '<td class="nextprice"><span class="empty">-1</span><img src="../images/loader_small.svg"/></td>',
                    i += '<td class="offers"><span class="empty">-1</span><img src="../images/loader_small.svg"/></td>',
                    i += '<td class="reviews"><span class="empty">-1</span><img src="../images/loader_small.svg"/></td>',
                    i += '<td class="stock"><span class="empty">-1</span><img src="../images/loader_small.svg"/></td>',
                    i += '<td class="nextstock"><span class="empty">-1</span><img src="../images/loader_small.svg"/></td>',
                    i += '<td class="pricediff"><span class="empty">-1</span><img src="../images/loader_small.svg"/></td>',
                    i += '<td class="merchantname"><span class="empty">-1</span><img src="../images/loader_small.svg"/></td>',
                    i += '<td class="actions"><input type="button" value="Keepa" class="btn-xs btn keepa btn-primary" rel="' + a + '" /><input type="button" value="camelcamelcamel" class="btn-xs btn camelcamelcamel btn-primary" rel="' + a + '"  data-toggle="modal" data-target="#myModal" /></td>',
                    i += "</tr>",
                    $("#result tbody").append(i),
                    getSellers(a, ++o)
                }),
                startTable(),
                $(".wait").hide()
            },
            error: function(t, e) {
                alert("error")
            }
        })
    })
}
function startTable() {
    if (null == TF) {
        var t = {
            base_path: "../libs/TableFilter-master/dist/tablefilter/",
            alternate_rows: !0,
            rows_counter: !0,
            btn_reset: !0,
            loader: !1,
            status_bar: !0,
            mark_active_columns: !1,
            highlight_keywords: !1,
            filters_row_index: 1,
            sort: !0,
            extensions: [{
                name: "sort"
            }],
            refresh_filters: !0
        };
        t.col_0 = "none",
        t.col_1 = "none",
        t.col_2 = "select";
        var e = variationscnt + 12;
        t["col_" + e] = "none",
        t.col_number_format = [null, null, null, null, "US", "US", "US", "US", "US", "US", "US", null, null, null],
        t.sort_config = {
            sort_types: ["None", "None", "String", "String", "US", "US", "US", "US", "US", "US", "US", "String", "String", "String"]
        };
        for (var a = 2; a <= variationscnt; a++) {
            var e = a + 1;
            t["col_" + e] = "select",
            t.col_number_format.splice(2, 0, null),
            t.sort_config.sort_types.splice(2, 0, "String")
        }
        TF = new TableFilter("result",t),
        TF.init(),
        $(".fltrow td select, .fltrow td input").addClass("form-control").addClass("input-sm"),
        $(".fltrow>td").first().html('<center><input type="checkbox" class="selecctall" /></center>'),
        $(".fltrow>td").eq(1).html('<center><button id="productImageToggleAll"><i class="fas fa-expand-arrows-alt"></i></button></center>'),
        $("#productImageToggleAll").click(function() {
            toggleImageSize("all")
        })
    } else
        TF.filter();
    hideVariations.price && ($('th[title="Price"]').hide(),
    $($("tr.fltrow td").get($('th[title="Price"]').index())).hide(),
    $(".price").hide()),
    hideVariations["next-price"] && ($('th:contains("Next Price")').hide(),
    $($("tr.fltrow td").get($('th:contains("Next Price")').index())).hide(),
    $(".nextprice").hide()),
    hideVariations["number-offers"] && ($('th:contains("# offers")').hide(),
    $($("tr.fltrow td").get($('th:contains("# offers")').index())).hide(),
    $(".offers").hide()),
    hideVariations["number-reviews"] && ($('th:contains("# reviews")').hide(),
    $($("tr.fltrow td").get($('th:contains("# reviews")').index())).hide(),
    $(".reviews").hide()),
    hideVariations.stock && ($('th[title="How many in stock"]').hide(),
    $($("tr.fltrow td").get($('th[title="How many in stock"]').index())).hide(),
    $(".stock").hide()),
    hideVariations["next-stock"] && ($('th:contains("Next Stock")').hide(),
    $($("tr.fltrow td").get($('th:contains("Next Stock")').index())).hide(),
    $(".nextstock").hide()),
    hideVariations["price-diff"] && ($('th:contains("Price diff.")').hide(),
    $($("tr.fltrow td").get($('th:contains("Price diff.")').index())).hide(),
    $(".pricediff").hide()),
    hideVariations["merchant-name"] && ($('th:contains("Merchant Name")').hide(),
    $($("tr.fltrow td").get($('th:contains("Merchant Name")').index())).hide(),
    $(".merchantname").hide())
}
function addLotToCart() {
    var t = $(".checkbox:checked:visible").length;
    $(".add-processing").show(),
    $(".add-requested").html(t),
    $(".add-done").html("0"),
    $(".checkbox:checked:visible").each(function() {
        var t = $(this).closest("tr").find(".addform form");
        t.append('<input name="submit.addToCart" value="Add to cart" />'),
        $.post("https://www.amazon." + country + t.attr("action"), t.serialize(), function(t) {}).always(function() {
            var t = parseInt($(".add-done").html());
            t++,
            $(".add-done").html(t),
            $(".add-done").html() == $(".add-requested").html() && $(".add-processing").hide()
        })
    })
}
function unselectAll() {
    $(".checkbox").each(function() {
        this.checked = !1
    })
}
function selectAll() {
    $(".checkbox").each(function() {
        this.checked = !0
    })
}
function guid() {
    return Math.floor(2e4 * Math.random()) + 1e3
}
function toggleImageSize(t) {
    "all" == t ? 160 != $(".productImage").first().height() ? $(".productImage").height(160).width(160) : $(".productImage").height(20).width(20) : 160 != $("#" + t).height() ? $("#" + t).height(160).width(160) : $("#" + t).height(20).width(20)
}
var asin = "", country = "", productPage = "", listPage = "", bestSellerRankText = "Best Sellers Rank", TF, variationscnt = 0, hideVariations = localStorage.hideVariations ? JSON.parse(localStorage.hideVariations) : {}, retrieveDataContainer = {}, stockCheckQueue = {
    stock: [],
    nextstock: []
}, stockTimeout = {
    stock: null,
    nextstock: null
};
Number.prototype.format = function(t, e) {
    var a = "\\d(?=(\\d{" + (e || 3) + "})+" + (t > 0 ? "\\." : "$") + ")";
    return this.toFixed(Math.max(0, ~~t)).replace(new RegExp(a,"g"), "$&,")
}
,
jQuery(document).ready(function() {
    $(".export").click(function() {
        var t = $($("#result")[0].outerHTML);
        t.find(".fltrow").remove(),
        t.find("tr td:first-child,tr th:first-child").remove(),
        t.find(".actions").remove(),
        t.find("caption").remove(),
        t.find(".empty").remove(),
        t.find("*").removeProp("class").removeProp("id").removeAttr("class").removeAttr("id"),
        $("#temp-container").html('<table id="export-table">' + t.html() + "</table>"),
        $("#temp-container").show();
        var e = $("#export-table").table2CSV({
            delivery: "value"
        });
        window.location.href = "data:text/csv;charset=UTF-8," + encodeURIComponent(e),
        $("#temp-container").hide()
    });
    var t = window.location.href.split("?")
      , t = t[1].split("||");
    asin = t[0],
    country = t[1].replace("#", ""),
    getProductPageData(country, asin),
    $("body").delegate(".keepa, .camelcamelcamel, .addcart", "click", function(t) {
        return $(this).hasClass("addcart") ? (unselectAll(),
        $(this).closest("tr").find(".checkbox")[0].checked = !0,
        void addLotToCart()) : ($(".modal-body iframe").attr("src", ""),
        $(".modal-title").text($(this).val() + ": " + $(this).attr("rel")),
        $(this).hasClass("keepa") && chrome.tabs.create({
            url: "http://keepa.com/#!product/1-" + $(this).attr("rel")
        }),
        void ($(this).hasClass("camelcamelcamel") && $(".modal-body iframe").attr("src", "http://camelcamelcamel.com/product/" + $(this).attr("rel"))))
    }),
    $("#addall").click(function() {
        addLotToCart()
    })
});
