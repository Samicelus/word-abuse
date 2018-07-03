const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const Trie = require('./data_structures/Trie.js');

class Abuse{
    constructor(config = {}){
        this.path = config.path;
        this.ignore_path = config.ignore_path;
        this.dictionary = [];
        this.trie = new Trie();
        this.meaningless = [];
        this.load_dictionary =  this.load_dictionary.bind(this);
        this.load_meaningless =  this.load_meaningless.bind(this);
        this.load_trie =  this.load_trie.bind(this);
        this.findWordInStr =  this.findWordInStr.bind(this);
        this.matchWord =  this.matchWord.bind(this);
        this.load_dictionary();
        this.load_meaningless();
        this.load_trie();
    }

    load_dictionary(){
        let that = this;
        let root = this.path?path.join(process.cwd(), this.path):path.join(__dirname, './default/abuse/');
        console.log(`loading abuse files from: ${root}`);
        let abuse_files = fs.readdirSync(root, 'utf8');
        abuse_files.forEach(async (filename)=>{
            let content = fs.readFileSync(path.join(root, filename),'utf-8');
            if(content){
                let content_arr = content.split(/\n|\r\n/);
                that.dictionary = _.union(that.dictionary, _.compact(content_arr));
            }
        });
        console.log(`dictionary loaded!`);
    }

    load_meaningless(){
        let that = this;
        const root = this.ignore_path?path.join(process.cwd(), this.ignore_path):path.join(__dirname, './default/meaningless/');
        console.log(`loading meaningless files from: ${root}`);
        const meaningless_files = fs.readdirSync(root, 'utf8');
        meaningless_files.forEach(async (filename)=>{
            let content = fs.readFileSync(path.join(root, filename),'utf-8');
            if(content){
                let content_arr = content.split(/\n|\r\n/);
                that.meaningless = _.union(that.meaningless, _.compact(content_arr));
            }
        });
        console.log(`meaningless loaded!`);
    }

    load_trie(){
        let that = this;
        this.dictionary.forEach((word)=>{
            that.trie.addWord(word);
        });
        console.log(`trie established!`);
    }

     findWordInStr(str, begin_index){
         "use strict";
         if(typeof str == "string"){
             str = str.split('');
         }
         if(str[begin_index]){
             let word = str[begin_index];
             let match_result = this.matchWord(word, str, begin_index, begin_index, []);
             if(match_result.result){
                 let last_index = match_result.last_index;
                 let replaced_index = match_result.replaced_index;
                 replaced_index.forEach((index)=>{
                     str.splice(index,1,"*");
                 });
                 if(str[last_index+1]){
                     return this.findWordInStr(str, last_index+1);
                 }else{
                     return str.join('');
                 }
             }else{
                 if(str[begin_index+1]){
                     return this.findWordInStr(str, begin_index+1);
                 }else{
                     return str.join('');
                 }
             }
         }else{
             return str.join('');
         }
     }

    matchWord(word, str, first_index, current_index, replaced_index){
        "use strict";
        let that = this;
        replaced_index.push(current_index);
        let suggestion = this.trie.suggestNextCharacters(word);
        if(suggestion === null){
            return {result: false}
        }
        if(Array.isArray(suggestion)){
            if(suggestion.length == 0){
                return {result: true, replaced_index:replaced_index, last_index:current_index, word_found:word}
            }else{
                let next_index = current_index+1;
                let next_char = str[next_index];
                if(next_char){
                    while(_.indexOf(that.meaningless, next_char)!= -1){
                        next_index += 1;
                        next_char = str[next_index];
                        if(!next_char){
                            return {result: false};
                            break;
                        }
                    }
                    if(_.indexOf(suggestion, next_char) != -1){
                        word += next_char;
                        return this.matchWord(word, str, first_index, next_index, replaced_index);
                    }else{
                        return {result:false};
                    }
                }else{
                    return {result: false}
                }
            }
        }
    }
}

module.exports =  Abuse;