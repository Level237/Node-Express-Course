// Common,every file is module (by default)
// Modules -Encapsuled Code (only share minimum)
const names=require('./4-names')
const sayHi=require('./5-utils')



sayHi('susan')
sayHi(names.john)
sayHi(names.peter)