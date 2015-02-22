# insert-sql-generator [![Build Status](https://secure.travis-ci.org/kessler/insert-sql-generator.png?branch=master)](http://travis-ci.org/kessler/insert-sql-generator)

creates generic sql insert queries from javascript objects

## Install
```
npm install insert-sql-generator
```

## Examples

### Simple case
```
var insertQuery = require('insert-sql-generator')

var object = {
    a: 1,
    b: 'foo',
    c: true
}

var result = insertQuery('myTable', object)

// prints INSERT INTO myTable (a,b,c) VALUES (?,?,?)
console.log(result.query)

// prints 1,'foo',true
console.log(result.values)

```

### Restrict fields
```
var insertQuery = require('insert-sql-generator')

var object = {
    a: 1,
    b: 'foo',
    c: true
}

result = insertQuery('myTable', object, ['a', 'b'])

// prints INSERT INTO myTable (a,b) VALUES (?,?)
console.log(result.query)

// prints 1,'foo'
console.log(result.values)

```

### Static custom value placeholder
```
var insertQuery = require('insert-sql-generator')

var object = {
    a: 1,
    b: 'foo',
    c: true
}

var result = insertQuery('myTable', object, '%')

// prints INSERT INTO myTable (a,b,c) VALUES (%,%,%)
console.log(result.query)

// prints 1,'foo',true
console.log(result.values)

```


### Dynamic custom value placeholder
```
var insertQuery = require('insert-sql-generator')

var object = {
    a: 1,
    b: 'foo',
    c: true
}

var result = insertQuery('myTable', object, function(i) {
    return '%' + (i + 1)
})

// prints INSERT INTO myTable (a,b,c) VALUES (%1,%2,%3)
console.log(result.query)

// prints 1,'foo',true
console.log(result.values)

```