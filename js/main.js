(function ($) {
    new WOW().init();
    $(".header-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        items: 1,
        dots: true,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });

})(jQuery);
class Entry{
    constructor(owner,car,licensePlate,entryDate,exitDate){
        this.owner = owner;
        this.car = car;
        this.licensePlate = licensePlate;
        this.entryDate = entryDate;
        this.exitDate = exitDate;
    }
}


$(".header-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1500,
    items: 1,
    dots: true,
    loop: true,
    nav : true,
    navText : [
        '<i class="bi bi-chevron-left"></i>',
        '<i class="bi bi-chevron-right"></i>'
    ]
});

class alquila{
    static displayEntries(){
        const entries = Store.getEntries();
        entries.forEach((entry) => alquila.Table(entry));
    }
    static Table(entry){
        const tableBody=document.querySelector('#tableBody');
        const row = document.createElement('tr');
        row.innerHTML = `   <td>${entry.owner}</td>
                            <td>${entry.car}</td>
                            <td>${entry.licensePlate}</td>
                            <td>${entry.entryDate}</td>
                            <td>${entry.exitDate}</td>
                            <td><button class="btn btn-info delete">X</button></td>
                        `;
        tableBody.appendChild(row);
    }
    static limpiar(){ 
        const inputs = document.querySelectorAll('.form-control');
        inputs.forEach((input)=>input.value="");
    }
    static BorrarEntry(target){
        if(target.classList.contains('delete')){
            target.parentElement.parentElement.remove();
        }
    }
    static alertMensaje(message,className){
        const div = document.createElement('div');
        div.className=`alert alert-${className} w-50 mx-auto`;
        div.appendChild(document.createTextNode(message));
        const formContainer = document.querySelector('.form-container');
        const form = document.querySelector('#entryForm');
        formContainer.insertBefore(div,form);
        setTimeout(() => document.querySelector('.alert').remove(),3000);
    }
    static validar(){
        const owner = document.querySelector('#owner').value;
        const car = document.querySelector('#car').value;
        const licensePlate = document.querySelector('#licensePlate').value;
        const entryDate = document.querySelector('#entryDate').value;
        const exitDate = document.querySelector('#exitDate').value;        
       
        if(owner === '' || car === '' || licensePlate === '' || entryDate === '' || exitDate === ''){
            alquila.alertMensaje('Todos los campos deben ser completados!','danger');
            return false;
        }
        if(exitDate < entryDate){
            alquila.alertMensaje('La fecha de salida no puede ser inferior a la fecha de entrada','danger');
            return false;
        }
        return true;
    }
}
class Store{
    static getEntradas(){
        let entradas;
        if(localStorage.getItem('entradas') === null){
            entradas = [];
        }
        else{
            entradas = JSON.parse(localStorage.getItem('entradas'));
        }
        return entradas;
    }
    static addEntradas(entry){
        const entries = Store.get.entradas();
        entries.push(entry);
        localStorage.setItem('entradas', JSON.stringify(entradas));
    }
    static removeEntradas(licensePlate){
        const entradas = Store.getEntradas();
        entries.forEach((entry,index) => {
            if(entry.licensePlate === licensePlate){
                entries.splice(index, 1);
            }
        });
        localStorage.setItem('entradas', JSON.stringify(entradas));
    }
}

    document.addEventListener('DOMContentLoaded',alquila.displayEntries);

    document.querySelector('#entryForm').addEventListener('submit',(e)=>{
        e.preventDefault();
        
        const owner = document.querySelector('#owner').value;
        const car = document.querySelector('#car').value;
        const licensePlate = document.querySelector('#licensePlate').value;
        const entryDate = document.querySelector('#entryDate').value;
        const exitDate = document.querySelector('#exitDate').value;
        if(!alquila.validar()){
            return;
        }
        const entry = new Entry(owner, car, licensePlate, entryDate, exitDate);
        alquila.Table(entry);
        Store.addEntradas(entry);
        alquila.limpiar();
        /* alquila.alertMensaje('Coche agregado con éxito al estacionamiento','success'); */

    });
    
    document.querySelector('#tableBody').addEventListener('click',(e)=>{

        alquila.BorrarEntry(e.target);
        var licensePlate = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
        Store.removeEntries(licensePlate);
/* 
        alquila.showAlert('Coche eliminado con éxito de la lista','success'); */
    })

function habilitar(){
        text1 = document.getElementById("owner").value;
        text2 = document.getElementById("car").value;
        text3 = document.getElementById("licensePlate").value;
        text4 = document.getElementById("entryDate").value;
        text5 = document.getElementById("exitDate").value;
        val = 0;

        if(text1 == ""){
            val++;
        }
        if(text2 == ""){
            val++;
        }
        if(text3 == ""){
            val++;
        }
        if(val == "0"){
            document.getElementById("btnOne").disabled = false;
        }else{
            document.getElementById("btnOne").disabled = true;
        }
}
document.getElementById("owner").addEventListener("keyup", habilitar)
document.getElementById("car").addEventListener("keyup", habilitar)
document.getElementById("licensePlate").addEventListener("keyup", habilitar)
document.getElementById("btnOne").addEventListener("click", () => {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Felicitaciones Alquilaste tu nuevo auto',
        showConfirmButton: false,
        timer: 1500
      })
})


let contenido = document.querySelector('#listaActualizada')

        function traer() {
            fetch('autos.json')
                .then(res => res.json())
                .then(datos => {
                    // console.log(datos)
                    tabla(datos)
                })
        }

        function tabla(datos) {
            // console.log(datos)
            contenido.innerHTML = ''
            for(let valor of datos){
                // console.log(valor.nombre)
                contenido.innerHTML += `
                
                <tr>
                    <th scope="row">${ valor.id }</th>
                    <td>${ valor.marca }</td>
                    <td>${ valor.modelo }</td>
                    <td>${ valor.estado ? "Activo" : "Eliminado" }</td>
                </tr>
                
                `
            }
        }
        document.querySelector('#searchInput').addEventListener('keyup', function searchTable(){
            const searchValue = document.querySelector('#searchInput').value.toUpperCase();
            const tableLine = (document.querySelector('#tableBody')).querySelectorAll('tr');
            for(let i = 0; i < tableLine.length; i++){
                var count = 0;
                const lineValues = tableLine[i].querySelectorAll('td');
                for(let j = 0; j < lineValues.length - 1; j++){
                    if((lineValues[j].innerHTML.toUpperCase()).startsWith(searchValue)){
                        count++;
                    }
                }
                if(count > 0){
                    tableLine[i].style.display = '';
                }else{
                    tableLine[i].style.display = 'none';
                }
            }
        });
    