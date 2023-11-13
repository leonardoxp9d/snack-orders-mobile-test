import styled from 'styled-components/native';


export const Container = styled.TouchableOpacity`
  width: 100%;
  height: 45px;
  background-color: transparent;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px; 
  border: 2px solid ${({ theme }) => theme.colors.primaryColor};
  opacity: ${props => (props.disabled ? 0.4 : 1)}
`;

export const ButtonText = styled.Text`
  font-family: 'Ubuntu_700Bold';
  font-size: 18px;
  color: ${({ theme }) => theme.colors.primaryColor};
`;