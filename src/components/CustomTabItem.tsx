import { StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import React from 'react'
import { SECONDARY_BG_COLOR } from '../styles'
import { AddHabitIcon } from '../../assets/svgs'


export const CustomTabItem = (props) => {
  const { icon, name, size, color } = props
  if (name !== 'Create') {
    return (
      <View style={styles.customTabItemContainer}>
        <View style={styles.customTabItemIcon}>
          <Icon name={icon} size={size} color={color} />
        </View>
        <Text style={{ ...styles.customTabItemTabName, color: color }}>{name}</Text>
      </View>

    )
  }

  return (
    <View style={styles.customTabItemContainer}>
      <View style={styles.customTabItemPlusIcon}>
        <AddHabitIcon {...props} />
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  customTabItemContainer: {
    display: 'flex',
    width: '100%',
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: -10,
    backgroundColor: SECONDARY_BG_COLOR
  },
  customTabItemIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center'
  },
  customTabItemPlusIcon: {
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -30
  },
  customTabItemTabName: {
    fontSize: 12,
    fontWeight: 'bold'
  }
})
