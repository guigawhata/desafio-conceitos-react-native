import React from 'react';
import {View, StyleSheet, Image} from 'react-native';

export default function Header() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.tinyLogo}
        source={require('../../assets/logo.png')}
      />
      <Image
        style={styles.tinyLogo2}
        source={require('../../assets/logo-2.png')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2e2e2e',
  },
  tinyLogo: {
    width: 150,
    height: 150,
  },
  tinyLogo2: {
    width: 268,
    height: 72,
  },
});
