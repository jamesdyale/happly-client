import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import React, { useEffect } from 'react'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useTheme } from '~hooks'
import Icon from 'react-native-vector-icons/Ionicons'
import { SleepingIcon } from '~assets'
import { CustomButton } from '~components'
import { ChallengeType } from '~types/ChallengeType'
import { ActionGetChallenges } from '~actions'
import { onSnapshot } from 'firebase/firestore'
import { useAtom } from 'jotai'
import { challengesAtom } from '~state'


export const ChallengesScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()
  const { theme } = useTheme()
  const [challenges, setChallenges] = useAtom(challengesAtom)

  useEffect(() => {
    let isMounted = true

    if (isMounted) {
      getChallenges()
    }
  }, [])

  const getChallenges = async () => {
    const dataDocumentSnapshotQuery = ActionGetChallenges()

    const unsubscribe = onSnapshot(dataDocumentSnapshotQuery, (querySnapshot) => {
      const challenges: ChallengeType[] = []
      querySnapshot.forEach((doc) => {
        const challenge = doc.data() as ChallengeType
        challenges.push(challenge)
      })

      setChallenges(challenges)
    })

    return () => unsubscribe()
  }


  return (
    <SafeAreaView style={[styles.wrapper, {
      backgroundColor: theme.MAIN_BG_COLOR
    }]}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={[styles.headerText, {
            color: theme.MAIN_TEXT_COLOR
          }]}>Challenge</Text>
          <TouchableOpacity onPress={() => console.log('searching')}>
            <Icon name='search' size={30} color={theme.MAIN_TEXT_COLOR} />
          </TouchableOpacity>
        </View>
        {/*
          TODO: Down the line I should have a list of challenges created by the
          user and some popular challenges that are trending. For now, I'll just
          have a list of popular challenges.
          Popular Challenges depends on the amount of member in the challenge.
        */}
        {challenges && challenges.length > 0 && (
          <View>
            <Text>This user does not have any challenges</Text>
          </View>
        )}

        {challenges && challenges.length === 0 && (
          <View style={{
            display: 'flex'
          }}>
            <Text>No challenge created</Text>
          </View>
        )}
        {challenges && challenges.length > 0 && (
          <ScrollView style={{ marginBottom: 70 }}>
            {challenges.map((challenge, index) => (
              <SingleChallenge key={index} {...challenge} />
            ))}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  )
}

const SingleChallenge = (challenge: ChallengeType) => {
  const { theme } = useTheme()

  const handleJoinChallenge = (challengeId) => {
    console.log('Joining challenge')
    Alert.alert(
      'Challenge feature is not available yet'
    )
  }

  return (
    <View key={challenge.id} style={[styles.singleChallengeContainer, {
      backgroundColor: theme.CARD_BG
    }]}>
      <View style={styles.hashtagsContainer}>
        <View style={{ flexDirection: 'row' }}>
          {challenge.hashtags.map((hashtag, index) => (
            <Text key={index} style={[styles.hashtags, {
              color: theme.MAIN_ACCENT_COLOR,
              backgroundColor: theme.MAIN_ACCENT_COLOR + '20'
            }]}>#{hashtag} </Text>
          ))}
        </View>

        <Text style={[styles.challengeMemberNumber, {
          color: theme.MAIN_ACCENT_COLOR,
          backgroundColor: theme.MAIN_ACCENT_COLOR + '20'
        }]}>{
          challenge.numberOfParticipants > 1
            ? `${challenge.numberOfParticipants} members`
            : `${challenge.numberOfParticipants} member`
        }
        </Text>
      </View>
      <View style={styles.challengeInfo}>
        <View style={styles.challengeInfoTop}>
          <View style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '60%'
          }}>
            <Text style={styles.challengeName}>{challenge.name}</Text>
            <Text style={styles.challengeDescription}>{challenge.description}</Text>
          </View>
          <View style={{
            display: 'flex',
            flexDirection: 'row',
            alignSelf: 'center',
            justifyContent: 'center'
          }}>
            <SleepingIcon />
          </View>
        </View>
        <View>
          <CustomButton
            bgColor={theme.MAIN_ACCENT_COLOR}
            color={theme.CONTRAST_MAIN_TEXT_COLOR}
            text='Join'
            onClick={() => handleJoinChallenge(challenge.id)}
            disabled={false}
          />
        </View>
      </View>
    </View>
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
  noHabitsContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  noHabitTextMain: {
    fontFamily: 'Inter_700Bold',
    fontStyle: 'normal',
    fontSize: 24,
    lineHeight: 36
  },
  noHabitTextSub: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    fontStyle: 'normal',
    lineHeight: 18
  },
  singleChallengeContainer: {
    marginBottom: 20,
    padding: 20,
    borderRadius: 10
  },
  hashtagsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  hashtags: {
    fontStyle: 'normal',
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    lineHeight: 18,
    marginRight: 10,
    padding: 5
  },
  challengeInfo: {},
  challengeInfoTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10

  },
  challengeName: {
    fontStyle: 'normal',
    fontFamily: 'Inter_700Bold',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 5
  },
  challengeDescription: {
    fontStyle: 'normal',
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 5
  },
  challengeMemberNumber: {
    fontStyle: 'normal',
    fontFamily: 'Inter_700Bold',
    fontSize: 12,
    lineHeight: 18,
    marginRight: 10,
    padding: 5
  }
})
