import Heading from "@/components/ui/Heading";
import ArrowSquareLeftIcon from "@/components/ui/icons/ArrowSquareLeftIcon";
import SettingLinearIcon from "@/components/ui/icons/SettingLinearIcon";
import { useDeleteSession, useGetSessionByID } from "@/hooks/useSessions";
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
  ActivityIndicator,
  TouchableWithoutFeedback,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import React from "react";
import { useSessionDetailsStore } from "@/store/sessionDetailsStore";
import { useGetSessionDetails } from "@/hooks/useSessionDetail";
import { SessionDetails } from "@/services/sessionDetailsService";
import CloseSquareIcon from "@/components/ui/icons/CloseSquareIcon";
import TrashLinearIcon from "@/components/ui/icons/TrashLinearIcon";

export default function Page() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const router = useRouter();

  const { session, isLoading: isLoadingSession } = useGetSessionByID(
    Number(id)
  );
  const { sessionDetails, isLoading: isLoadingSessionDetails } =
    useGetSessionDetails(Number(id));

  const [isStartDatePickerVisible, setStartDatePickerVisibility] =
    useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
  const [isStartTimePickerVisible, setStartTimePickerVisibility] =
    useState(false);
  const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);

  const {
    startDate,
    startTime,
    endDate,
    endTime,
    notes,
    setStartDate,
    setStartTime,
    setEndDate,
    setEndTime,
    setNotes,
  } = useSessionDetailsStore();

  useEffect(() => {
    if (session) {
      setStartDate(new Date(session.payload.start_time));
      setStartTime(new Date(session.payload.start_time));
      setEndDate(new Date(session.payload.end_time));
      setEndTime(new Date(session.payload.end_time));
      setNotes(session.payload.notes);
    }
  }, [session]);

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

  const [isDropdownVisible, setIsDropdownVisible] = useState(false); // State to track dropdown visibility

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleClose = () => {
    setIsDropdownVisible(false);
  };

  const { deleteSession, isLoading: isDeleteLoading } = useDeleteSession(
    Number(id)
  );

  const handleDelete = async (id: number) => {
    await deleteSession(id);
    navigation.goBack();
  };

  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: 130,
      }}
      style={styles.container}
    >
      {isLoadingSession && (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}

      {!isLoadingSession && (
        <>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <ArrowSquareLeftIcon width={34} height={34} />
            </TouchableOpacity>

            <View>
              <Text style={styles.headerHeading}>Session</Text>
            </View>
            <View>
              <TouchableOpacity onPress={toggleDropdown}>
                {isDropdownVisible ? (
                  <CloseSquareIcon width={34} height={34} />
                ) : (
                  <SettingLinearIcon width={34} height={34} />
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
                        style={[
                          styles.cardIcon2,
                          { backgroundColor: "#1f1f1f" },
                        ]}
                      >
                        {isDeleteLoading ? (
                          <ActivityIndicator size="small" color="#fff" />
                        ) : (
                          <TrashLinearIcon
                            width={23}
                            height={23}
                            color="#fff"
                          />
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
                <Text>{session?.payload.activity.name}</Text>
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
            {sessionDetails?.payload.map((detail, idx) => (
              <View
                key={idx}
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
                  {detail.name}
                </Text>

                <Text>{detail.value}</Text>
              </View>
            ))}

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
        </>
      )}
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
    fontWeight: 900,
    fontSize: 18,
    textTransform: "uppercase",
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
