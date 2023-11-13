import React, { useState } from 'react';
import { TouchableOpacity, ViewProps } from 'react-native';

import { useTheme } from 'styled-components';

import {
    Container, 
    ImageProduct, 
    ProductInfo, 
    ProductMeta, 
    ProviderMetaText,
    ImageZoom,
    Description,
    ButtonClose,
    ContainerDescription,
    ContainerModal,
    DescriptionTitle,
    ProductName,
    Name,
    Price,
    ScrollDescription
} from './styles';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';
import { formatNumberToCurrency } from '../../utils/format-number-to-currency';

interface ItemProps extends ViewProps {
    item:{
        product_id: string;
        name: string;
        price: number;
        banner: string;
        description: string;
        amount: number;
    }
    index: number;
    deleteItem: (index: number) => void;
}
export function ListItem({ item, index, deleteItem, ...props }: ItemProps){
    const theme = useTheme();
    const [modalVisible, setModalVisible] = useState({});

    function handleDeleteItem(){
        deleteItem(index);
    }

    return(
        <>
        <Container {...props}> 
            <TouchableOpacity onPress={() => setModalVisible(item)} style={{padding: 10}}>         
                <ImageProduct
                    source={{uri:`http://10.0.10.182:3333/files/${item.banner}`}}                
                />
            </TouchableOpacity>

            <ProductInfo>
                <ProductName numberOfLines={1} ellipsizeMode="tail">
                    {item.name}
                </ProductName>

                <ProductMeta>
                    <Icon name="cart-arrow-down" size={15} color={theme.colors.primaryColor}/>
                    <ProviderMetaText numberOfLines={1} ellipsizeMode="tail">
                        {`Quant.: ${item.amount}`}
                    </ProviderMetaText>
                </ProductMeta>

                <ProductMeta>
                    <Icon name="currency-usd" size={15} color={theme.colors.primaryColor}/>
                    <ProviderMetaText numberOfLines={1} ellipsizeMode="tail">
                        {formatNumberToCurrency(item.price * item.amount)}
                    </ProviderMetaText>
                </ProductMeta>
            </ProductInfo>            
      
            <TouchableOpacity onPress={handleDeleteItem} style={{padding: 10}}>
                <Icon name="delete" size={30} color={theme.colors.error} 
                />
            </TouchableOpacity>

            
        </Container>

        <Modal 
            isVisible={Object.keys(modalVisible).length !== 0}
            onBackdropPress = {() => setModalVisible({})}                 
        >
            <ContainerModal>                                     
                <ImageZoom
                    source={{uri:`http://10.0.10.182:3333/files/${item.banner}`}}
                />

                <ButtonClose onPress={() => setModalVisible({})}>
                    <Icon 
                        name="close" 
                        size={30} 
                        color={theme.colors.background} 
                    />
                </ButtonClose> 

                <Name numberOfLines={1} ellipsizeMode="tail">
                    {item.name}
                </Name>
                
                <Price numberOfLines={1} ellipsizeMode="tail">
                    {formatNumberToCurrency(item.price)}
                </Price>                  
                
                <ContainerDescription>
                    <DescriptionTitle>
                        Descrição:
                    </DescriptionTitle>
                    
                    <ScrollDescription>
                        <Description>                            
                            {`${item.description}`}
                        </Description>
                    </ScrollDescription>
                </ContainerDescription>
            </ContainerModal>
        </Modal>
        </>
    );
}
