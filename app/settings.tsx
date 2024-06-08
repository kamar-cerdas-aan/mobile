import { StyleSheet, Text, SafeAreaView, View } from "react-native";
import React from "react";
import { Button, Divider } from "@rneui/base";
import { Link } from "expo-router";

export default function Settings() {
  const loggedIn = true;

  return (
    <SafeAreaView style={styles.container}>
      {loggedIn ? (
        <>
          <View style={styles.div}>
            <Text style={styles.heading}>Device Profile</Text>
            <Divider style={styles.divider} />
            <View style={styles.items}>
              <Text style={styles.itemKey}>Name</Text>
              <Text style={styles.itemValue}>Kamar Pintar AAN</Text>
            </View>
            <View style={styles.items}>
              <Text style={styles.itemKey}>Location</Text>
              <Text style={styles.itemValue}>Jalan Rumah AAN, No. 5</Text>
            </View>
          </View>
          <View style={styles.div}>
            <Text style={styles.heading}>System Configuration</Text>
            <Divider style={styles.divider} />
            <View style={styles.items}>
              <Text style={styles.itemKey}>Movement Detection Timeout</Text>
              <Text style={styles.itemValue}>5 Minutes</Text>
            </View>
          </View>
        </>
      ) : (
        <View style={styles.groupNotLogin}>
          <Text style={styles.textReminder}>
            Please Log In to Configure System Settings
          </Text>

          <Button buttonStyle={styles.button}>
            <Link style={styles.buttonTitle} href="/login">
              Login
            </Link>
          </Button>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  div: {
    margin: 20,
  },
  heading: { fontSize: 16, fontWeight: "600" },
  divider: { borderColor: "#000", marginBottom: 8 },
  items: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  itemKey: { fontSize: 18, fontWeight: "400" },
  itemValue: { fontSize: 18, color: "#7f7f7f" },
  button: {
    width: 100,
    backgroundColor: "#888888",
    borderRadius: 10,
    paddingVertical: 10,
  },
  buttonTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
    width: "100%",
    height: "100%",
    textAlign: "center",
  },
  groupNotLogin: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  textReminder: {
    fontSize: 18,
  },
});
