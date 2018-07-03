const Abuse = require('../index.js');
const abuse = new Abuse({
    path:'./test/const/abuse',
    ignore_path:'./test/const/meaningless'
});

let str = '王$#尼&玛和王&蜜@@桃是一对儿';
let str_filtered = abuse.findWordInStr(str.split(''), 0).join('');

console.log(`original string: ${str}`);
console.log(`string filtered: ${str_filtered}`);