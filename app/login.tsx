import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { View } from "@/components/Themed";
import { Text, Input, Button } from "@rneui/base";
import { Link, useNavigation, usePathname } from "expo-router";
import client from "./api/client";
import { RootDrawerParamList } from "./navigation/types";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useAuth } from "./context/AuthProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";

type LoginScreenNavigationProp = DrawerNavigationProp<
  RootDrawerParamList,
  "login"
>;

export default function Login() {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const pathname = usePathname();
  const [error, setError] = useState("");
  const { authState, setAuthState, setToken, setDeviceID } = useAuth();

  const emptyUserInfo = {
    deviceID: "",
    password: "",
  };

  const [userInfo, setUserInfo] = useState(emptyUserInfo);

  const { deviceID, password } = userInfo;

  const handleOnChangeText = (value: string, fieldName: string) => {
    setUserInfo({ ...userInfo, [fieldName]: value });
  };

  const isValidPassword = () => {
    if (
      (!password.trim() || password.length < 8) &&
      password !== "placeholder"
    ) {
      setError("Password do not match!");
      setTimeout(() => {
        setError("");
      }, 2500);
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (isValidPassword()) {
      try {
        const res = await client.post("/api/login", {
          device_id: userInfo.deviceID,
          password: userInfo.password,
        });

        const resData = res.data;
        console.log(resData.token);

        if (res.status === 200) {
          setAuthState(true);
          setToken(resData.token);
          setDeviceID(userInfo.deviceID);
          await AsyncStorage.setItem("token", resData.token);
          await AsyncStorage.setItem("device_id", userInfo.deviceID);
          setUserInfo(emptyUserInfo);
          navigation.navigate("dashboard");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (pathname === "/login") {
      authState ? navigation.navigate("dashboard") : null;
    }
  }, [pathname]);

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
            value={deviceID}
            onChangeText={(value) => handleOnChangeText(value, "deviceID")}
          />
          <Input
            placeholder="Password"
            secureTextEntry={true}
            inputStyle={styles.inputText}
            inputContainerStyle={styles.input}
            value={password}
            onChangeText={(value) => handleOnChangeText(value, "password")}
          />
          <Button
            title="Log In"
            buttonStyle={styles.button}
            titleStyle={styles.buttonTitle}
            onPress={handleLogin}
          />
          {error ? (
            <Text style={{ fontSize: 12, color: "red", textAlign: "center" }}>
              {error}
            </Text>
          ) : null}
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
