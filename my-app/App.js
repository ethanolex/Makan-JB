import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RestaurantDetails from './RestaurantDetails';
import RestaurantGallery from './RestaurantGallery';
import Homepage from './Homepage'
import LeaveReview from './LeaveReview'
import Food from './Food'
import RestaurantReviews from './RestaurantReviews'
import Search from './Search'

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Details" 
          component={RestaurantDetails} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Gallery" 
          component={RestaurantGallery} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Homepage" 
          component={Homepage} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="LeaveReview" 
          component={LeaveReview} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Food" 
          component={Food} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="RestaurantReviews" 
          component={RestaurantReviews} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Search" 
          component={Search} 
          options={{ headerShown: false }}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};



export default App;
