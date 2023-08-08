import React, { useState, useCallback } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { Dropdown,  } from 'react-native-element-dropdown';

import { useFormContext } from 'react-hook-form';
import { Container, Icon, Error } from './styles'
import { useLinkProps } from '@react-navigation/native';

interface OptionProps {
  value: string;
  label: string;
}

interface SelectProps extends ViewProps{
  name: string;
  placeholder: string;
  icon: string;
  options: OptionProps[];
  error?: string;

  onChange: (item: OptionProps) => void;
  value: string; 
}

const Select = ({name, icon, placeholder, options, error, onChange, value }: SelectProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const { watch } = useFormContext();
  
  const handleSelectFocus = useCallback(() => {
    setIsFocused(true);
  }, []);
  
  const handleSelectBlur = useCallback(() => {
    setIsFocused(false);    
    setIsFilled(!!watch(name));
  }, []); 

  return (
    <>
    {error && <Error>{error}</Error>} 
    
      <Container isFocused={isFocused} isErrored={!!error}>
        <Icon isFocused={isFocused} isFilled={isFilled}  name={icon}/>  
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
            onChange={onChange}            
            onFocus={handleSelectFocus}
            onBlur={handleSelectBlur}
          />
        </View>
      </Container>  
    
    </> 
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