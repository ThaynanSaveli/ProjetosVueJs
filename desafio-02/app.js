new Vue({
    el: '#desafio',
    data: {
        valor: ''
    },
    methods: {
        exibirAlerta(){
            alert('Alertei rs')
        },
        atualizarValor(event){
            this.valor = event.target.value
        }
    }
})