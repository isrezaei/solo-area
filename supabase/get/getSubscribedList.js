import {supabase} from "../createClient";


export const GetSubscribedList = async (user , setSubscribeList) =>
{
    try {
        if (user)
        {

            const {data , error} = await supabase
                .from('SUBSCRIBE_LIST')
                .select("subscribed").eq('id' , user?.id)

            setSubscribeList(data?.[0]?.subscribed)

            return data?.[0]

        }
    }
    catch (error)
    {
        console.log(error)
    }
}