# stylus helpers

[![npm version](https://badge.fury.io/js/stylus-helpers.svg)](https://badge.fury.io/js/stylus-helpers)


## これは何をするものですか

media queryやよくあるCSSルールの組み合わせをバカ正直に書くのが面倒くさいというズボラな人のための、stylus mixin集です。

```stylus
.hoge
  // 透過方式で書いています
  sz 50
  sz-xs(30, 20)
```

```CSS
.hoge {
  width: 50px;
  height: 50px;
}

@media (max-width: 767px) {
  .hoge {
    width: 30px;
    height: 20px;
  }
}
```

このようにコンパイルされます。

コンパイルに際してはお好きな方法でどうぞ。


## インストール

[npm](https://www.npmjs.com/package/stylus-helpers) からインストールしてください。

```
npm i -D stylus-helpers
```

## 使い方

### インポート

使用したいstylusファイルの先頭で `@import` するのが簡単でいいと思います。

```stylus
@import "path/node_modules/stylus-helpers/helper"
```

## 主な機能

### 略記ルール

よく使うcssルールを略記できます。基本的な書き方は [emmet](https://emmet.io/) に準拠しています。(現時点で全部カバーしているわけではありません...)

#### 数値を指定するもの

##### source
```
.hoge
  h 20
  w 40%
  m()
```

##### yield
```
.hoge {
  height: 20px;
  width: 40%;
  margin: auto;
}
```

単位を省略した場合 `px` が付与されます(`line-height`など除く)。数値も省略した場合、`auto` が指定されます。

##### よくある組み合わせの略記

##### source
```
.hoge
  db()
  flr()
  por()

```
##### yield
```
.hoge {
  display: block;
  float: right;
  position: relative;
}
```

### media query

現在 `bootstrap3.x` に合わせた4段階のmedia queryを採用しています。  
`src/config/config.styl` を編集することで変更できます。

- xs  
0 - 767px
- sm  
768px - 991px
- md  
992px - 1199px
- lg  
1200px -

#### 基本的な使い方
略記ルールと組み合わせて使えます。

##### source
```
.hoge
  t 50
  t-sm 20
```

##### yield
```
.hoge {
  top: 50px;
}

@media (min-width:768px) and (max-width: 991px) {
  .hoge {
    top: 20px;
  }
}
```

#### Block mixins として使用

stylus の標準記法 [Block mixins](http://stylus-lang.com/docs/mixins.html#block-mixins) として使用できます。

##### source
```
.hoge
  width 100px  
  +xs()
    width 50px
```

##### yield
```
.hoge {
  width: 100px;
}

@media (max-width: 767px) {
  .hoge {
    width: 50px;
  }
}
```

Block mixins として使用する場合、media queryを組み合わせて上限・下限を指定することもできます。

##### source
```
.hoge
  // (下限)-(上限)で指定します
  +sm-md()
    width 100px
```

##### yield
```
.hoge {
  width: 100px;
}

@media (min-width:768px) and (max-width: 1199px) {
  .hoge {
    width: 100px;
  }
}
```

### mixin

#### ratio(x, h, v)

横幅と縦横比(h:v)を指定することで長方形（デフォルトで正方形）を作ります。  
擬似要素 `::after` のパディングを使って無理やり高さを出すやり方ですので、`::after` とは併用できません。  
参考: [レスポンシブデザインで要素の縦横比を固定する](https://toduq.com/responsive-ratio/) [可変幅で正方形](https://codepen.io/kobaatsu/pen/zvvEzo)

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
