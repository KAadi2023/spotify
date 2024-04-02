import { Pressable, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import TrackPlayer, { State, usePlaybackState } from 'react-native-track-player'

import { playbackService } from '../../musicPlayerServices'

import Icon from 'react-native-vector-icons/MaterialIcons'

const ControlCenter = () => {
    const [currentPlaybackState, setCurrentPlaybackState] = useState(State.None)

    useEffect(() => {
        const fetchPlaybackState = async () => {
            const state = await TrackPlayer.getState()
            setCurrentPlaybackState(state)
        }

        fetchPlaybackState()
    }, [])

    //next button
    const skipToNext = async () => {
        await TrackPlayer.skipToNext()
    }

    //previous button
    const skipToPrevious = async () => {
        await TrackPlayer.skipToPrevious()
    }

    const togglePlayBack = async () => {
        if (currentPlaybackState === State.Paused || currentPlaybackState === State.Ready) {
            await TrackPlayer.play()
            setCurrentPlaybackState(State.Playing)
        } else {
            await TrackPlayer.pause()
            setCurrentPlaybackState(State.Paused)
        }
    }


    return (
        <View style={styles.container}>
            <Pressable
                onPress={skipToPrevious}
            >
                <Icon style={styles.icon} name="skip-previous" size={40} />
            </Pressable>
            <Pressable
                onPress={togglePlayBack}
            >
                <Icon style={styles.icon} name={currentPlaybackState === State.Playing ? "pause" : "play-arrow"} size={75} />
            </Pressable>

            <Pressable
                onPress={skipToNext}
            >
                <Icon style={styles.icon} name="skip-next" size={40} />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 56,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        color: '#FFFFFF',
    },
});

export default ControlCenter
