import styled from 'styled-components/native';


export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
    padding: 24px;
    background: ${({ theme }) => theme.colors.blackMedium};
    flex-direction: row; 
    justify-content: space-between;
    align-items: center;
`;

export const ButtonLogout = styled.TouchableOpacity`
    background-color: ${({ theme }) => theme.colors.primaryColor};
    border-radius: 20px;
`;

export const ContainerForm = styled.View`
    flex: 1;
    padding: 7%;
`;
