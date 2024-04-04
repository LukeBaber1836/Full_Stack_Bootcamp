import React from "react"

function Button(props) {
    return(
    <div className="disButtonBase-root disChip-root makeStyles-price-23 disChip-outlined">
        <span className="disChip-label">{props.sellPrice} LDT</span>
    </div>
    );
}

export default Button