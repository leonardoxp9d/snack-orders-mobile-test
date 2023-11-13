import styled, { css } from 'styled-components/native';

export const Container = styled.View`
    background-color: ${({ theme }) => theme.colors.blackMedium};
    flex: 1;
    height: 180px;
    padding: 0 10%;
    border-radius: 10px 10px 0 0;
`;

export const Title = styled.Text`
  background-color: ${({ theme }) => theme.colors.blackMedium};
  color: ${({ theme }) => theme.colors.white};
  font-family: 'Ubuntu_700Bold';
  font-size: 20px;
  padding: 10px 10px 30px 10px;
  padding: 4% 4% 8% 4%;

  text-align: center;
`;