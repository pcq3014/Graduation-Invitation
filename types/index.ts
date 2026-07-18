export interface CountdownValue {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isFinished: boolean;
}

export interface PlayerState {
  isPlaying: boolean;
  progress: number;
  duration: number;
  volume: number;
  isMinimized: boolean;
}

export interface MousePosition {
  x: number;
  y: number;
}
