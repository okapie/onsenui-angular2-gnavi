/// <reference path="./typings/angular2/angular2.d.ts" />
declare const OnsTabElement: {prototype: {_createPageElement: Function}};
declare const ons: any;
const keyid = '878b251d597e2d443b1e960d54591f00';
const format = 'json';
let urlPath = [];

import {
  Component,
  View,
  bootstrap,
  DynamicComponentLoader,
  ElementRef,
  ViewRef,
  NgFor,
  NgIf
} from 'angular2/angular2';
import {Injector, bind} from 'angular2/di';

navigator.geolocation.getCurrentPosition(
  function(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let range = '1';

    function getUrl(url) {
      return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onload = () => {
          if (xhr.status === 200) {
            resolve(xhr.responseText);
          } else {
            reject(new Error(xhr.statusText), xhr.response);
          }
        };
        xhr.onerror = () => {
          reject(new Error(xhr.statusText));
        };
        xhr.send();
      });
    }

    let request = {
      test1: function getTest1() {
        return getUrl('http://api.gnavi.co.jp/RestSearchAPI/20150630?keyid=' + keyid + '&format=' + format + '&latitude=' + latitude + '&longitude=' + longitude + '&range=' + range).then(JSON.parse);
      }
    };

    function getFirstItem() {
      function recordValue(results, value) {
        results.push(value);
        Object.keys(value).forEach(function(element){
          results.push(value[element]);
        });
          return results;
      }
      let pushValue = recordValue.bind(null, []);
      return request.test1().then(pushValue);
    }

    getFirstItem().then((results, value) => {
      if (results[0].rest.length > 0) {
        for (let i in results[0].rest){
          urlPath.push(results[0].rest[i].id + ' ' + results[0].rest[i].name + ' ' + results[0].rest[i].access.line + ' ' + results[0].rest[i].access.station + ' ' + results[0].rest[i].access.walk + '分\n');
        }
      } else {
        alert('Not found');
      }
    }).then(null, e => {
      console.error(e);
      alert('Error');
    });
});

class getHome {
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

this.like = JSON.parse(window.localStorage.getItem('like'));
//if (!angular.isArray($scope.like)) {
this.like = [];
//}

@Component({
  selector: 'ons-page'
})
@View({
  template: `
  <ons-page>
    <div style="padding: 10px 9px">
      <ons-button (click)="addResult(meshitext.value)" modifier="large" style="margin: 0 auto;">
        現在地から探す
      </ons-button>
      <ul>
        <li *ng-for="#meshi of meshis">
          {{ meshi }}
          <div ng-show="shop.isLiked == false" (click)="addLike($event, shop.id)">
            お気に入りに追加
          </div>
          <div ng-show="shop.isLiked == false">
            <a href="addLike($event, shop.id)">お気に入りに追加</a>
          </div>
          <ons-button (click)="addLike(meshi)" modifier="large" style="margin: 0 auto;">
            お気に入りに追加するよ
        　</ons-button>
        </li>
      </ul>
    <div ng-show="likeShops.length > 0">
        <ons-list>
            <ons-list-item ng-repeat="shop in likeShops"  modifier="chevron">
                <div ng-click="openWithBrowser(shop.url_mobile)">
                    <div class="detail-title">
                    {{meshi}}
                    </div>
                </div>
            </ons-list-item>
        </ons-list>
    </div>
    </div>
  </ons-page>
  `,
  directives: [NgFor]
})
class meshiLogPage {
  constructor() {
    this.meshis = urlPath;
  }
  addResult(meshi: string) {
    this.meshis.push(meshi);
  }
  addLike(_meshi){
    alert(_meshi);
    //e.stopPropagation();

    this.like.unshift(_meshi);
    this.like.slice(0,9);
    saveLike(this.like);
    showLikeShop();


//    for(var i=0; i<$scope.searchShops.length; i++){
       // if($scope.searchShops[i].id == id){
           // $scope.searchShops[i].isLiked = true;
       // }
   // }
}

    saveLike(like) {
        window.localStorage.setItem('like', JSON.stringify(like));

    }
    showLikeShop(){
    this.like = JSON.parse(window.localStorage.getItem('like'));

    if (!angular.isArray($scope.like)) {
        this.like = [];
    }
    var ids = this.like;
    var id = "";
    for (var i = 0 ; i<ids.length ; i++){
        if(i == 0){
            id = id + ids[i];
        }else{
            id = id + ',' + ids[i];
        }
    }
/*
    if(ids.length > 0){
        $http.get(apiUrl, {params: {keyid: keyid, format: format,id: id}})
            .success(function(data, status, headers, config) {
                $scope.likeShops = $scope.createShops(data);
            })
            .error(function(data, status, headers, config) {
                alert('error');
            });
    }else{
        $scope.likeShops = [];
    }*/
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
  let injector: Injector = result.injector;
  const loader: DynamicComponentLoader = injector.get(DynamicComponentLoader);
  const dict = {
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