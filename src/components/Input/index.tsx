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
    errorMessage?: string;
    numeric?: boolean;
}
   
export function Input({name, icon, errorMessage, numeric, ...props}: InputProps ) {
    
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const { watch, control } = useFormContext();
    
    const handleInputFocus = useCallback(() => {
        setIsFocused(true);
    }, []);
    
    const handleInputBlur = useCallback(() => {
        setIsFocused(false);        
        //if (watch(name) !== undefined ){
        setIsFilled(!!watch(name));
        //}
    }, []); 
    /*

    const handleTextChange = (text: string) => {
        // Remove todos os caracteres não numéricos
        const numericText = text.replace(/[^0-9]/g, '');
        // Atualize o valor no campo de entrada usando onChange
        onChange(numericText);
    };*/

    return (
        <Controller
            control={control}
            name={name}
            rules={{ required: errorMessage }}
            render={({ fieldState: { error }, field: { value, onChange } }) => {
                const handleNumericTextChange = useCallback((data: string) => {
                    // Remove todos os caracteres não numéricos
                    const numericText = data.replace(/[^0-9]/g, '');
                    // Remove os zeros à esquerda das primeiras casas
                    const trimmedNumericText = numericText.replace(/^0+/, '');
                    // Atualize o valor no campo de entrada usando onChange do Controller
                    onChange(trimmedNumericText);
                }, []); 

                return (
                    <>
                    {error && <Error>{error.message}</Error>}        
                    <Container isFocused={isFocused} isErrored={!!error}>
                        <Icon isFocused={isFocused} isFilled={isFilled}  name={icon}/>
                        <TextInput
                            {...props}
                            value={value}
                            onChangeText={(data: string) => {
                                if( numeric ) {
                                    handleNumericTextChange(data);
                                }else {
                                    onChange(data);
                                }
                            }}
                            onFocus={handleInputFocus}
                            onBlur={handleInputBlur}
                        /> 
                        {error && <IconError name="alert-circle-outline"></IconError>}
                    </Container>  
                    </>  
                );
            }}
        /> 
    );
};