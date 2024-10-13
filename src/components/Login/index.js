
import Cookies from 'js-cookie'
import {useNavigate,Navigate } from 'react-router-dom'

const Login  = (props) => {
    const navigate = useNavigate()
   
   const onSuccess = (token) =>{
    Cookies.set('jwt_token', token, {expires: 30})
    navigate("/")
   }

   const handleLogin = async (e) => {
    e.preventDefault()
    
    const data = {username : "mor_2314", password : "83r5^_"}

    const url = "https://fakestoreapi.com/auth/login"
    
    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'  
          },
        body: JSON.stringify(data)
    }

    const response = await fetch(url,options)
    const result = await response.json()

    
    if(response.ok){
         onSuccess(result.token)
    }
    else{
        console.log(result.error_msg)
    }


   }

    if(Cookies.get("jwt_token") !== undefined){
        return <Navigate to="/"/>
    }

    return <div className="h-[100vh] flex-col flex justify-center items-center">
        <h1 className="mb-2 text-lg text-[#D91656] font-bold">Login with demo credentials</h1>
        <form onSubmit={handleLogin} className="w-[80%] md:w-[35%] flex flex-col justify-center md:py-8 md:h-[70%] md:px-8 border border-[#0003] rounded-sm py-4 px-2">
            <div className="flex flex-col mb-3">
                <label htmlFor="name" className="font-[500] text-xl" >Name</label>
                <input readOnly value="mor_2314" id="name" className="border-[#0003] border h-8 outline-none px-2 mt-1" type="text"/>
            </div>
              
            <div className="flex flex-col mb-3">
                <label htmlFor="pass" className="font-[500] text-xl" >Password</label>
                <input readOnly value="83r5^_" id="pass" className="border-[#0003] border h-8 outline-none px-2 mt-1" type="password"/>
            </div>
            
            <button className="bg-red-500 w-[100%] h-10 pointer mt-5 rounded-sm text-[#fff]" type="submit">Login</button>

        </form>
    </div>
}


export default Login