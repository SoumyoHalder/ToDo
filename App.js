import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Provider, useSelector } from 'react-redux';
import Header from './src/components/Header';
import store from './src/redux/store';
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

const App = () => {
  const theme = useAppTheme();

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
    <App />
  </Provider>
);

export default AppWrapper;
