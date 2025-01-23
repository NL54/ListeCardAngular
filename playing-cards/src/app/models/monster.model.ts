import { MonsterType } from "../utils/monster.utils";

export class Monster {
	id:number=-1;
 	name: string = "Monster";
	type: MonsterType = MonsterType.ELECTRIC;
	image: string = "./monster/TCG Creature Cards - Borderless (201).png";
	hp: number = 60;
	figureCaption: string = "N°001 Monster"

	attackName: string = "Standard Attack"
	attackStrength: number = 10;
	attackDescription: string = "A standard attack";

	copy():Monster{
		return Object.assign(new Monster(),this)
	}

 }