import React, { useState, useCallback, SelectHTMLAttributes } from 'react';
import { StyleSheet, Text, View, ViewProps } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';

import { useFormContext, Controller } from 'react-hook-form';
import {Container, Icon, Error, IconError} from './styles'

type OptionProps = {
    id: string;
    name: string;
}

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps extends ViewProps{
  name: string;
  placeholder: string;
  icon: string;
  options: OptionProps[];
  error?: string;

  /*
  onChange?: (item: DropdownOption) => void;
  value?: string | null; */
}

const DropdownComponent = ({name, icon, placeholder, options, error, ...props}: DropdownProps) => {
  //const [value, setValue] = useState('');
  const [isFocus, setIsFocus] = useState(false);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const { watch, control } = useFormContext();
  
  const handleSelectFocus = useCallback(() => {
      setIsFocused(true);
  }, []);
  
  const handleSelectBlur = useCallback(() => {
      setIsFocused(false);        

        console.log("tipo do name: ", typeof watch(name) )
          console.log("tipo boolean do name: ", !!watch(name))
          setIsFilled(!!watch(name));
  }, []); 


  return (
    <>
    {error && <Error>{error}</Error>} 
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
      <Container isFocused={isFocused} isErrored={!!error}>
        <Icon isFocused={isFocused} isFilled={isFilled}  name={icon}/>  
        <View style={styles.container}>
          {/*{renderLabel()} */}
          <Dropdown          
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={options.map((item) => { 
              return {
                  ...item, 
                  label: item.name,
                  value: item.id, 
              } 
              })}
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
          {/* |^ 
            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
            renderLeftIcon={() => (
            
              <AntDesign
                style={styles.icon}
                color={isFocus ? 'blue' : 'black'}
                name="Safety"
                size={20}
              />
            )}
            */}

        </View>
      </Container>  
    )}
    />
    </> 
  );
  };

  export default DropdownComponent;

  const styles = StyleSheet.create({
    container: {
      /*backgroundColor: '#232129',*/
      /*borderRadius: 10,*/
      flex: 1,
      //height: "100%",
      //width: "100%",
      borderColor: '#232129',


      //padding: 16,
    },
    dropdown: {
      height: 50,
      borderColor: '#232129',
      //borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,

    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 16,
      //color: 'red', //--
      color: '#666360',
      fontFamily: 'Ubuntu_500Medium', //--


    },
    selectedTextStyle: {
      fontSize: 16,
      color: '#f4ede8',
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  });

/*
<View style={styles.container}>
  {/*{renderLabel()} }
  <Dropdown
  
    style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
    placeholderStyle={styles.placeholderStyle}
    selectedTextStyle={styles.selectedTextStyle}
    inputSearchStyle={styles.inputSearchStyle}
    iconStyle={styles.iconStyle}
    data={categories.map((item) => { 
      return {
          ...item, 
          label: item.name,
          value: item.id, 
      } 
      })}
    search
    maxHeight={300}
    labelField="label"
    valueField="value"
    placeholder={!isFocus ? 'Categorias' : '...'}
    searchPlaceholder="Search..."
    value={value}
    onFocus={handleSelectFocus}
    onBlur={handleSelectBlur}
    onChange={item => {
      setValue(item.value);
      setIsFocus(false);
    }}
    
  />
  {/* |^
    renderLeftIcon={() => (
    
      <AntDesign
        style={styles.icon}
        color={isFocus ? 'blue' : 'black'}
        name="Safety"
        size={20}
      />
    )}
    

</View>
*/