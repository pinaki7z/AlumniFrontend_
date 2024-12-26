import './donSpon.css'

const DonSpon = ({title,icon}) => {
    console.log('title' , title)
    return(
        <div style={{width: '100%',}}>
            <div className="don-spon-title">
            
            <h2 style={{color: 'white'}}>{title}</h2>
            <p style={{fontSize:'16px'}}>Discover opportunities, network with fellow alumni entrepreneurs, and explore collaboration possibilities in our dynamic Business Connect hub within the alumni portal.</p>
            </div>
            
        </div>
    )
}

export default DonSpon;