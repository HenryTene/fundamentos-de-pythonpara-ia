// ====== PYTHON INTERPRETER ======
// A block-aware Python interpreter for educational code examples

type PyValue = number | string | boolean | null | PyValue[] | { [key: string]: PyValue };

// ====== TOKENIZER ======
type TT = 'NUM'|'STR'|'FSTR'|'ID'|'OP'|'LP'|'RP'|'LB'|'RB'|'LC'|'RC'|'COMMA'|'COLON'|'DOT'|'EOF';
interface Tok { t: TT; v: string; }

function tokenize(s: string): Tok[] {
  const toks: Tok[] = [];
  let i = 0;
  while (i < s.length) {
    if (s[i] === ' ' || s[i] === '\t') { i++; continue; }

    // f-string
    if (s[i] === 'f' && (s[i+1] === '"' || s[i+1] === "'")) {
      const q = s[i+1];
      let j = i + 2, val = '';
      while (j < s.length && s[j] !== q) {
        if (s[j] === '\\') { val += s[j+1]; j += 2; }
        else { val += s[j]; j++; }
      }
      j++;
      toks.push({ t: 'FSTR', v: val });
      i = j; continue;
    }

    // string
    if (s[i] === '"' || s[i] === "'") {
      const q = s[i];
      let j = i + 1, val = '';
      while (j < s.length && s[j] !== q) {
        if (s[j] === '\\') { val += s[j+1]; j += 2; }
        else { val += s[j]; j++; }
      }
      j++;
      toks.push({ t: 'STR', v: val });
      i = j; continue;
    }

    // number
    if (/\d/.test(s[i]) || (s[i] === '.' && i+1 < s.length && /\d/.test(s[i+1]))) {
      let num = '';
      while (i < s.length && /[\d.]/.test(s[i])) { num += s[i]; i++; }
      toks.push({ t: 'NUM', v: num }); continue;
    }

    // multi-char operators
    const ops2 = ['**', '//', '==', '!=', '<=', '>='];
    const found2 = ops2.find(op => s.slice(i, i + op.length) === op);
    if (found2) { toks.push({ t: 'OP', v: found2 }); i += found2.length; continue; }

    if ('+-*/%<>='.includes(s[i])) { toks.push({ t: 'OP', v: s[i] }); i++; continue; }

    if (s[i] === '(') { toks.push({ t: 'LP', v: '(' }); i++; continue; }
    if (s[i] === ')') { toks.push({ t: 'RP', v: ')' }); i++; continue; }
    if (s[i] === '[') { toks.push({ t: 'LB', v: '[' }); i++; continue; }
    if (s[i] === ']') { toks.push({ t: 'RB', v: ']' }); i++; continue; }
    if (s[i] === '{') { toks.push({ t: 'LC', v: '{' }); i++; continue; }
    if (s[i] === '}') { toks.push({ t: 'RC', v: '}' }); i++; continue; }
    if (s[i] === ',') { toks.push({ t: 'COMMA', v: ',' }); i++; continue; }
    if (s[i] === ':') { toks.push({ t: 'COLON', v: ':' }); i++; continue; }
    if (s[i] === '.') { toks.push({ t: 'DOT', v: '.' }); i++; continue; }

    // identifiers and keyword operators
    if (/[a-zA-Z_\u00C0-\u024F]/.test(s[i])) {
      let id = '';
      while (i < s.length && /[a-zA-Z0-9_\u00C0-\u024F]/.test(s[i])) { id += s[i]; i++; }
      if (['and', 'or', 'not', 'in'].includes(id)) {
        toks.push({ t: 'OP', v: id });
      } else {
        toks.push({ t: 'ID', v: id });
      }
      continue;
    }

    i++; // skip unknown
  }
  toks.push({ t: 'EOF', v: '' });
  return toks;
}

// ====== EXPRESSION PARSER ======

interface ExecContext {
  vars: Record<string, PyValue>;
  funcs: Record<string, { params: string[]; body: LineInfo[] }>;
  output: string[];
}

class Parser {
  toks: Tok[];
  pos: number;
  ctx: ExecContext;

  constructor(toks: Tok[], ctx: ExecContext) {
    this.toks = toks;
    this.pos = 0;
    this.ctx = ctx;
  }

  peek(): Tok { return this.toks[this.pos] || { t: 'EOF', v: '' }; }
  advance(): Tok { return this.toks[this.pos++]; }
  match(t: TT, v?: string): boolean {
    const tok = this.peek();
    if (tok.t === t && (v === undefined || tok.v === v)) { this.pos++; return true; }
    return false;
  }
  expect(t: TT, v?: string): Tok {
    const tok = this.advance();
    if (tok.t !== t || (v !== undefined && tok.v !== v))
      throw new Error(`Expected ${t}${v ? ':' + v : ''}, got ${tok.t}:${tok.v}`);
    return tok;
  }

  parse(): PyValue { return this.parseOr(); }

  parseOr(): PyValue {
    let left = this.parseAnd();
    while (this.match('OP', 'or')) {
      const right = this.parseAnd();
      left = isTruthy(left) ? left : right;
    }
    return left;
  }

  parseAnd(): PyValue {
    let left = this.parseNot();
    while (this.match('OP', 'and')) {
      const right = this.parseNot();
      left = isTruthy(left) ? right : left;
    }
    return left;
  }

  parseNot(): PyValue {
    if (this.match('OP', 'not')) {
      return !isTruthy(this.parseNot());
    }
    return this.parseComparison();
  }

  parseComparison(): PyValue {
    let left = this.parseAddSub();
    while (true) {
      const p = this.peek();
      if (p.t === 'OP' && ['==', '!=', '<', '>', '<=', '>=', 'in'].includes(p.v)) {
        const op = this.advance().v;
        if (op === 'in') {
          const right = this.parseAddSub();
          if (typeof right === 'string') { left = (right as string).includes(left as string); }
          else if (Array.isArray(right)) { left = right.some(item => item === left); }
          else { left = false; }
          continue;
        }
        const right = this.parseAddSub();
        switch (op) {
          case '==': left = left === right; break;
          case '!=': left = left !== right; break;
          case '<': left = (left as number) < (right as number); break;
          case '>': left = (left as number) > (right as number); break;
          case '<=': left = (left as number) <= (right as number); break;
          case '>=': left = (left as number) >= (right as number); break;
        }
        continue;
      }
      // Handle "not in"
      if (p.t === 'OP' && p.v === 'not' && this.toks[this.pos + 1]?.v === 'in') {
        this.advance(); this.advance();
        const right = this.parseAddSub();
        if (typeof right === 'string') { left = !(right as string).includes(left as string); }
        else if (Array.isArray(right)) { left = !right.some(item => item === left); }
        else { left = true; }
        continue;
      }
      break;
    }
    return left;
  }

  parseAddSub(): PyValue {
    let left = this.parseMulDiv();
    while (true) {
      const p = this.peek();
      if (p.t === 'OP' && (p.v === '+' || p.v === '-')) {
        const op = this.advance().v;
        const right = this.parseMulDiv();
        if (op === '+') {
          if (typeof left === 'string' || typeof right === 'string') left = String(pyStr(left)) + String(pyStr(right));
          else if (Array.isArray(left) && Array.isArray(right)) left = [...left, ...right];
          else left = (left as number) + (right as number);
        } else {
          left = (left as number) - (right as number);
        }
        continue;
      }
      break;
    }
    return left;
  }

  parseMulDiv(): PyValue {
    let left = this.parsePower();
    while (true) {
      const p = this.peek();
      if (p.t === 'OP' && ['*', '/', '//', '%'].includes(p.v)) {
        const op = this.advance().v;
        const right = this.parsePower();
        switch (op) {
          case '*':
            if (typeof left === 'string' && typeof right === 'number') left = left.repeat(right);
            else if (typeof left === 'number' && typeof right === 'string') left = right.repeat(left);
            else left = (left as number) * (right as number);
            break;
          case '/': left = (left as number) / (right as number); break;
          case '//': left = Math.floor((left as number) / (right as number)); break;
          case '%': left = (left as number) % (right as number); break;
        }
        continue;
      }
      break;
    }
    return left;
  }

  parsePower(): PyValue {
    const base = this.parseUnary();
    if (this.peek().t === 'OP' && this.peek().v === '**') {
      this.advance();
      const exp = this.parseUnary();
      return Math.pow(base as number, exp as number);
    }
    return base;
  }

  parseUnary(): PyValue {
    if (this.peek().t === 'OP' && this.peek().v === '-') {
      this.advance();
      return -(this.parsePostfix() as number);
    }
    return this.parsePostfix();
  }

  parsePostfix(): PyValue {
    let val = this.parseAtom();
    while (true) {
      // Indexing: val[expr]
      if (this.peek().t === 'LB') {
        this.advance();
        const idx = this.parse();
        this.expect('RB');
        if (Array.isArray(val)) {
          let i = idx as number;
          if (i < 0) i = val.length + i;
          val = val[i];
        } else if (typeof val === 'object' && val !== null) {
          val = (val as Record<string, PyValue>)[String(idx)];
        } else if (typeof val === 'string') {
          let i = idx as number;
          if (i < 0) i = val.length + i;
          val = val[i];
        }
        continue;
      }
      // Method/property: val.method(args)
      if (this.peek().t === 'DOT') {
        this.advance();
        const method = this.expect('ID').v;
        if (this.peek().t === 'LP') {
          this.advance();
          const args: PyValue[] = [];
          if (this.peek().t !== 'RP') {
            args.push(this.parse());
            while (this.match('COMMA')) {
              if (this.peek().t === 'RP') break;
              args.push(this.parse());
            }
          }
          this.expect('RP');
          val = callMethod(val, method, args);
        }
        continue;
      }
      break;
    }
    return val;
  }

  parseAtom(): PyValue {
    const tok = this.peek();

    if (tok.t === 'NUM') { this.advance(); return tok.v.includes('.') ? parseFloat(tok.v) : parseInt(tok.v); }
    if (tok.t === 'STR') { this.advance(); return tok.v; }
    if (tok.t === 'FSTR') { this.advance(); return this.evalFString(tok.v); }

    if (tok.t === 'ID') {
      const name = this.advance().v;
      if (name === 'True') return true;
      if (name === 'False') return false;
      if (name === 'None') return null;

      // Function call
      if (this.peek().t === 'LP') {
        return this.callFunction(name);
      }

      // Variable lookup
      if (name in this.ctx.vars) return this.ctx.vars[name];
      return name; // fallback
    }

    // Parenthesized expression or tuple
    if (tok.t === 'LP') {
      this.advance();
      if (this.peek().t === 'RP') { this.advance(); return []; }
      const first = this.parse();
      if (this.peek().t === 'COMMA') {
        const items: PyValue[] = [first];
        while (this.match('COMMA')) {
          if (this.peek().t === 'RP') break;
          items.push(this.parse());
        }
        this.expect('RP');
        return items;
      }
      this.expect('RP');
      return first;
    }

    // List literal
    if (tok.t === 'LB') {
      this.advance();
      const items: PyValue[] = [];
      if (this.peek().t !== 'RB') {
        items.push(this.parse());
        while (this.match('COMMA')) {
          if (this.peek().t === 'RB') break;
          items.push(this.parse());
        }
      }
      this.expect('RB');
      return items;
    }

    // Dict literal
    if (tok.t === 'LC') {
      this.advance();
      const dict: Record<string, PyValue> = {};
      if (this.peek().t !== 'RC') {
        const key = this.parse();
        this.expect('COLON');
        const val = this.parse();
        dict[String(key)] = val;
        while (this.match('COMMA')) {
          if (this.peek().t === 'RC') break;
          const k = this.parse();
          this.expect('COLON');
          const v = this.parse();
          dict[String(k)] = v;
        }
      }
      this.expect('RC');
      return dict;
    }

    // Skip unexpected tokens
    this.advance();
    return null;
  }

  evalFString(template: string): string {
    return template.replace(/\{([^}]+)\}/g, (_, expr) => {
      return pyStr(evaluate(expr.trim(), this.ctx));
    });
  }

  callFunction(name: string): PyValue {
    this.expect('LP');
    const args: PyValue[] = [];
    const kwargs: Record<string, PyValue> = {};
    if (this.peek().t !== 'RP') {
      this.parseArg(args, kwargs);
      while (this.match('COMMA')) {
        if (this.peek().t === 'RP') break;
        this.parseArg(args, kwargs);
      }
    }
    this.expect('RP');

    switch (name) {
      case 'print':
        this.ctx.output.push(args.map(a => pyStr(a)).join(' '));
        return null;
      case 'len':
        if (typeof args[0] === 'string') return args[0].length;
        if (Array.isArray(args[0])) return args[0].length;
        if (typeof args[0] === 'object' && args[0]) return Object.keys(args[0]).length;
        return 0;
      case 'type':
        return pyType(args[0]);
      case 'int':
        if (typeof args[0] === 'string') return parseInt(args[0]);
        if (typeof args[0] === 'boolean') return args[0] ? 1 : 0;
        return Math.floor(args[0] as number);
      case 'float':
        if (typeof args[0] === 'string') return parseFloat(args[0]);
        return Number(args[0]);
      case 'str':
        return pyStr(args[0]);
      case 'bool':
        return isTruthy(args[0]);
      case 'list':
        if (Array.isArray(args[0])) return [...args[0]];
        if (typeof args[0] === 'object' && args[0]) return Object.keys(args[0]);
        return [];
      case 'range': {
        let start = 0, end = 0, step = 1;
        if (args.length === 1) { end = args[0] as number; }
        else if (args.length >= 2) { start = args[0] as number; end = args[1] as number; }
        if (args.length >= 3) step = args[2] as number;
        const result: number[] = [];
        if (step > 0) { for (let i = start; i < end; i += step) result.push(i); }
        else if (step < 0) { for (let i = start; i > end; i += step) result.push(i); }
        return result;
      }
      case 'max':
        if (Array.isArray(args[0])) return Math.max(...(args[0] as number[]));
        return Math.max(...(args as number[]));
      case 'min':
        if (Array.isArray(args[0])) return Math.min(...(args[0] as number[]));
        return Math.min(...(args as number[]));
      case 'abs':
        return Math.abs(args[0] as number);
      case 'round':
        return args.length > 1 ? Number((args[0] as number).toFixed(args[1] as number)) : Math.round(args[0] as number);
      case 'enumerate': {
        const list = args[0] as PyValue[];
        const startVal = args.length > 1 ? args[1] as number : (kwargs['start'] != null ? kwargs['start'] as number : 0);
        if (!Array.isArray(list)) return [];
        return list.map((item, i) => [i + startVal, item]);
      }
      case 'sorted':
        if (Array.isArray(args[0])) return [...args[0]].sort();
        return args[0];
      case 'sum':
        if (Array.isArray(args[0])) return (args[0] as number[]).reduce((a, b) => a + b, 0);
        return 0;
      case 'input':
        return args.length > 0 ? String(args[0]) : '';
      default:
        // User-defined function
        if (name in this.ctx.funcs) {
          const func = this.ctx.funcs[name];
          const localVars = { ...this.ctx.vars };
          for (let pi = 0; pi < func.params.length; pi++) {
            localVars[func.params[pi]] = args[pi] ?? null;
          }
          const localCtx: ExecContext = { vars: localVars, funcs: this.ctx.funcs, output: this.ctx.output };
          const flow = executeLines(func.body, 0, func.body.length, localCtx);
          // Copy back any global var changes (for mutable objects this happens automatically)
          return flow.returnValue ?? null;
        }
        return null;
    }
  }

  parseArg(args: PyValue[], kwargs: Record<string, PyValue>) {
    const savedPos = this.pos;
    if (this.peek().t === 'ID') {
      const name = this.peek().v;
      // Don't treat True/False/None as kwarg names
      if (name !== 'True' && name !== 'False' && name !== 'None' &&
          !['and','or','not','in'].includes(name)) {
        this.advance();
        if (this.peek().t === 'OP' && this.peek().v === '=') {
          this.advance();
          kwargs[name] = this.parse();
          return;
        }
        this.pos = savedPos;
      }
    }
    args.push(this.parse());
  }
}

// ====== METHOD CALLS ======

function callMethod(obj: PyValue, method: string, args: PyValue[]): PyValue {
  if (typeof obj === 'string') {
    switch (method) {
      case 'lower': return obj.toLowerCase();
      case 'upper': return obj.toUpperCase();
      case 'strip': return obj.trim();
      case 'lstrip': return obj.trimStart();
      case 'rstrip': return obj.trimEnd();
      case 'split': return args.length ? obj.split(args[0] as string) : obj.split(/\s+/);
      case 'replace': return obj.split(args[0] as string).join(args[1] as string);
      case 'startswith': return obj.startsWith(args[0] as string);
      case 'endswith': return obj.endsWith(args[0] as string);
      case 'count': return obj.split(args[0] as string).length - 1;
      case 'find': return obj.indexOf(args[0] as string);
      case 'index': return obj.indexOf(args[0] as string);
      case 'join': return (args[0] as PyValue[]).map(v => pyStr(v)).join(obj);
      case 'format': return obj; // simplified
      case 'capitalize': return obj.charAt(0).toUpperCase() + obj.slice(1).toLowerCase();
      case 'title': return obj.replace(/\b\w/g, c => c.toUpperCase());
      case 'isdigit': return /^\d+$/.test(obj);
      default: return obj;
    }
  }
  if (Array.isArray(obj)) {
    switch (method) {
      case 'append': obj.push(args[0]); return null;
      case 'pop': return args.length ? obj.splice(args[0] as number, 1)[0] : obj.pop() ?? null;
      case 'remove': { const i = obj.indexOf(args[0]); if (i >= 0) obj.splice(i, 1); return null; }
      case 'sort': obj.sort((a, b) => (a as number) - (b as number)); return null;
      case 'reverse': obj.reverse(); return null;
      case 'index': return obj.indexOf(args[0]);
      case 'insert': obj.splice(args[0] as number, 0, args[1]); return null;
      case 'extend': if (Array.isArray(args[0])) obj.push(...args[0]); return null;
      case 'copy': return [...obj];
      case 'count': return obj.filter(x => x === args[0]).length;
      case 'clear': obj.length = 0; return null;
      default: return obj;
    }
  }
  if (typeof obj === 'object' && obj !== null) {
    switch (method) {
      case 'keys': return Object.keys(obj);
      case 'values': return Object.values(obj) as PyValue[];
      case 'items': return Object.entries(obj).map(([k, v]) => [k, v] as PyValue[]);
      case 'get': return (obj as Record<string, PyValue>)[String(args[0])] ?? (args[1] ?? null);
      case 'update': if (typeof args[0] === 'object' && args[0]) Object.assign(obj, args[0]); return null;
      case 'pop': {
        const key = String(args[0]);
        const val = (obj as Record<string, PyValue>)[key] ?? (args[1] ?? null);
        delete (obj as Record<string, PyValue>)[key];
        return val;
      }
      default: return obj;
    }
  }
  return null;
}

// ====== HELPERS ======

function isTruthy(val: PyValue): boolean {
  if (val === null || val === false || val === 0 || val === '') return false;
  if (Array.isArray(val) && val.length === 0) return false;
  if (typeof val === 'object' && val !== null && Object.keys(val).length === 0) return false;
  return true;
}

function pyStr(val: PyValue): string {
  if (val === null) return 'None';
  if (val === true) return 'True';
  if (val === false) return 'False';
  if (typeof val === 'string') return val;
  if (typeof val === 'number') return String(val);
  if (Array.isArray(val)) return '[' + val.map(v => pyRepr(v)).join(', ') + ']';
  if (typeof val === 'object') {
    const entries = Object.entries(val).map(([k, v]) => `'${k}': ${pyRepr(v)}`);
    return '{' + entries.join(', ') + '}';
  }
  return String(val);
}

function pyRepr(val: PyValue): string {
  if (typeof val === 'string') return `'${val}'`;
  return pyStr(val);
}

function pyType(val: PyValue): string {
  if (val === null) return "<class 'NoneType'>";
  if (typeof val === 'boolean') return "<class 'bool'>";
  if (typeof val === 'number') return Number.isInteger(val) ? "<class 'int'>" : "<class 'float'>";
  if (typeof val === 'string') return "<class 'str'>";
  if (Array.isArray(val)) return "<class 'list'>";
  if (typeof val === 'object') return "<class 'dict'>";
  return "<class 'unknown'>";
}

function evaluate(expr: string, ctx: ExecContext): PyValue {
  const toks = tokenize(expr);
  const parser = new Parser(toks, ctx);
  return parser.parse();
}

// ====== LINE PARSING ======

interface LineInfo {
  text: string;
  indent: number;
}

function countBrackets(line: string): number {
  let count = 0, inStr = false, strCh = '';
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if ((ch === '"' || ch === "'") && (i === 0 || line[i - 1] !== '\\')) {
      if (!inStr) { inStr = true; strCh = ch; }
      else if (ch === strCh) inStr = false;
    }
    if (!inStr) {
      if ('([{'.includes(ch)) count++;
      if (')]}'.includes(ch)) count--;
      if (ch === '#') break;
    }
  }
  return count;
}

function stripComment(line: string): string {
  let inStr = false, strCh = '';
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if ((ch === '"' || ch === "'") && (i === 0 || line[i - 1] !== '\\')) {
      if (!inStr) { inStr = true; strCh = ch; }
      else if (ch === strCh) inStr = false;
    }
    if (!inStr && ch === '#') return line.slice(0, i).trimEnd();
  }
  return line.trimEnd();
}

function parseCodeLines(code: string): LineInfo[] {
  const rawLines = code.split('\n');
  const result: LineInfo[] = [];
  let current = '';
  let currentIndent = 0;
  let openBrackets = 0;

  for (const rawLine of rawLines) {
    const stripped = stripComment(rawLine);
    if (!stripped.trim()) continue;

    if (current === '') {
      currentIndent = stripped.length - stripped.trimStart().length;
    }

    current += (current ? ' ' : '') + stripped.trim();
    openBrackets += countBrackets(stripped);

    if (openBrackets <= 0) {
      openBrackets = 0;
      if (current.trim()) {
        result.push({ text: current.trim(), indent: currentIndent });
      }
      current = '';
    }
  }

  if (current.trim()) {
    result.push({ text: current.trim(), indent: currentIndent });
  }

  return result;
}

function findBlockEnd(lines: LineInfo[], start: number, baseIndent: number): number {
  let i = start;
  while (i < lines.length && lines[i].indent > baseIndent) i++;
  return i;
}

// ====== BLOCK EXECUTOR ======

interface ControlFlow {
  break?: boolean;
  continue?: boolean;
  return?: boolean;
  returnValue?: PyValue;
}

function findAssignmentEquals(text: string): number {
  let inStr = false, strCh = '', depth = 0;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if ((ch === '"' || ch === "'") && (i === 0 || text[i - 1] !== '\\')) {
      if (!inStr) { inStr = true; strCh = ch; }
      else if (ch === strCh) inStr = false;
    }
    if (!inStr) {
      if ('([{'.includes(ch)) depth++;
      if (')]}'.includes(ch)) depth--;
      if (ch === '=' && depth === 0) {
        if (i > 0 && '!<>='.includes(text[i - 1])) continue;
        if (i + 1 < text.length && text[i + 1] === '=') continue;
        return i;
      }
    }
  }
  return -1;
}

function executeLines(lines: LineInfo[], start: number, end: number, ctx: ExecContext): ControlFlow {
  let i = start;

  while (i < end) {
    const line = lines[i];
    const text = line.text;

    // def statement
    const defMatch = text.match(/^def\s+(\w+)\s*\(([^)]*)\)\s*:/);
    if (defMatch) {
      const [, name, paramsStr] = defMatch;
      const params = paramsStr ? paramsStr.split(',').map(p => p.trim()).filter(Boolean) : [];
      const bodyStart = i + 1;
      const bodyEnd = findBlockEnd(lines, bodyStart, line.indent);
      const bodyLines = lines.slice(bodyStart, bodyEnd);
      const minIndent = bodyLines.length > 0 ? Math.min(...bodyLines.map(l => l.indent)) : 0;
      ctx.funcs[name] = {
        params,
        body: bodyLines.map(l => ({ text: l.text, indent: l.indent - minIndent }))
      };
      i = bodyEnd;
      continue;
    }

    // for loop
    const forMatch = text.match(/^for\s+(.+)\s+in\s+(.+):\s*$/);
    if (forMatch) {
      const [, varsPart, iterExpr] = forMatch;
      const iterable = evaluate(iterExpr, ctx);
      const bodyStart = i + 1;
      const bodyEnd = findBlockEnd(lines, bodyStart, line.indent);
      const bodyLines = lines.slice(bodyStart, bodyEnd);
      const minIndent = bodyLines.length > 0 ? Math.min(...bodyLines.map(l => l.indent)) : 0;
      const normalizedBody = bodyLines.map(l => ({ text: l.text, indent: l.indent - minIndent }));
      const varNames = varsPart.split(',').map(v => v.trim());

      if (Array.isArray(iterable)) {
        for (const item of iterable) {
          if (varNames.length > 1 && Array.isArray(item)) {
            for (let vi = 0; vi < varNames.length; vi++) {
              ctx.vars[varNames[vi]] = (item as PyValue[])[vi] ?? null;
            }
          } else {
            ctx.vars[varNames[0]] = item;
          }
          const flow = executeLines(normalizedBody, 0, normalizedBody.length, ctx);
          if (flow.break) break;
          if (flow.return) return flow;
        }
      }

      i = bodyEnd;
      continue;
    }

    // while loop
    const whileMatch = text.match(/^while\s+(.+):\s*$/);
    if (whileMatch) {
      const condition = whileMatch[1];
      const bodyStart = i + 1;
      const bodyEnd = findBlockEnd(lines, bodyStart, line.indent);
      const bodyLines = lines.slice(bodyStart, bodyEnd);
      const minIndent = bodyLines.length > 0 ? Math.min(...bodyLines.map(l => l.indent)) : 0;
      const normalizedBody = bodyLines.map(l => ({ text: l.text, indent: l.indent - minIndent }));

      let iterations = 0;
      while (isTruthy(evaluate(condition, ctx)) && iterations < 10000) {
        iterations++;
        const flow = executeLines(normalizedBody, 0, normalizedBody.length, ctx);
        if (flow.break) break;
        if (flow.return) return flow;
      }

      i = bodyEnd;
      continue;
    }

    // if/elif/else
    const ifMatch = text.match(/^if\s+(.+):\s*$/);
    if (ifMatch) {
      interface Branch { condition: string | null; bodyStart: number; bodyEnd: number; }
      const branches: Branch[] = [];
      const bodyStart = i + 1;
      const bodyEnd = findBlockEnd(lines, bodyStart, line.indent);
      branches.push({ condition: ifMatch[1], bodyStart, bodyEnd });

      let j = bodyEnd;
      while (j < end) {
        const nextLine = lines[j];
        if (nextLine.indent !== line.indent) break;

        const elifMatch = nextLine.text.match(/^elif\s+(.+):\s*$/);
        if (elifMatch) {
          const eBodyStart = j + 1;
          const eBodyEnd = findBlockEnd(lines, eBodyStart, nextLine.indent);
          branches.push({ condition: elifMatch[1], bodyStart: eBodyStart, bodyEnd: eBodyEnd });
          j = eBodyEnd;
          continue;
        }

        const elseMatch = nextLine.text.match(/^else\s*:\s*$/);
        if (elseMatch) {
          const eBodyStart = j + 1;
          const eBodyEnd = findBlockEnd(lines, eBodyStart, nextLine.indent);
          branches.push({ condition: null, bodyStart: eBodyStart, bodyEnd: eBodyEnd });
          j = eBodyEnd;
          continue;
        }

        break;
      }

      for (const branch of branches) {
        if (branch.condition === null || isTruthy(evaluate(branch.condition, ctx))) {
          const bLines = lines.slice(branch.bodyStart, branch.bodyEnd);
          const minIndent = bLines.length > 0 ? Math.min(...bLines.map(l => l.indent)) : 0;
          const normalized = bLines.map(l => ({ text: l.text, indent: l.indent - minIndent }));
          const flow = executeLines(normalized, 0, normalized.length, ctx);
          if (flow.break || flow.continue || flow.return) return flow;
          break;
        }
      }

      i = j;
      continue;
    }

    // break
    if (text === 'break') return { break: true };

    // continue
    if (text === 'continue') return { continue: true };

    // return
    if (text === 'return') return { return: true, returnValue: null };
    const returnMatch = text.match(/^return\s+(.+)$/);
    if (returnMatch) {
      return { return: true, returnValue: evaluate(returnMatch[1], ctx) };
    }

    // Assignment
    const eqPos = findAssignmentEquals(text);
    if (eqPos > 0) {
      const lhs = text.slice(0, eqPos).trim();
      const rhs = text.slice(eqPos + 1).trim();

      // Index assignment: var[idx] = value or var["key"] = value
      const indexMatch = lhs.match(/^(\w+)\s*\[(.+)\]$/);
      if (indexMatch) {
        const [, varName, idxExpr] = indexMatch;
        const obj = ctx.vars[varName];
        const idx = evaluate(idxExpr, ctx);
        const value = evaluate(rhs, ctx);
        if (Array.isArray(obj)) {
          let ii = idx as number;
          if (ii < 0) ii = obj.length + ii;
          obj[ii] = value;
        } else if (typeof obj === 'object' && obj !== null) {
          (obj as Record<string, PyValue>)[String(idx)] = value;
        }
        i++;
        continue;
      }

      // Tuple unpacking or simple assignment
      const varNames = lhs.split(',').map(v => v.trim());
      const value = evaluate(rhs, ctx);
      if (varNames.length > 1 && Array.isArray(value)) {
        for (let vi = 0; vi < varNames.length; vi++) {
          ctx.vars[varNames[vi]] = value[vi] ?? null;
        }
      } else if (varNames.length === 1) {
        ctx.vars[varNames[0]] = value;
      }
      i++;
      continue;
    }

    // Expression statement (function calls, method calls, etc.)
    try {
      evaluate(text, ctx);
    } catch {
      // Ignore errors in expression statements
    }

    i++;
  }

  return {};
}

// ====== MAIN ENTRY POINT ======

export const executePython = (code: string): string => {
  const ctx: ExecContext = {
    vars: {},
    funcs: {},
    output: [],
  };

  try {
    const lines = parseCodeLines(code);
    executeLines(lines, 0, lines.length, ctx);
  } catch (e) {
    ctx.output.push(`Error: ${e instanceof Error ? e.message : String(e)}`);
  }

  return ctx.output.join('\n') || '(Sin salida)';
};
