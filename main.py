#these lists contain the names, images, and locations for each character
p_names = ["Noah","Evan","Reve","Dain"]
p_imgs = [assets.image("FirstCharacter"),assets.image("SecondCharacter"),assets.image("ThirdCharacter"),assets.image("Placeholder")]
p_loc = [[60,30],[60,60],[30,30],[30,60]]
# The next five lines are values for each player class(not python class). There is a list detailing each level 
# for one idividual class, and then one msater list that consolidates all of the individual lists.
# The stats are, in order: health, min dmg, max dmg, defense, num of attacks.
warrior_lvls = [[20,4,8,3,1],[25,6,10,6,1],[30,8,12,10,2]]
tank_lvls = [[30,1,3,10,1],[35,2,4,15,1],[40,3,5,20,1]]
ranger_lvls = [[15,5,10,0,1],[18,15,20,1,1],[20,25,35,3,1]]
rogue_lvls = [[15,3,6,1,2],[18,5,8,3,2],[20,7,10,5,3]]
role_list = [warrior_lvls,tank_lvls,ranger_lvls,rogue_lvls]

#The next few lines are similar to the previous ones, but instead will contain details for each monster.
e_img = [assets.image("Slime1")]
e_loc = [[100,30],[100,60],[130,30],[130,60]]
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

class Enemy:
    """class for enemy things"""
    def __init__(self, img: Image):
        self.e_sprite: Sprite = sprites.create(img, SpriteKind.enemy)
    def set_values(self, lvl: number, race: number):
        self.race = race_list[race]
        stat_val = self.race[lvl]
        self.health = stat_val[0]
        self.min_dmg = stat_val[1]
        self.max_dmg = stat_val[2]
        self.defense = stat_val[3]
        self.attacks = stat_val[4]

def create_players():
    p_num = game.ask_for_number("How many characters do you want?(1-4)",1)
    p_lvls = game.ask_for_number("What level do you want them to be?(1-3)", 1)
    p_list = []
    for i in range(0,p_num):
        p_char = Player(p_names[i],p_imgs[i])
        p_char.set_values(p_lvls, i)
        locations = p_loc[i]
        p_char.p_sprite.x = locations[0]
        p_char.p_sprite.y = locations[1]
        p_list.append(p_char)
    
def create_enemies():
    e_num = game.ask_for_number("How many enemies do you want?(1-4)",1)
    e_lvls = game.ask_for_number("What level do you want them to be?(1-3)", 1)
    e_list = []
    for i in range(0, e_num):
        e_char = Enemy(e_img[i])
        e_char.set_values(e_lvls, randint(0, len(e_img)))
        locations = e_loc[i]
        e_char.e_sprite.x = locations[0]
        e_char.e_sprite.y = locations[1]
        e_list.append(e_char)

create_players()
create_enemies()