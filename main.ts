// these lists contain the names, images, and locations for each character
let p_names = ["Noah", "Evan", "Reve", "Dain"]
let p_imgs = [assets.image`FirstCharacter`, assets.image`SecondCharacter`, assets.image`ThirdCharacter`, assets.image`Placeholder`]
let p_loc = [[60, 30], [60, 60], [30, 30], [30, 60]]
//  The next five lines are values for each player class(not python class). There is a list detailing each level 
//  for one idividual class, and then one msater list that consolidates all of the individual lists.
//  The stats are, in order: health, min dmg, max dmg, defense, num of attacks.
let warrior_lvls = [[20, 4, 8, 3, 1], [25, 6, 10, 6, 1], [30, 8, 12, 10, 2]]
let tank_lvls = [[30, 1, 3, 10, 1], [35, 2, 4, 15, 1], [40, 3, 5, 20, 1]]
let ranger_lvls = [[15, 5, 10, 0, 1], [18, 15, 20, 1, 1], [20, 25, 35, 3, 1]]
let rogue_lvls = [[15, 3, 6, 1, 2], [18, 5, 8, 3, 2], [20, 7, 10, 5, 3]]
let role_list = [warrior_lvls, tank_lvls, ranger_lvls, rogue_lvls]
// The next few lines are similar to the previous ones, but instead will contain details for each monster.
let e_names = ["Enemy1", "Enemy2", "Enemy3", "Enemy4"]
let e_img = [assets.image`Slime1`]
let e_loc = [[100, 30], [100, 60], [130, 30], [130, 60]]
let slime_lvls = [[8, 3, 5, 2, 1], [12, 5, 7, 4, 1], [16, 7, 10, 6, 1]]
let goblin_lvls = [[10, 4, 8, 1, 1], [12, 4, 10, 2, 1], [15, 4, 12, 3, 2]]
let orc_lvls = [[15, 5, 8, 3, 1], [20, 6, 9, 5, 1], [25, 7, 10, 8, 1]]
let race_list = [slime_lvls, goblin_lvls, orc_lvls]
class Player {
    name: string
    img: Image
    p_sprite: Sprite
    role: number[][]
    health: number
    min_dmg: number
    max_dmg: number
    defense: number
    attacks: number
    public static __initPlayer() {
        /** class for people things */
    }
    
    constructor(name: string, img: Image) {
        this.name = name
        this.img = img
        this.p_sprite = sprites.create(this.img, SpriteKind.Player)
    }
    
    public set_values(lvl: number, player_role: number) {
        this.role = role_list[player_role]
        let stat_val = this.role[lvl]
        this.health = stat_val[0]
        this.min_dmg = stat_val[1]
        this.max_dmg = stat_val[2]
        this.defense = stat_val[3]
        this.attacks = stat_val[4]
    }
    
}

Player.__initPlayer()

class Enemy {
    e_sprite: Sprite
    race: number[][]
    health: number
    min_dmg: number
    max_dmg: number
    defense: number
    attacks: number
    public static __initEnemy() {
        /** class for enemy things */
    }
    
    constructor(img: Image, name: string) {
        this.e_sprite = sprites.create(img, SpriteKind.Enemy)
    }
    
    public set_values(lvl: number, race: number) {
        this.race = race_list[race]
        let stat_val = this.race[lvl]
        this.health = stat_val[0]
        this.min_dmg = stat_val[1]
        this.max_dmg = stat_val[2]
        this.defense = stat_val[3]
        this.attacks = stat_val[4]
    }
    
}

Enemy.__initEnemy()

function create_players() {
    let p_char: Player;
    let locations: number[];
    let p_num = game.askForNumber("How many characters do you want?(1-4)", 1)
    let p_lvls = game.askForNumber("What level do you want them to be?(1-3)", 1)
    let p_list = []
    for (let i = 0; i < p_num; i++) {
        p_char = new Player(p_names[i], p_imgs[i])
        p_char.set_values(p_lvls, i)
        locations = p_loc[i]
        p_char.p_sprite.x = locations[0]
        p_char.p_sprite.y = locations[1]
        p_list.push(p_char)
    }
}

function create_enemies() {
    let e_char: Enemy;
    let locations: number[];
    let e_num = game.askForNumber("How many enemies do you want?(1-4)", 1)
    let e_lvls = game.askForNumber("What level do you want them to be?(1-3)", 1)
    let e_list = []
    for (let i = 0; i < e_num; i++) {
        e_char = new Enemy(e_img[i], "Bob")
        e_char.set_values(e_lvls, randint(0, e_img.length))
        locations = e_loc[i]
        e_char.e_sprite.x = locations[0]
        e_char.e_sprite.y = locations[1]
        e_list.push(e_char)
    }
}

create_players()
create_enemies()
