import React, { useEffect, useState } from "react";
import { Navbar, Button, Card } from "react-bootstrap"
import "./Main.css"
import getColors from "get-image-colors";
import hexToHsl from "hex-to-hsl";
import hslToHex from "hsl-to-hex"

const Main = () => {
    const [file, setFile] = useState(null)
    const [colorized, setColorized] = useState()
    const [comp, setComp] = useState();
    const [array, setArray] = useState();


    useEffect(() => {
        setComp(colorized?.map((hex) => {

            const makeHSL = hexToHsl(hex);

            const startingHue = makeHSL[0] - 1;
            const newHue = (startingHue + 180) % 360;

            const finalHex = hslToHex(newHue, makeHSL[1], makeHSL[2]);

            return finalHex;
        }))
    }, [colorized])

    const hiddenInput = React.useRef(null);

    const chooseFile = () => {
        hiddenInput.current.click();
    }


    const handleChange = (event) => {

        const uploadedFile = URL.createObjectURL(event.target?.files[0])
        setFile(uploadedFile);

        console.log(event)

    }

    const colorize = () => {
        getColors(file).then(colors => {
            setColorized(colors.map(color => color.hex()))
        })
    }

    console.log(comp, colorized)


    return (
        <div style={{ backgroundImage: colorized ? `linear-gradient(${colorized[0]}, ${colorized[1]}, ${colorized[2]}, ${colorized[3]}, ${colorized[4]})` : ""}} className="mainDiv">
            {/* ${colorized[0]}, ${colorized[1]}, ${colorized[2]}, ${colorized[3]}, ${colorized[4]} */}
            <Navbar id="navbar">
                <Navbar.Brand href="/">monkë</Navbar.Brand>
            </Navbar>
            <br></br>
            <Button variant="dark" id="uploadBtn" onClick={chooseFile}>upload</Button>
            <br></br>
            <input type="file" id="choose-file" ref={hiddenInput} onChange={handleChange}></input>
            <Button variant="dark" id="goBtn" onClick={() => colorize()}>go</Button>
            <br></br>
            { colorized ? <h1 id="colorsExistHeader">colors</h1> : ""}
            {colorized?.map((color) => {
                return (
                    <div>

                        <Card id="hexCard" style={{ backgroundColor: color }}>
                            <Card.Body>
                                {color}
                               
                            </Card.Body>
                        </Card>

                    </div>
                )
            })}
            { comp ? <h1 id="colorsExistHeader">complimentary</h1> : ""}
            {comp?.map((color) => {
                return (
                    <div>

                        <Card id="compCard" style={{ backgroundColor: color }}>
                            <Card.Body>
                                {color}
                            </Card.Body>
                        </Card>

                    </div>
                )
            })}

        </div>
    )
}

export default Main;