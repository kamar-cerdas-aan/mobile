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
