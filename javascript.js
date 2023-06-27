var cards_clicked = 0;
var first_card = -1;
var second_card = -1;
var comparing = false;
var distance = 300;

function cardClicked(card, Choice_state) {
  state = getValue();
  console.log(state);
  if (state == 2) {

    if (cards_clicked == 0) {
      first_card = card;
      cards_clicked = 1;
    } else {
      compareTwoCard(first_card, card);
      cards_clicked = 0;
    }
    }
    
  if (state == 3) {
      if (cards_clicked == 2)
      {
        compareThreeCard(first_card, second_card, card);
        cards_clicked = 0;
        console.log('compared3');
      }

     else if (cards_clicked == 1) {
          second_card = card;
          cards_clicked = 2;
          console.log(`num of ${cards_clicked}`);
        }
     else if (cards_clicked == 0) {
          first_card = card;
          cards_clicked = 1;
          console.log(`num of ${cards_clicked}`);
        }
     
    }
  }

  function compareThreeCard(card1, card2, card3) {
    card1_value = card1.firstChild.src;
    card2_value = card2.firstChild.src;
    card3_value = card3.firstChild.src;

    comparing = true;

    if (card1_value == card2_value && card2_value == card3_value) {
      card1.firstChild.style.opacity = 1;
      card2.firstChild.style.opacity = 1;
      card3.firstChild.style.opacity = 1;

      console.log(`match!   ${card1_value}`);
      card1.setAttribute('solved', 'true');
      card2.setAttribute('solved', 'true');
      card3.setAttribute('solved', 'true');

      first_card = -1;
      second_card = -1;
      comparing = false;
    } else {
      const myTimeout = setTimeout(function() {
        changeBgColor(card1);
        changeBgColor(card2);
        changeBgColor(card3);
        comparing = false;
      }, 1000);

    }
  }

  function compareTwoCard(card1, card2) {
    card1_value = card1.firstChild.src;
    card2_value = card2.firstChild.src;
    comparing = true;
    if (card1_value == card2_value) {
      card1.firstChild.style.opacity = 1;
      card2.firstChild.style.opacity = 1;

      console.log(`match!   ${card1_value}`);
      card1.setAttribute('solved', 'true');
      card2.setAttribute('solved', 'true');
      window.first_card = -1;
      window.comparing = false;
    } else {
      const myTimeout = setTimeout(function() {
        changeBgColor(card1);
        changeBgColor(card2);
        window.comparing = false;
      }, 1000);

    }
  }

  function clicked(element) {
    if (comparing == false) {
      cardClicked(element);
      changeBgColor(element);
    }
  }

  function count(arr, target) {
    // counts the appearnce of target in arr

    var counter = 0;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] == target) {
        counter++;
      }
    }
    return counter;
  }

  function getValue() {
    //gets the current value of the match button
    if (document.getElementById('value-3').checked) {
      return 3;
    } else {
      return 2;
    }
  }

  function generateArray(table_size, twoORthree) {
    random_numbers = [];
    times_appeared = {};

    while (random_numbers.length < table_size) {
      rnd = Math.floor(Math.random() * table_size / twoORthree);
      if (times_appeared[rnd]) {
        if (times_appeared[rnd] < twoORthree) {
          times_appeared[rnd]++;
          random_numbers.push(rnd);
        }
      } else {
        times_appeared[rnd] = 1;
        random_numbers.push(rnd);
      }
    }
    return random_numbers;
  }

  function generateTable(row_num, col_num) {

    numofchoice = getValue();
    random_numbers = generateArray(row_num * col_num, numofchoice);

    document.getElementById('game_table').innerHTML = "";
    table = document.getElementById('game_table');
    var counter = 0;

    for (let i = 0; i < row_num; i++) {
      new_row = document.createElement('tr');
      for (let j = 0; j < col_num; j++) {
        new_col = document.createElement('td');
        new_col.setAttribute('solved', 'false');
        new_img = document.createElement('img');
        //new_col.innerHTML = `${random_numbers[counter]}`;
        new_img.src =  `https://placekitten.com/200/300?image=${random_numbers[counter]}`;
        new_img.style.opacity = 0;
        counter += 1;
        console.log(i + j);
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
      //state = element.style.opacity;

      if (state == '' || state == 0) {
       element.firstChild.style.opacity = 1;
       // element.style.opacity = 1;
      }

      if (state == 1) {
        element.firstChild.style.opacity = 0;
        //element.style.opacity = 1;
      }
    } else {

    }

  }


  function startTimerBack(time) {
    clearInterval(timer1);
    timer1 = setInterval(function() {
      var minutes = parseInt(time / 60);
      var seconds = parseInt(time % 60);
      document.getElementById('timer1').innerHTML = `0${minutes} : ${seconds}`;

      if (minutes == 0 && seconds == 0) {
        document.body.style.backgroundColor = 'red';
        clearInterval(timer1);
        flash();
      }
      time = time - 1;
    }, 100);
  }

  function flash() {
    state = true;
    setInterval(function() {
      if (state) {
        document.body.style.backgroundColor = 'white';
        state = false;
      } else {
        document.body.style.backgroundColor = 'red';
        state = true;
      }
    }, 100);
  }
