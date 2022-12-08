import React, { useState } from "react"
import Articulos from "./pages/Articulos"
import Categorias from "./pages/Categorias"
import Foro from "./pages/Foro"
import Login from "./pages/Login";
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";

const tabs = [
  {
    name: "Articulos",
    component: Articulos,
    options: { headerShown: false },
  },
  {
    name: "Categorias",
    component: Categorias,
    options: { headerShown: false },
  },
  {
    name: "Foro",
    component: Foro,
    options: { headerShown: false },
  },
];

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const login = () => {
    setIsLoggedIn(true);
  };
  return (
    <NavigationContainer>
      {!isLoggedIn ? (
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={() => <Login login={login} />}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      ) : (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === "Articulos") {
                iconName = focused ? "file-tray-full" : "file-tray-full-outline";
              } else if (route.name === "Categorias") {
                iconName = focused ? "list" : "list-outline";
              } else if (route.name === "Foro") {
                iconName = focused ? "chatbubbles" : "chatbubbles-outline";
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
        >
          {tabs.map((tab, index) => (
            <Tab.Screen
              key={index}
              name={tab.name}
              component={tab.component}
              options={tab.options}
            />
          ))}
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
}