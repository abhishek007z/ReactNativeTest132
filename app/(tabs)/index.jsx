import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { useEffect, useState, useContext } from "react";
import { getAllProductsApi } from "../../src/api/product";
import { useRouter } from "expo-router";
import { CartContext } from "../../src/context/CartContext";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../../src/context/AuthContext";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const { cart } = useContext(CartContext);
  const router = useRouter();
const { logout, user } = useContext(AuthContext);
const [showMenu, setShowMenu] = useState(false);
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await getAllProductsApi(1, 30);
      setProducts(res.data.data.products);
    } catch (err) {
      alert("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const filtered = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#38bdf8" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* 🔷 HEADER */}
  <View style={styles.headerRow}>
  <View>
    <Text style={styles.logo}>🛍️ ShopX</Text>
    <Text style={styles.tagline}>Find your best products</Text>
  </View>

  {/* 👤 USER AVATAR */}
  <View style={{ position: "relative" }}>
    <TouchableOpacity
      style={styles.avatar}
      onPress={() => setShowMenu(!showMenu)}
    >
      <Text style={styles.avatarText}>
        {user?.name?.[0]?.toUpperCase() || "U"}
      </Text>
    </TouchableOpacity>

    {/* 🔽 DROPDOWN */}
    {showMenu && (
      <View style={styles.menu}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={async () => {
  setShowMenu(false);
  await logout();                   
  router.replace("/(auth)/login");  redirect
}}

        >
          <Ionicons name="log-out-outline" size={18} color="white" />
          <Text style={styles.menuText}>Logout</Text>
        </TouchableOpacity>
      </View>
    )}
  </View>
</View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 🔷 HORIZONTAL FEATURED */}
        <Text style={styles.section}>🔥 Featured</Text>

        <FlatList
          data={filtered.slice(0, 8)}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{ paddingHorizontal: 12 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.hCard}
              onPress={() => router.push(`/product/${item._id}`)}
            >
              <Image source={{ uri: item.thumbnail }} style={styles.hImg} />
              <Text style={styles.hTitle} numberOfLines={1}>
                {item.title}
              </Text>
              <Text style={styles.price}>${item.price}</Text>
            </TouchableOpacity>
          )}
        />

        {/* 🔷 GRID PRODUCTS */}
        <Text style={styles.section}>🛒 All Products</Text>

        <FlatList
          data={filtered}
          numColumns={2}
          scrollEnabled={false}
          keyExtractor={(item) => item._id}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          contentContainerStyle={{ padding: 12 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => router.push(`/product/${item._id}`)}
            >
              <Image source={{ uri: item.thumbnail }} style={styles.image} />
              <Text style={styles.title} numberOfLines={2}>
                {item.title}
              </Text>
              <Text style={styles.price}>${item.price}</Text>
              <Text style={styles.rating}>⭐ {item.rating}</Text>
            </TouchableOpacity>
          )}
        />
      </ScrollView>

      {/* 🛒 FLOATING CART */}
      <TouchableOpacity
        style={styles.floating}
        onPress={() => router.push("/(tabs)/cart")}
      >
        <Ionicons name="cart" size={26} color="#020617" />
        {cart.length > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{cart.length}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#020617" },

  center: {
    flex: 1,
    backgroundColor: "#020617",
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    padding: 14,
    backgroundColor: "#020617",
  },

  logo: {
    color: "#38bdf8",
    fontSize: 28,
    fontWeight: "900",
  },

  tagline: {
    color: "#94a3b8",
    marginBottom: 12,
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0f172a",
    borderRadius: 12,
    paddingHorizontal: 10,
  },

  search: {
    flex: 1,
    padding: 10,
    color: "white",
  },

  section: {
    color: "white",
    fontSize: 18,
    fontWeight: "800",
    marginVertical: 10,
    marginLeft: 12,
  },

  hCard: {
    backgroundColor: "#0f172a",
    borderRadius: 14,
    padding: 10,
    marginRight: 12,
    width: 160,
  },

  hImg: {
    height: 110,
    borderRadius: 12,
    marginBottom: 8,
  },

  hTitle: {
    color: "white",
    fontWeight: "600",
    fontSize: 13,
  },

  card: {
    backgroundColor: "#0f172a",
    width: "48%",
    borderRadius: 14,
    padding: 10,
    marginBottom: 12,
  },

  image: {
    height: 120,
    borderRadius: 12,
    marginBottom: 8,
  },

  title: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },

  price: {
    color: "#38bdf8",
    fontSize: 15,
    fontWeight: "800",
    marginTop: 4,
  },

  rating: {
    color: "#94a3b8",
    fontSize: 12,
    marginTop: 2,
  },

  floating: {
    position: "absolute",
    bottom: 20,
    left: 20,
    backgroundColor: "#38bdf8",
    padding: 16,
    borderRadius: 50,
    elevation: 5,
  },

  badge: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: "red",
    borderRadius: 20,
    paddingHorizontal: 6,
  },

  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "700",
  },
  headerRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  padding: 14,
},

avatar: {
  width: 44,
  height: 44,
  borderRadius: 22,
  backgroundColor: "#38bdf8",
  justifyContent: "center",
  alignItems: "center",
},

avatarText: {
  fontWeight: "900",
  color: "#020617",
  fontSize: 18,
},

menu: {
  position: "absolute",
  top: 52,
  right: 0,
  backgroundColor: "#0f172a",
  borderRadius: 12,
  borderWidth: 1,
  borderColor: "#1e293b",
  padding: 8,
  minWidth: 130,
  zIndex: 100,
},

menuItem: {
  flexDirection: "row",
  alignItems: "center",
  gap: 8,
  padding: 10,
},

menuText: {
  color: "white",
  fontWeight: "600",
},

});
