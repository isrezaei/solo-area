import React, {useState} from "react";
import {Stack, Text,} from "@chakra-ui/react";
import {useQuery} from "@apollo/client";
import {getSubscribeQuery} from "../../../graphQl/query/database/getSubscribedList";
import {useUser} from "@supabase/auth-helpers-react";
import SubscribeList from "./SubscribeList";
import Header from "./Header";
import Empty from "./Empty";

const Subscriptions = () => {

  const user = useUser();

  const {loading, data: {GET_SUBSCRIBED_LIST} = {}} = useQuery(getSubscribeQuery, {
    variables: {userId: user?.id}
  });


  const [showMore, setShowMore] = useState(false)

  console.log(showMore)

  const handelHeight = () => setShowMore(prev => !prev)


  if (loading)
  {
    return  <Text fontSize={25}>Loading ...</Text>
  }

  if (!loading)
  {
    switch (true) {
      case GET_SUBSCRIBED_LIST?.length > 0 :
        return (
            <Stack >
              <Header
                  handelHeight={handelHeight}
                  showMore={showMore}/>

              {GET_SUBSCRIBED_LIST?.slice(showMore ? undefined : 5 ).reverse().map((value) => <SubscribeList value={value}/>)}
            </Stack>
        )
      case  GET_SUBSCRIBED_LIST?.length < 0 :
      default :
        return <Empty/>
    }
  }
};

export default Subscriptions;
