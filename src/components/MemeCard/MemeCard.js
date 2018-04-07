import React from "react";
import "./MemeCard.css";

const MemeCard = props => (
    <div className="card">
        <div className="img-container">
            <a onClick={() => props.selectMeme(props.meme)} 
                className={props.curScore === 0 ? "style_prevu_kit style_prevu_kit_ex" : "style_prevu_kit"}
            >
                <img alt={props.meme} src={props.image} />
            </a>
        </div>
    </div>
);

export default MemeCard;