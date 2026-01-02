import { Audio, AVPlaybackStatus } from "expo-av";

export class AudioService {
	private static _shared: AudioService;
	private sound: Audio.Sound | null = null;
	private status: AVPlaybackStatus | null = null;

	private _onPlayStart: (() => void) | null = null;
	private _onPlaying: ((currentMs: number) => void) | null = null;
	private _onStop: (() => void) | null = null;
	private _onReach: (() => void) | null = null;

	static get shared(): AudioService {
		if (!this._shared) {
			this._shared = new AudioService();
		}
		return this._shared;
	}

	public async loadAudio(uri: string) {
		const {sound, status} = await Audio.Sound.createAsync({uri}, {shouldPlay: false}, (st) => {
			if (st.isLoaded) {
				if (st.didJustFinish) {
					this._onPlaying?.(st.positionMillis);
					this._onStop?.();
					return;
				}

				if (st.isPlaying) {
					this._onPlaying?.(st.positionMillis);
				} else {
					this._onStop?.();
				}
			}
		});
		this.sound = sound;
		this.status = status;
	}

	public async getCurrentPosition(): Promise<number> {
		if (this.sound) {
			const status = await this.sound.getStatusAsync();
			if (status.isLoaded) {
				return status.positionMillis;
			}
		}
		return 0;
	}

	public getDuration() {
		if (this.status && this.status.isLoaded) {
			return this.status.durationMillis;
		}
		return 0;
	}

	public async pause() {
		if (this.sound) {
			await this.sound.pauseAsync();
			this._onStop?.();
		}
	}

	public async play(fromStart: boolean) {
		if (!this.sound) return;

		if (fromStart) {
			await this.sound.playFromPositionAsync(0);
		} else {
			const currentPosition = await this.getCurrentPosition();
			const playPosition = currentPosition === this.getDuration() ? 0 : currentPosition;
			await this.sound.playFromPositionAsync(playPosition);
		}
		this._onPlayStart?.();
	}

	public async setPosition(ms: number) {
		if (this.sound) {
			await this.sound.setPositionAsync(ms);
		}
	}

	public async destroy() {
		if (this.sound) {
			await this.sound.unloadAsync();
			this.sound = null;
			this.status = null;
		}
	}

	public set onPlayStart(cb: () => void) {
		this._onPlayStart = cb;
	}

	public set onPlaying(cb: (currentMs: number) => void) {
		this._onPlaying = cb;
	}

	public set onStop(cb: () => void) {
		this._onStop = cb;
	}

	public set onReach(cb: () => void) {
		this._onReach = cb;
	}
}
