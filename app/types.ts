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
    pictureUrl: string;
    visited: boolean;
};