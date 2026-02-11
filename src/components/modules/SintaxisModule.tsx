import React from 'react';
import { CodeEditor } from '../CodeEditor';
import { Exercise } from '../Exercise';
import { AlertCircle, CheckCircle } from 'lucide-react';

export const SintaxisModule: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Título del módulo */}
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Sintaxis Básica de Python
        </h2>
        <p className="text-muted-foreground text-lg">
          Aprende las reglas fundamentales para escribir código Python correctamente.
        </p>
      </div>

      {/* Concepto 1: Indentación */}
      <section className="bg-card rounded-xl p-6 shadow-card border border-border">
        <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">1</span>
          Indentación (Sangría)
        </h3>
        <p className="text-muted-foreground mb-4">
          Python usa la <strong className="text-foreground">indentación</strong> (espacios al inicio de línea) para definir bloques de código. 
          A diferencia de otros lenguajes que usan llaves <code className="bg-muted px-1.5 py-0.5 rounded text-accent">{'{}'}</code>, 
          Python requiere que mantengas una sangría consistente.
        </p>
        
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="p-4 rounded-lg bg-success/10 border border-success/30">
            <div className="flex items-center gap-2 mb-2 text-success font-semibold">
              <CheckCircle className="h-4 w-4" />
              Correcto
            </div>
            <pre className="font-mono text-sm text-foreground">
{`if True:
    print("Hola")
    print("Mundo")`}
            </pre>
          </div>
          <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30">
            <div className="flex items-center gap-2 mb-2 text-destructive font-semibold">
              <AlertCircle className="h-4 w-4" />
              Incorrecto
            </div>
            <pre className="font-mono text-sm text-foreground">
{`if True:
# Error: falta indentación
print("Hola")
  # Error: indentación inconsistente
  print("Mundo")`}
            </pre>
          </div>
        </div>

        <div className="bg-muted/50 rounded-lg p-4 border border-border">
          <p className="text-sm text-muted-foreground">
            💡 <strong className="text-accent">Tip:</strong> Usa 4 espacios para cada nivel de indentación. 
            La mayoría de editores lo configuran automáticamente.
          </p>
        </div>
      </section>

      {/* Concepto 2: Comentarios */}
      <section className="bg-card rounded-xl p-6 shadow-card border border-border">
        <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">2</span>
          Comentarios
        </h3>
        <p className="text-muted-foreground mb-4">
          Los comentarios son notas que Python ignora al ejecutar el código. 
          Son útiles para explicar qué hace tu código.
        </p>

        <CodeEditor
          title="comentarios.py"
          initialCode={`# Esto es un comentario de una línea
# Python ignora todo lo que está después del #

# Asignamos un nombre
nombre = "Ana"

# Los comentarios ayudan a:
# - Explicar código complejo
# - Documentar tu lógica
# - Dejar notas para ti o tu equipo

# Imprime el valor de la variable
print(nombre)`}
        />
      </section>

      {/* Concepto 3: Print */}
      <section className="bg-card rounded-xl p-6 shadow-card border border-border">
        <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">3</span>
          La función print()
        </h3>
        <p className="text-muted-foreground mb-4">
          <code className="bg-muted px-1.5 py-0.5 rounded text-accent">print()</code> es la función que usamos para mostrar información en la consola. 
          Es fundamental para ver los resultados de tu código.
        </p>

        <CodeEditor
          title="print_basico.py"
          initialCode={`# Imprimir texto simple
print("¡Hola, mundo!")

# Imprimir números
print(42)
print(3.14)

# Imprimir múltiples valores
print("Mi edad es:", 25)

# Imprimir con salto de línea
print("Primera línea")
print("Segunda línea")`}
        />
      </section>

      {/* Concepto 4: Nombres de variables */}
      <section className="bg-card rounded-xl p-6 shadow-card border border-border">
        <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">4</span>
          Reglas para nombrar variables
        </h3>
        
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-foreground">Regla</th>
                <th className="text-left py-3 px-4 font-semibold text-success">✓ Válido</th>
                <th className="text-left py-3 px-4 font-semibold text-destructive">✗ Inválido</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border/50">
                <td className="py-3 px-4">Empieza con letra o _</td>
                <td className="py-3 px-4 font-mono text-success">nombre, _edad</td>
                <td className="py-3 px-4 font-mono text-destructive">1nombre, @edad</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 px-4">Solo letras, números, _</td>
                <td className="py-3 px-4 font-mono text-success">mi_variable2</td>
                <td className="py-3 px-4 font-mono text-destructive">mi-variable, mi variable</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 px-4">Distingue mayúsculas</td>
                <td className="py-3 px-4 font-mono text-success">Edad ≠ edad ≠ EDAD</td>
                <td className="py-3 px-4">—</td>
              </tr>
              <tr>
                <td className="py-3 px-4">No usar palabras reservadas</td>
                <td className="py-3 px-4 font-mono text-success">mi_if, clase</td>
                <td className="py-3 px-4 font-mono text-destructive">if, class, for</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-muted/50 rounded-lg p-4 border border-border">
          <p className="text-sm text-muted-foreground">
            💡 <strong className="text-accent">Convención:</strong> En Python usamos <code className="bg-muted px-1.5 py-0.5 rounded text-primary">snake_case</code> para 
            variables y funciones: <code className="bg-muted px-1.5 py-0.5 rounded text-primary">mi_variable</code>, 
            <code className="bg-muted px-1.5 py-0.5 rounded text-primary">calcular_promedio</code>
          </p>
        </div>
      </section>

      {/* Ejercicio */}
      <section>
        <h3 className="text-xl font-semibold text-foreground mb-4">🎯 Ejercicio de práctica</h3>
        <Exercise
          question="¿Cuál de las siguientes es una variable válida en Python?"
          options={[
            { value: 'a', label: '2nombres' },
            { value: 'b', label: 'mi-dato' },
            { value: 'c', label: 'dato_ia' },
            { value: 'd', label: 'for' }
          ]}
          correctAnswer="c"
          hint="Recuerda: las variables no pueden empezar con números, ni contener guiones, ni ser palabras reservadas."
          explanation="'dato_ia' es válida porque empieza con letra, solo usa letras y guion bajo, y no es una palabra reservada de Python."
        />
      </section>

      {/* Practica tu código */}
      <section className="bg-card rounded-xl p-6 shadow-card border border-border">
        <h3 className="text-xl font-semibold text-foreground mb-4">💻 Practica tu código</h3>
        <p className="text-muted-foreground mb-4">
          Modifica el código para imprimir tu nombre y un mensaje de bienvenida:
        </p>
        <CodeEditor
          title="practica.py"
          initialCode={`# Tu primer programa en Python
# Cambia el texto entre comillas

mensaje = "¡Hola, Python!"
print(mensaje)

# Ahora prueba imprimir tu nombre
nombre = "Tu nombre aquí"
print("Me llamo:", nombre)`}
        />
      </section>
    </div>
  );
};
