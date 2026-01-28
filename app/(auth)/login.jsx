import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useContext, useState } from "react";
import { AuthContext } from "../../src/context/AuthContext";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Login() {
  const { login } = useContext(AuthContext);
  const router = useRouter();

  const [email, setEmail] = useState("john.doe@example.com");
  const [password, setPassword] = useState("password123");
  const [show, setShow] = useState(false);

  const handleLogin = async () => {
    try {
      await login(email, password);
      router.replace("/(tabs)");
    } catch {
      alert("Invalid email or password");
    }
  };

  return (
    <View style={styles.container}>
      {/* 🌟 Brand */}
      <View style={styles.brandBox}>
        <Ionicons name="cart-outline" size={54} color="#38bdf8" />
        <Text style={styles.brand}>ShopSphere</Text>
        <Text style={styles.tagline}>Smart shopping starts here</Text>
      </View>

      {/* 🔐 Card */}
      <View style={styles.card}>
       

        {/* 📧 Email */}
        <View style={styles.inputBox}>
          <Ionicons name="mail-outline" size={18} color="#94a3b8" />
          <TextInput
            placeholder="Email"
            placeholderTextColor="#94a3b8"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
        </View>

        {/* 🔑 Password */}
        <View style={styles.inputBox}>
          <Ionicons name="lock-closed-outline" size={18} color="#94a3b8" />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#94a3b8"
            secureTextEntry={!show}
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />

          <TouchableOpacity onPress={() => setShow(!show)}>
            <Ionicons
              name={show ? "eye-off-outline" : "eye-outline"}
              size={18}
              color="#94a3b8"
            />
          </TouchableOpacity>
        </View>

        {/* ✅ Button */}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
          <Ionicons name="arrow-forward" size={18} color="#020617" />
        </TouchableOpacity>

        {/* 🔁 Register */}
        <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
          <Text style={styles.link}>
            Don’t have an account? <Text style={styles.linkBold}>Register</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
    justifyContent: "center",
    padding: 20,
  },

  brandBox: {
    alignItems: "center",
    marginBottom: 30,
  },

  brand: {
    color: "white",
    fontSize: 32,
    fontWeight: "900",
    marginTop: 8,
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
    marginTop: 10,
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
