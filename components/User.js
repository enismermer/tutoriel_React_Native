import { Text, StyleSheet, View } from 'react-native'
import React from 'react'
import Secret from './Secret';

export default function User({ props }) {
    const isAdmin = props.isAdmin;

    return (
      <View>
        <Text style={styles.color}>Welcome {props.firstname} {props.lastname}</Text>
        {isAdmin ? <Secret/> : 
        <Text style={styles.color}>GUEST</Text>}
      </View>
    )
  }

const styles = StyleSheet.create({
    color: {
        color: 'white',
    }
})