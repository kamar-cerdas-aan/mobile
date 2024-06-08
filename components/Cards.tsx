import { Divider } from "@rneui/base";
import { View, Text } from "react-native";
import { dataModel } from "@/model/data";

export default function Card({ item }: { item: dataModel }) {
  return (
    <View
      style={{
        marginVertical: 4,
        borderWidth: 1,
        borderRadius: 8,
        padding: 4,
      }}>
      <Text>Movement Detection Timeout</Text>
      <Divider />
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View style={{ flex: 1, width: "100%" }}>
          <Text>At</Text>
          <Text>{item.timestamp.toString().slice(16, 24)}</Text>
        </View>
        <View style={{ flex: 1, width: "100%" }}>
          <Text>Lamp Action</Text>
          <Text>{item.timestamp.toString().slice(16, 24)}</Text>
        </View>
      </View>
    </View>
  );
}

function Cards({ item }: { item: dataModel }) {
  return (
    <View
      style={{
        marginHorizontal: 8,
        marginVertical: 4,
        padding: 4,
        gap: 4,
      }}>
      <Text>{item.timestamp.toString()}</Text>
      <Divider />
    </View>
  );
}
