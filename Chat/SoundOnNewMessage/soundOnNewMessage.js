/**
 *	Simple script para reproducir sonido
 *	al recibir un nuevo mensaje en el chat 
 *	de los foros de ForoActivo.
 *
 *	Además, se agregará un "(*)" al título 
 *	de la página cuando se recibe un nuevo mensaje.
 *
 *	Estas acciones solamente se ejecutarán si la
 *	página no tiene el foco.
 *	
 *	@author Franco Montenegro <area51ruke@gmail.com>
 *	@version 1.0.0.0
 *	@requires jQuery
 */

$(function() {

	var SoundOnNewMessage = function() {

		/**
		 *	URL del sonido a reproducir
		 *	cuando hayan nuevos mensajes
		 *
		 *	@constant
		 *	@private
		 */
		var AUDIO_URL = 'http://www.freshly-ground.com/data/audio/binaural/Mak.mp3';

		var chatbox, 
			audio,
			originalTitle = document.title,
			isPageFocused = true;

		/*
		 *	Inicializando variables
		 *	y creando el elemento audio (para sonido)
		 */

		/**
		 *	@private
		 */
		var setChatBox = function() {
			chatbox = document.getElementById('chatbox');
		};

		/**
		 *	@private
		 */
		var setAudio = function() {
			audio = document.createElement('audio');

			audio.setAttribute('src', AUDIO_URL);
			audio.load();
		};

		/**
		 *	Cuando la página obtiene el foco
		 *
		 *	@private
		 */
		var onFocusPage = function() {
			isPageFocused = true;

			/*
			 *	Verificamos si tenemos
			 *	que volver el título de la 
			 *	página a la normalidad
			 */
			if ( document.title != originalTitle ) {
				document.title = originalTitle;
			}
		};

		/**
		 *	Cuando la página pierde el foco
		 *
		 *	@private
		 */
		var onBlurPage = function() {
			isPageFocused = false;
		};

		/**
		 *	Eventos para cuando la página
		 *	pierde o recibe foco
		 *
		 *	@private
		 */
		var pageStateEvents = function() {
			$(window).on('blur', onBlurPage);
			$('body').on('mouseenter', onFocusPage);
		};

		/**
		 *	Al recibir nuevo mensaje
		 *
		 *	@private
		 */
		var onNewMessage = function() {
			/*
			 *	Si la página no tiene el foco
			 *	entonces emitimos el sonido
			 *	y agregamos un (*) al título
			 */
			if ( ! isPageFocused ) {
				document.title = '(*) ' + originalTitle;

				audio.play();
			}
		};

		/**
		 *	Al cambiar el DOM del chat
		 *
		 *	@private
		 */
		var onChangeChatBox = function() {
			chatbox.__appendChild.apply(chatbox, arguments);
			onNewMessage();
		};

		/**
		 *	Handler para cuando el DOM cambia
		 *	(cambia cuando hay nuevos mensajes)
		 *
		 *	@private
		 */
		var setOnChangeHandler = function() {
			chatbox.__appendChild = chatbox.appendChild;
			chatbox.appendChild = onChangeChatBox;
		};

		/**
		 *	 @constructor
		 */
		var init = function() {
			setChatBox();
			setAudio();

			pageStateEvents();

			setOnChangeHandler();
		}

		init();
	};

	SoundOnNewMessage();

});