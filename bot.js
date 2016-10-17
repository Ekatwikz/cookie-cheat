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
		var efficiencies = [];
		for (item in Game.ObjectsById) {
			efficiencies.push(Game.ObjectsById[item].price / Game.ObjectsById[item].storedCps);
		}
		Game.ObjectsById[efficiencies.indexOf(Math.min.apply(Math, efficiencies))].buy();
	}, 1);
