import { useEffect } from "react";
import { useAlert } from "react-alert";

export default function useErrorAlert(error, callback) {
    const alert = useAlert();
    useEffect(() => {
        if (error && error.message) {
            alert.error(error.message);
            callback();
        }
    }, [error, alert]);
}
