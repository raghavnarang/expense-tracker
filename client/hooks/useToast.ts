import { useContext } from "react";
import { ToastContext } from "../utils";

const useToast = () => {
    const { showToast } = useContext(ToastContext);
    return showToast;
}

export default useToast;