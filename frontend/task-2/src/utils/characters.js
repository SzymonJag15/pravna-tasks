import http from "@/utils/http-common.js";

import questionMark from "@/assets/questionMark.png";

export const getAllCharacters = () => http.get("/characters");

export const sortList = (list) => {
  const sortedList = list.sort((x, y) => {
    if (x.name < y.name) return -1;
    if (x.name > y.name) return 1;
    return 0;
  });

  return sortedList;
};

export const setDefaultImageCharacter = (characters) => {
  const newList = characters.map((character) => {
    if (!character.image)
      return {
        ...character,
        image: questionMark,
      };

    return character;
  });

  return newList;
};

export const getTotalResultsValue = (list) => list.length;

export const getAllCharacterHouses = (characters) => {
  const houses = [...new Set(characters.map(({ house }) => house))];
  const result = houses.filter((e) => e);

  return result;
};

export const housesFilter = (characters, filterValue, sortedArray) =>
  characters.value.filter((character) => {
    if (filterValue === "all") return (sortedArray.value = []);
    return character.house === filterValue;
  });

export const typeFilter = (characters, filterValue, sortedArray) => {
  console.log(characters);
  return characters.value.filter((character) => {
    if (filterValue === "all") return (sortedArray.value = []);
    if (filterValue === "hogwartsStaff") return character.hogwartsStaff;
    if (filterValue === "hogwartsStudent") return character.hogwartsStudent;
  });
};
