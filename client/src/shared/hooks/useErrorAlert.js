import { useEffect } from "react";
import { useAlert } from "react-alert";

export default function useErrorAlert(error, callback = () => null) {
    const alert = useAlert();
    useEffect(() => {
        if (error && error.message) {
            const { message } = error;
            alert.error(message);
            callback();
        }
    }, [error, alert, callback]);
}
