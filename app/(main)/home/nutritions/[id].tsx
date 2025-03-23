import Heading from "@/components/ui/Heading";
import ArrowSquareLeftIcon from "@/components/ui/icons/ArrowSquareLeftIcon";
import SettingLinearIcon from "@/components/ui/icons/SettingLinearIcon";
import { useDeleteNutrition, useGetNutritionByID } from "@/hooks/useNutritions";
import { useNutritionStore } from "@/store/nutritionStore";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import CloseSquareIcon from "@/components/ui/icons/CloseSquareIcon";
import TrashLinearIcon from "@/components/ui/icons/TrashLinearIcon";
export default function Page() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const router = useRouter();

  const { nutrition, isLoading: isLoadingNutrition } = useGetNutritionByID(
    Number(id)
  );

  const { name, value, createdAt, setName, setValue, setCreatedAt } =
    useNutritionStore();

  useEffect(() => {
    if (nutrition) {
      setName(nutrition.name);
      setValue(nutrition.value);
      setCreatedAt(new Date(nutrition.created_at));
    }
  }, [nutrition]);

  const [isStartDatePickerVisible, setStartDatePickerVisibility] =
    useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
  const [isStartTimePickerVisible, setStartTimePickerVisibility] =
    useState(false);
  const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);

  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [startTime, setStartTime] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [endTime, setEndTime] = useState<Date | null>(new Date());

  const showDatePicker = (type: "start" | "end") => {
    if (type === "start") {
      setStartDatePickerVisibility(true);
    } else {
      setEndDatePickerVisibility(true);
    }
  };

  const hideDatePicker = (type: "start" | "end") => {
    if (type === "start") {
      setStartDatePickerVisibility(false);
    } else {
      setEndDatePickerVisibility(false);
    }
  };

  const showTimePicker = (type: "start" | "end") => {
    if (type === "start") {
      setStartTimePickerVisibility(true);
    } else {
      setEndTimePickerVisibility(true);
    }
  };

  const hideTimePicker = (type: "start" | "end") => {
    if (type === "start") {
      setStartTimePickerVisibility(false);
    } else {
      setEndTimePickerVisibility(false);
    }
  };

  const handleConfirmDate = (date: Date, type: "start" | "end") => {
    if (type === "start") {
      setStartDate(date);
      hideDatePicker("start");
      setCreatedAt(date);
    } else {
      setEndDate(date);
      hideDatePicker("end");
      setCreatedAt(date);
    }
  };

  const handleConfirmTime = (time: Date, type: "start" | "end") => {
    if (type === "start") {
      setStartTime(time);
      hideTimePicker("start");
    } else {
      setEndTime(time);
      hideTimePicker("end");
    }
  };

  const formatDate = (date: Date | null) => {
    return date
      ? date.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      : "None";
  };

  const [isDropdownVisible, setIsDropdownVisible] = useState(false); // State to track dropdown visibility

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleClose = () => {
    setIsDropdownVisible(false);
  };

  const { deleteNutrition, isLoading: isDeleteLoading } = useDeleteNutrition(
    Number(id)
  );

  const handleDelete = async (id: number) => {
    await deleteNutrition(id);
    navigation.goBack();
  };

  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: 130,
      }}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowSquareLeftIcon width={30} height={30} />
        </TouchableOpacity>

        <View>
          <Text style={styles.headerHeading}>Session</Text>
        </View>
        <View>
          <TouchableOpacity onPress={toggleDropdown}>
            {isDropdownVisible ? (
              <CloseSquareIcon width={30} height={30} />
            ) : (
              <SettingLinearIcon width={30} height={30} />
            )}
          </TouchableOpacity>
        </View>
      </View>
      {isDropdownVisible && (
        <View
          style={{
            flex: 1,
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999,
          }}
        >
          <TouchableWithoutFeedback onPress={handleClose}>
            <View
              style={{
                flex: 1,
                position: "relative",
              }}
            >
              <View style={[styles.dropdown]}>
                <TouchableOpacity
                  style={[
                    styles.dropdownItem,
                    {
                      borderRadius: 10,
                    },
                  ]}
                  onPress={() => handleDelete(Number(id))}
                >
                  <View
                    style={[styles.cardIcon2, { backgroundColor: "#1f1f1f" }]}
                  >
                    {isDeleteLoading ? (
                      <ActivityIndicator size="small" color="#fff" />
                    ) : (
                      <TrashLinearIcon width={23} height={23} color="#fff" />
                    )}
                  </View>
                  <View style={styles.cardContent}>
                    <Text
                      style={[
                        styles.cardTitle,
                        { color: "#fff", fontWeight: "500" },
                      ]}
                    >
                      Delete
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      )}

      <View style={{ marginTop: 30 }}>
        <View>
          <Text
            style={{
              marginBottom: 4,
              fontWeight: "bold",
            }}
          >
            Name
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Notes"
            placeholderTextColor="#999999"
            value={name}
            onChangeText={setName}
            autoCapitalize="none"
            multiline
          />

          <Text
            style={{
              marginBottom: 4,
              fontWeight: "bold",
              marginTop: 10,
            }}
          >
            Value
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Notes"
            placeholderTextColor="#999999"
            value={value}
            onChangeText={setValue}
            autoCapitalize="none"
            multiline
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <View
            style={{
              borderRadius: 8,
              borderWidth: 1,
              borderColor: "#efefef",
              marginTop: 8,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 8,
              }}
            >
              <Text>Date</Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 10,
                }}
              >
                <TouchableOpacity
                  style={{
                    paddingVertical: 6,
                    paddingHorizontal: 8,
                    backgroundColor: "#f1f1f1",
                    borderRadius: 6,
                  }}
                  onPress={() => showDatePicker("start")}
                >
                  <Text>{formatDate(createdAt)}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Date and Time Pickers */}
      <DateTimePickerModal
        mode="date"
        date={createdAt || new Date()}
        isVisible={isStartDatePickerVisible}
        onConfirm={(date) => handleConfirmDate(date, "start")}
        onCancel={() => hideDatePicker("start")}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
  },
  header: {
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    marginBottom: 10,
    marginTop: 10,
  },
  headerHeading: {
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
  },
  input: {
    width: "100%",
    backgroundColor: "#F6F6F6",
    padding: 14,
    borderRadius: 8,
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
  cardIcon: { marginRight: 10 },
  cardIcon2: {
    marginRight: 10,
    padding: 5,
    backgroundColor: "#f2f3f8",
    borderRadius: 8,
  },
  cardContent: {},
  cardTitle: { fontSize: 14, fontWeight: "bold" },
});
