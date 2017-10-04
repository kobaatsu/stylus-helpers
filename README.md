# stylus helpers

[![npm version](https://badge.fury.io/js/stylus-helpers.svg)](https://badge.fury.io/js/stylus-helpers)


## これは何をするものですか

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

## 使い方

使用したいstylusファイルの先頭で `@import` するのが簡単でいいと思います。

```stylus
@import "path/node_modules/stylus-helpers/helper"
```

## 主な機能

### media query

現在 `bootstrap3.x` に合わせた4段階のmedia queryを採用しています。

- xs
- sm
- md
- lg

### mixin

#### ratio(x, v, h)

横幅と縦横比を指定することで長方形（デフォルトで正方形）を作ります。  
擬似要素 `::after` のパディングを使って無理やり高さを出すやり方ですので、`::after` とは併用できません。

`position: relative;` が指定されます。内容物に `position: absolute;` などを指定して使用します。

```stylus
.hd
  ratio(100%, 16, 9)
  // レスポンシブな 16:9 の長方形を作ります
.square
  ratio()
  // レスポンシブな正方形を作ります
```

## build

`npm install` 後、 `npm run build` します。
