if (typeof __decorate !== "function") __decorate = function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
if (typeof __metadata !== "function") __metadata = function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/// <reference path="./typings/angular2/angular2.d.ts" />
var keyid = '878b251d597e2d443b1e960d54591f00';
var format = 'json';
var urlPath;
var angular2_1 = require('angular2/angular2');
var http_1 = require('angular2/http');
var di_1 = require('angular2/di');
var injector = angular2_1.Injector.resolveAndCreate([
    http_1.BaseRequestOptions,
    http_1.MockBackend,
    di_1.bind(http_1.Http).toFactory(function (backend, defaultOptions) {
        return new http_1.Http(backend, defaultOptions);
    }, [http_1.MockBackend, http_1.BaseRequestOptions])
]);
this.search = function () {
    navigator.geolocation.getCurrentPosition(function (position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        range = '1';
    });
};
var http = injector.get(http_1.Http);
/* XHRを叩いてリクエスト => PromiseでURL取得の非同期処理を行う ******************************************************************/
navigator.geolocation.getCurrentPosition(function (position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var range = '1';
    //let param = 'keyid=878b251d597e2d443b1e960d54591f00&format=json&latitude=latitude&longitude=longitude&range=range';
    function getUrl(url) {
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url, true);
            xhr.onload = function () {
                if (xhr.status === 200) {
                    resolve(xhr.responseText);
                }
                else {
                    reject(new Error(xhr.statusText), xhr.response);
                }
            };
            xhr.onerror = function () {
                reject(new Error(xhr.statusText));
            };
            xhr.send();
        });
    }
    var request = {
        test1: function getTest1() {
            //return getUrl('http://api.gnavi.co.jp/RestSearchAPI/20150630');
            return getUrl('http://api.gnavi.co.jp/RestSearchAPI/20150630?keyid=' + keyid + '&format=' + format + '&latitude=' + latitude + '&longitude=' + longitude + '&range=' + range).then(JSON.parse);
        }
    };
    function getFirstItem() {
        function recordValue(results, value) {
            results.push(value);
            urlPath = results;
            Object.keys(value).forEach(function (element) {
                results.push(value[element].total_hit_count);
            });
            return results;
        }
        var pushValue = recordValue.bind(null, []);
        return request.test1().then(pushValue);
    }
    getFirstItem().then(function (results, value) {
        //this.searchShops = $scope.createShops(data);
        //http.get(url, {params: {keyid: keyid, format: format, latitude:latitude, longitude:longitude, range:range}})
        //alert("ゲット成功" + results);
        //alert( results.total_hit_count + '件の結果が見つかりました。\n' );
        alert("ゲット成功" + results);
    }).then(null, function (e) {
        console.error(e);
        alert("失敗");
    });
});
/* END OF *** XHRを叩いてリクエスト => PromiseでURL取得の非同期処理を行う *******************************************************/
/* ホーム ******************************************************************************************************************/
var getHome = (function () {
    function getHome() {
    }
    getHome.prototype.getRestoResult = function () {
        return JSON.parse(window.localStorage.getItem('gethome') || '[]');
    };
    getHome.prototype._setItems = function (items) {
        window.localStorage.setItem('gethome', JSON.stringify(items));
    };
    getHome.prototype.add = function (item) {
        var items = this.getRestoResult();
        items.push(item);
        items.sort(function (a, b) { return parseInt(a.time.replace(':', '')) - parseInt(b.time.replace(':', '')); });
        this._setItems(items);
    };
    getHome.prototype.remove = function (idx) {
        var items = this.getRestoResult();
        items.splice(idx, 1);
        this._setItems(items);
    };
    Object.defineProperty(getHome.prototype, "items", {
        get: function () {
            return this.getRestoResult();
        },
        enumerable: true,
        configurable: true
    });
    return getHome;
})();
var homePage = (function () {
    function homePage(gethome) {
        this.gethome = gethome;
    }
    homePage = __decorate([
        angular2_1.Component({
            selector: 'ons-page'
        }),
        angular2_1.View({
            template: "\n    <div style=\"text-align:center; padding-top:50px;\">\n      <img src=\"images/title.png\" width=\"320px\" >\n      <img src=\"images/top-yakitori.png\" width=\"320px\">\n    </div>\n  ",
            directives: [angular2_1.NgFor, angular2_1.NgIf]
        }), 
        __metadata('design:paramtypes', [getHome])
    ], homePage);
    return homePage;
})();
/* END OF *** ホーム ********************************************************************************************************/
/* サーチ ******************************************************************************************************************/
var meshiLogPage = (function () {
    function meshiLogPage() {
        this.todos = urlPath;
    }
    meshiLogPage.prototype.addTodo = function (todo) {
        this.todos.push(todo);
    };
    meshiLogPage.prototype.doneTyping = function ($event) {
        if ($event.which === 13) {
            this.addTodo($event.target.value);
            $event.target.value = null;
        }
    };
    meshiLogPage.prototype.searchResto = function () {
        http.get(urlPath).then(function (data, status, headers, config) {
            this.searchShops = this.createShops(data);
            navi.pushPage('result.html');
            alert("urlPathを調理します");
        })
            .then(function (data, status, headers, config) {
            alert('error');
        });
    };
    meshiLogPage = __decorate([
        angular2_1.Component({
            selector: 'ons-page'
        }),
        angular2_1.View({
            template: "\n  <ons-page>\n    <ons-toolbar>\n      <div class=\"center\">\u63A2\u3059\u3088\u3093</div>\n    </ons-toolbar>\n    <div style=\"padding: 10px 9px\">\n\n        <!--<input type=\"text\" ng-model=\"vm.newTodo\" placeholder=\"ToDo\u540D\u3092\u5165\u529B\">\n        <input type=\"submit\" type=\"button\" value=\"\u65B0\u898F\u4F5C\u6210\">-->\n        <ons-button (click)=\"searchResto()\" modifier=\"large\" style=\"margin: 0 auto;\">\n\n          \u73FE\u5728\u5730\u304B\u3089\u63A2\u3059\n        </ons-button>\n        <button (click)=\"addTodo(todotext.value)\">Add Todo</button>\n\n        <ul>\n            <li *ng-for=\"#todo of todos\">\n        {{ todo }}\n        </li>\n        </ul>\n    </div>\n  </ons-page>\n  ",
            directives: [angular2_1.NgFor]
        }), 
        __metadata('design:paramtypes', [])
    ], meshiLogPage);
    return meshiLogPage;
})();
var meshiLogComponent = (function () {
    function meshiLogComponent() {
    }
    meshiLogComponent = __decorate([
        angular2_1.Component({
            selector: 'okp-app',
            appInjector: [getHome]
        }),
        angular2_1.View({
            template: "\n    <ons-page>\n      <ons-toolbar>\n        <div class=\"center\" style=\"font-size: 18px;font-weight:bold;background-color:#E65100;color:#fff\">\u30D8\u30C3\u30C0\u30FC</div>\n      </ons-toolbar>\n      <ons-tabbar animation=\"slide\">\n        <ons-tab no-reload page=\"home.html\" active=\"true\">\n          <ons-button modifier=\"large\" style=\"margin: 0 2px;\">\n            \u30DB\u30FC\u30E0\u3067\u3084\u3093\u3059\n          </ons-button>\n        </ons-tab>\n        <ons-tab no-reload page=\"meshilog.html\">\n          <ons-button modifier=\"large\" style=\"margin: 0 2px 0 2px;\">\n            \u3081\u3057\u30ED\u30B0\n          </ons-button>\n        </ons-tab>\n      </ons-tabbar>\n    </ons-page>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], meshiLogComponent);
    return meshiLogComponent;
})();
angular2_1.bootstrap(meshiLogComponent).then(function (result) {
    var injector = result.injector;
    var loader = injector.get(angular2_1.DynamicComponentLoader);
    var dict = {
        'home.html': homePage,
        'meshilog.html': meshiLogPage
    };
    OnsTabElement.prototype._createPageElement = function (page, callback) {
        if (dict[page]) {
            loader.loadIntoNewLocation(dict[page], new angular2_1.ElementRef(result._hostComponent.hostView, 0)).then(function (componentRef) {
                console.log(result._hostComponent.hostView);
                callback(componentRef.location.domElement);
            });
        }
        else {
            throw new Error('Page ' + page + ' does not exist.');
        }
    };
});
