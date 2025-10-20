import { UserButton, useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { AnalysisResult } from "../../components/analysis/analysis-result";
import { ImageUpload } from "../../components/analysis/image-upload";
import { ProtectedRoute } from "../../components/auth/protected-route";

interface AnalysisResultData {
  hasAutismTraits: boolean;
  confidence: number;
  traits: string[];
  recommendations: string[];
}

function HomeContent() {
  const { user } = useUser();
  const [analysisResult, setAnalysisResult] = useState<AnalysisResultData | null>(null);

  const handleAnalysisComplete = (result: AnalysisResultData) => {
    setAnalysisResult(result);
  };

  const handleNewAnalysis = () => {
    setAnalysisResult(null);
  };

  return (
    <div className="max-w-6xl mx-auto max-sm:mx-8 py-4">
      <header className="flex justify-between items-center py-14">
        <div>
          <h1 className="text-3xl max-md:mr-8 font-bold text-foreground">
            Bem-vindo ao ASD App
          </h1>
          <p className="text-foreground/70 mt-2">
            Olá, {user?.firstName || user?.emailAddresses[0].emailAddress}!
          </p>
        </div>
        <div className="flex items-center h-10">
          <UserButton
            appearance={{
              elements: {
                userButtonPopoverCard: "bg-content1 border border-default-200",
                userButtonPopoverFooter: "hidden"
              }
            }}
          />
        </div>
      </header>

      <div className="flex flex-col gap-10">
        {/* Seção de Análise */}
        <div className="space-y-6">
          <div className="p-6 rounded-large border border-primary">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Análise de Autismo por Imagem
            </h2>
            <p className="text-foreground/70 mb-6">
              Envie uma imagem para análise automática de possíveis traços do espectro autista.
            </p>
            <ImageUpload onAnalysisComplete={handleAnalysisComplete} />
          </div>
        </div>

        {/* Resultado da Análise */}
        <div className="space-y-6">
          {analysisResult ? (
            <AnalysisResult
              result={analysisResult}
              onNewAnalysis={handleNewAnalysis}
            />
          ) : (
            <div className="p-6 rounded-large border border-primary border-dashed">
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-primary/90 rounded-large flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-default-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Aguardando Análise...
                </h3>
                <p className="text-foreground/70 text-sm">
                  Os resultados da análise aparecerão aqui após o envio da imagem.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <ProtectedRoute>
      <HomeContent />
    </ProtectedRoute>
  );
}