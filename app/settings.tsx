import { StyleSheet, Text, SafeAreaView, View, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Divider } from "@rneui/base";
import client from "./api/client";
import { useAuth } from "./context/AuthProvider";

export default function Settings() {
  const { authState, setAuthState, token, setToken } = useAuth();

  const [error, setError] = useState("");
  const [userInfo, setUserInfo] = useState({
    name: "",
    location: "",
    device_id: "",
    password: "",
  });

  const { name, location, device_id, password } = userInfo;

  const handleOnChangeText = (value: string, fieldName: string) => {
    setUserInfo({ ...userInfo, [fieldName]: value });
  };

  const handleProfileUpdate = async () => {
    if (name.trim() && location.trim() && password.trim()) {
      try {
        console.log(name, location, password);
        const res = await client.post(
          `/api/profile`,
          {
            name: name,
            location: location,
            password: password,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.status === 200) {
          handleOnChangeText("", "password");
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      setError("Please Fill All Fields");
      setTimeout(() => {
        setError("");
      }, 2500);
    }
  };

  const fetchAPI = () => {
    client
      .get("/api/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const resData = res.data;
        setUserInfo({
          name: resData.name,
          location: resData.location,
          device_id: resData.device_id,
          password: "",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    fetchAPI();
  }, [authState]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.div}>
        <Text style={styles.heading}>Device Profile</Text>
        <Divider style={styles.divider} />
        <View style={styles.items}>
          <Text style={styles.itemKey}>Name</Text>
          <TextInput
            style={styles.itemInput}
            value={name}
            onChangeText={(value) => handleOnChangeText(value, "name")}
          />
        </View>
        <View style={styles.items}>
          <Text style={styles.itemKey}>Location</Text>
          <TextInput
            style={styles.itemInput}
            value={location}
            onChangeText={(value) => handleOnChangeText(value, "location")}
          />
        </View>
        <View
          style={[
            styles.items,
            { marginTop: 12, borderWidth: 1, padding: 12, borderRadius: 8 },
          ]}>
          <TextInput
            style={styles.password}
            secureTextEntry={true}
            placeholder="Password"
            value={password}
            onChangeText={(value) => handleOnChangeText(value, "password")}
          />
          <Button
            buttonStyle={styles.button}
            titleStyle={styles.buttonTitle}
            onPress={handleProfileUpdate}
            title={"Update Profile"}
          />
        </View>
        {error ? (
          <Text style={{ fontSize: 12, color: "red" }}>{error}</Text>
        ) : null}
      </View>
      <View style={styles.div}>
        <Text style={styles.heading}>System Configuration</Text>
        <Divider style={styles.divider} />
        <View style={styles.items}>
          <Text style={styles.itemKey}>Movement Detection Timeout</Text>
          <Text style={styles.itemValue}>5 minutes</Text>
        </View>
      </View>
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
  itemValue: {
    fontSize: 18,
    color: "#7f7f7f",
    textAlign: "right",
    borderRadius: 8,
  },
  itemInput: {
    fontSize: 18,
    color: "#7f7f7f",
    height: "100%",
    width: 200,
    textAlign: "right",
    backgroundColor: "#F0F0F0",
    paddingRight: 10,
    borderRadius: 8,
  },
  password: {
    fontSize: 16,
    fontWeight: "400",
    color: "#888888",
    fontStyle: "italic",
    backgroundColor: "#F0F0F0",
    height: 32,
    width: 220,
    marginRight: 16,
    textAlignVertical: "center",
    paddingLeft: 12,
    borderRadius: 8,
  },
  button: {
    backgroundColor: "#888888",
    borderRadius: 10,
  },
  buttonTitle: {
    fontSize: 12,
    fontWeight: "500",
    color: "#ffffff",
    height: "100%",
    textAlign: "center",
  },
});
