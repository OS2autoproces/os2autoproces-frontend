interface Comment {
    name: string;
    message: string;
    created: string;
}

export interface DetailsState {
    interval: string | null;
    intervalDisabled: boolean;
    comments: Comment[];
}


