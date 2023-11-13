import React from 'react';
import { FlatList, View} from 'react-native';
import { useFormContext, Controller } from 'react-hook-form';
import { Container, Error, IconError } from './styles';
import { ListItem } from '../ListItem';

type ItemProps = {
    product_id: string;
    name: string;
    price: number;
    banner: string;
    description: string;
    amount: number;
}

interface ListProps {
    items: ItemProps[];
    functionDeleteItem: (index: number) => void;
    errorMessage?: string;
}
export function FlatListItem({errorMessage, items, functionDeleteItem}: ListProps ) {
    const { control } = useFormContext();
    
    return (        
        <Controller
            control={control}
            name={`item${items}`}
            rules={{ required: errorMessage }}
            render={({ fieldState: { error }, field: { value, onChange } }) => (
                <>
                {error && <Error>{errorMessage}</Error>}        
                <Container isErrored={!!error}>
                        <FlatList 
                            horizontal                            
                            showsHorizontalScrollIndicator={false}
                            data={items}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={ ({ item, index }) =>                                 
                                <ListItem item={item} index={index} deleteItem={functionDeleteItem}/>
                            }
                        />  
                    {error && <IconError name="alert-circle-outline"></IconError>}
                </Container> 
                </>
            )}
        />              
    );
};
