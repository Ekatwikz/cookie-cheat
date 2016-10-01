var cookieCheat = {
	setup: [
		[{className: "autoClick", name: "Click OFF", action: "javascript:cookieCheat.toggle(\"autoClick\")"}],
		[{className: "cookieGen", name: "More GCookies OFF", action: "javascript:cookieCheat.toggle(\"cookieGen\")"}],
		[{className: "autoPop", name: "Click GCookies OFF", action: "javascript:cookieCheat.toggle(\"autoPop\")"}],
		[{className: "autoUpgrade", name: "Upgrade OFF", action: "javascript:cookieCheat.toggle(\"autoUpgrade\")"}],
		[
			{className: "autoBuy", name: "Buy OFF", action: "javascript:cookieCheat.toggle(\"autoBuy\")"}
		],
		[
			"multi", "wrinkler",
			{className: "wrinkler", name: "Wrinkler", action: "javascript:cookieCheat.spawnWrinkler[0]()"},
			{className: "shiny", name: "Shiny", action: "javascript:cookieCheat.spawnWrinkler[0](true)"}
		]
	],
	start: function () {
		for (i in this) {
			if (typeof this[i][0] == "function") {
				this[i].push(false);
			}
		}
		
		document.getElementById("topBar").innerHTML = "<div>KATWITOOL</div>";
		var outopts=[], outdiv, outselect, out;
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
					outselect.style = "border:none;width:17px;height:16px;background:transparent;outline:none;color:white";
					outselect.onchange = function () {
						var tochange = this.parentNode.firstElementChild;
						tochange.innerHTML = document.getElementsByClassName(this.value)[0].innerHTML;
						tochange.href = document.getElementsByClassName(this.value)[0].id;
						tochange.className = this.value;
					};
					outdiv.appendChild(outselect);
				} else if (this.setup[item][0] == "option") {
					
				}
			}
			outdiv.style = "height:29px; padding-bottom: 0px"
			document.getElementById("topBar").appendChild(outdiv);
		}
	},
	toggle: function (cheat) {
		if (!this[cheat][1]) {
			this[cheat][1] = !this[cheat][1];
			this[cheat][2] = setInterval(this[cheat][0], 1);
			for (item in document.getElementsByClassName(cheat)) {
				document.getElementsByClassName(cheat)[item].innerHTML = document.getElementsByClassName(cheat)[item].innerHTML.slice(0, -3) + "ON";
			}
		} else {
			this[cheat][1] = !this[cheat][1];
			clearInterval(this[cheat][2]);
			for (item in document.getElementsByClassName(cheat)) {
				document.getElementsByClassName(cheat)[item].innerHTML = document.getElementsByClassName(cheat)[item].innerHTML.slice(0, -2) + "OFF";
			}
		}
	},
	autoClick: [function () {
		Game.ClickCookie();
	}],
	cookieGen: [function () {
		Game.shimmerTypes.golden.time = Game.shimmerTypes.golden.maxTime;
	}],
	autoPop: [function () {
		if (Game.shimmers.length) {
			Game.shimmers[0].pop();
		}
	}],
	autoUpgrade: [function () {
		for (upgrade in Game.UpgradesById) {
			if (Game.UpgradesById[upgrade].unlocked && !Game.UpgradesById[upgrade].bought && Game.UpgradesById[upgrade].pool != "toggle" && upgrade != 69) {
				Game.UpgradesById[upgrade].buy();
			}
		}
	}],
	autoBuy: [function () {
		var prices = [];
		for (item in Game.ObjectsById) {
			prices.push(Game.ObjectsById[item].price);
		}
		Game.ObjectsById[prices.indexOf(Math.min.apply(Math, prices))].buy();
	}], 
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
