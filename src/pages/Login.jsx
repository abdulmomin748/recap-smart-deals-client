import { use } from "react";
import { FaRegEye  } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { Link, Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const Login = () => {
    const {user} = use(AuthContext)
    const location = useLocation();
    console.log(location.state);
    if(user){
        return <Navigate to={location.state || '/'}></Navigate>
    }
    const {signInGoogle} = use(AuthContext)
    const handleSignIn = e => {
        e.preventDefault();
        const name = e.target.email.value;
        const email = e.target.password.value;
        console.log(name,email);
    }
    
    const handleSignInGoogle = () => {

        signInGoogle()
        .then(userCredential => {
            // Signed up 
            const user = userCredential.user;
            console.log(user);
        })
        .catch(error => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode,errorMessage);
        });

    }

    return (
        <div>
            <div className=" pb-10">
                <h1 className='text-4xl text-center text-black mt-10'>Login Now</h1>

            
                <div className="card-body card bg-base-100 w-full max-w-sm m-auto my-10 ">
                    
                    <form onSubmit={handleSignIn}>
                        
                        <fieldset className="fieldset">
                        <label for="email" className="label">Email</label>

                        <input type="email" name='email' className="input w-full" placeholder="Email" required id="email"/>
                        
                        <label className="label">Password</label>
                        <div className='relative'>
                            <input 
                            type=''
                            className="input w-full" 
                            name='password' 
                            placeholder="Password" 
                            required
                            />
                            <span className="text-xl p-2 cursor-pointer absolute right-3 bottom-0 z-40">
                                <FaRegEyeSlash /> <FaRegEye />
                            </span>
                        </div>
                        <div>
                            <Link to={'/resetPassword'} className="link link-hover mt-2 inline-block">Forgot password?</Link>
                            {
                                <p className="text-red-600 my-2"></p>
                            }
                        </div>
                            <input type='submit' className="btn text-[15px] font-semibold btn-neutral" placeholder='red'
                            value='Login'
                            ></input>
                            <span onClick={handleSignInGoogle}  className='bg-black cursor-pointer p-3 flex items-center text-white justify-center text-[15px] font-semibold mt-2'>
                                <FcGoogle className=' mr-4 cursor-pointer text-2xl' />
                                Login with Google
                            </span>
                                <div className='z-100'>
                                Don't have an account? <Link to={'/register'} className='link link-hover underline'>Register </Link>
                            </div>
                            
                        </fieldset>
    
                    </form>
    
                </div>
            </div>
        </div>
    );
};

export default Login;