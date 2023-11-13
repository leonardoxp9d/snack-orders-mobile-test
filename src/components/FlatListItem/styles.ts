import { Platform } from 'react-native';
import styled, { css } from 'styled-components/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

// import  {MaterialCommunityIcons}  from '@expo/vector-icons';
 

interface ContainerProps {
  isErrored: boolean;
}

interface IconProps {
  isFocused: boolean;
  isFilled: boolean;
}

export const Container = styled.View<ContainerProps>`
  flex-direction: row;
  width: 100%;
  height: 270px;
  padding: 10px;
  margin-bottom: 10px;

  background-color: ${({ theme }) => theme.colors.inputs};
  border-color: ${({ theme }) => theme.colors.inputs};
  border-width: 2px;
  border-style: solid;
  border-radius: 15px;

  ${props =>
    props.isErrored &&
    css`
      border-color: ${props.theme.colors.error};
  `}
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

