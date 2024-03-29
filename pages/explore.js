import { useState, useEffect, useRef, useCallback} from 'react'
import { Auth, Input, Button, IconSearch, IconMoreHorizontal} from "@supabase/ui";
import supabase from "../utils/initSupabase";
import {useRouter} from 'next/router';
import Loader from "react-loader-spinner";
import ContentCard from "../components/ContentCard";
import LoginActionCard from "../components/ActionAuth";
import {categoryList} from '../constants/categories'
import Header from '../components/Header'

 export default function Explore(props){
    const [loading, setLoading] = useState(true);
    const loadMore=useRef(null);
    const router=useRouter()
    const [posts, setPosts] = useState([])
    const [currentRange, setRange]=useState(10)
    const [currentCategory,setCategory]=useState('programming');
    const [search,setSearch]=useState('');


    
  const fetchPosts=useCallback(()=>{

    Get()
  async function Get() {
    const {id}=supabase.auth.user
    if(id){
      return null
        // router.push('/home')
    }
    else{
      const { data } = await supabase
      .from('posts')
      .select(`category,content,inserted_at,isPrivate,featured,title,user_id, creator: user_id(username,fullname,avatar_url)`)
      .filter('category', 'eq', currentCategory)
      .range(0,currentRange)
   
      if(!data){
        setLoading(false);
      }
      else{
      setLoading(false);
      setPosts(data)
      }
    }
    
  }
}, [currentCategory, currentRange]);


useEffect(() => {
  fetchPosts()
}, [fetchPosts])

   
  async function Search(){
    if(search){
 await router.push(`/search?q=${search}`)
    }
  }

    

      

      
        
      


      while (loading){
        return (<div className="flex justify-center align-middle mt-20 mx-5">
                    <div className="text-xl mt-5 mx-auto text-gray-800 text-center">
                    <Loader
                type="Puff"
                color="rgba(31,41,55)"
                height={80}
                width={80}
                
              />
                    </div>
                </div>)
        }

    
        return (
        <div className=" mt-20 flex flex-col md:flex-row px-5">
        <Header title='Cstory - Explore'/>
            <div className='h-full  md:w-64 w-full  block'>
            <div className=" justify-between py-3 px-2 align-middle border-b mb-2 w-44 hidden md:flex">
              <div className="font-semibold text-purple-500">Quick Link</div>
            </div>
<LoginActionCard/>
            </div>



            <div className=" w-full md:px-2  md:w-3/4">
            <div className="flex justify-between align-middle py-3 px-2 border-b mb-2">
              <div className="font-semibold mr-2">Posts</div>
              <div className="font-light text-sm cursor-pointer text-purple-600">
<Input
  onChange={(e)=>{setSearch(e.target.value)}}
  className="h-1"
  actions={[
    <p onClick={Search} className='flex text-xs text-white px-2 py-1 rounded bg-purple-300 hover:bg-purple-500' key='search'>
          <IconSearch />Search
        </p>]}
/>
              </div>
            </div>

{/* posts */}
            <div>
            {!posts.length?
             (<div className="flex justify-center align-middle mt-10">
              <div className="text-sm flex mx-auto font-medium hover:text-purple-600 text-gray-800 text-center">Nothing Here&nbsp;...</div>
              </div>)
             :
             (posts.map((post, index)=><ContentCard key={index} timestamp={post.inserted_at} name={post.creator.fullname} route={`/${post.creator.username}/${post.title.replaceAll(' ','-')}`} title={post.title} category={`#${post.category}`} useravatar={post.creator.avatar_url} featured={post.featured} username={post.creator.username} isPrivate={post.isPrivate}/>))}
            
            </div>


            <div className='w-full md:hidden block shadow border-2 rounded border-purple-600 mt-5 px-1'>
              <div className="flex justify-between py-3 border-b mb-2">
              <div className="font-semibold px-2 text-gray-900 mt-2">Join Big Events 🎊</div>
              <div className=" text-sm cursor-pointer mr-2 bg-purple-600 hover:bg-purple-400 text-white p-2 rounded-sm font-semibold">Browse</div>
            </div>



            <div className="flex p-2 flex-wrap">
            <span className="font-medium text-gray-800">
            Be part of events & hackathons, building careers and leveraging your skill by taking internships & browsing job openings from top companies.
            </span>
            </div>
            </div>

{/* loading more */}
            {/* <div ref={loadMore} className="flex justify-center align-middle mt-20">
                    <div className="text-xl mt-5 mx-auto text-gray-800 text-center">
                    <Loader
                type="Puff"
                color="rgba(31,41,55)"
                height={30}
                width={30}
                
              />
                    </div>
                </div> */}

                <div ref={loadMore} className="flex justify-center align-middle mt-10">
                    <div onClick={()=>setRange((value)=>value+10)} className="text-sm flex mx-auto font-medium hover:text-purple-600 text-gray-800 text-center">Load More&nbsp;...</div>
</div>
            </div>
            
            <div className='h-full  w-64 hidden md:block'>
            <div className=' w-64 hidden md:block shadow border px-1'>
              <div className="flex justify-between py-3 border-b mb-2">
              <div className="font-semibold">Interests</div>
              <div className="font-light text-sm cursor-pointer text-purple-600">More...</div>
            </div>


{/* category */}
            <div className="flex flex-wrap">
            {categoryList.map((cat)=><span onClick={()=>setCategory(cat)} key={cat} className="font-extralight text-gray-800 cursor-pointer hover:text-purple-700 mr-2 mb-2">{cat}</span>)}

            </div>
            </div>



            <div className=' w-64 hidden md:block shadow border-2 rounded border-purple-600 mt-5 px-1'>
              <div className="flex justify-between py-3 border-b mb-2">
              <div className="font-semibold text-purple-600 p-2">Join Big Events 🎊</div>
              <div className=" text-sm cursor-pointer bg-purple-600 hover:bg-purple-400 text-white p-2 rounded-sm font-semibold">Browse</div>
            </div>



            <div className="flex p-2 flex-wrap">
            <span className="font-light text-gray-800">
            Be part of events & hackathons, building careers and leveraging your skill by taking internships & browsing job openings from top companies.
            </span>
            </div>
            </div>

</div>



        </div>

        
    )
}




