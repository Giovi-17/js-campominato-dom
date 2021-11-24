/* L'utente indica un livello di difficoltà 
in base al quale viene generata una griglia di gioco quadrata, 
in cui ogni cella contiene un numero tra quelli 
compresi in un range:
con difficoltà 1 => tra 1 e 100
con difficoltà 2 => tra 1 e 81
con difficoltà 3 => tra 1 e 49
Quando l'utente clicca su ogni cella, 
la cella cliccata si colora di azzurro. */

const play = document.getElementById("play");
play.addEventListener("click", diffSelected);

const nascosto = document.getElementById("nascosto");

let c = 0;

//FUNZIONI

// funzione che si attiva quando clicco su play, compare la griglia in base al livello di difficolta
function diffSelected() {

    c++;

    if(c === 1){
        let diff = selectDiff();

        let numDiff;

        if(diff === 'easy'){
            numDiff = 100;

        } else if(diff === 'hard'){
            numDiff = 81;

        } else if(diff === 'crazy'){
            numDiff = 49;
        }

        //Al click la scritta nell'h2 scompare
        let scegli = document.querySelector(".scegli");
        scegli.classList.add("hidden");

        //Al click viene tolta la classe hidden e la griglia compare
        
        
        nascosto.classList.remove("hidden");

        const bigSquare = document.querySelector(".square-container");
        let squareDiff = dDiff(bigSquare, numDiff, diff);
    }  
        
}

//selezione della difficoltá
function selectDiff(){

    let x = document.getElementById("difficolta").selectedIndex;

    let y = document.getElementsByTagName("option")[x].value;

    return y;
};

//generatore di quadratini per ogni difficoltá
function dDiff(bigSquare, numDiff, diff){

    for(let i = 1; i <= numDiff; i++){

        /* let newSquare = `
    
            <div class="col square square-${diff}"><a href="#">${i}</a></div>
    
        `;

        bigSquare.innerHTML += newSquare; */

        const newGeneratedCell = generateGridItem(i,diff);

        newGeneratedCell.addEventListener('click', sqSelected);

        nascosto.appendChild(newGeneratedCell);

    }

};

// quando clicco su una casella cambia colore di sfondo
function sqSelected() {

    this.classList.add("selected");

}

// Genera un nuovo square per la griglia
// 
// innerNumber -> numero che deve comparire nella cella
// cellDimension -> dimensione della cella
// 
// return: l'elemento pronto per essere 'appeso' alla griglia
function generateGridItem(innerNumber,diff) {
    // Creare un nuovo div
    const newCell = document.createElement('div');
    // aggiungere la classe 'col'
    newCell.classList.add('col');
    // aggiungere la classe 'square'
    newCell.classList.add('square');
    // aggiungere la classe 'square diff'
    if(diff === "easy"){
        newCell.classList.add('square-easy');
    }else if(diff === "hard"){
        newCell.classList.add('square-hard');
    }else if(diff === "crazy"){
        newCell.classList.add('square-crazy');
    }
        
    // popolare la cella con lo span col numero, 
    newCell.innerHTML = `<a href="#">${innerNumber}</a>`;

    return newCell;
}