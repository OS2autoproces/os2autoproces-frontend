export interface IAttachment {
  fileName: string;
  id?: number;
  url?: string;
  uploading?: boolean;
}

export interface DetailsState {
  interval: string | null;
  intervalDisabled: boolean;
  attachments: IAttachment[];
  attachmentsDisabled: boolean;
}
