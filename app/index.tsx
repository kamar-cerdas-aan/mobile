import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";

export default function index() {
  return (
    <View style={styles.container}>
      <Text>Isinya Redirect</Text>
      <Link href="/dashboard">ke (Dashboard)</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  bg: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
  },
  box: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
