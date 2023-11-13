import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { Dropdown, IDropdownRef  } from 'react-native-element-dropdown';

import { useFormContext, Controller } from 'react-hook-form';
import { Container, Icon, Error } from './styles';

interface OptionProps {
  value: string;
  label: string;
}

interface SelectProps {
  name: string;
  placeholder: string;
  icon: string;
  options: OptionProps[];
  errorMessage?: string;
}

const Select = ({name, icon, placeholder, options, errorMessage }: SelectProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const { watch, control, formState } = useFormContext();
  
  const handleSelectFocus = useCallback(() => {
    setIsFocused(true);
  }, []);
  
  const handleSelectBlur = useCallback(() => {
    setIsFocused(false);    
    setIsFilled(!!watch(name));
  }, []); 


  useEffect(() => {
    // Atualize isFilled com base nas mudanças de valor do formulário
    setIsFilled(!!watch(name));
  }, [watch(name)]);

  return (
    <Controller
      control={control}
      name={name}
      rules={{required: errorMessage}}
      render={({ fieldState:{ error }, field:{ onChange, value } }) => (
        <>      
        {error && <Error>{error.message}</Error>}     
        <Container isFocused={isFocused} isErrored={!!error}>
          <Icon isFocused={isFocused} isFilled={isFilled} name={icon}/>  
          <View style={styles.container}>
            <Dropdown 
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              data={options}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={placeholder}
              searchPlaceholder="Perquisar..."
              value={value}              
              onFocus={handleSelectFocus}
              onBlur={handleSelectBlur}
              onChange={onChange}
            />
          </View>
        </Container>  
        </>
      )}
    />        
  );
};

export default Select;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: '#232129',
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#666360',
    fontFamily: 'Ubuntu_500Medium', 
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#f4ede8',
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});