
const chalk=require('chalk');
const { truncateSync } = require('fs');
const yargs=require('yargs');
const notes=require('./notes.js');


yargs.version("1.1.0")

//Create a new note
yargs.command({
    command:"add",
    builder:{
title:{
    describe:"Note Title",
    demandOption:true,
    type:'string'
},
body:{
    description:"Node Body",
    demandOption:true,
    type:"string"
}
    },
    description:"add a new note",
    handler:(argv)=>{
        notes.addNotes(argv.title,argv.body);
    }
})

//create remove note

yargs.command({
    command:"remove",
    description:"remove note",
    builder:{
title:{
    describe:"Note Title",
    demandOption:true,
    type:'string'
}
    },
    handler:(argv)=>{
        notes.removeNote(argv.title)
    }
})

yargs.command({
    command:"list",
    description:"list note",
    handler:()=>{
        notes.listNotes();
    }
})

yargs.command({
    command:"read",
    description:"reading note",
    builder:{
        title:{
            describe:"Note Title",
            demandOption:true,
            type:'string'
        }},
    handler:(argv)=>{
        notes.readNote(argv.title);
    }
})
//add,remove,read,list
yargs.parse();