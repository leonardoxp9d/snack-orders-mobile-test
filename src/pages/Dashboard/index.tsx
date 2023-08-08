import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  FlatList
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Container } from './styles';
import { StackParamsList } from '../../routes/app.routes';
import { api } from '../../services/api';
import { ListItem } from '../../components/ListItem';

import  Select  from '../../components/Select';
import { Input } from '../../components/Input';
import  { Button }  from '../../components/Button';

export type CategoryProps = {
    value: string;
    label: string;
}

export type ProductProps = {
    value: string;
    label: string;
}

type ItemProps = {
    product_id: string;
    name: string;
    amount: number;
}

interface AddItemFormData {
    amount: string;
    category: string;
    product: string;
}

const schema = yup.object().shape({
    amount: yup.string().required('Quantidade obrigatória'),
    category: yup.string().required('Categoria obrigatória'),
    product: yup.string().required('Produto obrigatório'),
});

export default function Dashboard() {
    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();
    const [categories, setCategories] = useState<CategoryProps[] | []>([]);
    const [categorySelected, setCategorySelected] = useState('');
    const [products, setProducts] = useState<ProductProps[] | []>([]);
    const [items, setItems] = useState<ItemProps[]>([]);

    const useFormMethods = useForm<AddItemFormData>({
        resolver: yupResolver(schema),
        shouldFocusError: false,
    });

    useEffect(()=> {
        async function loadCategory(){
            const response = await api.get('/category');

            const categoryList = response.data.map((category) => {
                return {
                    ...category,
                    value: category.id,
                    label: category.name,
                }
            })
            
            setCategories(categoryList);
        }
        loadCategory();
    }, [])

    useEffect(()=> {
        if(categorySelected){
            async function loadProduct(){
                const response = await api.get('/category/product', {
                    params: {
                        category_id: categorySelected
                    }
                });

                const productList = response.data.map((product) => {
                    return {
                        ...product,
                        value: product.id,
                        label: product.name,
                    }
                })
                setProducts(productList);
            }            
            useFormMethods.setValue('product', '');
            loadProduct();
        }
    }, [categorySelected])

    async function handleAdd(){                
        
    }

    async function handleDeleteItem(item_index: number) {
        /*
        let removeItem = items.filter( (item, index) => {
            return (index !== item_index);
        });
        setItems(removeItem);
        */
    }

    
    function handleFinishOrder(){

    }

    return(
        <Container>   
            <FormProvider {...useFormMethods}>                
                <Controller
                    control={useFormMethods.control}
                    name={"category"}
                    defaultValue="" 
                    render={({ field: { onChange, value }}) => (
                        <Select
                            name="category"
                            icon="tag-outline"
                            placeholder="Categoria"
                            options={categories}
                            error={useFormMethods.formState.errors.category?.message} 
                            onChange={(item) => {
                                onChange(item.value);
                                setCategorySelected(item.value);
                            }}                            
                            value={value}
                        /> 
                    )}
                />

                <Controller
                    control={useFormMethods.control}
                    name={"product"}
                    defaultValue="" 
                    render={({ field: { onChange, value }}) => (
                        <Select
                            name="product"
                            icon="package-variant-closed"
                            placeholder="Produto"
                            options={products}
                            error={useFormMethods.formState.errors.product?.message} 
                            onChange={(item) => {
                                onChange(item.value);
                            }}                            
                            value={value}
                        /> 
                    )}
                />      

                <Input
                    placeholder="Quantidade"
                    autoCapitalize='none'
                    keyboardType="numeric"
                    name="amount"
                    icon="calculator-variant-outline"
                    error={useFormMethods.formState.errors.amount?.message} 
                /> 

                <Button
                    title="Adicionar"
                    onPress={useFormMethods.handleSubmit(handleAdd)}
                />

                <FlatList 
                    showsVerticalScrollIndicator={false}
                    style={{ flex: 1, marginTop: 20, marginBottom: 50 }}
                    data={items}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={ ({ item, index }) => 
                        <ListItem data={item} index={index} deleteData={handleDeleteItem}/> 
                    }
                />                
            </FormProvider>
        </Container>
    );
}