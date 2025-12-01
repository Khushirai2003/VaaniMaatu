import { VoiceRecorder } from "@/components/audio/voice-recorder";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function VoiceTest() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Voice Recording Test</h1>
            <p className="text-muted-foreground">
              Test your microphone by recording your voice and playing it back.
            </p>
          </div>
          
          <VoiceRecorder />
          
          <div className="mt-8 p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Instructions:</h3>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>Click "Start Recording" to begin recording your voice</li>
              <li>Speak clearly into your microphone</li>
              <li>Click "Stop Recording" when finished</li>
              <li>Click "Play Recording" to listen to your recorded voice</li>
            </ol>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}