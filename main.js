var cookieCheat = {
	setup: [
		["autoClick", "Click", "javascript:cookieCheat.toggle(\"autoClick\")"],
		["cookieGen", "More GCookies", "javascript:cookieCheat.toggle(\"cookieGen\")"],
		["autoPop", "Click GCookies", "javascript:cookieCheat.toggle(\"autoPop\")"],
		["autoUpgrade", "Upgrade", "javascript:cookieCheat.toggle(\"autoUpgrade\")"],
		["autoBuy", "Buy", "javascript:cookieCheat.toggle(\"autoBuy\")"]
	],
	start: function () {
		for (i in this) {
			if (typeof this[i][0] == "function") {
				this[i].push(false);
			}
		}
		
		document.getElementById("topBar").innerHTML = "<div>KATWITOOL</div>";
		var outdiv, out;
		for (item in this.setup) {
			outdiv = document.createElement("div");
			out = document.createElement("a");
			out.id = this.setup[item][0];
			out.innerHTML = this.setup[item][1] + " OFF";
			out.href = this.setup[item][2];
			outdiv.appendChild(out);
			document.getElementById("topBar").appendChild(outdiv);
		}
	},
	toggle: function (cheat) {
		if (!this[cheat][1]) {
			this[cheat][1] = !this[cheat][1];
			this[cheat][2] = setInterval(this[cheat][0], 1);
			document.getElementById(cheat).innerHTML = document.getElementById(cheat).innerHTML.slice(0, -3) + "ON";
		} else {
			this[cheat][1] = !this[cheat][1];
			clearInterval(this[cheat][2]);
			document.getElementById(cheat).innerHTML = document.getElementById(cheat).innerHTML.slice(0, -2) + "OFF";
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
	}]
};
cookieCheat.start();
