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
var urlPath = [];
var angular2_1 = require('angular2/angular2');
navigator.geolocation.getCurrentPosition(function (position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var range = '1';
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
            return getUrl('http://api.gnavi.co.jp/RestSearchAPI/20150630?keyid=' + keyid + '&format=' + format + '&latitude=' + latitude + '&longitude=' + longitude + '&range=' + range).then(JSON.parse);
        }
    };
    function getFirstItem() {
        function recordValue(results, value) {
            results.push(value);
            Object.keys(value).forEach(function (element) {
                results.push(value[element]);
            });
            return results;
        }
        var pushValue = recordValue.bind(null, []);
        return request.test1().then(pushValue);
    }
    getFirstItem().then(function (results, value) {
        if (results[0].rest.length > 0) {
            for (var i in results[0].rest) {
                urlPath.push(results[0].rest[i].id + ' ' + results[0].rest[i].name + ' ' + results[0].rest[i].access.line + ' ' + results[0].rest[i].access.station + ' ' + results[0].rest[i].access.walk + '分\n');
            }
        }
        else {
            alert('Not found');
        }
    }).then(null, function (e) {
        console.error(e);
        alert('Error');
    });
});
var getHome = (function () {
    function getHome() {
    }
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
            template: "\n    <div style=\"text-align:center; padding-top:50px;\">\n      <img src=\"images/title.png\" width=\"320px\" >\n      <img src=\"images/top-yakitori.png\" width=\"320px\">\n    </div>\n<ul>        <li *ng-for=\"#meshiResult of meshiResults\">\n{{ meshiResult }}\n</li></ul>\n  ",
            directives: [angular2_1.NgFor, angular2_1.NgIf]
        }), 
        __metadata('design:paramtypes', [getHome])
    ], homePage);
    return homePage;
})();
this.like = JSON.parse(window.localStorage.getItem('like'));
//if (!angular.isArray($scope.like)) {
this.like = [];
//}
var value;
var listResult = new Array();
var meshiLogPage = (function () {
    function meshiLogPage() {
        this.meshis = urlPath;
        this.meshiResults = [];
        this.listResult = listResult;
    }
    meshiLogPage.prototype.addResult = function (meshi) {
        this.meshis.push(meshi);
    };
    meshiLogPage.prototype.addLike = function (e, _meshi) {
        e.stopPropagation();
        window.localStorage.setItem('like', _meshi);
        value = window.localStorage.getItem('like');
        this.meshiResults.push(value);
        this.listResult.push(value);
    };
    meshiLogPage.prototype.watchResult = function () {
        //e.stopPropagation();
        //listResult = _meshi;
        // listResult.push(_meshi);
        //alert("value is " + listResult[0]);
        //document.getElementById('okapie').innerHTML = listResult[0] + '<ons-button (click)="removeResult()">消す</ons-button>';
        window.open('#okapie', 'location=no');
    };
    meshiLogPage.prototype.removeResult = function (_meshi) {
        alert(_meshi);
        _meshi.delete();
    };
    meshiLogPage = __decorate([
        angular2_1.Component({
            selector: 'ons-page'
        }),
        angular2_1.View({
            template: "\n  <ons-page>\n    <div style=\"padding: 10px 9px\">\n      <ons-button (click)=\"addResult(meshitext.value)\" modifier=\"large\" style=\"margin: 0 auto;\">\n        \u73FE\u5728\u5730\u304B\u3089\u63A2\u3059\n      </ons-button>\n      <ul>\n        <li *ng-for=\"#meshi of meshis\">\n          {{ meshi }}\n          <ons-button (click)=\"addLike($event, meshi)\" modifier=\"large\" style=\"margin: 0 auto;\">\n            \u304A\u6C17\u306B\u5165\u308A\u306B\u8FFD\u52A0\u3059\u308B\u3088\n        \u3000</ons-button>\n        </li>\n      </ul>\n\n<ons-button (click)=\"watchResult()\" modifier=\"large\" style=\"margin: 0 auto;\">\n\u30EA\u30B9\u30C8\u3092\u898B\u308B\n</ons-button>\n\n\n<ul id='okapie'>\n    <li *ng-for=\"#meshiResult of listResult\">\n{{ meshiResult }}\n<ons-button (click)=\"removeResult(meshiResult)\" modifier=\"large\" style=\"margin: 0 auto;\">\n\u524A\u9664\n\u3000</ons-button>\n</li>\n</ul>\n    </div>\n  </ons-page>\n  ",
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
