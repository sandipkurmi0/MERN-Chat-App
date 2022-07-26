import React, { useState } from 'react'
import { Button } from "@chakra-ui/button";
import { VStack } from '@chakra-ui/react'
import { InputGroup, InputRightElement } from "@chakra-ui/input";
import {
    FormControl,
    FormLabel,
    Input
} from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import axios from 'axios'
import { useHistory } from "react-router";


const Login = () => {

    const toast = useToast()
    const [show, setShow] = useState(false)
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    const handleClick = () => setShow(!show)


    const submitHandler = async () => {
        setLoading(true)
        if (!email || !password) {
            toast({
                title: "Please Fill all the Feilds",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false)
            return;
        }

        try {
            const config = {
                headers: {
                    "content-type": "application/json",
                },
            }
            const { data } = await axios.post(
                "/api/login",
                { email, password },
                config
            );

            toast({
                title: "Login Successfully",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "bottom",

            })
            localStorage.setItem("userInfo", JSON.stringify(data))
            setLoading(false);
            history.push("/chats")
            window.location.reload(false);
        } catch (error) {
            toast({
                title: "Wrong Email Address and Password",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom"
            })
            setLoading(false)
        }
    }

    return (
        <VStack spacing="10px">
            <FormControl id="email" isRequired>
                <FormLabel>Email Address</FormLabel>
                <Input
                    value={email}
                    type="email"
                    placeholder="Enter Your Email Address"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormControl>
            <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup size="md">
                    <Input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type={show ? "text" : "password"}
                        placeholder="Enter password"
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <Button
                colorScheme="blue"
                width="100%"
                style={{ marginTop: 15 }}
                onClick={submitHandler}
                isLoading={loading}
            >
                Login
            </Button>
            <Button
                variant="solid"
                colorScheme="red"
                width="100%"
                onClick={() => {
                    setEmail("guest@example.com");
                    setPassword("123456");
                }}
            >
                Get Guest User Credentials
            </Button>
        </VStack>
    )
}

export default Login