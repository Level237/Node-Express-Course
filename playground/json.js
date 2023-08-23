const fs=require('fs')

//const book={
    //title:"Egos is my enemy",
    //author:"level"
//}
//const bookJson=JSON.stringify(book);
//fs.writeFileSync('json.json',bookJson)

const dataBuffer=fs.readFileSync('json.json');
const dataJson=dataBuffer.toString();
const data=JSON.parse(dataJson)
console.log(data);