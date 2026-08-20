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
        }else if(value==="="){
            try {
                let text = display.value;
                let operator = "";
                
                if (text.includes("+")) operator = "+";
                else if (text.includes("-")) operator = "-";
                else if (text.includes("*")) operator = "*";
                else if (text.includes("/")) operator = "/";
                else if (text.includes("%")) operator = "%";

                if (operator !== "") {
                    display.value = operation(text, operator);
                }
            } catch (error) {
                display.value = 'Error';
            }
        } else {
            let len=display.value.length-1;
            const operators = "+-*/%";
            if (operators.includes(display.value[len]) && operators.includes(value)) {
                display.value = display.value.slice(0, -1) + value;
            } else {
                display.value = display.value + value;
            } 
        }
        
    });
}

function operation(text) {
    // 1. TOKENIZATION: Χωρίζουμε το κείμενο σε αριθμούς και σύμβολα
    let tokens = [];
    let currentNumber = "";
    const operators = "+-*/%";

    for (let i = 0; i < text.length; i++) {
        let char = text[i];

        if (operators.includes(char)) {
            // Ελέγχουμε αν είναι πρόσημο αρνητικού αριθμού (π.χ. στην αρχή ή μετά από άλλη πράξη)
            if (char === "-" && (i === 0 || operators.includes(text[i - 1]))) {
                currentNumber += char;
            } else {
                tokens.push(Number(currentNumber)); // Αποθηκεύουμε τον αριθμό
                tokens.push(char);                  // Αποθηκεύουμε το σύμβολο
                currentNumber = "";                 // Μηδενίζουμε για τον επόμενο αριθμό
            }
        } else {
            currentNumber += char;
        }
    }
    tokens.push(Number(currentNumber)); // Βάζουμε και τον τελευταίο αριθμό

    // 2. ΠΡΩΤΟ ΠΕΡΑΣΜΑ: Πολλαπλασιασμοί και Διαιρέσεις
    for (let i = 0; i < tokens.length; i++) {
        let item = tokens[i];
        if (item === "*" || item === "/" || item === "%") {
            let num1 = tokens[i - 1];
            let num2 = tokens[i + 1];
            let result;

            if (item === "*") result = num1 * num2;
            else if (item === "/") {
                if (num2 === 0) return "Error"; // Προστασία διαίρεσης με το 0
                result = num1 / num2;
            }
            else if (item === "%") result = num1 % num2;

            // Η μέθοδος splice αφαιρεί 3 στοιχεία και βάζει στη θέση τους το αποτέλεσμα
            tokens.splice(i - 1, 3, result);
            i = i - 1; // Γυρνάμε τον δείκτη ένα βήμα πίσω αφού ο πίνακας μίκρυνε
        }
    }

    // 3. ΔΕΥΤΕΡΟ ΠΕΡΑΣΜΑ: Προσθέσεις και Αφαιρέσεις
    let total = tokens[0];
    for (let i = 1; i < tokens.length; i += 2) {
        let op = tokens[i];
        let nextNum = tokens[i + 1];

        if (op === "+") total += nextNum;
        else if (op === "-") total -= nextNum;
    }

    return total;
}