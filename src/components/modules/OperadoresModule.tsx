import React from 'react';
import { CodeEditor } from '../CodeEditor';
import { Exercise } from '../Exercise';

export const OperadoresModule: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Operadores en Python
        </h2>
        <p className="text-muted-foreground text-lg">
          Los operadores permiten realizar operaciones con datos: cálculos matemáticos, comparaciones y lógica.
        </p>
      </div>

      {/* Operadores Aritméticos */}
      <section className="bg-card rounded-xl p-6 shadow-md border border-border">
        <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">1</span>
          Operadores Aritméticos
        </h3>

        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-foreground">Operador</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Nombre</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Ejemplo</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Resultado</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground font-mono">
              <tr className="border-b border-border/50">
                <td className="py-3 px-4 text-primary font-bold">+</td>
                <td className="py-3 px-4 font-sans">Suma</td>
                <td className="py-3 px-4">10 + 3</td>
                <td className="py-3 px-4">13</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 px-4 text-primary font-bold">-</td>
                <td className="py-3 px-4 font-sans">Resta</td>
                <td className="py-3 px-4">10 - 3</td>
                <td className="py-3 px-4">7</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 px-4 text-primary font-bold">*</td>
                <td className="py-3 px-4 font-sans">Multiplicación</td>
                <td className="py-3 px-4">10 * 3</td>
                <td className="py-3 px-4">30</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 px-4 text-primary font-bold">/</td>
                <td className="py-3 px-4 font-sans">División</td>
                <td className="py-3 px-4">10 / 3</td>
                <td className="py-3 px-4">3.333...</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 px-4 text-primary font-bold">//</td>
                <td className="py-3 px-4 font-sans">División entera</td>
                <td className="py-3 px-4">10 // 3</td>
                <td className="py-3 px-4">3</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 px-4 text-primary font-bold">%</td>
                <td className="py-3 px-4 font-sans">Módulo (resto)</td>
                <td className="py-3 px-4">10 % 3</td>
                <td className="py-3 px-4">1</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-primary font-bold">**</td>
                <td className="py-3 px-4 font-sans">Potencia</td>
                <td className="py-3 px-4">2 ** 3</td>
                <td className="py-3 px-4">8</td>
              </tr>
            </tbody>
          </table>
        </div>

        <CodeEditor
          title="aritmeticos.py"
          initialCode={`# Operaciones aritméticas básicas
a = 15
b = 4

print("Suma:", a + b)
print("Resta:", a - b)
print("Multiplicación:", a * b)
print("División:", a / b)
print("División entera:", a // b)
print("Módulo (resto):", a % b)
print("Potencia:", a ** 2)`}
        />
      </section>

      {/* Operadores de Comparación */}
      <section className="bg-card rounded-xl p-6 shadow-md border border-border">
        <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">2</span>
          Operadores de Comparación
        </h3>
        <p className="text-muted-foreground mb-4">
          Comparan dos valores y devuelven <code className="bg-muted px-1 rounded">True</code> o <code className="bg-muted px-1 rounded">False</code>:
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
          {[
            { op: '==', name: 'Igual a', ex: '5 == 5 → True' },
            { op: '!=', name: 'Diferente de', ex: '5 != 3 → True' },
            { op: '>', name: 'Mayor que', ex: '5 > 3 → True' },
            { op: '<', name: 'Menor que', ex: '3 < 5 → True' },
            { op: '>=', name: 'Mayor o igual', ex: '5 >= 5 → True' },
            { op: '<=', name: 'Menor o igual', ex: '3 <= 5 → True' },
          ].map((item) => (
            <div key={item.op} className="p-3 rounded-lg bg-muted/50 border border-border">
              <code className="text-primary font-bold text-lg">{item.op}</code>
              <p className="text-sm text-muted-foreground mt-1">{item.name}</p>
              <code className="text-xs font-mono">{item.ex}</code>
            </div>
          ))}
        </div>

        <CodeEditor
          title="comparacion.py"
          initialCode={`# Comparaciones
x = 10
y = 5

print("x == y:", x == y)
print("x != y:", x != y)
print("x > y:", x > y)
print("x < y:", x < y)
print("x >= 10:", x >= 10)
print("y <= 5:", y <= 5)`}
        />
      </section>

      {/* Operadores Lógicos */}
      <section className="bg-card rounded-xl p-6 shadow-md border border-border">
        <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">3</span>
          Operadores Lógicos
        </h3>
        <p className="text-muted-foreground mb-4">
          Combinan expresiones booleanas para crear condiciones más complejas:
        </p>

        <div className="grid sm:grid-cols-3 gap-4 mb-4">
          <div className="p-4 rounded-lg bg-success/10 border border-success/30">
            <code className="text-success font-bold text-xl">and</code>
            <p className="text-sm text-muted-foreground mt-2">Verdadero si <strong>ambos</strong> son verdaderos</p>
            <code className="text-xs font-mono block mt-2">True and True → True</code>
            <code className="text-xs font-mono block">True and False → False</code>
          </div>
          <div className="p-4 rounded-lg bg-primary/10 border border-primary/30">
            <code className="text-primary font-bold text-xl">or</code>
            <p className="text-sm text-muted-foreground mt-2">Verdadero si <strong>al menos uno</strong> es verdadero</p>
            <code className="text-xs font-mono block mt-2">True or False → True</code>
            <code className="text-xs font-mono block">False or False → False</code>
          </div>
          <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30">
            <code className="text-destructive font-bold text-xl">not</code>
            <p className="text-sm text-muted-foreground mt-2"><strong>Invierte</strong> el valor</p>
            <code className="text-xs font-mono block mt-2">not True → False</code>
            <code className="text-xs font-mono block">not False → True</code>
          </div>
        </div>

        <CodeEditor
          title="logicos.py"
          initialCode={`# Operadores lógicos
edad = 25
tiene_licencia = True

# and: ambas condiciones deben ser True
puede_conducir = edad >= 18 and tiene_licencia
print("¿Puede conducir?:", puede_conducir)

# or: al menos una condición debe ser True
es_fin_semana = False
es_feriado = True
puede_descansar = es_fin_semana or es_feriado
print("¿Puede descansar?:", puede_descansar)

# not: invierte el valor
esta_lloviendo = False
salir_a_pasear = not esta_lloviendo
print("¿Salir a pasear?:", salir_a_pasear)`}
        />
      </section>

      {/* Ejemplo IA */}
      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl p-6 border border-primary/20">
        <h3 className="text-xl font-semibold text-foreground mb-4">🤖 Aplicación en IA</h3>
        <p className="text-muted-foreground mb-4">
          Los operadores son esenciales para filtrar datos y tomar decisiones en modelos de IA:
        </p>

        <CodeEditor
          title="filtro_ia.py"
          initialCode={`# Filtrar predicciones de un modelo
confianza = 0.85
umbral = 0.7

# Comparación
es_confiable = confianza >= umbral
print("¿Predicción confiable?:", es_confiable)

# Múltiples condiciones con operadores lógicos
categoria = "spam"
es_spam_confiable = categoria == "spam" and confianza > 0.8
print("¿Es spam con alta confianza?:", es_spam_confiable)

# Calcular métricas
precision = 85
recall = 78
f1_score = 2 * (precision * recall) / (precision + recall)
print("F1 Score:", f1_score)`}
        />
      </section>

      {/* Ejercicios */}
      <section>
        <h3 className="text-xl font-semibold text-foreground mb-4">🎯 Ejercicios de práctica</h3>
        <div className="space-y-6">
          <Exercise
            question="¿Cuál es el resultado de: 17 % 5?"
            options={[
              { value: 'a', label: '3' },
              { value: 'b', label: '2' },
              { value: 'c', label: '3.4' },
              { value: 'd', label: '12' }
            ]}
            correctAnswer="b"
            hint="El operador % devuelve el resto de la división. 17 ÷ 5 = 3 con resto..."
            explanation="17 % 5 = 2. Porque 17 ÷ 5 = 3 con resto 2 (5×3=15, 17-15=2)."
          />

          <Exercise
            question="¿Cuál es el resultado de: True and False or True?"
            options={[
              { value: 'a', label: 'True' },
              { value: 'b', label: 'False' }
            ]}
            correctAnswer="a"
            hint="El operador 'and' tiene mayor precedencia que 'or'. Primero evalúa True and False..."
            explanation="True and False = False. Luego False or True = True."
          />
        </div>
      </section>
    </div>
  );
};
