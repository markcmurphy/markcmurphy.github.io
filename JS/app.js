$(() => {

  // classes

  class Creature {
    constructor(name, cost, attackPoints, defensePoints, serialNumber) {
      this.name = name;
      // constructor(name, cost, attackPoints, defensePoints) {
      // this.name = name;
      this.cost = cost;
      this.attackPoints = attackPoints;
      this.defensePoints = defensePoints;
      this.serialNumber = serialNumber;
      // this.arrPlace = arrPlace;
      // this.creatureID = creatureID;
      this.isInPlay = false;
      this.isDead = false;
      this.canAttack = true;
      this.canDefend = true;
      // this.roundsInPlay = 0;
    }

  }
const vortex = {
  creatures: [],
  createArcher() {
    const newArcher = new Creature('Archer', 2, 2, 2, this.creatures.length);
    this.creatures.push(newArcher);
    return newArcher;
  },
  createGhost() {
    const newGhost = new Creature('Ghost', 1, 1, 1, this.creatures.length);
    this.creatures.push(newGhost);
    return newGhost;
  },
  findCreature(index) {
    return this.creatures[index];
  }
}

  class Player {
    constructor(name) {
      this.name = name;
      this.healthPoints = 30;
      this.deck = [];
      this.hand = [];
      this.graveyard = [];
      this.mana = 0;
      this.cardsInPlay = [];
    }
  }

  const player1 = new Player("Mark");
  const player2 = new Player("Comp");

  // gameplay

  const game = {
    roundNumber: 0,
    attackers: [],
    defenders: [],
    availableCreatures: ["ghost", "archer"],
    currentPlayersTurn: {},
    // creaturesBuilt: 0,
    // allCreatures: [],

    flipCoin() {
      let availablePlayers = [player1, player2];
      let a = Math.floor((Math.random() * availablePlayers.length));
      let b = availablePlayers[a];
      // game.startGame(b);
    },

    assignDeck(targetPlayer) {
      for (let i = 0; i < 30; i++) {
        let a = Math.floor((Math.random() * game.availableCreatures.length));
        let b = game.availableCreatures[a];
        if (b == "ghost") {
          vortex.createGhost();
        } else if (b == 'archer') {
          vortex.createArcher();
        }
        targetPlayer.deck.push(vortex.creatures[i]);
      }
    },

    // buildCard(targetPlayer, card) {
    //   game.creaturesBuilt += 1;
    //   // console.log(this.creaturesBuilt);
    //   if (targetPlayer === player1) {
    //     // game.allCreatures.push(card);
    //     $('<div>').addClass('card').appendTo('.playerArea1 .hand').text(card.name + ' cost: ' + card.cost).append('</br><button class="attack">A</button>', '</br><button  class="defend">B</button>').attr(card).attr('id', game.creaturesBuilt);
    //   } else if (targetPlayer === player2) {
    //     game.allCreatures.push(card);
    //     $('<div>').addClass('card').appendTo('.playerArea2 .hand').text(card.name + ' cost: ' + card.cost).append('</br><button class="attack">A</button>', '</br><button class="defend">B</button>').attr(card).attr('id', this.creaturesBuilt);
    //    }
    // },

    dealCard(targetPlayer, card) {
      targetPlayer.hand.push(card);
      if (targetPlayer === player1) {
        $('<div>').addClass('card').appendTo('.playerArea1 .hand').text(card.name + ' cost: ' + card.cost).append('</br><button class="attack">A</button>', '</br><button  class="defend">B</button>').attr(card).attr('id', card.serialNumber);
      } else if (targetPlayer === player2) {
        $('<div>').addClass('card').appendTo('.playerArea2 .hand').text(card.name + ' cost: ' + card.cost).append('</br><button class="attack">A</button>', '</br><button class="defend">B</button>').attr('id', card.serialNumber);
       }
    },



    dealFirstHand(targetPlayer) {
      for (let i = 0; i < 3; i++) {
        let a = Math.floor((Math.random() * targetPlayer.deck.length));
        game.dealCard(targetPlayer, targetPlayer.deck[a]);
      };

    },

    updateMana(targetPlayer) {
      if (targetPlayer === player1) {
        $('.manaStats1').text('Mana: ' + targetPlayer.mana);
      } else if (targetPlayer === player2) {
        $('.manaStats2').text('Mana: ' + targetPlayer.mana);
      }
    },

    updateHealth(targetPlayer) {
      if (targetPlayer === player1) {
        $('.healthStats1').text('Health: ' + targetPlayer.healthPoints);
      } else if (targetPlayer === player2) {
        $('.healthStats2').text('Health: ' + targetPlayer.healthPoints);
      }
    },


    startGame(targetPlayer) {
      console.log('Game started!');
      this.currentPlayersTurn = targetPlayer;
      targetPlayer.mana += 1;
      game.assignDeck(player1);
      game.assignDeck(player2);
      game.dealFirstHand(player1);
      game.dealFirstHand(player2);
      game.updateHealth(player1);
      game.updateHealth(player2);
      game.updateMana(player1);
      game.updateMana(player2);
      console.log(player1.hand);
      console.log(player2.hand);
    },

    roundBegin() {
      this.roundNumber += 1;
      console.log("this is round# " + this.roundNumber);
    },

    turnBegin(targetPlayer) {
      this.currentPlayersTurn = targetPlayer;
      targetPlayer.mana += 1;
      let a = Math.floor((Math.random() * targetPlayer.deck.length));
      game.dealCard(targetPlayer, targetPlayer.deck[a]);
      game.updateMana(targetPlayer);
      game.updateMana(targetPlayer);
      // need to configure to ensure a max of 10 using if statements

    },

    playCard(targetPlayer, num) {
        let arr = targetPlayer.hand;
        console.log(arr);
        console.log(num);
        console.log(targetPlayer);
        for (let i=0; i< arr.length; i++) {
        console.log(arr[i].serialNumber)
          if (arr[i].serialNumber == num.serialNumber || arr[i].serialNumber == num){
            const card = arr[i];
            card.isInPlay = true;
            targetPlayer.cardsInPlay.push(card);
            targetPlayer.mana -= card.cost;
            console.log(card.name + " played!");
            console.log("remaining mana:  " + targetPlayer.mana);
            let t = targetPlayer.hand.indexOf(card);
            targetPlayer.hand.splice(t, 1);
            console.log("You now have ", targetPlayer.hand, " remaining in your hand");
          } else {
            console.log('not played');
          }
        };
    },

    compTurn() {
      console.log(player2.hand.length);
      let a = Math.floor((Math.random() * (player2.hand.length)));
      let card = player2.hand[a];
      console.log(card);
      game.playCard(player2, card);
      console.log("computer played a ", card.name);
      // let $computerSelectedCard = "#" + card.creatureID;
      let $computerSelectedCard = "#" + card.serialNumber;
      $('.playerArea2 .inPlay').append($($computerSelectedCard));
      game.setAttackComp();
    },

    setAttackComp() {
      console.log(player2.cardsInPlay.length);
      let a = Math.floor((Math.random() * (player2.cardsInPlay.length)));
      let card = player2.cardsInPlay[a];
      console.log(card);
      if (card.canAttack == true) {
        console.log("computer attacking with " + card.name);
        this.attackers.push(card);
        let $computerSelectedCard = "#" + card.serialNumber;
        $('.battleField').append($($computerSelectedCard));
      } else {
        console.log('can not attack this turn');
      }
    },




    setAttack(target) {
      if (target.canAttack === true) {
        this.attackers.push(target);
        let $selectedCard = "#" + target.creatureID;
        $('.playerArea1 .battleField').append($($selectedCard));
      } else {
        console.log('can not attack');
      }
    },

    setDefenders(x) {
      game.defenders.push(x);

      // if (card.canDefend === true) {
      // console.log(player1.cardsInPlay[0]);
      // console.log(num);
      // console.log(player1.cardsInPlay.length);

      // let $selectedCard = "#" + num;
      // let ind = $('player1.cardsInPlay').find($($selectedCard));
      // console.log(ind);

// let tyt = $('div#'+ num);
// console.log(tyt);

// console.log($(player1.cardsInPlay[0]).data('id'));
      // var arrayOfIds = $.map($('#'+num), function(n, i){
  // return n.id;
// });
// console.log(arrayOfIds);
// console.log(player1.cardsInPlay[0].id);
// console.log(player1.cardsInPlay[0].id);
      // for (let i=0; i<player1.cardsInPlay.length; i++) {
        // console.log(player1.cardsInPlay[i].creatureID);
        // if (player1.cardsInPlay[i].id == num) {
          // console.log(i);
          // return i;
      // } else {
        // console.log(-1);
      // }
    // };


        // this.defenders.push(card);
        // console.log(this.defenders[0]);
      // } else {
        // console.log('can not defend');
      // }
    },

    attackPhase() {
      let x = this.defenders[0];
      let a = this.defenders[0].defensePoints - this.attackers[0].attackPoints;
      let b = this.attackers[0].defensePoints - this.defenders[0].attackPoints;
      if (a <= 0) {
        this.defenders[0].isDead = true;
      };
      if (b <= 0) {
        this.attackers[0].isDead = true;
      };
      console.log(this.defenders[0].isDead);
      console.log(this.attackers[0].isDead);
// need to set up seperate graveyards

      for (let i=0; i<this.defenders.length; i++) {
        console.log(i);
        if (this.defenders[i].isDead === true) {
          let $cardAtt = "#" + this.defenders[i].creatureID;
          $('.playerArea1 .graveyard').append($($cardAtt));
          console.log($cardAtt);
          let p1 = player1.hand.indexOf(this.defenders[i]);
          let p2 = player2.hand.indexOf(this.defenders[i]);
          player1.cardsInPlay.splice(p1, 1);
          player2.cardsInPlay.splice(p2, 1);
        } else {
          console.log('nothing done');
      };
      };

      for (let i=0; i<this.attackers.length; i++) {
        console.log(i);
        if (this.attackers[i].isDead === true) {
          let $cardDef = "#" + this.attackers[i].creatureID;
          $('.playerArea1 .graveyard').append($($cardDef));
          console.log($cardDef);
          let p1 = player1.hand.indexOf(this.attackers[i]);
          let p2 = player2.hand.indexOf(this.attackers[i]);
          player1.cardsInPlay.splice(p1, 1);
          player2.cardsInPlay.splice(p2, 1);
      } else {
        console.log('nothing done');
    };

    };

    console.log(player1.cardsInPlay);
    console.log(player2.cardsInPlay);
    console.log(this.attackers);
    console.log(this.defenders);
  },

    isWon() {

    },

    // resetGame() {
    //
    // }

  }


  // listening
  $('.start').on('click', () => {
    game.startGame(player1);
    game.roundBegin(player1);
    // game.turnBegin(player1);
    // game.updateMana(player1);
    // game.updateHealth(player1);
  });



  $('.hand').on('click', '.card', (e) => {
    let cost = $(e.currentTarget).attr('cost');
    let mana = player1.mana;
    if (cost <= mana) {
    let card = $(e.currentTarget).attr('serialNumber');
      game.playCard(player1, card);
      $(e.currentTarget).closest('div').appendTo(".playerArea1 .inPlay");
      game.updateMana(player1);
    }
    else {
      alert('not enough mana, select another card');
    }
  });




  $('.inPlay').on('click', '.attack', (e) => {
    // when clicking A again, needs to return card to In Play
    if (card.canAttack == true) {
      $(e.currentTarget).closest('.card').appendTo(".battleField");
      game.setAttack(this);
    } else {
      alert('can not attack')
    };
  });

  $('.inPlay').on('click', '.defend', (e) => {
    let defendStatus = $(e.currentTarget).closest('.card').attr('canDefend');
    console.log(defendStatus);
    if (defendStatus == 'true') {
      let card = $(e.currentTarget).closest('div').attr('serialNumber');
      game.defenders.push(card);
      $(e.currentTarget).closest('div').appendTo(".battleField");
      game.setDefenders(card);
    }
    else {
      alert('can not defend this turn, select another card');
    };
  });


  $('.battleField .card').click(
    function() {
      alert("Select attacker to defend");
    },
    function() {
      alert('defender matched with attacker ')
    }
  );

  $('.player1TurnOver').on('click', () => {
    console.log("player 1 turn over");
    game.turnBegin(player2);
    game.compTurn();
  });

  $('.battle').on('click', () => {
    console.log("battle clicked");
    console.log(game.attackers[0]);
    console.log(game.defenders[0]);
    game.attackPhase();
    }
  );

Creature.handleEvent = function(e) {
  switch (e.type) {
    case 'click': this.click(e);
  }
};

// https://stackoverflow.com/questions/16113070/how-to-associate-an-object-with-a-dom-element

// functionality doesn't work yet
  $('.reset').on('click', () => {
    console.log("reset");
    game.startGame();
  });


  // test code
// console.log(game.availableCreatures.length);
// let a = Math.floor((Math.random() * game.availableCreatures.length));
// console.log(a);
// console.log(game.defenders[0].creatureID);

// ghost.createCard(player1);
// console.log(ghost.defensePoints);
 game.flipCoin();
});
