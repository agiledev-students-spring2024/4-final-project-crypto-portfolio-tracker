import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './Header'
import { Link } from 'react-router-dom'
import './styles.css'

const News = (props) => {
    return (
        <div className="container mx-auto h-screen w-screen p-4 dark:bg-dark-blue dark:text-white">
            <div className="text-center">
                <Header></Header>
                <Section title="News" />
                <br></br>
                <Section title="Recent Updates" />
            </div>
        </div>
    )
}

const Section = ({ title }) => (
    <div className="mx-1">
        <h1 className="my-2 text-2xl font-extrabold">{title}</h1>
        <div className="bg-gray-300 p-4">
            <div className="h-48 overflow-y-auto">
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
            </div>
        </div>
    </div>
)

const ListItem = () => (
    <button className="my-1 block w-full rounded-lg bg-white from-pink-500 to-orange-500 p-4 text-black shadow-md hover:bg-gradient-to-r hover:text-white">
        {/* Content goes here */}
        <p className="font-medium">{'Lorem ipsum'}</p>
    </button>
)

export default News
