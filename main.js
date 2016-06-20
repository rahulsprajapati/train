(function( doc ){
	'use strict';

	var Game = {

		speed: 10,

		init: function(){
			this.setProps();
			this.events();
		},

		events: function(){
			this.stage.addEventListener( 'click', this.switchTrack.bind(this), false );
			this.playButton.addEventListener( 'click', this.play.bind(this), false );
		},

		setProps: function(){
			this.stage = doc.getElementById( 'tain-scene' );
			this.playButton = doc.getElementById( 'play' );
			this.handle = doc.querySelectorAll( '.handle' );
			this.handle1 = doc.getElementById( 'handle-1' );
			this.handle2 = doc.getElementById( 'handle-2' );
			this.handle3 = doc.getElementById( 'handle-3' );
			this.handle4 = doc.getElementById( 'handle-4' );
			this.handle5 = doc.getElementById( 'handle-5' );
			this.handle6 = doc.getElementById( 'handle-6' );
			// this.honk = new Audio('assets/sound/horn.mp3');
		},

		play: function(){
			this.startTrains();
		},

		startTrains: function(){
			var _this = this;

			// @todo Temp: Have to create trains dynamically like this.
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
			// var track = this.map[trackColor];

			// this.honk.play();
			this.moveTrain( train );

			return train;
		},

		moveTrain: function( train ){

			var loop        = 0,
				_this       = this,
				x = 500,
				y = 61,
				nextLoop, interval, previousTrack;

			interval = setInterval( function(){

				if ( train.offsetLeft > 380 && train.offsetTop == 61 ) {
					train.style.left = --x + 'px';
				}

				if ( train.offsetLeft == 380 && train.offsetTop < 100 ) {
					console.log("TEst y1");
					train.style.top = ++y + 'px';
				}

				if ( _this.hasClass( _this.handle1, "handle-down" ) && train.offsetTop >= 100 && train.offsetTop <= 225 && train.offsetLeft == 380) {
					train.style.top = ++y + 'px';
				}
				if ( _this.hasClass( _this.handle1, "handle-top-left" ) && train.offsetLeft <= 380 ) {
					if ( train.offsetLeft == 380 && train.offsetTop < 140 ) {
						train.style.top = ++y + 'px';
					}
					if ( train.offsetLeft > 300 && train.offsetTop == 140 ) {
						train.style.left = --x + 'px';
					}
				}

				// for handle-down
				if ( train.offsetLeft <= 380 && train.offsetLeft > 305 && train.offsetTop == 226 ) {
					train.style.left = --x + 'px';
				}

				// for handle1 handle-top-left
				if ( train.offsetLeft == 300 && train.offsetTop >= 70  && train.offsetTop <= 145 ) {
					train.style.top = --y + 'px';
				}

				//for handle1 handle-top-left
				if ( train.offsetLeft >= 222 && train.offsetLeft <= 300 && train.offsetTop == 70 ) {
					train.style.left = --x + 'px';
				}

				if ( _this.hasClass( _this.handle2, "handle-straight" ) && train.offsetTop == 70 && train.offsetLeft <= 222 && train.offsetLeft >= 58 ) {
					train.style.left = --x + 'px';
				}

				if ( _this.hasClass( _this.handle2, "handle-right-down" ) && train.offsetTop >= 70 && train.offsetTop <= 145 && train.offsetLeft == 222 ) {
					train.style.top = ++y + 'px';
				}

				// for handle2 handle-right-down
				if ( train.offsetTop == 145 && train.offsetLeft <= 222 && train.offsetLeft >= 150 ) {
					train.style.left = --x + 'px';
				}

				if ( _this.hasClass( _this.handle3, "handle-straight" ) && train.offsetTop == 226 && train.offsetLeft <= 305 && train.offsetLeft >= 225 ) {
					train.style.left = --x + 'px';
				}

				if ( _this.hasClass( _this.handle3, "handle-right-down" ) && train.offsetTop >= 226 && train.offsetTop <= 305 && train.offsetLeft == 305 ) {
					train.style.top = ++y + 'px';
				}

				if ( _this.hasClass( _this.handle4, "handle-down" ) && train.offsetTop >= 226 && train.offsetTop <= 380 && train.offsetLeft == 224 ) {
					train.style.top = ++y + 'px';
				}

				if ( _this.hasClass( _this.handle4, "handle-top-left" ) && train.offsetTop >= 226 && train.offsetLeft <= 224 && train.offsetLeft >= 135 ) {
					if ( train.offsetTop <= 305 ) {
						train.style.top = ++ y + 'px';
					}
					if ( train.offsetTop == 306 ) {
						train.style.left = --x + 'px';
					}
				}

				// for handle4 handle-down
				if ( train.offsetTop == 306 && train.offsetLeft >= 305 && train.offsetLeft <= 370 ) {
					train.style.left = ++x + 'px';
				}

				if ( _this.hasClass( _this.handle5, "handle-straight" ) && train.offsetTop == 306 && train.offsetLeft >= 370 && train.offsetLeft <= 460 ) {
					train.style.left = ++x + 'px';
				}

				if ( _this.hasClass( _this.handle5, "handle-left-down" ) && train.offsetLeft == 371 && train.offsetTop >= 306 && train.offsetTop <= 385 ) {
					train.style.top = ++ y + 'px';
				}

				//for handle5 handle-left-down
				if ( train.offsetTop == 385 && train.offsetLeft <= 371 && train.offsetLeft >= 295 ) {
					train.style.left = -- x + 'px';
				}

				if ( _this.hasClass( _this.handle6, "handle-straight" ) && train.offsetTop == 145 && train.offsetLeft <= 149 && train.offsetLeft >= 58 ) {
					train.style.left = -- x + 'px';
				}

				if ( _this.hasClass( _this.handle6, "handle-right-down" ) && train.offsetLeft == 149 && train.offsetTop >= 145 && train.offsetTop <= 225 ) {
					train.style.top = ++ y + 'px';
				}

				// if ( train.offsetTop == 61 && train.offsetLeft <= 300) {
				// 	clearInterval( interval );
				// }

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
