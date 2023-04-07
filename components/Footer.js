import {StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-web';
import {Link} from "react-router-native";

export default function Footer() {
  return (
      <SafeAreaView style={styles.container}>
        <View style={styles.footer}>
          <Link to="/">
            <Text style={styles.btn}>Home</Text>
          </Link>
        
          <Link to="/about">
            <Text style={styles.btn}>About</Text>
          </Link>
        </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
  },
  btn: {
    margin: '10px',
  }
});