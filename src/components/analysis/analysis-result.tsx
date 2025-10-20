import { Card, CardBody, CardHeader, Chip, Progress } from "@heroui/react";

interface AnalysisResult {
  hasAutismTraits: boolean;
  confidence: number;
  traits: string[];
  recommendations: string[];
}

interface AnalysisResultProps {
  result: AnalysisResult;
  onNewAnalysis: () => void;
}

export function AnalysisResult({ result, onNewAnalysis }: AnalysisResultProps) {
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return "success";
    if (confidence >= 60) return "warning";
    return "danger";
  };

  const getResultColor = (hasTraits: boolean) => {
    return hasTraits ? "warning" : "success";
  };

  return (
    <div className="space-y-6">
      <Card className="border border-default-200">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between w-full">
            <h3 className="text-xl font-semibold text-foreground">
              Resultado da Análise
            </h3>
            <Chip
              color={getResultColor(result.hasAutismTraits)}
              variant="flat"
              size="lg"
            >
              {result.hasAutismTraits ? "Traços Identificados" : "Sem Traços Identificados"}
            </Chip>
          </div>
        </CardHeader>
        <CardBody className="space-y-6">
          {/* Nível de Confiança */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">
                Nível de Confiança
              </span>
              <span className="text-sm text-foreground/70">
                {result.confidence}%
              </span>
            </div>
            <Progress
              value={result.confidence}
              color={getConfidenceColor(result.confidence)}
              className="w-full"
            />
            <p className="text-xs text-foreground/60">
              {result.confidence >= 80
                ? "Alta confiabilidade na análise"
                : result.confidence >= 60
                ? "Confiabilidade moderada - recomenda-se análise adicional"
                : "Baixa confiabilidade - resultados inconclusivos"
              }
            </p>
          </div>

          {/* Traços Identificados */}
          {result.traits.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-foreground">
                Traços Observados
              </h4>
              <div className="space-y-2">
                {result.traits.map((trait, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-warning-50 rounded-medium border border-warning-200">
                    <div className="w-2 h-2 bg-warning-500 rounded-full flex-shrink-0"></div>
                    <span className="text-sm text-foreground">{trait}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recomendações */}
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-foreground">
              Recomendações
            </h4>
            <div className="space-y-2">
              {result.recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-primary-50 rounded-medium border border-primary-200">
                  <div className="w-5 h-5 bg-primary-500 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5">
                    <span className="text-white text-xs font-bold">{index + 1}</span>
                  </div>
                  <span className="text-sm text-foreground">{recommendation}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="p-4 bg-default-100 rounded-medium border-l-4 border-l-warning-500">
            <h5 className="font-semibold text-foreground text-sm mb-2">
              ⚠️ Importante
            </h5>
            <p className="text-xs text-foreground/70 leading-relaxed">
              Esta análise é apenas uma ferramenta de apoio e não substitui o diagnóstico profissional.
              Para um diagnóstico definitivo, consulte sempre um profissional de saúde especializado em
              transtornos do espectro autista.
            </p>
          </div>

          {/* Botão para nova análise */}
          <div className="pt-4 border-t border-default-200">
            <button
              onClick={onNewAnalysis}
              className="text-primary hover:text-primary-600 font-medium text-sm transition-colors"
            >
              Fazer nova análise →
            </button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}