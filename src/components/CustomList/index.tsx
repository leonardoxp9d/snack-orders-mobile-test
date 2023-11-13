import React from 'react';
import { View, FlatList, FlatListProps } from 'react-native';
import { ListItem } from '../ListItem';

interface CustomListProps {
    data:[{
        product_id: string;
        name: string;
        price: number;
        banner: string;
        description: string;
        amount: number;
    }]

    deleteItem: (index: number) => void;
}

function CustomList({ data, deleteItem }: CustomListProps) {
  return (
    <View style={{ marginTop: 10, height: 300 }}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <ListItem data={item} index={index} deleteItem={deleteItem} />
        )}
      />
    </View>
  );
}

export default CustomList;