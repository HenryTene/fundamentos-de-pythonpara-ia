import React, { useState } from 'react';
import { Play, RotateCcw, Copy, Check } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

interface CodeEditorProps {
  initialCode: string;
  expectedOutput?: string;
  onRun?: (code: string) => string;
  readOnly?: boolean;
  title?: string;
}

// Simple Python interpreter simulation
const executePython = (code: string): string => {
  const output: string[] = [];
  const variables: Record<string, any> = {};
  
  const lines = code.split('\n').filter(line => line.trim() && !line.trim().startsWith('#'));
  
  for (const line of lines) {
    try {
      // Handle print statements
      const printMatch = line.match(/print\s*\((.*)\)/);
      if (printMatch) {
        let content = printMatch[1].trim();
        
        // Handle f-strings
        if (content.startsWith('f"') || content.startsWith("f'")) {
          const quote = content[1];
          const inner = content.slice(2, -1);
          const result = inner.replace(/\{([^}]+)\}/g, (_, expr) => {
            return evaluateExpression(expr.trim(), variables);
          });
          output.push(result);
          continue;
        }
        
        // Handle string concatenation and multiple arguments
        if (content.includes(',')) {
          const parts = splitArguments(content);
          const evaluated = parts.map(p => evaluateExpression(p.trim(), variables));
          output.push(evaluated.join(' '));
          continue;
        }
        
        output.push(String(evaluateExpression(content, variables)));
        continue;
      }
      
      // Handle variable assignments
      const assignMatch = line.match(/^(\w+)\s*=\s*(.+)$/);
      if (assignMatch) {
        const [, varName, value] = assignMatch;
        variables[varName] = evaluateExpression(value.trim(), variables);
        continue;
      }
      
      // Handle for loops (simple version)
      const forMatch = line.match(/for\s+(\w+)\s+in\s+(.+):/);
      if (forMatch) {
        continue; // Skip loop declaration, handled in block parsing
      }
      
    } catch (e) {
      output.push(`Error: ${e}`);
    }
  }
  
  return output.join('\n') || '(Sin salida)';
};

const splitArguments = (str: string): string[] => {
  const args: string[] = [];
  let current = '';
  let depth = 0;
  let inString = false;
  let stringChar = '';
  
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    
    if ((char === '"' || char === "'") && str[i-1] !== '\\') {
      if (!inString) {
        inString = true;
        stringChar = char;
      } else if (char === stringChar) {
        inString = false;
      }
    }
    
    if (!inString) {
      if (char === '(' || char === '[' || char === '{') depth++;
      if (char === ')' || char === ']' || char === '}') depth--;
      if (char === ',' && depth === 0) {
        args.push(current);
        current = '';
        continue;
      }
    }
    
    current += char;
  }
  
  if (current) args.push(current);
  return args;
};

const evaluateExpression = (expr: string, variables: Record<string, any>): any => {
  expr = expr.trim();
  
  // String literals
  if ((expr.startsWith('"') && expr.endsWith('"')) || 
      (expr.startsWith("'") && expr.endsWith("'"))) {
    return expr.slice(1, -1);
  }
  
  // Boolean literals
  if (expr === 'True') return true;
  if (expr === 'False') return false;
  if (expr === 'None') return null;
  
  // Numbers
  if (!isNaN(Number(expr))) {
    return expr.includes('.') ? parseFloat(expr) : parseInt(expr);
  }
  
  // Lists
  if (expr.startsWith('[') && expr.endsWith(']')) {
    const inner = expr.slice(1, -1);
    if (!inner.trim()) return [];
    const items = splitArguments(inner);
    return items.map(item => evaluateExpression(item.trim(), variables));
  }
  
  // Dictionaries
  if (expr.startsWith('{') && expr.endsWith('}')) {
    const inner = expr.slice(1, -1);
    if (!inner.trim()) return {};
    const dict: Record<string, any> = {};
    const pairs = splitArguments(inner);
    for (const pair of pairs) {
      const [key, value] = pair.split(':').map(s => s.trim());
      const evalKey = evaluateExpression(key, variables);
      dict[evalKey] = evaluateExpression(value, variables);
    }
    return dict;
  }
  
  // Tuples
  if (expr.startsWith('(') && expr.endsWith(')')) {
    const inner = expr.slice(1, -1);
    if (!inner.trim()) return [];
    const items = splitArguments(inner);
    return items.map(item => evaluateExpression(item.trim(), variables));
  }
  
  // type() function
  const typeMatch = expr.match(/type\((.+)\)/);
  if (typeMatch) {
    const val = evaluateExpression(typeMatch[1], variables);
    if (typeof val === 'string') return "<class 'str'>";
    if (typeof val === 'number') return Number.isInteger(val) ? "<class 'int'>" : "<class 'float'>";
    if (typeof val === 'boolean') return "<class 'bool'>";
    if (Array.isArray(val)) return "<class 'list'>";
    if (typeof val === 'object') return "<class 'dict'>";
    return "<class 'unknown'>";
  }
  
  // len() function
  const lenMatch = expr.match(/len\((.+)\)/);
  if (lenMatch) {
    const val = evaluateExpression(lenMatch[1], variables);
    if (typeof val === 'string' || Array.isArray(val)) return val.length;
    if (typeof val === 'object') return Object.keys(val).length;
    return 0;
  }
  
  // range() function
  const rangeMatch = expr.match(/range\((.+)\)/);
  if (rangeMatch) {
    const args = splitArguments(rangeMatch[1]).map(a => parseInt(a.trim()));
    if (args.length === 1) return Array.from({ length: args[0] }, (_, i) => i);
    if (args.length === 2) return Array.from({ length: args[1] - args[0] }, (_, i) => i + args[0]);
    return [];
  }
  
  // Variable lookup
  if (variables.hasOwnProperty(expr)) {
    return variables[expr];
  }
  
  // Simple arithmetic
  if (expr.includes('+') || expr.includes('-') || expr.includes('*') || expr.includes('/')) {
    try {
      // Replace variables in expression
      let evalExpr = expr;
      for (const [key, val] of Object.entries(variables)) {
        evalExpr = evalExpr.replace(new RegExp(`\\b${key}\\b`, 'g'), JSON.stringify(val));
      }
      // Safe eval for simple math
      const result = Function(`"use strict"; return (${evalExpr})`)();
      return result;
    } catch {
      return expr;
    }
  }
  
  // Comparisons
  if (expr.includes('==') || expr.includes('!=') || expr.includes('<') || expr.includes('>')) {
    try {
      let evalExpr = expr;
      for (const [key, val] of Object.entries(variables)) {
        evalExpr = evalExpr.replace(new RegExp(`\\b${key}\\b`, 'g'), JSON.stringify(val));
      }
      return Function(`"use strict"; return (${evalExpr})`)();
    } catch {
      return false;
    }
  }
  
  return expr;
};

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
