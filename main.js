var outopts=[], outdiv, outselect, out;var cookieCheat = {
	setup: [
		[{className: "autoClick", name: "Click OFF", action: "javascript:cookieCheat.toggle('autoClick', 0)"}],
		[{className: "cookieGen", name: "More GCookies OFF", action: "javascript:cookieCheat.toggle('cookieGen', 0)"}],
		[{className: "autoPop", name: "Click GCookies OFF", action: "javascript:cookieCheat.toggle('autoPop', 0)"}],
		[{className: "autoUpgrade", name: "Upgrade OFF", action: "javascript:cookieCheat.toggle('autoUpgrade', 0)"}],
		
		[
			"multi", "wrinkler",
			{className: "wrinkler", name: "Wrinkler", action: "javascript:cookieCheat.spawnWrinkler[0]()"},
			{className: "shiny", name: "Shiny", action: "javascript:cookieCheat.spawnWrinkler[0](true)"}
		],
		[
			"multi", "autobuy",
			{className: "buyCheap", name: "Buy ch OFF", action: "javascript:cookieCheat.toggle('autoBuy', 0, 'buyCheap')"},
			{className: "buyEff", name: "Buy eff OFF", action: "javascript:cookieCheat.toggle('autoBuy', 1, 'buyEff')"}
		],
	],
	start: function () {
		for (i in this) {
			if (typeof this[i][0] == "function") {
				this[i].push(false);
			}
		}
		
		document.getElementById("topBar").innerHTML = "<div>KATWITOOL</div>";
		//var outopts=[], outdiv, outselect, out;
		for (item in this.setup) {
			outdiv = document.createElement("div");
			out = document.createElement("a");
			outselect = document.createElement("select");
			outopts=[];
			
			if (this.setup[item].length == 1) {
				out.innerHTML = this.setup[item][0].name;
				out.href = this.setup[item][0].action;
				out.className = this.setup[item][0].className;
				outdiv.appendChild(out);
			} else {
				if (this.setup[item][0] == "multi") {
					out.innerHTML = this.setup[item][2].name;
					out.href = this.setup[item][2].action;
					out.className = this.setup[item][2].className;
					out.id = this.setup[item][1];
					outdiv.appendChild(out);
					
					for (i = 2; i < this.setup[item].length; i++) {
						outopts.push("<option value=\"" + this.setup[item][i].className + "\"class=\"" + this.setup[item][i].className + "\"id=\"" + this.setup[item][i].action + "\">" + this.setup[item][i].name + "</option>");
					}
					outselect.innerHTML = outopts.join("");
					
					outselect.onchange = function () {
						var tochange = this.parentNode.firstElementChild;
						tochange.innerHTML = document.getElementsByClassName(this.value)[0].innerHTML;
						tochange.href = document.getElementsByClassName(this.value)[0].id;
						tochange.className = this.value;
					};
					
					outselect.style = "border:none;width:17px;height:16px;background:transparent;outline:none;color:white";
					outdiv.appendChild(outselect);
				} else if (this.setup[item][0] == "option") {
				}
			}
			outdiv.style = "height:29px"
			document.getElementById("topBar").appendChild(outdiv);
		}
	},
	toggle: function (cheat, type, className) {
		if (!className) {
			className = cheat;
		}
		if (!this[cheat][1]) {
			this[cheat][1] = !this[cheat][1];
			if (this[cheat][2]) {
				clearInterval(this[cheat][2]);
			}
			this[cheat][2] = setInterval(this[cheat][0][type], 1);
			var state = "ON";
			for (i = 0; i < document.getElementsByClassName(className).length; i++) {
				console.log(i);
				document.getElementsByClassName(className)[i].innerHTML = document.getElementsByClassName(className)[i].innerHTML.slice(0, -3) + state;
			}
		} else {
			this[cheat][1] = !this[cheat][1];
			clearInterval(this[cheat][2]);
			this[cheat][2] = !this[cheat][2];
			var state = "OFF";
			for (i = 0; i < document.getElementsByClassName(className).length; i++) {
				console.log(i);
				document.getElementsByClassName(className)[i].innerHTML = document.getElementsByClassName(className)[i].innerHTML.slice(0, -2) + state;
			}
		}
	},
	autoClick: [[function () {
		Game.ClickCookie();
	}]],
	cookieGen: [[function () {
		Game.shimmerTypes.golden.time = Game.shimmerTypes.golden.maxTime;
	}]],
	autoPop: [[function () {
		if (Game.shimmers.length) {
			Game.shimmers[0].pop();
		}
	}]],
	autoUpgrade: [[function () {
		for (upgrade in Game.UpgradesById) {
			if (Game.UpgradesById[upgrade].unlocked && !Game.UpgradesById[upgrade].bought && Game.UpgradesById[upgrade].pool != "toggle" && upgrade != 69) {
				Game.UpgradesById[upgrade].buy();
			}
		}
	}]],
	autoBuy: [[function () {
		var prices = [];
		for (item in Game.ObjectsById) {
			prices.push(Game.ObjectsById[item].price);
		}
		Game.ObjectsById[prices.indexOf(Math.min.apply(Math, prices))].buy();
	}, function () {
		var efficiencies = [];
		for (item in Game.ObjectsById) {
			efficiencies.push(Game.ObjectsById[item].price / Game.ObjectsById[item].storedCps);
			/*or this? someone help me understand the difference
			efficiencies.push(Game.ObjectsById[item].price / Game.ObjectsById[item].cps(ObjectsById[2]));*/
		}
		Game.ObjectsById[efficiencies.indexOf(Math.min.apply(Math, efficiencies))].buy();
	}]], 
	spawnWrinkler: [function (shiny) {
		for (wrinkler in Game.wrinklers) {
			if (!Game.wrinklers[wrinkler].phase) {
				Game.wrinklers[wrinkler].phase++;
				if (shiny) {
					Game.wrinklers[wrinkler].type = 1;
				}
				break;
			}
		}
	}]
};
cookieCheat.start();
