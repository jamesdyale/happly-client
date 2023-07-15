import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet, Image } from 'react-native'
import React from 'react'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import Icon from 'react-native-vector-icons/Ionicons'
import { useTheme } from '~hooks'

enum Tab {
  FRIENDS = 'friends',
  ROOMS = 'rooms'
}

const friends = [
  {
    id: 1,
    name: 'John Doe',
    lastMessage: 'Hey, how are you?',
    unread: 2,
    avatar: 'https://picsum.photos/200',
    timeSent: '12:00'
  },
  {
    id: 2,
    name: 'Jane Doe',
    lastMessage: 'Hey, how are you?',
    unread: 0,
    avatar: 'https://picsum.photos/200',
    timeSent: '12:00'
  },
  {
    id: 3,
    name: 'John Doe',
    lastMessage: 'Hey, how are you?',
    unread: 2,
    avatar: 'https://picsum.photos/200',
    timeSent: '12:00'
  }
]

const rooms = [
  {
    id: 1,
    name: 'Room 1',
    lastMessage: 'Hey, how are you?',
    unread: 2,
    photo: 'https://picsum.photos/200'
  },
  {
    id: 2,
    name: 'Room 2',
    lastMessage: 'Hey, how are you?',
    unread: 0,
    photo: 'https://picsum.photos/200'
  }
]

export const RoomsScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()
  const { theme } = useTheme()
  const [activeTab, setActiveTab] = React.useState(Tab.FRIENDS)


  return (
    <SafeAreaView style={[styles.wrapper, {
      backgroundColor: theme.MAIN_BG_COLOR
    }]}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={[styles.headerText, {
            color: theme.MAIN_TEXT_COLOR
          }]}>Accountability</Text>
          <TouchableOpacity onPress={() => console.log('searching')}>
            <Icon name='search' size={30} color={theme.MAIN_TEXT_COLOR} />
          </TouchableOpacity>
        </View>
        <View style={styles.tabsContainer}>
          <TouchableOpacity onPress={() => setActiveTab(Tab.FRIENDS)} style={[styles.tab, {
            backgroundColor: activeTab === Tab.FRIENDS ? theme.MAIN_ACCENT_COLOR : theme.MAIN_ACCENT_COLOR + '50'
          }]}>
            <Text
              style={[styles.tabText, {
                color: activeTab === Tab.FRIENDS ? theme.CONTRAST_MAIN_TEXT_COLOR : theme.MAIN_TEXT_COLOR
              }]}>
              Friend List
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab(Tab.ROOMS)} style={[styles.tab, {
            backgroundColor: activeTab === Tab.ROOMS ? theme.MAIN_ACCENT_COLOR : theme.MAIN_ACCENT_COLOR + '50'
          }]}>
            <Text
              style={[styles.tabText, {
                color: activeTab === Tab.ROOMS ? theme.CONTRAST_MAIN_TEXT_COLOR : theme.MAIN_TEXT_COLOR
              }]}>
              Rooms
            </Text>
          </TouchableOpacity>
        </View>
        {activeTab === 'friends' ? (
          <View>
            {friends.map(friend => <SingleItem key={friend.id} item={friend} />)}
          </View>
        ) : (
          <View>
            {rooms.map(room => <SingleItem key={room.id} item={room} />)}
          </View>
        )}
      </View>
    </SafeAreaView>
  )
}

const SingleItem = ({ item }) => {
  const { theme } = useTheme()
  return (
    <TouchableOpacity onPress={() => console.log('Opening Room')} style={styles.singleItemHolder}>
      <View style={styles.imageContainer}>
        {item.avatar ? (
          <Image style={styles.image} source={{ uri: item.avatar }} />
        ) : (
          <View style={styles.makeUpStyleImage}>
            <Text style={styles.makeUpStyleImageText}>{item.name[0]}</Text>
          </View>
        )}
      </View>
      <View style={styles.itemText}>
        <Text style={[styles.itemTextName, {
          color: theme.MAIN_TEXT_COLOR
        }]}>{item.name}</Text>
        <Text style={[styles.itemTextLastMessage, {
          color: theme.MAIN_TEXT_COLOR + '80'
        }]}>{item.lastMessage}</Text>
      </View>
      <View style={styles.timeDetails}>
        <Text style={[styles.timeDetailsTimeSent, {
          color: theme.MAIN_TEXT_COLOR + '80'
        }]}>{item.timeSent}</Text>
        {item.unread > 0 && (
          <View style={[styles.timeDetailsUnread, {
            backgroundColor: theme.MAIN_ACCENT_COLOR
          }]}>
            <Text style={[styles.timeDetailsUnreadText, {
              color: theme.CONTRAST_MAIN_TEXT_COLOR
            }]}>{item.unread}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  container: {
    padding: 20,
    marginBottom: 20
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  headerText: {
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 30,
    lineHeight: 36,
    display: 'flex'
  },

  tabsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  tab: {
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
    marginBottom: 10
  },
  tabText: {
    fontStyle: 'normal',
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    lineHeight: 18
  },

  singleItemHolder: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 50,
    overflow: 'hidden',
    marginRight: 20
  },
  image: {
    width: '100%',
    height: '100%'
  },
  makeUpStyleImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  makeUpStyleImageText: {
    fontSize: 20,
    fontWeight: '700'
  },
  itemText: {
    flex: 1
  },
  itemTextName: {
    fontStyle: 'normal',
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    lineHeight: 24,
    marginBottom: 5
  },
  itemTextLastMessage: {
    fontStyle: 'normal',
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    lineHeight: 18
  },
  timeDetails: {
    alignItems: 'flex-end'
  },
  timeDetailsTimeSent: {
    fontStyle: 'normal',
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 5
  },
  timeDetailsUnread: {
    width: 20,
    height: 20,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  timeDetailsUnreadText: {
    fontStyle: 'normal',
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    lineHeight: 18
  }
})
