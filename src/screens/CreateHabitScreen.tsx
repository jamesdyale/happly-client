import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import React, { useEffect, useState } from "react";
import { CustomButton, CustomTextInput, DayPicker } from "~components";
import Icon from "react-native-vector-icons/Ionicons";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Frequency, HabitType, TimeOfDay, User } from "~types";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { editHabitAtom, selectedDayOfTheWeekAtom, userAtom } from "~state";
import {
  ActionCreateHabit,
  ActionCreateOrUpdateStreak,
  ActionCreateReminders,
  ActionDeleteReminder,
  ActionGetUserByUID,
  ActionUpdateUser
} from "~actions";
import { useToast } from "react-native-toast-notifications";
import moment from "moment/moment";
import { generateHabitId } from "~generators";
import { NotificationModal } from "~modals";
import { getData, horizontalScale, moderateScale, useMetric, verticalScale } from "~utils";
import { useTheme } from "~hooks";
import { ASYNC_STORAGE_KEYS } from "~constants";
import { registerForPushNotificationsAsync } from "~services";

export const CreateHabitScreen = () => {
  const toast = useToast();
  const { theme } = useTheme();
  const { horizontalScale, verticalScale, moderateScale } = useMetric();

  const user = useAtomValue(userAtom);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [editHabit, setEditHabit] = useAtom(editHabitAtom);
  const setSelectedDay = useSetAtom(selectedDayOfTheWeekAtom);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [timeOfDay, setTimeOfDay] = useState(TimeOfDay.Morning);
  const [frequencyOption, setFrequencyOption] = useState<Frequency>(Frequency.Daily);
  const [reminderAt, setReminderAt] = useState<string[]>([]);

  const [nameError, setNameError] = useState("");
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editHabit) {
      setName(editHabit.name);
      setDescription(editHabit.description);
      setTimeOfDay(editHabit.timeOfDay);
      setSelectedDays(editHabit.selectedDays);
      setFrequencyOption(editHabit.frequencyOption);
      setReminderAt(editHabit.reminderAt);
    }
  }, [editHabit]);

  const createHabit = async () => {
    setLoading(true);

    if (!name) {
      setNameError("Please enter a name");
      setLoading(false);
      return;
    }

    if (!editHabit) {
      const habit = await ActionCreateHabit({
        id: generateHabitId(),
        name,
        description,
        userId: user.id,
        timeOfDay,
        selectedDays,
        frequencyOption,
        createdAt: moment().format("MMMM Do YYYY"),
        reminderAt,
        type: HabitType.REGULAR
      });

      await ActionCreateReminders({
        reminderAt,
        habitId: habit.id,
        userId: user.id,
        isDaily: frequencyOption === Frequency.Daily,
        daysOfWeek: selectedDays
      });

      if (!habit) {
        toast.show("Something went wrong", {
          type: "danger",
          duration: 4000,
          placement: "bottom",
          icon: <Icon name='alert-circle-sharp' size={moderateScale(20)} color={theme.APP_WHITE} />
        });
        return;
      }

      await ActionCreateOrUpdateStreak(habit.id, habit.userId);

      toast.show("Habit created successfully", {
        type: "success",
        duration: 4000,
        placement: "bottom",
        icon: (
          <Icon name='checkmark-circle-sharp' size={moderateScale(20)} color={theme.APP_WHITE} />
        )
      });
    } else {
      await ActionCreateHabit({
        id: editHabit.id,
        name,
        description,
        userId: user.id,
        timeOfDay,
        selectedDays,
        frequencyOption,
        createdAt: editHabit?.createdAt,
        reminderAt,
        type: HabitType.REGULAR
      });

      // figure out how I want to handle reminder updates
      // check if there are any new reminders and create them or delete all the previous reminders
      // and create new ones
      ActionDeleteReminder({
        habitId: editHabit.id
      }).then(async () => {
        await ActionCreateReminders({
          reminderAt,
          habitId: editHabit.id,
          userId: user.id,
          isDaily: frequencyOption === Frequency.Daily,
          daysOfWeek: selectedDays
        });
      });

      setEditHabit(null);
      toast.show("Habit saved!", {
        type: "success",
        duration: 4000,
        placement: "bottom",
        icon: (
          <Icon name='checkmark-circle-sharp' size={moderateScale(20)} color={theme.APP_WHITE} />
        )
      });
    }

    clearStates();
    setSelectedDay(moment().format("MMMM Do YYYY"));
    setLoading(false);
    navigation.goBack();
  };

  const clearStates = () => {
    setName("");
    setDescription("");
    setTimeOfDay(TimeOfDay.Morning);
    setSelectedDays([]);
    setFrequencyOption(Frequency.Daily);
    setNameError("");
  };

  const handleTimeSelected = (selectedDate: Date) => {
    const formattedDate = moment(selectedDate).format("YYYY-MM-DDTHH:mm:ss");

    const doesExist = reminderAt.includes(formattedDate);

    if (!doesExist) {
      setReminderAt([...reminderAt, formattedDate]);
    } else {
      Alert.alert("Time has been previously selected");
    }
    setShowNotificationModal(false);
  };

  const removeReminder = async (reminder: string) => {
    const filtered = reminderAt.filter((item) => item !== reminder);
    setReminderAt(filtered);
  };

  const handleSelectDay = (day: string) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
      return;
    }

    setSelectedDays([...selectedDays, day]);
  };

  const checkIfUserHasEnabledPushNotification = async () => {
    const token = await getData(ASYNC_STORAGE_KEYS.PUSH_TOKEN);

    if (token) {
      setShowNotificationModal(true);
      checkIfUserHasPushTokenPresentAndSaveIfNot(token);
    } else {
      registerForPushNotificationsAsync().then((token) => {
        if (token) {
          setShowNotificationModal(true);
          checkIfUserHasPushTokenPresentAndSaveIfNot(token);
        } else {
          Alert.alert("Please enable push notifications in your settings");
        }
      });
    }
  };

  const checkIfUserHasPushTokenPresentAndSaveIfNot = async (token) => {
    const userResponse = await ActionGetUserByUID(user.id);

    if (userResponse) {
      const user = userResponse.data() as User;

      if (user.pushToken === "") {
        const newUser: User = {
          ...user,
          pushToken: token
        };

        await ActionUpdateUser(newUser);
      }
    }
  };

  return (
    <>
      <SafeAreaView style={[styles.wrapper, { backgroundColor: theme.MAIN_BG_COLOR }]}>
        <ScrollView style={{ marginBottom: verticalScale(10) }}>
          <View
            style={[
              styles.container,
              {
                paddingVertical: verticalScale(20),
                paddingHorizontal: horizontalScale(20)
              }
            ]}
          >
            <View
              style={[
                styles.header,
                {
                  marginBottom: verticalScale(20)
                }
              ]}
            >
              <TouchableOpacity
                style={[
                  styles.closeButton,
                  {
                    backgroundColor: theme.APP_PINK,
                    marginRight: horizontalScale(40),
                    borderRadius: moderateScale(6),
                    width: horizontalScale(40),
                    height: verticalScale(40)
                  }
                ]}
                onPress={() => {
                  setEditHabit(null);
                  navigation.goBack();
                }}
              >
                <Icon name='close' size={moderateScale(25)} color={theme.APP_RED} />
              </TouchableOpacity>
              <Text
                style={[
                  styles.headerText,
                  {
                    color: theme.MAIN_TEXT_COLOR,
                    fontSize: moderateScale(30),
                    lineHeight: verticalScale(36)
                  }
                ]}
              >
                New <Text style={[styles.headerText, { color: "#9D9797" }]}> Habit</Text>
              </Text>
            </View>
            <View>
              <CustomTextInput
                bigLabel='Name'
                placeholder='Enter the name'
                handleChange={setName}
                // handleBlur={() =>
                //   setNameError(formValidationOnBlur("name", name))
                // }
                value={name}
                error={nameError}
              />
              <CustomTextInput
                bigLabel='Description'
                placeholder='Enter the description'
                handleChange={setDescription}
                value={description}
              />
              <View
                style={[
                  styles.sectionContainer,
                  {
                    marginBottom: verticalScale(20)
                  }
                ]}
              >
                <Text
                  style={[
                    styles.sectionTitle,
                    {
                      color: theme.MAIN_TEXT_COLOR,
                      fontSize: moderateScale(18),
                      lineHeight: verticalScale(22),
                      marginBottom: verticalScale(10)
                    }
                  ]}
                >
                  How often do you want to do it?
                </Text>
                <View
                  style={[
                    styles.frequencyOptions,
                    {
                      borderRadius: moderateScale(6),
                      height: verticalScale(40)
                    }
                  ]}
                >
                  <TouchableOpacity
                    style={[
                      styles.frequencyOption,
                      {
                        marginRight: horizontalScale(15),
                        backgroundColor:
                          frequencyOption === Frequency.Daily
                            ? theme.MAIN_TEXT_COLOR
                            : theme.DISABLED_BUTTON_COLOR,
                        borderRadius: moderateScale(6)
                      }
                    ]}
                    onPress={() => setFrequencyOption(Frequency.Daily)}
                  >
                    <Text
                      style={[
                        styles.frequencyOptionTitle,
                        {
                          color:
                            frequencyOption === Frequency.Daily
                              ? theme.CONTRAST_MAIN_TEXT_COLOR
                              : theme.MAIN_TEXT_COLOR,
                          fontSize: moderateScale(14),
                          lineHeight: verticalScale(22)
                        }
                      ]}
                    >
                      Daily
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.frequencyOption,
                      {
                        backgroundColor:
                          frequencyOption === Frequency.Weekly
                            ? theme.MAIN_TEXT_COLOR
                            : theme.DISABLED_BUTTON_COLOR,
                        borderRadius: moderateScale(6)
                      }
                    ]}
                    onPress={() => setFrequencyOption(Frequency.Weekly)}
                  >
                    <Text
                      style={[
                        styles.frequencyOptionTitle,
                        {
                          color:
                            frequencyOption === Frequency.Weekly
                              ? theme.CONTRAST_MAIN_TEXT_COLOR
                              : theme.MAIN_TEXT_COLOR,
                          fontSize: moderateScale(14),
                          lineHeight: verticalScale(22)
                        }
                      ]}
                    >
                      Weekly
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {frequencyOption === Frequency.Weekly ? (
                <View
                  style={[
                    styles.sectionContainer,
                    {
                      marginBottom: verticalScale(20)
                    }
                  ]}
                >
                  <Text
                    style={[
                      styles.sectionTitle,
                      {
                        color: theme.MAIN_TEXT_COLOR,
                        fontSize: moderateScale(18),
                        lineHeight: verticalScale(22),
                        marginBottom: verticalScale(10)
                      }
                    ]}
                  >
                    Every?
                  </Text>
                  <DayPicker selectedDays={selectedDays} handleSelectDay={handleSelectDay} />
                </View>
              ) : null}

              <View
                style={[
                  styles.sectionContainer,
                  {
                    marginBottom: verticalScale(20)
                  }
                ]}
              >
                <Text
                  style={[
                    styles.sectionTitle,
                    {
                      color: theme.MAIN_TEXT_COLOR,
                      fontSize: moderateScale(18),
                      lineHeight: verticalScale(22),
                      marginBottom: verticalScale(10)
                    }
                  ]}
                >
                  In which time of the day would you like to do it?
                </Text>
                <View
                  style={[
                    styles.periodContainer,
                    {
                      marginBottom: verticalScale(20)
                    }
                  ]}
                >
                  <TouchableOpacity
                    style={[
                      styles.periodOption,
                      {
                        backgroundColor:
                          timeOfDay === TimeOfDay.Morning ? theme.APP_BLUE : theme.APP_GRAY,
                        marginRight: horizontalScale(15),
                        borderRadius: moderateScale(10),
                        height: verticalScale(40)
                      }
                    ]}
                    onPress={() => setTimeOfDay(TimeOfDay.Morning)}
                  >
                    <Image
                      style={{
                        width: horizontalScale(15),
                        height: verticalScale(15),
                        marginRight: horizontalScale(8)
                      }}
                      source={require("../../assets/svgs/sunrise1.png")}
                    />
                    <Text
                      style={[
                        styles.periodOptionTitle,
                        {
                          color:
                            timeOfDay === TimeOfDay.Morning ? theme.APP_WHITE : theme.APP_BLACK,
                          fontSize: moderateScale(14),
                          lineHeight: verticalScale(22)
                        }
                      ]}
                    >
                      Morning
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.periodOption,
                      {
                        marginRight: horizontalScale(15),
                        backgroundColor:
                          timeOfDay === TimeOfDay.Afternoon ? theme.APP_BLUE : theme.APP_GRAY,
                        borderRadius: moderateScale(10),
                        height: verticalScale(40)
                      }
                    ]}
                    onPress={() => setTimeOfDay(TimeOfDay.Afternoon)}
                  >
                    <Image
                      style={{
                        width: horizontalScale(15),
                        height: verticalScale(15),
                        marginRight: horizontalScale(8)
                      }}
                      source={require("../../assets/svgs/sun1.png")}
                    />
                    <Text
                      style={[
                        styles.periodOptionTitle,
                        {
                          color:
                            timeOfDay === TimeOfDay.Afternoon ? theme.APP_WHITE : theme.APP_BLACK,
                          fontSize: moderateScale(14),
                          lineHeight: verticalScale(22)
                        }
                      ]}
                    >
                      Afternoon
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.periodOption,
                      {
                        backgroundColor:
                          timeOfDay === TimeOfDay.Evening ? theme.APP_BLUE : theme.APP_GRAY,
                        borderRadius: moderateScale(10),
                        height: verticalScale(40)
                      }
                    ]}
                    onPress={() => setTimeOfDay(TimeOfDay.Evening)}
                  >
                    <Image
                      style={{
                        width: horizontalScale(15),
                        height: verticalScale(15),
                        marginRight: horizontalScale(8)
                      }}
                      source={require("../../assets/svgs/crescent-moon1.png")}
                    />
                    <Text
                      style={[
                        styles.periodOptionTitle,
                        {
                          color:
                            timeOfDay === TimeOfDay.Evening ? theme.APP_WHITE : theme.APP_BLACK,
                          fontSize: moderateScale(14),
                          lineHeight: verticalScale(22),
                          borderRadius: moderateScale(10)
                        }
                      ]}
                    >
                      Evening
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View
                style={[
                  styles.sectionContainer,
                  {
                    marginBottom: verticalScale(20)
                  }
                ]}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: verticalScale(10)
                  }}
                >
                  <Text
                    style={[
                      styles.sectionTitle,
                      {
                        color: theme.MAIN_TEXT_COLOR,
                        fontSize: moderateScale(18),
                        lineHeight: verticalScale(22),
                        marginBottom: verticalScale(10)
                      }
                    ]}
                  >
                    Should we remind you?
                  </Text>
                </View>

                <View style={styles.reminderContainer}>
                  <View
                    style={[
                      styles.reminderTimeContainer,
                      {
                        backgroundColor: theme.APP_GRAY,
                        borderTopRightRadius: moderateScale(6),
                        borderTopLeftRadius: moderateScale(6)
                      }
                    ]}
                  >
                    {reminderAt.map((reminder, index) => (
                      <View
                        key={index}
                        style={[
                          styles.reminderWrapper,
                          {
                            borderBottomColor: theme.APP_LIGHT_GRAY,
                            borderBottomWidth: moderateScale(1),
                            paddingHorizontal: horizontalScale(10)
                          }
                        ]}
                      >
                        <View
                          style={[
                            styles.reminderTextContainer,
                            {
                              paddingVertical: verticalScale(10)
                            }
                          ]}
                        >
                          <Icon
                            name='alarm-outline'
                            size={moderateScale(20)}
                            color={theme.APP_BLACK}
                            style={{ marginRight: horizontalScale(5) }}
                          />
                          <Text
                            style={[
                              styles.reminderText,
                              {
                                color: theme.APP_BLACK,
                                fontSize: moderateScale(16),
                                lineHeight: verticalScale(19),
                                marginLeft: horizontalScale(5)
                              }
                            ]}
                          >
                            {moment(reminder).format("h:mm a")}
                          </Text>
                        </View>
                        <TouchableOpacity onPress={() => removeReminder(reminder)}>
                          <Icon
                            name='ios-close-circle-outline'
                            size={moderateScale(20)}
                            color={theme.APP_BLACK}
                          />
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>

                  <TouchableOpacity
                    style={[
                      styles.reminderTime,
                      {
                        backgroundColor: theme.APP_GRAY,
                        borderBottomLeftRadius: moderateScale(6),
                        borderBottomRightRadius: moderateScale(6),
                        height: verticalScale(40),
                        paddingHorizontal: horizontalScale(10)
                      }
                    ]}
                    onPress={() => checkIfUserHasEnabledPushNotification()}
                  >
                    <Icon
                      name='ios-add-circle-sharp'
                      size={moderateScale(20)}
                      color={theme.APP_BLACK}
                      style={{ marginRight: horizontalScale(5) }}
                    />
                    <Text
                      style={[
                        styles.periodOptionTitle,
                        {
                          color: theme.GRAY_TEXT,
                          fontSize: moderateScale(14),
                          lineHeight: verticalScale(22)
                        }
                      ]}
                    >
                      {reminderAt.length < 1 ? "Add a reminder" : "Add another reminder"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <CustomButton
              bgColor={theme.MAIN_ACCENT_COLOR}
              color={theme.APP_WHITE}
              text={editHabit ? "SAVE" : "CREATE"}
              onClick={createHabit}
              disabled={loading}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
      {showNotificationModal && (
        <NotificationModal
          handleTimeSelected={handleTimeSelected}
          closeNotificationModal={() => setShowNotificationModal(false)}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  container: {},
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  closeButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  headerText: {
    fontFamily: "Inter_700Bold",
    display: "flex"
  },
  sectionContainer: {},
  sectionTitle: {
    fontFamily: "Inter_600SemiBold"
  },
  frequencyOptions: {
    display: "flex",
    flexDirection: "row"
  },
  frequencyOption: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  frequencyOptionTitle: {
    fontFamily: "Inter_600SemiBold"
  },
  everyOption: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  periodContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%"
  },
  periodOption: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  periodOptionTitle: {
    fontFamily: "Inter_600SemiBold",
    textAlign: "center",
    display: "flex"
  },
  reminderTimeContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%"
  },
  reminderWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  reminderTextContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "90%"
  },
  reminderText: {
    fontFamily: "Inter_400Regular"
  },
  reminderContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%"
  },
  reminderTime: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  }
});
