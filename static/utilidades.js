let nodedataDic = [];
let regex = /(\d+)/g;
let resultados = {
    'milk': 0,
    'frozen': 0,
    'grocery': 0,
    'deter': 0,
    'delica': 0,
    'fresh': 0
}
$(document).ready(function () {
    $('#calculate').submit(function (e) {
        e.preventDefault()
        $.ajax({
            type: "GET",
            url: "obtener",
            dataType: "text",
            data: $('#calculate').serialize(),
            success: function (response) {
                //console.log(response)
                let usingSplit = response.split(',');
                console.log(usingSplit)
                let nuevo = usingSplit[0].split(':');
                let nuevo1 = usingSplit[1].split(':');
                let nuevo2 = usingSplit[2].split(':');
                resultados.frozen = numbers(nuevo[0]);
                resultados.milk = numbers(nuevo[1]);
                resultados.deter = numbers(nuevo1[0]);
                resultados.grocery = numbers(nuevo1[1]);
                resultados.delica = numbers(nuevo2[0]);
                resultados.fresh = numbers(nuevo2[1]);
                get_GPA(resultados)
            }
        });
        $('html, body').animate({
            scrollTop: $("#resultados").offset().top
        }, 1000)
    });
});
function numbers(data) {
    var respuesta = data.match(regex)
    var numero = parseFloat(respuesta[0] + '.' + respuesta[1])
    return numero.toFixed(2)
}

function get_GPA(data) {
    $("#g_PA").html(data.frozen + '$');
    $("#g_PA1").html(data.delica + '$');
    $("#g_PA2").html(data.grocery + '$');
    $("#g_PA3").html(data.deter + '$');
    $("#g_PA4").html(data.milk + '$');
    $("#g_PA5").html(data.fresh + '$');
    let ordenName = {
        'Productos Frescos': data.fresh,
        'Lácteos': data.milk,
        'Artículos de limpieza': data.deter,
        'Víveres': data.grocery,
        'Embutidos': data.delica,
        'Congelados': data.frozen
    }
    let orden = [data.fresh, data.milk, data.deter, data.grocery, data.delica, data.frozen];

    orden.sort((a, b) => a - b);
    orden.reverse();
    console.log(orden)

    for (const key in ordenName) {
        if (Object.hasOwnProperty.call(ordenName, key)) {
            const element = ordenName[key];
            for (let index = 0; index < orden.length; index++) {
                const contenido = orden[index];
                if (contenido == element) {
                    $("#r_" + index).html(key);
                    $("#rm_" + index).attr("src", "/static/images/" + key + '.jpeg');
                    key == 'Artículos de limpieza' && $("#rm_" + index).attr("src", "/static/images/limpieza.jpeg");
                    key == 'Productos Frescos' && $("#rm_" + index).attr("src", "/static/images/Productos_Frescos.jpeg");
                    key == 'Víveres' && $("#rm_" + index).attr("src", "/static/images/Viveres.jpeg");
                    key == 'Lácteos' && $("#rm_" + index).attr("src", "/static/images/Lacteos.jpeg");
                }
            }
        }
    }


}