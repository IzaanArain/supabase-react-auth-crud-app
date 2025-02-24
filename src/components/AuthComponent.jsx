
import React, { useState, useEffect } from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useAuthContext } from '../context/AuthContext.jsx.jsx';
// import { useNavigate } from 'react-router';
import { supabase } from '../lib/supabase.js';

const AuthComponent = () => {
    // const navigate = useNavigate();

    const { session } = useAuthContext();
    if (!session) {
        return (<Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />)
    }
    else {
        // navigate('/dashboard');
        return (<div>Logged in!</div>)
    }
}

export default AuthComponent;