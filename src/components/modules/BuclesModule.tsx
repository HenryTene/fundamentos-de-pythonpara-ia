import React from 'react';
import { CodeEditor } from '../CodeEditor';
import { Exercise } from '../Exercise';

export const BuclesModule: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Bucles (Loops)
        </h2>
        <p className="text-muted-foreground text-lg">
          Los bucles permiten repetir acciones múltiples veces sin escribir el mismo código una y otra vez.
        </p>
      </div>

      {/* Visualización */}
      <section className="bg-card rounded-xl p-6 shadow-card border border-border">
        <h3 className="text-xl font-semibold text-foreground mb-4">🔄 ¿Por qué usar bucles?</h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30">
            <h4 className="font-semibold text-destructive mb-2">❌ Sin bucle (repetitivo)</h4>
            <pre className="font-mono text-sm text-muted-foreground">
{`print(1)
print(2)
print(3)
print(4)
print(5)
# ... ¡y si son 1000?`}
            </pre>
          </div>
          <div className="p-4 rounded-lg bg-success/10 border border-success/30">
            <h4 className="font-semibold text-success mb-2">✓ Con bucle (eficiente)</h4>
            <pre className="font-mono text-sm text-muted-foreground">
{`for i in range(1, 6):
    print(i)

# ¡Solo 2 líneas para 
# cualquier cantidad!`}
            </pre>
          </div>
        </div>
      </section>

      {/* Bucle for */}
      <section className="bg-card rounded-xl p-6 shadow-card border border-border">
        <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">1</span>
          Bucle for
        </h3>
        <p className="text-muted-foreground mb-4">
          <code className="bg-muted px-1.5 py-0.5 rounded text-accent">for</code> itera sobre una secuencia (lista, tupla, rango, string).
          Ideal cuando <strong className="text-foreground">sabes cuántas veces</strong> necesitas repetir.
        </p>

        <div className="bg-muted/50 rounded-lg p-4 mb-4 font-mono text-sm border border-border">
          <span className="code-keyword">for</span> variable <span className="code-keyword">in</span> secuencia<span className="text-muted-foreground">:</span>
          <br />
          <span className="text-muted-foreground ml-4"># código a repetir</span>
        </div>

        <CodeEditor
          title="for_basico.py"
          initialCode={`# Iterar sobre una lista
frutas = ["manzana", "banana", "cereza"]

for fruta in frutas:
    print("Me gusta la", fruta)

print("---")

# Iterar con range()
for i in range(5):
    print("Iteración:", i)

print("---")

# range(inicio, fin, paso)
for num in range(0, 10, 2):
    print("Número par:", num)`}
        />
      </section>

      {/* for con índice */}
      <section className="bg-card rounded-xl p-6 shadow-card border border-border">
        <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">2</span>
          for con índice (enumerate)
        </h3>
        <p className="text-muted-foreground mb-4">
          <code className="bg-muted px-1.5 py-0.5 rounded text-accent">enumerate()</code> te da el índice y el valor al mismo tiempo:
        </p>

        <CodeEditor
          title="enumerate.py"
          initialCode={`# enumerate da índice y valor
nombres = ["Ana", "Carlos", "Diana"]

for indice, nombre in enumerate(nombres):
    print(f"Posición {indice}: {nombre}")

print("---")

# Empezar desde 1
for num, nombre in enumerate(nombres, start=1):
    print(f"{num}. {nombre}")`}
        />
      </section>

      {/* Bucle while */}
      <section className="bg-card rounded-xl p-6 shadow-card border border-border">
        <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-accent/10 text-accent flex items-center justify-center text-sm font-bold">3</span>
          Bucle while
        </h3>
        <p className="text-muted-foreground mb-4">
          <code className="bg-muted px-1.5 py-0.5 rounded text-accent">while</code> repite mientras una condición sea verdadera.
          Ideal cuando <strong className="text-foreground">no sabes cuántas veces</strong> necesitas repetir.
        </p>

        <div className="bg-warning/10 border border-warning/30 rounded-lg p-4 mb-4">
          <p className="text-sm text-foreground">
            ⚠️ <strong>Cuidado:</strong> Asegúrate de que la condición eventualmente sea False, 
            o el bucle será infinito.
          </p>
        </div>

        <CodeEditor
          title="while_basico.py"
          initialCode={`# Bucle while básico
contador = 0

while contador < 5:
    print("Contador:", contador)
    contador = contador + 1

print("Bucle terminado")

print("---")

# While con condición de salida
numero = 1
while numero <= 100:
    print(numero)
    # Duplicar el número en cada vuelta
    numero = numero * 2`}
        />
      </section>

      {/* break y continue */}
      <section className="bg-card rounded-xl p-6 shadow-card border border-border">
        <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-info/10 text-info flex items-center justify-center text-sm font-bold">4</span>
          Control de bucles: break y continue
        </h3>

        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30">
            <code className="text-destructive font-bold text-lg">break</code>
            <p className="text-sm text-muted-foreground mt-2">
              <strong>Termina</strong> el bucle completamente
            </p>
          </div>
          <div className="p-4 rounded-lg bg-warning/10 border border-warning/30">
            <code className="text-accent font-bold text-lg">continue</code>
            <p className="text-sm text-muted-foreground mt-2">
              <strong>Salta</strong> a la siguiente iteración
            </p>
          </div>
        </div>

        <CodeEditor
          title="break_continue.py"
          initialCode={`# break: terminar el bucle
print("Ejemplo de break:")
for i in range(10):
    if i == 5:
        print("¡Encontré el 5! Saliendo...")
        break
    print(i)

print("---")

# continue: saltar iteración
print("Ejemplo de continue:")
for i in range(6):
    if i == 3:
        print("Saltando el 3...")
        continue
    print("Número:", i)`}
        />
      </section>

      {/* Ejemplo IA */}
      <section className="bg-gradient-to-br from-primary/10 to-info/10 rounded-xl p-6 border border-primary/20">
        <h3 className="text-xl font-semibold text-foreground mb-4">🤖 Aplicación en IA</h3>
        <p className="text-muted-foreground mb-4">
          Los bucles son esenciales para procesar datasets y entrenar modelos:
        </p>

        <CodeEditor
          title="bucles_ia.py"
          initialCode={`# Procesar predicciones de un modelo
predicciones = [0.92, 0.15, 0.87, 0.45, 0.98, 0.23]
umbral = 0.5
spam_count = 0

print("Analizando emails...")
for i, prob in enumerate(predicciones, 1):
    if prob >= umbral:
        print(f"Email {i}: SPAM (prob: {prob})")
        spam_count = spam_count + 1
    else:
        print(f"Email {i}: OK (prob: {prob})")

print(f"Total spam detectado: {spam_count}")
print(f"Tasa de spam: {spam_count/len(predicciones)*100}%")`}
        />
      </section>

      {/* Ejercicios */}
      <section>
        <h3 className="text-xl font-semibold text-foreground mb-4">🎯 Ejercicios de práctica</h3>
        <div className="space-y-6">
          <Exercise
            question="¿Cuántas veces se ejecuta el print en: for i in range(3): print(i)?"
            options={[
              { value: 'a', label: '2 veces' },
              { value: 'b', label: '3 veces' },
              { value: 'c', label: '4 veces' }
            ]}
            correctAnswer="b"
            hint="range(3) genera los números 0, 1, 2..."
            explanation="range(3) genera 0, 1, 2 (tres números). Por lo tanto, el print se ejecuta 3 veces."
          />

          <Exercise
            question="¿Qué hace 'continue' dentro de un bucle?"
            options={[
              { value: 'a', label: 'Termina el bucle completamente' },
              { value: 'b', label: 'Salta a la siguiente iteración' },
              { value: 'c', label: 'Repite la iteración actual' },
              { value: 'd', label: 'Pausa el bucle' }
            ]}
            correctAnswer="b"
            hint="continue no termina el bucle, solo omite el resto del código en esa vuelta..."
            explanation="continue salta el resto del código de la iteración actual y pasa directamente a la siguiente."
          />
        </div>
      </section>

      {/* Práctica */}
      <section className="bg-card rounded-xl p-6 shadow-card border border-border">
        <h3 className="text-xl font-semibold text-foreground mb-4">💻 Reto: Filtrar datos</h3>
        <p className="text-muted-foreground mb-4">
          Usa un bucle para filtrar y contar solo los valores mayores a 50:
        </p>
        <CodeEditor
          title="filtrar_datos.py"
          initialCode={`# Filtrar valores mayores a 50
datos = [23, 67, 45, 89, 12, 78, 34, 91, 56]
mayores = []
contador = 0

# Completa el código
for valor in datos:
    if valor > 50:
        print(f"Encontrado: {valor}")
        # Agrega el valor a la lista 'mayores'
        # Incrementa el contador

print("Valores filtrados:", mayores)
print("Total encontrados:", contador)`}
        />
      </section>
    </div>
  );
};
