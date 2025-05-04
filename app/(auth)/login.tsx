import { useSignIn } from "@/hooks/useAuth";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import Toast from "react-native-toast-message";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate: signIn, isLoading, isError } = useSignIn();

  const handleLogin = () => {
    if (email && password) {
      signIn({ email, password });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Text style={styles.logo}>fit.guide</Text>
      <Text style={styles.title}>Log in</Text>
      <Text style={styles.subtitle}>
        Enter your email and password to use the app
      </Text>

      <TextInput
        style={styles.input}
        placeholder="helloyerik@gmail.com"
        placeholderTextColor="#999999"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#999999"
          value={password}
          onChangeText={setPassword}
          autoComplete="password"
          secureTextEntry={true}
        />
      </View>

      {/* <TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgot password?</Text>
      </TouchableOpacity> */}
      <TouchableOpacity style={styles.continueButton} onPress={handleLogin}>
        {isLoading ? (
          <>
            <ActivityIndicator color="#fff" />
          </>
        ) : (
          <Text style={styles.continueText}>Continue</Text>
        )}
      </TouchableOpacity>
      <View style={styles.separatorContainer}>
        <View style={styles.separator} />
        <Text style={styles.orText}>or</Text>
        <View style={styles.separator} />
      </View>
      <TouchableOpacity
        style={styles.signInButton}
        onPress={() => router.push("/(auth)/sign-up")}
      >
        <Text style={styles.signInText}>Sign up</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  logo: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#777",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    backgroundColor: "#F6F6F6",
    padding: 14,
    borderRadius: 8,
    marginBottom: 12,
  },
  passwordContainer: {
    width: "100%",
    position: "relative",
  },
  toggleButton: {
    position: "absolute",
    right: 10,
    top: 14,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    color: "#000",
    fontWeight: "500",
    marginBottom: 20,
  },
  continueButton: {
    backgroundColor: "#1f1f1f",
    padding: 14,
    width: "100%",
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
    height: 47,
  },
  continueText: {
    color: "#fff",
    fontWeight: "bold",
  },
  separatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
  orText: {
    marginHorizontal: 10,
    color: "#777",
  },
  signInButton: {
    backgroundColor: "#f0f0f0",
    padding: 14,
    width: "100%",
    borderRadius: 8,
    alignItems: "center",
  },
  signInText: {
    color: "#000",
    fontWeight: "bold",
  },
});
