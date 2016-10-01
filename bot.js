document.getElementById("topBar").innerHTML = "<div>KATWITOOL [BOT]</div>";
setInterval(function () {
		Game.ClickCookie();
		Game.shimmerTypes.golden.time = Game.shimmerTypes.golden.maxTime;
		if (Game.shimmers.length) {
			Game.shimmers[0].pop();
		}
		for (upgrade in Game.UpgradesById) {
			if (Game.UpgradesById[upgrade].unlocked && !Game.UpgradesById[upgrade].bought && Game.UpgradesById[upgrade].pool != "toggle" && upgrade != 69) {
				Game.UpgradesById[upgrade].buy();
			}
		}
		var prices = [];
		for (item in Game.ObjectsById) {
			prices.push(Game.ObjectsById[item].price);
		}
		Game.ObjectsById[prices.indexOf(Math.min.apply(Math, prices))].buy();
	}, 1);
