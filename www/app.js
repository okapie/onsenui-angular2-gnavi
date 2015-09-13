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
var angular2_1 = require('angular2/angular2');
var HttpSample = (function () {
    function HttpSample(http) {
        this.result = { friends: [] };
        http.get(apiUrl, { params: { keyid: keyid, format: format, latitude: latitude, longitude: longitude, range: range } })
            .success(function (data, status, headers, config) {
            this.searchShops = this.createShops(data);
            navi.pushPage('result.html');
        })
            .error(function (data, status, headers, config) {
            alert('error');
        });
    }
    HttpSample = __decorate([
        angular2_1.Component({
            selector: 'result'
        }),
        angular2_1.View({
            templateUrl: './result.html',
            directives: [angular2_1.NgFor]
        }), 
        __metadata('design:paramtypes', [(typeof Http !== 'undefined' && Http) || Object])
    ], HttpSample);
    return HttpSample;
})();
exports.HttpSample = HttpSample;
var Schedule = (function () {
    function Schedule() {
    }
    Schedule.prototype._getItems = function () {
        this.search = function () {
            navigator.geolocation.getCurrentPosition(function (position) {
                var latitude = position.coords.latitude;
                var longitude = position.coords.longitude;
                var range = '1';
                $http.get(apiUrl, { params: { keyid: keyid, format: format, latitude: latitude, longitude: longitude, range: range } })
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
            template: "\n  <ons-page>\n    <ons-toolbar>\n      <div class=\"center\" style=\"font-size: 18px;font-weight:bold;background-color:#E65100;color:#fff\">\u304A\u304B\u3074\u306E\u98EF\u30ED\u30B0</div>\n    </ons-toolbar>\n\n    <ons-list class=\"plan-list\">\n      <div style=\"text-align:center;\">\u304A\u6C17\u306B\u5165\u308A\u30EA\u30B9\u30C8</div>\n      <ons-list-item (press)=\"schedule.remove(i)\" *ng-for=\"#item of schedule.items; #i = index;\" class=\"plan\">\n        <ons-row>\n          <ons-col width=\"80px\" class=\"plan-left\">\n            <div class=\"plan-date\">{{ item.time }}</div>\n            <div class=\"plan-duration\">{{ item.duration }}</div>\n          </ons-col>\n\n          <ons-col width=\"6px\" class=\"plan-center\">\n          </ons-col>\n\n          <ons-col class=\"plan-right\">\n            <div class=\"plan-name\">{{ item.title }}</div>\n\n            <div *ng-if=\"item.location\" class=\"plan-info\">\n              <div>\n                <ons-icon icon=\"fa-map-marker\">\u73FE\u5728\u5730</ons-icon>&nbsp;{{ item.location }}\n              </div>\n            </div>\n          </ons-col>\n        </ons-row>\n      </ons-list-item>\n    </ons-list>\n\n  </ons-page>\n  ",
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
            ;
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
    AddItemPage.prototype.addActivity = function (title, location, time) {
        console.log("お気に入りに入れるボタンが押された");
        /*
              navigator.geolocation.getCurrentPosition(
                  function(position){
                      var latitude = position.coords.latitude;
                      var longitude = position.coords.longitude;
                      var range = '1';
                      $http.get(apiUrl, {params: {keyid: keyid, format: format, latitude:latitude, longitude:longitude, range:range}})
                          .success(function(data, status, headers, config) {
                              $scope.searchShops = $scope.createShops(data);
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
        if (title.length && location.length) {
            this.schedule.add({ title: title, location: location, time: time });
            this.tabbar.setActiveTab(0);
        }
    };
    AddItemPage = __decorate([
        angular2_1.Component({
            selector: 'ons-page'
        }),
        angular2_1.View({
            template: "\n  <ons-page>\n    <ons-toolbar>\n      <div class=\"center\">\u691C\u7D22\u7D50\u679C</div>\n    </ons-toolbar>\n    <ons-list modifier=\"inset\" style=\"margin-top: 10px\">\n      <ons-list-item  >\n        <input #title (keyup) type=\"text\" class=\"text-input text-input--transparent\" placeholder=\"Activity\" style=\"width: 100%\">\n      </ons-list-item>\n      <ons-list-item>\n        <input #location (keyup) type=\"text\" class=\"text-input text-input--transparent\" placeholder=\"Location\" style=\"width: 100%\">\n      </ons-list-item>\n      <ons-list-item>\n        <select #time class=\"text-input text-input--transparent\" placeholder=\"Location\" style=\"width: 100%\">\n          <option *ng-for=\"#t of times\" [value]=\"t\">{{ t }}</option>\n        <select>\n      </ons-list-item>\n    </ons-list>\n\n    <div style=\"padding: 10px 9px\">\n      <ons-button (click)=\"addActivity(title.value, location.value, time.value)\" modifier=\"large\" style=\"margin: 0 auto;\">\n        \u73FE\u5728\u5730\u304B\u3089\u63A2\u3059\n      </ons-button>\n    </div>\n  </ons-page>\n  ",
            directives: [angular2_1.NgFor]
        }), 
        __metadata('design:paramtypes', [angular2_1.ElementRef, Schedule])
    ], AddItemPage);
    return AddItemPage;
})();
// レストラン検索
var searchRest = function () {
    console.log("お気に入りに入れるボタンが押された");
    /*
    navigator.geolocation.getCurrentPosition(
        function(position){
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            var range = '1';
            $http.get(apiUrl, {params: {keyid: keyid, format: format, latitude:latitude, longitude:longitude, range:range}})
                .success(function(data, status, headers, config) {
                    $scope.searchShops = $scope.createShops(data);
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
    );*/
};
var MyAppComponent = (function () {
    function MyAppComponent() {
    }
    MyAppComponent = __decorate([
        angular2_1.Component({
            selector: 'okp-app',
            appInjector: [Schedule]
        }),
        angular2_1.View({
            template: "\n    <ons-tabbar animation=\"slide\">\n      <ons-tab\n        no-reload\n        page=\"list.html\"\n        active=\"true\">\n        <ons-button modifier=\"large\" style=\"margin: 0 2px;\">\n          \u304A\u6C17\u306B\u5165\u308A\u30EA\u30B9\u30C8\n        </ons-button>\n      </ons-tab>\n      <ons-tab\n        no-reload\n        page=\"search.html\">\n        <ons-button modifier=\"large\" style=\"margin: 0 2px 0 2px;\">\n         \u63A2\u3059\uFF01\n        </ons-button>\n      </ons-tab>\n    </ons-tabbar>\n  "
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
                callback(componentRef.location.domElement);
            });
        }
        else {
            throw new Error('Page ' + page + ' does not exist.');
        }
    };
});
