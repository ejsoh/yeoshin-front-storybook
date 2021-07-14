import { getStorage } from "../localStorage";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const pixelTracking = (props: { [key: string]: string }) => {
	const fbq = (window as any).fbq;
	const kakaoPixel = (window as any).kakaoPixel;
	const targeting = (window as any).wptg_tagscript_vars;
	const yeoshin = (window as any).yeoshin;
	const iosyeoshin = (window as any).webkit;
	const getLoginInfo = getStorage("snsType");
	const useragent = window.navigator.userAgent;
	const isInapp = /yeoshin_/.test(useragent);
	const loginTracking = () => {
		targeting.push(function () {
			return {
				wp_hcuid: props.value,
				ti: "34284",
				ty: "Login",
				device: "web",
				items: [
					{
						i: "로그인",
						t: "로그인",
						p: "1",
						q: "1",
					},
				],
			};
		});

		yeoshin &&
			isInapp &&
			yeoshin.ysLogin(
				props.value,
				(getLoginInfo ?? "web").charAt(0).toUpperCase(),
				"0",
				"female"
			);

		iosyeoshin &&
			isInapp &&
			iosyeoshin.messageHandlers.ysLogin.postMessage({
				useridx: props.value,
				type: (getLoginInfo ?? "web").charAt(0).toUpperCase(),
				age: "0",
				male: "female",
			});
	};

	const searchKeywordTracking = () => {
		fbq("track", props.event, props.value);

		kakaoPixel("431011099591423917").search({
			keyword: props.value,
		});
	};

	const joinTracking = () => {
		kakaoPixel("431011099591423917").completeRegistration(props.value);
		fbq("track", "CompleteRegistration");
		yeoshin &&
			isInapp &&
			yeoshin.ysSignUp(
				props.value,
				props.joinType.charAt(0).toUpperCase(),
				"0",
				"female"
			);

		yeoshin && yeoshin.ysSendPointFriend(props.inviteId);

		iosyeoshin &&
			isInapp &&
			iosyeoshin.messageHandlers.ysSignUp.postMessage({
				useridx: props.value,
				type: props.joinType.charAt(0).toUpperCase(),
				age: "0",
				male: "female",
			});

		iosyeoshin &&
			isInapp &&
			iosyeoshin.messageHandlers.ysSendPointFriend.postMessage({
				useridx: props.inviteId,
			});

		targeting.push(function () {
			return {
				wp_hcuid: props.value,
				ti: "34284",
				ty: "Join",
				device: "web",
				items: [
					{
						i: "회원 가입",
						t: "회원 가입",
						p: "1",
						q: "1",
					},
				],
			};
		});
	};

	const wishListTracking = () => {
		fbq("track", props.event, props.value);

		kakaoPixel("431011099591423917").addToWishList({
			id: props.value,
		});
	};

	switch (true) {
		case props.event === "Search":
			return searchKeywordTracking();

		case props.event === "Join":
			return joinTracking();
		case props.event === "Login":
			return loginTracking();

		case props.event === "AddToWishlist":
			return wishListTracking();
	}
};
