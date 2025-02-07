export type ModelTypes = {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
}

export type SpotType = {
    id: number;
    title: string;
    explanation: string;
    address: string;
    nearStation: number;
    pictureUrl: string;
    visited: boolean;
};

export type SpotLocationType = {
    id: number;
    title: string;
    explanation: string;
    address: string;
    nearStation: number;
    pictureUrl: string;
    latitude: number;
    longitude: number;
};

export type WayPoint = {
    name: string;
    lat: number;
    lng: number;
};

export type Review = {
    id: number;
    userId: string;
    userName: string;
    userImage?: string;
    title: string;
    content: string;
    createdAt: Date;
};

export type Contact = {
    id: number;
    userId: string;
    email: string;
    title: string;
    content: string;
}