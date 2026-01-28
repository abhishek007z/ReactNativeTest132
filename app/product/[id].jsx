import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState, useContext } from "react";
import { getSingleProductApi } from "../../src/api/product";
import { CartContext } from "../../src/context/CartContext";
import { Ionicons } from "@expo/vector-icons";

export default function ProductDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const res = await getSingleProductApi(id);
      setProduct(res.data.data);
    } catch {
      alert("Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#38bdf8" />
      </View>
    );
  }

  if (!product) return null;

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        
        {/* 🖼️ Image Hero */}
        <View style={styles.imageBox}>
          <Image source={{ uri: product.thumbnail }} style={styles.image} />

          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={22} color="white" />
          </TouchableOpacity>
        </View>

        {/* 📦 Info */}
        <View style={styles.content}>
          <Text style={styles.title}>{product.title}</Text>

          <View style={styles.rowBetween}>
            <Text style={styles.price}>${product.price}</Text>

            <View style={styles.ratingBox}>
              <Ionicons name="star" size={14} color="#facc15" />
              <Text style={styles.rating}>{product.rating}</Text>
            </View>
          </View>

          <View style={styles.badgeRow}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{product.brand}</Text>
            </View>

            <View
              style={[
                styles.stockBadge,
                { backgroundColor: product.stock > 0 ? "#022c22" : "#3f1d1d" },
              ]}
            >
              <Text
                style={[
                  styles.stockText,
                  { color: product.stock > 0 ? "#4ade80" : "#f87171" },
                ]}
              >
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </Text>
            </View>
          </View>

          <Text style={styles.section}>Description</Text>
          <Text style={styles.desc}>{product.description}</Text>
        </View>
      </ScrollView>

      {/* 🛒 Bottom Bar */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.bottomPriceLabel}>Price</Text>
          <Text style={styles.bottomPrice}>${product.price}</Text>
        </View>

        <TouchableOpacity
          style={styles.cartBtn}
          onPress={() => addToCart(product)}
        >
          <Ionicons name="cart-outline" size={20} color="#020617" />
          <Text style={styles.cartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
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

  imageBox: {
    position: "relative",
    backgroundColor: "#020617",
  },

  image: {
    width: "100%",
    height: 320,
  },

  backBtn: {
    position: "absolute",
    top: 44,
    left: 16,
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 10,
    borderRadius: 30,
  },

  content: {
    padding: 16,
  },

  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "900",
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },

  price: {
    color: "#38bdf8",
    fontSize: 26,
    fontWeight: "900",
  },

  ratingBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0f172a",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },

  rating: {
    color: "white",
    marginLeft: 4,
    fontWeight: "700",
  },

  badgeRow: {
    flexDirection: "row",
    marginTop: 12,
  },

  badge: {
    backgroundColor: "#0f172a",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 10,
  },

  badgeText: {
    color: "#38bdf8",
    fontWeight: "700",
  },

  stockBadge: {
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },

  stockText: {
    fontWeight: "700",
  },

  section: {
    color: "white",
    fontSize: 18,
    fontWeight: "800",
    marginTop: 20,
    marginBottom: 6,
  },

  desc: {
    color: "#cbd5f5",
    lineHeight: 22,
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

  bottomPriceLabel: {
    color: "#94a3b8",
    fontSize: 12,
  },

  bottomPrice: {
    color: "white",
    fontSize: 22,
    fontWeight: "900",
  },

  cartBtn: {
    backgroundColor: "#38bdf8",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 16,
  },

  cartText: {
    fontWeight: "900",
    color: "#020617",
    fontSize: 16,
  },
});
