import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import { useContext } from "react";
import { CartContext } from "../../src/context/CartContext";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Cart() {
  const {
    cart,
    increaseQty,
    decreaseQty,
    removeFromCart,
    totalPrice,
  } = useContext(CartContext);

  const router = useRouter();

  if (cart.length === 0) {
    return (
      <View style={styles.empty}>
        <StatusBar barStyle="light-content" />
        <Ionicons name="cart-outline" size={90} color="#334155" />
        <Text style={styles.emptyText}>Your cart is empty</Text>

        <TouchableOpacity
          style={styles.shopBtn}
          onPress={() => router.replace("/(tabs)")}
        >
          <Text style={styles.shopText}>Start Shopping</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* 🔷 Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Cart</Text>
        <Text style={styles.count}>{cart.length} items</Text>
      </View>

      {/* 🔷 Items */}
      <FlatList
        data={cart}
        keyExtractor={(item) => item.__cartId}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.thumbnail }} style={styles.image} />

            <View style={styles.info}>
              <Text style={styles.title} numberOfLines={2}>
                {item.title}
              </Text>

              <Text style={styles.price}>${item.price}</Text>

              <View style={styles.bottomRow}>
                <View style={styles.qtyBox}>
                  <TouchableOpacity
                    onPress={() => decreaseQty(item.__cartId)}
                  >
                    <Ionicons name="remove" size={18} color="white" />
                  </TouchableOpacity>

                  <Text style={styles.qty}>{item.quantity}</Text>

                  <TouchableOpacity
                    onPress={() => increaseQty(item.__cartId)}
                  >
                    <Ionicons name="add" size={18} color="white" />
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  onPress={() => removeFromCart(item.__cartId)}
                >
                  <Ionicons name="trash-outline" size={22} color="#f87171" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />

      {/* 🔷 Sticky Checkout */}
      <View style={styles.checkoutBar}>
        <View>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.total}>${totalPrice.toFixed(2)}</Text>
        </View>

        <TouchableOpacity
          style={styles.checkoutBtn}
          onPress={() => router.push("/checkout")}
        >
          <Text style={styles.checkoutText}>Proceed</Text>
          <Ionicons name="arrow-forward" size={18} color="#020617" />
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
  },

  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#1e293b",
  },

  headerTitle: {
    color: "white",
    fontSize: 22,
    fontWeight: "900",
  },

  count: {
    color: "#94a3b8",
    marginTop: 2,
  },

  empty: {
    flex: 1,
    backgroundColor: "#020617",
    justifyContent: "center",
    alignItems: "center",
  },

  emptyText: {
    color: "#94a3b8",
    fontSize: 18,
    marginTop: 12,
  },

  shopBtn: {
    marginTop: 18,
    backgroundColor: "#38bdf8",
    paddingHorizontal: 26,
    paddingVertical: 12,
    borderRadius: 14,
  },

  shopText: {
    fontWeight: "900",
    color: "#020617",
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#0f172a",
    marginHorizontal: 14,
    marginTop: 12,
    borderRadius: 18,
    padding: 10,
  },

  image: {
    width: 92,
    height: 92,
    borderRadius: 14,
  },

  info: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "space-between",
  },

  title: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },

  price: {
    color: "#38bdf8",
    fontWeight: "800",
    marginTop: 4,
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  qtyBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#020617",
    borderRadius: 30,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },

  qty: {
    color: "white",
    fontWeight: "800",
    marginHorizontal: 14,
  },

  checkoutBar: {
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

  totalLabel: {
    color: "#94a3b8",
    fontSize: 12,
  },

  total: {
    color: "white",
    fontSize: 22,
    fontWeight: "900",
  },

  checkoutBtn: {
    backgroundColor: "#38bdf8",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  checkoutText: {
    fontWeight: "900",
    color: "#020617",
    fontSize: 16,
  },
});
