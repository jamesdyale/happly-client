import {
  View,
  Text,
  Button,
  SafeAreaView,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  ScrollView, TextInput, Image
} from 'react-native'
import React, { useEffect } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { useTheme } from '~hooks'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { CustomTextInput } from '~components'
import { formValidationOnBlur } from '~utils'
import moment from 'moment'
import { useAtomValue } from 'jotai'
import { userAtom } from '~state'

type Message = {
  id: number
  message: string
  dateTimeSent: string
  sender: string
  avatar?: string
}

const messagesExample: Message[] = [
  {
    id: 1,
    message: 'Goals for the week:' +
      '' +
      '- Sleep early and have a healthy wakeup time' +
      '- Rest at least 2hours in between work (1hour in between say 12pm, 1-2hours after 5:30pm) Then work tll sleep comes' +
      '3. Finish the project' +
      '4. Finish the project',
    dateTimeSent: '2023-07-14T17:13:03.987Z',
    sender: 'Jane Doe',
    avatar: 'https://picsum.photos/200'
  },
  {
    id: 2,
    message: 'Hey, how are you?',
    dateTimeSent: '2023-07-14T17:13:03.987Z',
    sender: 'James Odeyale'
  },
  {
    id: 3,
    message: 'Hey, how are you?',
    dateTimeSent: '2023-07-15T17:13:03.987Z',
    sender: 'Jane Doe'
  },
  {
    id: 4,
    message: 'Hey, how are you?',
    dateTimeSent: '2023-07-15T17:13:03.987Z',
    sender: 'James Odeyale'
  }
]

export const RoomScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()
  const { theme } = useTheme()

  const user = useAtomValue(userAtom)

  const [message, setMessage] = React.useState('')
  const [messages, setMessages] = React.useState({})


  useEffect(() => {
    let isMounted = true

    if (isMounted) {
      orderMessages()
    }

    return () => {
      isMounted = false
    }
  }, [])

  const orderMessages = () => {
    const messagesObject = {}

    messagesExample.forEach((message) => {
      const timeSent = moment(message.dateTimeSent).format('DD/MM/YYYY')

      if (messagesObject[timeSent]) {
        messagesObject[timeSent].push(message)
      } else {
        messagesObject[timeSent] = [message]
      }
    })

    setMessages(messagesObject)
  }


  return (
    <SafeAreaView style={[styles.wrapper, {
      backgroundColor: theme.SECONDARY_BG_COLOR
    }]}>
      <KeyboardAvoidingView style={[styles.container, {
        backgroundColor: theme.SECONDARY_BG_COLOR
      }]}>
        <View style={[styles.header, {
          borderBottomColor: theme.BORDER_COLOR
        }]}>
          <Icon name='chevron-back' size={25}
                color={theme.MAIN_TEXT_COLOR}
                onPress={() => navigation.goBack()}
                style={styles.backIcon}
          />
          <View style={styles.headerTextSection}>
            <View style={styles.headerText}>
              <Text style={[styles.roomName, { color: theme.MAIN_TEXT_COLOR }]}>Sleeping Early</Text>
              <Text style={[styles.members, { color: theme.MAIN_TEXT_COLOR + '90' }]}>100 Members</Text>
            </View>
            <View style={styles.actionBtn}>
              <TouchableOpacity style={styles.actionButtonContainer} onPress={() => navigation.goBack()}>
                <Icon name='md-person-add-sharp' size={20} color={theme.APP_BLACK} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButtonContainer}>
                <Icon name='md-ellipsis-vertical' size={20} color={theme.APP_BLACK} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={[styles.roomConversation, {
          backgroundColor: theme.BORDER_COLOR + '40'
        }]}>
          <ScrollView>
            {Object.keys(messages).map((date) => (
              <View key={date} style={styles.messagesGroup}>
                <Text style={styles.messagesGroupText}>{moment().format('DD/MM/YYYY') === date ? 'Today' : date}</Text>
                {messages[date].map((message: Message) => {
                  if (message.sender !== user.name) {
                    console.log(message)
                    return <ReceiverComponent {...message} />
                  } else {
                    return <SenderComponent {...message} />
                  }
                })}
              </View>
            ))}
          </ScrollView></View>
        <View style={[styles.footer, {
          borderTopColor: theme.BORDER_COLOR
        }]}>
          <View style={{ width: '100%' }}>
            <CustomTextInput bigLabel='' placeholder='Type your message...'
                             handleChange={setMessage}
              // handleBlur={() => setNameError(formValidationOnBlur('name', name))}
                             value={message}
              // error={nameError}
            /></View>
        </View>


      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const SenderComponent = (message: Message) => {
  const { theme } = useTheme()

  return (
    <View key={message.id} style={styles.senderMessageContainer}>
      <View style={[styles.messageInfo, {
        backgroundColor: theme.CONTRAST_MAIN_TEXT_COLOR
      }]}>
        <Text style={styles.message}>{message.message}</Text>
        <Text style={styles.messageTime}>{moment(message.dateTimeSent).format('hh:mm A')}</Text>
      </View>
      <View style={[styles.imageContainer, {
        alignSelf: 'flex-end'
      }]}>
        {message.avatar ? (
          <Image style={styles.avatar} source={{ uri: message.avatar }} />
        ) : (
          <View style={styles.messageAvatar}>
            <View style={[styles.makeUpStyleImage, {
              backgroundColor: theme.MAIN_TEXT_COLOR
            }]}>
              <Text style={[styles.makeUpStyleImageText, {
                color: theme.CONTRAST_MAIN_TEXT_COLOR
              }]}>{message.sender[0]}</Text>
            </View>
          </View>
        )}
      </View>

    </View>
  )
}

const ReceiverComponent = (message: Message) => {
  const { theme } = useTheme()

  return (
    <View key={message.id} style={styles.messageContainer}>
      <View style={styles.imageContainer}>
        {message.avatar ? (
          <Image style={styles.avatar} source={{ uri: message.avatar }} />
        ) : (
          <View style={styles.messageAvatar}>
            <View style={[styles.makeUpStyleImage, {
              backgroundColor: theme.MAIN_ACCENT_COLOR
            }]}>
              <Text style={[styles.makeUpStyleImageText, {
                color: theme.CONTRAST_MAIN_TEXT_COLOR
              }]}>{message.sender[0]}</Text>
            </View>
          </View>
        )}
      </View>
      <View style={[styles.messageInfo, {
        backgroundColor: theme.CONTRAST_MAIN_TEXT_COLOR
      }]}>
        <Text style={styles.message}>{message.message}</Text>
        <Text style={styles.messageTime}>{moment(message.dateTimeSent).format('hh:mm A')}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  container: {
    height: '100%'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    width: '100%'
  },
  backIcon: {
    marginRight: 5,
    width: '10%'
  },
  headerTextSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '85%'
  },
  headerText: {},
  roomName: {
    fontSize: 20,
    fontFamily: 'Inter_600SemiBold',
    lineHeight: 24,
    fontStyle: 'normal'

  },
  members: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    lineHeight: 18,
    fontStyle: 'normal'
  },
  actionBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 80
  },
  actionButtonContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center'
  },
  roomConversation: {
    flex: 1
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderTopWidth: 1,
    width: '100%'
  },
  messagesGroup: {
    marginBottom: 20
  },
  messagesGroupText: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    lineHeight: 18,
    fontStyle: 'normal',
    color: '#999',
    marginTop: 20,
    width: '100%',
    textAlign: 'center'
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    width: '70%',
    padding: 10
  },
  messageAvatar: {
    width: 25,
    height: 25,
    borderRadius: 20,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  },
  messageAvatarText: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    lineHeight: 24,
    fontStyle: 'normal',
    color: '#999'
  },
  messageInfo: {
    width: '80%',
    flexDirection: 'column',
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 10
  },
  message: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    lineHeight: 20,
    fontStyle: 'normal',
    color: '#333',
    marginBottom: 5
  },
  messageTime: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    lineHeight: 16,
    fontStyle: 'normal',
    color: '#999'
  },
  imageContainer: {
    width: '20%',
    alignItems: 'center'
  },
  avatar: {
    width: 25,
    height: 25,
    borderRadius: 20
  },
  makeUpStyleImage: {
    width: 25,
    height: 25,
    borderRadius: 20,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center'
  },
  makeUpStyleImageText: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    lineHeight: 24,
    fontStyle: 'normal',
    color: '#999'
  },
  senderMessageContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    width: '70%',
    padding: 10,
    alignSelf: 'flex-end'
  }

})

