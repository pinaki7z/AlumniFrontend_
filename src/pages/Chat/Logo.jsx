import { IoMdChatbubbles } from "react-icons/io";
export default function Logo() {
    return (
      <div style={{color: 'black', fontWeight: '900',display: 'flex',alignItems: 'center', fontSize:'23px',paddingLeft:'10px',gap:'45px'}}>
      <IoMdChatbubbles style={{color:'black',fontSize:'25px'}} />
        CHAT
      </div>
    );
  }