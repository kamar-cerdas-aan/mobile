import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import Card from "@/components/Cards";
import { dataModel } from "@/model/data";
import { groupByDate } from "@/utils/group";
import { Button, Divider } from "@rneui/base";
import { Link } from "expo-router";
import client from "./api/client";

export default function Monitor() {
  const [data, setData] = useState<
    {
      key: string;
      data: dataModel[];
    }[]
  >();

  let loggedIn = true;
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiIiwiZGV2aWNlX2lkIjoiYnVrYW5oYW5zMiIsImlhdCI6MTcxNzg5ODIzMn0.PmdFMEyKcM4DBSV2SZp1_XyhiNtCeRs-HTq8P4bL0UY";

  const fetchAPI = async () => {
    try {
      const res = await client.get("/api/data", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data);
      const resData = res.data;
      if (resData !== null) {
        try {
          setData(groupByDate(resData));
        } catch (error) {
          console.error(error);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAPI();
    const interval = setInterval(fetchAPI, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView style={loggedIn ? styles.container : styles.middle}>
      {loggedIn ? (
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
      ) : (
        <View style={styles.groupNotLogin}>
          <Text style={styles.textReminder}>
            Please Log In to Monitor Your Logs
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
  middle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
  groupNotLogin: {
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
});
