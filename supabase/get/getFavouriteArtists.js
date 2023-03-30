import {supabase} from "../createClient";

export const getFavouriteArtists = async (userId) =>
{
        // let { data: USERS, error } = await supabase
        //     .from('USERS')
        //     .select(`id , username , FAVOURITE_ARTISTS(*) `).eq('id' , user)
        //
        // return USERS


        let { data , error } = await supabase
            .from('FAVOURITE_ARTISTS')
            .select(`*`).eq('id' , userId)

        return data
}