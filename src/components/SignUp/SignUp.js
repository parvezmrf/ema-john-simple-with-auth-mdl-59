import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/UserContext';
import './SignUp.css';


const SignUp = () => {

    const [error, setError] = useState(null)
    const { createUser } = useContext(AuthContext)

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirm = form.confirm.value;

        if (password !== confirm) {
            setError('Your Password did not match')
            return;
        }

        if (password.length < 6) {
            setError('Password should be 6 character or more')
            return;
        }
        console.log(email, password, confirm)

        createUser(email, password)
            .then(result => {
                const user = result.user;
                console.log(user)
                form.reset()
            })
            .catch(error => console.error(error))
    }




    return (
        <div className='form-continer' >
            <h2 className='form-title' >Sign Up</h2>

            <form onSubmit={handleSubmit} >
                <div className="form-control">
                    <label htmlFor="email" >Email </label>
                    <input type="email" name="email" placeholder='Enter correct email' required />
                </div>
                <div className="form-control">
                    <label htmlFor="password" >Password </label>
                    <input type="password" name="password" placeholder='Password' required />
                </div>
                <div className="form-control">
                    <label htmlFor="confirm" >Confirm Password </label>
                    <input type="password" name="confirm" placeholder='Confirm Password' required />
                </div>
                <input className='btn-submit' type="submit" value="Sign Up" />
            </form>
            <p className='text-error' > {error} </p>
            <p>Already have an account? <Link to='/login'>Login</Link>  </p>
        </div>
    );
};

export default SignUp;