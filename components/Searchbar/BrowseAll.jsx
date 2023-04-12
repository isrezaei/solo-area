import React from "react";
import { Grid, Stack, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import useSWR from "swr";
import { getSeveralCategories } from "../../graphQl/query/api/getSeveralCategories";

const BrowseAll = () => {

  const { data: { GET_SEVERAL_CATEGORIES : {categories}}} = useSWR("GET_SEARCH_CATEGORIES", () => getSeveralCategories());

  return (
    <VStack>
      <Text
        fontSize={{sm : 20 , md : 35}}
        fontWeight={"bold"}
        color={"whiteAlpha.700"}
      >
        Browse all
      </Text>
      <Grid
        h={450}
        overflowY={"scroll"}
        templateColumns={{sm : "repeat(2 , 1fr)" , md : "repeat(6 , 1fr)"}}
        gap={3}
        sx={{
            "&::-webkit-scrollbar": {
                width: "0",
                height: "0",
            },
            scrollbarWidth: "none",
            "-ms-overflow-style": "none",
        }}
      >
        {categories?.items.map((data) => {
          return (
            <VStack key={data.id}>
              <VStack
                w={{sm : 120 , md : 150}}
                h={{sm : 85 , md : 95}}
                position={"relative"}
                rounded={5}
                overflow={"hidden"}
              >
                <Image
                  layout={"fill"}
                  objectFit={"cover"}
                  src={data.icons[0].url}
                />
                <Text
                  position={"absolute"}
                  bottom={1}
                  fontSize={13}
                  fontWeight={"bold"}
                >
                  {data.name}
                </Text>
              </VStack>
            </VStack>
          );
        })}
      </Grid>
    </VStack>
  );
};

export default BrowseAll;
