import {Button} from "@chakra-ui/react";
import {signIn} from "next-auth/react";
import {getProviders} from "next-auth/react";
import {useEffect, useState} from "react";


export default function signin ({providers})
{
    console.log(providers)
    return (
        <div>

            {
                Object?.values(providers).map(provider => <Button onClick={()=> signin(provider.id , {callbackUrl : "/"})}>Login with {provider.name}</Button>)
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

