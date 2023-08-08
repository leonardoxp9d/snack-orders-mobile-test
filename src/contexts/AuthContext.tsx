import React, { useState ,createContext, ReactNode, useEffect, useRef } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { api } from '../services/api';

import Toast from 'react-native-toast-message';

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials:SignInProps) => Promise<void>;
    loadingAuth: boolean;
    loading: boolean;
    signOut: () => Promise<void>;
}

//import Toast, { IToast } from '../components/Toast';

type UserProps = {
    id: string;
    name: string;
    email: string;
    token: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

type SignInProps = {
    email: string;
    password: string;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({children}: AuthProviderProps) {
    const [user, setUser] = useState<UserProps>({
        id: '',
        name: '',
        email: '',
        token: '',
    });

    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    const isAuthenticated = !!user.name;

    useEffect(() => {
        async function getUser(){
            // Pegar os dados salvos do user
            const userInfo = await AsyncStorage.getItem('@sujeitopizzaria');
            let hasUser: UserProps = JSON.parse(userInfo || '{}');
            
            /* Verifica se recebemos as informaçẽos do user*/
            if(Object.keys(hasUser).length > 0) {
                api.defaults.headers.common['Authorization'] = `Bearer ${hasUser.token}`;

                setUser({
                    id: hasUser.id,
                    name: hasUser.name,
                    email: hasUser.email,
                    token: hasUser.token,
                })                
            }
            setLoading(false);
        }
        getUser();
    }, []);

    async function signIn({ email, password }: SignInProps) {
        setLoadingAuth(true);

        try{
            const response = await api.post('/session', {
                email,
                password,
            })

            const { id, name, token } = response.data

            const data = {
                ...response.data
            }
            
            await AsyncStorage.setItem('@sujeitopizzaria', JSON.stringify(data));

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            setUser({
                id,
                name,
                email,
                token,
            })

            setLoadingAuth(false);

            Toast.show({
                type: 'success',
                text1: `Logado com sucesso! 😁`,
                visibilityTime: 2000,
            });
        }catch(error: any){
            if(error.response.data.error){
                const errorMenssage = error.response.data.error; 
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: `${errorMenssage} 😞`,
                    visibilityTime: 2000,

                });
                //console.log('Erro do back:', errorMenssage)
                //return;
            }else {
                console.log("Erro inesperado ao cadastrar", error);
            }        
            setLoadingAuth(false);
        }        
    }

    async function signOut() {
        await AsyncStorage.clear()
        .then( () => {
            setUser({
                id: '',
                name: '',
                email: '',
                token: '',
            })
        });
    }

    return(
        <AuthContext.Provider 
            value={{
                user, 
                isAuthenticated, 
                signIn, 
                loadingAuth, 
                loading,
                signOut
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}