// Object property shorthand

const name="adrew";
const userAge=27;

const user={
    name,
    age:userAge,
    location:"Boston"
}

//Object destructuring

const product={
    label:"Red notebook",
    price:3,
    stock:201,
    salePrice:undefined,
    rating:4.2
}

//const label=product.label;
//const stock=product.stock;

//const {label,stock,rating=5}=product
//console.log(label);
//console.log(stock);
//console.log(product);

const transaction=(type,{label,stock})=>{
    console.log(type,label,stock);
}

transaction('order',product)