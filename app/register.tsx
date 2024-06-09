import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { View } from "@/components/Themed";
import { Text, Input, Button } from "@rneui/base";
import { Link, useNavigation } from "expo-router";
import client from "./api/client";
import { RootDrawerParamList } from "./navigation/types";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useAuth } from "./context/AuthProvider";

type RegisterNavigationProp = DrawerNavigationProp<
  RootDrawerParamList,
  "register"
>;

export default function Register() {
  const navigation = useNavigation<RegisterNavigationProp>();
  const { authState, setAuthState, setToken, setDeviceID } = useAuth();
  const [error, setError] = useState("");

  const emptyUserInfo = {
    deviceID: "",
    password: "",
    confirmPassword: "",
  };

  const [userInfo, setUserInfo] = useState(emptyUserInfo);

  const { deviceID, password, confirmPassword } = userInfo;

  const handleOnChangeText = (value: string, fieldName: string) => {
    setUserInfo({ ...userInfo, [fieldName]: value });
  };

  const isValidPassword = () => {
    if (!password.trim() || password.length < 8) {
      setError("Password must consists a minimum of 8 characters");
      return false;
    } else if (password !== confirmPassword) {
      setError("Password do not match!");
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (isValidPassword()) {
      try {
        const resReg = await client.post(
          `/api/register?device_id=${userInfo.deviceID}`,
          {
            password: userInfo.password,
          }
        );
        console.log(resReg);

        const resLog = await client.post("/api/login", {
          device_id: userInfo.deviceID,
          password: userInfo.password,
        });
        console.log(resLog);

        const resData = resLog.data;

        if (resLog.status === 200) {
          setAuthState(true);
          setToken(resData.token);
          setDeviceID(userInfo.deviceID);
          setUserInfo(emptyUserInfo);
          navigation.navigate("dashboard");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      authState ? navigation.navigate("dashboard") : null;
    }, 500);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title}>Create New Account</Text>
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
            value={password}
            inputContainerStyle={styles.input}
            onChangeText={(value) => handleOnChangeText(value, "password")}
          />
          <Input
            placeholder="Re-Type Your Password"
            secureTextEntry={true}
            inputStyle={styles.inputText}
            value={confirmPassword}
            inputContainerStyle={styles.input}
            onChangeText={(value) =>
              handleOnChangeText(value, "confirmPassword")
            }
          />
          <Button
            title="Register"
            buttonStyle={styles.button}
            titleStyle={styles.buttonTitle}
            onPress={handleRegister}
          />
          {error ? (
            <Text style={{ fontSize: 12, color: "red", textAlign: "center" }}>
              {error}
            </Text>
          ) : null}
        </View>
        <View style={styles.footerBox}>
          <Text>Device already registered?</Text>
          <Link href="/login" style={styles.link}>
            Try login instead
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
    width: "100%",
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
    marginTop: 8,
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
