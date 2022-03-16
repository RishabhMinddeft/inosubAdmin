import { authActions } from "./auth.action";
import { web3Actions } from "./web3.action";

export const actions = {
  ...authActions,
  ...web3Actions,
};
