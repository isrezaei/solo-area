import {useState, useEffect, useRef} from 'react'
import {useUser, useSupabaseClient, useSession} from '@supabase/auth-helpers-react'
import {
    Box,
    AbsoluteCenter,
    Flex,
    VStack,
    Input,
    Button,
    HStack,
    FormControl,
    FormLabel,
    Image, Avatar, InputLeftElement, InputGroup
} from "@chakra-ui/react";

import {FiUpload} from "react-icons/fi";


export default function Manage_account() {

    const session = useSession()
    const supabase = useSupabaseClient()
    const user = useUser()


    const [userInformation , setInformation] = useState({
        username : 'Please set username',
        firstname : '',
        lastname: '',
        avatar_url: '',
        loading : false
    })


    useEffect(() => {
        getProfile()
    }, [session])


    async function getProfile() {
        try {

            setInformation(prevState => ({...prevState , loading: true}))

            let { data : USERS_INFO , error , status } = await supabase
                .from('USERS')
                .select('*')
                .eq('id', user.id)
                .single()

            if (error && status !== 406) {

                console.log(error)

                return error
            }


            if (USERS_INFO) {
                setInformation(prevState => (
                    {
                        ...prevState,
                        firstname: USERS_INFO?.firstname,
                        lastname: USERS_INFO?.lastname,
                        username: USERS_INFO?.username,
                        avatar_url: USERS_INFO?.avatar_url
                    }
                ))
            }

        } catch (error) {
            console.log(error)
        }
        finally {
            setInformation(prevState => ({...prevState , loading: false}))
        }
    }

    async function updateProfile() {
        try {

            setInformation(prevState => ({...prevState , loading: true}))

            let { data , error , status } = await supabase.from('USERS').upsert({
                id : user.id,
                firstname: userInformation?.firstname,
                lastname: userInformation?.lastname,
                username: userInformation?.username,
                avatar_url: userInformation?.avatar_url
            })


            if (error) throw error



            alert('Profile updated!')


        } catch (error) {
            alert('Error updating the data!')
            console.log(error)
        } finally {
            setInformation(prevState => ({...prevState , loading: false}))
        }
    }



    const [selectedFile, setSelectedFile] = useState(null);

    function handleFileSelect(event) {
        setSelectedFile(event.target.files[0]);
    }


    const fileInputRef = useRef(null);


    const handleButtonClick = () => {
        fileInputRef.current.click();
    }


    useEffect(() => {

        if (selectedFile)
        {
            const reader = new FileReader();
            reader.readAsDataURL(selectedFile);
            reader.onload = () => setInformation(prevState => ({...prevState , avatar_url: reader.result}))
        }

    } , [selectedFile])



    return (
        <VStack spacing={5} justify={"center"} maxW={'md'} h={'100vh'} m={"auto"} p={5} bg={"whiteAlpha.200"}>

            <VStack>

                <Avatar size='2xl' bg={"pink.800"} name='' src={userInformation.avatar_url} />

                <Input
                    variant="filled"
                    colorScheme="teal"
                    type="file"
                    display={"none"}
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    accept="image/*" />

                <Button onClick={handleButtonClick}>open</Button>
            </VStack>

            <VStack w={"full"} >
                <Input variant='filled' placeholder='First name' onChange={({target}) => setInformation(prevState => ({...prevState , firstname: target.value}))} />
                <Input variant='filled' placeholder='Last name' onChange={({target}) => setInformation(prevState => ({...prevState , lastname: target.value}))} />
                <Input variant='filled' placeholder='Username' onChange={({target}) => setInformation(prevState => ({...prevState , username: target.value}))} />
            </VStack>

            <Button size={"sm"} onClick={updateProfile} colorScheme={'purple'}>Confirm and next</Button>
        </VStack>
    )
}