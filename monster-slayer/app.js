new Vue({
    el: '#app',
    data: {
        playerLife: 100,
        monsterLife: 100,
        running: false,
        disabledEspecial: false,
        disabledCura: false,
        curasDisponiveis: 3,
        logs: [],
        mostrarTelaInicial: true,
        danoDoPlayer: 10,
        defesaDoPlayer: 5,
        danoDoMonstro: 15,
        defesaDoMonstro: 3,
        mana: 100,
    },
    computed: {
        hasResult(){
            return this.playerLife == 0 || this.monsterLife == 0
        }
    },
    methods: {
        startGame(){
            this.running = true
            this.playerLife = 100
            this.monsterLife = 100
            this.logs = [],
            this.mostrarTelaInicial = false
        },
        giveUp(){
            this.running = false
            this.playerLife = 100
            this.monsterLife = 100
            this.logs = []
            this.mostrarTelaInicial = true
            this.mana = 100;
            this.disabledEspecial = false
            this.disabledCura = true
        },
        attack(especial){
            if(especial){
                this.mana = 0;
                this.disabledEspecial = true
            }            
            if(this.mana < 100){
                Math.max(this.mana += 10, 100)
            }
            
            this.dano('playerLife', this.danoDoMonstro, this.defesaDoPlayer, false, 'Monstro', 'Jogador', 'player')
            if(this.monsterLife > 0){
                this.dano('monsterLife', this.danoDoPlayer, this.defesaDoMonstro, especial, 'Jogador', 'Monstro', 'monster')
            }
        },
        dano(atr, dano, defesa, especial, source, target, cls){
            const plus = especial ? 5 : 0
            const hit = (dano - defesa) + plus
            this[atr] = Math.max(this[atr] - hit, 0)
            this.registerLog(`${source} atingiu ${target} com ${hit}.`, cls)
        },
        hurt(atr, min, max, especial, source, target, cls){
            const plus = especial ? 5 : 0
            const hurt = this.getRandom(min + plus, max + plus)
            this[atr] = Math.max(this[atr] - hurt, 0)
            this.registerLog(`${source} atingiu ${target} com ${hurt}.`, cls)
        },
        heal(){
            this.curasDisponiveis--
            this.playerLife = Math.min(this.playerLife + 50, 100)
            this.registerLog(`Jogador se curou em 50.`, 'healLog')
        },
        healAndHurt(){
            this.heal(10, 15);
            this.hurt('playerLife', 7, 12, false, 'Monstro', 'Jogador', 'monster')
        },
        getRandom(min, max){
            const value = Math.random() * (max-min) + min
            return Math.round(value)
        },
        registerLog(text, cls){
            this.logs.unshift({text, cls})
        }
    },
    watch: {
        hasResult(value){
            if(value){ 
                this.running = false
                this.mostrarTelaInicial = true
                this.mana = 100;
                this.disabledEspecial = false
                this.disabledCura = false
                this.curasDisponiveis = 3
            }
        },
        mana(value){
            if(value == 100){
                this.disabledEspecial = false
                this.mana = 100
            }
        },
        curasDisponiveis(value){
            if(value == 0)
                this.disabledCura = true
        }
    }
})