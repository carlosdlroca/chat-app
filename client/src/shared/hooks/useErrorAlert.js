import { useEffect } from "react";
import { useAlert } from "react-alert";

export default function useErrorAlert(errorObj) {
    const alert = useAlert();
    useEffect(() => {
        if (error && error.message) {
            alert.error(error.message);
        }
    }, [error, alert]);
}
