/*Il computer deve generare 16 numeri casuali 
nello stesso range della difficoltà prescelta: le bombe.
I numeri nella lista delle bombe non possono essere duplicati.
In seguito l'utente clicca su una cella: 
se il numero è presente nella lista dei numeri generati 
- abbiamo calpestato una bomba - 
la cella si colora di rosso e la partita termina, 
altrimenti la cella cliccata si colora di azzurro 
e l'utente può continuare a cliccare sulle altre celle.
La partita termina quando il giocatore 
clicca su una bomba o 
raggiunge il numero massimo possibile di numeri consentiti.
Al termine della partita il software deve comunicare il punteggio, 
cioè il numero di volte che l’utente ha cliccato su una cella 
che non era una b.
BONUS:
1- quando si clicca su una bomba e finisce la partita, 
evitare che si possa cliccare su altre celle
2- quando si clicca su una bomba e finisce la partita, 
il software scopre tutte le bombe nascoste*/

const play = document.getElementById("play");
play.addEventListener("click", diffSelected);
let scegli = document.querySelector(".scegli");
const nascosto = document.getElementById("nascosto");

let c = 0;

let numBomb = 2;
let arrayBomb = [];
let arrayNotBomb = [];
let nVittoria;


//FUNZIONI

// funzione che si attiva quando clicco su play, compare la griglia in base al livello di difficolta
function diffSelected() {

    c++;

    if(c === 1){
        let diff = selectDiff();

        let numDiff;

        if(diff === 'easy'){
            numDiff = 100;
            nVittoria = numDiff - numBomb;

        } else if(diff === 'hard'){
            numDiff = 81;
            nVittoria = numDiff - numBomb;

        } else if(diff === 'crazy'){
            numDiff = 49;
            nVittoria = numDiff - numBomb;

        }

        //Al click la scritta nell'h2 scompare
        scegli.classList.add("hidden");

        //Al click viene tolta la classe hidden e la griglia compare
        nascosto.classList.remove("hidden");

        const bigSquare = document.querySelector(".square-container");
        let bomb = genXBomb(numBomb, arrayBomb, 1, numDiff);
        console.log(arrayBomb);
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

        const newGeneratedCell = generateGridItem(i,diff);

        newGeneratedCell.addEventListener('click', sqSelected);

        nascosto.appendChild(newGeneratedCell);

    }

};

// quando clicco su una casella cambia colore di sfondo
//e controlla se ho cliccato una casella con una bomba
//in questo caso la casella si colora di rosso e il gioco finisce
//altrimenti si colora di blu e non é piú cliccabile
function sqSelected() {

    let esploso = false;
    const x = parseInt( this.querySelector('a').textContent );
    let nVittoria2 = nVittoria - 1; 

    for( let i = 0; i < arrayBomb.length ; i++ ){

        if( !arrayNotBomb.includes(x) ){

            if(arrayBomb.includes(x)){

                esploso = true;
                this.style.pointerEvents = "none";
    
            }else if(( !arrayBomb.includes(x) ) && ( arrayNotBomb.length < nVittoria2 )){
                arrayNotBomb.push(x);
                this.style.pointerEvents = "none";
                console.log(arrayNotBomb);
                
            }else {
            
                endGame("win");
                noClick();
    
            }

        }

    }

    if( esploso ){
        this.classList.add("bomb");
        endGame("lose");
        noClick();

    }else{
        this.classList.add("selected");
    }

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

//Genera x numeri casuali e gli assegna all'array arrayBomb
function genXBomb(numBomb, arrayBomb, min, max){

    for( let i = 0; i < numBomb; i++ ){

        let x = Math.floor(Math.random() * (max - min + 1) ) + min;

        arrayBomb.push(x);

    }

}

//Finale del gioco
//scritta di vittoria o sconfitta
function endGame(winOrLose){

    if( winOrLose === "win" ){
        let final = document.querySelector("#final-message");
        final.innerHTML= `

            Hai vinto, fine del gioco

        `;

        final.classList.remove("hidden");

    }else if( winOrLose === "lose" ){
        let final = document.querySelector("#final-message");

        final.innerHTML= `

        Sei esploso, fine del gioco, 
        hai azzeccato ${arrayNotBomb.length} tentativo/i

        `;

        final.classList.remove("hidden");
        
    }

    return  winOrLose;

};

//A fine gioco nessuna cella é piú cliccabile
function noClick(){

    const cells = document.getElementsByClassName('square');
    for(let i = 0; i < cells.length ;i++){

        const thisCell = cells[i];
        thisCell.style.pointerEvents = "none";

    }

}