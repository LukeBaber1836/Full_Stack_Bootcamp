import React, { useEffect, useState } from "react";
import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory } from "../../../declarations/nft";
import { idlFactory as tokenIdlFactory } from "../../../declarations/token";
import { Principal } from "@dfinity/principal";
import { opend } from "../../../declarations/opend/";
import Button from "./Button";
import PriceLabel from "./PriceLabel";
import CURRENT_USER_ID from "../index";

function Item(props) {

  const [name, setName] = useState();
  const [owner, setOwner] = useState();
  const [image, setImage] = useState();
  const [button, setButton] = useState();
  const [priceInput, setPriceInput] = useState();
  const [loaderHidden, setLoaderHidden] = useState(true);
  const [blur, setBlur] = useState();
  const [sellStatus, setSellStatus] = useState("");
  const [priceLabel, setPriceLabel] = useState();
  const [shouldDisplay, setDisplay] = useState(true);
  

  const id = props.id;

  const localHost = "http://localhost:8081/";  // <-- Make sure this is the local host being used
  const agent = new HttpAgent({host: localHost});

  agent.fetchRootKey(); //TODO: When deployed live, remove this line

  let NFTActor;

  async function loadNFT() {
    NFTActor = await Actor.createActor(idlFactory, {
      agent,
      canisterId: id,
    });

    const nftName = await NFTActor.getName();
    const nftOwner = await NFTActor.getOwner();
    const imageData = await NFTActor.getAsset();
    const imageContent = new Uint8Array(imageData);

    // Convert into image url
    const imageURL = URL.createObjectURL(
      new Blob([imageContent.buffer], {type: "image/png"})
    );

    setName(nftName);
    setOwner(nftOwner.toText());
    setImage(imageURL);

    if (props.role == "collection") {
        const nftIsListed = await opend.isListed(props.id);
      if (nftIsListed) {
        setOwner("OpenD")
        setBlur({filter: "blur(4px)"});
        setSellStatus("Listed");
      } else  {
        setButton(<Button handleClick={handleSell} text={"Sell"}/>);
      }
    } else if (props.role == "discover") {
      const originalOwner = await opend.getOriginalOwner(props.id);
      if (originalOwner.toText() != CURRENT_USER_ID.toText()) {
        setButton(<Button handleClick={handleBuy} text={"Buy"}/>);
      }

      const price = await opend.getListedNFTPrice(props.id);
      setPriceLabel( <PriceLabel sellPrice={price.toString()}/> );

    }
  }

  // Runs when page loads
  useEffect(() => {
    loadNFT();
  },[])

  let price;
  function handleSell() {
    console.log("Sell clicked");
    setPriceInput(
      <input
        placeholder="Price in DLT"
        type="number"
        className="price-input"
        value={price}
        onChange={(e) => price=e.target.value}
      />
    );
    setButton( <Button handleClick={sellItem} text={"Confirm"}/>)
  }

  async function sellItem() {
    setBlur({filter: "blur(4px)"});
    setLoaderHidden(false);
    const listingResult = await opend.listItem(props.id, Number(price));
    console.log(listingResult);
    if (listingResult == "Success") {
      const openDId = await opend.getOpenDCanisterID();
      const transferResult = await NFTActor.transferOwnership(openDId);
      console.log(transferResult);
      if (transferResult == "Transfer Success") {
        setLoaderHidden(true);
        setButton();
        setPriceInput();
        setOwner("OpenD");
        setSellStatus("Listed");
      }
    }
  }

  async function handleBuy() {
    setLoaderHidden(false);
    console.log("Buy was triggered");
    const tokenActor = await Actor.createActor(tokenIdlFactory, {
      agent,
      canisterId: Principal.fromText("tfuft-aqaaa-aaaaa-aaaoq-cai"),
    });

    const sellerId = await opend.getOriginalOwner(props.id);
    const itemPrice = await opend.getListedNFTPrice(props.id);

    const result = await tokenActor.transfer(sellerId, itemPrice);
    if (result == "Success") {
      const transferResult = opend.completePurchase(props.id, sellerId, CURRENT_USER_ID);
      console.log("purchase: " + transferResult);
    }
    setLoaderHidden(true);
    setDisplay(false);
  }

  return (
    <div style={{ display: shouldDisplay ? "inline" : "none" }} className="disGrid-item">
      <div className="disPaper-root disCard-root makeStyles-root-17 disPaper-elevation1 disPaper-rounded">
        <img
          className="disCardMedia-root makeStyles-image-19 disCardMedia-media disCardMedia-img"
          src={image}
          style={blur}
        />

        <div hidden={loaderHidden} className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>

        <div className="disCardContent-root">
          {priceLabel}
          <h2 className="disTypography-root makeStyles-bodyText-24 disTypography-h5 disTypography-gutterBottom">
            {name}<span className="purple-text"> {sellStatus}</span>
          </h2>
          <p className="disTypography-root makeStyles-bodyText-24 disTypography-body2 disTypography-colorTextSecondary">
            Owner: {owner}
          </p>
          {priceInput}
          {button}
        </div>
      </div>
    </div>
  );
}

export default Item;
