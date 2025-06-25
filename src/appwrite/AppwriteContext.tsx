import { View, Text } from 'react-native'
import React, { createContext, FC, PropsWithChildren, useState } from 'react'

import Appwrite from './service'

type AppContextType ={     //this is for type safety
    appwrite: Appwrite; //here capital Appwrite is a service provider
    isLoggedIn: boolean;
    setIsLoggedIn: (isLoggedIn: boolean) => void
}

export const AppwriteContext = createContext<AppContextType>({
    appwrite: new Appwrite(), //here capital Appwrite is a service provider
    isLoggedIn: false,
    setIsLoggedIn: () => {}
})

export const AppwriteProvider: FC<PropsWithChildren> = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const defaultValue = {
        appwrite: new Appwrite,
        isLoggedIn,
        setIsLoggedIn,
    }

  return (
    <AppwriteContext.Provider value={defaultValue}>
        {children}
    </AppwriteContext.Provider>
  )
}

export default AppwriteContext