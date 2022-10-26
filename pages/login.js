import {Button} from "@chakra-ui/react";
import {signIn} from "next-auth/react";
import {getProviders} from "next-auth/react";
import {useEffect, useState} from "react";


export default function login ({providers})
{
    console.log(providers)
    return (
        <div>

            {
                Object?.values(providers).map(provider => <Button onClick={()=> signIn(provider.id , {callbackUrl : "/"})}>Login with {provider.name}</Button>)
            }

        </div>
    )
}

export async function getServerSideProps ()
{
    const providers = await getProviders()
    return {
        props : {
            providers
        }
    }
}

