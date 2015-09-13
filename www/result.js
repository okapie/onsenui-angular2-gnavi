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
var apiUrl = 'http://api.gnavi.co.jp/RestSearchAPI/20150630/';
var keyid = '878b251d597e2d443b1e960d54591f00';
var format = 'json';
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
        Component({
            selector: 'result'
        }),
        View({
            templateUrl: './result.html',
            directives: [NgFor]
        }), 
        __metadata('design:paramtypes', [(typeof Http !== 'undefined' && Http) || Object])
    ], HttpSample);
    return HttpSample;
})();
exports.HttpSample = HttpSample;
