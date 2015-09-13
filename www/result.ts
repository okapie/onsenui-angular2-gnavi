var apiUrl = 'http://api.gnavi.co.jp/RestSearchAPI/20150630/';
var keyid = '878b251d597e2d443b1e960d54591f00';
var format = 'json';

import {Http} from 'angular2/http'

@Component({
    selector: 'result'
})

@View({
    templateUrl: './result.html',
    directives: [NgFor]
})
export class HttpSample {
    result: Object;
    constructor(http: Http) {
        this.result = {friends:[]};
        http.get(apiUrl, {params: {keyid: keyid, format: format, latitude:latitude, longitude:longitude, range:range}})
            .success(function(data, status, headers, config) {
                this.searchShops = this.createShops(data);
                navi.pushPage('result.html');
            })
            .error(function(data, status, headers, config) {
                alert('error');
            });
    }
}