import { useState, useEffect, useRef } from 'react'
import { Auth} from "@supabase/ui";
import supabase from "../utils/initSupabase";
import {useRouter} from 'next/router';
import Loader from "react-loader-spinner";
import UserCard from "../components/usercard";
import ContentCard from "../components/contentcard";
 function Home(props){
    const { user } = Auth.useUser();
    const [loading, setLoading] = useState(true);
    const router=useRouter()

    useEffect(()=>{
        getProfile()
        async function getProfile(){
        const {data} = await supabase
        .from('profile')
        .select()
        .filter('user_id', "eq", supabase.auth.user() === null?" ":supabase.auth.user().id)
        
        if(!data){
          setLoading(false);
        }
        else{
        setLoading(false);
        }
        }
      }
      , [user,loading])


      while (loading){
        return (<div className="flex justify-center align-middle mt-20">
                    <p className="text-xl mt-5 mx-auto text-gray-800 text-center">
                    <Loader
                type="Puff"
                color="rgba(31,41,55)"
                height={80}
                width={80}
                
              />
                    </p>
                </div>)
        }

    if(user){
        return (
        <div className="mt-20 flex">
            
            <div className='h-screen overflow-y-scroll w-64 hidden md:block'>
<UserCard useravatar={require('../public/profile.jpg')}/>
<UserCard useravatar={require('../public/profile.jpg')}/>
<UserCard useravatar={require('../public/profile.jpg')}/>
<UserCard useravatar={require('../public/profile.jpg')}/>
<UserCard useravatar={require('../public/profile.jpg')}/>
<UserCard useravatar={require('../public/profile.jpg')}/>
<UserCard useravatar={require('../public/profile.jpg')}/>
            </div>

            <div className="md:h-screen h-full md:overflow-y-scroll overflow-hidden w-full md:px-2 px-0 md:w-3/4 ">
            <ContentCard useravatar={require('../public/profile.jpg')}/>
            <ContentCard useravatar={require('../public/profile.jpg')}/>
            <ContentCard useravatar={require('../public/profile.jpg')}/>
            <ContentCard useravatar={require('../public/profile.jpg')}/>
            </div>

        </div>
    )
}
else{
    return props.children
}
}


export default function AuthProfile() {
    return (
      <Auth.UserContextProvider supabaseClient={supabase}>
        <Home supabaseClient={supabase}>
          <Auth
            className="mt-20"
            supabaseClient={supabase}
            providers={["github","google"]}
            socialLayout="horizontal"
          />
        </Home>
      </Auth.UserContextProvider>
    );
  }