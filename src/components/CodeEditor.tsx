import React, { useState } from 'react';
import { Play, RotateCcw, Copy, Check } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { executePython } from '@/lib/pythonInterpreter';

interface CodeEditorProps {
  initialCode: string;
  expectedOutput?: string;
  onRun?: (code: string) => string;
  readOnly?: boolean;
  title?: string;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  initialCode,
  expectedOutput,
  onRun,
  readOnly = false,
  title = "Editor de Código"
}) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleRun = () => {
    setIsRunning(true);
    setTimeout(() => {
      const result = onRun ? onRun(code) : executePython(code);
      setOutput(result);
      setIsRunning(false);
    }, 300);
  };

  const handleReset = () => {
    setCode(initialCode);
    setOutput('');
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl overflow-hidden border border-border shadow-lg">
      {/* Header */}
      <div className="bg-code-bg px-4 py-3 flex items-center justify-between border-b border-border/30">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-destructive/80" />
            <div className="w-3 h-3 rounded-full bg-warning/80" />
            <div className="w-3 h-3 rounded-full bg-success/80" />
          </div>
          <span className="text-code-foreground/70 text-sm font-mono ml-2">{title}</span>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="text-code-foreground/70 hover:text-code-foreground hover:bg-code-foreground/10"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
          {!readOnly && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="text-code-foreground/70 hover:text-code-foreground hover:bg-code-foreground/10"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Code Area */}
      <div className="relative">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          readOnly={readOnly}
          className={cn(
            "w-full min-h-[200px] p-4 font-mono text-sm resize-none focus:outline-none",
            "bg-code-bg text-code-foreground leading-relaxed",
            readOnly && "cursor-default"
          )}
          spellCheck={false}
        />
      </div>

      {/* Run Button */}
      <div className="bg-code-bg px-4 py-3 border-t border-border/30">
        <Button
          onClick={handleRun}
          disabled={isRunning}
          variant="hero"
          size="sm"
          className="gap-2"
        >
          <Play className="h-4 w-4" />
          {isRunning ? 'Ejecutando...' : 'Ejecutar'}
        </Button>
      </div>

      {/* Output */}
      {output && (
        <div className="border-t border-border/30">
          <div className="bg-muted/50 px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Salida
          </div>
          <pre className="bg-card p-4 font-mono text-sm text-foreground whitespace-pre-wrap">
            {output}
          </pre>
        </div>
      )}
    </div>
  );
};
