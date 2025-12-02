import React from 'react';
import { CodeEditor } from '../CodeEditor';
import { Exercise } from '../Exercise';

export const VariablesModule: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Variables y Tipos de Datos
        </h2>
        <p className="text-muted-foreground text-lg">
          Las variables son contenedores para almacenar datos. Python tiene varios tipos de datos fundamentales.
        </p>
      </div>

      {/* Concepto: Qué es una variable */}
      <section className="bg-card rounded-xl p-6 shadow-md border border-border">
        <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">1</span>
          ¿Qué es una variable?
        </h3>
        <p className="text-muted-foreground mb-4">
          Una variable es como una <strong className="text-foreground">caja etiquetada</strong> donde guardas información. 
          El nombre de la variable es la etiqueta, y el valor es lo que hay dentro.
        </p>

        <CodeEditor
          title="variables.py"
          initialCode={`# Crear una variable es simple:
# nombre_variable = valor

edad = 25
nombre = "Carlos"
precio = 19.99
es_estudiante = True

# Imprimir las variables
print("Nombre:", nombre)
print("Edad:", edad)
print("Precio:", precio)
print("Es estudiante:", es_estudiante)`}
        />
      </section>

      {/* Tipos de datos */}
      <section className="bg-card rounded-xl p-6 shadow-md border border-border">
        <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">2</span>
          Tipos de Datos Fundamentales
        </h3>

        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          {/* int */}
          <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-1 rounded bg-primary text-primary-foreground text-xs font-bold">int</span>
              <span className="font-semibold text-foreground">Entero</span>
            </div>
            <p className="text-sm text-muted-foreground mb-2">Números sin decimales</p>
            <code className="text-sm font-mono text-foreground">edad = 25</code>
          </div>

          {/* float */}
          <div className="p-4 rounded-lg bg-secondary/5 border border-secondary/20">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-1 rounded bg-secondary text-secondary-foreground text-xs font-bold">float</span>
              <span className="font-semibold text-foreground">Flotante</span>
            </div>
            <p className="text-sm text-muted-foreground mb-2">Números con decimales</p>
            <code className="text-sm font-mono text-foreground">pi = 3.14159</code>
          </div>

          {/* str */}
          <div className="p-4 rounded-lg bg-accent/5 border border-accent/20">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-1 rounded bg-accent text-accent-foreground text-xs font-bold">str</span>
              <span className="font-semibold text-foreground">Cadena de texto</span>
            </div>
            <p className="text-sm text-muted-foreground mb-2">Texto entre comillas</p>
            <code className="text-sm font-mono text-foreground">nombre = "Ana"</code>
          </div>

          {/* bool */}
          <div className="p-4 rounded-lg bg-warning/5 border border-warning/20">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-1 rounded bg-warning text-warning-foreground text-xs font-bold">bool</span>
              <span className="font-semibold text-foreground">Booleano</span>
            </div>
            <p className="text-sm text-muted-foreground mb-2">Verdadero o Falso</p>
            <code className="text-sm font-mono text-foreground">activo = True</code>
          </div>
        </div>

        <CodeEditor
          title="tipos_datos.py"
          initialCode={`# Diferentes tipos de datos
entero = 42
flotante = 3.14
texto = "Hola IA"
booleano = True

# Ver el tipo de cada variable con type()
print("42 es tipo:", type(entero))
print("3.14 es tipo:", type(flotante))
print("'Hola IA' es tipo:", type(texto))
print("True es tipo:", type(booleano))`}
        />
      </section>

      {/* Conversión de tipos */}
      <section className="bg-card rounded-xl p-6 shadow-md border border-border">
        <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">3</span>
          Conversión de Tipos (Casting)
        </h3>
        <p className="text-muted-foreground mb-4">
          Puedes convertir datos de un tipo a otro usando funciones de conversión:
        </p>

        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-foreground">Función</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Convierte a</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Ejemplo</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border/50">
                <td className="py-3 px-4 font-mono">int()</td>
                <td className="py-3 px-4">Entero</td>
                <td className="py-3 px-4 font-mono">int("25") → 25</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 px-4 font-mono">float()</td>
                <td className="py-3 px-4">Flotante</td>
                <td className="py-3 px-4 font-mono">float("3.14") → 3.14</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 px-4 font-mono">str()</td>
                <td className="py-3 px-4">Texto</td>
                <td className="py-3 px-4 font-mono">str(100) → "100"</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono">bool()</td>
                <td className="py-3 px-4">Booleano</td>
                <td className="py-3 px-4 font-mono">bool(1) → True</td>
              </tr>
            </tbody>
          </table>
        </div>

        <CodeEditor
          title="conversion.py"
          initialCode={`# Conversión de tipos
numero_texto = "100"
numero_entero = int(numero_texto)

print("Texto:", numero_texto, type(numero_texto))
print("Entero:", numero_entero, type(numero_entero))

# Convertir entero a flotante
edad = 25
edad_float = float(edad)
print("Como float:", edad_float)

# Concatenar número con texto
precio = 49.99
mensaje = "El precio es: " + str(precio)
print(mensaje)`}
        />
      </section>

      {/* Ejemplo IA */}
      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl p-6 border border-primary/20">
        <h3 className="text-xl font-semibold text-foreground mb-4">🤖 Aplicación en IA</h3>
        <p className="text-muted-foreground mb-4">
          En IA y análisis de datos, los tipos de datos son fundamentales. Por ejemplo, 
          al procesar predicciones de un modelo:
        </p>

        <CodeEditor
          title="ejemplo_ia.py"
          initialCode={`# Predicción de un modelo de IA
probabilidad = 0.87  # float: probabilidad de spam
es_spam = probabilidad > 0.5  # bool: decisión
confianza = int(probabilidad * 100)  # int: porcentaje

print("Probabilidad:", probabilidad)
print("¿Es spam?:", es_spam)
print("Confianza:", str(confianza) + "%")`}
        />
      </section>

      {/* Ejercicio */}
      <section>
        <h3 className="text-xl font-semibold text-foreground mb-4">🎯 Ejercicio de práctica</h3>
        <Exercise
          question="¿Cuál es el tipo de dato de la variable: precision = 0.95?"
          options={[
            { value: 'a', label: 'int' },
            { value: 'b', label: 'float' },
            { value: 'c', label: 'str' },
            { value: 'd', label: 'bool' }
          ]}
          correctAnswer="b"
          hint="Los números con punto decimal son de un tipo específico..."
          explanation="0.95 es un número con decimales, por lo tanto es de tipo float (flotante)."
        />
      </section>

      {/* Ejercicio 2 */}
      <section>
        <Exercise
          question="¿Qué función usarías para convertir el texto '42' a un número entero?"
          type="fill-blank"
          correctAnswer="int"
          hint="Es una función corta de 3 letras que representa 'integer' (entero)."
          explanation="int() convierte texto o flotantes a números enteros. int('42') devuelve 42."
        />
      </section>
    </div>
  );
};
