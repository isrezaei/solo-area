import {supabase} from "../createClient";

export const getFavouriteArtists = async (user) =>
{
        let { data: USERS, error } = await supabase
            .from('USERS')
            .select(`id , username , FAVOURITE_ARTISTS(*) `).eq('id' , user)

        return USERS
}