[![npm version](https://badge.fury.io/js/stylus-helpers.svg)](https://badge.fury.io/js/stylus-helpers)

# これは何をするものですか

media queryやよくあるCSSルールの組み合わせをバカ正直に書くのが面倒くさいというズボラな人のための、stylus mixin集です。

```stylus
.foo
  // 透過方式で書いています
  sz 50
  sz-xs(30, 20)
```

```CSS
.foo {
  width: 50px;
  height: 50px;
}

@media (max-width: 767px) {
  .foo {
    width: 30px;
    height: 20px;
  }
}
```

このようにコンパイルされます。

コンパイルに際してはお好きな方法でどうぞ。

# 使い方

使用したいstylusファイルの先頭で `@import` するのが簡単でいいと思います。

```stylus
@import "./helper"
```

# 主な機能

## media query

現在 `bootstrap3.x` に合わせた4段階のmedia queryを採用しています。

- xs
- sm
- md
- lg

# build

`npm install` 後、 `npm run build` します。
