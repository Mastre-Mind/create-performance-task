#these lists contain the names, images, and locations for each character
p_names = ["Noah","Evan","Reve","Dain"]
p_imgs = [assets.image("FirstCharacter"),assets.image("SecondCharacter"),assets.image("ThirdCharacter"),assets.image("Placeholder")]
p_loc = [[60,30],[60,70],[30,30],[30,70]]
# The next five lines are values for each player class(not python class). There is a list detailing each level
# for one idividual class, and then one msater list that consolidates all of the individual lists.
# The stats are, in order: health, min dmg, max dmg, defense, num of attacks.
warrior_lvls = [[20,4,8,3,1],[25,6,10,6,1],[30,8,12,10,2]]
tank_lvls = [[30,1,3,10,1],[35,2,4,15,1],[40,3,5,20,1]]
ranger_lvls = [[15,5,10,0,1],[18,15,20,1,1],[20,25,35,3,1]]
rogue_lvls = [[15,3,6,1,2],[18,5,8,3,2],[20,7,10,5,3]]
role_list = [warrior_lvls,tank_lvls,ranger_lvls,rogue_lvls]

#The next few lines are similar to the previous ones, but instead will contain details for each monster.
e_img = [assets.image("Slime1"),assets.image("Goblin1"),assets.image("Orc1")]
e_loc = [[100,30],[100,70],[130,30],[130,70]]
slime_lvls = [[8,3,5,2,1],[12,5,7,4,1],[16,7,10,6,1]]
goblin_lvls = [[10,4,8,1,1],[12,4,10,2,1],[15,4,12,3,2]]
orc_lvls = [[15,5,8,3,1],[20,6,9,5,1],[25,7,10,8,1]]
race_list = [slime_lvls,goblin_lvls,orc_lvls]

class Player:
    """class for people things"""
    def __init__(self, name: string, img: Image):
        self.name = name
        self.img = img
        self.p_sprite: Sprite = sprites.create(self.img, SpriteKind.player)
    def set_values(self, lvl: number, player_role: number):
        self.role = role_list[player_role]
        stat_val = self.role[lvl]
        self.health = stat_val[0]
        self.min_dmg = stat_val[1]
        self.max_dmg = stat_val[2]
        self.defense = stat_val[3]
        self.attacks = stat_val[4]
    def destroy_self(self):
        sprites.destroy(self.p_sprite)

class Enemy:
    """class for enemy things"""
    def __init__(self, r_index: number):
        self.r_index = r_index
    def set_values(self, lvl: number):
        self.img = e_img[self.r_index]
        self.race = race_list[self.r_index]
        self.e_sprite: Sprite = sprites.create(self.img, SpriteKind.enemy)
        stat_val = self.race[lvl]
        self.health = stat_val[0]
        self.min_dmg = stat_val[1]
        self.max_dmg = stat_val[2]
        self.defense = stat_val[3]
        self.attacks = stat_val[4]

def create_players(p_num: number, p_lvls: number):
    p_num_bad = p_num > 4 or p_num < 1
    p_lvl_bad = p_lvls > 3 or p_lvls < 1
    if p_num_bad or p_lvl_bad:
        p_num = game.ask_for_number("How many characters do you want?(1-4)",1)
        p_lvls = game.ask_for_number("What level do you want them to be?(1-3)", 1)
        p_list = create_players(p_num, p_lvls)
        return p_list
    else:
        p_list = []
        for i in range(0,p_num):
            p_char = Player(p_names[i],p_imgs[i])
            p_char.set_values(p_lvls, i)
            locations = p_loc[i]
            p_char.p_sprite.x = locations[0]
            p_char.p_sprite.y = locations[1]
            char_sprite = p_char.p_sprite
            p_list.append(char_sprite)
        return p_list
    

def create_enemies():
    e_num = game.ask_for_number("How many enemies do you want?(1-4)",1)
    e_lvls = game.ask_for_number("What level do you want them to be?(1-3)", 1)
    e_list = []
    for i in range(0, e_num):
        e_race = randint(0,2)
        e_char = Enemy(e_race)
        e_char.set_values(e_lvls)
        locations = e_loc[i]
        e_char.e_sprite.x = locations[0]
        e_char.e_sprite.y = locations[1]
        e_sprite = e_char.e_sprite
        e_list.append(e_sprite)
    return e_list
    
p_num = game.ask_for_number("How many characters do you want?(1-4)",1)
p_lvls = game.ask_for_number("What level do you want them to be?(1-3)", 1)
p_list = create_players(p_num, p_lvls)
e_list = create_enemies()
game.set_dialog_frame(img("""
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
"""))
game.show_long_text("""Welcome! This is a battle simulator inspired by the early Final Fantasy games. 
Your goal is simply to kill each of the enemies. When it is your turn, the character who will act will be lit up. 
There will be an arrow above the enemy they are targeting. Use the arrow keys to change your target, 
then press A to attack. Just like in real life, there are no health bars, so keep track of who gets hit!""", DialogLayout.CENTER)
reset = game.ask("Would you like to recreate your characters?", "(This can only be done once)")
if reset:
    for i in p_list:
        sprites.destroy(i)
    p_num = game.ask_for_number("How many characters do you want this time?(1-4)",1)
    p_lvls = game.ask_for_number("What level do you want them to be?(1-3)", 1)
    p_list = create_players(p_num, p_lvls)
    