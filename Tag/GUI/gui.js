var GUI_KEYWORDS={},
	GUI_IMAGES={};

GUI_KEYWORDS=/^(Melee Game|Partida de refriega|Unit Group|Grupo de unidad|Special Effect|Efecto especial|Edificio Neutral|Player Group|Grupo de jugadores|Tabla m\u00faltiple|Neutral Building|Tabla de l\u00edderes|Tabla Hash|Game Cache|Cach\u00e9 del juego|Floating Text|Texto flotante|Cuenta atr\u00e1s del reloj|Countdown Timer|Secuencia cinematogr\u00e1fica|For each|Skip remaining actions|Custom script|Do nothing|Map initialization|Events|Acontecimientos|Conditions|Condiciones|Actions|Acciones|Destructible|Dialog|Dialogo|Game|Partida|Player|Jugador|Time|Tiempo|Unit|Unidad|Wait|Set|Variable|If|Si|Entonces|Otros|Bucle|AI|IA|Animation|Animaci\u00f3n|Camera|C\u00e1mara|Cinematic|Countdown|Dialog|Dialogo|Environment|Escenario|Game|Partida|Hashtable|Hero|H\u00e9roe|Item|Objeto|Image|Imagen|Leaderboard|Lightning|Rayo|Multiboard|Player|Jugador|Quest|Misi\u00f3n|Region|Regi\u00f3n|Selection|Selecci\u00f3n|Sound|Sonido|Trigger|Detonador|Unit|Unidad|Ubersplat|Visibility|Visibilidad|If|Then|Else|Loop|--------)( - | )?/;

GUI_IMAGES["Events"]="event";
GUI_IMAGES["Acontecimientos"]="event";
GUI_IMAGES["Conditions"]="condition";
GUI_IMAGES["Condiciones"]="condition";
GUI_IMAGES["Actions"]="action";
GUI_IMAGES["Acciones"]="action";
GUI_IMAGES["Map initialization"]="cog";
GUI_IMAGES["Destructible - "]="tree";
GUI_IMAGES["Dialog - "]="exclamation";
GUI_IMAGES["Dialogo - "]="exclamation";
GUI_IMAGES["Game - "]="orc";
GUI_IMAGES["Partida - "]="orc";
GUI_IMAGES["Player - "]="player";
GUI_IMAGES["Jugador - "]="player";

GUI_IMAGES["Time - "]="clock";
GUI_IMAGES["Tiempo - "]="clock";
GUI_IMAGES["Unit - "]="unit";
GUI_IMAGES["Unidad - "]="unit";
GUI_IMAGES["Do nothing"]="cog";
GUI_IMAGES["Custom script"]="cog";
GUI_IMAGES["Wait "]="sleep";
GUI_IMAGES["Set "]="set";
GUI_IMAGES["Variable "]="set";
GUI_IMAGES["Skip remaining actions"]="cog";
GUI_IMAGES["For each "]="interrogation";
GUI_IMAGES["If "]="interrogation";
GUI_IMAGES["Si"]="condition";
GUI_IMAGES["Entonces"]="condition";
GUI_IMAGES["Otros"]="condition";

GUI_IMAGES["Bucle"]="action";
GUI_IMAGES["AI - "]="ai";
GUI_IMAGES["IA - "]="ai";
GUI_IMAGES["Animation - "]="effect";
GUI_IMAGES["Animaci\u00f3n - "]="effect";
GUI_IMAGES["Camera - "]="camera";
GUI_IMAGES["C\u00e1mara - "]="camera";
GUI_IMAGES["Cinematic - "]="camera";
GUI_IMAGES["Secuencia cinematogr\u00e1fica - "]="camera";
GUI_IMAGES["Countdown - "]="clock";
GUI_IMAGES["Countdown Timer - "]="clock";
GUI_IMAGES["Cuenta atr\u00e1s del reloj - "]="clock";
GUI_IMAGES["Dialog - "]="exclamation";

GUI_IMAGES["Dialogo - "]="exclamation";
GUI_IMAGES["Environment - "]="cloud";
GUI_IMAGES["Escenario - "]="cloud";
GUI_IMAGES["Floating Text - "]="cog";
GUI_IMAGES["Texto flotante - "]="cog";
GUI_IMAGES["Game - "]="orc";
GUI_IMAGES["Partida - "]="orc";
GUI_IMAGES["Game Cache - "]="orc";
GUI_IMAGES["Cach\u00e9 del juego - "]="orc";
GUI_IMAGES["Hashtable - "]="set";
GUI_IMAGES["Tabla hash - "]="set";
GUI_IMAGES["Hero - "]="hero";
GUI_IMAGES["H\u00e9roe - "]="hero";
GUI_IMAGES["Item - "]="item";

GUI_IMAGES["Objeto - "]="item";
GUI_IMAGES["Image - "]="cog";
GUI_IMAGES["Imagen - "]="cog";
GUI_IMAGES["Leaderboard - "]="letter";
GUI_IMAGES["Tabla de l\u00edderes - "]="letter";
GUI_IMAGES["Lightning - "]="cloud";
GUI_IMAGES["Rayo - "]="cloud";
GUI_IMAGES["Multiboard - "]="letter";
GUI_IMAGES["Tabla m\u00faltiple - "]="letter";
GUI_IMAGES["Neutral Building - "]="neutral";
GUI_IMAGES["Edificio Neutral - "]="neutral";
GUI_IMAGES["Player Group - "]="playerGroup";
GUI_IMAGES["Grupo de jugadores - "]="playerGroup";

GUI_IMAGES["Player - "]="player";
GUI_IMAGES["Jugador - "]="player";
GUI_IMAGES["Quest - "]="letter";
GUI_IMAGES["Misi\u00f3n - "]="letter";
GUI_IMAGES["Region - "]="region";
GUI_IMAGES["Regi\u00f3n - "]="region";
GUI_IMAGES["Selection - "]="selection";
GUI_IMAGES["Selecci\u00f3n - "]="selection";
GUI_IMAGES["Sound - "]="sound";
GUI_IMAGES["Sonido - "]="sound";
GUI_IMAGES["Special Effect - "]="effect";
GUI_IMAGES["Efecto especial - "]="effect";
GUI_IMAGES["Trigger - "]="cog";
GUI_IMAGES["Detonador - "]="cog";

GUI_IMAGES["Unit Group - "]="unitGroup";
GUI_IMAGES["Grupo de unidad - "]="unitGroup";
GUI_IMAGES["Unit - "]="unit";
GUI_IMAGES["Unidad - "]="unit";
GUI_IMAGES["Ubersplat - "]="cog";
GUI_IMAGES["Visibility - "]="vision";
GUI_IMAGES["Visibilidad - "]="vision";
GUI_IMAGES["If - "]="condition";
GUI_IMAGES["Then - "]="action";
GUI_IMAGES["Else - "]="action";
GUI_IMAGES["Loop - "]="action";
GUI_IMAGES["Melee Game - "]="melee";
GUI_IMAGES["Partida de refriega - "]="melee";
GUI_IMAGES["-------- "]="comment";

function GUI($container){
	var $text=$.trim($container.html());
	var $lines=$text.replace(/\t/g,"    ").replace(/<\/?p>/g,"").replace(/<br>/g,"\n").split("\n");
	var $spaces=[];
	var $nodes=[];
	var tmp;

	$container.html('<ul name="gui_tree">');
	$container=$container.children("ul");

	for(var i=0,max=$lines.length;i<max;++i){
		if(!$.trim($lines[i]))
			continue;
	
		tmp=$lines[i].match(/^ +/g);
		$lines[i]=$.trim($lines[i]);

		if(GUI_KEYWORDS.test($lines[i]))
			$lines[i]=$lines[i].replace(GUI_KEYWORDS,function(match){
				return'<span class="icon '+GUI_IMAGES[match]+'"></span> '+match
			});
		else if(i===0)
			$lines[i]='<span class="icon trigger"></span> '+$lines[i];
		else 
			$lines[i]='<span class="icon interrogation"></span> '+$lines[i];

		$spaces[i]=tmp?tmp[0].length:0;
		$nodes[i]=$("<li>"+$lines[i]+"</li>");
		if($spaces[i]===0)if(i===0){
			$container.append($lines[i]);
			$nodes[i]=$container
		}else 
			$container.append($nodes[i]);
		else if($spaces[i-1]===$spaces[i])
			$nodes[i-1].parent("ul").append($nodes[i]);
		else if($spaces[i-1]<$spaces[i]){
			$nodes[i-1].append("<ul>");
			$nodes[i-1].children("ul").append($nodes[i])}
		else
			for(var n=0;n<i;++n)
				if($nodes[n])
					if($spaces[n]===$spaces[i])
						$nodes[n].parent("ul").append($nodes[i])
	}
}

function ParseToGUI(){
	var elements=$('pre[name="gui"]');

	elements.each(function(){
		GUI($(this))
	});

	elements=$('ul[name="gui_tree"]');
	elements.each(function(){
		$(this).treeview()
	});
}

$(document).ready(function(){
	ParseToGUI()
});