import { useEffect, useRef, useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Camera, X } from "lucide-react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  photos: string[];
  onApply: (photos: string[]) => void;
}

export function DelicateItemsSheet({ open, onOpenChange, photos, onApply }: Props) {
  const [local, setLocal] = useState<string[]>(photos);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) setLocal(photos);
  }, [open, photos]);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const readers = Array.from(files).map(
      (file) =>
        new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = () => reject(reader.error);
          reader.readAsDataURL(file);
        }),
    );
    Promise.all(readers)
      .then((urls) => setLocal((prev) => [...prev, ...urls]))
      .catch((e) => console.error("Failed to read image files", e));
  };

  const removePhoto = (idx: number) => {
    setLocal((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="flex h-screen max-h-screen flex-col gap-0 border-0 p-0"
      >
        <SheetHeader className="flex-shrink-0 border-b border-border p-4 text-center">
          <SheetTitle className="text-base font-bold text-primary">Delicate Items & Stains</SheetTitle>
        </SheetHeader>

        <div className="flex-shrink-0 px-5 py-4">
          <p className="text-sm text-muted-foreground">
            Let us know which items need special attention
          </p>
        </div>

        <div className="flex-1 overflow-y-auto px-5 pb-4">
          <div className="grid grid-cols-3 gap-3">
            {local.map((src, idx) => (
              <div key={idx} className="relative aspect-square overflow-hidden rounded-xl border border-border bg-muted">
                <img src={src} alt={`Attached photo ${idx + 1}`} className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={() => removePhoto(idx)}
                  aria-label="Remove photo"
                  className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-destructive-foreground shadow"
                >
                  <X className="h-3.5 w-3.5" strokeWidth={3} />
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={() => cameraInputRef.current?.click()}
              className="flex aspect-square items-center justify-center rounded-xl border-2 border-dashed border-border bg-background text-primary transition-colors hover:bg-secondary/40"
              aria-label="Take a photo"
            >
              <Camera className="h-6 w-6" />
            </button>
          </div>

          <div className="mt-4 flex justify-center">
            <button
              type="button"
              onClick={() => galleryInputRef.current?.click()}
              className="text-sm font-semibold text-primary underline-offset-4 hover:underline"
            >
              Attach files
            </button>
          </div>

          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
          <input
            ref={galleryInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </div>

        <div className="flex-shrink-0 border-t border-border p-4">
          <Button
            onClick={() => {
              onApply(local);
              onOpenChange(false);
            }}
            className="h-12 w-full text-sm font-semibold"
          >
            Apply
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function delicateItemsSummary(photos: string[]): string {
  if (photos.length === 0) return "Let us know which items need special attention";
  if (photos.length === 1) return "1 photo attached";
  return `${photos.length} photos attached`;
}
