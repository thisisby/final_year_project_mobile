import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { WebView } from "react-native-webview";

export default function Page() {
  const { name } = useLocalSearchParams();

  const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(
    name as string
  )}`;
  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: searchUrl }} // Load the search results in a WebView
        style={styles.webView}
      />
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
});
