import React, {
    InputHTMLAttributes,
    useState,
    useCallback,
} from 'react';
import { TextInputProps, ViewStyle, StyleProp } from 'react-native';
import { useFormContext, Controller } from 'react-hook-form';
import { Container, TextInput, Icon, Error, IconError } from './styles';

interface InputProps extends TextInputProps{
    name: string;
    icon: string;
    error?: string;
}
   
export function Input({name, icon, error, ...props}: InputProps ) {
    
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const { watch, control } = useFormContext();
    
    const handleInputFocus = useCallback(() => {
        setIsFocused(true);
    }, []);
    
    const handleInputBlur = useCallback(() => {
        setIsFocused(false);        
        if (watch(name) !== undefined ){
            setIsFilled(!!watch(name));
        }
    }, []); 
    
    return (
        <>
        {error && <Error>{error}</Error>}        
        <Controller
            control={control}
            name={name}
            render={({ field: { value, onChange  } }) => (
                <Container isFocused={isFocused} isErrored={!!error}>
                    <Icon isFocused={isFocused} isFilled={isFilled}  name={icon}/>
                    <TextInput
                        {...props}
                        value={value}
                        onChangeText={onChange}
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                    /> 
                    {error && <IconError name="alert-circle-outline"></IconError>}
                </Container>                
            )}
        /> 
        </>  
    );
};