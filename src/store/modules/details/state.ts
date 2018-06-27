export interface Attachment {
  fileName: string;
  id?: number;
  url?: string;
  uploading?: boolean;
}

export interface DetailsState {
  interval: string | null;
  intervalDisabled: boolean;
  attachments: Attachment[];
  attachmentsDisabled: boolean;
}
