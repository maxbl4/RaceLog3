export type StoredState = {
    user: User;
    news: News;
    races: Races;
}

// Is this date fetching at this moment or not
export type Fetchable = {
    isFetching: boolean;
}

// ----------------------------------------------------------------------
// Storing data in state
// ----------------------------------------------------------------------
export type User = Fetchable & {
    info: UserInfo;
}

export type News = Fetchable & {
    items: NewsItem[];
}

export type Races = Fetchable & {
    items: RaceItem[];
}

// ----------------------------------------------------------------------
// Minimum info for stored data
// ----------------------------------------------------------------------
export type UserInfo = {
    id: number;
    name: string;
}

export type NewsItem = {
    id: number;
    header: string;
    date: number;
}

export type RaceItem = {
    id: number;
    name: string;
    date: number;
}

// ----------------------------------------------------------------------
// Extended info for showing on particular pages
// ----------------------------------------------------------------------
export type UserInfoExt = UserInfo & {
    email: string;
    raceStatistics: RaceStatistics[];
}

export type NewsItemExt = NewsItem & {
    text: string;
}

export type RaceItemExt = RaceItem & {
    location: string;
    participants: RaceParticipant[];
}

export type RaceStatistics = {
    raceID: number;
    position: number;
}

export type RaceParticipant = {
    racerID: number;
    racerName: string;
}