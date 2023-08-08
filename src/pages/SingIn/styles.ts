import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.background};
    padding: 0 20px;
    //border: 1px solid red;
`;

export const Logo = styled.Image`
    width: 100%;
    margin-bottom: 50px;
    //border: 1px solid red;
`;

export const InputContainer = styled.View`
    width: 75%;
    align-items: center;
    justify-content: center;
    //border: 1px solid red;
`;