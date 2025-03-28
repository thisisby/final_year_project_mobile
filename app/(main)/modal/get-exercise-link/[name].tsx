import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Linking,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { WebView } from "react-native-webview";

export default function Page() {
  const { name } = useLocalSearchParams();
  const navigate = useNavigation();
  const decodedLink = decodeURIComponent(name);
  const isValidUrl =
    decodedLink &&
    (decodedLink.startsWith("http://") || decodedLink.startsWith("https://"));

  return (
    <View style={styles.container}>
      {isValidUrl ? (
        <WebView source={{ uri: decodedLink }} style={styles.webView} />
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
          }}
        >
          <View
            style={{
              borderWidth: 1,
              borderColor: "red",
              borderStyle: "dashed",
              padding: 10,
              borderRadius: 10,
              width: "80%",
              alignSelf: "center",
            }}
          >
            <Text style={styles.errorText}>
              Invalid URL. Please provide a valid web link.
            </Text>
            <TouchableOpacity onPress={() => navigate.goBack()}>
              <Text
                style={{
                  textAlign: "center",
                  color: "blue",
                  textDecorationLine: "underline",
                }}
              >
                go back
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webView: {
    flex: 1,
  },
  errorText: {
    textAlign: "center",
    padding: 10,
    color: "red",
  },
});
