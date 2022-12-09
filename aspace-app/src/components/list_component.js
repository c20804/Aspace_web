import React, {useState,useEffect} from 'react'
import CardComponent from './card_component';
import ListMenuComponent from './list_menu_component';
import "../styles/listing.css"

// import DetailComponent from './detail_component';
import Listing_detail from './listing_detail';

const ListProperties = ({original, properties, search}) => {
    const rows = [];
    const [isClick, setClick] = useState({click: false, id:"-1"});
    // console.log(isClick)

    if (isClick.click && isClick.id !== -1) {
        return <Listing_detail key={isClick.id} properties={original[isClick.id - 1]} isClick={isClick} setClick={setClick}/>
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
                        rows.map(row => {
                            return <CardComponent key={row.id} properties={row} isClick={isClick} setClick={setClick}/>
                            // return (isClick.click && isClick.id===row.id ? <DetailComponent key={row.id} properties={row} isClick={isClick} setClick={setClick}/> :<CardComponent key={row.id} properties={row} isClick={isClick} setClick={setClick}/>)
                        })
                    }
                </div>
            </div>
        )
    }
}

const ListComponent = ({search, setSearch}) => {
    // console.log(search);
    const [filtered, setFiltered] = useState([]);
    const [activeCategory, setActiveCategory] = useState('');


    const [data,setData]=useState([]);
    const getData=()=>{
        fetch('properties.json'
        ,{
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
        )
        .then(function(response){
            console.log(response)
            return response.json();
        })
        .then(function(myJson) {
            console.log(myJson);
            setData(myJson);

            setFiltered(myJson);
        });
    }
    useEffect(()=>{
        getData()
    },[])

  return (
    <div>
        <div className="container" id="housing">
            <ListMenuComponent properties={data} setFiltered={setFiltered} activeCategory={activeCategory} setActiveCategory={setActiveCategory}/>
            <ListProperties original={data} properties={filtered} search={search}/>
        </div>
    </div>
  )
}

export default ListComponent