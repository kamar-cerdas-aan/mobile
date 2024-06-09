import "react-native-gesture-handler";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { Ionicons } from "@expo/vector-icons";
import DrawerItems from "@/components/DrawerItems";

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer drawerContent={DrawerItems} >
        <Drawer.Screen
          name="dashboard"
          options={{
            drawerLabel: "Dashboard",
            title: "Device ID: ",
            drawerIcon: ({ size, color }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
            headerStyle: {
              backgroundColor: "#e7e7e7",
            },
          }}
        />
        <Drawer.Screen
          name="login"
          options={{
            drawerLabel: "Log In / Register",
            title: "Login",
            drawerIcon: ({ size, color }) => (
              <Ionicons name="person" size={size} color={color} />
            ),
            drawerItemStyle: { display: "none" },
            headerStyle: {
              backgroundColor: "#e7e7e7",
            },
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name="settings"
          options={{
            drawerLabel: "Settings",
            title: "Settings",
            drawerIcon: ({ size, color }) => (
              <Ionicons name="settings" size={size} color={color} />
            ),
            headerStyle: {
              backgroundColor: "#e7e7e7",
            },
          }}
        />
        <Drawer.Screen
          name="+not-found"
          options={{
            title: "404 - Not Found",
            drawerItemStyle: { display: "none" },
          }}
        />
        <Drawer.Screen
          name="register" // This is the name of the page and must match the url from root
          options={{
            title: "Register",
            drawerItemStyle: { display: "none" },
            headerStyle: {
              backgroundColor: "#e7e7e7",
            },
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name="index"
          options={{
            title: "Welcome!",
            drawerItemStyle: { display: "none" },
            headerStyle: {
              backgroundColor: "#e7e7e7",
            },
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name="api/client"
          options={{
            headerShown: false,
            drawerItemStyle: { display: "none" }
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
