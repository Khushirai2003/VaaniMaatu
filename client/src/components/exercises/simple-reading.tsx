import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Square, Mic, ChevronLeft, ChevronRight } from "lucide-react";

export function SimpleReading() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState<string | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [currentPassageIndex, setCurrentPassageIndex] = useState(0);

  const passages = [
    {
      title: "The Rainbow Passage ",
      text: `Once upon a time, there was a beautiful garden behind an old house. The garden was full of colorful flowers and tall trees. Every morning, children would come to play in this magical place.

The garden had a small pond with fish swimming in it. Birds would sing sweet songs from the branches above. The children loved to sit under the big oak tree and tell stories to each other.`
    },
    {
      title: "The Wise Old Owl",
      text: `In a tall oak tree lived a wise old owl. Every night, the owl would watch over the forest and all the animals that lived there. The other animals would come to the owl for advice when they had problems.

One day, a young rabbit came to the owl feeling very sad. The owl listened carefully and gave the rabbit some wise words that made him feel much better.`
    },
    {
      title: "The Magic Library",
      text: `There was a special library in the center of town where books could come alive. When children opened a book, they could step inside and become part of the story. Adventures awaited them on every page.

Many children visited this magical place to explore new worlds. They would meet dragons, sail across oceans, and discover hidden treasures. Each book was a doorway to a new adventure.`
    },
    {
      title: "The Friendly Baker",
      text: `Mr. Johnson was the kindest baker in the whole village. Every morning, he would wake up early to bake fresh bread and delicious pastries. The smell of his baking would fill the entire street.

Children loved to visit his bakery after school. Mr. Johnson would always give them a free cookie and tell them wonderful stories about his travels around the world.`
    },
    {
      title: "The Little Star",
      text: `High up in the sky lived a little star who felt very small compared to all the other bright stars. Every night, she would try her best to shine, but she thought no one could see her tiny light.

One evening, a lost child looked up at the sky and saw her gentle glow. The little star's light helped guide the child safely home. From that day on, she knew that even the smallest light can make a big difference.`
    }
  ];

  const currentPassage = passages[currentPassageIndex];

  const startRecording = async () => {
    try {
      // Clear previous recording when starting new one
      setRecordedAudio(null);
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];

      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setRecordedAudio(url);
        stream.getTracks().forEach(track => track.stop());
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
    } catch (error) {
      alert('Microphone access denied. Please allow microphone access.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  const playRecording = () => {
    if (recordedAudio) {
      const audio = new Audio(recordedAudio);
      audio.volume = 1.0; // Maximum volume
      audio.play().catch(error => {
        console.error('Error playing audio:', error);
        alert('Error playing recording');
      });
    }
  };

  const nextPassage = () => {
    if (currentPassageIndex < passages.length - 1) {
      setCurrentPassageIndex(currentPassageIndex + 1);
      setRecordedAudio(null); // Clear recording for new passage
    }
  };

  const previousPassage = () => {
    if (currentPassageIndex > 0) {
      setCurrentPassageIndex(currentPassageIndex - 1);
      setRecordedAudio(null); // Clear recording for new passage
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Reading Practice</h2>
        
        {/* Passage Navigation */}
        <div className="flex items-center justify-between mb-6">
          <Button
            onClick={previousPassage}
            disabled={currentPassageIndex === 0}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>
          
          <div className="text-center">
            <div className="text-sm text-gray-500">Passage {currentPassageIndex + 1} of {passages.length}</div>
            <div className="font-semibold">{currentPassage.title}</div>
          </div>
          
          <Button
            onClick={nextPassage}
            disabled={currentPassageIndex === passages.length - 1}
            variant="outline"
            className="flex items-center gap-2"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Reading Text */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg mb-6 border-2 border-blue-200">
          <h3 className="text-xl font-semibold mb-4 text-blue-800">{currentPassage.title}</h3>
          <div className="text-lg leading-relaxed text-gray-800">
            {currentPassage.text.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Controls */}
        <Card className="p-6 bg-blue-50">
          <h3 className="text-lg font-semibold mb-4">Reading Practice Controls</h3>
          
          <div className="space-y-4">
            <Button
              onClick={isRecording ? stopRecording : startRecording}
              className={`w-full py-3 text-lg ${
                isRecording 
                  ? 'bg-red-500 hover:bg-red-600' 
                  : 'bg-orange-500 hover:bg-orange-600'
              }`}
            >
              {isRecording ? (
                <>
                  <Square className="w-5 h-5 mr-2" />
                  Stop Recording
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 mr-2" />
                  Start Reading & Recording
                </>
              )}
            </Button>

            {isRecording && (
              <div className="text-center p-4 bg-red-100 rounded-lg">
                <div className="flex items-center justify-center gap-2 text-red-600 font-medium">
                  <Mic className="w-4 h-4" />
                  🔴 Recording... Read the passage above
                </div>
              </div>
            )}

            {recordedAudio && !isRecording && (
              <div className="space-y-3">
                <div className="text-center p-4 bg-green-100 rounded-lg">
                  <div className="text-green-600 font-medium">
                    ✅ Recording saved! Click below to listen.
                  </div>
                </div>
                <Button
                  onClick={playRecording}
                  variant="outline"
                  className="w-full py-3"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Play Your Recording
                </Button>
              </div>
            )}
          </div>

          {/* Exercise Tips */}
          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <h4 className="font-medium mb-2 text-sm">Exercise Tips</h4>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• Read slowly and clearly. Focus on pronunciation.</li>
              <li>• Take your time with each word.</li>
              <li>• Practice makes perfect!</li>
            </ul>
          </div>
        </Card>
      </Card>
    </div>
  );
}