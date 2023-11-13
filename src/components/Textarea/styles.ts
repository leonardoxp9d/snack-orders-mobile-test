import { Platform } from 'react-native';
import styled, { css } from 'styled-components/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

interface IconProps {
  isFocused: boolean;
  isFilled: boolean;
}

export const Container = styled.View<ContainerProps>`
  flex-direction: row;
  width: 100%;
  height: 100px;
  padding: 10px;
  margin-bottom: 10px;

  background-color: ${({ theme }) => theme.colors.inputs};
  border-color: ${({ theme }) => theme.colors.inputs};
  border-width: 2px;
  border-style: solid;
  border-radius: 15px;

  ${props =>
    props.isFocused &&
    css`
      border-color: ${props.theme.colors.primaryColor};  
  `}

  ${props =>
    props.isErrored &&
    css`
      border-color: ${props.theme.colors.error};
  `}
`;

export const Icon = styled(Feather)<IconProps>`
  color: ${({ theme }) => theme.colors.grayHard};
  font-size: 24px;
  margin-right: 10px;
  //top: -55px;


  ${props =>
    (props.isFocused || props.isFilled) &&
    css`
      color: ${props.theme.colors.primaryColor};
  `}
`;

export const TextInput = styled.TextInput.attrs(({ theme }) => ({
  placeholderTextColor: theme.colors.grayHard,
}))`
  flex: 1;
  font-family: 'Ubuntu_500Medium';
  font-size: 16px;
  color: ${({ theme }) => theme.colors.white};
  padding-top: 3px;
  ${Platform.OS === 'android' ? 'text-align-vertical: top;' : 'text-align: top;'};
`;

export const Error = styled.Text`
  width: 100%;
  font-family: 'Ubuntu_500Medium';
  font-size: 12px;
  color: ${({ theme }) => theme.colors.error};
`;

export const IconError = styled(MaterialCommunityIcons)`
  margin-left: 10px;
  font-size: 22px;
  color: ${({ theme }) => theme.colors.error};
`;

