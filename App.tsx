import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import WelcomeScreen from './screens/WelcomeScreen';
import ScreenOne from './screens/ScreenOne';
import SwapiScreen from './screens/SwapiScreen';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
       <Drawer.Navigator>
        <Drawer.Screen name="Home" component={WelcomeScreen} />
        <Drawer.Screen name="To Do List" component={ScreenOne} />
        <Drawer.Screen name="SWAPI" component={SwapiScreen} />
      </Drawer.Navigator>  
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
