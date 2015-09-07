/** Cybozu kintone に楽にアクセスするためのモジュール
*
*/

var Kintone = function(){
	//BASE64エンコード
	this.Base64 = require('js-base64').Base64;
	
	//HTTPリクエスト
	this.request = require('request');
	
	//サブドメイン
	this.subdomain = null;
	
	//ログインユーザー名
	this.loginName = null;
	//パスワード
	this.passwd = null;	
	//認証トークン
	this.cybozu_authtoken = null;
	//APIトークン
	this.cybozu_api_token = null;
	
	//サーバーURL
	this.API_SERVER_URL = 'https://{subdomain}.cybozu.com/k/v1';
	
	//レコード取得 1件
	this.API_RECORD = '/record.json';
	//レコード複数 取得
	this.API_RECORDS = '/records.json';
	
	//アカウントを設定する
	this.setAccount = function(subdomain,loginName,passwd,api_token){
		this.subdomain = subdomain;
		this.loginName = loginName;
		this.passwd = passwd;
		this.cybozu_api_token = api_token;
		
		//サブドメインを反映
		this.API_SERVER_URL = this.API_SERVER_URL.replace('{subdomain}',subdomain);
		
		if(loginName != null){
			//ログイン名:パスワード」をBASE64エンコード
			var buf = new Buffer( loginName+':'+passwd );
			this.cybozu_authtoken = this.Base64.encode(buf);
		}
		
		return this;
	};
	
	/** 1レコード取得
	*   app アプリID
	*   id  レコードID
	*/
	this.getRecord = function(app,id,callback){
		var url = this.API_SERVER_URL+this.API_RECORD;
		
		var headers = {'X-Cybozu-API-Token':this.cybozu_api_token,'Content-Type':'application/json'};
  		if(this.cybozu_authtoken != null) headers['X-Cybozu-Authorization'] = this.cybozu_authtoken;
  		if(this.cybozu_authtoken != null) headers['Authorization'] = 'Basic '+this.cybozu_authtoken;
		
		var options = {
  			url: url,
  			headers: headers,
 	 		json:{'app':app,'id':id}
		};
		
		this.request.get(options,function(err, resp, body){
			//ここでコールバックする
    		callback( body );
		});
	};
	
	/** 複数レコード取得
	*   app        アプリID
	*   fields     フィールドコード
	*   query      クエリ文字列
	*   totalCount true/false
	*/
	this.getRecords = function(app,fields,query,totalCount,callback){
		var url = this.API_SERVER_URL+this.API_RECORDS;
		var op = {app:app};
		if(fields != null) op['fields'] = fields;
		if(query != null) op['query'] = query;
		if(totalCount != null) op['totalCount'] = totalCount;
		
		var headers = {'X-Cybozu-API-Token':this.cybozu_api_token,'Content-Type':'application/json'};
  		if(this.cybozu_authtoken != null) headers['X-Cybozu-Authorization'] = this.cybozu_authtoken;
  		if(this.cybozu_authtoken != null) headers['Authorization'] = 'Basic '+this.cybozu_authtoken;
  		
		var options = {
  			url: url,
  			headers: headers,
  			json: op
  		};
		
		this.request.get(options,function(err, resp, body){
			console.log( body );
			//ここでコールバックする
    		callback( body );
		});
	};
};

module.exports = new Kintone();
