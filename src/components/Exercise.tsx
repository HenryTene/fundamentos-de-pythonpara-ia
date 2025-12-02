import React, { useState } from 'react';
import { CheckCircle2, XCircle, Lightbulb, RefreshCw } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

interface ExerciseProps {
  question: string;
  options?: { value: string; label: string }[];
  correctAnswer: string;
  hint?: string;
  explanation?: string;
  type?: 'multiple-choice' | 'fill-blank' | 'code';
  codeTemplate?: string;
}

export const Exercise: React.FC<ExerciseProps> = ({
  question,
  options,
  correctAnswer,
  hint,
  explanation,
  type = 'multiple-choice',
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const isCorrect = selectedAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase();

  const handleSubmit = () => {
    if (selectedAnswer) {
      setIsSubmitted(true);
    }
  };

  const handleReset = () => {
    setSelectedAnswer('');
    setIsSubmitted(false);
    setShowHint(false);
  };

  return (
    <div className="exercise-card animate-fade-in">
      <h4 className="font-semibold text-lg text-foreground mb-4">{question}</h4>

      {type === 'multiple-choice' && options && (
        <div className="space-y-2 mb-4">
          {options.map((option) => (
            <label
              key={option.value}
              className={cn(
                "flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all duration-200",
                selectedAnswer === option.value
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50 hover:bg-muted/50",
                isSubmitted && option.value === correctAnswer && "border-success bg-success/10",
                isSubmitted && selectedAnswer === option.value && !isCorrect && "border-destructive bg-destructive/10"
              )}
            >
              <input
                type="radio"
                name="answer"
                value={option.value}
                checked={selectedAnswer === option.value}
                onChange={(e) => !isSubmitted && setSelectedAnswer(e.target.value)}
                disabled={isSubmitted}
                className="sr-only"
              />
              <div
                className={cn(
                  "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors",
                  selectedAnswer === option.value
                    ? "border-primary bg-primary"
                    : "border-muted-foreground"
                )}
              >
                {selectedAnswer === option.value && (
                  <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                )}
              </div>
              <code className="font-mono text-sm">{option.label}</code>
            </label>
          ))}
        </div>
      )}

      {type === 'fill-blank' && (
        <input
          type="text"
          value={selectedAnswer}
          onChange={(e) => !isSubmitted && setSelectedAnswer(e.target.value)}
          disabled={isSubmitted}
          placeholder="Escribe tu respuesta..."
          className={cn(
            "w-full p-3 rounded-lg border-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all",
            isSubmitted && isCorrect && "border-success bg-success/10",
            isSubmitted && !isCorrect && "border-destructive bg-destructive/10",
            !isSubmitted && "border-border bg-background"
          )}
        />
      )}

      {/* Feedback */}
      {isSubmitted && (
        <div
          className={cn(
            "mt-4 p-4 rounded-lg flex items-start gap-3 animate-slide-up",
            isCorrect ? "success-feedback" : "error-feedback"
          )}
        >
          {isCorrect ? (
            <CheckCircle2 className="h-5 w-5 flex-shrink-0 mt-0.5" />
          ) : (
            <XCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
          )}
          <div>
            <p className="font-semibold">
              {isCorrect ? '¡Correcto!' : 'Incorrecto'}
            </p>
            {!isCorrect && (
              <p className="text-sm mt-1">
                La respuesta correcta es: <code className="font-mono bg-background/50 px-1 rounded">{correctAnswer}</code>
              </p>
            )}
            {explanation && (
              <p className="text-sm mt-2 opacity-90">{explanation}</p>
            )}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-wrap gap-3 mt-4">
        {!isSubmitted ? (
          <>
            <Button onClick={handleSubmit} disabled={!selectedAnswer}>
              Verificar Respuesta
            </Button>
            {hint && (
              <Button variant="outline" onClick={() => setShowHint(!showHint)}>
                <Lightbulb className="h-4 w-4 mr-2" />
                Pista
              </Button>
            )}
          </>
        ) : (
          <Button variant="outline" onClick={handleReset}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Intentar de nuevo
          </Button>
        )}
      </div>

      {/* Hint */}
      {showHint && hint && !isSubmitted && (
        <div className="mt-4 p-4 rounded-lg bg-warning/10 border border-warning/30 text-warning-foreground animate-fade-in">
          <div className="flex items-start gap-2">
            <Lightbulb className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
            <p className="text-sm">{hint}</p>
          </div>
        </div>
      )}
    </div>
  );
};
