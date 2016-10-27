# jQuery Create Url

## Basic Usage

Initiate global configurations.

```javascript
$.UrlConfig({
    'listings/index': '<make>/<model>'
});
```

Create urls.

```javascript
var url1 = $.Url('listings/index', {
    make: 'proton',
    model: 'saga'
});
console.log(url1); // proton/saga/

var url2 = $.Url('book/article', {
    category: 'cooking',
    title: 'this-is-title',
    id: 12345678
});
console.log(url2); // category=cooking&title=this-is-title&id=12345678
```
