function actualizarHora() {
    
//traigo datos, fecha y hora    
    let datos = new Date()
    let hora = datos.getHours()
    let minutos = datos.getMinutes()
    let segundos = datos.getSeconds()
    let am = "Am"
    let pm = "Pm"
    let dia = datos.getDay()
    let diaNum = datos.getDate()
    let mes = datos.getMonth()
    let year = datos.getFullYear()

//manipulacion del DOM
    let horaI = document.getElementById("hora")
    let amPmI = document.getElementById("amPm")
    let minutosI = document.getElementById("minutos")
    let segundosI = document.getElementById("seg")
    let diaI = document.getElementById("dia")
    let diaNumI = document.getElementById("numDia")
    let mesI = document.getElementById("mes")
    let yearI = document.getElementById("year")
//convierto a reloj de 12 hs
    if (hora > 12) {
        horaI.textContent = hora - 12
    }else {
        horaI.textContent = hora 
    }
//am pm 
    if (hora <= 12) {
       amPmI.textContent=am 
    } else {
        amPmI.textContent=pm
    }
//agrego el 0 a los segundos antes del 10
    if (segundos <10) {
        segundosI.textContent = "0" + segundos
    } else {
        segundosI.textContent = segundos
    } 
//agrego el 0 a los minutos antes del 10
    if (minutos<10) {
        minutosI.textContent = "0" + minutos
    } else {
        minutosI.textContent = minutos
    }

//Dia de la semana 
    const semana = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"]
    diaI.textContent = semana [dia]
//numero de dia 
    diaNumI.textContent = diaNum
//mes del año
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]  
    mesI.textContent = meses [mes]
//año
    yearI.textContent = year
}
actualizarHora()

//ejecuto la funcion cada 1 seg 
setInterval(actualizarHora, 1000)

//Consumo api del clima

function validacionDatos() {
    let ciudadA = document.getElementById("ciudad").value
    let paisA = document.getElementById("pais").value
    let insertarInfo = document.getElementById("infoClima")

    if (ciudadA.trim()===""||paisA==="Seleccione su pais") {
        insertarInfo.innerHTML=`
            <p class="alert">Debe completar los dos campos</p>
        ` 
    }else{
        consultarClima(ciudadA, paisA)
    }
}


function consultarClima(ciudadA, paisA) {
    const apiKey = "894297105d9b0d15fcca6ee61300df73"
    let insertarInfo = document.getElementById("infoClima") 
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudadA},${paisA}&appid=${apiKey}`
    const kelvin = 273.15 ;
    const seg = 3600 ;
    
    fetch(url)
    .then(responce => responce.json() )
    .then(data => {
        console.log(data);
        
        if (data.cod==="404") {
            insertarInfo.innerHTML=`
            <p class="alert">Ubicacion no encontrada</p>
        ` 
        } else {
        insertarInfo.innerHTML=`
        <div>
            <p class="textCiudad">El clima en ${data.name}:</p>
            <p class="textTemp">La temperatura actual es de: ${Number(data.main.temp-kelvin).toFixed(2)} °C </p>
            <div class="contDatos">
                <div class="contTempMaxMinHumVient">
                    <p>Temperatura maxima: ${Number(data.main.temp_max-kelvin).toFixed(2)} °C </p>
                    <p>Temperatura minima: ${Number(data.main.temp_min-kelvin).toFixed(2)} °C </p>
                </div>
                <div class="linea"></div>
                <div class="contTempMaxMinHumVient">
                    <p>Humedad: ${data.main.humidity} % </p>  
                    <p>Viento: ${Number(data.wind.speed*seg/1000).toFixed(2)} Km/h </p>  
                </div>
            </div> 
        </div>
        `
        }
 
        if (data.main.humidity>80) {
            quellueva()
        }
       
    })
    
    .catch( error => console.log(error) )
}
