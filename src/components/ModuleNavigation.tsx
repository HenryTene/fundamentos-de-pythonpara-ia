import React from 'react';
import { 
  Code, 
  Variable, 
  Calculator, 
  Database, 
  GitBranch, 
  Repeat, 
  Rocket,
  FileText,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Module {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
}

export const modules: Module[] = [
  {
    id: 'sintaxis',
    title: 'Sintaxis Básica',
    icon: <Code className="h-5 w-5" />,
    description: 'Estructura y reglas del código Python'
  },
  {
    id: 'variables',
    title: 'Variables y Tipos',
    icon: <Variable className="h-5 w-5" />,
    description: 'int, float, str, bool'
  },
  {
    id: 'operadores',
    title: 'Operadores',
    icon: <Calculator className="h-5 w-5" />,
    description: 'Aritméticos, comparación y lógicos'
  },
  {
    id: 'estructuras',
    title: 'Estructuras de Datos',
    icon: <Database className="h-5 w-5" />,
    description: 'Listas, diccionarios y tuplas'
  },
  {
    id: 'condicionales',
    title: 'Condicionales',
    icon: <GitBranch className="h-5 w-5" />,
    description: 'if, elif, else'
  },
  {
    id: 'bucles',
    title: 'Bucles',
    icon: <Repeat className="h-5 w-5" />,
    description: 'for, while'
  },
  {
    id: 'proyecto',
    title: 'Mini-Proyecto',
    icon: <Rocket className="h-5 w-5" />,
    description: 'Proyecto integrador de IA'
  },
  {
    id: 'resumen',
    title: 'Resumen',
    icon: <FileText className="h-5 w-5" />,
    description: 'Descarga el material'
  }
];

interface ModuleNavigationProps {
  currentModule: string;
  onModuleChange: (moduleId: string) => void;
  completedModules: string[];
}

export const ModuleNavigation: React.FC<ModuleNavigationProps> = ({
  currentModule,
  onModuleChange,
  completedModules
}) => {
  return (
    <nav className="space-y-1">
      {modules.map((module, index) => {
        const isActive = currentModule === module.id;
        const isCompleted = completedModules.includes(module.id);
        
        return (
          <button
            key={module.id}
            onClick={() => onModuleChange(module.id)}
            className={cn(
              "nav-item w-full text-left group",
              isActive && "active"
            )}
          >
            <div className={cn(
              "flex items-center justify-center w-8 h-8 rounded-lg transition-colors",
              isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary",
              isCompleted && !isActive && "bg-success/20 text-success"
            )}>
              {module.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground font-medium">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className={cn(
                  "font-medium truncate",
                  isActive && "text-sidebar-accent-foreground"
                )}>
                  {module.title}
                </span>
              </div>
              <p className="text-xs text-muted-foreground truncate mt-0.5">
                {module.description}
              </p>
            </div>
            <ChevronRight className={cn(
              "h-4 w-4 text-muted-foreground/50 transition-transform",
              isActive && "text-sidebar-accent-foreground rotate-90"
            )} />
          </button>
        );
      })}
    </nav>
  );
};
