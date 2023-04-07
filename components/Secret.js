import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Secret() {
  return (
    <View>
      <Text style={styles.color}>Message secret de la NASA</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    color: {
        color: 'white',
    }
})