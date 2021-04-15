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
    if (hora >= 12) {
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