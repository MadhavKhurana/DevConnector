const Validator=require('validator')
const isEmpty =require('./is-empty.js')

const  validateRegisterInput=(data)=>{
    
    let errors={}
    
    if(!Validator.isLength(data.name),{min:2,max:30}){
        errors.name='Name must be betwwen 2 and 30 characters'
        
    }
    
    return{
        errors:errors,
        isValid:isEmpty(errors)
    }
}

module.exports=validateRegisterInput