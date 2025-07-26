const validator =require("validator");

// req.body 

const validate = (data)=>{
   
    const mandatoryField = ['name', 'email', 'password', 'role'];

    const IsAllowed = mandatoryField.every((k)=> Object.keys(data).includes(k));

    if(!IsAllowed)
        throw new Error("Some Field Missing");

    if(!validator.isEmail(data.email))
        throw new Error("Invalid Email");

    if(!validator.isStrongPassword(data.password))
        throw new Error("Week Password");
}

module.exports = validate;

