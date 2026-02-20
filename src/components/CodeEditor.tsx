import React, { useState, useRef, useCallback } from 'react';
import { Play, RotateCcw, Copy, Check } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { executePython } from '@/lib/pythonInterpreter';

const PYTHON_KEYWORDS = new Set([
  'False','None','True','and','as','assert','async','await','break','class',
  'continue','def','del','elif','else','except','finally','for','from','global',
  'if','import','in','is','lambda','nonlocal','not','or','pass','raise',
  'return','try','while','with','yield','print','range','len','type','int',
  'float','str','list','dict','set','tuple','bool','input','enumerate','append',
]);

const BUILTINS = new Set(['print','range','len','type','int','float','str','list','dict','set','tuple','bool','input','enumerate']);

function highlightLine(line: string): React.ReactNode[] {
  // Comment line
  const commentIdx = findCommentStart(line);
  if (commentIdx === 0) {
    return [<span key="c" className="text-code-comment italic">{line}</span>];
  }

  const parts: React.ReactNode[] = [];
  const codePart = commentIdx >= 0 ? line.slice(0, commentIdx) : line;
  const commentPart = commentIdx >= 0 ? line.slice(commentIdx) : null;

  // Tokenize code part
  const tokenRegex = /("""[\s\S]*?"""|'''[\s\S]*?'''|f"[^"]*"|f'[^']*'|"[^"]*"|'[^']*'|\b\d+\.?\d*\b|[a-zA-Z_]\w*|[^\s]|\s+)/g;
  let match: RegExpExecArray | null;
  let i = 0;
  while ((match = tokenRegex.exec(codePart)) !== null) {
    const token = match[0];
    const key = `t${i++}`;
    if (/^(f?["'])/.test(token) && (token.startsWith('"') || token.startsWith("'") || token.startsWith('f"') || token.startsWith("f'"))) {
      parts.push(<span key={key} className="text-code-string">{token}</span>);
    } else if (/^\d/.test(token)) {
      parts.push(<span key={key} className="text-code-number">{token}</span>);
    } else if (PYTHON_KEYWORDS.has(token)) {
      parts.push(<span key={key} className={BUILTINS.has(token) ? "text-code-number" : "text-code-keyword font-semibold"}>{token}</span>);
    } else if (token === '=' || token === '+' || token === '-' || token === '*' || token === '/' || token === '<' || token === '>' || token === '!' || token === ':') {
      parts.push(<span key={key} className="text-foreground/70">{token}</span>);
    } else {
      parts.push(<span key={key}>{token}</span>);
    }
  }

  if (commentPart) {
    parts.push(<span key="comment" className="text-code-comment italic">{commentPart}</span>);
  }

  return parts;
}

function findCommentStart(line: string): number {
  let inSingle = false, inDouble = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"' && !inSingle) inDouble = !inDouble;
    else if (ch === "'" && !inDouble) inSingle = !inSingle;
    else if (ch === '#' && !inSingle && !inDouble) return i;
  }
  return -1;
}

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

      {/* Code Area - overlay approach */}
      <div className="relative">
        {/* Highlighted layer */}
        <pre
          className="w-full min-h-[200px] p-4 font-mono text-sm leading-relaxed bg-code-bg text-code-foreground whitespace-pre-wrap break-words pointer-events-none"
          aria-hidden="true"
        >
          {code.split('\n').map((line, i) => (
            <React.Fragment key={i}>
              {i > 0 && '\n'}
              {highlightLine(line)}
            </React.Fragment>
          ))}
        </pre>
        {/* Editable transparent textarea on top */}
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          readOnly={readOnly}
          className={cn(
            "absolute inset-0 w-full h-full p-4 font-mono text-sm resize-none focus:outline-none",
            "bg-transparent text-transparent caret-code-foreground leading-relaxed",
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
