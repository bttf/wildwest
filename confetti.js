var confetti = (function(options){
	var defaults = {
		height : (window.innerHeight)?window.innerHeight:(document.documentElement.offsetHeight)?document.documentElement.offsetHeight:document.body.offsetHeight,
		width : (window.innerWidth)?window.innerWidth:(document.documentElement.offsetWidth)?document.documentElement.offsetWidth:document.body.offsetWidth,
		colors : ["#F00","#0F0","#00F"],
		maxSize : 20,
		fallSpeed : 2
	};
	if(options) {
		for(var key in options) {
			defaults[key] = options[key];
		}
	}
	
	var confetti_container = document.createElement("div");
	confetti_container.style.cssText = "height:0; width:0; overflow:visible; top:0; left:0;position:absolute;";
	
	var confetti_piece = function() {
		this.x = Math.random() * defaults.width;
		this.y = 0;
		this.xdirection = (Math.random() > .5)?1:-1;
		this.rotdirection = (Math.random() > .5)?1:-1;
		this.rotspeed = Math.random() + .5;
		this.height = Math.random() * defaults.maxSize;
		this.width = Math.random() * defaults.maxSize;
		this.rotation = Math.random() * 360;
		this.color = defaults.colors[Math.round(Math.random() * (defaults.colors.length-1))];
		this.yspeed = (Math.random() + .5) * defaults.fallSpeed
		this.xspeed = (Math.random() + .1);
		this.element = document.createElement("div");
		this.render();
	}
	
	confetti_piece.prototype.render = function() {
		var csstext = "";
		this.y += this.yspeed;
		this.x += this.xspeed * this.xdirection;
		this.rotation += this.rotspeed * this.rotdirection;
		if(Math.random() > .95) { this.xdirection *= -1; }
		if(Math.random() > .95) { this.rotdirection *= -1; }
		csstext = "position:absolute;";
		csstext += "top:"+this.y+"px;"; 
		csstext += "left:"+this.x+"px;";
		csstext += "height:"+this.height+"px;";
		csstext += "width:"+this.width+"px;";
		csstext += "background-color:"+this.color+";";
		csstext += "-moz-transform:rotate("+this.rotation+"deg);";
		csstext += "-webkit-transform:rotate("+this.rotation+"deg);";
		csstext += "-o-transform:rotate("+this.rotation+"deg);";
		csstext += "filter:progid:DXImageTransform.Microsoft.BasicImage(rotation=1.5);";
		this.element.style.cssText = csstext;
	}
	
	var elements = [];
	
	var generate_piece = function() {
		var t_piece = new confetti_piece();
		elements.push(t_piece);
		confetti_container.appendChild(t_piece.element);
	}
	
	var render_pieces = function() {
		var deletion_index = [];
		for(var i=0;i<elements.length;i++) {
			elements[i].render();
			if(elements[i].y > defaults.height || elements[i].x > defaults.width) {
				deletion_index.push(i);
			}
		}
		for(var i=0;i<deletion_index.length;i++) {
			try{
				confetti_container.removeChild(elements[deletion_index[i]].element);
			} catch (e){}
			elements.splice(deletion_index[i],1);
		}
	}
	
	return {
		
		start: function(){
			document.getElementsByTagName("body")[0].appendChild(confetti_container);
			for(var i=0;i<10;i++) {
				generate_piece();
			}
			setInterval(generate_piece, 400);
			setInterval(render_pieces, 50);
		},
		
		stop: function() {
			document.getElementsByTagName("body")[0].removeChild(confetti_container);
			clearInterval(generate_piece);
			clearInterval(render_pieces);
		}
	}
	
});

