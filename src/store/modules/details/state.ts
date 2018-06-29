export interface Comment {
  name: string;
  message: string;
  created: string;
}

export interface IAttachment {
  fileName: string;
  id?: number;
  url?: string;
  uploading?: boolean;
}

export interface DetailsState {
  interval: string | null;
  intervalDisabled: boolean;
  comments: Comment[];
  attachments: IAttachment[];
  attachmentsDisabled: boolean;
}
