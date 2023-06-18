import React from 'react'
import { TouchableOpacity, View, Text, StyleSheet, SafeAreaView } from 'react-native'
import Modal from 'react-native-modal'
import { APP_BLACK, APP_RED, APP_WHITE, GRAY_TEXT } from '../../styles'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { loadingAtom, progressAtom, selectedHabitAtom, showDeleteModalAtom } from '@state/state'
import { ActionGetUserHabitById } from '@actions/actionGetUserHabitById'
import { ActionDeleteHabitById } from '@actions/actionDeleteHabitById'
import { ActionDeleteStatsById } from '@actions/actionDeleteStatsById'
import Icon from 'react-native-vector-icons/Ionicons'
import { useToast } from 'react-native-toast-notifications'
import { ActionDeleteStreakByHabitId } from '@actions/actionDeleteStreakByHabitId'
import { ROUTES } from '../../constants'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

export const DeleteHabitModal = () => {
  const toast = useToast()
  const { navigate } = useNavigation<NativeStackNavigationProp<ParamListBase>>()

  const setDeleteModal = useSetAtom(showDeleteModalAtom)
  const isDeleteHabitModalOpen = useAtomValue(showDeleteModalAtom)

  const [progress, setProgress] = useAtom(progressAtom)
  const [habitSelected, setSelectedHabit] = useAtom(selectedHabitAtom)
  const setLoading = useSetAtom(loadingAtom)


  const handleOnPressDelete = async () => {
    setLoading(true)

    const dataDocumentSnapshot = await ActionGetUserHabitById(habitSelected.id)

    if (dataDocumentSnapshot.exists()) {
      try {
        await ActionDeleteHabitById(habitSelected.id)

        const habitStat = progress.find((stat) => stat.habitId === habitSelected.id)

        if (habitStat) {
          await ActionDeleteStatsById(habitStat.id)
          setProgress((prev) => prev.filter((stat) => stat.id !== habitStat.id))

          await ActionDeleteStreakByHabitId(habitSelected.id)
        }

        setSelectedHabit(null)
        setDeleteModal(false)

        toast.show('Habit Deleted', {
          type: 'danger',
          duration: 4000,
          placement: 'bottom',
          icon: <Icon name='trash' size={20} color={APP_WHITE} />
        })

        navigate(ROUTES.MAIN_HOME)
      } catch (e) {
        toast.show('An error happened when deleting your habit. Please try again!', {
          type: 'danger',
          duration: 4000,
          placement: 'bottom',
          icon: <Icon name='alert-circle' size={20} color={APP_WHITE} />
        })
      } finally {
        setLoading(false)
      }
    }

    setLoading(false)
    setSelectedHabit(null)
  }

  return (
    <View style={styles.container}>
      <Modal
        isVisible={isDeleteHabitModalOpen}
        onBackdropPress={() => setDeleteModal(false)}>
        <SafeAreaView
          style={{ display: 'flex', flex: 1, position: 'relative', alignItems: 'center' }}>
          <View
            style={styles.bodySectionContainer}>
            <View style={styles.bodySection}>
              <Text style={styles.mainBodyHeader}>Delete Habit?</Text>
            </View>
            <View style={styles.actionSection}>
              <TouchableOpacity style={{ ...styles.actionSectionButton, ...styles.exitBtn }}
                                onPress={() => setDeleteModal(false)}>
                <Text style={{ color: APP_BLACK, ...styles.infoText }}>No, Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ ...styles.actionSectionButton, ...styles.goForwardWithActionBtn }}
                onPress={handleOnPressDelete}>
                <Text style={{ color: APP_WHITE, ...styles.infoText }}>Yes, Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {},
  bodySectionContainer: {
    width: '80%',
    marginTop: 30,
    position: 'absolute',
    bottom: 100,
    backgroundColor: APP_WHITE,
    borderRadius: 20,
    padding: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5
  },
  bodySection: {},
  actionSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20
  },
  actionSectionButton: {
    borderRadius: 10,
    padding: 15,
    width: '48%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  mainBodyHeader: {
    fontFamily: 'Inter_500Medium',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 18,
    color: GRAY_TEXT
  },
  infoText: {
    fontFamily: 'Inter_500Medium',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 17
  },
  exitBtn: {
    borderColor: '#B0C1CB',
    borderWidth: 1
  },
  goForwardWithActionBtn: {
    borderColor: APP_RED,
    backgroundColor: APP_RED,
    borderWidth: 1
  }

})
