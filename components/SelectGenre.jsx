import {Button, HStack} from "@chakra-ui/react";
import {useRecoilState} from "recoil";
import {SELECT_GENRE} from "../atoms/atoms";

const genresList = [
  {
    name: "All",
    variant: "pop",
  },
  {
    name: "Relax",
    variant: "soul",
  },
  {
    name: "Workout",
    variant: "work-out",
  },
  {
    name: "Focus",
    variant: "chill",
  },
  {
    name: "Energize",
    variant: "techno",
  },
];

export const SelectGenre = () => {
  const [genre, setGenre] = useRecoilState(SELECT_GENRE);

  return (
      <HStack w={"full"} justify={{sm: "center", md: "center", lg: "center", xl: "flex-start"}}
              spacing={{sm: 2, md: 5}}>
        {genresList.map(({name, variant}) => (
            <Button
                key={name}
                rounded={"full"}
                size={"xs"}
                onClick={() => setGenre(variant)}
                variant={genre === variant ? "solid" : "outline"}
            >
              {name}
            </Button>
        ))}
      </HStack>
  );
};
