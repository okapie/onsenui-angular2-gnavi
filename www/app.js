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
var url = 'http://api.gnavi.co.jp/RestSearchAPI/20150630/';
var keyid = '878b251d597e2d443b1e960d54591f00';
var format = 'json';
var latitude;
var longitude;
var range;
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
/*
var http = injector.get(Http);
*/
exports.http = {
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
    get: function (url) {
        url = 'http://api.gnavi.co.jp/RestSearchAPI/20150630/', { params: { keyid: keyid, format: format, latitude: latitude, longitude: longitude, range: range } };
        return getUrl(url);
    }
};
function getUrl(url) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.onload = function () {
            if (xhr.status === 200) {
                resolve(xhr.statusText);
            }
            else {
                //(1)エラーの場合rejectを呼ぶ
                reject(new Error(xhr.statusText));
            }
        };
        xhr.onerror = function () {
            //(2)エラーの場合rejectを呼ぶ
            reject(new Error(xhr.statusText));
        };
        xhr.send();
    });
}
var OkpSchedule = (function () {
    function OkpSchedule(message) {
        this.message = message;
    }
    return OkpSchedule;
})();
var OkpSchedulePage = (function () {
    function OkpSchedulePage(schedule) {
        this.schedule = schedule;
    }
    return OkpSchedulePage;
})();
var MyAppComponent = (function () {
    function MyAppComponent() {
    }
    MyAppComponent = __decorate([
        angular2_1.Component({
            selector: 'okp-app-2',
            appInjector: [OkpSchedule]
        }),
        angular2_1.View({
            template: "\n\n<ons-button modifier=\"large\" style=\"margin: 0 2px;\">\n\u3066\u3059\u3068\n</ons-button>\n\n"
        }), 
        __metadata('design:paramtypes', [])
    ], MyAppComponent);
    return MyAppComponent;
})();
//成功した場合の処理
function someProcess(item_category) {
    var _item_category = item_category;
    alert("結果は、" + _item_category);
    var dict = {
        '_list.html': OkpSchedulePage
    };
    loader.loadIntoNewLocation(dict[page], new angular2_1.ElementRef(result._hostComponent.hostView, 0)).then(function (componentRef) {
        console.log(result._hostComponent.hostView);
        callback(componentRef.location.domElement);
    });
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
    var items = ["camera", "pc", "ps4"];
    return getUrl(url).then(function (list) {
        // 並列でのリクエスト実行
        return Promise.all(items.map(function (item_category) {
            return getUrl(url + item_category.id);
        }));
    });
}
var Schedule = (function () {
    function Schedule() {
    }
    Schedule.prototype._getItems = function () {
        this.search = function () {
            navigator.geolocation.getCurrentPosition(function (position) {
                var latitude = position.coords.latitude;
                var longitude = position.coords.longitude;
                var range = '1';
                exports.http.get('http://api.gnavi.co.jp/RestSearchAPI/20150630/', { params: { keyid: keyid, format: format, latitude: latitude, longitude: longitude, range: range } })
                    .success(function (data, status, headers, config) {
                    this.searchShops = this.createShops(data);
                    navi.pushPage('result.html');
                })
                    .error(function (data, status, headers, config) {
                    alert('error');
                });
            }, function (error) {
                alert('code: ' + error.code + '\n' +
                    'message: ' + error.message + '\n');
            });
        };
        return JSON.parse(window.localStorage.getItem('schedule') || '[]');
    };
    Schedule.prototype._setItems = function (items) {
        window.localStorage.setItem('schedule', JSON.stringify(items));
    };
    Schedule.prototype.add = function (item) {
        var items = this._getItems();
        items.push(item);
        items.sort(function (a, b) { return parseInt(a.time.replace(':', '')) - parseInt(b.time.replace(':', '')); });
        this._setItems(items);
    };
    Schedule.prototype.remove = function (idx) {
        var items = this._getItems();
        items.splice(idx, 1);
        this._setItems(items);
    };
    Object.defineProperty(Schedule.prototype, "items", {
        get: function () {
            return this._getItems();
        },
        enumerable: true,
        configurable: true
    });
    return Schedule;
})();
var SchedulePage = (function () {
    function SchedulePage(schedule) {
        this.schedule = schedule;
    }
    SchedulePage = __decorate([
        angular2_1.Component({
            selector: 'ons-page'
        }),
        angular2_1.View({
            template: "\n  <ons-page>\n    <ons-toolbar>\n      <div class=\"center\" style=\"font-size: 18px;font-weight:bold;background-color:#E65100;color:#fff\">\u304A\u304B\u3074\u306E\u98EF\u30ED\u30B0</div>\n    </ons-toolbar>\n    <!--\n    <ons-list class=\"plan-list\">\n      <div style=\"text-align:center;\">\u30DB\u30FC\u30E0\u3067\u3084\u3093\u3059</div>\n      <ons-list-item (press)=\"schedule.remove(i)\" *ng-for=\"#item of schedule.items; #i = index;\" class=\"plan\">\n        <ons-row>\n          <ons-col width=\"80px\" class=\"plan-left\">\n            <div class=\"plan-date\">{{ item.time }}</div>\n            <div class=\"plan-duration\">{{ item.duration }}</div>\n          </ons-col>\n\n          <ons-col width=\"6px\" class=\"plan-center\">\n          </ons-col>\n\n          <ons-col class=\"plan-right\">\n            <div class=\"plan-name\">{{ item.title }}</div>\n\n            <div *ng-if=\"item.location\" class=\"plan-info\">\n              <div>\n                <ons-icon icon=\"fa-map-marker\">\u73FE\u5728\u5730</ons-icon>&nbsp;{{ item.location }}\n              </div>\n            </div>\n          </ons-col>\n        </ons-row>\n      </ons-list-item>\n    </ons-list>\n    -->\n  </ons-page>\n  ",
            directives: [angular2_1.NgFor, angular2_1.NgIf]
        }), 
        __metadata('design:paramtypes', [Schedule])
    ], SchedulePage);
    return SchedulePage;
})();
var AddItemPage = (function () {
    function AddItemPage(self, schedule) {
        this.element = self;
        this.schedule = schedule;
        this.times = [];
        for (var i in Array.from(Array(24))) {
            var h = i > 9 ? i : '0' + i;
            this.times.push(h + ':00');
            this.times.push(h + ':30');
        }
    }
    Object.defineProperty(AddItemPage.prototype, "tabbar", {
        get: function () {
            var node = this.element.domElement;
            while ((node = node.parentNode).nodeName !== 'ONS-TABBAR')
                ;
            return node;
        },
        enumerable: true,
        configurable: true
    });
    AddItemPage.prototype.addActivity = function () {
        var _this = this;
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
        getFirstItem().then(function (item_category) {
            //本来やりたかった処理
            someProcess(item_category);
            alert("Success" + url);
            _this.searchShops = _this.createShops(url);
            navi.pushPage('testresult.html');
            _this.createShops = function (url) {
                var shops = [];
                if (url.total_hit_count > 1) {
                    for (var i = 0; i < url.rest.length; i++) {
                        shops[i] = url.rest[i];
                        shops[i].isLiked = this.isLiked(url.rest[i].id);
                        if (typeof shops[i].image_url.shop_image1 == 'string') {
                            shops[i].hasShopImage = true;
                        }
                        else {
                            shops[i].hasShopImage = false;
                        }
                    }
                }
                else if (url.total_hit_count == 1) {
                    shops[0] = url.rest;
                    shops[0].isLiked = $scope.isLiked(url.rest.id);
                    if (typeof shops[0].image_url.shop_image1 == 'string') {
                        shops[0].hasShopImage = true;
                    }
                    else {
                        shops[0].hasShopImage = false;
                    }
                }
                return shops;
            };
        })
            .then(null, function (e) {
            //エラー処理
            console.error(e);
            alert("失敗");
        });
    };
    AddItemPage = __decorate([
        angular2_1.Component({
            selector: 'ons-page'
        }),
        angular2_1.View({
            template: "\n  <ons-page>\n    <ons-toolbar>\n      <div class=\"center\">\u63A2\u3059\u3088\u3093</div>\n    </ons-toolbar>\n    <!--\n    <ons-list modifier=\"inset\" style=\"margin-top: 10px\">\n      <ons-list-item  >\n        <input #title (keyup) type=\"text\" class=\"text-input text-input--transparent\" placeholder=\"Activity\" style=\"width: 100%\">\n      </ons-list-item>\n      <ons-list-item>\n        <input #location (keyup) type=\"text\" class=\"text-input text-input--transparent\" placeholder=\"Location\" style=\"width: 100%\">\n      </ons-list-item>\n      <ons-list-item>\n        <select #time class=\"text-input text-input--transparent\" placeholder=\"Location\" style=\"width: 100%\">\n          <option *ng-for=\"#t of times\" [value]=\"t\">{{ t }}</option>\n        <select>\n      </ons-list-item>\n    </ons-list>\n    -->\n\n    <div style=\"padding: 10px 9px\">\n      <ons-button (click)=\"addActivity()\" modifier=\"large\" style=\"margin: 0 auto;\">\n        \u73FE\u5728\u5730\u304B\u3089\u63A2\u3059\n      </ons-button>\n    </div>\n  </ons-page>\n  ",
            directives: [angular2_1.NgFor]
        }), 
        __metadata('design:paramtypes', [angular2_1.ElementRef, Schedule])
    ], AddItemPage);
    return AddItemPage;
})();
var MyAppComponent = (function () {
    function MyAppComponent() {
    }
    MyAppComponent = __decorate([
        angular2_1.Component({
            selector: 'okp-app',
            appInjector: [Schedule]
        }),
        angular2_1.View({
            template: "\n    <ons-tabbar animation=\"slide\">\n      <ons-tab\n        no-reload\n        page=\"list.html\"\n        active=\"true\">\n        <ons-button modifier=\"large\" style=\"margin: 0 2px;\">\n          \u30DB\u30FC\u30E0\u3067\u3084\u3093\u3059\n        </ons-button>\n      </ons-tab>\n      <ons-tab\n        no-reload\n        page=\"search.html\">\n        <ons-button modifier=\"large\" style=\"margin: 0 2px 0 2px;\">\n         \u63A2\u3059\uFF01\n        </ons-button>\n      </ons-tab>\n    </ons-tabbar>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], MyAppComponent);
    return MyAppComponent;
})();
angular2_1.bootstrap(MyAppComponent).then(function (result) {
    var injector = result.injector;
    var loader = injector.get(angular2_1.DynamicComponentLoader);
    var dict = {
        'list.html': SchedulePage,
        'search.html': AddItemPage
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
