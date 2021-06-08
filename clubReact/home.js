import React from "react";
import ReactDOM from "react-dom";
import neptune from "./images/flowers.jpeg";

function Home(props){
    return (<section>
    {<div>
        <h1>&#x1F3E1; Fremont Gardening Club &#x1F3E1; </h1>
        < img src={neptune}
                width="250"
                height="450" />
         
        <h2>About Us</h2>
        <p> Now a days people are fascinating about finding their conncetion with nature and the way it works for us.One of the interesting habit 	we attract towards is &#x1F331; &#x1F331; &#x1F331; &#x1F331; gardening as we can find ourselves in doing anywork related to it and enjoys each and every tiny growth in a plant from our garden.We feel it as a big acheivement to grow a variety of plants from seed to trees and using their products for ourselves one day.</p>
        <h2> Why ? </h2>
        <p> This is the club intended for those people we are passionate about gardening in our city, the current climate scenarios made ecosystem 	vulnerable ,where as our gardens too.To defend those panic situations and to fight with diseases due to regional changes and invasive 	species this club helps to be in track with garden health and development.
once again Welcom to Fremont Gardening Club</p>
  <footer>
             <p>© 2020 Fremont Gardening Club</p>
   </footer>
   </div>}
   </section>
    );
}

export default Home;