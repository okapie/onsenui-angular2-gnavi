/// <reference path="./typings/angular2/angular2.d.ts" />
declare var OnsTabElement: {prototype: {_createPageElement: Function}};
declare var ons: any;
var url = 'http://api.gnavi.co.jp/RestSearchAPI/20150630/';
var keyid = '878b251d597e2d443b1e960d54591f00';
var format = 'json';
var latitude;
var longitude;
var range;

import {
  Component,
  View,
  bootstrap,
  DynamicComponentLoader,
  ElementRef,
  ViewRef,
  NgFor,
  NgIf,
  Injector
} from 'angular2/angular2';
import {MockBackend, BaseRequestOptions, Http, HTTP_BINDINGS} from 'angular2/http'
import {Injector,bind} from 'angular2/di'

var injector = Injector.resolveAndCreate([
  BaseRequestOptions,
  MockBackend,
  bind(Http).toFactory(
    function(backend, defaultOptions) {
      return new Http(backend, defaultOptions);
    },
  [MockBackend, BaseRequestOptions])
]);

this.search = function() {
    navigator.geolocation.getCurrentPosition(
        function(position) {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            range = '1';
        }

    );
};

/*
var http = injector.get(Http);
*/
export const http = {
    get: function(url) {
    url = 'http://api.gnavi.co.jp/RestSearchAPI/20150630/', {params: {keyid: keyid, format: format, latitude:latitude, longitude:longitude, range:range}};
    return getUrl(url);
  }
}

class getHome {
  getRestoResult() {
  /*
    this.search = function() {
      navigator.geolocation.getCurrentPosition(
        function(position){
          var latitude = position.coords.latitude;
          var longitude = position.coords.longitude;
          var range = '1';
          http.get('http://api.gnavi.co.jp/RestSearchAPI/20150630/', {params: {keyid: keyid, format: format, latitude:latitude, longitude:longitude, range:range}})
            .success(function(data, status, headers, config) {
              this.searchShops = this.createShops(data);
              navi.pushPage('result.html');
            })
            .error(function(data, status, headers, config) {
              alert('error');
            });
        },
        function(error){
          alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
        }
      );
    };*/
    return JSON.parse(window.localStorage.getItem('gethome') || '[]');
  }
  _setItems(items) {
    window.localStorage.setItem('gethome', JSON.stringify(items));
  }
  add(item) {
    let items = this.getRestoResult();
    items.push(item);
    items.sort((a, b) => parseInt(a.time.replace(':', '')) - parseInt(b.time.replace(':', '')));
    this._setItems(items);
  }
  remove(idx) {
    let items = this.getRestoResult();
    items.splice(idx, 1);
    this._setItems(items);
  }
  get items() {
    return this.getRestoResult();
  }
}

@Component({
  selector: 'ons-page'
})
@View({
  template: `
    <div style="text-align:center; padding-top:50px;">
      <img src="images/title.png" width="320px" >
      <img src="images/top-yakitori.png" width="320px">
    </div>
  `,
  directives: [NgFor, NgIf]
})
class homePage {
  gethome: getHome;

  constructor(gethome: getHome) {
    this.gethome = gethome;
  }
}

@Component({
  selector: 'ons-page'
})
@View({
  template: `
  <ons-page>
    <ons-toolbar>
      <div class="center">探すよん</div>
    </ons-toolbar>
    <div style="padding: 10px 9px">
      <ons-button (click)="searchResto()" modifier="large" style="margin: 0 auto;">
        現在地から探す
      </ons-button>
    </div>
  </ons-page>
  `,
  directives: [NgFor]
})
class meshiLogPage {
  searchResto() {

      this.search = function() {
          navigator.geolocation.getCurrentPosition(
              function(position){
                  var latitude = position.coords.latitude;
                  var longitude = position.coords.longitude;
                  var range = '1';
                  http.get('http://api.gnavi.co.jp/RestSearchAPI/20150630/', {params: {keyid: keyid, format: format, latitude:latitude, longitude:longitude, range:range}})
                      .success(function(data, status, headers, config) {
                          this.searchShops = this.createShops(data);
                          navi.pushPage('result.html');
                      })
                      .error(function(data, status, headers, config) {
                          alert('error');
                      });
              },
              function(error){
                  alert('code: '    + error.code    + '\n' +
                  'message: ' + error.message + '\n');
              }
          );
      };


      /*
       var http = injector.get(Http);
       */
      export const http = {
          get: function(url) {
              url = 'http://api.gnavi.co.jp/RestSearchAPI/20150630/', {params: {keyid: keyid, format: format, latitude:latitude, longitude:longitude, range:range}};
              return getUrl(url);
          }
      }



      function getUrl(url) {
          return new Promise((resolve, reject) => {
              let xhr = new XMLHttpRequest();
              xhr.open("GET", url);
              xhr.onload = () => {
                  if (xhr.status === 200) {
                      resolve(xhr.statusText);
                  } else {
                      //(1)エラーの場合rejectを呼ぶ
                      reject(new Error(xhr.statusText));
                  }
              };
              xhr.onerror = () => {
                  //(2)エラーの場合rejectを呼ぶ
                  reject(new Error(xhr.statusText));
              };
              xhr.send();
          });
      }

//成功した場合の処理
      function someProcess(item_category) {
          var _item_category = item_category;
          alert("結果は、" + _item_category);

      }

//Promiseによる非同期処理
      function getFirstItem() {
          let items = ["camera", "pc", "ps4"];
          return getUrl(url).then(list => {
              // 並列でのリクエスト実行
              return Promise.all(items.map(item_category => {
                  return getUrl(url + item_category.id);
              }));
          });
      }



    console.log("searchRestoが呼ばれた");
      //本体側からの呼び出し
      getFirstItem().then(item_category => {

      alert(url);
        //本来やりたかった処理
        someProcess(item_category);
        alert("Success" + url);

/*
          this.searchShops = this.createShops(url);
          navi.pushPage('testresult.html');

          this.createShops =function(url){
              var shops = [];
              if(url.total_hit_count > 1){
                  for(var i=0; i<url.rest.length; i++){
                      shops[i] = url.rest[i];
                      shops[i].isLiked = this.isLiked(url.rest[i].id);
                      if(typeof shops[i].image_url.shop_image1 == 'string'){
                          shops[i].hasShopImage = true;
                      }else{
                          shops[i].hasShopImage = false;
                      }
                  }
              }else if(url.total_hit_count == 1){
                  shops[0] = url.rest;
                  shops[0].isLiked = $scope.isLiked(url.rest.id);
                  if(typeof shops[0].image_url.shop_image1 == 'string'){
                      shops[0].hasShopImage = true;
                  }else{
                      shops[0].hasShopImage = false;
                  }
              }
              return shops;
          };*/

      })
      .then(null, e => { //エラーハンドリング用のコールバックをthenの第二引数に登録
        //エラー処理
        console.error(e);
        alert("失敗");
    });
  }
}

@Component({
  selector: 'okp-app',
  appInjector: [getHome]
})
@View({
  template: `
    <ons-page>
      <ons-toolbar>
        <div class="center" style="font-size: 18px;font-weight:bold;background-color:#E65100;color:#fff">ヘッダー</div>
      </ons-toolbar>
      <ons-tabbar animation="slide">
        <ons-tab no-reload page="home.html" active="true">
          <ons-button modifier="large" style="margin: 0 2px;">
            ホームでやんす
          </ons-button>
        </ons-tab>
        <ons-tab no-reload page="meshilog.html">
          <ons-button modifier="large" style="margin: 0 2px 0 2px;">
            めしログ
          </ons-button>
        </ons-tab>
      </ons-tabbar>
    </ons-page>
  `
})
class meshiLogComponent {
}

bootstrap(meshiLogComponent).then(result => {
  var injector: Injector = result.injector;
  var loader: DynamicComponentLoader = injector.get(DynamicComponentLoader);
  var dict = {
    'home.html': homePage,
    'meshilog.html': meshiLogPage
  };
  OnsTabElement.prototype._createPageElement = function(page, callback) {
    if (dict[page]) {
      loader.loadIntoNewLocation(dict[page], new ElementRef(result._hostComponent.hostView, 0)).then(componentRef => {
      console.log(result._hostComponent.hostView);
        callback(componentRef.location.domElement);
      });
    }
    else {
      throw new Error('Page ' + page + ' does not exist.');
    }
  };
});