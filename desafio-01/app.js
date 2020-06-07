new Vue({
    el: '#desafio',
    data:{
        nome: 'Thaynan Saveli',
        idade: 24,
        imagem: 'https://pm1.narvii.com/7313/b99b47e96ab8c46fa82ed38957326795aa7441c9r1-1280-720v2_hq.jpg',
    },
    methods: {
        randomico(){
            return Math.random()
        }
    }
})