/// <reference path="./typings/angular2/angular2.d.ts" />
declare var OnsTabElement: {prototype: {_createPageElement: Function}};
declare var ons: any;
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
        var pushValue = recordValue.bind(null, []);
        return request.test1().then(pushValue);
    }

    getFirstItem().then((results, value) => {
        if ( results[0].rest.length > 0 ) {
            for ( var i in results[0].rest ){
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

@Component({
  selector: 'ons-page'
})
@View({
  template: `
  <ons-page>
    <div style="padding: 10px 9px">
        <ons-button (click)="searchResto()" modifier="large" style="margin: 0 auto;">
          現在地から探す
        </ons-button>
        <button (click)="addTodo(todotext.value)">Add Todo</button>
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