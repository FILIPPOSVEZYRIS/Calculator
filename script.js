const display = document.querySelector('input');
const buttons = document.querySelectorAll('.button');

console.log(buttons);

for(const button of buttons){
    button.addEventListener("click",()=>{
        const value=button.id;
        if(value==='C'){
            display.value='';
        }else if(value==="del"){
            display.value=display.value.slice(0,-1);
        }else if(value==="%"){
            display.value=display.value+"%"
        }else if(value==="/"){
            display.value=display.value+"/"
        }else if(value==="*"){
            display.value=display.value+"*";
        }else if(value==="-"){
            display.value=display.value+"-";
        }else if(value==="+"){
            display.value=display.value+"+";
        }else if(value==="="){
            try {
                // Η συνάρτηση eval() εκτελεί τον κώδικα ως μαθηματική πράξη
                display.value = eval(display.value);
            } catch (error) {
                // Αν ο χρήστης βάλει κάτι άκυρο (π.χ. 5++5), βγάζουμε σφάλμα
                display.value = 'Error';
            }
        }else{
            display.value=display.value+value;
        }
    });
}
