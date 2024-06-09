import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { Link, useRouter } from "expo-router";
import { useAuth } from "./context/AuthProvider";

export default function index() {
  const { authState, setAuthState } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      authState ? router.push("./dashboard") : router.push("./register");
    }, 5000);
  }, []);

  return (
    <View style={styles.container}>
      <Link
        href="/login"
        style={{
          fontSize: 32,
          fontWeight: 500,
          width: "70%",
          textAlign: "center",
        }}>
        Welcome to
      </Link>
      <Text
        style={{
          fontSize: 32,
          fontWeight: 500,
          width: "70%",
          textAlign: "center",
        }}>
        Kamar Cerdas AAN!
      </Text>
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
