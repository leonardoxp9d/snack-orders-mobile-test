import styled, { css } from 'styled-components/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


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
  align-items: center;
  width: 100%;
  height: 50px;
  padding: 0 4px 0 10px;
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

export const Icon = styled(MaterialCommunityIcons)<IconProps>`
  margin-right: 10px;
  font-size: 25px;
  color: ${({ theme }) => theme.colors.grayHard};

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
`;

export const Error = styled.Text`
  width: 100%;
  font-family: 'Ubuntu_500Medium';
  font-size: 12px;
  color: ${({ theme }) => theme.colors.error};
`;
