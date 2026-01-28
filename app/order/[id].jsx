import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { useLocalSearchParams } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { getOrderByIdApi } from "../../src/api/order";
import { useRouter } from "expo-router";

import { AuthContext } from "../../src/context/AuthContext.js";

export default function OrderDetail() {
  const { id } = useLocalSearchParams();
  const { TOKEN } = useContext(AuthContext);
  const [order, setOrder] = useState(null);
const router = useRouter();

useEffect(() => {
  if (id && TOKEN) {
    setOrder(null); 
    loadOrder();
  }
}, [id, TOKEN]);

const loadOrder = async () => {
  try {
    console.log("ORDER ID:", id);
    const res = await getOrderByIdApi(id, TOKEN);
    console.log("ORDER RES:", res.data);
    setOrder(res.data.data);
  } catch (e) {
    console.log("ORDER ERROR:", e?.response?.data || e.message);
  }
};


  if (!order) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#38bdf8" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
     <View style={styles.header}>
  <TouchableOpacity onPress={() => router.back()}>
    <Text style={styles.back}>← Back</Text>
  </TouchableOpacity>

  <Text style={styles.headerTitle}>Order Detail</Text>
</View>


      <Text style={styles.heading}>Order Detail</Text>

      <Text style={styles.text}>Order ID: {order._id}</Text>
      <Text style={styles.text}>Status: {order.status}</Text>
      <Text style={styles.text}>Payment: {order.paymentStatus}</Text>
      <Text style={styles.text}>Total: ${order.grandTotal}</Text>

      <Text style={styles.section}>Shipping Address</Text>
      <Text style={styles.text}>
        {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
        {order.shippingAddress.state}
      </Text>

      <Text style={styles.section}>Items</Text>
      {order.products.map((p, i) => (
        <Text key={i} style={styles.text}>
          {p.title} x {p.quantity}
        </Text>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f172a", padding: 16 },
  center: { flex: 1, backgroundColor: "#0f172a", justifyContent: "center", alignItems: "center" },
  heading: { color: "white", fontSize: 22, fontWeight: "700", marginBottom: 10 },
  section: { color: "#38bdf8", marginTop: 14, fontWeight: "700" },
  text: { color: "white", marginTop: 6 },
  header: {
  flexDirection: "row",
  alignItems: "center",
  padding: 14,
  backgroundColor: "#020617",
},

back: {
  color: "#38bdf8",
  fontSize: 16,
  fontWeight: "700",
},

headerTitle: {
  color: "white",
  fontSize: 18,
  fontWeight: "700",
  marginLeft: 16,
},

});
