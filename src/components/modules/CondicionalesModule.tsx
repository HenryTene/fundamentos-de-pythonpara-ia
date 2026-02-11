import React from 'react';
import { CodeEditor } from '../CodeEditor';
import { Exercise } from '../Exercise';

export const CondicionalesModule: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Condicionales
        </h2>
        <p className="text-muted-foreground text-lg">
          Los condicionales permiten que tu programa tome decisiones y ejecute diferentes acciones según las condiciones.
        </p>
      </div>

      {/* Diagrama visual */}
      <section className="bg-card rounded-xl p-6 shadow-card border border-border">
        <h3 className="text-xl font-semibold text-foreground mb-4">🔀 Flujo de decisiones</h3>
        
        <div className="flex flex-col items-center gap-4 py-6">
          <div className="w-48 h-12 rounded-lg bg-primary/20 border-2 border-primary flex items-center justify-center font-semibold text-primary">
            Condición
          </div>
          <div className="flex items-center gap-8">
            <div className="flex flex-col items-center gap-2">
              <span className="text-success font-semibold">True ✓</span>
              <div className="w-0.5 h-8 bg-success"></div>
              <div className="w-36 h-10 rounded-lg bg-success/20 border-2 border-success flex items-center justify-center text-sm font-medium text-success">
                Ejecutar bloque
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-destructive font-semibold">False ✗</span>
              <div className="w-0.5 h-8 bg-destructive"></div>
              <div className="w-36 h-10 rounded-lg bg-destructive/20 border-2 border-destructive flex items-center justify-center text-sm font-medium text-destructive">
                Saltar bloque
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* if básico */}
      <section className="bg-card rounded-xl p-6 shadow-card border border-border">
        <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">1</span>
          La sentencia if
        </h3>
        <p className="text-muted-foreground mb-4">
          <code className="bg-muted px-1.5 py-0.5 rounded text-accent">if</code> evalúa una condición. Si es verdadera, ejecuta el bloque de código indentado.
        </p>

        <div className="bg-muted/50 rounded-lg p-4 mb-4 font-mono text-sm border border-border">
          <span className="code-keyword">if</span> condición<span className="text-muted-foreground">:</span>
          <br />
          <span className="text-muted-foreground ml-4"># código a ejecutar si es True</span>
        </div>

        <CodeEditor
          title="if_basico.py"
          initialCode={`# Ejemplo básico de if
edad = 18

if edad >= 18:
    print("Eres mayor de edad")
    print("Puedes votar")

print("Fin del programa")`}
        />
      </section>

      {/* if-else */}
      <section className="bg-card rounded-xl p-6 shadow-card border border-border">
        <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">2</span>
          if-else: Dos caminos
        </h3>
        <p className="text-muted-foreground mb-4">
          <code className="bg-muted px-1.5 py-0.5 rounded text-accent">else</code> define qué hacer cuando la condición es falsa.
        </p>

        <CodeEditor
          title="if_else.py"
          initialCode={`# if-else: un camino u otro
temperatura = 15

if temperatura > 25:
    print("Hace calor")
    print("Usa ropa ligera")
else:
    print("No hace calor")
    print("Considera un abrigo")

print("¡Que tengas buen día!")`}
        />
      </section>

      {/* if-elif-else */}
      <section className="bg-card rounded-xl p-6 shadow-card border border-border">
        <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">3</span>
          if-elif-else: Múltiples opciones
        </h3>
        <p className="text-muted-foreground mb-4">
          <code className="bg-muted px-1.5 py-0.5 rounded text-accent">elif</code> (else if) permite evaluar múltiples condiciones en secuencia.
        </p>

        <CodeEditor
          title="if_elif_else.py"
          initialCode={`# Clasificar una calificación
calificacion = 85

if calificacion >= 90:
    print("Excelente - A")
elif calificacion >= 80:
    print("Muy bien - B")
elif calificacion >= 70:
    print("Bien - C")
elif calificacion >= 60:
    print("Suficiente - D")
else:
    print("Reprobado - F")

print("Tu calificación fue:", calificacion)`}
        />
      </section>

      {/* Condiciones compuestas */}
      <section className="bg-card rounded-xl p-6 shadow-card border border-border">
        <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">4</span>
          Condiciones compuestas
        </h3>
        <p className="text-muted-foreground mb-4">
          Usa operadores lógicos (<code className="bg-muted px-1.5 py-0.5 rounded text-accent">and</code>, <code className="bg-muted px-1.5 py-0.5 rounded text-accent">or</code>, <code className="bg-muted px-1.5 py-0.5 rounded text-accent">not</code>) para combinar condiciones:
        </p>

        <CodeEditor
          title="condiciones_compuestas.py"
          initialCode={`# Verificar múltiples condiciones
edad = 25
tiene_licencia = True
tiene_multas = False

# Usar 'and' - todas deben ser True
if edad >= 18 and tiene_licencia:
    print("Puede conducir legalmente")

# Usar 'or' - al menos una debe ser True
if edad < 12 or edad > 65:
    print("Tarifa especial aplicable")

# Usar 'not' - invertir condición
if not tiene_multas:
    print("Historial limpio")

# Combinar operadores
if edad >= 18 and tiene_licencia and not tiene_multas:
    print("Conductor ideal")`}
        />
      </section>

      {/* Ejemplo IA */}
      <section className="bg-gradient-to-br from-primary/10 to-info/10 rounded-xl p-6 border border-primary/20">
        <h3 className="text-xl font-semibold text-foreground mb-4">🤖 Aplicación en IA</h3>
        <p className="text-muted-foreground mb-4">
          Los condicionales son esenciales para tomar decisiones basadas en predicciones de modelos:
        </p>

        <CodeEditor
          title="condicionales_ia.py"
          initialCode={`# Sistema de detección de spam
probabilidad_spam = 0.85
umbral_alto = 0.8
umbral_bajo = 0.3

# Clasificar el email según la confianza
if probabilidad_spam >= umbral_alto:
    print("Acción: Mover a SPAM")
    print("Confianza: Alta")
elif probabilidad_spam >= umbral_bajo:
    print("Acción: Marcar como sospechoso")
    print("Confianza: Media")
else:
    print("Acción: Dejar en bandeja")
    print("Confianza: Es legítimo")

# Mostrar probabilidad
print("Probabilidad de spam:", probabilidad_spam)`}
        />
      </section>

      {/* Ejercicios */}
      <section>
        <h3 className="text-xl font-semibold text-foreground mb-4">🎯 Ejercicios de práctica</h3>
        <div className="space-y-6">
          <Exercise
            question="Si x = 5, ¿qué imprime este código?\n\nif x > 10:\n    print('A')\nelif x > 3:\n    print('B')\nelse:\n    print('C')"
            options={[
              { value: 'a', label: 'A' },
              { value: 'b', label: 'B' },
              { value: 'c', label: 'C' },
              { value: 'd', label: 'No imprime nada' }
            ]}
            correctAnswer="b"
            hint="Evalúa las condiciones en orden: ¿5 > 10? No. ¿5 > 3? ..."
            explanation="x=5 no es mayor que 10, así que salta el primer if. Pero 5 > 3 es True, así que ejecuta el elif e imprime 'B'."
          />

          <Exercise
            question="¿Cuántas condiciones elif puedes tener después de un if?"
            options={[
              { value: 'a', label: 'Solo 1' },
              { value: 'b', label: 'Máximo 5' },
              { value: 'c', label: 'Las que necesites' },
              { value: 'd', label: 'Ninguna, elif no existe' }
            ]}
            correctAnswer="c"
            hint="Python es muy flexible con la cantidad de elif..."
            explanation="Puedes usar tantos elif como necesites. No hay límite."
          />
        </div>
      </section>

      {/* Práctica */}
      <section className="bg-card rounded-xl p-6 shadow-card border border-border">
        <h3 className="text-xl font-semibold text-foreground mb-4">💻 Reto: Clasificador de IMC</h3>
        <p className="text-muted-foreground mb-4">
          Modifica el código para clasificar el IMC (Índice de Masa Corporal):
          <br />
          • Menor a 18.5: Bajo peso
          <br />
          • 18.5 a 24.9: Normal
          <br />
          • 25 a 29.9: Sobrepeso
          <br />
          • 30 o más: Obesidad
        </p>
        <CodeEditor
          title="clasificador_imc.py"
          initialCode={`# Clasificador de IMC
# Peso en kilogramos
peso = 70
# Altura en metros
altura = 1.75

# Calcular IMC
imc = peso / (altura ** 2)
print("Tu IMC es:", imc)

# Completa la clasificación
if imc < 18.5:
    print("Clasificación: Bajo peso")
# Agrega los demás casos con elif y else`}
        />
      </section>
    </div>
  );
};
