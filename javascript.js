
var cards_clicked = 0;
var first_card = -1;
var comparing = false;

function cardClicked(card) {
    if (window.cards_clicked == 0) {
        window.first_card = card
        window.cards_clicked = 1;
    }
    else {
        compareCard(window.first_card, card);
        window.cards_clicked = 0;
    }
}

function compareCard(card1, card2) {
    card1_value = card1.firstChild.src;
    card2_value = card2.firstChild.src;
    window.comparing = true;
    if (card1_value == card2_value) {
        card1.firstChild.style.opacity = 1;
        card2.firstChild.style.opacity = 1;
        console.log(`match!   ${card1_value}`)
        card1.setAttribute('solved', 'true');
        card2.setAttribute('solved', 'true');
        window.first_card = -1;
        window.comparing = false;
    }

    else {
        const myTimeout = setTimeout(function () {
            changeBgColor(card1);
            changeBgColor(card2);
            window.comparing = false;
        }, 1000);

    }
}

function clicked(element) {
    if (window.comparing == false) {
        cardClicked(element);
        changeBgColor(element);
    }
}


function generateTable(row_num, col_num) {
    table = document.getElementById('game_table');
    table.innerHTML = "";
    for (let i = 0; i < row_num; i++) {
        new_row = document.createElement('tr');
        for (let j = 0; j < col_num; j++) {
            new_col = document.createElement('td');
            new_col.setAttribute('solved', 'false');
            new_img = document.createElement('img');
            new_img.src =  `https://placekitten.com/${img_w}/${img_h}`;
            rnd = Math.floor(Math.random() * 10);
            var img_w = 68 + rnd;
            var img_h = 108 + rnd;

            new_img.style.opacity = 0;
            new_col.appendChild(new_img);
            new_col.setAttribute('onclick', 'clicked(this)');
            new_row.appendChild(new_col);
        }
        table.appendChild(new_row);
    }
}

function test() {
    new_text = document.createElement('p');
    new_text.innerHTML = document.getElementById('text_to_add').value;
    document.body.appendChild(new_text);
}


function changeBgColor(element) {
    isSolved = element.getAttribute('solved');
    if (isSolved == 'false') {
        state = element.firstChild.style.opacity;
        if (state == '' || state == 0) {
            element.firstChild.style.opacity = 1;
        }

        if (state == 1) {
            element.firstChild.style.opacity= 0;
        }
    }
    else {

    }

}
function startTimer() {
    console.log("dd");
    setInterval(function () {
        time = parseInt(document.getElementById("timer").innerHTML) + 1;
        document.getElementById("timer").innerHTML = time;
    }, 1000);
}

function startTimerBack() {
    timer1 = setInterval(function () {
        time = parseInt(document.getElementById("timer1").innerHTML) - 1;
        document.getElementById("timer1").innerHTML = time;

        if (time == 0) {
            document.body.style.backgroundColor = 'red';
            clearInterval(timer1);
            grth();
        }

    }, 100);
}
function flash() {
    state = true;
    setInterval(function () {
        if (state) {
            document.body.style.backgroundColor = 'white';
            state = false;
        }
        else {
            document.body.style.backgroundColor = 'red';
            state = true;
        }
    }
        , 100);
}
