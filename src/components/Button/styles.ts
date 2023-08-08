import styled from 'styled-components/native';


export const Container = styled.TouchableOpacity`
  width: 100%;
  height: 45px;
  background: ${({ theme }) => theme.colors.primaryColor};
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

export const ButtonText = styled.Text`
  font-family: 'Ubuntu_700Bold';
  font-size: 18px;
  color: ${({ theme }) => theme.colors.background};
`;