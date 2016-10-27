;(function($) {
    'use strict';

    var routeRules;

    $.UrlConfig = function(options) {

        routeRules = [
            {
                pattern: 'motor/<make>/<model>/<variant>',
                route: 'listings/index',
                defaults: {
                    vehicle_type: 'mcycle'
                }
            },
            {
                pattern: '<make>/<model>/<variant>',
                route: 'listings/index',
            }
        ];

        if (options) routeRules = options;

        return routeRules;
    };

    $.Url = function(route, params) {

        var ruleDefaults, rule, url;

        if (!route) return;

        function validateRuleDefaults(defaults, params) {
            var keyChecks = 0;
            var totalDefaults = Object.keys(defaults).length;

            $.each(params, function(key, value) {
                if (typeof defaults[key] !== 'undefined' && defaults[key] == value) {
                    keyChecks++;
                }
            });

            return keyChecks == totalDefaults ? true : false;
        }

        // check routes with defaults
        $.each(routeRules, function(i, rules) {
            if (typeof rules.route === 'undefined') return;
            if (typeof rules.pattern === 'undefined') return;
            if (typeof rules.defaults === 'undefined') return;
            if (rules.route != route) return;
            if (!validateRuleDefaults(rules.defaults, params)) return;
            ruleDefaults = rules;
        });

        // check routes w/o defaults
        $.each(routeRules, function(i, rules) {
            if (typeof rules.route === 'undefined') return;
            if (typeof rules.pattern === 'undefined') return;
            if (typeof rules.defaults !== 'undefined') return;
            if (rules.route != route) return;
            rule = rules;
        });

        rule = ruleDefaults ? ruleDefaults : rule;

        if (rule) {

            var key, _key, value;
            url = rule.pattern;

            $.each(params, function(_key, value) {
                key = '<'+ _key +'>';
                if (key && url.indexOf(key) >= 0) {
                    url = url.replace(key, value);
                    delete params[_key];
                }
            });

            if (typeof rule.defaults !== 'undefined') {
                $.each(rule.defaults, function(_key, value) {
                    delete params[_key];
                });
            }

            url = url.replace(/(\/<)\w+(>)/g, '');
            url = url + '/' + (Object.keys(params).length ? '?' + $.param(params) : '');
        }

        return url ? url : $.param(params);
    };

} (jQuery));
