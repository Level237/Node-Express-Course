//
// Goal : Create method to get incomplete task
//
// 1- Define getTasksTodo method
// 2-Use filter to return just the incomplete task (arrow function)
// 3. Test your work by running the script

const tasks={
    tasks:[
        {
            text:"Grocery shopping",
            completed:true
        },{
            text:'Clean yard',
            completed:false
        },{
            text:"File course",
            completed:false
        }
    ],
    getTasksTodo(){

        return this.tasks.filter((task)=>task.completed===false)
    }
}

console.log(tasks.getTasksTodo());