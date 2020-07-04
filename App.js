import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Home from './src/screens/home';
import Providers from './src/screens/providers';
import Slot from './src/screens/slot';


const Stack = createStackNavigator();

export default () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home}  />
      <Stack.Screen name="Providers" component={Providers} 
      options={{ title: 'Providers' }}/>
      <Stack.Screen name="Slot" component={Slot} 
      options={{ title: 'Slots' }}/>
    </Stack.Navigator>
  </NavigationContainer>
);
