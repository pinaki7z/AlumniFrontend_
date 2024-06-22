import DisplayPost from "../../DisplayPost";
import { useSelector } from "react-redux";
import { useState,useEffect } from "react";
import axios from "axios";
import baseUrl from "../../../config";
const Bconnect = () => {
    console.log('BConnect')
    const title = 'SuggestedGroups';
    const [groups, setGroups] = useState([]);
    const getGroups = async () => {
  
       
        try {
            const response = await axios.get(
                `${baseUrl}/groups/groups/businessConnect`
            );
            const postsData = response.data.businessConnect;
            setGroups(postsData);
      
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };
    
    
    useEffect(() => {
        getGroups();
      }, []);
      console.log('business connect', groups)
      return (
        <div style={{ paddingBottom: '3vh' }}>
    
          <DisplayPost title={title} groups={groups} />
        
        </div>
      )
}
export default Bconnect;