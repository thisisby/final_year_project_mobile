import CloseSquareIcon from "@/components/ui/icons/CloseSquareIcon";
import HeartBoldIcon from "@/components/ui/icons/HeartBoldIcon";
import HeartLinearIcon from "@/components/ui/icons/HeartLinearIcon";
import {
  useCopyWorkout,
  useGetWorkoutByID,
  useLikeWorkout,
  usePurchaseWorkout,
} from "@/hooks/useWorkouts";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Switch,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  Alert,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Page() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();

  const [cardPAN, setCardPAN] = useState("");
  const [cardCVV, setCardCVV] = useState("");
  const [cardExpiryYear, setCardExpiryYear] = useState("");
  const [cardExpiryMonth, setCardExpiryMonth] = useState("");

  const { purchaseWorkout, isLoading } = usePurchaseWorkout();

  const handlePurchase = async () => {
    if (!cardPAN || !cardCVV || !cardExpiryMonth || !cardExpiryYear) {
      alert("Please fill in all fields.");
      return;
    }
    const data = await purchaseWorkout({
      workout_id: Number(id),
      card_number: cardPAN,
      card_cvv: cardCVV,
      card_expiry_month: cardExpiryMonth,
      card_expiry_year: cardExpiryYear,
    });

    if (data?.success) {
      Alert.alert(
        "Success",
        "Purchase successful! You can now access the workout.",
        [
          {
            text: "OK",
            onPress: async () => {
              navigation.goBack();
            },
          },
        ]
      );
    } else {
      alert("Purchase failed. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        extraScrollHeight={120}
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled"
      >
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 100,
          }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <CloseSquareIcon width={34} height={34} />
            </TouchableOpacity>

            <View>
              <Text style={styles.headerHeading}>Purchase</Text>
            </View>
          </View>

          {/* <Text
            style={{
              fontWeight: 800,
              fontSize: 20,
              marginBottom: 0,
              textAlign: "center",
              marginTop: 20,
              color: "#db2777",
            }}
          >
            Coming soon! {"\n"} This feature is not yet available. Please check
            back later.
          </Text> */}

          <View
            style={{
              marginBottom: 10,
              borderRadius: 10,
              padding: 10,
              flexDirection: "column",
            }}
          >
            <View style={{ marginTop: 4 }}>
              <Text
                style={{
                  fontWeight: 800,
                  fontSize: 14,
                  marginBottom: 10,
                }}
              >
                Card Number
              </Text>
              <View>
                <TextInput
                  style={{
                    width: "100%",
                    backgroundColor: "#F6F6F6",
                    padding: 14,
                    borderRadius: 8,
                    marginBottom: 12,
                  }}
                  placeholderTextColor="#999999"
                  placeholder="Enter your card PAN"
                  value={cardPAN}
                  onChangeText={setCardPAN}
                  autoComplete="name"
                />
              </View>
            </View>
            <View style={{ marginTop: 4 }}>
              <Text
                style={{
                  fontWeight: 800,
                  fontSize: 14,
                  marginBottom: 10,
                }}
              >
                Card CVV
              </Text>
              <View>
                <TextInput
                  style={{
                    width: "100%",
                    backgroundColor: "#F6F6F6",
                    padding: 14,
                    borderRadius: 8,
                    marginBottom: 12,
                  }}
                  placeholderTextColor="#999999"
                  placeholder="Enter your card CVV"
                  value={cardCVV}
                  onChangeText={setCardCVV}
                />
              </View>
            </View>

            <View style={{ marginTop: 4 }}>
              <Text
                style={{
                  fontWeight: 800,
                  fontSize: 14,
                  marginBottom: 10,
                }}
              >
                Card Expiry Month
              </Text>
              <View>
                <TextInput
                  style={{
                    width: "100%",
                    backgroundColor: "#F6F6F6",
                    padding: 14,
                    borderRadius: 8,
                    marginBottom: 12,
                  }}
                  placeholderTextColor="#999999"
                  placeholder="Enter your card Expiry Month"
                  value={cardExpiryMonth}
                  onChangeText={setCardExpiryMonth}
                />
              </View>
            </View>

            <View style={{ marginTop: 4 }}>
              <Text
                style={{
                  fontWeight: 800,
                  fontSize: 14,
                  marginBottom: 10,
                }}
              >
                Card Expiry Year
              </Text>
              <View>
                <TextInput
                  style={{
                    width: "100%",
                    backgroundColor: "#F6F6F6",
                    padding: 14,
                    borderRadius: 8,
                    marginBottom: 12,
                  }}
                  placeholderTextColor="#999999"
                  placeholder="Enter your card Expiry Year"
                  value={cardExpiryYear}
                  onChangeText={setCardExpiryYear}
                  autoComplete="name"
                />
              </View>
            </View>

            <TouchableOpacity
              style={{
                backgroundColor: "#000",
                padding: 10,
                paddingVertical: 18,
                borderRadius: 8,
                width: "100%",
                marginTop: 12,
              }}
              onPress={() => {
                handlePurchase();
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "bold",
                  textAlign: "center",
                  color: "#fff",
                }}
              >
                {isLoading ? "Loading..." : "Purchase"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    position: "relative",
  },
  overlay: {
    position: "absolute",
    top: 40,
    right: 0,
    left: 0,
    bottom: 0,
    zIndex: 999,
  },
  dropdown: {
    position: "absolute",
    right: 0,
    top: 70,
    width: "50%",
    backgroundColor: "#1f1f1f",
    borderRadius: 10,
    zIndex: 999,
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    backgroundColor: "#1f1f1f",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    marginBottom: 20,
    marginTop: 20,
    position: "relative",
  },
  headerTitle: { fontSize: 18, fontWeight: "bold" },
  section: {
    backgroundColor: "#F7F8FA",
    borderRadius: 5,
    marginHorizontal: 16,
    padding: 10,
    marginVertical: 10,
  },
  section2: {
    backgroundColor: "#F7F8FA",
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 10,
  },
  card2: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  lastCard: {
    borderBottomWidth: 0,
  },
  sectionCard: {
    borderRadius: 12,
    marginTop: 20,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 16,
    marginTop: 20,
  },
  listItem: { fontSize: 16, paddingVertical: 8 },
  greenText: { color: "white" },
  card3: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    backgroundColor: "#f8f9f9",
    borderRadius: 10,
    marginBottom: 6,
  },
  cardIcon: { marginRight: 10 },
  cardIcon2: {
    marginRight: 10,
    padding: 5,
    backgroundColor: "#f2f3f8",
    borderRadius: 8,
  },
  cardContent: {},
  cardTitle: { fontSize: 14, fontWeight: "bold" },
  cardDescription: { fontSize: 12, color: "#666", marginTop: 4 },
  cardCount: { fontSize: 16, fontWeight: "bold", color: "#777" },
  templatesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 16,
  },
  templateCard: {
    width: "48%",
    backgroundColor: "#F7F8FA",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  templateTitle: { fontSize: 16, marginBottom: 4 },
  templateExercises: { fontSize: 14, color: "#666" },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    backgroundColor: "white",
    paddingVertical: 10,
  },
  navItem: { alignItems: "center" },
  navText: { fontSize: 12, color: "gray", marginTop: 4 },
  habbit: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    gap: 10,
    marginBottom: 20,
  },
  habbitItem: {
    display: "flex",
    flex: 1,
    gap: 10,
  },
  card: {
    backgroundColor: "#ced4da",
    borderRadius: 10,
    padding: 14,
  },
  headerHeading: {
    fontWeight: 900,
    fontSize: 18,
    textTransform: "uppercase",
  },
  headerName: {
    color: "#898989",
    textAlign: "center",
    fontSize: 12,
  },
});
