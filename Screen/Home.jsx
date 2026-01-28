import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Home = () => {
    const navigation = useNavigation()
  return (
    <SafeAreaView>
      <Text>Home</Text>
      <Button title='Go to about page' onPress={() => navigation.navigate("About")}/>


    </SafeAreaView>
      
    
  )
}

export default Home

const styles = StyleSheet.create({})