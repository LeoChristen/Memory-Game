var deck=[
	'AC','2C','3C','4C','5C','6C','7C','8C','9C','10C','JC','QC','KC',
	'AD','2D','3D','4D','5D','6D','7D','8D','9D','10D','JD','QD','KD',
	'AH','2H','3H','4H','5H','6H','7H','8H','9H','10H','JH','QH','KH',
	'AS','2S','3S','4S','5S','6S','7S','8S','9S','10S','JS','QS','KS'];
	
	var deck1=[];
	var deck2=[];
	var deckMatched=[];
	var deck1flipped='';
	var deck2flipped='';
	var deck1div=document.getElementById('deck1');
	var deck2div=document.getElementById('deck2');

	function startGame(){
		var element=document.getElementById('difficulty');
		var value=element.options[element.selectedIndex].value;
		console.log(value);
		
		initializeBoard();

		deck=shuffle(deck);
		for(i=0;i<value;i++){
			deck1.push(deck[i]);
			deck2.push(deck[i]);
		}
		console.log(deck1);
		console.log(deck2);

		/* Shuffle the second deck*/
		shuffle(deck2);
		
		/* Add the cards to the webpage */
		for(i=0;i<value;i++){
			/* Create the image elements */
			card1='<div class="col-3 mb-2"><img class="card" data-card="' +deck1[i] +'" src="img/red_back.png" style="width:100%" /></div>';
			card2='<div class="col-3 mb-2"><img class="card" data-card="' +deck2[i] +'" src="img/yellow_back.png" style="width:100%" /></div>';
			/*Add images to the 2 decks */
			deck1div.innerHTML+=card1;
			deck2div.innerHTML+=card2;
		}
	}
	/* Clears all the elements when a new game is started */
	function initializeBoard() {
		/* Clear the content of the divs that hold the 2 decks */
		deck1div.innerHTML='';
		deck2div.innerHTML='';
		deck1=[];
		deck2=[];
		deckMatched=[];
		deck1flipped='';
		deck2flipped='';

	}
	/* When the user clicks on  deck 1*/
	document.getElementById("deck1").addEventListener('click',function(event){
		if(event.target.getAttribute('data-card')==undefined) return;
        // check if already matched. if so return.
        if(deckMatched.includes(event.target.getAttribute('data-card'))){
            console.log('mismatched');
            return;
        }
		deck1flipped=event.target.getAttribute('data-card');
		console.log("deck1flipped - "+deck1flipped);
		console.log("deck2flipped - "+deck2flipped);
		flipUnmatchedCards('deck1','red_back');
		event.target.src='img/'+event.target.getAttribute('data-card')+'.png';
		if(deck2flipped.length>0){
			checkMatch(event.target.getAttribute('data-card'));
		}
		console.log(event.target.getAttribute('data-card'));
	});
	
	//when the user clicks on deck 2
	document.getElementById("deck2").addEventListener('click',function(event){

		//if the user clicks outside a card, don't do anything
        if(event.target.getAttribute('data-card')==undefined) return;
        // check if already matched. if so return.
        if(deckMatched.includes(event.target.getAttribute('data-card'))){
            console.log('mismatched');
            return;
        }
		deck2flipped=event.target.getAttribute('data-card');
		console.log("deck1flipped - "+deck1flipped);
		console.log("deck2flipped - "+deck2flipped);
		//flip all the cards
		flipUnmatchedCards('deck2','yellow_back');
		//flip the selected card
		event.target.src='img/'+event.target.getAttribute('data-card')+'.png';
		if(deck1flipped.length>0){
			checkMatch(event.target.getAttribute('data-card'));
		}
		console.log(event.target.getAttribute('data-card')); 
	});
	
	function flipUnmatchedCards(deck, selectedCard='',back=''){
		var deck=document.getElementById(deck);
		var cards = deck.getElementsByClassName('card');
		var currentCard;
		for(i=0;i<cards.length;i++){
			currentCard=cards[i].getAttribute('data-card');
			if(!deckMatched.includes(currentCard)) cards[i].src='img/'+back+'.png';
		}
	}

	function checkMatch(cardValue){
		
		if(deck2flipped==deck1flipped){
				// We have a match
				deckMatched.push(cardValue);
				// Clear the flipped cards
				deck1flipped='';
				deck2flipped='';
				checkEndgame();
			}else{
                deck1flipped='';
                deck2flipped='';
				// Flip the cards in milliseconds
				setTimeout(function(){
                    flipUnmatchedCards('deck1','red_back');
                    flipUnmatchedCards('deck2','yellow_back');},500);
			}
	}
	function checkEndgame() {
		setTimeout (function() {
			if (deck1.length==deckMatched.length) alert('Congratulations! Time to play a more difficult level!');
		},2000);
	}
	
	function flipUnmatchedCards(deck,back=''){
		//select one of the two decks
		var deck=document.getElementById(deck);
		//Select all the cards in the deck
		var cards = deck.getElementsByClassName('card');
		var currentCard;
		//Flip all the cards
		for(i=0;i<cards.length;i++){
			currentCard=cards[i].getAttribute('data-card');
			if(deck=='deck1'){
				if(!deckMatched.includes(currentCard)) cards[i].src='img/'+back+'.png';
			}else{
				if(!deckMatched.includes(currentCard)) cards[i].src='img/'+back+'.png';
			}
		}
	}