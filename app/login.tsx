import React from "react";
import { StyleSheet } from "react-native";
import { View } from "@/components/Themed";
import { Text, Input, Button } from "@rneui/base";
import { Link } from "expo-router";

export default function Login() {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title}>Welcome Back!</Text>
        <View style={styles.inputContainer}>
          <Input
            placeholder="Device ID"
            keyboardType="default"
            inputStyle={styles.inputText}
            inputContainerStyle={styles.input}
          />
          <Input
            placeholder="Password"
            secureTextEntry={true}
            inputStyle={styles.inputText}
            inputContainerStyle={styles.input}
          />
          <Button
            title="Log In"
            buttonStyle={styles.button}
            titleStyle={styles.buttonTitle}
          />
        </View>
        <View style={styles.footerBox}>
          <Text>New Device?</Text>
          <Link href="/register" style={styles.link}>
            Register Device
          </Link>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  box: {
    flex: 1,
    paddingHorizontal: 64,
    borderRadius: 10,
    gap: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    lineHeight: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  inputContainer: {
    width: "100%",
    alignItems: "center",
    gap: 4,
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  footerBox: {
    width: "100%",
    alignItems: "center",
    gap: 4,
  },
  input: {
    width: "102%",
    paddingLeft: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  inputText: {
    fontSize: 16,
  },
  button: {
    width: 220,
    backgroundColor: "#888888",
    borderRadius: 10,
    paddingVertical: 10,
    marginTop: 12,
  },
  buttonTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  link: {
    textDecorationLine: "underline",
    fontWeight: "500",
  },
});
