import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { CustomButton, CustomTextInput, DayPicker } from "~components";
import Icon from "react-native-vector-icons/Ionicons";
import { ParamListBase, useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Frequency, Habit, HabitType, TimeOfDay } from "~types";
import { useAtomValue, useSetAtom } from "jotai";
import { selectedDayOfTheWeekAtom, userAtom } from "~state";
import { ActionCreateHabit, ActionCreateOrUpdateStreak, ActionCreateReminders, ActionDeleteReminder, ActionGetHabitById } from "~actions";
import { useToast } from "react-native-toast-notifications";
import moment from "moment/moment";
import { generateHabitId } from "~generators";
import { NotificationModal } from "~modals";
import { secureStore, useMetric } from "~utils";
import { useTheme } from "~hooks";
import { Header } from "./components/Header";
import { HabitFrequencySection } from "./components/HabitFrequencySection";
import { TimeOfDaySection } from "./components/TimeOfDaySection";
import { ReminderSection } from "./components/ReminderSection";

export const CreateHabitScreen = () => {
  const toast = useToast();
  const { theme } = useTheme();
  const { horizontalScale, verticalScale, moderateScale } = useMetric();

  const user = useAtomValue(userAtom);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const setSelectedDay = useSetAtom(selectedDayOfTheWeekAtom);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [timeOfDay, setTimeOfDay] = useState(TimeOfDay.Morning);
  const [frequencyOption, setFrequencyOption] = useState<Frequency>(Frequency.Daily);
  const [reminderAt, setReminderAt] = useState<string[]>([]);

  const [nameError, setNameError] = useState("");
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const [editHabit, setEditHabit] = useState<Habit | null>(null);
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      getHabitId();

      return () => {
        // Do something when the screen is unfocused
        removeHabitId();
      };
    }, [])
  );

  const getHabitId = async () => {
    const habitId = await secureStore.getItem("EDIT_HABIT_ID");
    if (habitId) {
      const habitQuery = await ActionGetHabitById(habitId);

      if (habitQuery.exists) {
        const habit = habitQuery.data() as Habit;

        setEditHabit(habit);
        setName(habit.name);
        setDescription(habit.description);
        setTimeOfDay(habit.timeOfDay);
        setSelectedDays(habit.selectedDays);
        setFrequencyOption(habit.frequencyOption);
        setReminderAt(habit.reminderAt);
      }
    }
  };

  const removeHabitId = async () => {
    await secureStore.removeItem("EDIT_HABIT_ID");

    setEditHabit(null);
    setName("");
    setDescription("");
    setTimeOfDay(TimeOfDay.Morning);
    setSelectedDays([]);
    setFrequencyOption(Frequency.Daily);
    setReminderAt([]);
  };

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
        icon: <Icon name='checkmark-circle-sharp' size={moderateScale(20)} color={theme.APP_WHITE} />
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

      // // figure out how I want to handle reminder updates
      // // check if there are any new reminders and create them or delete all the previous reminders
      // // and create new ones
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
        icon: <Icon name='checkmark-circle-sharp' size={moderateScale(20)} color={theme.APP_WHITE} />
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
            <Header />

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
              <CustomTextInput bigLabel='Description' placeholder='Enter the description' handleChange={setDescription} value={description} />
              <HabitFrequencySection frequencyOption={frequencyOption} setFrequencyOption={setFrequencyOption} />

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

              <TimeOfDaySection timeOfDay={timeOfDay} setTimeOfDay={setTimeOfDay} />

              <ReminderSection removeReminder={removeReminder} reminderAt={reminderAt} setShowNotificationModal={setShowNotificationModal} />
            </View>

            <CustomButton bgColor={theme.MAIN_ACCENT_COLOR} color={theme.APP_WHITE} text={editHabit ? "SAVE" : "CREATE"} onClick={createHabit} disabled={loading} />
          </View>
        </ScrollView>
      </SafeAreaView>
      {showNotificationModal && <NotificationModal handleTimeSelected={handleTimeSelected} closeNotificationModal={() => setShowNotificationModal(false)} />}
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  container: {},
  sectionContainer: {},
  sectionTitle: {
    fontFamily: "Inter_600SemiBold"
  }
});
