




export const checkValidation = (email, password, fullName) => {

    const isEmailvalid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    const isPasswordvalid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

    if (fullName.current) {
        const isNameValid = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/.test(fullName.current.value);
        if (!isNameValid) return "Please Enter a Valid Name"
    }



    if (!isEmailvalid) return "Invalid Email Address";
    if (!isPasswordvalid) return "Invalid Password";

    return null;




}