// these lists contain the names, images, and locations for each character
let p_names = ["Noah", "Evan", "Reve", "Dain"]
let p_imgs = [assets.image`FirstCharacter`, assets.image`SecondCharacter`, assets.image`ThirdCharacter`, assets.image`Placeholder`]
let p_loc = [[60, 30], [60, 70], [30, 30], [30, 70]]
//  The next five lines are values for each player class(not python class). There is a list detailing each level
//  for one idividual class, and then one msater list that consolidates all of the individual lists.
//  The stats are, in order: health, min dmg, max dmg, defense, num of attacks.
let warrior_lvls = [[20, 4, 8, 3, 1], [25, 6, 10, 6, 1], [30, 8, 12, 10, 2]]
let tank_lvls = [[30, 1, 3, 10, 1], [35, 2, 4, 15, 1], [40, 3, 5, 20, 1]]
let ranger_lvls = [[15, 5, 10, 0, 1], [18, 15, 20, 1, 1], [20, 25, 35, 3, 1]]
let rogue_lvls = [[15, 3, 6, 1, 2], [18, 5, 8, 3, 2], [20, 7, 10, 5, 3]]
let role_list = [warrior_lvls, tank_lvls, ranger_lvls, rogue_lvls]
// The next few lines are similar to the previous ones, but instead will contain details for each monster.
let e_img = [assets.image`Slime1`, assets.image`Goblin1`, assets.image`Orc1`]
let e_loc = [[100, 30], [100, 70], [130, 30], [130, 70]]
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
    
    public destroy_self() {
        sprites.destroy(this.p_sprite)
    }
    
}

Player.__initPlayer()

class Enemy {
    r_index: number
    img: Image
    race: number[][]
    e_sprite: Sprite
    health: number
    min_dmg: number
    max_dmg: number
    defense: number
    attacks: number
    public static __initEnemy() {
        /** class for enemy things */
    }
    
    constructor(r_index: number) {
        this.r_index = r_index
    }
    
    public set_values(lvl: number) {
        this.img = e_img[this.r_index]
        this.race = race_list[this.r_index]
        this.e_sprite = sprites.create(this.img, SpriteKind.Enemy)
        let stat_val = this.race[lvl]
        this.health = stat_val[0]
        this.min_dmg = stat_val[1]
        this.max_dmg = stat_val[2]
        this.defense = stat_val[3]
        this.attacks = stat_val[4]
    }
    
}

Enemy.__initEnemy()

function create_players(p_num: number, p_lvls: number): any[] {
    let p_list: any[];
    let p_char: Player;
    let locations: number[];
    let char_sprite: Sprite;
    let p_num_bad = p_num > 4 || p_num < 1
    let p_lvl_bad = p_lvls > 3 || p_lvls < 1
    if (p_num_bad || p_lvl_bad) {
        p_num = game.askForNumber("How many characters do you want?(1-4)", 1)
        p_lvls = game.askForNumber("What level do you want them to be?(1-3)", 1)
        p_list = create_players(p_num, p_lvls)
        return p_list
    } else {
        p_list = []
        for (let i = 0; i < p_num; i++) {
            p_char = new Player(p_names[i], p_imgs[i])
            p_char.set_values(p_lvls, i)
            locations = p_loc[i]
            p_char.p_sprite.x = locations[0]
            p_char.p_sprite.y = locations[1]
            char_sprite = p_char.p_sprite
            p_list.push(char_sprite)
        }
        return p_list
    }
    
}

function create_enemies(): any[] {
    let e_race: number;
    let e_char: Enemy;
    let locations: number[];
    let e_sprite: Sprite;
    let e_num = game.askForNumber("How many enemies do you want?(1-4)", 1)
    let e_lvls = game.askForNumber("What level do you want them to be?(1-3)", 1)
    let e_list = []
    for (let i = 0; i < e_num; i++) {
        e_race = randint(0, 2)
        e_char = new Enemy(e_race)
        e_char.set_values(e_lvls)
        locations = e_loc[i]
        e_char.e_sprite.x = locations[0]
        e_char.e_sprite.y = locations[1]
        e_sprite = e_char.e_sprite
        e_list.push(e_sprite)
    }
    return e_list
}

let p_num = game.askForNumber("How many characters do you want?(1-4)", 1)
let p_lvls = game.askForNumber("What level do you want them to be?(1-3)", 1)
let p_list = create_players(p_num, p_lvls)
let e_list = create_enemies()
game.setDialogFrame(img`
    ..99a99aa99aa99aa99999..
    .9119a889a889a889a99119.
    a18819a889a889a889a1881a
    a188199aa99aa99aa991881a
    a91191cccccccccccc19119a
    99a91cccccccccccccc199a9
    9a99cccccccccccccccc9a89
    a98acccccccccccccccca88a
    a88acccccccccccccccca89a
    98a9cccccccccccccccc99a9
    9a99cccccccccccccccc9a89
    a98acccccccccccccccca88a
    a88acccccccccccccccca89a
    98a9cccccccccccccccc99a9
    9a99cccccccccccccccc9a89
    a98acccccccccccccccca88a
    a88acccccccccccccccca89a
    98a9cccccccccccccccc99a9
    9a991cccccccccccccc19a99
    a91191cccccccccccc19119a
    a188199aa99aa99aa991881a
    a1881a988a988a988a91881a
    .a1199a988a988a988a911a.
    ..aaa99aa99aa99aa99aaa..
`)
game.showLongText(`Welcome! This is a battle simulator inspired by the early Final Fantasy games. 
Your goal is simply to kill each of the enemies. When it is your turn, the character who will act will be lit up. 
There will be an arrow above the enemy they are targeting. Use the arrow keys to change your target, 
then press A to attack. Just like in real life, there are no health bars, so keep track of who gets hit!`, DialogLayout.Center)
let reset = game.ask("Would you like to recreate your characters?", "(This can only be done once)")
if (reset) {
    for (let i of p_list) {
        sprites.destroy(i)
    }
    p_num = game.askForNumber("How many characters do you want this time?(1-4)", 1)
    p_lvls = game.askForNumber("What level do you want them to be?(1-3)", 1)
    p_list = create_players(p_num, p_lvls)
}

