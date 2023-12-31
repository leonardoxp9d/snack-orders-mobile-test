import React from 'react';
import { TouchableOpacityProps, ActivityIndicator } from 'react-native';
import { Container, Text } from './styles';
import { useTheme } from 'styled-components';

interface ButtonProps extends TouchableOpacityProps{
    name: string;
    loading?: boolean;
}
   
export function Button({name, loading, ...props}: ButtonProps ) {
    const theme = useTheme();

    return (
        <>
        <Container {...props}>
            {loading ? (
                <ActivityIndicator size={25} color={theme.colors.background} />
            ) : (
                <Text>{name}</Text>
            )}
        </Container>                
        </>  
    );
};