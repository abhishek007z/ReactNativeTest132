import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useContext, useState } from "react";
import { AuthContext } from "../../src/context/AuthContext";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Register() {
  const { register } = useContext(AuthContext);
  const router = useRouter();

  const [show, setShow] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleRegister = async () => {
    try {
      await register(form);
      router.replace("/(tabs)");
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* 🌟 Brand */}
      <View style={styles.brandBox}>
        <Ionicons name="cart-outline" size={50} color="#38bdf8" />
        <Text style={styles.brand}>ShopSphere</Text>
        <Text style={styles.tagline}>Create your free account</Text>
      </View>

      {/* 📦 Card */}
      <View style={styles.card}>
       

        {/* First Name */}
        <View style={styles.inputBox}>
          <Ionicons name="person-outline" size={18} color="#94a3b8" />
          <TextInput
            placeholder="First Name"
            placeholderTextColor="#94a3b8"
            style={styles.input}
            onChangeText={(v) => setForm({ ...form, firstName: v })}
          />
        </View>

        {/* Last Name */}
        <View style={styles.inputBox}>
          <Ionicons name="person-outline" size={18} color="#94a3b8" />
          <TextInput
            placeholder="Last Name"
            placeholderTextColor="#94a3b8"
            style={styles.input}
            onChangeText={(v) => setForm({ ...form, lastName: v })}
          />
        </View>

        {/* Email */}
        <View style={styles.inputBox}>
          <Ionicons name="mail-outline" size={18} color="#94a3b8" />
          <TextInput
            placeholder="Email"
            placeholderTextColor="#94a3b8"
            style={styles.input}
            onChangeText={(v) => setForm({ ...form, email: v })}
          />
        </View>

        {/* Password */}
        <View style={styles.inputBox}>
          <Ionicons name="lock-closed-outline" size={18} color="#94a3b8" />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#94a3b8"
            secureTextEntry={!show}
            style={styles.input}
            onChangeText={(v) => setForm({ ...form, password: v })}
          />

          <TouchableOpacity onPress={() => setShow(!show)}>
            <Ionicons
              name={show ? "eye-off-outline" : "eye-outline"}
              size={18}
              color="#94a3b8"
            />
          </TouchableOpacity>
        </View>

        {/* Button */}
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Create Account</Text>
          <Ionicons name="arrow-forward" size={18} color="#020617" />
        </TouchableOpacity>

        {/* Login link */}
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.link}>
            Already have an account?{" "}
            <Text style={styles.linkBold}>Login</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#020617",
    justifyContent: "center",
    padding: 20,
  },

  brandBox: {
    alignItems: "center",
    marginBottom: 24,
  },

  brand: {
    color: "white",
    fontSize: 30,
    fontWeight: "900",
    marginTop: 6,
  },

  tagline: {
    color: "#94a3b8",
    marginTop: 4,
  },

  card: {
    backgroundColor: "#0f172a",
    borderRadius: 20,
    padding: 22,
  },

  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "800",
  },

  subtitle: {
    color: "#94a3b8",
    marginBottom: 20,
  },

  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#020617",
    borderWidth: 1,
    borderColor: "#1e293b",
    borderRadius: 14,
    paddingHorizontal: 12,
    marginBottom: 14,
  },

  input: {
    flex: 1,
    padding: 12,
    color: "white",
    marginLeft: 8,
  },

  button: {
    backgroundColor: "#38bdf8",
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    marginTop: 8,
  },

  buttonText: {
    color: "#020617",
    fontWeight: "900",
    fontSize: 16,
  },

  link: {
    color: "#94a3b8",
    textAlign: "center",
    marginTop: 16,
  },

  linkBold: {
    color: "#38bdf8",
    fontWeight: "800",
  },
});
