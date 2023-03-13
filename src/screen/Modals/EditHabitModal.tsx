import { View, Text } from 'react-native'
import { useAtom } from 'jotai'
import { habitSelectedAtom, isHabitSelectedAtom } from '../../state/state'

export const EditHabitModal = () => {
  const [isHabitSelected] = useAtom(isHabitSelectedAtom)
  const [habitSelected] = useAtom(habitSelectedAtom)

  return (
    <View>
      <View>
        <View>
          <View>
            <Text>Habit Workout</Text>
            <Text>Reminder: 9:00pm (In 30mins)</Text>
          </View>
          <View>
            <Text>Close</Text>
          </View>
        </View>
        <View>
          <Text>
            Delete
          </Text>
          <Text>
            Copy
          </Text>
          <Text>
            Mark as done
          </Text>
        </View>
        <Text>
          Edit Habit
        </Text>
      </View>
    </View>
  )
}