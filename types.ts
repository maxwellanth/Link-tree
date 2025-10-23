
export type TranscriptItem =
  | { type: 'output'; text: string; typed?: boolean; }
  | { type: 'command'; text: string; }
  | { type: 'pause'; duration: number; }
  | { type: 'special'; action: 'load_ascii'; command: string; };

export interface RenderedLine {
  id: number;
  type: 'command' | 'output' | 'ascii';
  text: string;
}
