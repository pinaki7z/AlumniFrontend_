import '../BrowseDonations/browseDonations.css';
import DisplayDonSpon from '../DisplayDonSpon';
import { useState } from 'react';
//import picture from 'public/images/profilepic.jpg';
// import backgroundPicture1 from 'public/images/pexels-mohamed-abdelghaffar-771742.jpg';
// import backgroundPicture2 from 'public/images/pexels-tyler-lastovich-590179.jpg';
// import backgroundPicture3 from 'public/images/bgimg.jpg';


const MyDonationRequests = ({name}) => {
    const backgroundPicture1 = `${process.env.REACT_APP_URL}/images/pexels-mohamed-abdelghaffar-771742.jpg`;
    const backgroundPicture2 = `${process.env.REACT_APP_URL}/images/pexels-tyler-lastovich-590179.jpg`;
    const backgroundPicture3 = `${process.env.REACT_APP_URL}/images/bgimg.jpg`;
    const picture = `${process.env.REACT_APP_URL}/images/profilepic.jpg`;
    const [donations, setDonations] = useState([
        {
          id: 1,
          title: 'test1',
          userName: 'admin',
          picture: backgroundPicture1,
          profilePic: picture,
          createdAt: '25 October 2023',
          raisedAmount: 1000,
          totalAmount: 100000
        },
        {
            id: 2,
            title: 'test2',
            userName: 'admin',
            picture: backgroundPicture2,
            profilePic: picture,
            createdAt: '24 October 2023',
            raisedAmount: 2000,
            totalAmount: 200000
        },
        {
            id: 3,
            title: 'test3',
            userName: 'admin',
            picture: backgroundPicture3,
            profilePic: picture,
            createdAt: '20 October 2023',
            raisedAmount: 3000,
            totalAmount: 300000
        }
      ]);
    return(
        <div style={{ width: '100%'}}>
           <DisplayDonSpon donations={donations} name={name}/>
        </div>
    )
}

export default MyDonationRequests;