// Importamos el tipo Activity desde el archivo de tipos.
import type { Activity } from "../types";
// Importamos el hook useMemo desde React.
import { useMemo } from "react";
// Importamos el componente CalorieDisplay.
import CalorieDisplay from "./CalorieDisplay";

// Definimos los props que recibirá el componente CalorieTraker.
type CalorieTrakerProps = {
    activities: Activity[] // Lista de actividades.
}

// Definimos el componente funcional CalorieTraker.
export default function CalorieTraker({ activities }: CalorieTrakerProps) {
  // Utilizamos useMemo para memorizar el cálculo de calorías consumidas (categoría 1).
  const caloriesConsumed = useMemo(() => 
    activities.reduce((total, activity) => activity.category === 1 ? total + activity.calories : total, 0), 
    [activities]
  );

  // Utilizamos useMemo para memorizar el cálculo de calorías quemadas (categoría 2).
  const caloriesBurned = useMemo(() => 
    activities.reduce((total, activity) => activity.category === 2 ? total + activity.calories : total, 0), 
    [activities]
  );

  // Utilizamos useMemo para memorizar el cálculo de la diferencia neta de calorías.
  const netCalories = useMemo(() => caloriesConsumed - caloriesBurned, [caloriesConsumed, caloriesBurned]);

  // Retornamos el JSX que representa el rastreador de calorías.
  return (
    <>
      {/* Título del resumen de calorías */}
      <h2 className="text-4xl font-black text-white text-center">Resumen Calorías</h2>
      <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
        {/* Componente para mostrar las calorías consumidas */}
        <CalorieDisplay 
          calories={caloriesConsumed}
          text="Consumidas"
        />
        
        {/* Componente para mostrar las calorías quemadas */}
        <CalorieDisplay 
          calories={caloriesBurned}
          text="Ejercicio"
        />
        
        {/* Componente para mostrar la diferencia neta de calorías */}
        <CalorieDisplay 
          calories={netCalories}
          text="Diferencia"
        />
      </div>
    </>
  )
}


/* Este componente `CalorieTraker` se encarga de calcular y mostrar un resumen de las calorías consumidas, 
quemadas y la diferencia neta utilizando el hook `useMemo` para optimizar los cálculos. 
Utiliza el componente `CalorieDisplay` para mostrar cada una de estas estadísticas de manera visual. */