import { chainId as rightChain } from "../constants"
import { toast } from "react-toastify"

export const checkNetwork = (account, chainId, t) => {
  if (!account) {
    toast(t("Please connect your wallet and try again"))
    return false
  } else if (!!account && chainId !== rightChain) {
    toast(t("You are connected to the wrong network"))
    return false
  }
  return true
}