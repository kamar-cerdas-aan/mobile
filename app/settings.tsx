import { StyleSheet, Text, SafeAreaView, View, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Divider } from "@rneui/base";
import { Link } from "expo-router";
import client from "./api/client";

export default function Settings() {
  const [error, setError] = useState("");
  const [userInfo, setUserInfo] = useState({
    name: "",
    location: "",
    device_id: "",
    password: "",
  });

  const loggedIn = true;
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiIiwiZGV2aWNlX2lkIjoiYnVrYW5oYW5zMiIsImlhdCI6MTcxNzkwNTY0MH0.BrAPfiKbnIe_FVCTIz_8jyoTtb43iwnIszp-re0NZkQ";

  const { name, location, device_id, password } = userInfo;

  const handleOnChangeText = (value: string, fieldName: string) => {
    setUserInfo({ ...userInfo, [fieldName]: value });
  };

  const handleProfileUpdate = async () => {
    if (name.trim() && location.trim() && password.trim()) {
      console.log(userInfo);
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
        console.log(res);

        if (res.status === 200) {
          window.location.reload()
        }
      } catch (error) {
        console.error(error);
      }

    } else {
      setError("Please Fill All Fields");
      setTimeout(() => {
        setError("");
      }, 2500);
      console.log(userInfo);
    }
  };

  const fetchAPI = async () => {
    try {
      const res = await client.get("/api/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data);
      const resData = res.data;
      setUserInfo({
        name: resData.name,
        location: resData.location,
        device_id: resData.device_id,
        password: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {loggedIn ? (
        <>
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
              <Text style={styles.itemKey}>
                Movement Detection Timeout (minutes)
              </Text>
              <Text style={styles.itemValue}>5 minutes</Text>
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
  itemValue: {
    fontSize: 18,
    color: "#7f7f7f",
    textAlign: "right",
    borderRadius: 8,
  },
  itemInput: {
    fontSize: 18,
    color: "#7f7f7f",
    textAlign: "right",
    backgroundColor: "#F8F8F8",
    borderRadius: 8,
  },
  password: {
    fontSize: 16,
    fontWeight: "400",
    color: "#888888",
    fontStyle: "italic",
    backgroundColor: "#FAFAFA",
    height: 32,
    width: "100%",
    marginRight: 16,
    textAlignVertical: "center",
    paddingLeft: 4,
  },
  button: {
    backgroundColor: "#888888",
    borderRadius: 10,
  },
  buttonTitle: {
    fontSize: 12,
    fontWeight: "500",
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
