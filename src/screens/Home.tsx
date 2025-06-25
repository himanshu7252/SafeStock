import { Image, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'

//react native elements
import { FAB } from '@rneui/themed'

//Snackbar
import Snackbar from 'react-native-snackbar'

//context API
import AppwriteContext from '../appwrite/AppwriteContext'
import App from '../App'

import AllItems from '../screens/AllItems'
import CreateScreen from './CreateScreen'

type UserObj = {
  name: string;
  email: string;

}


const Home = () => {
  const [userData, setUserData] = useState<UserObj>() 

  const {appwrite, setIsLoggedIn} = useContext (AppwriteContext)

  const [view, setview] = useState(0)

  const [data, setdata] = useState([
      {id: 1,  name: "Wheat", stock: 5, unit: "kg"},
      {id: 2,  name: "Rice", stock: 5, unit: "kg"},
      {id: 3,  name: "Basmati Rice", stock: 50, unit: "kg"},
      {id: 4,  name: "Pulse", stock: 5, unit: "kg"},
      {id: 5,  name: "Corn", stock: 5, unit: "kg"},
      {id: 6,  name: "Takatak", stock: 5, unit: "kg"},
  ])
  

  const handleLogout = () => {
    appwrite.logout()
    .then(()=> {
      setIsLoggedIn(false)
      Snackbar.show({
        text: 'Logout Successful',
        duration: Snackbar.LENGTH_SHORT
      })
    })
  }

  useEffect(() => {
    appwrite.getCurrentUser()
    .then(response => {
      if (response){
        const user: UserObj = {
          name: response.name,
          email: response.email
        }
        setUserData(user)
      }
    })
  }, [appwrite])
  
  


  return (
      <SafeAreaView style={styles.container}>
        <View style={styles.welcomeContainer}>
          {/* <Image
            source={{
              uri: 'https://imgs.search.brave.com/xMmg6fmYgtNyRZaGC7oXuzmIBG8MRff_vV2e_OqYp2Y/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NjFJaTM3dGZXTkwu/anBn',
              width: 400,
              height: 300,
              cache: 'default',
            }}
            resizeMode="contain"
          /> */}
          <Text style={styles.title}>
            Dashboard
          </Text>
          <View style={styles.buttonContainer}>
            <Pressable style= {[styles.button, view ===0 ? {backgroundColor: "#91D631"}: null]}onPress={()=>setview(0)}>
              <Text style= {[styles.buttonText, view ===0 ? {color: "white"}: null]}>All Items</Text>
            </Pressable>
            <Pressable style= {[styles.button,view ===1 ? {backgroundColor: "#91D631"}: null]}onPress={()=>setview(1)}>
              <Text style= {[styles.buttonText, view ===1 ? {color: "white"}: null]}>Low Stock</Text>
            </Pressable>
            <Pressable style= {[styles.button, view ===2 ? {backgroundColor: "#91D631"}: null]}onPress={()=>setview(2)}>
              <Text style= {[styles.buttonText, view ===2 ? {color: "white"}: null]}>Create</Text>
            </Pressable>
          </View>

          {view == 0 && <AllItems data= {data}/>}  
          {view == 1 && <AllItems data= {data.filter((item) => item.stock<20)}/>} 
          {view == 2 && <CreateScreen data= {data} setdata={setdata}/>} 

          {userData && (
            <View style={styles.userContainer}>
              <Text style={styles.userDetails}>Name: {userData.name}</Text>
              <Text style={styles.userDetails}>Email: {userData.email}</Text>
            </View>
          )}
        </View>
        <FAB
          placement="right"
          color="#f02e65"
          size="large"
          title="Logout"
          icon={{name: 'logout', color: '#FFFFFF'}}
          onPress={handleLogout}
        />
      </SafeAreaView>
    );
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0D32',
  },
  welcomeContainer: {
    padding: "6%",

    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  userContainer: {
    marginTop: 24,
  },
  userDetails: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
    margin: 10,
  },
  button: {
    paddingVertical: 3.5,
    paddingHorizontal: 10,
    borderRadius: 50,
    borderWidth: 0.8,
    borderColor:"#91D631"
  },
  buttonText: {
    color : "#91D631",
    fontSize: 12,
  },
})