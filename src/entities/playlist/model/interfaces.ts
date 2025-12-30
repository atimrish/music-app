import { IAudio } from "../../audio/model/interfaces"

export interface IPlaylist {
    id: number,
    name: string,
    coverId: number,
    createdAt: number
}

export type TPlaylistWithAudios = IPlaylist & {
    audios: IAudio[]
}