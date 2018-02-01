function gifs() {
		var aAllGifs = [].slice.apply(document.images).filter(is_gif_image);
		//aAllGifs.map(freeze_gif);
		
		function setFreezer(){
			
			document.getElementsByTagName("body")[0].onscroll = function(){
				//console.log(documenhttps://fiddle.jshell.net/3urv0tp0/#tidyt.getElementById("child-div").style.top)
				aAllGifs.forEach(function(el){
					if((document.documentElement.scrollTop+window.innerHeight - el.offsetHeight*1.2) >= el.offsetTop)//Adjust Tolerance as you want{
					   //child.style.display="block";
					   
					   setTimeout(function(){
						   freeze_gif(el);
					   }, 1000);
					
				});
				

			};
		}

		function is_gif_image(i) {
			return /^(?!data:).*\.gif/i.test(i.src);
		}

		function freeze_gif(i) {
			if(i.parentNode.childNodes.length<2) {
				var c = document.createElement('canvas');
				var w = c.width = i.width;
				var h = c.height = i.height;
				c.getContext('2d').drawImage(i, 0, 0, w, h);
				var ctx = c.getContext('2d');
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

				i.onclick = function(oEvent){
					try{
						var i = this;
						i.parentNode.lastChild.style.display = 'inline-block';
						i.style.display = 'none';
					} catch(err){
						console.log("Error: gif image click")
					}
				};
				c.onclick = function(oEvent){
					var с = this;
					c.parentNode.firstChild.style.display = 'inline-block';
					c.style.display = 'none';
				};
				// try {
					// i.src = c.toDataURL("image/gif"); // if possible, retain all css aspects
				// } catch(e) { // cross-domain -- mimic original with all its tag attributes
					
				// }
				
				for (var j = 0, a; a = i.attributes[j]; j++){
						c.setAttribute(a.name, a.value);
				}
			   // i.parentNode.replaceChild(c, i);
				i.style.display = 'none';
				i.style.cursor = 'pointer';
				c.style.cursor = 'pointer';
				c.setAttribute('data-paused-gif', true);
				i.parentNode.appendChild(c);
			}
		}
		setFreezer();
	}
  
