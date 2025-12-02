import React from 'react';
import { Download, FileText, CheckCircle, BookOpen } from 'lucide-react';
import { Button } from '../ui/button';

export const ResumenModule: React.FC = () => {
  const handleDownload = () => {
    const content = `
================================================================================
                    FUNDAMENTOS DE PYTHON PARA IA
                         RESUMEN DE LA SESIÓN
================================================================================

Material didáctico elaborado por Henry Tene Torres para efectos educativos

--------------------------------------------------------------------------------
1. SINTAXIS BÁSICA
--------------------------------------------------------------------------------
• Indentación: Python usa espacios (4 espacios) para definir bloques de código
• Comentarios: # para una línea
• print(): Muestra información en consola
• Nombres de variables: snake_case, sin espacios, no empezar con números

--------------------------------------------------------------------------------
2. VARIABLES Y TIPOS DE DATOS
--------------------------------------------------------------------------------
• int    - Números enteros:      edad = 25
• float  - Números decimales:    precio = 19.99
• str    - Cadenas de texto:     nombre = "Ana"
• bool   - Booleanos:            activo = True

Conversión de tipos:
• int("25")   → 25
• float(10)   → 10.0
• str(100)    → "100"
• bool(1)     → True

--------------------------------------------------------------------------------
3. OPERADORES
--------------------------------------------------------------------------------
Aritméticos:
+  Suma          10 + 3 = 13
-  Resta         10 - 3 = 7
*  Multiplicación 10 * 3 = 30
/  División      10 / 3 = 3.33
// División entera 10 // 3 = 3
%  Módulo        10 % 3 = 1
** Potencia      2 ** 3 = 8

Comparación:
==  Igual        !=  Diferente
>   Mayor        <   Menor
>=  Mayor/igual  <=  Menor/igual

Lógicos:
and  Ambos verdaderos
or   Al menos uno verdadero
not  Invierte el valor

--------------------------------------------------------------------------------
4. ESTRUCTURAS DE DATOS
--------------------------------------------------------------------------------
LISTA [ ]
- Ordenada, modificable, permite duplicados
- frutas = ["manzana", "banana"]
- frutas[0]  → "manzana"
- frutas.append("naranja")

DICCIONARIO { }
- Pares clave:valor
- persona = {"nombre": "Ana", "edad": 28}
- persona["nombre"]  → "Ana"

TUPLA ( )
- Inmutable (no se puede modificar)
- coords = (10.5, 20.3)
- coords[0]  → 10.5

--------------------------------------------------------------------------------
5. CONDICIONALES
--------------------------------------------------------------------------------
if condición:
    # código si es True
elif otra_condición:
    # código si la primera es False y esta es True
else:
    # código si todas son False

Ejemplo:
if edad >= 18:
    print("Mayor de edad")
elif edad >= 13:
    print("Adolescente")
else:
    print("Niño")

--------------------------------------------------------------------------------
6. BUCLES
--------------------------------------------------------------------------------
FOR - Cuando sabes cuántas veces repetir:
for i in range(5):
    print(i)  # 0, 1, 2, 3, 4

for fruta in frutas:
    print(fruta)

WHILE - Mientras una condición sea verdadera:
contador = 0
while contador < 5:
    print(contador)
    contador += 1

Control de bucles:
- break: Termina el bucle
- continue: Salta a la siguiente iteración

--------------------------------------------------------------------------------
7. FUNCIONES ÚTILES
--------------------------------------------------------------------------------
len(x)      - Longitud de lista/string
type(x)     - Tipo de dato
range(n)    - Genera secuencia 0 a n-1
enumerate() - Índice y valor en bucle
print()     - Mostrar en consola

--------------------------------------------------------------------------------
APLICACIONES EN IA
--------------------------------------------------------------------------------
• Procesamiento de predicciones con listas
• Filtrado de datos con condicionales
• Iteración sobre datasets con bucles
• Almacenamiento de métricas en diccionarios

================================================================================
                    DATA SCIENCE ANALYSIS
================================================================================
`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Resumen_Python_IA_DataScienceAnalysis.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const topics = [
    { title: 'Sintaxis Básica', items: ['Indentación', 'Comentarios', 'print()', 'Nombres de variables'] },
    { title: 'Variables y Tipos', items: ['int (enteros)', 'float (decimales)', 'str (texto)', 'bool (booleano)'] },
    { title: 'Operadores', items: ['Aritméticos (+, -, *, /)', 'Comparación (==, !=, <, >)', 'Lógicos (and, or, not)'] },
    { title: 'Estructuras de Datos', items: ['Listas [ ]', 'Diccionarios { }', 'Tuplas ( )'] },
    { title: 'Condicionales', items: ['if', 'elif', 'else', 'Condiciones compuestas'] },
    { title: 'Bucles', items: ['for + range()', 'while', 'break / continue', 'enumerate()'] },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
          <FileText className="h-8 w-8 text-primary" />
          Resumen del Curso
        </h2>
        <p className="text-muted-foreground text-lg">
          Repasa todos los conceptos clave y descarga el material de referencia.
        </p>
      </div>

      {/* Download Card */}
      <section className="bg-gradient-to-br from-primary/20 via-secondary/10 to-primary/5 rounded-xl p-8 border border-primary/30 text-center">
        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
          <Download className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2">
          Descarga tu resumen
        </h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Obtén un archivo con todos los conceptos, ejemplos y referencias rápidas 
          para consultar cuando lo necesites.
        </p>
        <Button onClick={handleDownload} variant="hero" size="lg">
          <Download className="h-5 w-5" />
          Descargar Resumen (.txt)
        </Button>
      </section>

      {/* Topics Grid */}
      <section>
        <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          Temas cubiertos
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {topics.map((topic, index) => (
            <div key={topic.title} className="bg-card rounded-xl p-5 border border-border shadow-sm card-hover">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </span>
                <h4 className="font-semibold text-foreground">{topic.title}</h4>
              </div>
              <ul className="space-y-2">
                {topic.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-success flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Reference */}
      <section className="bg-card rounded-xl p-6 shadow-md border border-border">
        <h3 className="text-xl font-semibold text-foreground mb-4">📋 Referencia Rápida</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-foreground mb-2">Tipos de datos</h4>
            <div className="font-mono text-sm space-y-1 bg-muted/50 rounded-lg p-3">
              <p><span className="text-primary">int</span>: 42, -10, 0</p>
              <p><span className="text-secondary">float</span>: 3.14, -0.5</p>
              <p><span className="text-accent">str</span>: "Hola", 'Python'</p>
              <p><span className="text-warning">bool</span>: True, False</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-2">Estructuras</h4>
            <div className="font-mono text-sm space-y-1 bg-muted/50 rounded-lg p-3">
              <p><span className="text-primary">lista</span>: [1, 2, 3]</p>
              <p><span className="text-secondary">dict</span>: {`{"a": 1}`}</p>
              <p><span className="text-accent">tupla</span>: (1, 2, 3)</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-2">Condicional</h4>
            <div className="font-mono text-sm bg-muted/50 rounded-lg p-3">
              <p><span className="code-keyword">if</span> x {'>'} 10:</p>
              <p className="ml-4">print("grande")</p>
              <p><span className="code-keyword">elif</span> x {'>'} 5:</p>
              <p className="ml-4">print("medio")</p>
              <p><span className="code-keyword">else</span>:</p>
              <p className="ml-4">print("pequeño")</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-2">Bucle for</h4>
            <div className="font-mono text-sm bg-muted/50 rounded-lg p-3">
              <p><span className="code-keyword">for</span> i <span className="code-keyword">in</span> range(5):</p>
              <p className="ml-4">print(i)</p>
              <p className="mt-2"><span className="code-keyword">for</span> item <span className="code-keyword">in</span> lista:</p>
              <p className="ml-4">print(item)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="bg-gradient-to-br from-secondary/10 to-primary/10 rounded-xl p-6 border border-secondary/30">
        <h3 className="text-xl font-semibold text-foreground mb-4">🚀 ¿Qué sigue?</h3>
        <p className="text-muted-foreground mb-4">
          ¡Felicidades por completar los fundamentos! Ahora puedes explorar:
        </p>
        <ul className="space-y-2 text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-secondary font-bold">→</span>
            <span><strong className="text-foreground">Funciones:</strong> Crea código reutilizable con def</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-secondary font-bold">→</span>
            <span><strong className="text-foreground">NumPy:</strong> Procesamiento numérico eficiente</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-secondary font-bold">→</span>
            <span><strong className="text-foreground">Pandas:</strong> Análisis de datos con DataFrames</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-secondary font-bold">→</span>
            <span><strong className="text-foreground">Scikit-learn:</strong> Machine Learning en Python</span>
          </li>
        </ul>
      </section>

      {/* Footer */}
      <div className="text-center py-4 text-muted-foreground">
        <p className="text-sm">
          Material didáctico elaborado por <strong className="text-foreground">Henry Tene Torres</strong> para efectos educativos
        </p>
      </div>
    </div>
  );
};
