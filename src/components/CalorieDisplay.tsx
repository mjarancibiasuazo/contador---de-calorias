// Definimos los props que recibirá el componente CalorieDisplay.
type CalorieDisplayProps = {
  calories: number, // Cantidad de calorías a mostrar.
  text: string // Texto descriptivo para las calorías.
}

// Definimos el componente funcional CalorieDisplay.
export default function CalorieDisplay({ calories, text }: CalorieDisplayProps) {
return (
  // Estructura del componente para mostrar las calorías y el texto.
  <p className="text-white font-bold rounded-full grid grid-cols-1 gap-3 text-center">
    {/* Mostrar la cantidad de calorías en un tamaño grande */}
    <span className="font-black text-6xl text-orange">{ calories }</span>
    {/* Mostrar el texto descriptivo */}
    { text }
  </p>
)
}

/* Este componente CalorieDisplay se encarga de mostrar la cantidad de calorías junto con un texto descriptivo. 
Se utiliza una estructura sencilla de párrafo con clases Tailwind CSS para el estilo, incluyendo una clase para el color del 
texto, el tamaño de la fuente y el espaciado. La cantidad de calorías se muestra en un tamaño grande y negrita para destacarla 
visualmente. */