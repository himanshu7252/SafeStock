import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { useState } from 'react'


type Item = {
  id: number;
  name: string;
  stock: number;
  unit: string;
};

type AllItemsProps = {
  data: Item[];
  setdata: React.Dispatch<React.SetStateAction<Item[]>>;
};


const  CreateScreen = ({data, setdata}:AllItemsProps) =>{
  const [itemName, setitemName] = useState('')
  const [stockAmt, setstockAmt] = useState('')
  // const [itemUnit, setUnit] = useState('')
  const [isEdit, setisEdit] = useState(false)
  const [editItemId, seteditItemId] = useState(null)
const addItemhandler =() =>{
  const newItem ={
    id: Date.now(),
    name: itemName,
    stock: parseInt(stockAmt),
    unit: "kg"
  }
  setdata([...data, newItem])
  setitemName('')
  setstockAmt('')
  setisEdit(false)
}
const deleteItemHandler = (id: number) => {
  setdata (data.filter((item) => item.id !== id))
}
const editItemHandler = (item: Item)=>{
  setisEdit(true)
  setitemName(item.name);
}
const updateItemHandler=()=>{
  setdata(data.map((item)=>(
    item.id === editItemId ? {...item, name: itemName, stock: parseInt(stockAmt)} :item
  )))
}

  return (
    <View style={styles.container}>
      
      <TextInput
        placeholder='Enter an item name...'
        placeholderTextColor="#999"
        style ={styles.input}
        value={itemName}
        onChangeText={(item)=> setitemName(item)}
      />
      <TextInput
        placeholder='Enter stock amount...'
        placeholderTextColor="#999"
        style ={styles.input}
        value={stockAmt}
        onChangeText={(item)=> setstockAmt(item)}
      />

      <Pressable style={styles.addButton} onPress={()=> isEdit ? updateItemHandler():addItemhandler()}>
        <Text style={ styles.btnText}>{isEdit ? 'Edit Item in Stock': 'Add Item in Stock'}</Text>
      </Pressable>


      <View style={{marginTop:10}}>
            
              <Text style={styles.headingText}>All Items in Stock</Text>
            
      
            <FlatList
            data = {data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => (
              <View style={[styles.itemContainer, {backgroundColor: item.stock < 20 ? "#FFB3CB" : "#F3FF94"}]}>
                <Text style={ styles.itemText}>{item.name}</Text>
                
                <View style={{flexDirection:"row", gap: 20}}>
                  <Text style={ styles.itemText}>{item.stock}</Text>
                  <Pressable onPress={()=> {editItemHandler(item)}}>
                    <Text style={ styles.itemText}>Edit</Text>
                  </Pressable>
                  <Pressable onPress={()=>{deleteItemHandler(item.id)}}>
                     <Text style={ styles.itemText}>Delete</Text>
                  </Pressable>
                </View>

              </View>
            )} 
      
            contentContainerStyle={{gap:10}}
      
            />    
          </View>
    </View>
  )
}
export default CreateScreen;
const styles = StyleSheet.create({
  container: {
    paddingVertical: "4%",
    gap: 10,
    justifyContent: "space-between",
    paddingHorizontal: 15
  },
  input:{
    borderWidth: 1.5,
    borderColor: "#91D631",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 7,
    color: "white"
  },
  addButton: {
    backgroundColor: "#A974ED",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 7,
    justifyContent: "center",
    alignContent:"center"
  },
  btnText:{
    color: "white",
    fontWeight:"500",
    fontSize: 15,
  },
  headingContainer: {
    flexDirection : "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  headingText: {
    fontWeight: "500",
    fontSize: 16,
    marginVertical: 10,
    color: "white"
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
    fontSize: 14,

  }

})