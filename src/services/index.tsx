import {
	confirmNumberMapper,
	verifyRecommandMapper,
	verifySmsMapper,
} from "./mapper/verificationMapper";
import { removeCookies, setCookie } from "./utils/cookies";

import axiosConfig from "./utils/requestConfig";
import { getIp } from "./utils/getIp";
import login from "components/organisms/login";
import { logout } from "./utils/login";
import { errorHandler } from "./utils/errorException";

export {
	verifyRecommandMapper,
	verifySmsMapper,
	login,
	logout,
	axiosConfig,
	setCookie,
	removeCookies,
	getIp,
	confirmNumberMapper,
	errorHandler,
};
