# any-each-or-map

支持具有 Iterator 接口的数据结构或 Object 的 each 或 map

## Installment

```
 npm install any-each-or-map --save
```

## Documentation

### eachIteratorOrObject

支持具有 Iterator 接口的数据结构或 Object 的遍历，相当于 forEach 的增强

#### Usage

```js
import { eachIteratorOrObject } from 'any-each-or-map'

eachIteratorOrObject({a: 1, b: 2, c: {a: 1, b: 2}}, function(key, value, source){
  console.log(key, value, source);
})

eachIteratorOrObject(['a','b','c','b'], function(key, value, source){
  console.log(key, value, source);
})

eachIteratorOrObject('hello', function(key, value, source){
  console.log(key, value, source);
})

// 除以上 array、string 外，还支持 nodeLst、Map、set 等所有具有 Iterator 接口的遍历，底层使用 for of
// object 不具备 Iterator 接口，故底层使用了 for in 进行遍历的，同时仅遍历自身属性
```
### mapIteratorOrObject

支持具有 Iterator 接口的数据结构或 Object 的 map，相当于 map 的增强

```js
import { mapIteratorOrObject } from 'any-each-or-map'

const source = 'hello';
const mapSource = mapIteratorOrObject(source, (key, value) => {
  if (key === 0) {
    return 'a';
  }

  return value;
})

console.log('source', source); // hello
console.log('mapSource', mapSource); // aello

const source2 = {a: 1, b: {a:1}};
const mapSource2 = mapIteratorOrObject(source2, (key, value) => {
  if (key === 'b') {
    return 'b';
  }

  return value;
})

console.log('source', source2); // {a: 1, b: {a: 1}}
console.log('mapSource', mapSource2); // {a: 1, b: 'b'}

const source3 = [1,2,3];
const mapSource3 = mapIteratorOrObject(source3, (key, value) => {
  return value + 1;
})

console.log('source', source3); // [1, 2, 3]
console.log('mapSource', mapSource3); // [2, 3, 4]
```
