const fs=require('fs');
const chalk=require('chalk')
const getNotes=()=>{

    return "Your notes...."
}

const addNotes=(title,body)=>{
    const notes=loadNotes();
    const duplicateNote=notes.find((note)=>note.title===title);
    
    debugger
    if(!duplicateNote){
        notes.push({
            title:title,
            body:body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse("New notes added"));
    }else{
        
        console.log(chalk.red.inverse("note title taken"));
    }
    
}

const saveNotes=function(notes){

    const dataJson=JSON.stringify(notes);
    fs.writeFileSync('notes.json',dataJson);

}
const loadNotes=()=>{

    try{
        const dataBuffer=fs.readFileSync('notes.json')
        const dataJson=dataBuffer.toString();
        
        return JSON.parse(dataJson);
    }catch(e){
return [];
    }

}

const listNotes=()=>{
    const notes=loadNotes();
    console.log(chalk.green.inverse("Your notes..."));
    notes.forEach((el)=>console.log(el.title))
   
}

const removeNote=(title)=>{

    const notes=loadNotes();

  const getNotes=notes.filter((note)=>note.title!==title)
  
  if(notes.length > getNotes.length){
    console.log(chalk.green.inverse('note removed!'));
    saveNotes(getNotes)
  }else{
    console.log(chalk.red.inverse('note not found!'));
  }

}

const readNote=(title)=>{
    const notes=loadNotes();

    const note=notes.find((note)=>note.title===title);
   if(note){
    console.log(chalk.inverse(note.title));
    console.log(note.body);
   }else{
    console.log(chalk.red.inverse('Not found'));
   }
}

module.exports={
    addNotes:addNotes,
    getNotes:getNotes,
    removeNote:removeNote,
    listNotes:listNotes,
    readNote:readNote
};