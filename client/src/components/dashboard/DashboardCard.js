import React from "react";

const DashboardCard = (props) => {
    const { title, text, imgSrc, btnType,role } = props;
    return (
        <div className="col-md-4 pb-4">
            <div className="card cardP">
                <img
                    className="card-img-top cardimg"
                    src={imgSrc}
                    alt="Card image cap"
                ></img>
                <div className="card-body">
                    <h5 className="card-title text-center">{title}</h5>
                    <p className="card-text text-center">{text}</p>
                    <div className="text-center">
                        <a href="#" className={`btn btn-primary setting ${btnType} `}>
                            {role==="student" ? "Lets Practice" : "View Questions"}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardCard;
