import { useContext, useEffect } from "react";
import { StoreContext } from "store/";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";

export default function useAuthorization() {
    //eslint-disable-next-line
    const [state, dispatch] = useContext(StoreContext);
    const history = useHistory();
    const alert = useAlert();

    useEffect(() => {
        if (!state.isAuthenticated) {
            alert.error("You need to be signed in to do that!");
            history.push("/");
        }
    }, [alert, history, state.isAuthenticated]);
}
