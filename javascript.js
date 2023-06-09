
var cards_clicked = 0;
var first_card = -1;

function cardClicked(card){
    if(window.cards_clicked == 0){
        window.first_card = card
        window.cards_clicked = 1;
    }
    else{
        compareCard(window.first_card, card);
        window.cards_clicked = 0;
    }
}

function compareCard(card1, card2){
    console.log(card1.innerHTML);
    console.log(card2.innerHTML);
    card1_value = card1.innerHTML;
    card2_value = card2.innerHTML;

    if(card1_value == card2_value){
        card1.style.backgroundColor = 'red';
        card2.style.backgroundColor = 'red';
        card1.setAttribute('solved', 'true');
        card2.setAttribute('solved', 'true');   
        window.first_card = -1;
    }

    else{
        changeBgColor(card1);
        changeBgColor(card2);
    }
}



function generateTable(row_num, col_num){
    table = document.getElementById('game_table');
    table.innerHTML = "";
    for(let i=0; i < row_num; i ++){
        new_row = document.createElement('tr');
       for(let j=0; j< col_num; j++) {
        new_col = document.createElement('td');
        new_col.setAttribute('solved', 'false');
        new_col.innerHTML = Math.floor(Math.random() * 3);;
        new_col.setAttribute('onclick', 'clicked(this)');
        new_row.appendChild(new_col);
       }
    
   table.appendChild(new_row);
    }
}
function clicked(element){
    cardClicked(element);
    changeBgColor(element);
}
function test(){
    new_text = document.createElement('p');
    new_text.innerHTML = document.getElementById('text_to_add').value;
    document.body.appendChild(new_text);
}
function changeColor(element){
    
    state = element.getAttribute('state');
    

    if(state == 'red'){
        element.style.color = 'blue';
        element.setAttribute('state', 'blue') ;

    }

    if(state == 'blue'){
        element.style.color = 'red';
        element.setAttribute('state', 'red') ;

    }

}

function changeBgColor(element) {
    isSolved = element.getAttribute('solved');
    if(isSolved == 'false'){
    state = element.style.backgroundColor;
    if(state == '' || state == "white"){
        element.style.backgroundColor = 'red';
    }
    
    if(state == 'red'){
        element.style.backgroundColor = 'white';
    }
    }
    else{

    }

}
function startTimer(){
    console.log("dd");
    setInterval(function(){
        time = parseInt(document.getElementById("timer").innerHTML) + 1;
        document.getElementById("timer").innerHTML = time;
    },1000);
}

function startTimerBack(){
    timer1 = setInterval(function(){
        time = parseInt(document.getElementById("timer1").innerHTML) - 1;
        document.getElementById("timer1").innerHTML = time;

        if(time == 0) {
            document.body.style.backgroundColor = 'red';
            clearInterval(timer1);
            flash();
        }

    },100);
}
function flash(){
    state = true;
    setInterval(function(){
        if(state){
            document.body.style.backgroundColor = 'white';
            state = false;
        }
        else {
            document.body.style.backgroundColor = 'red';
            state = true;
        }
    }
    ,100);
}
