import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import WelcomeScreen from './screens/WelcomeScreen';
import ToDoListScreen from './screens/ToDoListScreen';
import SwapiScreen from './screens/SwapiScreen';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
       <Drawer.Navigator>
        <Drawer.Screen name="Home" component={WelcomeScreen} />
        <Drawer.Screen name="To Do List" component={ToDoListScreen} />
        <Drawer.Screen name="SWAPI" component={SwapiScreen} />
      </Drawer.Navigator>  
    </NavigationContainer>
  );
}
