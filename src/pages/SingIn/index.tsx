import React, { useContext } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { AuthContext } from '../../contexts/AuthContext';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import {
    Container,
    Logo,
    InputContainer,
} from './styles';

interface SignInFormData {
    email: string;
    password: string;
}

const schema = yup.object().shape({
    email: yup.string().email('Digite um e-mail válido').required('E-mail obrigatório'),
    password: yup.string().required('Senha obrigatória'),
});

export default function SignIn() {
    const { signIn, loadingAuth } = useContext(AuthContext);

    const useFormMethods = useForm<SignInFormData>({
        resolver: yupResolver(schema),
    });

    async function handleLogin({email, password}: SignInFormData){
        await signIn({email, password});
        console.log(email, password)
    }

    return (
        <Container>
            <Logo
                source={require('../../assets/logo.png')}
            />

            <InputContainer>
                <FormProvider {...useFormMethods}>
                    <Input
                        placeholder="E-mail"
                        autoCapitalize='none'
                        name="email"
                        icon="email-outline"
                        errorMessage="E-mail Obrigatório"
                    /> 

                    <Input
                        placeholder="Senha"
                        autoCapitalize='none'
                        secureTextEntry={true}
                        name="password"
                        icon="lock-outline"
                        errorMessage="Senha Obrigatória"
                    /> 

                    <Button
                        name="Acessar"
                        loading={!!loadingAuth}
                        onPress={useFormMethods.handleSubmit(handleLogin)}
                    />
                </FormProvider>
            </InputContainer>
        </Container>
    );
}
