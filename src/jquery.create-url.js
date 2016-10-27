;(function($) {
    'use strict';

    var url;
    var urlParams;
    var routeRules;

    $.UrlConfig = function(options) {

        routeRules = {
            'book': 'book/<category>',
            'book/article': 'book/<category>/<title>/<id>',
        };

        if (options) routeRules = options;

        return routeRules;
    };

    $.Url = function(route, params) {

        if (!route) return;

        var url;
        var urlParams;

        $.each(routeRules, function(routeKey, routeRule) {
            if (routeKey == route) {
                url = routeRule;
                return;
            }
        });

        if (url) {
            var key, _key, value;
            $.each(params, function(_key, value) {
                key = '<'+ _key +'>';
                if (key && url.indexOf(key) >= 0) {
                    url = url.replace(key, value);
                    delete params[_key];
                }
            });

            url = url.replace(/(\/<)\w+(>)/g, '');
            url = url + '/' + (params.length ? '?' + $.param(params) : '');
        }

        return url ? url : $.param(params);
    };

} (jQuery));
