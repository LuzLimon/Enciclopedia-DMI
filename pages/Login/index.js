import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import axios from 'axios';
import StyledButton from "../../components/Button";
import Container from "../../components/Container";
import Title from "../../components/Title";
import { Image, StyleSheet } from "react-native";

const URL = 'https://backend-dwi-production.up.railway.app/api/user/login';

export default function Login({ login }) {
    const [hasError, setHasError] = useState(false);
    const [body, setBody] = useState({ email: '', password: '' });

    const inputChange = ({ target }) => {
        const { name, value } = target;
        setBody({
            ...body,
            [name]: value,
        });
    };

    const handleLogin = () => {
        axios.post(URL, body)
        .then(({ data }) => {
            if (data.data.email === body.email && body.password) {
                setHasError(false);
                return login();
            }
            setHasError(true);
            console.log(data);
        })
        .catch(({ response }) => {
            console.log(response);
        });
};

    const styles = StyleSheet.create({
        img: {
            width: 200,
            height: 200,
            marginBottom: 15,
        },
        input: {
            width: 250,
            height: 25
        }
    })

    return (
        <Container style={{
            backgroundColor: '#FFF0F5'
        }}>
            <Title bold={true}>ENCICLOPEDIA</Title>
            <br></br>
            <Image
                style={styles.img}
                source={require("../../assets/icons8-marcapáginas-750.png")}
            />
            <Title>Email</Title>
            <input
                mt={20}
                mb={5}
                style={styles.input}
                placeholder="Ingrese su email"
                name="email"
                onChange={inputChange}
                value={body.email}
            />
            <br></br>
            <Title>Password</Title>
            <input
                mt={20}
                mb={5}
                style={styles.input}
                placeholder="Ingrese su password"
                name="password"
                onChange={inputChange}
                value={body.password}
            />
            <StyledButton onPress={handleLogin}>
                <Title color="white" bold={true}>
                    Login
                </Title>
            </StyledButton>
            {hasError && (
                <Title color="red" size={12} bold={true}>
                    Error: Invalid credentials
                </Title>
            )}

            <StatusBar style="auto" />
        </Container>
    );
}
