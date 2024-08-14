import AsyncStorage from '@react-native-async-storage/async-storage';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { Alert, PermissionsAndroid } from 'react-native';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Header from './src/components/Header';
import store, { persistor } from './src/redux/store';
import ThemesScreen from './src/screens/ThemesScreen';
import TodoListScreen from './src/screens/TodoListScreen';

const Stack = createStackNavigator();

const useAppTheme = () => {
  const mode = useSelector((state) => state.displayTheme.mode);
  return {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: mode === 'light' ? '#ffffff' : '#000000',
      text: mode === 'light' ? '#000000' : '#ffffff',
    },
  };
};

const requestStoragePermission = async () => {
  try {
    const permissionRequested = await AsyncStorage.getItem('storagePermissionRequested');
    
    if (permissionRequested === null) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'This app needs access to your storage to save and load data.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Storage permission granted');
      } else {
        console.log('Storage permission denied');
        Alert.alert(
          'Permission Denied',
          'Storage permission is required for this app to function properly.',
          [{ text: 'OK' }]
        );
      }

      await AsyncStorage.setItem('storagePermissionRequested', 'true');
    } else {
      console.log('Storage permission already requested');
    }
  } catch (err) {
    console.warn(err);
  }
};

const App = () => {
  const theme = useAppTheme();

  useEffect(() => {
    requestStoragePermission();
  }, []);

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        screenOptions={({ navigation }) => ({
          header: () => <Header title="ToDo" navigation={navigation} />,
        })}
      >
        <Stack.Screen name="TodoListScreen" component={TodoListScreen} />
        <Stack.Screen name="ThemesScreen" component={ThemesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const AppWrapper = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

export default AppWrapper;
