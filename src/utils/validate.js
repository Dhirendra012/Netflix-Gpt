export const isCorrect = (email , password) => 
{
    const isEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    const isPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password);

    if(!isEmail){ return "Please Enter A Valid Email"; }
    if(!isPassword){ return "Please Enter A Strong Password"; }

    return null;
}