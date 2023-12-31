import styled from 'styled-components/native';


export const Container = styled.TouchableOpacity`
  width: 100%;
  height: 45px;
  background: ${({ theme }) => theme.colors.primaryColor};
  border-radius: 15px;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px; 
  opacity: ${props => (props.disabled ? 0.4 : 1)}
`;

export const Text = styled.Text`
  font-family: 'Ubuntu_700Bold';
  font-size: 18px;
  color: ${({ theme }) => theme.colors.background};
`;