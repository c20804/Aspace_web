import React, {useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import CardComponent from './card_component';
import ListMenuComponent from './list_menu_component';
import PropertyService from "../services/property.service";
import "../styles/listing.css"

// import DetailComponent from './detail_component';
import Listing_detail from './listing_detail';

const ListProperties = (props) => {
    let {original, properties, search, currentUser, setCurrentUser} = props;
    const navigate = useNavigate();

    const rows = [];
    const [isClick, setClick] = useState({click: false, id:"-1"});
    // console.log(isClick)
    if (isClick.click && isClick.id !== -1) {
        return <Listing_detail key={isClick.id} properties={original[isClick.id - 1]} isClick={isClick} setClick={setClick} currentUser={currentUser} setCurrentUser={setCurrentUser} />
    } else 
    {
        properties.forEach((property) =>  {
            if (search) {
                if ( 
                    search.location &&
                    (property.city.toLowerCase().indexOf(search.location.toLowerCase()) === -1) &&
                    (property.state.toLowerCase().indexOf(search.location.toLowerCase()) === -1) &&
                    (property.title.toLowerCase().indexOf(search.location.toLowerCase()) === -1)
                ) {
                    return;
                }
                if (
                    search.type &&
                    (property.title.toLowerCase().indexOf(search.type.toLowerCase()) === -1)
                ) {
                    return;
                }
            }
            rows.push(property);
        });

        return (
            <div className="row" id="listing">
                <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
                    {
                        rows.map(property => {
                            return <CardComponent key={property._id} properties={property} isClick={isClick} setClick={setClick}/>
                        })
                    }
                </div>
            </div>
        )
    }
}

const ListComponent = (props) => {
    // console.log(search);
    let { search, setSearch, currentUser, setCurrentUser } = props;
    const [filtered, setFiltered] = useState([]);
    const [activeCategory, setActiveCategory] = useState('');
    const [data,setData]=useState([]);

    //get data from DB
    const getData = () => {
        PropertyService.getAll()
        .then((data) => {
          console.log(data);
          setData(data.data);
          setFiltered(data.data);
        })
        .catch((err) => {
          console.log(err);
        });
        
    }

    // populates from old file
    // const getData=()=>{
    //     fetch('properties.json'
    //     ,{
    //         headers : { 
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json'
    //         }
    //     }
    //     )
    //     .then(function(response){
    //         console.log(response)
    //         return response.json();
    //     })
    //     .then(function(myJson) {
    //         console.log(myJson);
    //         setData(myJson);

    //         setFiltered(myJson);
    //     });
    // }
    useEffect(()=>{
        getData()
    },[])

  return (
    <div>
        <div className="container" id="housing">
            <ListMenuComponent properties={data} setFiltered={setFiltered} activeCategory={activeCategory} setActiveCategory={setActiveCategory}/>
            <ListProperties original={data} properties={filtered} search={search} currentUser={currentUser} setCurrentUser={setCurrentUser}/>
        </div>
    </div>
  )
}

export default ListComponent