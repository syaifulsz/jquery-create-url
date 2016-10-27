# jQuery Create Url

A jQuery plugin to create URL from a given route and the associated query
parameters. It's common in major frameworks like Laravel and Yii to do URL
creation on given route in configurations. Here's the way to do it via jQuery.

## Basic Usage

Initiate global configurations.

```javascript
$.UrlConfig([
    {
        pattern: '<type>-cars/<make>/<model>/<variant>',
        route: 'listings/index',
        defaults: {
            vehicle_type: 'car'
        }
    },
    {
        pattern: 'motorbike/<make>/<model>/<variant>',
        route: 'listings/index',
        defaults: {
            vehicle_type: 'mcycle'
        }
    },
    {
        pattern: '<make>/<model>/<variant>',
        route: 'listings/index',
    }
]);
```

Create urls.

```javascript
// $.Url(route, params);

var url1 = $.Url('listings/index', {
    make: 'proton',
    model: 'saga',
    variant: 'blm',
    vehicle_type: 'mcycle',
});
console.log(url1); // motorbike/proton/saga/blm/

var url2 = $.Url('listings/index', {
    make: 'proton',
    model: 'saga',
    variant: 'blm'
});
console.log(url2); // proton/saga/blm/
```

If given route is not found, returns all params.

```javascript
var url3 = $.Url('book/article', {
    category: 'cooking',
    title: 'this-is-title',
    id: 12345678
});
console.log(url3); // category=cooking&title=this-is-title&id=12345678
```
