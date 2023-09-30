export const validateEmail = (email) => {
    let verify = new RegExp(String.raw `^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$`);
    return verify.test(email)
}