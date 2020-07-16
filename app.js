new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        enemyHealth: 100,
        gameIsRunning: false,
        turns: []
    },
    methods: {
        startGame: function () {
            this.playerHealth = 100
            this.enemyHealth = 100
            this.turns = []
            this.gameIsRunning = true
            console.log('Running')
        },
        attack: function () {
            var damage = this.calculateDamage(12, 4)
            this.enemyHealth -= damage;
            this.monsterAttack();
            this.turns.unshift({
                isPlayer: true,
                text: "Player hit enemy with " + damage
            })
            if (this.checkWinner()) {
                return
            }
        },
        calculateHeal: function (max, min) {
            return Math.max(Math.floor(Math.random() * max, min))
        },
        monsterAttack: function () {
            var damage = this.calculateDamage(12, 3)
            this.playerHealth -= damage
            this.turns.unshift({
                isPlayer: false,
                text: "Enemy hit player with " + damage
            })
            this.checkWinner()
        },
        specialAttack: function () {
            var damage = this.calculateDamage(15, 6)
            this.enemyHealth -= damage;
            if (this.checkWinner()) {
                return;
            }
            this.monsterAttack()
        },
        heal: function () {
            if (this.playerHealth < 90) {
                this.playerHealth += this.calculateHeal(10, 6)
                this.healEnemy()
            }
            this.monsterAttack()
        },
        healEnemy: function () {
            if (this.enemyHealth < 90) {
                this.enemyHealth += this.calculateHeal(9, 4)
            }
        },
        calculateDamage: function (max, min) {
            return Math.max(Math.floor(Math.random() * max, min))
        },
        checkWinner: function () {
            if (this.enemyHealth <= 0) {
                if (confirm('You won the game, New game')) {
                    this.startGame()
                } else {
                    this.gameIsRunning = false
                }
                return false;
            } else if (this.playerHealth <= 1) {
                if (confirm('You lost the game, New game')) {
                    this.startGame()
                } else {
                    this.gameIsRunning = false
                }
                return true;
            }
            return false;
        },
        giveUp: function () {
            this.gameIsRunning = false;
        }
    }
})