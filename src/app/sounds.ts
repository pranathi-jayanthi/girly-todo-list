// Sound effect utility
class SoundEffect {
  private audio: HTMLAudioElement | null = null;

  constructor(private url: string) {}

  play() {
    if (typeof window !== 'undefined') {
      if (!this.audio) {
        this.audio = new Audio(this.url);
      }
      this.audio.currentTime = 0;
      this.audio.play().catch(() => {});
    }
  }
}

export const sounds = {
  pop: new SoundEffect('/sounds/pop.mp3'),
  sparkle: new SoundEffect('/sounds/sparkle.mp3'),
  complete: new SoundEffect('/sounds/complete.mp3'),
  delete: new SoundEffect('/sounds/delete.mp3'),
  hover: new SoundEffect('/sounds/hover.mp3'),
}; 