// Declaram o variabila pentru stocarea rezultatului curent al calculelor
let runningTotal = 0;

// Declaram o variabila pentru stocarea temporara a valorii introduse de utilizator
let buffer = "0";

// Declaram o variabila pentru stocarea operatorului matematic precedent
let previousOperator;

// Selectam elementul din HTML care reprezinta ecranul calculatorului
const screen = document.querySelector(".screen");

// Functia care este apelata atunci cand se apasa un buton pe calculator
function buttonClick(value) {
    // Verificam daca valoarea este un simbol sau o cifra
    if (isNaN(parseInt(value))) {
        // Daca este un simbol, apelam functia care va trata simbolul
        handleSymbol(value);
    } else {
        // Daca este o cifra, apelam functia care va trata cifra
        handleNumber(value);
    }
    // Rerandam ecranul calculatorului pentru a afisa schimbarile
    rerender();
}

// Functia care trateaza o cifra introdusa de utilizator
function handleNumber(value) {
    // Verificam daca valoarea bufferului este "0"
    if (buffer === "0") {
        // Daca este "0", inlocuim bufferul cu cifra introdusa
        buffer = value;
    } else {
        // Daca bufferul nu este "0", concatenam cifra la buffer
        buffer += value;
    }
}

// Functia care trateaza operatiile matematice (+, -, x, /)
function handleMath(value) {
    // Verificam daca bufferul este "0"
    if (buffer === "0") {
        // Daca este "0", nu avem ce face, deci returnam din functie
        return;
    }

    // Convertim bufferul la integer
    const intBuffer = parseInt(buffer);

    // Verificam daca este prima operatie matematica sau nu
    if (runningTotal === 0) {
        // Daca este prima operatie, initializam runningTotal cu valoarea bufferului
        runningTotal = intBuffer;
    } else {
        // Daca nu este prima operatie, efectuam operatia precedenta
        flushOperation(intBuffer);
    }

    // Salvam operatorul matematic pentru a fi folosit la urmatoarea operatie
    previousOperator = value;

    // Resetam bufferul pentru a astepta o noua cifra
    buffer = "0";
}

// Functia care efectueaza operatia matematica pe baza operatorului precedent
function flushOperation(intBuffer) {
    switch (previousOperator) {
        case "+":
            runningTotal += intBuffer;
            break;
        case "-":
            runningTotal -= intBuffer;
            break;
        case "x":
            runningTotal *= intBuffer;
            break;
        default:
            runningTotal /= intBuffer;
            break;
    }
}

// Functia care trateaza simbolurile speciale (C, =, <-, +, -, x, %)
function handleSymbol(value) {
    switch (value) {
        case "C":
            // Resetam bufferul si runningTotal la valorile initiale
            buffer = "0";
            runningTotal = 0;
            break;
        case "=":
            // Verificam daca avem un operator matematic precedent
            if (previousOperator === null) {
                // Daca nu avem, nu putem efectua o operatie, deci returnam
                return;
            }
            // Efectuam ultima operatie matematica
            flushOperation(parseInt(buffer));
            // Resetam operatorul precedent
            previousOperator = null;
            // Afisam rezultatul final pe ecran
            buffer = +runningTotal;
            // Resetam runningTotal pentru urmatoarea operatie
            runningTotal = 0;
            break;
        case "<-":
            // Stergem ultima cifra introdusa
            if (buffer.length === 1) {
                buffer = "0";
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        default:
            // Daca valoarea este un operator matematic, apelam functia care va trata operatia
            handleMath(value);
            break;
    }
}

// Functia care redeseneaza ecranul calculatorului cu valorile actualizate
function rerender() {
    screen.innerText = buffer;
}

// Functia de initializare a calculatorului
function init() {
    // Adaugam un ascultator de eveniment pentru click pe toate butoanele calculatorului
    document
        .querySelector(".calc-buttons")
        .addEventListener("click", function (event) {
            // Apelam functia buttonClick cu textul butonului apasat ca argument
            buttonClick(event.target.innerText);
        });
}

// Apelam functia de initializare pentru a porni calculatorul
init();
