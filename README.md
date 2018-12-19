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


## インストールと使い方

### インストール

[npm](https://www.npmjs.com/package/stylus-helpers) からインストールしてください。

```console
$npm i -D stylus-helpers
```

### 使い方

使用したいstylusファイルの先頭で `@import` するのが簡単でいいと思います。

```stylus
@import "path/node_modules/stylus-helpers/helper"
```

## ブレークポイント・閾値の設定

デフォルトで 4段階のmedia queryを採用しています。  

- `xs` : 0 - 767.98px
- `sm` : 768px - 991.98px
- `md` : 992px - 1199.98px
- `lg` : 1200px -

これをたとえば、`bootstrap4.x` にあわせた5段階のmedia queryにする場合、`helper.styl`を読み込む前に`_shBreakPoint`の名前でhashでそれぞれの識別子に対応する上限値を指定します。

```stylus
_shBreakPoint = {
  xs: 576
  sm: 768
  md: 992
  lg: 1200
  xl: Infinity
}
@import "path/node_modules/stylus-helpers/helper"
```

また、現在最大値は次段階の下限値から0.02pxを差し引いたものになっていますが、これをbootstrap3.xに合わせて1px差にする場合、 `_threshold` の名前で数値を設定します。

```
_threshold = 1
@import "path/node_modules/stylus-helpers/helper"
```

現在、*xs ~ xl の5段階にしか対応していません。*

## 主な機能

### 略記

よく使うcssルールの組み合わせを略記できます。

#### source

```stylus
.hoge
  db()
  flr()
  por()

```

#### yield

```css
.hoge {
  display: block;
  float: right;
  position: relative;
}
```

### 値指定略記

数値などを指定するルールを簡単に書けます。

#### source

```stylus
.hoge
  h 20
  w 40%
  m()
```

#### yield

```css
.hoge {
  height: 20px;
  width: 40%;
  margin: auto;
}
```

cssルールによっては単位やキーワードが補完されます。


### media queryの略記

上記の略記ルールに、media queryの識別子`(xs / sm / md / lg / (xl))`をpostfixとして組み合わせて使います。

#### source

```stylus
.hoge
  t 50
  t-sm 20
```

#### yield

```css
.hoge {
  top: 50px;
}

@media (min-width:768px) and (max-width: 991px) {
  .hoge {
    top: 20px;
  }
}
```

### media query を Block mixins として使用

stylus の標準記法 [Block mixins](http://stylus-lang.com/docs/mixins.html#block-mixins) としてmedia queryを使用できます。

#### source

```stylus
.hoge
  width 100px  
  +xs()
    width 50px
```

#### yield

```css
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

#### source

```stylus
.hoge
  // (下限)-(上限)で指定します
  +sm-md()
    width 100px
```

#### yield

```css
.hoge {
  width: 100px;
}

@media (min-width:768px) and (max-width: 1199px) {
  .hoge {
    width: 100px;
  }
}
```

### その他のmixin

#### fvc(align-item-keyword, flex flug)

flexコンテナを作り、内容物を天地中央に配置します。
`align-item-keyword` を指定することで内容物の位置も指定できます。
第2引数に`false`を指定すると`display: inline-flex`になります。デフォルト(無指定)は`display: flex`です。

#### lhx(fontSize, lineHeight) / lhx-\[xs|sm|md|lg|xl\](fontSize, lineHeight)

カンプ内でフォントサイズと、行間がともにピクセルなどで指定されているときに`line-height`を算出します。

メディアクエリを表す接尾辞をつけることもできます。

##### source

```stylus
.hoge
  // 単位は無視されますが、計算上揃える必要があります。
  lhx-xs(24px, 40px)
```

##### yield

```css
@media (max-width: 767.98px) {
  .hoge {
    line-height: 1.67;
  }
}
```

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

#### rfz(baseFontSize, baseWindowWidth) / rfz-\[xs|sm|md|lg|xl\](baseFontSize, baseWindowWidth)

特定のウインドウサイズ(=`baseWindowWidth`)におけるフォントサイズ(=`baseFontSize`)を指定することで、画面サイズの変更にあわせてほぼ同じ見た目で表示する`vw`単位指定でのフォントサイズに変換します。

メディアクエリを表す接尾辞をつけることもできます。

##### source

```stylus
.hoge
  // iPhone6サイズのカンプで20pxで指定されていたフォント
  rfz-xs(20, 375)
```

##### yield

```css
@media (max-width: 767.98px) {
  .hoge {
    font-size: 5.3vw;
  }
}
```

### 略記一覧

引数の指定 `()` の前にmedia queryを示す接尾辞 `-xs` `-sm` `-md` `-lg` `(-xl)` をつけることで、それぞれ対応する条件にのみ適用されるようになります。

#### 値固定

| 略記 | 展開されるプロパティ | 値 |
|-|-|-|
| aib() | align-items | baseline |
| aic() | align-items | canter |
| aife() | align-items | flex-end |
| aifs() | align-items | flex-start |
| aie() | align-items | flex-end |
| ais() | align-items | flex-start |
| bdn() | border            | none          |
| bdtn()| border-top        | none          |
| bdrn()| border-right      | none          |
| bdbn()| border-bottom     | none          |
| bdln()| border-left       | none          |
| bgn() | background        | none          |
| bgrn()| background-repeat | none          |
| bgszc()| background-size   | cover         |
| clb() | clear             | both          |
| clr() | clear             | right         |
| cll() | clear             | left          |
| cln() | clear             | none          |
| db()  | display           | block         |
| df()  | display           | flex          |
| di()  | display           | inline        |
| dib() | display           | inline-block  |
| dif() | display           | inline-flex   |
| dli() | display           | list-item     |
| dn()  | display           | none          |
| dtb() | display           | table         |
| dtbc()| display           | table-cell    |
| dtbcl()| display           | table-column  |
| dtbr()| display           | table-row     |
| flr() | float             | right         |
| fll() | float             | left          |
| fln() | float             | none          |
| fxdc() | flex-direction | column |
| fxdcr() | flex-direction | column-reverse |
| fxdr() | flex-direction | row |
| fxdrr() | flex-direction | row-reverse |
| fxwn()| flex-wrap         | nowrap        |
| fxww()| flex-wrap         | wrap          |
| fxwwr()| flex-wrap         | wrap-reverse  |
| fwb() | font-weight       | bold          |
| fwn() | font-weight       | normal        |
| jcc() | justify-content   | center        |
| jcfe()| justify-content   | flex-end      |
| jcfs()| justify-content   | flex-start    |
| jcsa()| justify-content   | space-around  |
| jcsb()| justify-content   | space-between |
| lisn()| list-style        | none          |
| oln() | outline           | none          |
| ova() | overflow          | auto          |
| ovh() | overflow          | hidden        |
| ovs() | overflow          | scroll        |
| ovv() | overflow          | visible       |
| ovxa()| overflow-x        | auto          |
| ovxh()| overflow-x        | hidden        |
| ovxs()| overflow-x        | scroll        |
| ovxv()| overflow-x        | visible       |
| ovya()| overflow-y        | auto          |
| ovyh()| overflow-y        | hidden        |
| ovys()| overflow-y        | scroll        |
| ovyv()| overflow-y        | visible       |
| poa() | position          | absolute      |
| pof() | position          | fixed         |
| por() | position          | relative      |
| pos() | position          | static        |
| poen()| pointer-events    | none          |
| tac() | text-align        | center        |
| tal() | text-align        | left          |
| tar() | text-align        | right         |
| tdl() | text-decoration   | line-through  |
| tdn() | text-decoration   | none          |
| tdo() | text-decoration   | overline      |
| tdu() | text-decoration   | underline     |
| vasup()| vertical-align    | super         |
| vat() | vertical-align    | top           |
| vatt()| vertical-align    | text-top      |
| vam() | vertical-align    | middle        |
| vabl()| vertical-align    | baseline      |
| vab() | vertical-align    | bottom        |
| vatb()| vertical-align    | text-bottom   |
| vasub()| vertical-align    | sub           |
| vh()  | visibility        | hidden        |
| vv()  | visibility        | visible       |
| wsn() | white-space       | normal        |
| wsnw()| white-space       | nowrap        |
| wsp() | white-space       | pre           |


#### 値指定

| 略記| 展開されるプロパティ | デフォルト | 自動単位付与(px) |
|-|-|-|-|
| bgsz(args) | background-size     | auto    | true     |
| bgc(color)  | background-color | transparent |         |
| bgi(image)  | background-image |         |         |
| bgp(args)  | background-potion | center center |         |
| fz(n)   | font-size           |         | true     |
| c(color)    | color               |         |          |
| ls(n)   | letter-spacing      |         | true     |
| lh(n)   | line-height         |         |          |
| cnt(content)  | content             | none    |          |
| m(args)   | margin         | auto    | true     |
| mt(n)   | margin-top          | auto    | true     |
| mr(n)   | margin-right        | auto    | true     |
| mb(n)   | margin-bottom       | auto    | true     |
| ml(n)   | margin-left         | auto    | true     |
| mx(n)   | margin-right / margin-left         | auto    | true     |
| p(args)    | padding             |         | true     |
| pt(n)   | padding-top         |         | true     |
| pr(n)   | padding-right       |         | true     |
| pb(n)   | padding-bottom      |         | true     |
| pl(n)   | padding-left        |         | true     |
| px(n)   | padding-right / padding-left         |      | true     |
| t(n)    | top                 | auto    | true     |
| r(n)    | right               | auto    | true     |
| b(n)    | bottom              | auto    | true     |
| l(n)    | left                | auto    | true     |
| w(n)    | width               | auto    | true     |
| h(n)    | height              | auto    | true     |
| bdrs(args) | border-radius       | 0       | true     |
| bd(args)   | border              |         |          |
| bdw(n)  | border-width        |         | true     |
| bds(keyword)  | border-style        | solid   |          |
| bdc(color)  | border-color        |         |          |
| bdt(n)  | border-top          |         |          |
| bdtw(n) | border-top-width    |         | true     |
| bdts(keyword) | border-top-style    | solid   |          |
| bdtc(color) | border-top-color    |         |          |
| bdr(n)  | border-right        |         |          |
| bdrw(n) | border-right-width  |         | true     |
| bdrst(keyword)| border-right-style  | solid   |          |
| bdrc(color) | border-right-color  |         |          |
| bdb(n)  | border-bottom       |         |          |
| bdbw(n) | border-bottom-width |         | true     |
| bdbs(keyword) | border-bottom-style | solid   |          |
| bdbc(color) | border-bottom-color |         |          |
| bdl(n)  | border-left         |         |          |
| bdlw(n) | border-left-width   |         | true     |
| bdls(keyword) | border-left-style   | solid   |          |
| bdlc(color) | border-left-color   |         |          |
| maw(n)  | max-width           | none    | true     |
| mah(n)  | max-height          | none    | true     |
| miw(n)  | min-width           |         | true     |
| mih(n)  | min-height          |         | true     |
| trbl(args) | top: args[0] / right: args[1] / bottom: args[2] / left: args[3] | auto | true |
| trf(args) | transform |  |  |
| trfr(args) | transform: rotate(args) |  | true(deg) |
| trfrx(d) | transform: rotateX(d) |  | true(deg) |
| trfry(d) | transform: rotateY(d) |  | true(deg) |
| trfrz(d) | transform: rotateZ(d) |  | true(deg) |
| trfsc(args) | transform: scale(args) |  |  |
| trfscx(n) | transform: scaleX(n) |  |  |
| trfscy(n) | transform: scaleY(n) |  |  |
| trfscz(n) | transform: scaleZ(n) |  |  |
| trfsk(args) | transform: skew(args) |  | true(deg) |
| trfskx(d) | transform: skewX(d) |  | true(deg) |
| trfsky(d) | transform: skewY(d) |  | true(deg) |
| trft(args) | transform: translate(args) |  | true |
| trftx(val) | transform: translateX(val) |  | true |
| trfty(val) | transform: translateY(val) |  | true |
| trftz(val) | transform: translateZ(val) |  | true |
| fx(args)   | flex                | 1       |          |
