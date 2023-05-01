import {IconButton} from "@chakra-ui/react";
import _ from "lodash";
import {RiUserFollowFill, RiUserUnfollowFill} from "react-icons/ri";
import {useQuery} from "@apollo/client";
import {getSubscribeQuery} from "../../../graphQl/query/database/getSubscribedList";
import {useUser} from "@supabase/auth-helpers-react";
import {removeFromSubscribeList} from "../../../graphQl/query/database/removeFromSubscribeList";
import {setToSubscribedList} from "../../../graphQl/query/database/setToSubscribedList";
import {useState} from "react";

const ItemsSubButton = ({artists}) => {

    const user = useUser()
    const [loading, setLoading] = useState(false);

    const {loading: subscribeStatus, data: {GET_SUBSCRIBED_LIST} = {}} = useQuery(getSubscribeQuery, {
        variables: {userId: user?.id},
        onCompleted: () => setLoading(false),
    });

    const handelSubscribe = async (randomArtist) => {
        const {id, images, name} = randomArtist;
        setLoading(true);

        if (!!_.find(GET_SUBSCRIBED_LIST, {id: id})) {
            return await removeFromSubscribeList(id, user?.id);
        } else {
            return await setToSubscribedList(id, name, images, user?.email, user?.id);
        }
    };

    return (
        <IconButton
            isLoading={loading}
            aria-label={"subscribe-unSubscribe"}
            onClick={() => handelSubscribe(artists)}
            rounded={"full"}
            colorScheme={"twitter"}
            size={"sm"}
            icon={
                !!_.find(GET_SUBSCRIBED_LIST, {id: artists.id}) ? (
                    <RiUserUnfollowFill size={18}/>
                ) : (
                    <RiUserFollowFill size={18}/>
                )
            }
            variant={
                !!_.find(GET_SUBSCRIBED_LIST, {id: artists.id})
                    ? "solid"
                    : "outline"
            }
        />
    );
};

export default ItemsSubButton;