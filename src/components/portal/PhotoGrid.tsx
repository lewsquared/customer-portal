import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Photo {
  url?: string;
  caption: string;
  emoji?: string;
}

export const PhotoGrid = ({ photos }: { photos: Photo[] }) => {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const prev = () =>
    setLightboxIdx((i) => (i !== null ? Math.max(0, i - 1) : null));
  const next = () =>
    setLightboxIdx((i) =>
      i !== null ? Math.min(photos.length - 1, i + 1) : null
    );

  return (
    <>
      <div className="grid grid-cols-3 gap-2">
        {photos.map((photo, i) => (
          <button
            key={i}
            onClick={() => setLightboxIdx(i)}
            className="group relative w-full overflow-hidden rounded-xl border border-border bg-secondary transition-transform duration-100 ease-out active:duration-75 active:scale-[0.97]"
            style={{ aspectRatio: "3/4" }}
          >
            {photo.url ? (
              <img
                src={photo.url}
                alt={photo.caption}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-3xl">
                {photo.emoji ?? "📷"}
              </div>
            )}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-2 pb-1.5 pt-4">
              <p className="truncate text-[10px] font-medium text-white">
                {photo.caption}
              </p>
            </div>
          </button>
        ))}
      </div>

      {lightboxIdx !== null && (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-black/95 animate-fade-in"
          onClick={() => setLightboxIdx(null)}
        >
          <div
            className="flex flex-1 flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3">
              <p className="text-sm font-semibold text-white">
                {photos[lightboxIdx].caption}
              </p>
              <div className="flex items-center gap-3">
                <span className="text-xs text-white/70">
                  {lightboxIdx + 1} / {photos.length}
                </span>
                <button
                  onClick={() => setLightboxIdx(null)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex flex-1 items-center justify-center px-4">
              <div
                className="w-full max-w-md overflow-hidden rounded-2xl bg-secondary"
                style={{ aspectRatio: "3/4" }}
              >
                {photos[lightboxIdx].url ? (
                  <img
                    src={photos[lightboxIdx].url}
                    alt={photos[lightboxIdx].caption}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-7xl">
                    {photos[lightboxIdx].emoji ?? "📷"}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 px-6 pb-8 pt-4">
              <button
                onClick={prev}
                disabled={lightboxIdx === 0}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white disabled:opacity-30"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div className="flex items-center gap-1.5">
                {photos.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setLightboxIdx(i)}
                    className={cn(
                      "h-1.5 rounded-full bg-white transition-all duration-200",
                      i === lightboxIdx ? "w-5" : "w-1.5 opacity-40"
                    )}
                  />
                ))}
              </div>
              <button
                onClick={next}
                disabled={lightboxIdx === photos.length - 1}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white disabled:opacity-30"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
