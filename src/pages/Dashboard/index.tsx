import React, { useState, useEffect, useRef, useContext } from 'react';
import { 
  ScrollView,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm, FormProvider } from 'react-hook-form';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Container, ContainerForm, Header, ButtonLogout } from './styles';
import { StackParamsList } from '../../routes/app.routes';
import { api } from '../../services/api';

import { Input } from '../../components/Input';
import  Select  from '../../components/Select';
import  { Button }  from '../../components/Button';
import { Modalize } from 'react-native-modalize';
import { Textarea } from '../../components/Textarea';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from 'styled-components';
import { AuthContext } from '../../contexts/AuthContext';
import { ModalConfirm } from '../../components/ModalConfirm';
import { FlatListItem } from '../../components/FlatListItem';

export type CategoryProps = {
    value: string;
    label: string;
}

export type ProductProps = {
    value: string; // id
    label: string; // name
    banner: string;
    price: number;
    description: string;
}

type ItemProps = {
    product_id: string;
    name: string;
    price: number;
    banner: string;
    description: string;
    amount: number;
}

interface AddItemFormData {
    table: string;
    category: CategoryProps;
    product: ProductProps;
    amount: number | string;
}

export default function Dashboard() {

    const theme = useTheme();
    const scrollRef = useRef<any>();

    const { signOut } = useContext(AuthContext);

    const useFormMethods = useForm<AddItemFormData>({
    });
    
    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();
    const [categories, setCategories] = useState<CategoryProps[] | []>([]);
    const [products, setProducts] = useState<ProductProps[] | []>([]);
    const [items, setItems] = useState<ItemProps[]>([]);    
    const categorySelected = useFormMethods.watch('category');
    const productSelected = useFormMethods.watch("product");
    const amount = useFormMethods.watch("amount");
    
    const modalizeLogoutRef = useRef<Modalize>(null);
    const modalizeFinishOrderRef = useRef<Modalize>(null);

    useEffect(()=> {
        async function loadCategory(){
            const response = await api.get('/category');
    
            const categories = response.data.map((category: { id: string; name: string; }) => {
                const { id, name, ...rest } = category;
                return { 
                    value: id, 
                    label: name,
                    ...rest
                }; 
            });
            setCategories(categories);
        }
        loadCategory();
    }, []);

    useEffect(()=> {
        if(categorySelected){
            async function loadProduct(){
                const response = await api.get('/category/product', {
                    params: {
                        category_id: categorySelected.value
                    }
                });
                const products = response.data.map((product) => {
                    const { id, name, ...rest } = product;
                    return { 
                        value: id, 
                        label: name,
                        ...rest
                    }; 
                });
                setProducts(products);
            }            
            useFormMethods.setValue('product', undefined);
            loadProduct();
        }
    }, [categorySelected]);

    async function handleAdd(){     
        const addAmount = items.map(item => {
            if (item.product_id === productSelected.value) {
                return {
                    ...item,
                    amount: item.amount + Number(amount)
                };
            }
            return item;
        });

        if ( JSON.stringify(items) !== JSON.stringify(addAmount) ) {
            setItems(addAmount);
            return;
        }
        
        const newItem = {
            product_id: productSelected.value as string,
            name: productSelected.label as string,
            price: Number(productSelected.price),
            banner: productSelected.banner,
            description: productSelected.description,
            amount: Number(amount),
        }

        setItems(oldArray => [...oldArray, newItem]);        
    };

    async function handleDeleteItem(item_index: number) {
        const updatedItems = items.filter( (item, index) => {
            return (index !== item_index);
        });
        setItems(updatedItems);
    };
    
    async function handleFinishOrder() {
        const table = useFormMethods.watch("table");
    
        try {

            if(table && items){
                const response = await api.post('/order', {
                    table: Number(table)
                });
        
                const promises = items.map(async (item) => {
                    await api.post('/order/add', {
                        order_id: response.data.id,
                        product_id: item.product_id,
                        amount: Number(item.amount)
                    });
                });
                await Promise.all(promises);
    
                useFormMethods.setValue('table', undefined);
                useFormMethods.setValue('category', undefined);
                useFormMethods.setValue('product', undefined);
                useFormMethods.setValue('amount', undefined);
                setItems([]);
                
                
                modalizeFinishOrderRef.current?.close;
                console.log("Todas as requisições concluídas com sucesso.");
            }            
        } catch (error) {
            
            console.error("Ocorreu um erro:", error);
        }
    }

    function handleFormError() {
        modalizeFinishOrderRef.current?.close();
        scrollRef.current.scrollTo();
    }

    return(
        <>
        <StatusBar backgroundColor="#28262E" barStyle="light-content"/>
            <Container>   
                <Header>
                    <ButtonLogout onPress={() => modalizeLogoutRef.current?.open()}>
                        <Icon name='power' size={30} color={theme.colors.blackMedium} />
                    </ButtonLogout>
                </Header>
                <ScrollView ref={scrollRef}>                
                    <FormProvider {...useFormMethods}>   
                        <ContainerForm>
                                <Input
                                    name="table"
                                    icon="table-furniture"
                                    placeholder="Mesa"
                                    autoCapitalize='none'
                                    errorMessage="Mesa obrigatória" 
                                /> 

                                <Select
                                    name="category"
                                    icon="tag-outline"
                                    placeholder="Categoria"
                                    options={categories}
                                />    

                                <Select
                                    name="product"
                                    icon="package-variant-closed"
                                    placeholder="Produto"
                                    options={products}
                                />                                  

                                <Input
                                    name="amount"
                                    icon="cart-arrow-down"
                                    numeric={true}
                                    placeholder="Quantidade"
                                    autoCapitalize='none'
                                    keyboardType="numeric"
                                /> 
                                
                                <Button
                                    name="Adicionar"
                                    onPress={handleAdd}
                                    disabled={
                                        categorySelected === undefined ||  
                                        productSelected === undefined  ||
                                        amount === undefined || 
                                        amount === ''
                                    }
                                />
                                    
                                <FlatListItem           
                                    items={items}
                                    functionDeleteItem={handleDeleteItem}
                                    errorMessage="Nenhum produto adicionado" 
                                />   

                                <Button
                                    name={'Finalizar'}
                                    onPress={() => modalizeFinishOrderRef.current?.open()}
                                />                        
                        </ContainerForm>                        
                    </FormProvider>
                </ScrollView>
                <ModalConfirm
                    titleModal="Deseja sair do App?"
                    nameButtonConfirm="Sair"
                    nameButtonCancel="Cancelar"
                    modalizeRef={modalizeLogoutRef}
                    functionConfirm={signOut}
                />

                <ModalConfirm
                    titleModal="Deseja enviar o pedido?"
                    nameButtonConfirm="Enviar"
                    nameButtonCancel="Cancelar"
                    modalizeRef={modalizeFinishOrderRef}
                    functionConfirm={useFormMethods.handleSubmit(handleFinishOrder, handleFormError)}
                />
            </Container>
        </>
    );
}
