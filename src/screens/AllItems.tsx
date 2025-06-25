import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'

// Define the type for a single item
type Item = {
  id: number;
  name: string;
  stock: number;
  
};

type AllItemsProps = {
  data: Item[];
};

const AllItems = ({data}:AllItemsProps) => {
  return (
    <View>
      <View style= {styles.headingContainer}>
        <Text style= {styles.headingText}>Items</Text>
        <Text style={styles.headingText}>Quantity</Text>
      </View>

      <FlatList
      data = {data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({item}) => (
        <View style={[styles.itemContainer, {backgroundColor: item.stock < 20 ? "#FFB3CB" : "#F3FF94"}]}>
          <Text style={ styles.itemText}>{item.name}</Text>
          <Text style={ styles.itemText}>{item.stock}</Text>
        </View>
      )} 

      contentContainerStyle={{gap:10}}

      />    
    </View>
  )
}

export default AllItems

const styles = StyleSheet.create({
  headingContainer: {
    flexDirection : "row",
    justifyContent: "space-around",
    paddingHorizontal: 90,
    paddingVertical: 10,
  },
  headingText: {
    fontWeight: "500",
    fontSize: 16,
    color:"white"
  },
  itemContainer:{
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical:10,
    borderRadius: 7 
  },
  itemText:{
    fontWeight: "400",
    fontSize: 14
  }

})