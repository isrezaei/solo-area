import useSWR from "swr";
import {Flex, Stack, Grid} from "@chakra-ui/react";
import {useRouter} from "next/router";
import {getRandomPlayed} from "../../graphQl/query/api/getRandomPlayed";
import {ScrollContainer} from "react-indiana-drag-scroll";
import Title from "./Title";
import Songs from "./Songs";



export const Suggested = () => {
    const router = useRouter();

    const {data: {randomPlayed: {items: randomPlayedList} = []} = {}} = useSWR("GET_RANDOM_PLAYED", async () => await getRandomPlayed());

    const RenderSuggestedList = randomPlayedList.map(({track}) => <Songs key={track.id} track={track}/>);

    return (
        <>
            <Stack w={"full"} h={{sm: 370, md: 410}}>

                <Title/>


                <Stack display={{sm: "flex", md: "none"}} w={"full"} position={"relative"}>
                    <Flex w={"full"} position={"absolute"} overflow={"hidden"}>
                        <ScrollContainer style={{display: "flex"}}>
                            {RenderSuggestedList}
                        </ScrollContainer>
                    </Flex>
                </Stack>


                <Grid
                    display={{sm: "none", md: "grid"}}
                    w={"full"}
                    templateColumns={{sm: "repeat(1, 1fr)", md: "repeat(2, 1fr)" , lg : "repeat(2, 1fr)" , xl : "repeat(4, 1fr)"}}
                    gap={2}
                >
                    {RenderSuggestedList}
                </Grid>

            </Stack>

        </>
    );
};
