import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from 'expo-font';
import * as React from "react";
// Screens
import { OnBoarding } from "./app/screens/";


const Stack = createStackNavigator();

export default function App() {
  
  const [loaded] = useFonts({
    "Roboto-Black": require("./app/assets/fonts/Roboto-Black.ttf"),
    "Roboto-Bold": require("./app/assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Regular": require("./app/assets/fonts/Roboto-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Home'
          component={OnBoarding}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
