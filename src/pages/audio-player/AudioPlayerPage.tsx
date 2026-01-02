import { getAudioById } from "@/src/entities/audio/api/getAudioById";
import { IJoinedAudio } from "@/src/entities/audio/model/interfaces";
import { AudioService } from "@/src/shared/lib/audioService";
import { formatMilliseconds } from "@/src/shared/lib/formatMilliseconds";
import { VerticalMargin } from "@/src/shared/ui/VerticalMargin";
import { Wrapper } from "@/src/shared/ui/Wrapper";
import { Entypo } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const styles = StyleSheet.create({
	cover: {
		width: "95%",
		aspectRatio: 1,
		borderRadius: 10,
	},
	container: {
		width: "100%",
		alignItems: "center",
	},
	audioName: {
		fontSize: 24,
		marginTop: 20,
		marginBottom: 10,
		fontWeight: 600,
	},
	authorName: {
		fontSize: 16,
		color: "gray",
	},
	controls: {
		flexDirection: "row",
		justifyContent: "center",
		gap: 30,
		marginVertical: 10,
	},
	control: {
		width: 70,
		height: 70,
		borderRadius: "50%",
		justifyContent: "center",
		alignItems: "center",
	},
	stateLine: {
		width: "100%",
		height: 2,
		backgroundColor: "black",
		marginVertical: 20,
		position: "relative",
	},
	stateLinePoint: {
		width: 30,
		height: 30,
		borderRadius: "50%",
		borderWidth: 1,
		position: "absolute",
		top: -15,
	},
	stateLineNumbers: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%",
	},
	stateLineContainer: {
		width: "95%",
		marginTop: 20,
	},
});

export const AudioPlayerPage = () => {
	const [audio, setAudio] = useState<IJoinedAudio | null>(null);
	const [currentPosition, setCurrentPosition] = useState(0);
	const [duration, setDuration] = useState(0);
	const {audioId} = useLocalSearchParams();
	const [isPlaying, setIsPlaying] = useState(false);

	const isDraggingRef = useRef(false);
	const dragXRef = useRef(0);
	const statusPointRef = useRef<View>(null);

	useEffect(() => {
		(async () => {
			const audio = await getAudioById(+audioId);
			if (!audio) return;

			await AudioService.shared.loadAudio(audio.src);
			setDuration(AudioService.shared.getDuration() || 0);
			setCurrentPosition(await AudioService.shared.getCurrentPosition());
			setAudio(audio);

			AudioService.shared.onPlayStart = () => setIsPlaying(true);
			AudioService.shared.onStop = () => setIsPlaying(false);
			AudioService.shared.onPlaying = (currentMs) => {
				setCurrentPosition(currentMs);
				setIsPlaying(true);
			};
		})();
	}, [audioId]);

	if (!audio) return <ActivityIndicator size={60} style={{flex: 1}} />;

	const currentPercent = currentPosition / duration;
	const stateLineWidth = (Dimensions.get("screen").width - 40) * 0.95;
	const currentStatePointPercent = stateLineWidth * currentPercent - 15;

	return (
		<VerticalMargin>
			<Wrapper>
				<View style={styles.container}>
					<Image style={styles.cover} source={{uri: audio.coverSrc}} />

					<Text style={styles.audioName}>{audio.name}</Text>
					<Text style={styles.authorName}>{audio.author}</Text>

					<View style={styles.stateLineContainer}>
						<View style={styles.stateLineNumbers}>
							<Text>{formatMilliseconds(currentPosition)}</Text>
							<Text>{formatMilliseconds(duration)}</Text>
						</View>

						<View style={styles.stateLine}>
							<View
								ref={statusPointRef}
								style={{...styles.stateLinePoint, left: currentStatePointPercent}}
								onTouchEnd={(e) => {
									let percent = (e.nativeEvent.pageX - 20) / stateLineWidth;
									if (percent < 0) {
										percent = 0;
									} else if (percent > 1) {
										percent = 1;
									}

									const position = duration * percent;

									AudioService.shared.setPosition(position);
									setCurrentPosition(position);
								}}
							/>
						</View>
					</View>

					<View style={styles.controls}>
						<TouchableOpacity style={styles.control}>
							<Entypo size={40} name="controller-jump-to-start" />
						</TouchableOpacity>
						<TouchableOpacity style={styles.control}>
							{isPlaying ? (
								<Entypo size={50} name="controller-paus" onPress={() => AudioService.shared.pause()} />
							) : (
								<Entypo
									size={60}
									name="controller-play"
									onPress={() => AudioService.shared.play(false)}
								/>
							)}
						</TouchableOpacity>
						<TouchableOpacity style={styles.control}>
							<Entypo size={40} name="controller-next" />
						</TouchableOpacity>
					</View>
				</View>
			</Wrapper>
		</VerticalMargin>
	);
};
