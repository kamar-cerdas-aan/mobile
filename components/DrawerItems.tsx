import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useRouter } from "expo-router";

export default function DrawerItems(props: any) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // Clear the token from AsyncStorage
      // await AsyncStorage.removeItem('authToken');

      // Optionally, clear other user data here

      // Redirect to the login screen
      router.push('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props} scrollEnabled={false}>
        <DrawerItemList {...props} />
        <DrawerItem label={"Logout"} onPress={() => router.push("/login")} />
      </DrawerContentScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
