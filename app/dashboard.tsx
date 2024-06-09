import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import Card from "@/components/Cards";
import { dataModel } from "@/model/data";
import { groupByDate } from "@/utils/group";
import { Divider } from "@rneui/base";
import { useNavigation } from "expo-router";
import client from "./api/client";
import { useAuth } from "./context/AuthProvider";
import { RootDrawerParamList } from "./navigation/types";
import { DrawerNavigationProp } from "@react-navigation/drawer";

type DashboardNavigationProp = DrawerNavigationProp<
  RootDrawerParamList,
  "dashboard"
>;

export default function Dashboard() {
  const { authState, token, device_id } = useAuth();

  const navigation = useNavigation<DashboardNavigationProp>();

  const [data, setData] = useState<
    {
      key: string;
      data: dataModel[];
    }[]
  >();

  const fetchAPI = async () => {
    try {
      const res = await client.get("/api/data", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const resData = res.data;
      if (resData !== null) {
        try {
          setData(groupByDate(resData));
          navigation.setOptions({
            title: "Device ID: " + String(device_id),
          });
        } catch (error) {
          console.error(error);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (authState) {
      fetchAPI();
      const interval = setInterval(fetchAPI, 15000);
      return () => clearInterval(interval);
    } else {
      navigation.navigate("login");
    }
  }, [authState]);

  return (
    <SafeAreaView style={styles.container}>
      {data?.length === 0 ? (
        <Text
          style={{
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
            fontWeight: "400",
          }}>
          No Data Available
        </Text>
      ) : null}
      <FlatList
        data={data}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <View style={styles.groupContainer}>
            <Text style={styles.groupTitle}>{item.key}</Text>
            <Divider style={styles.divider} />
            <View style={styles.cardContainer}>
              <FlatList
                data={item.data}
                keyExtractor={(item) => item.timestamp.toString()}
                renderItem={({ item }) => <Card item={item} />}
              />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  groupContainer: {
    margin: 16,
    gap: 4,
  },
  groupTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  divider: {
    marginBottom: 8,
    borderColor: "#000",
  },
  cardContainer: {
    gap: 4,
  },
  textReminder: {
    fontSize: 18,
  },
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
});
