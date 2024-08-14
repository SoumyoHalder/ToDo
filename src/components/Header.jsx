import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import ThemeToggler from './ThemeToggler';

const Header = ({ title, navigation }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSelectOption = (option) => {
    setShowDropdown(false);
    if (option === 'Theme') {
      navigation.navigate('ThemesScreen', {
        setBackgroundImage: (image) => {
          console.log("Image selected:", image);
        }
      });
    } else if (option === 'List') {
      navigation.navigate('TodoListScreen');
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#00c6ff', '#0072ff']} style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('TodoListScreen')}>
          <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
        <View style={styles.iconsContainer}>
          <ThemeToggler />
          <TouchableOpacity
            style={styles.hamburgerIcon}
            onPress={() => setShowDropdown(prev => !prev)}
          >
            <MaterialIcons name="menu" size={35} color="#fff" />
          </TouchableOpacity>
        </View>
        {showDropdown && (
          <Modal
            transparent
            visible={showDropdown}
            animationType="fade"
            onRequestClose={() => setShowDropdown(false)}
          >
            <TouchableWithoutFeedback onPress={() => setShowDropdown(false)}>
              <View style={styles.overlay}>
                <TouchableWithoutFeedback>
                  <View style={styles.dropdown}>
                    <TouchableOpacity style={styles.dropdownItem} onPress={() => handleSelectOption('Theme')}>
                      <Text style={styles.dropdownText}>Theme</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        )}
      </LinearGradient>
    </View>
  );
};

const iconWidth = 40; 
const marginLeft = iconWidth + 70; 

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  header: {
    height: 100,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 4,
    paddingHorizontal: 20,
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: '#fff',
    marginLeft: marginLeft, 
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
    flexGrow: 1,
    paddingTop: 15,
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hamburgerIcon: {
    marginLeft: 10,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dropdown: {
    backgroundColor: '#000080',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 5,
    padding: 10,
    width: 150,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  dropdownText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default Header;
