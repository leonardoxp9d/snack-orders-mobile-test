import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 20px;
  flex-direction: column;
  align-items: center;
  width: 130px;
  height: 240px;
  margin: 5px;
  //border: 1px solid ${({ theme }) => theme.colors.primaryColor};
`;

export const ImageProduct = styled.Image`
  height: 100px;
  width: 100px;
  border-radius: 15px;
  padding: 10px;
`;

export const ProductInfo = styled.View`
  flex: 1;
  justify-content: center;
  width: 110px;
  text-align: center;
  padding: 10px;
`;

export const ProductName = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-family: 'Ubuntu_500Medium';
  font-size: 20px;
  padding: 0px 5px;
`;

export const ProductMeta = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
`;

export const ProviderMetaText = styled.Text`
  color: ${({ theme }) => theme.colors.gray};
  font-family: 'Ubuntu_500Medium';
  margin-left: 8px;
`;

// -----------Modal---------------

export const ContainerModal = styled.View`
  background-color: ${({ theme }) => theme.colors.inputs};
  border: 2px solid ${({ theme }) => theme.colors.primaryColor};
  border-radius: 10px;
`;

export const ImageZoom = styled.Image`
  width: 100%; 
  height: 300px;
  border-radius: 8px 8px 0 0;
`;

export const ButtonClose = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  background: ${({ theme }) => theme.colors.primaryColor};
  border-radius: 0px 8px;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0px;
  right: 0px;
`;


export const Name = styled.Text`
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.white};
  font-family: 'Ubuntu_500Medium';
  border-radius: 14px 50px 50px 0px;
  padding: 8px;
  font-size: 17px;
  position: absolute;
  max-width: 250px;
`;

export const Price = styled.Text`
  background-color: ${({ theme }) => theme.colors.primaryColor};
  color: ${({ theme }) => theme.colors.background};
  font-family: 'Ubuntu_500Medium';
  font-weight: bold;
  border-radius: 0px 50px 50px 0px;
  padding: 5px;
  position: absolute;
  top: 30px; 
  font-size: 12px;
  max-width: 190px;
`;

export const ContainerDescription = styled.View`
  padding: 5px 10px 10px 10px;
`;

export const DescriptionTitle = styled.Text`
  color: ${({ theme }) => theme.colors.primaryColor};
  font-family: 'Ubuntu_500Medium';
  font-size: 20px;
`;

export const Description = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-family: 'Ubuntu_500Medium';
  font-size: 12px;
`;

export const ScrollDescription = styled.ScrollView`
  max-height: 100px;
`;




