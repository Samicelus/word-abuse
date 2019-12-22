# word-abuse
abuse word filter and replace algorithm using trie and DFA

# Install

```
$npm install word-abuse
```

# Usage

```
const Abuse = require('word-abuse');
const abuse = new Abuse({
    path:"./consts/abuse/",
    //relative address(compare to process.cwd()) to abuse words files folder
    ignore_path:"./consts/meaningless/"
    //relative address(compare to process.cwd()) to meaningless symbol files folder
});
//or use const abuse = new Abuse() to use default word dictionary included in the module

let words_to_filter = "王@蜜&桃和王$*尼&&玛一起参加暴走大事件";
//abuse words are "王蜜桃", "王尼玛" and "大事件"

let words_after_filter = abuse.findWordInStr(words_to_filter, 0);
//"*@*&*和*$**&&*一起参加暴走***"

```

- abuse words dictionary are stored in *.txt files like this:

```
王蜜桃
王尼玛
暴走漫画
大事件
```
- meaningless symbol are stored in *.txt files like this:

```

@
#
$
%
^
&
*
￥
……
!
！
,
，
.
。
|
```
