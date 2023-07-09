import React from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from './components/HomeScreen';
import MyDataScreen from './components/MyDataScreen';
import MyAccountScreen from './components/MyAccountScreen';
import NotificationScreen from './components/NotificationScreen';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import store from './redux/store';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator initialRouteName='HomeScreen'>
    <Stack.Screen
      name="HomeScreen"
      options={{headerShown: false}}
      component={HomeScreen}
    />
  </Stack.Navigator>
);

const MyDataStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyDataScreen"
        options={{headerShown: false}}
        component={MyDataScreen}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: '#e91e63',
          }}>
          <Tab.Screen
            options={{
              tabBarLabel: 'PostsData',
              tabBarIcon: ({color, size}) => (
                <MaterialCommunityIcons name="home" color={color} size={size} />
              ),
            }}
            name="PostsData"
            component={HomeStack}
          />
          <Tab.Screen
            options={{
              tabBarLabel: 'MyData',
              tabBarIcon: ({color, size}) => (
                <MaterialCommunityIcons
                  name="database"
                  color={color}
                  size={size}
                />
              ),
            }}
            name="MyData"
            component={MyDataScreen}
          />
          <Tab.Screen
            name="MyAccount"
            options={{
              tabBarLabel: 'MyAccount',
              tabBarIcon: ({color, size}) => (
                <MaterialCommunityIcons
                  name="account"
                  color={color}
                  size={size}
                />
              ),
            }}
            component={MyAccountScreen}
          />
          <Tab.Screen
            name="Notification"
            options={{
              tabBarLabel: 'Notification',
              tabBarIcon: ({color, size}) => (
                <MaterialIcons name="notifications" color={color} size={size} />
              ),
            }}
            component={NotificationScreen}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
