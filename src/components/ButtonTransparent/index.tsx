import React from 'react';
import { TouchableOpacityProps, ActivityIndicator } from 'react-native';
import { Container, ButtonText } from './styles';
import { useTheme } from 'styled-components';

interface ButtonProps extends TouchableOpacityProps{
    name: string;
    loading?: boolean;
}
   
export function ButtonTransparent({name, loading, ...props}: ButtonProps ) {
    const theme = useTheme();

    return (
        <>
        <Container {...props}>
            {loading ? (
                <ActivityIndicator size={25} color={theme.colors.primaryColor} />
            ) : (
                <ButtonText>{name}</ButtonText>
            )}
        </Container>                
        </>  
    );
};