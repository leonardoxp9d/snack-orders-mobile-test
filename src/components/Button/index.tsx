import React from 'react';
import { TouchableOpacityProps, ActivityIndicator } from 'react-native';
import { Container, ButtonText } from './styles';

interface ButtonProps extends TouchableOpacityProps{
    title: string;
    loading?: boolean;
}
   
export function Button({title, loading, ...props}: ButtonProps ) {
    return (
        <>
        <Container {...props}>
            {loading ? (
                <ActivityIndicator size={25} color="#312e38" />
            ) : (
                <ButtonText>{title}</ButtonText>
            )}
        </Container>                
        </>  
    );
};