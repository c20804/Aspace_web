import React from 'react'
import { useEffect } from "react";

const ListMenuComponent = ({ activeCategory, setActiveCategory, setFiltered, properties }) => {

    useEffect(() => {
        if (activeCategory === '') {
            setFiltered(properties);
            return;
        }
        const filtered = properties.filter((property) =>
            property.type.includes(activeCategory)
        );
        setFiltered(filtered);

    }, [activeCategory]);



    return (
        <div className='constainer'>
            <div className="btn-group flex-wrap" id='menu' role="group" aria-label="Basic example">
                <button onClick={() => setActiveCategory('')} type="button" className={activeCategory === '' ? "btn btn-light active" : "btn btn-light"} id='all'><span class="material-icons">
                    holiday_village</span>
                    All</button>
                <button onClick={() => setActiveCategory('gameroom')} type="button" className={activeCategory === 'gameroom' ? "btn btn-light active" : "btn btn-light"} id='game_room'><span
                    className="material-icons">sports_esports</span>
                    Game Room</button>
                <button onClick={() => setActiveCategory('yard')} type="button" className={activeCategory === 'yard' ? "btn btn-light active" : "btn btn-light"} id='yard'><span
                    className="material-icons">deck</span>
                    Yard</button>
                <button onClick={() => setActiveCategory('diningroom')} type="button" className={activeCategory === 'diningroom' ? "btn btn-light active" : "btn btn-light"} id='dining_room'><span
                    className="material-icons">restaurant_menu</span>
                    Dining</button>
                <button onClick={() => setActiveCategory('kitchen')} type="button" className={activeCategory === 'kitchen' ? "btn btn-light active" : "btn btn-light"} id='kitchen'><span
                    className="material-icons">kitchen</span>
                    Kitchen</button>
                <button onClick={() => setActiveCategory('basement')} type="button" className={activeCategory === 'basement' ? "btn btn-light active" : "btn btn-light"} id='basement'><span
                    className="material-icons">inventory_2</span>
                    Basement</button>
                <button onClick={() => setActiveCategory('cellar')} type="button" className={activeCategory === 'cellar' ? "btn btn-light active" : "btn btn-light"} id='cellar'><span
                    className="material-icons">liquor</span>
                    Cellar</button>
                <button onClick={() => setActiveCategory('bedroom')} type="button" className={activeCategory === 'bedroom' ? "btn btn-light active" : "btn btn-light"} id='bedroom'><span
                    className="material-icons">bed</span>
                    Bedoom</button>
                <button onClick={() => setActiveCategory('garage')} type="button" className={activeCategory === 'garage' ? "btn btn-light active" : "btn btn-light"} id='garage'><span
                    className="material-icons">warehouse</span>
                    Garage</button>
                <button onClick={() => setActiveCategory('livingroom')} type="button" className={activeCategory === 'ivingroom' ? "btn btn-light active" : "btn btn-light"} id='living_room'><span
                    className="material-icons">chair</span>
                    Living Room</button>
                <button onClick={() => setActiveCategory('workspace')} type="button" className={activeCategory === 'workspace' ? "btn btn-light active" : "btn btn-light"} id='workspace'><span
                    className="material-icons">business_center</span>
                    Workspace</button>
                <button type="button" className="btn btn-light" id='settings'><span className="material-icons">tune</span>
                </button>
            </div>
        </div>
    )
}

export default ListMenuComponent