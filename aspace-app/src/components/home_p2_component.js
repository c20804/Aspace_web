import React from 'react'

const HomeP2Component = () => {
  return (
    <div>
        <div className="container below-header"></div>
        <div className="container text-center">
            <div className="row">
                <div className="col-lg-4 mb-5">
                    <div className="container h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="row">
                                <h1 className="title_p2"> Categories</h1>
                                <h2 className="content_p2 item-md-invisible"> Explore more space <br></br> to experience a <br></br> variety  of life <br></br> in ASpace</h2>
                            </div>
                        </div>
                    </div>
                </div>
            <div className="col-lg-8">
                <div className="row row-cols-lg-4 row-cols-md-3 row-cols-3 g-5">
                    <div className="col">
                        <div className="card">
                            <a href="/listing"><img src="images/game_room.jpg" className="card-img transbox" alt="game_room"/>
                                <div className="centered text-in-card">GameRoom</div>
                            </a>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card">
                            <a href="/listing"><img src="images/garage.jpg" className="card-img transbox" alt="garage"/>
                                <div className="centered text-in-card">Garage</div>
                            </a>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card">
                            <a href="/listing"><img src="images/kitchen.jpg" className="card-img transbox" alt="kitchen"/>
                                <div className="centered text-in-card">Kitchen</div>
                            </a>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card">
                            <a href="/listing"><img src="images/bedroom.jpg" className="card-img transbox" alt="bedroom"/>
                                <div className="centered text-in-card">Bedroom</div>
                            </a>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card">
                            <a href="/listing"><img src="images/yard.jpg" className="card-img transbox" alt="yard"/>
                                <div className="centered text-in-card">Yard</div>
                            </a>
                        </div>
                    </div>
                    <div className="col item-sm-invisible">
                        <div className="card">
                            <a href="/listing"><img src="images/studyroom.jpg" className="card-img transbox" alt="studyroom"/>
                                <div className="centered text-in-card">WorkSpace</div>
                            </a>
                        </div>
                    </div>
                    <div className="col item-sm-invisible">
                        <div className="card">
                            <a href="/listing"><img src="images/diningroom.jpg" className="card-img transbox" alt="diningroom"/>
                                <div className="centered text-in-card">DiningRoom</div>
                            </a>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card">
                            <a href="/listing"><img src="images/yard2.jpg" className="card-img transbox" alt="story-3"/>
                                <div className="centered text-in-card">More..</div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default HomeP2Component