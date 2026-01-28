import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useContext, useState } from "react";
import { CartContext } from "../src/context/CartContext";
import { AuthContext } from "../src/context/AuthContext";
import { createOrderApi } from "../src/api/order";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Checkout() {
  const { cart, totalPrice } = useContext(CartContext);
  const { TOKEN } = useContext(AuthContext);
  const router = useRouter();

  const [address, setAddress] = useState({
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  const handleOrder = async () => {
    try {
      const orderData = {
        products: cart.map((i) => ({
          productId: i._id || i.id,
          quantity: i.quantity,
        })),
        shippingAddress: address,
        paymentMethod: "card",
      };

      await createOrderApi(orderData, TOKEN);
      alert("Order placed successfully!");
      router.replace("/(tabs)/orders");
    } catch {
      alert("Order failed");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* 🔙 Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={22} color="#38bdf8" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Checkout</Text>
        </View>

        {/* 📍 Address */}
        <Text style={styles.section}>Shipping Address</Text>

        <View style={styles.card}>
          {[
            { key: "address", icon: "home-outline" },
            { key: "city", icon: "business-outline" },
            { key: "state", icon: "map-outline" },
            { key: "postalCode", icon: "mail-outline" },
            { key: "country", icon: "earth-outline" },
          ].map((f) => (
            <View key={f.key} style={styles.inputRow}>
              <Ionicons name={f.icon} size={18} color="#94a3b8" />
              <TextInput
                placeholder={f.key.toUpperCase()}
                placeholderTextColor="#94a3b8"
                style={styles.input}
                onChangeText={(v) =>
                  setAddress({ ...address, [f.key]: v })
                }
              />
            </View>
          ))}
        </View>

        {/* 🧾 Order Summary */}
        <Text style={styles.section}>Order Summary</Text>

        <View style={styles.summaryCard}>
          {cart.map((i) => (
            <View style={styles.itemRow} key={i.__cartId}>
              <Text style={styles.itemTitle} numberOfLines={1}>
                {i.title}
              </Text>
              <Text style={styles.itemQty}>
                x{i.quantity}
              </Text>
            </View>
          ))}

          <View style={styles.divider} />

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.total}>${totalPrice.toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>

      {/* ✅ Fixed Place Order */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.payLabel}>Payable Amount</Text>
          <Text style={styles.payTotal}>${totalPrice.toFixed(2)}</Text>
        </View>

        <TouchableOpacity style={styles.btn} onPress={handleOrder}>
          <Text style={styles.btnText}>Place Order</Text>
          <Ionicons name="arrow-forward" size={18} color="#020617" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#020617" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },

  headerTitle: {
    color: "white",
    fontSize: 22,
    fontWeight: "900",
    marginLeft: 12,
  },

  section: {
    color: "white",
    fontSize: 16,
    fontWeight: "800",
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 8,
  },

  card: {
    backgroundColor: "#0f172a",
    marginHorizontal: 16,
    borderRadius: 18,
    padding: 12,
  },

  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#020617",
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#1e293b",
  },

  input: {
    flex: 1,
    color: "white",
    padding: 12,
    marginLeft: 8,
  },

  summaryCard: {
    backgroundColor: "#0f172a",
    marginHorizontal: 16,
    borderRadius: 18,
    padding: 14,
  },

  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  itemTitle: {
    color: "white",
    flex: 1,
    marginRight: 10,
  },

  itemQty: {
    color: "#94a3b8",
    fontWeight: "700",
  },

  divider: {
    height: 1,
    backgroundColor: "#1e293b",
    marginVertical: 10,
  },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  totalLabel: {
    color: "#94a3b8",
  },

  total: {
    color: "#38bdf8",
    fontSize: 22,
    fontWeight: "900",
  },

  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#020617",
    borderTopWidth: 1,
    borderColor: "#1e293b",
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  payLabel: {
    color: "#94a3b8",
    fontSize: 12,
  },

  payTotal: {
    color: "white",
    fontSize: 22,
    fontWeight: "900",
  },

  btn: {
    backgroundColor: "#38bdf8",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 16,
  },

  btnText: {
    fontWeight: "900",
    color: "#020617",
    fontSize: 16,
  },
});
