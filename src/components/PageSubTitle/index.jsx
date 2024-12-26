import './pageSubTitle.css';
import { FaPlus } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const PageSubTitle = ({
  buttontext1,
  buttontext2,
  buttontext3,
  buttontext1Link,
  buttontext2Link,
  buttontext3Link,
  name,
  create,
}) => {
  const location = useLocation();

  return (
    <div>
      <div className="PageSubTitle-header">
        <ul className="PageSubTitle-list">
          <li
            className={`PageSubTitle-item ${
              location.pathname === buttontext1Link ? 'active-link1' : ''
            }`}
          >
            <Link to={buttontext1Link} className="PageSubTitle-link">
              {buttontext1}
            </Link>
          </li>
          <li
            className={`PageSubTitle-item ${
              location.pathname === buttontext2Link ? 'active-link2' : ''
            }`}
          >
            <Link to={buttontext2Link} className="PageSubTitle-link">
              {buttontext2}
            </Link>
          </li>
          <li
            className={`PageSubTitle-item ${
              location.pathname === buttontext3Link ? 'active-link3' : ''
            }`}
          >
            <Link to={buttontext3Link} className="PageSubTitle-link">
              {buttontext3}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PageSubTitle;
