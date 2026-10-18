// Web Audio API synthesizer for ambient Uzbek wedding instrumental music

class WeddingMusicSynth {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timer: number | null = null;
  private currentNoteIndex = 0;

  // Traditional Uzbek joyful festive scale (Hijaz / Bayati / Segah feel with gentle pentatonic warmth)
  // Frequency in Hz for warm festive santur / chime melodies
  private notes = [
    261.63, // C4
    293.66, // D4
    329.63, // E4
    349.23, // F4
    392.00, // G4
    440.00, // A4
    493.88, // B4
    523.25, // C5
    587.33, // D5
    659.25, // E5
    783.99, // G5
  ];

  // Joyful traditional melody loop steps (scale degree indices and rhythmic timing)
  private melodyPattern = [
    { note: 4, dur: 450, oct: 1 }, // G4
    { note: 7, dur: 450, oct: 1 }, // C5
    { note: 8, dur: 300, oct: 1 }, // D5
    { note: 9, dur: 600, oct: 1 }, // E5
    { note: 8, dur: 300, oct: 1 }, // D5
    { note: 7, dur: 450, oct: 1 }, // C5
    { note: 6, dur: 450, oct: 1 }, // B4
    { note: 5, dur: 600, oct: 1 }, // A4
    { note: 4, dur: 450, oct: 1 }, // G4
    { note: 2, dur: 450, oct: 1 }, // E4
    { note: 4, dur: 600, oct: 1 }, // G4
    { note: 7, dur: 800, oct: 1 }, // C5
  ];

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public play(onStep?: () => void) {
    if (this.isPlaying) return;
    this.initContext();
    this.isPlaying = true;
    this.currentNoteIndex = 0;
    this.scheduleNext(onStep);
  }

  public pause() {
    this.isPlaying = false;
    if (this.timer) {
      window.clearTimeout(this.timer);
      this.timer = null;
    }
  }

  public toggle(onStep?: () => void): boolean {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.play(onStep);
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  private scheduleNext(onStep?: () => void) {
    if (!this.isPlaying || !this.ctx) return;

    const current = this.melodyPattern[this.currentNoteIndex % this.melodyPattern.length];
    const freq = this.notes[current.note];

    this.playTone(freq, current.dur / 1000);
    if (onStep) onStep();

    this.currentNoteIndex++;
    this.timer = window.setTimeout(() => {
      this.scheduleNext(onStep);
    }, current.dur);
  }

  private playTone(freq: number, duration: number) {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    // Primary bell / santur oscillator (sine + soft triangle blend)
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, now);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2, now); // 1 octave overtone

    // Envelope for warm string / santur pluck
    gainNode.gain.setValueAtTime(0.0001, now);
    gainNode.gain.exponentialRampToValueAtTime(0.08, now + 0.04);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + Math.max(duration * 1.5, 0.4));

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(this.ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + duration * 1.6);
    osc2.stop(now + duration * 1.6);
  }
}

export const weddingAudio = new WeddingMusicSynth();
