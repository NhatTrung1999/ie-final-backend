export class CreateHistoryPlaybackDto {
  id_historyplayback: string;
  id_tablect: number | null;
  start_time: number;
  end_time: number;
  type: string;
  created_by: string;
  created_at: string;
}
