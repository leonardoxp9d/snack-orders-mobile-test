import React, {
    useState,
    useCallback,
} from 'react';
import { TextInputProps} from 'react-native';
import { useFormContext, Controller } from 'react-hook-form';
import { Container, TextInput, Icon, Error, IconError } from './styles';

interface TextareaProps extends TextInputProps{
    name: string;
    icon: string;
    errorMessage?: string;
    numeric?: boolean;
}
   
export function Textarea({name, icon, errorMessage, numeric, ...props}: TextareaProps ) {
    
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const { watch, control } = useFormContext();
    
    const handleTextareaFocus = useCallback(() => {
        setIsFocused(true);
    }, []);
    
    const handleTextareaBlur = useCallback(() => {
        setIsFocused(false);        
        setIsFilled(!!watch(name));
    }, []); 

    return (
        <Controller
            control={control}
            name={name}
            rules={{ required: errorMessage }}
            render={({ fieldState: { error }, field: { value, onChange } }) => (
                <>
                {error && <Error>{error.message}</Error>}        
                <Container isFocused={isFocused} isErrored={!!error}>
                    <Icon isFocused={isFocused} isFilled={isFilled}  name={icon}/>
                    <TextInput
                        {...props}
                        value={value}
                        onChangeText={onChange}
                        onFocus={handleTextareaFocus}
                        onBlur={handleTextareaBlur}
                        multiline={true}
                        numberOfLines={4}
                    /> 
                    {error && <IconError name="alert-circle-outline"></IconError>}
                </Container>  
                </>
            )}
        /> 
    );
};