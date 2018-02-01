function start_gif_pauser(){
	function draw_button(ctx) {
		ctx.fillStyle = "rgba(220,220,220, 0.0)";
		ctx.strokeStyle = "rgba(220,220,220, 0.6)";;//"rgba(40,40,40, 0.8)";
		ctx.lineWidth = 25;
		ctx.lineJoin = "round";
		ctx.lineCap="round"
		ctx.beginPath();
		ctx.moveTo(60,50);
		ctx.lineTo(25,75);
		ctx.lineTo(25,25);
		ctx.lineTo(60,50);	
		ctx.stroke();
		ctx.fill();		
		ctx.shadowBlur=10;
		ctx.shadowColor="black";	
	}
	function FindByAttributeValue(attribute, value, element_type)    {
	  element_type = element_type || "*";
	  var All = document.getElementsByTagName(element_type);
	  for (var i = 0; i < All.length; i++)       {
		if (All[i].getAttribute(attribute) == value) { return All[i]; }
	  }
	}

	function set_canvas(img, i) {
		if(FindByAttributeValue('data-paused-gif', i, 'canvas').length <1) {
			var c = document.createElement('canvas');
			var w = c.width = img.width;
			var h = c.height = img.height;
			c.getContext('2d').drawImage(i, 0, 0, w, h);
			var ctx = c.getContext('2d');
			draw_button(ctx);			

			img.onclick = function(oEvent){
				try{
					var img = this;
					var sAttr = img.getAttribute('data-paused-gif');
					FindByAttributeValue('data-paused-gif', sAttr, 'canvas').style.display = 'inline-block';
					img.style.display = 'none';
				} catch(err){
					console.log("Error: gif image click")
				}
			};
			c.onclick = function(oEvent){
				var с = this;
				var sAttr = c.getAttribute('data-paused-gif');
				FindByAttributeValue('data-paused-gif', sAttr, 'img').style.display = 'inline-block';			
				c.style.display = 'none';
			};
			
			
			for (var j = 0, a; a = img.attributes[j]; j++){
				c.setAttribute(a.name, a.value);
			}

			img.style.display = 'none';
			img.style.cursor = 'pointer';
			c.style.cursor = 'pointer';
			c.setAttribute('data-paused-gif', i);
			img.insertBefore(c);
		}
	}

	function init_gif_pauser(oImages) {
		let aGifs = [];
		if(!oImages) {
			aGifs = [].slice.apply(document.images).filter(is_gif_image);
		}
		for(let i=0; i<aGifs.length; i++)
			aGifs[i].setAttribute('data-paused-gif', i);
			if(aGifs[i].complete) {
			set_canvas(aGifs[i], i);  
			}
			aGifs[i].onload = function (i) {
				set_canvas(aGifs[i], i);   
			};
		}
	}
	init_gif_pauser();
}

start_gif_pauser();
