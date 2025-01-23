export enum MonsterType {
	PLANT = 'plant',
	ELECTRIC = 'electric',
	FIRE = 'fire',
	WATER = 'water',
}

export interface IMonsterProperties {
	imageUrl: string;
	color: string;
}

export const MonsterTypeProperties: {[key: string]: IMonsterProperties} = {
	[MonsterType.PLANT]: {
		imageUrl: "./plant-energy.png",
		color: 'rgba(135, 255, 124)'
	},
	[MonsterType.ELECTRIC]: {
		imageUrl: "./electric-energy.png",
		color: 'rgb(255, 255, 104)'
	},
	[MonsterType.FIRE]: {
		imageUrl: './fire-energy.png',
		color: 'rgb(255, 104, 104)'
	},
	[MonsterType.WATER]: {
		imageUrl: "./water-energy.png",
		color: 'rgba(118, 234, 255)'
	},
}