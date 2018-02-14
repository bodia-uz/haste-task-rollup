# haste-task-rollup

## Instalation

```sh
> npm install git+ssh://git@github.com/bodia-uz/haste-task-rollup.git
```

## options

### configPath

Type: `string`

Path to a [rollup config](https://rollupjs.org/guide/en#configuration-files), the config can be a javascript object or a function that accepts an object of `configParams` and return an object.

```js
// ./rollup.config.js

module.exports = {
  input: './entry.js',
  output: {
    format: 'umd',
    file: 'bundle.js',
  }
};
```

#### configParams

Type: `object`

An object that will be passed to the config function in case it is actually a function.
Useful when you want to build your rollup config dynamically using cli arguments or configuration from the preset.

```js
// ./preset.js

rollup({ configPath: './rollup.config.function', configParams: { entry: './index.js'}});

// ./rollup.config.function.js

module.exports = configParams => ({
  input: configParams.entry,
  output: {
    format: 'umd',
    file: 'bundle.js',
  }
});
```
