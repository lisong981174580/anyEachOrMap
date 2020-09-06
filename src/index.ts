import { deepClone } from 'any-utils';

const CALLBACK = (key, value, source) => console.log('key', key, 'value', value, 'source', source);

export function eachIteratorOrObject(source, callback = CALLBACK) {
  if ((typeof source !== 'object' && typeof source !== 'string') || source === null) {
    throw new Error(`支持具有 Iterator 接口的数据结构或 Object，入参${source}不是`);
  }

  // 遍历支持 Iterator 接口的数据结构
  if (Array.isArray(source) || typeof source === 'string') {
    let key = 0;

    for(const value of source) {
      callback.call(null, key, value, source);

      key++;
    }

    return;
  }

  // 遍历对象
  for (let key in source) {
    if (source.hasOwnProperty(key)) {
      callback.call(null, key, source[key], source);
    }
  }
}

const MAP_CALLBACK = (key, value, source) => {
  console.log('key', key, 'value', value, 'source', source)

  return value;
};

export function mapIteratorOrObject(source, callback = MAP_CALLBACK) {
  if ((typeof source !== 'object' && typeof source !== 'string') || source === null) {
    throw new Error(`支持具有 Iterator 接口的数据结构，入参${source}不是`);
  }

  const mapSource = typeof source === 'string' ? [...source] : deepClone(source);

  // 遍历支持 Iterator 接口的数据结构
  if (Array.isArray(mapSource)) {
    let key = 0;

    for(const value of mapSource) {
      mapSource[key] = callback.call(null, key, value, mapSource);

      key++;
    }

    return typeof source === 'string' ? mapSource.join('') : mapSource;
  }

  // 遍历对象
  for (let key in mapSource) {
    if (mapSource.hasOwnProperty(key)) {
      mapSource[key] = callback.call(null, key, mapSource[key], mapSource);
    }
  }

  return mapSource;
}
