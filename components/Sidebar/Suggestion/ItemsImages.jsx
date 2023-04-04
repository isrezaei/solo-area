
import {Box} from "@chakra-ui/react";
import {useRouter} from "next/router";
import Image from "next/image";

const ItemsImages = ({artists}) => {

    const router = useRouter()

    return (
        <Box
            w={50}
            h={50}
            position={"relative"}
            overflow={"hidden"}
            rounded={"full"}
            onClick={() => router.push(`/artist/${artists.id}`)}
        >
            <Image
                style={{position: "absolute"}}
                src={artists?.images[2]?.url || ""}
                layout={"fill"}
                objectFit={"cover"}
                placeholder={"blur"}
                blurDataURL={artists?.images[2]?.url}
            />
        </Box>
    );
};

export default ItemsImages;