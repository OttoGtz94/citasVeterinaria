/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, {
	Fragment,
	useState,
	useEffect,
} from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';

function App() {
	// Citas en local storage
	let citasIniciales = JSON.parse(
		localStorage.getItem('citas')
	);
	if (!citasIniciales) {
		citasIniciales = [];
	}

	// Arreglo citas
	const [citas, guardarCitas] = useState(citasIniciales);

	// useEffect para realizar operaciones cuando el state cambia
	useEffect(() => {
		// console.log('Documento cargado o se actualizo cita');
		if (citasIniciales) {
			localStorage.setItem('citas', JSON.stringify(citas));
		} else {
			localStorage.setItem('citas', JSON.stringify([]));
		}
	}, [citas]);

	// Función que toma las citas actuales y agrega una nueva
	const crearCita = cita => {
		// console.log(cita);
		guardarCitas([...citas, cita]);
	};

	// Función para eliminar citas
	const eliminarCita = id => {
		// console.log(id);
		const nuevasCitas = citas.filter(
			cita => cita.id !== id
		);
		guardarCitas(nuevasCitas);
	};

	// Mensaje condicional para ver si hay citas o no
	const titulo =
		citas.length === 0
			? 'No hay citas'
			: 'Administrar citas';

	return (
		<Fragment>
			<h1>Administrador de pacientes</h1>;
			<div className='container'>
				<div className='row'>
					<div className='one-half column'>
						<Formulario crearCita={crearCita} />
					</div>
					<div className='one-half column'>
						<h2>{titulo}</h2>
						{citas.map(cita => (
							<Cita
								key={cita.id}
								cita={cita}
								eliminarCita={eliminarCita}
							/>
						))}
					</div>
				</div>
			</div>
		</Fragment>
	);
}

export default App;
