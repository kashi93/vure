import { useEffect, useState } from "react";
import { useAuthenticateContext } from "./Authenticate";
import authAxios from "@/helpers/authAxios";
import { Navigate, Outlet } from "react-router-dom";


export const Secure = () => {
    const { user, setUser } = useAuthenticateContext();
    const [fetching, setFetching] = useState(true);

    const getUser = async () => {
        if (!fetching) {
            setFetching(true);
        }

        const response = await authAxios.get("get-user");

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
            .finally(() => setFetching(false))
    }, [])

    if (fetching) {
        return <></>;
    }

    if (user === null) {
        return (<Navigate to="/login" />)
    }

    return <Outlet />
}