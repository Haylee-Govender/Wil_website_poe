import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface HeaderProps {
  title: string;
  showLogo?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, showLogo = true }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      {showLogo && (
        <Image 
          source={require('../../assets/images/logo.png')} 
          style={styles.logo} 
          resizeMode="contain"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#0055a5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  logo: {
    width: 60,
    height: 40,
  },
});

export default Header;