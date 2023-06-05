import { createContext, useContext, useState } from 'react'
import { Secure } from './Secure'
import { Guest } from './Guest'
import { RedirectIfAuthenticated } from './RedirectIfAuthenticated';

interface AuthenticateContextType {
    user: { [key: string]: any } | null,
    setUser: React.Dispatch<any>
}

const AuthenticateContext = createContext<AuthenticateContextType>({
    user: null,
    setUser: () => null
});

const Authenticate = ({ children }) => {
    const [user, setUser] = useState(null);
    return (
        <AuthenticateContext.Provider value={{ user, setUser }}>
            {children}
        </AuthenticateContext.Provider>
    )
}


Authenticate.Secure = Secure
Authenticate.Guest = Guest
Authenticate.RedirectIfAuthenticated = RedirectIfAuthenticated

export default Authenticate;
export const useAuthenticateContext = () => useContext(AuthenticateContext);