
import { use } from "react";
import { FaRegEye  } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
const Register = () => {
    const { createUser,signInGoogle,user } = use(AuthContext);

    const handleRegister = e => {
        e.preventDefault();
        const name = e.target.name.value;

        const email = e.target.email.value;
        const password = e.target.password.value;

        const photoUrl = e.target.photoUrl.value;
        console.log(name,email,password,photoUrl);

        createUser(email, password)
        .then(userCredential => {
            // Signed up 
            const user = userCredential.user;
            console.log(user);
            alert('user created successfully')
        })
        .catch(error => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode,errorMessage);
            
        });
    }
    console.log(user);
    
    const handleSignInGoogle = () => {
        signInGoogle()
        .then(userCredential => {

            // Signed up 
            const user = userCredential.user;
            const newUser = {
                name : user.displayName,
                email : user.email,
                image: user.photoURL
            }
            console.log(user);

            // add user to db
            fetch('http://localhost:3000/users',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            })
            .then(res => res.json())
            .then(data => {
                console.log('data after user save>>>>', data);
            })
            
        })
        .catch(error => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode,errorMessage);
        });
    }
    return (
        <div>
            <div className="pb-10">
                <h1 className='text-4xl text-center text-black mt-10'>Register Now</h1>
                <div className="card-body card bg-base-100 w-full max-w-sm m-auto my-10 ">
                    <form onSubmit={handleRegister}>
                        
                      <fieldset className="fieldset">

                       
                        <label className="label">Name </label>
                        <input type="text" name='name' className="input w-full" placeholder="Your Name" required/>

                        <label className="label">Photo Url</label>
                        <input type="url" name='photoUrl' className="input w-full" placeholder="Photo Url" required/>


                        <label for="email" className="label">Email</label>

                        <input type="email" name='email' className="input w-full" placeholder="Email" required id="email"/>
                        
                        <label className="label">Password</label>
                        
                        <div className='relative'>
                            <input 
                           
                            className="input w-full" 
                            name='password' 
                            placeholder="Password" 
                            required/>
                            <span className="text-xl p-2 cursor-pointer absolute right-3 bottom-1 z-40">
                               <FaRegEyeSlash /> <FaRegEye />
                            </span>
                            
                        </div>
                        {
                               <p className="text-red-600 mt-2"></p>
                            }
                        <div>
                            <label className="label block my-2">
                                <input type="checkbox" name='terms' defaultChecked 
                                className="checkbox" />
                                <span className='ml-2'>Accept Our Terms & condition</span>
                                {
                                    <p className="text-red-600 mt-2"></p>
                                }
                            </label>
                        </div>
                            <input type='submit' className="btn btn-neutral text-[15px] font-semibold mt-2" placeholder='red'
                            value='Register'
                            ></input>
                            
                            <span onClick={handleSignInGoogle}  className='bg-black cursor-pointer p-3 flex items-center text-white justify-center text-[15px] font-semibold mt-2'>
                                    <FcGoogle className=' mr-4 cursor-pointer text-2xl' />
                                    Login with Google
                            </span>
                             <div className='z-100'>
                                Already have an account? <Link to={'/login'} className='link link-hover underline'> Login </Link>
                            </div>
                            
                        </fieldset>
  
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;