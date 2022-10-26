import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify";
import spotifyApi, {LOGIN_URL} from "../../../lib/SpotifyWebApi";


async function refreshAccessToken(token) {
    try {

        spotifyApi.setAccessToken(token.accessToken)
        spotifyApi.setRefreshToken(token.refreshToken)

        const {body : refreshedTokens} = await spotifyApi.refreshAccessToken()
        console.log('Refreshed token is', refreshedTokens);

        return {
            ...token,
            accessToken: refreshedTokens.access_token,
            accessTokenExpires: Date.now() + refreshedTokens.expires_at * 1000,
            refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
        }

    } catch (error) {
        return {
            ...token,
            error: "RefreshAccessTokenError",
        }
    }
}

export default NextAuth({
    providers: [
        SpotifyProvider({
            clientId: process.env.SPOTIFY_CLIENT_ID,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
            authorization : LOGIN_URL
        })
    ],
    secret: process.env.JWT_SECRET,

    pages: {
        signIn: '/login',
    },

    callbacks: {
        async jwt({ token, user, account }) {
            //?First sign in
            if (account && user) {
                return {
                    ...token,
                    accessToken: account.access_token,
                    accessTokenExpires: Date.now() + account.expires_at * 1000,
                    refreshToken: account.refresh_token,
                    username: account.providerAccountId,
                }
            }
            //?Return previous token if the access token has not expired yet
            if (Date.now() < token.accessTokenExpires) {
                return token
            }
            //?Access token has expired, try to update it
            return await refreshAccessToken(token)
        },
        async session({ session, token }) {
            session.user = token.user
            session.accessToken = token.accessToken
            session.error = token.error
            return session
        },
    },
})