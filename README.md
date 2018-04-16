# Basic Nullable Implementation for Javascript

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/9a4570070ef04d25ad21fe3c15b11171)](https://app.codacy.com/app/el-shinnaweyom/Javascript-Nullable?utm_source=github.com&utm_medium=referral&utm_content=Omar-Elshinnawey/Javascript-Nullable&utm_campaign=badger)
[![Known Vulnerabilities](https://snyk.io/test/github/omar-elshinnawey/javascript-nullable/badge.svg?targetFile=package.json)](https://snyk.io/test/github/omar-elshinnawey/javascript-nullable?targetFile=package.json)

## Table of Contents
* [Installation](#installation)
* [Optional Class](#OptionalClass)
    * [ofNullable(value)](#ofNullable)
    * [empty()](#empty)
    * [isDefined()](#isDefined)
    * [isNotNull()](#isNotNull)
    * [isPresent()](#isPresent)
    * [ifPresent(fn)](#ifPresent)
    * [ifPresentOrElse(fn, elseFn)](#ifPresentOrElse)
    * [getOrElse(fnOrVal)](#getOrElse)
    * [get()](#get)
    * [map(fn)](#map)
    * [flatMap(fn)](#flatMap)
    * [filter(fnOrVal)](#filter)

## Installation <a name="installation" />
```
npm install --save optionull
```

## Optional Class <a name="OptionalClass" />
```javascript
const Optional = require('optionull').Optional;
// or
const { Optional } = require('optionull');
// or
import { Optional } from 'optionull';
```

### ofNullable(value) <a name="ofNullable" />
Creates and returns a new optional with the value provided.
```javascript
const opt = Optional.ofNullable('somevalue');

//this is basically an empty optional.
const nullOpt = Optional.ofNullable(null);
```
### empty() <a name="empty" />
Creates and returns a new optional with empty value.
```javascript
const emptyOpt = Optional.empty();
```
### isDefined() <a name="isDefined" />
Returns true if the value is defined.
```javascript
opt.isDefined(); // true
nullOpt.isDefined(); // also true

emptyOpt.isDefined(); // false
Optiona.ofNullable(undefined).isDefined(); // false
```
### isNotNull() <a name="isNotNull" />
Returns true if the value is not null.
```javascript
opt.isNotNull(); // true
nullOpt.isNotNull(); // false

emptyOpt.isNotNull(); // true
Optiona.ofNullable(undefined).isNotNull(); // true
```

### isPresent() <a name="isPresent" />
Returns true if the value defined and not null.
```javascript
opt.isPresent(); // true
nullOpt.isPresent(); // false

emptyOpt.isPresent(); // false
Optiona.ofNullable(undefined).isPresent(); // false
```

### ifPresent(fn) <a name="ifPresent" />
Calls the function fn if the value is present.
```javascript
opt.ifPresent(val => console.log(val)); // prints 'somevalue' in the console

emptyOpt.ifPresent(val => console.log(val)); // nothing happens
```

### ifPresentOrElse(fn, elseFn) <a name="ifPresentOrElse" />
Calls the function fn if the value is present, otherwise calls the function elseFn.
```javascript
opt.ifPresentOrElse(
    val => console.log('found'),
    () => console.log('not found')
); // prints 'found' in the console

emptyOpt.ifPresentOrElse(
    val => console.log('found'),
    () => console.log('not found')
); // prints 'not found' in the console
```

### getOrElse(fnOrVal) <a name="getOrElse" />
Returns the value if present. Otherwise returns the value of fnOrVal.
```javascript
opt.getOrElse(() => 'someother value'); // returns 'somevalue'

emptyOpt.getOrElse('someother value'); // returns 'someother value'
emptyOpt.getOrElse(() => 'someother value'); // returns 'someother value'
```

### get() <a name="get" />
Returns the value of the optional. (Could be null or undefined)
```javascript
opt.get(); // 'somevalue'
emptyOpt.get(); // undefined
nullOpt.get(); // null
```

### map(fn) <a name="map" />
If the value is present, applies the mapping function and returns its result wrapped in a new optional. Returns empty optional otherwise.
```javascript
opt.map(val => val.length).get(); // 9
opt.get(); // 'somevalue' (note the original optional did not change)

emptyOpt.map(val => val.length).isPresent(); // false 
```

### flatMap(fn) <a name="flatMap" />
If the value is present, applies the mapping function then if the function returns optional the optional is returned else the result is wrapped in a new optional and returned. Return empty optional if the value is not present.
```javascript
opt.flatMap(val => val.length).get(); // 9
opt.flatMap(val => Optional.ofNullable(val.length)).get(); // 9
```

### filter(fnOrVal) <a name="filter" />
Returns the value wrapped in a new optional if the value is preset and the value matches the parameter or the parameter function returns truthy value.
Returns an empty optional if the value is not present or the parameter function returns a falsy value or the value did not match the paramter.
```javascript
opt.filter('somevalue').get(); // somevalue
opt.filter(val => val === 'somevalue').get(); // somevalue
opt.filter('something else').isPresent(); // false
opt.filter(val => val.length === 1).isPresent(); //false
```
