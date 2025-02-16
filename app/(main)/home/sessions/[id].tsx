import Heading from "@/components/ui/Heading";
import ArrowSquareLeftIcon from "@/components/ui/icons/ArrowSquareLeftIcon";
import SettingLinearIcon from "@/components/ui/icons/SettingLinearIcon";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function Page() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const router = useRouter();

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
  const [notes, setNotes] = useState(
    "It was a good session. I felt great after it."
  );

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
    } else {
      setEndDate(date);
      hideDatePicker("end");
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

  const formatTime = (time: Date | null) => {
    return time
      ? time.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      : "None";
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
          <TouchableOpacity>
            <SettingLinearIcon width={30} height={30} />
          </TouchableOpacity>
        </View>
      </View>

      <View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 8,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "#efefef",
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
            }}
          >
            Activity Type
          </Text>
          <TouchableOpacity
            style={{
              padding: 8,
              backgroundColor: "#f1f1f1",
              borderRadius: 8,
            }}
            onPress={() => router.push(`/modal/change-session-type/${id}`)}
          >
            <Text>Strength Training</Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 20 }}>
          {/* <Heading level={2} style={{ fontSize: 16 }}>
            Details
          </Heading> */}
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
                borderBottomWidth: 1,
                borderColor: "#efefef",
              }}
            >
              <Text>Starts</Text>
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
                  <Text>{formatDate(startDate)}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    paddingVertical: 6,
                    paddingHorizontal: 8,
                    backgroundColor: "#f1f1f1",
                    borderRadius: 6,
                  }}
                  onPress={() => showTimePicker("start")}
                >
                  <Text>{formatTime(startTime)}</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 8,
              }}
            >
              <Text>Ends</Text>
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
                  onPress={() => showDatePicker("end")}
                >
                  <Text>{formatDate(endDate)}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    paddingVertical: 6,
                    paddingHorizontal: 8,
                    backgroundColor: "#f1f1f1",
                    borderRadius: 6,
                  }}
                  onPress={() => showTimePicker("end")}
                >
                  <Text>{formatTime(endTime)}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Date and Time Pickers */}
      <DateTimePickerModal
        isVisible={isStartDatePickerVisible || isEndDatePickerVisible}
        mode="date"
        onConfirm={(date) =>
          isStartDatePickerVisible
            ? handleConfirmDate(date, "start")
            : handleConfirmDate(date, "end")
        }
        onCancel={() =>
          isStartDatePickerVisible
            ? hideDatePicker("start")
            : hideDatePicker("end")
        }
      />

      <DateTimePickerModal
        isVisible={isStartTimePickerVisible || isEndTimePickerVisible}
        mode="time"
        onConfirm={(time) =>
          isStartTimePickerVisible
            ? handleConfirmTime(time, "start")
            : handleConfirmTime(time, "end")
        }
        onCancel={() =>
          isStartTimePickerVisible
            ? hideTimePicker("start")
            : hideTimePicker("end")
        }
        locale="en_GB"
        is24Hour
      />

      <View style={{ marginTop: 30 }}>
        <TextInput
          style={styles.input}
          placeholder="Notes"
          placeholderTextColor="#999999"
          value={notes}
          onChangeText={setNotes}
          autoCapitalize="none"
          multiline
        />
      </View>

      <View style={{ marginTop: 30 }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 8,
            paddingVertical: 12,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: "#efefef",
            marginBottom: 6,
          }}
        >
          <Text
            style={{
              fontWeight: 500,
            }}
          >
            Incline Level
          </Text>

          <Text>3</Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 8,
            paddingVertical: 12,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: "#efefef",
          }}
        >
          <Text
            style={{
              fontWeight: 500,
            }}
          >
            Speed Level
          </Text>

          <Text>Medium</Text>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: "#1f1f1f",
            padding: 14,
            width: "100%",
            borderRadius: 8,
            alignItems: "center",
            marginTop: 20,
          }}
          onPress={() => router.push(`/modal/add-session-detail/${id}`)}
        >
          <Text style={{ textAlign: "center", color: "#fff" }}>
            Add Custom Details
          </Text>
        </TouchableOpacity>
      </View>
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
});
