import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { Link, useRouter } from "expo-router";
import { useAuth } from "./context/AuthProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function index() {
  const { setToken, setDeviceID, setAuthState } = useAuth();
  const router = useRouter();

  const fetchUser = async () => {
    const t = await AsyncStorage.getItem("token");
    const did = await AsyncStorage.getItem("device_id");

    return { t, did };
  };

  useEffect(() => {
    fetchUser().then(({ t, did }) => {
      if (t !== null && did !== null) {
        setToken(t);
        setDeviceID(did);
        setAuthState(true);
        router.push("./dashboard");
      } else {
        setToken("");
        setDeviceID("");
        setAuthState(false);
        router.push("./register");
      }
    });
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
