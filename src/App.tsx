import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "react-native";

import { AppContextProvider } from "./contexts";
import { ProjectsScreen, ProjectScreen, TaskScreen } from "./screens";

declare const global: { HermesInternal: null | {} };

export type RootStackParamList = {
  Projects: undefined;
  Project?: { projectId?: number };
  Task?: { projectId?: number; taskId?: number };
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <AppContextProvider>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Projects" component={ProjectsScreen} />
          <Stack.Screen name="Project" component={ProjectScreen} />
          <Stack.Screen name="Task" component={TaskScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContextProvider>
  );
};

export default App;
