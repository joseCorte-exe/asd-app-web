import { Button } from "@heroui/react";
import { useRef, useState } from "react";

interface AnalysisResult {
  hasAutismTraits: boolean;
  confidence: number;
  traits: string[];
  recommendations: string[];
}

interface ImageUploadProps {
  onAnalysisComplete: (result: AnalysisResult) => void;
}

export function ImageUpload({ onAnalysisComplete }: ImageUploadProps) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const analyzeImage = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);

    // Simular análise - substituir por API real
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Resultado simulado
    const mockResult: AnalysisResult = {
      hasAutismTraits: Math.random() > 0.5,
      confidence: Math.round((Math.random() * 0.3 + 0.7) * 100),
      traits: [
        "Contato visual reduzido",
        "Expressões faciais atípicas",
        "Padrões de movimento repetitivos"
      ].filter(() => Math.random() > 0.5),
      recommendations: [
        "Consulte um profissional especializado",
        "Observe comportamentos em diferentes contextos",
        "Mantenha um diário de observações"
      ]
    };

    setIsAnalyzing(false);
    onAnalysisComplete(mockResult);
  };

  const resetUpload = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6">
      {!selectedImage ? (
        <div
          className="border-2 border-dashed border-default-300 rounded-large p-8 text-center cursor-pointer hover:border-primary transition-colors"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-primary/90 rounded-large flex items-center justify-center">
              <svg className="w-8 h-8 text-default-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Envie uma imagem para análise
              </h3>
              <p className="text-foreground/70 text-sm">
                Arraste e solte uma imagem aqui ou clique para selecionar
              </p>
              <p className="text-foreground/50 text-xs mt-2">
                Formatos suportados: JPG, PNG, WebP (máx. 10MB)
              </p>
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
          />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-content1 rounded-large p-4 border border-default-200">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <img
                  src={previewUrl || ''}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-medium border border-default-200"
                />
              </div>
              <div className="flex-1 space-y-3">
                <div>
                  <h4 className="font-semibold text-foreground">{selectedImage.name}</h4>
                  <p className="text-sm text-foreground/70">
                    {(selectedImage.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    color="primary"
                    onClick={analyzeImage}
                    isLoading={isAnalyzing}
                    disabled={isAnalyzing}
                  >
                    {isAnalyzing ? "Analisando..." : "Analisar Imagem"}
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={resetUpload}
                    disabled={isAnalyzing}
                  >
                    Trocar Imagem
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}