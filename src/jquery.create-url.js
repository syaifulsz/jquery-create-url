;(function($) {
    'use strict';

    var routeRules;
    var paramRules;
    var slugify;

    window.slugify = function(str) {
        var $slug = '';
        var trimmed = $.trim(str);
        $slug = trimmed.replace(/[^a-z0-9-]/gi, '-').
        replace(/-+/g, '-').
        replace(/^-|-$/g, '');
        return $slug.toLowerCase();
    };

    $.UrlConfig = function(routeRulesOptions, paramRulesOptions) {

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

        paramRules = {
            make: 'slugify',
            model: 'slugify'
        };

        if (routeRulesOptions) routeRules = routeRulesOptions;
        if (paramRulesOptions) paramRules = paramRulesOptions;

        return [
            routeRules = routeRules,
            paramRules = paramRules
        ];
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

                    if (typeof paramRules[_key] !== 'undefined' && paramRules[_key]) {
                        var fn = window[paramRules[_key]];
                        if (typeof fn === "function") value = fn(value);
                    }

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
