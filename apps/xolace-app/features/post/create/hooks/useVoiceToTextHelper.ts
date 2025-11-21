import { useCallback, useEffect, useMemo, useState } from 'react';

import {
  AudioModule,
  RecordingPresets,
  setAudioModeAsync,
  useAudioRecorder,
  useAudioRecorderState,
} from 'expo-audio';

type UseVoiceToTextHelperArgs = {
  onTranscriptionComplete?: (text: string) => void;
  onError?: (message: string) => void;
};

const normalizeMetering = (value?: number) => {
  if (typeof value !== 'number') return 0.05;
  const clamped = Math.min(0, Math.max(-160, value));
  return (clamped + 160) / 160;
};

const formatDuration = (millis: number) => {
  const totalSeconds = Math.max(0, Math.floor(millis / 1000));
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
};

export const useVoiceToTextHelper = ({
  onTranscriptionComplete,
  onError,
}: UseVoiceToTextHelperArgs) => {
  const recorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const recorderState = useAudioRecorderState(recorder, 150);

  const [isPreparing, setIsPreparing] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [bars, setBars] = useState<number[]>(
    Array.from({ length: 30 }, () => 0.08),
  );

  const isRecording = recorderState.isRecording ?? false;
  const durationLabel = formatDuration(recorderState.durationMillis ?? 0);

  useEffect(() => {
    if (!recorderState.isRecording) return;
    const nextValue = normalizeMetering(recorderState.metering);
    setBars((prev) => {
      const trimmed = prev.slice(prev.length > 28 ? 1 : 0);
      return [...trimmed, nextValue];
    });
  }, [recorderState.isRecording, recorderState.metering]);

  const ensureMicPermission = useCallback(async () => {
    const permission = await AudioModule.requestRecordingPermissionsAsync();
    if (!permission.granted) {
      throw new Error('Microphone permission is required to record.');
    }
  }, []);

  const startRecording = useCallback(async () => {
    try {
      setIsPreparing(true);
      await ensureMicPermission();
      await setAudioModeAsync({
        allowsRecording: true,
        playsInSilentMode: true,
      });
      setBars(Array.from({ length: 30 }, () => 0.08));
      await recorder.prepareToRecordAsync();
      recorder.record();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Unable to start recording. Please try again.';
      onError?.(message);
    } finally {
      setIsPreparing(false);
    }
  }, [ensureMicPermission, onError, recorder]);

  const performTranscription = useCallback(
    async (_uri: string) => {
      setIsTranscribing(true);
      try {
        // Placeholder: replace with Supabase + AssemblyAI call.
        await new Promise((resolve) => setTimeout(resolve, 1400));
        const text = 'Transcribed voice note.';
        onTranscriptionComplete?.(text);
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : 'Transcription failed. Please retry.';
        onError?.(message);
      } finally {
        setIsTranscribing(false);
      }
    },
    [onError, onTranscriptionComplete],
  );

  const stopRecording = useCallback(async () => {
    try {
      const uriBeforeStop = recorderState.url ?? recorder.uri;
      await recorder.stop();
      const uri = recorderState.url ?? uriBeforeStop ?? recorder.uri;
      if (uri) {
        console.log("uri : ", uri)
        void performTranscription(uri);
      } else {
        onError?.('No recording found to transcribe.');
      }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Unable to stop recording. Please try again.';
      onError?.(message);
    }
  }, [onError, performTranscription, recorder, recorderState.url]);

  const toggleRecording = useCallback(() => {
    if (isRecording) {
      return stopRecording();
    }
    if (!isTranscribing) {
      return startRecording();
    }
    return undefined;
  }, [isRecording, isTranscribing, startRecording, stopRecording]);

  const isBusy = useMemo(
    () => isRecording || isPreparing || isTranscribing,
    [isPreparing, isRecording, isTranscribing],
  );

  return {
    isRecording,
    isPreparing,
    isTranscribing,
    isBusy,
    bars,
    durationLabel,
    startRecording,
    stopRecording,
    toggleRecording,
  };
};
