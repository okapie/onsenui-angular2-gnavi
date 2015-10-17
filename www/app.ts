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

@Component({
  selector: 'result',
  viewBindings: [HTTP_BINDINGS]
})

@View({
  templateUrl: './result.html',
  directives: [NgFor]
})

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

/*
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
*/

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

class OkpSchedule {
}

@Component({
    selector: 'okp-app-2',
    appInjector: [OkpSchedule]
})
@View({
    template: `
<ons-tabbar animation="slide">
<ons-tab
no-reload
page="_list.html"
active="true">

</ons-tab>
</ons-tabbar>
`
})

//成功した場合の処理
function someProcess(item_category) {
  var _item_category = item_category;
  alert("結果は、" + _item_category);


/*
    var shops = [];
    if(data.total_hit_count > 1){
        for(var i=0; i<data.rest.length; i++){
            shops[i] = data.rest[i];
            shops[i].isLiked = this.isLiked(data.rest[i].id);
            if(typeof shops[i].image_url.shop_image1 == 'string'){
                shops[i].hasShopImage = true;
            }else{
                shops[i].hasShopImage = false;
            }
        }
    }else if(data.total_hit_count == 1){
        shops[0] = data.rest;
        shops[0].isLiked = this.isLiked(data.rest.id);
        if(typeof shops[0].image_url.shop_image1 == 'string'){
            shops[0].hasShopImage = true;
        }else{
            shops[0].hasShopImage = false;
        }
    }
    return shops;
    */

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

class Schedule {
  _getItems() {
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
    return JSON.parse(window.localStorage.getItem('schedule') || '[]');
  }
  _setItems(items) {
    window.localStorage.setItem('schedule', JSON.stringify(items));
  }
  add(item) {
    let items = this._getItems();
    items.push(item);
    items.sort((a, b) => parseInt(a.time.replace(':', '')) - parseInt(b.time.replace(':', '')));
    this._setItems(items);
  }
  remove(idx) {
    let items = this._getItems();
    items.splice(idx, 1);
    this._setItems(items);
  }
  get items() {
    return this._getItems();
  }
}

@Component({
  selector: 'ons-page'
})
@View({
  template: `
  <ons-page>
    <ons-toolbar>
      <div class="center" style="font-size: 18px;font-weight:bold;background-color:#E65100;color:#fff">おかぴの飯ログ</div>
    </ons-toolbar>
    <!--
    <ons-list class="plan-list">
      <div style="text-align:center;">ホームでやんす</div>
      <ons-list-item (press)="schedule.remove(i)" *ng-for="#item of schedule.items; #i = index;" class="plan">
        <ons-row>
          <ons-col width="80px" class="plan-left">
            <div class="plan-date">{{ item.time }}</div>
            <div class="plan-duration">{{ item.duration }}</div>
          </ons-col>

          <ons-col width="6px" class="plan-center">
          </ons-col>

          <ons-col class="plan-right">
            <div class="plan-name">{{ item.title }}</div>

            <div *ng-if="item.location" class="plan-info">
              <div>
                <ons-icon icon="fa-map-marker">現在地</ons-icon>&nbsp;{{ item.location }}
              </div>
            </div>
          </ons-col>
        </ons-row>
      </ons-list-item>
    </ons-list>
    -->
  </ons-page>
  `,
  directives: [NgFor, NgIf]
})
class SchedulePage {
  schedule: Schedule;

  constructor(schedule: Schedule) {
    this.schedule = schedule;
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
    <!--
    <ons-list modifier="inset" style="margin-top: 10px">
      <ons-list-item  >
        <input #title (keyup) type="text" class="text-input text-input--transparent" placeholder="Activity" style="width: 100%">
      </ons-list-item>
      <ons-list-item>
        <input #location (keyup) type="text" class="text-input text-input--transparent" placeholder="Location" style="width: 100%">
      </ons-list-item>
      <ons-list-item>
        <select #time class="text-input text-input--transparent" placeholder="Location" style="width: 100%">
          <option *ng-for="#t of times" [value]="t">{{ t }}</option>
        <select>
      </ons-list-item>
    </ons-list>
    -->

    <div style="padding: 10px 9px">
      <ons-button (click)="addActivity()" modifier="large" style="margin: 0 auto;">
        現在地から探す
      </ons-button>
    </div>
  </ons-page>
  `,
  directives: [NgFor]
})
class AddItemPage {
  times: Array<string>;
  element: ElementRef;
  schedule: Schedule;

  constructor(self: ElementRef, schedule: Schedule) {
    this.element = self;
    this.schedule = schedule;
    this.times = [];

    for (let i in Array.from(Array(24))) {
      let h = i > 9 ? i : '0' + i;
      this.times.push(h + ':00');
      this.times.push(h + ':30');
    }
  }

  get tabbar() {
    let node: Node = this.element.domElement;
    while ((node = node.parentNode).nodeName !== 'ONS-TABBAR');
    return node;
  }

  addActivity() {
    console.log("addActivityが呼ばれた");

    /*
    navigator.geolocation.getCurrentPosition(
      function(position){
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        var range = '1';
        http.get('http://api.gnavi.co.jp/RestSearchAPI/20150630/', {params: {keyid: keyid, format: format, latitude:latitude, longitude:longitude, range:range}})
          .then(function(data, status, headers, config) {
            this.searchShops = this.createShops(data);
            navi.pushPage('testresult.html');
          })
          .then(function(data, status, headers, config) {
            alert('error');
          });
      },
      function(error){
        alert('code: '    + error.code    + '\n' +
        'message: ' + error.message + '\n');
      }
    );
    */



      //本体側からの呼び出し
      getFirstItem().then(item_category => {
        //本来やりたかった処理
        someProcess(item_category);
        alert("Success" + url);
/*

          var dict = {
              'list.html': SchedulePage,
              'search.html': AddItemPage,
              '_list.html': OkpSchedulePage
          };

          loader.loadIntoNewLocation(dict[page], new ElementRef(result._hostComponent.hostView, 0)).then(componentRef => {
              console.log(result._hostComponent.hostView);
              callback(componentRef.location.domElement);
          });

*/

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
          };

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
  appInjector: [Schedule]
})
@View({
  template: `
    <ons-tabbar animation="slide">
      <ons-tab
        no-reload
        page="list.html"
        active="true">
        <ons-button modifier="large" style="margin: 0 2px;">
          ホームでやんす
        </ons-button>
      </ons-tab>
      <ons-tab
        no-reload
        page="search.html">
        <ons-button modifier="large" style="margin: 0 2px 0 2px;">
         探す！
        </ons-button>
      </ons-tab>
    </ons-tabbar>
  `
})
class MyAppComponent {
}

bootstrap(MyAppComponent).then(result => {
  var injector: Injector = result.injector;
  var loader: DynamicComponentLoader = injector.get(DynamicComponentLoader);


    var dict = {
        'list.html': SchedulePage,
        'search.html': AddItemPage,
        '_list.html': OkpSchedulePage
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