import './pageTitle.css'
const PageTitle = ({ title,icon }) => {
    return (
        <div style={{ textAlign: 'left', padding: '20px', borderRadius: '10px', marginBottom: '10px', backgroundColor: '#a98de3' }}>
              <h2 style={{ margin: '0', color: 'white' }}>{title}</h2>
              <p style={{ marginTop: '10px', fontSize: '15px', color: 'black' }}>
              Check your latest alerts and stay informed on community updates.
              </p>
          </div>
    )
}

export default PageTitle;