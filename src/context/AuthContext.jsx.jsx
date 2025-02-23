import { createContext, useEffect, useState, useContext } from "react";
import { supabase } from "../lib/supabase";
import { data } from "react-router";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [session, setSession] = useState(undefined);

    // sign up 
    const signUpNewUser = async ({ email, password }) => {
        try {
            console.log({email, password})
            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password
            });

            if (error) {
                console.error(`there was a problem signing up: ${error}`);
                return { success: false, error: error.message };
            }

            console.log("sign-up success: ",data);
            return { success: true, data };
        } catch (error) {
            console.error("an error occurred: ", error);
        }
    };

    // sign in
    const signinUser =async ({ email, password } ) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email:email,
                password: password
            });

            if(error) {
                console.error('sign in error occurred: ', error);
                return { success: false, error: error.message}
            };

            console.log('sign-in success: ', data)
            return { success: true, data}
        } catch (error) {
            console.error("an error occurred: ", error);
        }
    };

    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => {
            setSession(data)
        });

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, []);

    // sign out
    const signOut = () => {
        const { error } = supabase.auth.signOut();
        if (error) {
            console.error("there was an error", error);
        }
    };

    return (
        <AuthContext.Provider value={{ session, signUpNewUser, signOut, signinUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    return useContext(AuthContext)
}