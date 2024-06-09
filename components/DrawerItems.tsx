import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import { useAuth } from "@/app/context/AuthProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function DrawerItems(props: any) {
  const router = useRouter();
  const { setToken, setDeviceID, setAuthState } = useAuth();

  const logout = async () => {
    setAuthState(false);
    setToken("");
    setDeviceID("");
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("device_id");
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props} scrollEnabled={false}>
        <DrawerItemList {...props} />
        <DrawerItem
          label={"Logout"}
          onPress={() => {
            logout().then(() => {
              router.push("/login");
            });
          }}
        />
      </DrawerContentScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
