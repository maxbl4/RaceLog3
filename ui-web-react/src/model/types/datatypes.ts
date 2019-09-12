export type StoredState = {
    user: User;
    news: News[];
    races: Race[];
}

export type User = {
    id: number;
    name: string;
    email: string;
    raceStatistics: RaceStatistics[];
}

export type RaceStatistics = {
    raceID: number;
    position: number;
}

export type News = {
    id: number;
    header: string;
    text: string;
    date: Date;
}

export type Race = {
    id: number;
    name: string;
    date: Date;
    location: string;
    participants: RaceParticipant[];
}

export type RaceParticipant = {
    racerID: number;
    racerName: string;
}