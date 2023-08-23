
const chalk=require('chalk');

console.log(chalk.green.bold.italic("Success!"));


command=process.argv[2];

if(command == "add"){
    console.log("adding notes");
}else if(command == "remove"){
console.log("Removing Notes");
}