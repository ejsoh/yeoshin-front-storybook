export const aceUserInfo = (props: string) => {
	const script = document.createElement("script");
	script.innerHTML = props;

	document.getElementsByTagName("head")[0].appendChild(script);
	const _AceGID = (function () {
		const Inf = [
			"gtc18.acecounter.com",
			"8080",
			"AS4A40951768157",
			"AW",
			"0",
			"NaPm,Ncisy",
			"ALL",
			"0",
		];

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const _CI: { [key: string]: any }[] = [];
		let _N = 0;
		const _T = new Image(0, 0);
		if (_CI.join(".").indexOf(Inf[3]) < 0) {
			_T.src = "https://" + Inf[0] + "/?cookie";
			_CI.push(Inf);
			_N = _CI.length;
		}
		return { o: _N, val: _CI };
	})();

	(function () {
		const G = _AceGID;
		const _sc = document.createElement("script");
		const _sm = document.getElementsByTagName("script")[0];
		if (G.o != 0) {
			const _A = G.val[G.o - 1];
			const _G = _A[0].substr(0, _A[0].indexOf("."));
			const _C = _A[7] != "0" ? _A[2] : _A[3];
			const _U = _A[5].replace(/\\,/g, "_");
			_sc.src =
				"https:" +
				"//cr.acecounter.com/Web/AceCounter_" +
				_C +
				".js?gc=" +
				_A[2] +
				"&id=" +
				"&py=" +
				_A[4] +
				"&gd=" +
				_G +
				"&gp=" +
				_A[1] +
				"&up=" +
				_U +
				"&rd=" +
				new Date().getTime();
			_sm.parentNode?.insertBefore(_sc, _sm);
			return _sc.src;
		}
	})();
};
