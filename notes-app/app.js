
const chalk=require('chalk');
const { truncateSync } = require('fs');
const yargs=require('yargs');

yargs.version("1.1.0")

//Create a new note
yargs.command({
    command:"add",
    builder:{
title:{
    describe:"Note Title",
    demandOption:true,
    type:'string'
}
    },
    description:"add a new note",
    handler:function(argv){
        console.log("adding a new note!",argv);
    }
})

//create remove note

yargs.command({
    command:"remove",
    description:"add a new note",
    handler:function(){
        console.log("removing the note!");
    }
})

yargs.command({
    command:"list",
    description:"list note",
    handler:function(){
        console.log("reading the note");
    }
})

yargs.command({
    command:"read",
    description:"reading note",
    handler:function(){
        console.log("reading the note");
    }
})
//add,remove,read,list
yargs.parse();