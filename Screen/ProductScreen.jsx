import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { useRouter } from "expo-router";

const ProductScreen = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const router = useRouter();

  const receipes = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://dummyjson.com/recipes");
      setProduct(res.data.recipes); // ✅ fixed
    } catch (error) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    receipes();
  }, []);

  const handleReceipe = (id) => {
    router.push(`/product/${id}`);
  };

  const receipePage = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleReceipe(item.id)}
      activeOpacity={0.8}
    >
      <Image source={{ uri: item.image }} style={styles.image} />

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>
          {item.name}
        </Text>

        <Text style={styles.rating}>⭐ {item.rating}</Text>

        <Text style={styles.mealType}>{item.mealType.join(", ")}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0066cc" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={product}
        renderItem={receipePage}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default ProductScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    backgroundColor: "#fff",
    width: "48%",
    marginBottom: 15,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 4, // Android shadow
  },

  image: {
    width: "100%",
    height: 120,
  },

  info: {
    padding: 8,
  },

  title: {
    fontSize: 14,
    fontWeight: "600",
  },

  rating: {
    fontSize: 12,
    color: "#f39c12",
    marginVertical: 4,
  },

  mealType: {
    fontSize: 11,
    color: "#666",
  },
});
