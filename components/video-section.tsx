import { Card } from "@/components/ui/card";

export default function VideoSection() {
  return (
    <Card className="w-full overflow-hidden">
      <div className="aspect-video relative">
        <iframe
          src="https://www.youtube.com/embed/-XFp03G4z68?si=xNu441TeWb8dNmE-"
          title="Space Exploration Video"
          className="absolute top-0 left-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          loading="lazy"
          allowFullScreen
        />
      </div>
    </Card>
  );
}

