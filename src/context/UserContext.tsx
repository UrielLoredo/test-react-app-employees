import React, { ReactNode, SetStateAction } from 'react';
interface initialContext {
    userContext: boolean,
    setUserContext: React.Dispatch<SetStateAction<boolean>>
}
interface providerProps {
    children: ReactNode
}

const defaultState = {
    userContext: false,
    setUserContext: () => {}
}

const UserContext = React.createContext<initialContext>(defaultState)

const UserProvider = ({children}: providerProps) => {
    const [userContext, setUserContext] = React.useState<boolean>(false)
    return (
        <UserContext.Provider value={{ userContext, setUserContext }}>
            {children}
        </UserContext.Provider>
    )
}

export {
    UserContext, UserProvider
}