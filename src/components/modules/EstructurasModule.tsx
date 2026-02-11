import React from 'react';
import { CodeEditor } from '../CodeEditor';
import { Exercise } from '../Exercise';

export const EstructurasModule: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Estructuras de Datos
        </h2>
        <p className="text-muted-foreground text-lg">
          Las estructuras de datos permiten organizar y almacenar múltiples valores de forma eficiente.
        </p>
      </div>

      {/* Listas */}
      <section className="bg-card rounded-xl p-6 shadow-card border border-border">
        <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">1</span>
          Listas [ ]
        </h3>
        <p className="text-muted-foreground mb-4">
          Las listas son colecciones <strong className="text-foreground">ordenadas y modificables</strong>. 
          Se crean con corchetes <code className="bg-muted px-1.5 py-0.5 rounded text-accent">[]</code> y pueden contener cualquier tipo de dato.
        </p>

        <div className="grid sm:grid-cols-3 gap-3 mb-4">
          <div className="p-3 rounded-lg bg-success/10 border border-success/30 text-center">
            <span className="text-success font-semibold">✓ Ordenada</span>
            <p className="text-xs text-muted-foreground mt-1">Los elementos mantienen su posición</p>
          </div>
          <div className="p-3 rounded-lg bg-success/10 border border-success/30 text-center">
            <span className="text-success font-semibold">✓ Modificable</span>
            <p className="text-xs text-muted-foreground mt-1">Puedes agregar, eliminar, cambiar</p>
          </div>
          <div className="p-3 rounded-lg bg-success/10 border border-success/30 text-center">
            <span className="text-success font-semibold">✓ Duplicados</span>
            <p className="text-xs text-muted-foreground mt-1">Puede tener valores repetidos</p>
          </div>
        </div>

        <CodeEditor
          title="listas.py"
          initialCode={`# Crear una lista
frutas = ["manzana", "banana", "naranja"]
numeros = [1, 2, 3, 4, 5]
mixta = ["texto", 42, True, 3.14]

print("Lista de frutas:", frutas)
print("Cantidad:", len(frutas))

# Acceder por índice (empieza en 0)
print("Primera fruta:", frutas[0])
print("Última fruta:", frutas[-1])

# Modificar un elemento
frutas[1] = "mango"
print("Lista modificada:", frutas)`}
        />

        <div className="mt-4 bg-muted/50 rounded-lg p-4 border border-border">
          <h4 className="font-semibold text-foreground mb-2">Métodos comunes de listas:</h4>
          <div className="grid sm:grid-cols-2 gap-2 text-sm">
            <code className="bg-background px-2 py-1 rounded text-primary">.append(x) - Agrega al final</code>
            <code className="bg-background px-2 py-1 rounded text-primary">.remove(x) - Elimina elemento</code>
            <code className="bg-background px-2 py-1 rounded text-primary">.pop() - Elimina último</code>
            <code className="bg-background px-2 py-1 rounded text-primary">.sort() - Ordena la lista</code>
          </div>
        </div>
      </section>

      {/* Diccionarios */}
      <section className="bg-card rounded-xl p-6 shadow-card border border-border">
        <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-accent/10 text-accent flex items-center justify-center text-sm font-bold">2</span>
          Diccionarios {'{ }'}
        </h3>
        <p className="text-muted-foreground mb-4">
          Los diccionarios almacenan datos en pares <strong className="text-foreground">clave: valor</strong>. 
          Ideal para datos estructurados donde cada valor tiene un nombre.
        </p>

        <CodeEditor
          title="diccionarios.py"
          initialCode={`# Crear un diccionario
persona = {
    "nombre": "Ana",
    "edad": 28,
    "ciudad": "Lima",
    "es_estudiante": True
}

print("Diccionario:", persona)

# Acceder por clave
print("Nombre:", persona["nombre"])
print("Edad:", persona["edad"])

# Agregar nueva clave
persona["profesion"] = "Data Scientist"
print("Actualizado:", persona)

# Obtener todas las claves y valores
print("Claves:", list(persona.keys()))
print("Valores:", list(persona.values()))`}
        />
      </section>

      {/* Tuplas */}
      <section className="bg-card rounded-xl p-6 shadow-card border border-border">
        <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-info/10 text-info flex items-center justify-center text-sm font-bold">3</span>
          Tuplas ( )
        </h3>
        <p className="text-muted-foreground mb-4">
          Las tuplas son como listas pero <strong className="text-foreground">inmutables</strong> (no se pueden modificar después de crearlas). 
          Útiles para datos que no deben cambiar.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div className="p-4 rounded-lg bg-muted/50 border border-border">
            <h4 className="font-semibold text-foreground mb-2">Lista (mutable)</h4>
            <code className="text-sm font-mono">colores = ["rojo", "azul"]</code>
            <br />
            <code className="text-sm font-mono text-success">colores[0] = "verde" ✓</code>
          </div>
          <div className="p-4 rounded-lg bg-muted/50 border border-border">
            <h4 className="font-semibold text-foreground mb-2">Tupla (inmutable)</h4>
            <code className="text-sm font-mono">colores = ("rojo", "azul")</code>
            <br />
            <code className="text-sm font-mono text-destructive">colores[0] = "verde" ✗</code>
          </div>
        </div>

        <CodeEditor
          title="tuplas.py"
          initialCode={`# Crear una tupla
coordenadas = (10.5, 20.3)
dias = ("lunes", "martes", "miercoles")

print("Coordenadas:", coordenadas)
print("Primer día:", dias[0])
print("Cantidad de días:", len(dias))

# Las tuplas son útiles para:
# - Coordenadas (x, y)
# - Retornar múltiples valores
# - Datos que no deben cambiar

punto = (100, 200)
# Desempaquetado de tupla
x, y = punto
print("X:", x)
print("Y:", y)`}
        />
      </section>

      {/* Comparativa */}
      <section className="bg-card rounded-xl p-6 shadow-card border border-border">
        <h3 className="text-xl font-semibold text-foreground mb-4">📊 Comparativa</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-foreground">Característica</th>
                <th className="text-left py-3 px-4 font-semibold text-primary">Lista [ ]</th>
                <th className="text-left py-3 px-4 font-semibold text-accent">Dict {'{ }'}</th>
                <th className="text-left py-3 px-4 font-semibold text-info">Tupla ( )</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border/50">
                <td className="py-3 px-4 font-semibold">Ordenada</td>
                <td className="py-3 px-4">✓ Sí</td>
                <td className="py-3 px-4">✓ Sí (Python 3.7+)</td>
                <td className="py-3 px-4">✓ Sí</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 px-4 font-semibold">Modificable</td>
                <td className="py-3 px-4">✓ Sí</td>
                <td className="py-3 px-4">✓ Sí</td>
                <td className="py-3 px-4">✗ No</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 px-4 font-semibold">Duplicados</td>
                <td className="py-3 px-4">✓ Sí</td>
                <td className="py-3 px-4">✗ Claves únicas</td>
                <td className="py-3 px-4">✓ Sí</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold">Acceso</td>
                <td className="py-3 px-4">Por índice [0]</td>
                <td className="py-3 px-4">Por clave ["nombre"]</td>
                <td className="py-3 px-4">Por índice [0]</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Ejemplo IA */}
      <section className="bg-gradient-to-br from-primary/10 to-info/10 rounded-xl p-6 border border-primary/20">
        <h3 className="text-xl font-semibold text-foreground mb-4">🤖 Aplicación en IA</h3>
        <p className="text-muted-foreground mb-4">
          Las estructuras de datos son fundamentales para manejar datasets y resultados de modelos:
        </p>

        <CodeEditor
          title="estructuras_ia.py"
          initialCode={`# Predicciones de un modelo de clasificación
predicciones = [0.92, 0.15, 0.87, 0.45, 0.98]
etiquetas = ["spam", "no spam", "spam", "no spam", "spam"]

# Diccionario con métricas del modelo
metricas = {
    "precision": 0.89,
    "recall": 0.92,
    "f1_score": 0.90,
    "accuracy": 0.91
}

print("Total predicciones:", len(predicciones))
print("Precisión del modelo:", metricas["precision"])
print("Mejor predicción:", max(predicciones))

# Tupla para representar dimensiones de imagen
# formato: (alto, ancho, canales)
imagen_dims = (224, 224, 3)
print("Dimensiones de entrada:", imagen_dims)`}
        />
      </section>

      {/* Ejercicios */}
      <section>
        <h3 className="text-xl font-semibold text-foreground mb-4">🎯 Ejercicios de práctica</h3>
        <div className="space-y-6">
          <Exercise
            question="¿Qué estructura usarías para almacenar datos de un usuario con nombre, edad y email?"
            options={[
              { value: 'a', label: 'Lista: ["Juan", 25, "juan@mail.com"]' },
              { value: 'b', label: 'Diccionario: {"nombre": "Juan", "edad": 25, "email": "juan@mail.com"}' },
              { value: 'c', label: 'Tupla: ("Juan", 25, "juan@mail.com")' }
            ]}
            correctAnswer="b"
            hint="Piensa en cuál estructura te permite acceder a cada dato por su nombre..."
            explanation="El diccionario es ideal porque permite acceder a cada valor por su clave descriptiva: usuario['nombre'], usuario['edad']."
          />

          <Exercise
            question="Si tengo lista = [10, 20, 30], ¿qué devuelve lista[1]?"
            type="fill-blank"
            correctAnswer="20"
            hint="Recuerda que los índices en Python empiezan en 0..."
            explanation="lista[0] = 10, lista[1] = 20, lista[2] = 30. Los índices empiezan en 0."
          />
        </div>
      </section>
    </div>
  );
};
