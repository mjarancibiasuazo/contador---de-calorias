// Importamos los hooks useReducer, useEffect y useMemo desde React.
import { useReducer, useEffect, useMemo } from 'react'

// Importamos el componente Form desde el directorio de componentes.
import Form from "./components/Form"

// Importamos el reducer y el estado inicial desde el archivo activity-reducer.
import { activityReducer, initialState } from './reducers/activity-reducer'

// Importamos los componentes ActivityList y CalorieTraker desde el directorio de componentes.
import ActivityList from './components/ActivityList'
import CalorieTraker from './components/CalorieTraker'

// Definimos el componente funcional App.
function App() {
  // Utilizamos el hook useReducer para manejar el estado y las acciones relacionadas con las actividades.
  // El estado inicial y el reducer se pasan como argumentos a useReducer.
  const [state, dispatch] = useReducer(activityReducer, initialState)

  // Utilizamos el hook useEffect para guardar las actividades en el localStorage cada vez que cambian.
  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(state.activities))
  }, [state.activities])

  // Definimos una función canRestartApp que utiliza useMemo para memorizar el cálculo de la longitud de activities.
  // Esto optimiza el rendimiento evitando cálculos innecesarios.
  const canRestartApp = () => useMemo(() => state.activities.length, [state.activities])

  // Retornamos el JSX que representa la interfaz de usuario de la aplicación.
  return (
    <>
      {/* Definimos el encabezado de la aplicación con estilos de Tailwind CSS */}
      <header className="bg-lime-600 py-3">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-center text-lg font-weight text-white uppercase">
            Contador de Calorias
          </h1>
          {/* Botón para reiniciar la aplicación. Está deshabilitado si no hay actividades. */}
          <button 
            className="bg-gray-800 hover:bg-gray-900 p-2 font-bold uppercase text-white text-xs rounded-sm cursor-pointer disabled:opacity-10"
            disabled={!canRestartApp()}
            onClick={() => dispatch({ type: 'restart-app' })}
          >
            Reiniciar App
          </button>
        </div>
      </header>

      {/* Sección que contiene el formulario para agregar actividades */}
      <section className="bg-lime-500 py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <Form dispatch={dispatch} state={state} />
        </div>
      </section>

      {/* Sección que muestra el rastreador de calorías */}
      <section className="bg-gray-800 py-10">
        <div className="max-w-4xl mx-auto">
          <CalorieTraker activities={state.activities} />
        </div>
      </section>

      {/* Sección que muestra la lista de actividades */}
      <section className="p-10 mx-auto max-w-4xl">
        <ActivityList activities={state.activities} dispatch={dispatch} />
      </section>
    </>
  )
}

// Exportamos el componente App para que pueda ser utilizado en otras partes de la aplicación.
export default App

/* Este código define el componente principal de la aplicación App, que utiliza useReducer para manejar el estado de las actividades, 
useEffect para persistir los datos en el almacenamiento local, y useMemo para optimizar el cálculo de si la aplicación puede ser 
reiniciada. También incluye varios componentes secundarios para gestionar y mostrar las actividades y las calorías. */