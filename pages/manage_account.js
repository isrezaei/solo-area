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
    Avatar, InputLeftElement, InputGroup, Img, IconButton, FormHelperText, FormErrorMessage
} from "@chakra-ui/react";
import Image from "next/image";
import {MdAdd} from 'react-icons/md'
import _ from 'lodash'
import { useToast } from '@chakra-ui/react'
import {useRouter} from "next/router";


export default function Manage_account() {

    const session = useSession()
    const supabase = useSupabaseClient()
    const user = useUser()
    const fileInputRef = useRef(null);
    const toast = useToast()
    const router = useRouter()


    const [selectedFile, setSelectedFile] = useState(null);

    const [SET_USER_INFO , SEND_USER_INFO] = useState({
        username : '',
        firstname : '',
        lastname: '',
        avatar_url: null,
        loading : false
    })


    async function getProfile() {

        try {
            SEND_USER_INFO(prevState => ({...prevState , loading: true}))

            let { data : GET_USERS_INFO , error , status } = await supabase
                .from('USERS')
                .select('*')
                .eq('id', user.id)
                .single()

            if (error && status !== 406) {

                console.log(error)

                return error
            }


            if (GET_USERS_INFO) {
                SEND_USER_INFO(prevState => (
                    {
                        ...prevState,
                        firstname: GET_USERS_INFO?.firstname,
                        lastname: GET_USERS_INFO?.lastname,
                        username: GET_USERS_INFO?.username,
                        avatar_url: GET_USERS_INFO?.avatar_url
                    }
                ))
            }

        } catch (error) {
            console.log(error)
        }
        finally {
            SEND_USER_INFO(prevState => ({...prevState , loading: false}))
        }
    }
    useEffect(() => {
        getProfile()
    }, [session])



    const setProfileInfo = async () => {

        try {
            SEND_USER_INFO(prevState => ({...prevState , loading: true}))

            let { data , error } = await supabase.from('USERS').upsert({
                id : user.id,
                firstname: SET_USER_INFO?.firstname,
                lastname: SET_USER_INFO?.lastname,
                username: SET_USER_INFO?.username,
                avatar_url: SET_USER_INFO?.avatar_url
            })
            if (error) throw error

            toast({
                title: 'Done',
                description: "We've created your new information for you.",
                status: 'success',
                position : 'top',
                duration: 9000,
                isClosable: true,
            })

        }
        catch (error) {
            alert('Error updating the data!')
        }
        finally
        {
            router.push('/pickFavouriteArtists')
            SEND_USER_INFO(prevState => ({...prevState , loading: false}))
        }

    }


    function handleFileSelect(event) {
        setSelectedFile(event.target.files[0]);
    }


    const handleButtonClick = () => {
        fileInputRef.current.click();
    }


    useEffect(() => {
        if (selectedFile)
        {
            const reader = new FileReader();
            reader.readAsDataURL(selectedFile);
            reader.onload = () => SEND_USER_INFO(prevState => ({...prevState , avatar_url: reader.result}))
        }
    } , [selectedFile])


    const checkForContinue = _.every(['username', 'firstname', 'lastname'] , KEY => !_.isEmpty(SET_USER_INFO[KEY]))

    // console.log(checkForContinue)
    //

    console.log(SET_USER_INFO)


    return (
        <VStack spacing={5} justify={"center"} maxW={'md'} h={'100vh'} m={"auto"} p={5} >

            <VStack>
                <Input
                    variant="filled"
                    colorScheme="teal"
                    type="file"
                    display={"none"}
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    accept="image/*" />
                <Box  position={"relative"}>
                    <Avatar src={SET_USER_INFO.avatar_url} size={'2xl'}  name={SET_USER_INFO.firstname}/>
                    <IconButton position={"absolute"} bottom={1} right={1} size={"sm"} onClick={handleButtonClick} rounded={"full"} icon={<MdAdd size={20}/>} aria-label={'add-image'}/>
                </Box>
            </VStack>

            <VStack w={"full"} >
                <Input defaultValue={SET_USER_INFO?.firstname} variant='filled' placeholder='First name' onChange={({target}) => SEND_USER_INFO(prevState => ({...prevState , firstname: target.value}))} />
                <Input defaultValue={SET_USER_INFO?.lastname} variant='filled' placeholder='Last name' onChange={({target}) => SEND_USER_INFO(prevState => ({...prevState , lastname: target.value}))} />
                <Input defaultValue={SET_USER_INFO?.username} variant='filled' placeholder='Username' onChange={({target}) => SEND_USER_INFO(prevState => ({...prevState , username: target.value}))} />
            </VStack>


            <Button disabled={!checkForContinue}
                    isLoading={SET_USER_INFO.loading}
                    spinnerPlacement='start'
                    size={"sm"}
                    onClick={setProfileInfo} colorScheme={'pink'}>Confirm and next</Button>
        </VStack>
    )
}