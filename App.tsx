import {Dimensions, ImageBackground, Pressable, StyleSheet, Text, View} from 'react-native';
import {Audio} from 'expo-av';
import {useEffect, useState} from "react";
import {Asset, useAssets} from 'expo-asset';
import {paths} from "./resources/paths";
import PlayIcon from "./components/PlaySvg";
import PauseIcon from "./components/PauseSvg";
import Slider from '@react-native-community/slider';
import {names} from "./resources/names";
import {msToMS} from "./resources/utilities";
import FastForwardIcon from "./components/FastForwardSvg";
import {languages} from "./resources/enums";


const App = () => {
  const englishOffset = paths.length / 2;

  const [language, setLanguage] = useState<languages>(languages.slovak);
  const [assets, error] = useAssets(paths);

  const [duration, setDuration] = useState<number>(0);
  const [actualTime, setActualTime] = useState<number>(0);

  const [activeSound, setActiveSound] = useState<Audio.Sound>();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [assetsIndex, setAssetsIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [draggingValue, setDraggingValue] = useState(0);
  const [waitToLoad, setWaitToLoad] = useState(false);

  const _onPlaybackStatusUpdate = (playbackStatus: any) => {
    if (!playbackStatus.isLoaded) {
      if (playbackStatus.error) {
        console.log(`Encountered a fatal error during playback: ${playbackStatus.error}`);
      }
    } else {
      setActualTime(playbackStatus.positionMillis);
      setDuration(playbackStatus.durationMillis);
      if (playbackStatus.didJustFinish) {
        if (!(assetsIndex >= (language === languages.slovak ? paths.length - 1 - englishOffset: paths.length - 1))) {
          setAssetsIndex(assetsIndex + 1);
        }
      }
    }
  };

  useEffect(() => {
    const loadSound = async () => {
      //Asset.loadAsync(paths).then(() => setWaitToLoad(false));
      const asset = await Asset.loadAsync(paths[0]);
      if (asset) {
        console.log('Loading Sound');
        await Audio.setAudioModeAsync({
          staysActiveInBackground: true,
          shouldDuckAndroid: false,
          playThroughEarpieceAndroid: false,
          allowsRecordingIOS: false,
          playsInSilentModeIOS: true,
        });
        const { sound } = await Audio.Sound.createAsync(
            asset[0],
            {shouldPlay: true, isMuted: false},
            _onPlaybackStatusUpdate,
            true
        );
        setActiveSound(sound);
        //setIsPlaying(true);
        //await sound.playAsync();
        setIsPlaying(false);
        await sound.stopAsync();
      }
    };
    loadSound().catch(console.error);
  }, []);

  useEffect(() => {
    const loadSound = async () => {
      if (assetsIndex === -1) {
        return;
      }
      if (activeSound) {
        await activeSound.unloadAsync();
      }
      if (assets) {
        console.log('Loading Sound');
        await Audio.setAudioModeAsync({
          staysActiveInBackground: true,
          shouldDuckAndroid: false,
          playThroughEarpieceAndroid: false,
          allowsRecordingIOS: false,
          playsInSilentModeIOS: true,
        });
        const { sound } = await Audio.Sound.createAsync(
            assets[assetsIndex],
            {shouldPlay: true, isMuted: false},
            _onPlaybackStatusUpdate,
            true
        );
        setActiveSound(sound);
        //setIsPlaying(true);
        //await sound.playAsync();
        setIsPlaying(false);
        await sound.stopAsync();
      }
    };
    setWaitToLoad(true);
    loadSound().then(() => setWaitToLoad(false));
  }, [assetsIndex]);

  const playSound = async () => {
    if (assetsIndex === -1) {
      setAssetsIndex(0);
      return;
    }
    if (activeSound) {
      await activeSound.playAsync();
      setIsPlaying(true);
    }
  }

  const pauseSound = async () => {
    if (activeSound) {
      await activeSound.pauseAsync();
      setIsPlaying(false);
    }
  }

  return (
        <ImageBackground source={require('./assets/background.png')} resizeMode="center" style={styles.container} imageStyle={styles.image} >
            <View style={styles.languageContainer}>
              <Pressable onPress={() => {
                if (language === languages.slovak) {
                  setAssetsIndex(assetsIndex === -1 ? 0 + englishOffset : assetsIndex + englishOffset);
                  setLanguage(languages.english);
                } else {
                  setAssetsIndex(assetsIndex - englishOffset);
                  setLanguage(languages.slovak);
                }
              } } disabled={waitToLoad} >
                <Text style={styles.lang}>{language}</Text>
              </Pressable>
            </View>
            <View style={styles.playerContainer} >
              <View style={styles.titleContainer}>
                <Text style={styles.title} >{assetsIndex === -1 ? names[0] : names[assetsIndex]}</Text>
              </View>
              <View style={styles.playPauseButtonContainer} >
                <Pressable style={[styles.backwardButton, {transform: [{rotateY: "180deg"}]} ]}
                           onPress={()=>setAssetsIndex(assetsIndex - 1)}
                           disabled={waitToLoad || assetsIndex <= (language === languages.slovak ? 0 : englishOffset)}>
                  <FastForwardIcon fill={assetsIndex <= (language === languages.slovak ? 0 : englishOffset) ? "grey" : "black"} />
                </Pressable>
                <Pressable style={styles.playPauseButton} onPress={isPlaying ? pauseSound : playSound}>
                  {isPlaying ? <PauseIcon fill="#000" /> : <PlayIcon fill="#000" />}
                </Pressable>
                <Pressable style={styles.forwardButton}
                           onPress={()=>setAssetsIndex(assetsIndex === -1 ? 1 : assetsIndex + 1)}
                           disabled={waitToLoad || assetsIndex >=
                               (language === languages.slovak ? paths.length - 1 - englishOffset: paths.length - 1)}>
                  <FastForwardIcon fill={assetsIndex >=
                  (language === languages.slovak ? paths.length - 1 - englishOffset: paths.length - 1) ? "grey" : "black"} />
                </Pressable>
              </View>
              <View style={styles.sliderContainer}>
                <View style={styles.timeStampContainer}>
                  <View style={styles.actualTime} ><Text style={{fontSize: 24}}>{msToMS(isDragging ? draggingValue : actualTime)}</Text></View>
                  <View style={styles.totalTime} ><Text style={{fontSize: 24}}>{msToMS(duration)}</Text></View>
                </View>
                <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={duration}
                    minimumTrackTintColor="#000"
                    maximumTrackTintColor="#000"
                    thumbTintColor={activeSound ? 'black' : 'grey'}
                    onSlidingStart={(time : number) => {setIsDragging(true); setDraggingValue(time);}}
                    onValueChange={(time: number) => {setDraggingValue(time);}}
                    onSlidingComplete={(time: number) => {activeSound?.setPositionAsync(time); setIsDragging(false);}}
                    value={actualTime}
                    disabled={!activeSound}
                />
              </View>
            </View>
            <View>
              <Text>© {language === languages.slovak ? "Hudba" : "Music"}: Róbert Mankovecký</Text>
              <Text>© {language === languages.slovak ? "Texty" : "Texts"}: NBS-Múzeum mincí a medailí Kremnica</Text>
            </View>
        </ImageBackground>
  );
}

export default App;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "flex-end",
    opacity: 0.5,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    /* background by SVGBackgrounds.com */
  },
  playerContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  empty: {
    flex: 1,
  },
  timeStampContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  actualTime: {
    flex: 1,
  },
  totalTime: {
    flex: 1,
    alignItems: 'flex-end',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width * 0.9,
  },
  title: {
    fontSize: 34,
    textAlign: "center",
    fontWeight: "bold",
  },
  playPauseButtonContainer: {
    flex: 2,
    alignItems: 'center',
    flexDirection: 'row',
  },
  playPauseButton: {
    flex: 1,
    width: Dimensions.get('window').width * 0.5,
    height: Dimensions.get('window').width * 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playPauseIcon: {
    flex: 1,
  },
  forwardButton: {
    flex: 1,
    width: Dimensions.get('window').width * 0.14,
    height: Dimensions.get('window').width * 0.14,
  },
  backwardButton: {
    flex: 1,
    width: Dimensions.get('window').width * 0.14,
    height: Dimensions.get('window').width * 0.14,
  },
  sliderContainer: {
    flex: 1,
    width: Dimensions.get('window').width * 0.8,
  },
  slider: {
    width: '100%',
  },
  languageContainer: {
    flex: 1,
    width: Dimensions.get('window').width * 0.8,
    alignItems: "flex-end",
  },
  lang: {
    marginTop: '15%',
    fontSize: 24,
    padding: 5,
    borderRadius: 100,
    borderColor: "grey",
    borderStyle: "solid",
    borderWidth: 1,
  }
});
