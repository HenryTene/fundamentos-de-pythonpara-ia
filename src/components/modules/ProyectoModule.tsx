import React from 'react';
import { CodeEditor } from '../CodeEditor';
import { Rocket, Target, Lightbulb, CheckCircle } from 'lucide-react';

export const ProyectoModule: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
          <Rocket className="h-8 w-8 text-primary" />
          Mini-Proyecto: Analizador de Sentimientos
        </h2>
        <p className="text-muted-foreground text-lg">
          Combina todo lo aprendido para crear un sistema simple de análisis de opiniones de clientes.
        </p>
      </div>

      {/* Objetivo */}
      <section className="bg-gradient-to-br from-primary/10 to-info/10 rounded-xl p-6 border border-primary/20">
        <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          Objetivo del Proyecto
        </h3>
        <p className="text-muted-foreground mb-4">
          Crearás un programa que analiza opiniones de clientes y las clasifica como 
          <span className="text-success font-semibold"> positivas</span>, 
          <span className="text-accent font-semibold"> neutrales</span> o 
          <span className="text-destructive font-semibold"> negativas</span> 
          según palabras clave.
        </p>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { icon: 'Variables', desc: 'Almacenar datos y contadores' },
            { icon: 'Listas/Dict', desc: 'Palabras clave y opiniones' },
            { icon: 'Condicionales', desc: 'Clasificar sentimientos' },
            { icon: 'Bucles', desc: 'Procesar múltiples opiniones' },
          ].map((item) => (
            <div key={item.icon} className="flex items-center gap-2 p-3 bg-card rounded-lg border border-border">
              <CheckCircle className="h-4 w-4 text-success flex-shrink-0" />
              <div>
                <span className="font-semibold text-foreground text-sm">{item.icon}</span>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Paso 1 */}
      <section className="bg-card rounded-xl p-6 shadow-card border border-border">
        <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">1</span>
          Definir los datos
        </h3>
        <p className="text-muted-foreground mb-4">
          Primero, creamos las estructuras de datos: listas de palabras clave para cada sentimiento 
          y las opiniones a analizar.
        </p>

        <CodeEditor
          title="paso1_datos.py"
          initialCode={`# Palabras clave para cada sentimiento
palabras_positivas = ["excelente", "bueno", "genial", "increible", "fantastico", "recomendado", "amor"]
palabras_negativas = ["malo", "terrible", "pesimo", "horrible", "odio", "decepcion", "peor"]

# Opiniones de clientes a analizar
opiniones = [
    "El producto es excelente, lo recomiendo",
    "Terrible experiencia, muy malo",
    "Normal, nada especial",
    "Me encanta, es genial y fantastico",
    "La peor compra, horrible servicio"
]

# Mostrar los datos
print("Palabras positivas:", len(palabras_positivas))
print("Palabras negativas:", len(palabras_negativas))
print("Opiniones a analizar:", len(opiniones))`}
        />
      </section>

      {/* Paso 2 */}
      <section className="bg-card rounded-xl p-6 shadow-card border border-border">
        <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">2</span>
          Crear la función de análisis
        </h3>
        <p className="text-muted-foreground mb-4">
          Creamos una lógica que busca palabras clave en cada opinión y determina el sentimiento.
        </p>

        <CodeEditor
          title="paso2_analisis.py"
          initialCode={`# Datos
palabras_positivas = ["excelente", "bueno", "genial", "increible", "fantastico", "recomendado"]
palabras_negativas = ["malo", "terrible", "pesimo", "horrible", "odio", "peor"]

# Función para analizar una opinión
def analizar_sentimiento(opinion):
    # Convertir a minúsculas para comparar
    opinion_lower = opinion.lower()
    
    puntos_positivos = 0
    puntos_negativos = 0
    
    # Buscar palabras positivas
    for palabra in palabras_positivas:
        if palabra in opinion_lower:
            puntos_positivos = puntos_positivos + 1
    
    # Buscar palabras negativas
    for palabra in palabras_negativas:
        if palabra in opinion_lower:
            puntos_negativos = puntos_negativos + 1
    
    # Determinar sentimiento
    if puntos_positivos > puntos_negativos:
        return "POSITIVO"
    elif puntos_negativos > puntos_positivos:
        return "NEGATIVO"
    else:
        return "NEUTRAL"

# Probar con una opinión
prueba = "El producto es excelente y genial"
resultado = analizar_sentimiento(prueba)
print(f"Opinión: {prueba}")
print(f"Sentimiento: {resultado}")`}
        />
      </section>

      {/* Paso 3 */}
      <section className="bg-card rounded-xl p-6 shadow-card border border-border">
        <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">3</span>
          Procesar todas las opiniones
        </h3>
        <p className="text-muted-foreground mb-4">
          Usamos un bucle para analizar todas las opiniones y generar estadísticas.
        </p>

        <CodeEditor
          title="paso3_procesamiento.py"
          initialCode={`# Configuración
palabras_positivas = ["excelente", "bueno", "genial", "increible", "fantastico", "recomendado"]
palabras_negativas = ["malo", "terrible", "pesimo", "horrible", "odio", "peor"]

opiniones = [
    "El producto es excelente, lo recomiendo",
    "Terrible experiencia, muy malo",
    "Normal, nada especial",
    "Me encanta, es genial y fantastico",
    "La peor compra, horrible servicio"
]

# Contadores
total_positivos = 0
total_negativos = 0
total_neutrales = 0

# Procesar cada opinión
print("=== ANÁLISIS DE SENTIMIENTOS ===")
print("")

for i, opinion in enumerate(opiniones, 1):
    opinion_lower = opinion.lower()
    puntos_pos = 0
    puntos_neg = 0
    
    for palabra in palabras_positivas:
        if palabra in opinion_lower:
            puntos_pos = puntos_pos + 1
    
    for palabra in palabras_negativas:
        if palabra in opinion_lower:
            puntos_neg = puntos_neg + 1
    
    if puntos_pos > puntos_neg:
        sentimiento = "POSITIVO"
        total_positivos = total_positivos + 1
    elif puntos_neg > puntos_pos:
        sentimiento = "NEGATIVO"
        total_negativos = total_negativos + 1
    else:
        sentimiento = "NEUTRAL"
        total_neutrales = total_neutrales + 1
    
    print(f"{i}. {sentimiento}: {opinion}")

# Resumen
print("")
print("=== RESUMEN ===")
print(f"Positivos: {total_positivos}")
print(f"Negativos: {total_negativos}")
print(f"Neutrales: {total_neutrales}")`}
        />
      </section>

      {/* Proyecto completo */}
      <section className="bg-card rounded-xl p-6 shadow-card border-2 border-primary">
        <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <Rocket className="h-5 w-5 text-primary" />
          Proyecto Completo
        </h3>
        <p className="text-muted-foreground mb-4">
          Aquí está el código completo con métricas adicionales. ¡Modifícalo y experimenta!
        </p>

        <CodeEditor
          title="analizador_completo.py"
          initialCode={`# ====================================
# ANALIZADOR DE SENTIMIENTOS v1.0
# Proyecto: Fundamentos de Python para IA
# ====================================

# Base de datos de palabras clave
palabras_positivas = [
    "excelente", "bueno", "genial", "increible", 
    "fantastico", "recomendado", "amor", "feliz",
    "satisfecho", "perfecto", "mejor"
]

palabras_negativas = [
    "malo", "terrible", "pesimo", "horrible", 
    "odio", "peor", "decepcion", "problema",
    "falla", "error", "lento"
]

# Opiniones de clientes (dataset)
opiniones = [
    "El producto es excelente, muy satisfecho",
    "Terrible experiencia, llegó con falla",
    "Normal, cumple su función",
    "Increible calidad, el mejor del mercado",
    "Pesimo servicio al cliente, decepcion total",
    "Bueno pero un poco lento",
    "Perfecto, amor a primera vista"
]

# Resultados
resultados = {
    "positivo": 0,
    "negativo": 0,
    "neutral": 0
}

# Análisis
print("=" * 50)
print("    SISTEMA DE ANÁLISIS DE SENTIMIENTOS")
print("=" * 50)

for numero, opinion in enumerate(opiniones, 1):
    texto = opinion.lower()
    score = 0
    
    for palabra in palabras_positivas:
        if palabra in texto:
            score = score + 1
    
    for palabra in palabras_negativas:
        if palabra in texto:
            score = score - 1
    
    if score > 0:
        tipo = "POSITIVO"
        resultados["positivo"] = resultados["positivo"] + 1
    elif score < 0:
        tipo = "NEGATIVO"
        resultados["negativo"] = resultados["negativo"] + 1
    else:
        tipo = "NEUTRAL"
        resultados["neutral"] = resultados["neutral"] + 1
    
    print(f"{numero}. [{tipo}] {opinion}")

# Estadísticas finales
total = len(opiniones)
print("")
print("=" * 50)
print("               ESTADÍSTICAS")
print("=" * 50)
print(f"Total analizado: {total} opiniones")
print(f"Positivos: {resultados['positivo']} ({resultados['positivo']*100//total}%)")
print(f"Negativos: {resultados['negativo']} ({resultados['negativo']*100//total}%)")
print(f"Neutrales: {resultados['neutral']} ({resultados['neutral']*100//total}%)")

# Conclusión
if resultados["positivo"] > resultados["negativo"]:
    print("")
    print("Conclusión: Sentimiento general POSITIVO")`}
        />
      </section>

      {/* Desafíos extra */}
      <section className="bg-muted/30 rounded-xl p-6 border border-border">
        <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-accent" />
          Desafíos Extra
        </h3>
        <p className="text-muted-foreground mb-4">
          ¿Quieres seguir practicando? Intenta estas mejoras:
        </p>
        <ul className="space-y-2 text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-primary">→</span>
            Agrega más palabras clave a cada lista
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">→</span>
            Implementa un sistema de puntaje ponderado (algunas palabras valen más)
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">→</span>
            Detecta si la opinión menciona un producto específico
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">→</span>
            Guarda los resultados en un diccionario con más detalles
          </li>
        </ul>
      </section>
    </div>
  );
};
