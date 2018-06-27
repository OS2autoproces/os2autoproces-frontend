export interface Attachment {
  id: number;
  fileName: string;
  url: string;
}

export interface DetailsState {
  interval: string | null;
  intervalDisabled: boolean;
  attachments: Attachment[];
  attachmentsDisabled: boolean;
}
