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
      <Text style={{fontSize: 18, fontWeight: "500", padding: 4}}>Movement Detection Timeout</Text>
      <Divider />
      <View style={{ flex: 1, flexDirection: "row", padding: 4}}>
        <View style={{ flex: 1, width: "100%" }}>
          <Text style={{fontWeight: "500"}}>At</Text>
          <Text>{item.timestamp.toString().slice(11, 19)}</Text>
        </View>
        <View style={{ flex: 1, width: "100%" }}>
        <Text style={{fontWeight: "500"}}>Lamp Action</Text>
          <Text>{(item.light) ? `Lamp On` : `Lamp Off`}</Text>
        </View>
      </View>
    </View>
  );
}