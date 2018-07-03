# word-abuse
abuse word filter and replace algorithm using trie and FDA

# Install

```
$npm install word-abuse
```

# Usage

```
const Abuse = require('word-abuse');
const abuse = new Abuse({
    path:"./consts/abuse/",                     //relative address(compare to process.cwd()) to abuse words files folder
    ignore_path:"./consts/meaningless/"         //relative address(compare to process.cwd()) to meaningless symbol files folder
});

let words_to_filter = "王@蜜&桃和王$*尼&&玛一起参加暴走大事件";         //abuse words are "王蜜桃", "王尼玛" and "大事件"

let words_after_filter = abuse.findWordInStr(word, 0);                  //"*@*&*和*$**&&*一起参加暴走***"

```