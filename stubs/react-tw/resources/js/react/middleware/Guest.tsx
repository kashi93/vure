import guestAxios from "@/helpers/axiosGuest";
import { useAuthenticateContext } from "./Authenticate";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

export const Guest = () => {
    const { user, setUser } = useAuthenticateContext();

    const getUser = async () => {
        const response = await guestAxios.get("get-user");

        switch (response.status) {
            case 200:
                const { data } = response.data;
                return Promise.resolve(data);
            default:
                return Promise.resolve(null);
        }
    }

    useEffect(() => {
        getUser()
            .then((res) => {
                if (res != null) {
                    setUser(res.user)
                }
            })
    }, [])

    return <Outlet />
}