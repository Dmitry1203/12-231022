export async function saveDrawerState (status){
    localStorage.setItem("DOGS MENU STATUS", status);
}

// вернет true в текстовом виде если норм, поэтому в кавычках
export async function getDrawerState (status){
    return localStorage.getItem("DOGS MENU STATUS") === "true";
}