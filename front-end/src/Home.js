import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './styles.css';

const Home = props => {
    return (
        <div className="container mx-auto p-4 h-screen w-screen">
            <div className="text-center">
                <h1 className="text-4xl font-extrabold leading-none md:text-5xl lg:text-6xl">
                    Crypto Portfolio Tracker
                </h1>
                <Link to="/login" className="my-4 mx-4 inline-block">Login</Link> 
                <Link to="/settings" className="my-4 mx-4 inline-block">Login</Link>
                <Section title="News" />
                <Section title="Recent Updates" />
            </div>
        </div>
    );
};

const Section = ({ title }) => (
    <div className="my-8">
        <h1 className='text-2xl font-extrabold my-4'>
            {title}
        </h1>
        <div className='bg-gray-300 w-full p-4'>
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
        </div>
    </div>
);

const ListItem = () => (
    <button className='bg-white my-2 p-4 shadow-md rounded-lg w-full block hover:bg-gradient-to-r from-pink-500 to-orange-500 hover:text-white'>
        {/* Content goes here */}
        <p className='font-medium'>{'Sample Item Text'}</p>
        
    </button>
);

// make this component available to be imported into any other file
export default Home;
