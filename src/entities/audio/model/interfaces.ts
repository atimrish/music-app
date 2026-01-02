export interface IAudio {
    id: number,
    name: string,
    src: string,
    coverId: number,
    authorId: number,
    createdAt: string
}

export interface IJoinedAudio {
    id: number;
    name: string;
    src: string;
    createdAt: string;
    author: string;
    coverSrc: string;
}