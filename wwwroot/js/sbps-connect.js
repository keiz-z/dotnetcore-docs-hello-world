console.log("JavaScriptファイルが正しく読み込まれました。");

function processPayment() {
    // SBPSへの接続や支払い処理に必要なコード
    // 例: f_submit() 関数の呼び出し（あなたのSBPS接続用コードに基づく）
    f_submit();
}



function f_submit() {

    var order = new Order();
    order.pay_method            = "";
    order.merchant_id           = "30132";
    order.service_id            = "001";
    order.cust_code             = "Merchant_TestUser_999999";
    order.sps_cust_no           = "";
    order.sps_payment_no        = "";
    order.order_id              = "45ee8440ce0104d3970089feeaf041be";
    order.item_id               = "T_0003";
    order.pay_item_id           = "";
    order.item_name             = "testproduct";
    order.tax                   = "";
    order.amount                = "1";
    order.pay_type              = "0";
    order.auto_charge_type      = "";
    order.service_type          = "0";
    order.div_settele           = "";
    order.last_charge_month     = "";
    order.camp_type             = "";
    order.tracking_id           = "";
    order.terminal_type         = "0";
    order.success_url           = "http://stbfep.sps-system.com/MerchantPaySuccess.jsp";
    order.cancel_url            = "http://stbfep.sps-system.com/MerchantPayCancel.jsp";
    order.error_url             = "http://stbfep.sps-system.com/MerchantPayError.jsp";
    order.pagecon_url           = "http://stbfep.sps-system.com/MerchantPayResultRecieveSuccess.jsp";
    order.free1                 = "";
    order.free2                 = "";
    order.free3                 = "";
    order.free_csv_input        =
        "LAST_NAME=Suzuki,FIRST_NAME=太郎,LAST_NAME_KANA=スズキ,FIRST_NAME_KANA=タロウ,FIRST_ZIP=210,SECOND_ZIP=0001,ADD1=岐阜県,ADD2=あああ市あああ町,ADD3=,TEL=12345679801,MAIL=aaaa@bb.jp,ITEM_NAME=TEST ITEM";
    order.request_date          = "20231125111718";
    order.limit_second          = "";
    order.hashkey               = "c48e0e2c7d04f0954594f14c7801bd430ca6263e";

    var orderDetail = new OrderDetail();
    orderDetail.dtl_rowno       = "1";
    orderDetail.dtl_item_id     = "dtlItem_1";
    orderDetail.dtl_item_name   = "明細商品名1";
    orderDetail.dtl_item_count  = "1";
    orderDetail.dtl_tax         = "1";
    orderDetail.dtl_amount      = "1";
    orderDetail.dtl_free1       = "";
    orderDetail.dtl_free2       = "";
    orderDetail.dtl_free3       = "";
    order.orderDetail.push(orderDetail);

    // フリーCSV
    //function encodeBase64(str) {
        // 文字列をUTF-8のバイト配列に変換し、その後Base64にエンコード
       // return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
         //   function toSolidBytes(match, p1) {
           //     return String.fromCharCode('0x' + p1);
       // }));
    //}
    
    //order.free_csv = encodeBase64(order.free_csv_input);
    order.free_csv = btoa(encodeURIComponent(order.free_csv_input));

    //チェックサム
    // orderオブジェクトを文字列に変換
     var orderString = JSON.stringify(order);

// CryptoJSを使用してSHA1ハッシュを生成
    order.sps_hashcode = CryptoJS.SHA1(orderString).toString();
    //order.sps_hashcode          =  CryptoJS.Sha1.hash( order.toString() );

    console.log("oderデータ: ", order);
    feppost(order);
}

// オブジェクト定義[OrderDetail]
function OrderDetail()
{
    this.toString = function() {
        var result =
            this.dtl_rowno +
            this.dtl_item_id +
            this.dtl_item_name +
            this.dtl_item_count +
            this.dtl_tax +
            this.dtl_amount +
            this.dtl_free1 +
            this.dtl_free2 +
            this.dtl_free3;
        return result;
    }
}

// オブジェクト定義[Order]
function Order()
{
    this.orderDetail = new Array();
    this.toString = function() {

        var resultOrderDetail = "";
        for (i = 0; i < this.orderDetail.length; i++) {
            resultOrderDetail = resultOrderDetail + this.orderDetail[i].toString();
        }

        var result =
            this.pay_method +
            this.merchant_id +
            this.service_id +
            this.cust_code +
            this.sps_cust_no +
            this.sps_payment_no +
            this.order_id +
            this.item_id +
            this.pay_item_id +
            this.item_name +
            this.tax +
            this.amount +
            this.pay_type +
            this.auto_charge_type +
            this.service_type +
            this.div_settele +
            this.last_charge_month +
            this.camp_type +
            this.tracking_id +
            this.terminal_type +
            this.success_url +
            this.cancel_url +
            this.error_url +
            this.pagecon_url +
            this.free1 +
            this.free2 +
            this.free3 +
            this.free_csv +
            resultOrderDetail +
            this.request_date +
            this.limit_second +
            this.hashkey;
        return result;
    };
}

// 日時の取得
function getYYYYMMDDHHMMSS(){
    var now = new Date();
    return now.getFullYear() + zeroPadding(now.getMonth() + 1) + zeroPadding(now.getDate()) +
           zeroPadding(now.getHours()) + zeroPadding(now.getMinutes()) + zeroPadding(now.getSeconds());
}

function zeroPadding(num) {
    if (num < 10) { num = "0" + num; }
	return num + "";
}

function feppost(order) {

    //var connectUrl = "https://stbfep.sps-system.com/f01/FepBuyInfoReceive.do";
    var connectUrl = "https://stbfep.sps-system.com/Extra/BuyRequestAction.do";
    var form =
        $('<form></form>',{action:connectUrl,target:'receiver',method:'POST'}).hide();

    var body = $('body');
    body.append(form);
    form.append($('<input>',{type:'hidden',name:'pay_method'        ,value:order.pay_method                  }));
    form.append($('<input>',{type:'hidden',name:'merchant_id'       ,value:order.merchant_id                 }));
    form.append($('<input>',{type:'hidden',name:'service_id'        ,value:order.service_id                  }));
    form.append($('<input>',{type:'hidden',name:'cust_code'         ,value:order.cust_code                   }));
    form.append($('<input>',{type:'hidden',name:'sps_cust_no'       ,value:order.sps_cust_no                 }));
    form.append($('<input>',{type:'hidden',name:'sps_payment_no'    ,value:order.sps_payment_no              }));
    form.append($('<input>',{type:'hidden',name:'order_id'          ,value:order.order_id                    }));
    form.append($('<input>',{type:'hidden',name:'item_id'           ,value:order.item_id                     }));
    form.append($('<input>',{type:'hidden',name:'pay_item_id'       ,value:order.pay_item_id                 }));
    form.append($('<input>',{type:'hidden',name:'item_name'         ,value:order.item_name                   }));
    form.append($('<input>',{type:'hidden',name:'tax'               ,value:order.tax                         }));
    form.append($('<input>',{type:'hidden',name:'amount'            ,value:order.amount                      }));
    form.append($('<input>',{type:'hidden',name:'pay_type'          ,value:order.pay_type                    }));
    form.append($('<input>',{type:'hidden',name:'auto_charge_type'  ,value:order.auto_charge_type            }));
    form.append($('<input>',{type:'hidden',name:'service_type'      ,value:order.service_type                }));
    form.append($('<input>',{type:'hidden',name:'div_settele'       ,value:order.div_settele                 }));
    form.append($('<input>',{type:'hidden',name:'last_charge_month' ,value:order.last_charge_month           }));
    form.append($('<input>',{type:'hidden',name:'camp_type'         ,value:order.camp_type                   }));
    form.append($('<input>',{type:'hidden',name:'tracking_id'       ,value:order.tracking_id                 }));
    form.append($('<input>',{type:'hidden',name:'terminal_type'     ,value:order.terminal_type               }));
    form.append($('<input>',{type:'hidden',name:'success_url'       ,value:order.success_url                 }));
    form.append($('<input>',{type:'hidden',name:'cancel_url'        ,value:order.cancel_url                  }));
    form.append($('<input>',{type:'hidden',name:'error_url'         ,value:order.error_url                   }));
    form.append($('<input>',{type:'hidden',name:'pagecon_url'       ,value:order.pagecon_url                 }));
    form.append($('<input>',{type:'hidden',name:'free1'             ,value:order.free1                       }));
    form.append($('<input>',{type:'hidden',name:'free2'             ,value:order.free2                       }));
    form.append($('<input>',{type:'hidden',name:'free3'             ,value:order.free3                       }));
    form.append($('<input>',{type:'hidden',name:'free_csv'          ,value:order.free_csv                    }));
    form.append($('<input>',{type:'hidden',name:'request_date'      ,value:order.request_date                }));
    form.append($('<input>',{type:'hidden',name:'limit_second'      ,value:order.limit_second                }));
    form.append($('<input>',{type:'hidden',name:'hashkey'           ,value:order.hashkey                     }));
    form.append($('<input>',{type:'hidden',name:'sps_hashcode'      ,value:order.sps_hashcode                }));

    for (i = 0; i < order.orderDetail.length; i++) {
        form.append($('<input>',{type:'hidden',name:'dtl_rowno'         ,value:order.orderDetail[i].dtl_rowno             }));
        form.append($('<input>',{type:'hidden',name:'dtl_item_id'       ,value:order.orderDetail[i].dtl_item_id           }));
        form.append($('<input>',{type:'hidden',name:'dtl_item_name'     ,value:order.orderDetail[i].dtl_item_name         }));
        form.append($('<input>',{type:'hidden',name:'dtl_item_count'    ,value:order.orderDetail[i].dtl_item_count        }));
        form.append($('<input>',{type:'hidden',name:'dtl_tax'           ,value:order.orderDetail[i].dtl_tax               }));
        form.append($('<input>',{type:'hidden',name:'dtl_amount'        ,value:order.orderDetail[i].dtl_amount            }));
        form.append($('<input>',{type:'hidden',name:'dtl_free1'         ,value:order.orderDetail[i].dtl_free1             }));
        form.append($('<input>',{type:'hidden',name:'dtl_free2'         ,value:order.orderDetail[i].dtl_free2             }));
        form.append($('<input>',{type:'hidden',name:'dtl_free3'         ,value:order.orderDetail[i].dtl_free3             }));
    }

    form.submit();
}