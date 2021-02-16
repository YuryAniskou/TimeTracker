import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "react-native";

import { AppContextProvider } from "./contexts";
import { Projects, Tasks, Task } from "./screens";

declare const global: { HermesInternal: null | {} };

const Stack = createStackNavigator();

const App = () => {
  return (
    <AppContextProvider>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Projects" component={Projects} />
          <Stack.Screen name="Tasks" component={Tasks} />
          <Stack.Screen name="Task" component={Task} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContextProvider>
  );
};

export default App;
