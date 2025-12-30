import {IAudio} from "../../audio/model/interfaces";

export interface IPlaylist {
	id: number;
	name: string;
	coverId: number;
	createdAt: number;
}

export type TPlaylistWithAudios = IPlaylist & {
	audios: IAudio[];
};

export interface IJoinedPlaylist {
	id: number;
	name: string;
	coverSrc: string;
	countAudios: number;
	createdAt: number;
}
