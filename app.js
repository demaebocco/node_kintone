var kintone = require('./kintone.js');
//console.log( kintone );

var subdomain = "tf-web";
var loginName = "t_furu@tf-web.jp";
var passwd 　　= "y8sgFJir";
var api_token = "koGrXyWGLS9PMKT65sg3eScSfDHGYxYt3TPP5UAd";
kintone.setAccount(subdomain,loginName,passwd,api_token);

//レコードの取得
var app = 14;
var id = 1;
var callbackGetRecord = function(json){
	var record = json.record;
	console.log( record );
};
kintone.getRecord(app,id,callbackGetRecord);

//複数レコードの取得
var app = 14;
var fields = null;
var query = null;
var totalCount = null;

var callbackGetRecords = function(json){
	var records = json.records;
	console.log( records );
};
//kintone.getRecords(app,fields,query,totalCount,callbackGetRecords);