const printRed = (text:string) => {
    console.log('\x1b[31m%s\x1b[0m', `${text} \n`);  
}


const Utility = {
    printRed
}

export default Utility;