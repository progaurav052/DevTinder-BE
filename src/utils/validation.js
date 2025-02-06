const validator =require("validator");

const isValidated =(req)=>{

    //this is redudandant API validation 
    //using this for signup
    const {firstName,lastName,emailId,password}=req.body;
    //i have to validate this fields
    if(!firstName || !lastName)
    {
        throw new Error("Specify firstname and Lastname!!!");

    }
    if(!validator.isEmail(emailId))
    {
      throw new Error("Invalid email !!!");

    }
    
}

module.exports ={
    isValidated,
}