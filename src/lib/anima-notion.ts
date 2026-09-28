// Склад і сцени ANIMA — src/content/anima-*.json (з 28.09.2026; раніше Notion).
import castData from "@/content/anima-cast.json";
import scenesData from "@/content/anima-scenes.json";

export interface AnimaCastMember {
  roleEn: string;
  roleUk: string;
  nameEn: string;
  nameUk: string;
  photo: string;
}

export interface AnimaScene {
  arcana: string;
  arcanaUk: string;
  arcanaFr: string;
  descriptionEn: string;
  descriptionUk: string;
  descriptionFr: string;
  image: string;
}

export async function getAnimaCast(): Promise<AnimaCastMember[]> {
  return castData as AnimaCastMember[];
}

export async function getAnimaScenes(): Promise<AnimaScene[]> {
  return scenesData as AnimaScene[];
}
