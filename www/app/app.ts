/// <reference path="./typings/angular2/angular2.d.ts" />
declare var OnsTabElement: {prototype: {_createPageElement: Function}};
declare var ons: any;
let keyid = '878b251d597e2d443b1e960d54591f00';
let format = 'json';
let urlPath;

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
import {MockBackend, BaseRequestOptions, Http} from 'angular2/http';
import {Injector, bind} from 'angular2/di';

let injector = Injector.resolveAndCreate([
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

var http = injector.get(Http);

/* XHRを叩いてリクエスト => PromiseでURL取得の非同期処理を行う ******************************************************************/
navigator.geolocation.getCurrentPosition(
    function(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        var range = '1';
        //let param = 'keyid=878b251d597e2d443b1e960d54591f00&format=json&latitude=latitude&longitude=longitude&range=range';

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

    var request = {
        test1: function getTest1() {
            //return getUrl('http://api.gnavi.co.jp/RestSearchAPI/20150630');
            return getUrl('http://api.gnavi.co.jp/RestSearchAPI/20150630?keyid=' + keyid + '&format=' + format + '&latitude=' + latitude + '&longitude=' + longitude + '&range=' + range);
        }
    };

    function getFirstItem() {
        function recordValue(results, value) {
            results.push(value);
            urlPath = results;
            return results;
        }
        var pushValue = recordValue.bind(null, []);
        return request.test1().then(pushValue);
    }

    getFirstItem().then((results, value) => {
        //this.searchShops = $scope.createShops(data);
        //http.get(url, {params: {keyid: keyid, format: format, latitude:latitude, longitude:longitude, range:range}})
        alert("ゲット成功" + results);
    }).then(null, e => {
        console.error(e);
        alert("失敗");
    });
});
/* END OF *** XHRを叩いてリクエスト => PromiseでURL取得の非同期処理を行う *******************************************************/

/* ホーム ******************************************************************************************************************/
class getHome {
  getRestoResult() {
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
/* END OF *** ホーム ********************************************************************************************************/

/* サーチ ******************************************************************************************************************/
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
      <form ng-submit="create()">
        <input type="text" ng-model="vm.newTodo" placeholder="ToDo名を入力">
        <input type="submit" type="button" value="新規作成">
        <ons-button (click)="searchResto()" modifier="large" style="margin: 0 auto;">

          現在地から探す
        </ons-button>
        <button (click)="addTodo(todotext.value)">Add Todo</button>
      </form>
        <ul>
            <li *ng-for="#todo of todos">
        {{ todo }}
        </li>
        </ul>
    </div>
  </ons-page>
  `,
  directives: [NgFor]
})
class meshiLogPage {
    constructor() {
        this.todos = urlPath;
    }
    addTodo(todo: string) {
        this.todos.push(todo);
    }

    doneTyping($event) {
        if($event.which === 13) {
            this.addTodo($event.target.value);
            $event.target.value = null;
        }
    }

  create() {
      this.todos.push(self.newTodo);
      this.newTodo = '';
  }

  searchResto() {
      http.get(urlPath).then(function(data, status, headers, config) {
          this.searchShops = this.createShops(data);
          navi.pushPage('result.html');
          alert("urlPathを調理します");
      })
          .then(function(data, status, headers, config) {
              alert('error');
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