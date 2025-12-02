import React, { useState } from 'react';
import { Menu, X, Code, Brain, GraduationCap } from 'lucide-react';
import { ModuleNavigation, modules } from '@/components/ModuleNavigation';
import { SintaxisModule } from '@/components/modules/SintaxisModule';
import { VariablesModule } from '@/components/modules/VariablesModule';
import { OperadoresModule } from '@/components/modules/OperadoresModule';
import { EstructurasModule } from '@/components/modules/EstructurasModule';
import { CondicionalesModule } from '@/components/modules/CondicionalesModule';
import { BuclesModule } from '@/components/modules/BuclesModule';
import { ProyectoModule } from '@/components/modules/ProyectoModule';
import { ResumenModule } from '@/components/modules/ResumenModule';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Index = () => {
  const [currentModule, setCurrentModule] = useState('sintaxis');
  const [completedModules, setCompletedModules] = useState<string[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleModuleChange = (moduleId: string) => {
    // Mark previous module as completed
    if (!completedModules.includes(currentModule)) {
      setCompletedModules([...completedModules, currentModule]);
    }
    setCurrentModule(moduleId);
    setSidebarOpen(false);
    window.scrollTo(0, 0);
  };

  const renderModule = () => {
    switch (currentModule) {
      case 'sintaxis':
        return <SintaxisModule />;
      case 'variables':
        return <VariablesModule />;
      case 'operadores':
        return <OperadoresModule />;
      case 'estructuras':
        return <EstructurasModule />;
      case 'condicionales':
        return <CondicionalesModule />;
      case 'bucles':
        return <BuclesModule />;
      case 'proyecto':
        return <ProyectoModule />;
      case 'resumen':
        return <ResumenModule />;
      default:
        return <SintaxisModule />;
    }
  };

  const currentModuleData = modules.find(m => m.id === currentModule);
  const currentIndex = modules.findIndex(m => m.id === currentModule);
  const prevModule = currentIndex > 0 ? modules[currentIndex - 1] : null;
  const nextModule = currentIndex < modules.length - 1 ? modules[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="flex items-center justify-between px-4 py-3 lg:px-6">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
                <Brain className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-bold gradient-text">DATA SCIENCE ANALYSIS</h1>
                <p className="text-xs text-muted-foreground hidden sm:block">Fundamentos de Python para IA</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground hidden md:block">
              Progreso: {completedModules.length + 1}/{modules.length}
            </span>
            <div className="w-24 h-2 bg-muted rounded-full overflow-hidden hidden md:block">
              <div 
                className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                style={{ width: `${((completedModules.length + 1) / modules.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={cn(
          "fixed inset-y-0 left-0 z-40 w-80 bg-sidebar border-r border-sidebar-border transform transition-transform duration-300 lg:relative lg:translate-x-0 pt-16 lg:pt-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <div className="h-full overflow-y-auto p-4">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <GraduationCap className="h-5 w-5 text-primary" />
                <span className="font-semibold text-sidebar-foreground">Módulos del Curso</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Completa cada módulo para dominar Python
              </p>
            </div>
            <ModuleNavigation
              currentModule={currentModule}
              onModuleChange={handleModuleChange}
              completedModules={completedModules}
            />
            
            <div className="mt-8 p-4 bg-sidebar-accent rounded-lg">
              <p className="text-xs text-muted-foreground leading-relaxed">
                Material didáctico elaborado por <strong className="text-sidebar-foreground">Henry Tene Torres</strong> para efectos educativos.
              </p>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 min-h-screen">
          <div className="max-w-4xl mx-auto px-4 py-8 lg:px-8">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <Code className="h-4 w-4" />
              <span>Python para IA</span>
              <span>/</span>
              <span className="text-foreground font-medium">{currentModuleData?.title}</span>
            </div>

            {/* Module Content */}
            {renderModule()}

            {/* Navigation */}
            <nav className="flex items-center justify-between mt-12 pt-8 border-t border-border">
              {prevModule ? (
                <Button 
                  variant="outline" 
                  onClick={() => handleModuleChange(prevModule.id)}
                  className="gap-2"
                >
                  ← {prevModule.title}
                </Button>
              ) : (
                <div />
              )}
              {nextModule && (
                <Button 
                  variant="default" 
                  onClick={() => handleModuleChange(nextModule.id)}
                  className="gap-2"
                >
                  {nextModule.title} →
                </Button>
              )}
            </nav>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
