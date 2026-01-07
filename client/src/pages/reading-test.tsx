import { ReadingExercise } from "@/components/exercises/reading-exercise";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function ReadingTest() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Reading Practice Test</h1>
            <p className="text-muted-foreground">
              Test the reading practice functionality with DAF and voice recording.
            </p>
          </div>
          
          <ReadingExercise />
        </div>
      </section>
      
      <Footer />
    </div>
  );
}