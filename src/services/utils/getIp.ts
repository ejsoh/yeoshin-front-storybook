import { getStorage, setStorage } from "services/utils/localStorage";
import publicIp from "public-ip";
import { v4 as uuidv4 } from "uuid";

export const getIp = (async () => {
	const ip = await publicIp.v4();
	try {
		const getIp = await ip;
		setStorage("ip", getIp);
	} catch (error) {
		fetch("https://api.ipify.org?format=json")
			.then(response => response.json())
			.then(res => setStorage("ip", res.ip))
			.catch(err => setStorage("ip", uuidv4()));
	}
	return ip;
})();

export const getIpAction = (excute: (ip: string) => void) => {
	const isIp = getStorage("ip");

	isIp
		? excute(isIp)
		: getIp
				.then(res => {
					setStorage("ip", res);
					return excute(res);
				})
				.catch(err => {
					fetch("https://api.ipify.org?format=json")
						.then(response => {
							return response.json();
						})
						.then(res => {
							setStorage("ip", res.ip);

							return excute(res.ip);
						})
						.catch(err => {
							setStorage("ip", uuidv4());

							return excute(uuidv4());
						});
				});
};
