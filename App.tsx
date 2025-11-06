// App.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Navigation from './navigation/Navigation';

export default function App() {
  return (
    <View style={styles.root}>
      <Navigation />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    height: '100%',   // ensures the root fills the viewport
    width: '100%',
    overflow: 'scroll',
  },
});
