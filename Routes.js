import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "./src/pages/Home";
import Solar from "./src/pages/Solar";
import Sobre from "./src/pages/Sobre";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{ headerStyle: { backgroundColor: "#fff" } }}
      >
        <Drawer.Screen
          name="home"
          component={Home}
          options={{
            title: "ORÇAMENTO",
            headerTitleStyle: {
              fontFamily: "Montserrat_700Bold",
              color: "#333",
            },
            // headerRight: ()=>(
            //     <Feather name="sun" size={30} color="#333" marginRight={30}/>
            // ),
          }}
        />
        <Drawer.Screen
          name="Solar"
          component={Solar}
          options={{
            title: "SOLAR",
            headerTitleStyle: {
              fontFamily: "Montserrat_700Bold",
              color: "#333",
            },
          }}
        />
        <Drawer.Screen
          name="Sobre"
          component={Sobre}
          options={{
            title: "SOBRE",
            headerTitleStyle: {
              fontFamily: "Montserrat_700Bold",
              color: "#333",
            },
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
