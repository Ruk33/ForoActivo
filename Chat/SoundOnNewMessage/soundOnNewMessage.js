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

 'use strict';

var SoundOnNewMessage = function() {

	/**
	 *	URL del sonido a reproducir
	 *	cuando hayan nuevos mensajes
	 *
	 *	@constant
	 *	@private
	 */
	var AUDIO_URL = 'http://www.freshly-ground.com/data/audio/binaural/Mak.mp3';

	/**
	 *	Tiempo en milisegundos en
	 *	los que se buscará por nuevos
	 *	mensajes
	 *
	 *	@constant
	 *	@default 1000
	 */
	var TIMEOUT = 1000;

	var chatbox;
	var chatBoxSavedContent;

	var $body = $('body');
	var $frameChatBox = $('#frame_chatbox');

	var audio;

	var originalTitle = String(document.title);
	var isPageFocused = false;

	/*
	 *	Inicializando variables
	 *	y creando el elemento audio (para sonido)
	 */

	/**
	 *	@private
	 */
	var setChatBox = function() {
		//chatbox = document.getElementById('chatbox');
		chatbox = $frameChatBox.contents().find('#chatbox');
	};

	/**
	 *	@private
	 */
	var setAudio = function() {
		audio = document.createElement('audio');

		audio.setAttribute('src', AUDIO_URL);
		audio.load();

		$body.append(audio);
	};

	/**
	 *	Cuando la página obtiene el foco
	 *
	 *	@private
	 */
	var onFocusPage = function() {
		isPageFocused = true;
		document.title = originalTitle;
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
		/*
		$(window).on('blur', onBlurPage);

		$body.on('mouseenter', onFocusPage);
		$frameChatBox.on('mouseenter', onFocusPage);
		*/

		$(window).focus(onFocusPage).blur(onBlurPage);
		$frameChatBox.focus(onFocusPage);
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
	 *	@deprecated ForoActivo usa iframes, no sirve
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
	 *	@deprecated ForoActivo usa iframes, no sirve
	 */
	var setOnChangeHandler = function() {
		chatbox.__appendChild = chatbox.appendChild;
		chatbox.appendChild = onChangeChatBox;
	};

	/**
	 *	Buscará por nuevos mensajes
	 *	
	 *	@private
	 *	@return <bool>
	 */
	var newMessages = function() {
		return chatBoxSavedContent != chatbox.html();
	};

	/**
	 *	Buscando nuevos mensajes
	 *
	 *	@private
	 */
	var periodic = function() {
		if ( newMessages() ) {
			chatBoxSavedContent = chatbox.html();
			onNewMessage();
		}

		setTimeout(periodic, TIMEOUT);
	};

	/**
	 *	 @constructor
	 */
	var init = function() {
		setChatBox();
		setAudio();

		pageStateEvents();

		periodic();
	};

	init();
};

$(function() {

	$('#frame_chatbox').ready(function() {

		setTimeout(function() {
			SoundOnNewMessage();
		}, 3000);

	});

});