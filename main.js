(function( doc ){
	'use strict';

	var Game = {

		speed: 10,

		map: {
			pink: [
				{
					start: { x: 500, y: 61 },
					end: { x: 378, y: 61 }
				},
				{
					start: { x: 378, y: 61 },
					end: { x: 378, y: 224 }
				},
				{
					start: { x: 378, y: 224 },
					end: { x: 215, y: 224 }
				},
				{
					start: { x: 215, y: 224 },
					end: { x: 215, y: 380 }
				},
				{
					start: { x: 215, y: 380 },
					end: { x: 215, y: 380 }
				}
			],
		},

		init: function(){
			this.setProps();
			this.events();
			this.startTrains();
		},

		events: function(){
			this.stage.addEventListener( 'click', this.switchTrack.bind(this), false );
		},

		setProps: function(){
			this.stage = doc.getElementById( 'tain-scene' );
			this.handle = doc.querySelectorAll( '.handle' );
			this.honk = new Audio('assets/sound/horn.mp3');
		},

		startTrains: function(){
			var _this = this;

			// @todo Have to create trains dynamically like this.
			_this.startTrain( 'pink', 'pink' );

			setTimeout( function(){
				_this.startTrain( 'pink', 'green' );
			}, 4000 );
			setTimeout( function(){
				_this.startTrain( 'pink', 'violet' );
			}, 2000 );
			setTimeout( function(){
				_this.startTrain( 'pink', 'yellow' );
			}, 9000 );
		},

		switchTrack: function(e){
			var target = e.target;
			if ( this.hasClass( target, 'handle-1' ) ) {
				this.toggleClasses( target, 'handle-down', 'handle-top-left' );
			} else if( this.hasClass( target, 'handle-2') ) {
				this.toggleClasses( target, 'handle-right-down', 'handle-straight' );
			} else if( this.hasClass( target, 'handle-3') ) {
				this.toggleClasses( target, 'handle-straight', 'handle-right-down' );
			} else if( this.hasClass( target, 'handle-4') ) {
				this.toggleClasses( target, 'handle-down', 'handle-top-left' );
			} else if( this.hasClass( target, 'handle-5') ) {
				this.toggleClasses( target, 'handle-left-down', 'handle-straight' );
			} else if( this.hasClass( target, 'handle-6') ) {
				this.toggleClasses( target, 'handle-straight', 'handle-right-down' );
			}
		},

		createTrain: function( color ){
			var train = doc.createElement( 'div' ),
				horn = doc.createElement( 'span' );
			this.addClass( train, 'train' ).addClass( train, 'train-' + color );

			train.appendChild( horn );
			this.stage.appendChild( train );
			return train;
		},

		startTrain: function( trackColor, trainColor ){
			var train = this.createTrain( trainColor );
			var track = this.map[trackColor];

			this.honk.play();
			this.moveTrain( train, track );

			return train;
		},

		moveTrain: function( train, track ){

			var loop        = 0,
				_this       = this,
				currentTack = track[loop],
				startPoint  = currentTack.start,
				endPoint    = currentTack.end,
				trackLength = track.length,
				x           = startPoint.x,
				y           = startPoint.y,
				nextLoop, interval, previousTrack;

			interval = setInterval( function(){

				if ( x > endPoint.x ) {
					train.style.left = --x + 'px';
				}

				if ( y < endPoint.y ) {
					train.style.top = ++y + 'px';
				}

				// Stop the train.
				if ( ( loop + 1 )  >= trackLength ) {
					clearInterval( interval );
				}

				// Point where it has reached it's current destination
				if ( x === endPoint.x && y === endPoint.y ) {
					nextLoop = loop + 1;
					loop = nextLoop;
					if( track.hasOwnProperty( nextLoop ) ){
						currentTack = track[nextLoop];
						previousTrack = track[loop];
						startPoint = currentTack.start;
						endPoint = currentTack.end;

						x = startPoint.x;
						y = startPoint.y;

						if ( previousTrack.end.y !== startPoint.y ) {
							_this.addClass( train, 'train-down' );
						} else {
							_this.removeClass( train, 'train-down' );
						}
					}
				}

			}, this.speed );
		},

		hasClass: function( el, className ){
			if (el.classList)
			  return el.classList.contains(className);
			else
			  return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
		},

		addClass: function( el, className ){
			if ( el.classList ){
			  el.classList.add( className );
			} else {
			  el.className += ' ' + className;
			}
			return this;
		},

		removeClass: function( el, className ){
			if ( el.classList ){
			  el.classList.remove( className );
			} else {
			  el.className = el.className.replace( new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ' );
			}
			return this;
		},

		toggleClasses: function( el, class1, class2 ){
			if ( this.hasClass( el, class1 ) ) {
				this.removeClass( el, class1 ).addClass( el, class2 );
			} else {
				this.removeClass( el, class2 ).addClass( el, class1 );
			}
		}

	};

	Game.init();

})( document );
