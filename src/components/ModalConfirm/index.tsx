import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';

import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import {
    Container, Title, 
} from './styles';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Modal from 'react-native-modal';
import { formatNumberToCurrency } from '../../utils/format-number-to-currency';
import { Modalize, ModalizeProps } from 'react-native-modalize';
import { Button } from '../Button';
import { ButtonTransparent } from '../ButtonTransparent';


interface ModalConfirmProps {
    titleModal: string;
    nameButtonConfirm?: string;
    nameButtonCancel?: string;
    modalizeRef: React.RefObject<Modalize>;
    functionConfirm: () => void;
}
export function ModalConfirm({ 
    titleModal, 
    nameButtonConfirm = "Sim", 
    nameButtonCancel = "Não", 
    modalizeRef, 
    functionConfirm 
}: ModalConfirmProps){
    const theme = useTheme();
    const [modalVisible, setModalVisible] = useState({});

    function handleCloseModal(){
        modalizeRef.current?.close();
    }

    return(
        <Modalize 
            ref={modalizeRef}
            snapPoint={180}
            modalHeight={180}
        >
            <Container>
                <Title>{titleModal}</Title>
                
                <Button
                    name={nameButtonConfirm} 
                    onPress={functionConfirm}
                />                          

                <ButtonTransparent
                    name={nameButtonCancel} 
                    onPress={handleCloseModal}
                />        
            </Container>                  
        </Modalize>
    );
}
