import Feed from '../../components/Feeed';
import { useSelector } from 'react-redux';


const News = () => {
  const profile = useSelector((state) => state.profile);
  let admin;
  if (profile.profileLevel === 0 || profile.profileLevel === 1) {
    admin = true;
  }



  return (
    <div>
      <div style={{borderRadius: '12px',padding: '30px',backgroundColor: '#a98de3'}}>
        <div style={{fontFamily: 'Inter', fontSize: '32px',fontWeight: '600', color: 'white'}}>
          News
        </div>
        <p style={{fontFamily: 'Inter', fontSize: '16px', fontWeight: '400',paddingTop: '20px'}}>
          Welcome to our dynamic Alumni Portal News Page, your source for the latest updates, inspiring stories, and exclusive opportunities tailored for our esteemed alumni community.
        </p>
      </div>
      {admin ?
        <Feed showCreatePost={false} showCreateButton={true} entityType="news" entityId="id" showDeleteButton={true} />
        :
        <Feed showCreatePost={false} entityType="news" entityId="id" showDeleteButton={true} />
      }
    </div>
  )
}

export default News;