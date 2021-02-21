import React, { useEffect, useState } from "react";
import { Navbar, Button, Card } from "react-bootstrap"
import "./Main.css"
import getColors from "get-image-colors";
import hexToHsl from "hex-to-hsl";
import hslToHex from "hsl-to-hex"
import html2canvas from "html2canvas";

const Main = () => {
    const [file, setFile] = useState(null)
    const [colorized, setColorized] = useState()
    const [comp, setComp] = useState();
    const [display, setDisplay] = useState(false);


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
        if (file) {
            setDisplay(true)
        }
        getColors(file).then(colors => {
            setColorized(colors.map(color => color.hex()))
        })
    }

    const saveScheme = () => {
        html2canvas(document.body).then(function(canvas) {
            document.body.appendChild(canvas);
            console.log(canvas)
        });
    }


    return (
        <div style={{ backgroundImage: comp ? `linear-gradient(80deg,${colorized[0]}, ${colorized[1]}, ${colorized[2]}, ${colorized[3]}, ${colorized[4]}, ${comp[0]}, ${comp[1]}, ${comp[2]}, ${comp[3]}, ${comp[4]})` : ""}} className="mainDiv">
            <Navbar id="navbar">
                <Navbar.Brand href="/">
                    <p className={display ? "display" : null}>MXNMLLN</p>
                </Navbar.Brand>
                <Button onClick={saveScheme}>save</Button>
            </Navbar>
            <br></br>
            <Button variant="dark" id="uploadBtn" onClick={chooseFile} className={display ? "display" : null}>
                <h7>upload</h7>
            </Button>
            <br></br>
            <input type="file" id="choose-file" ref={hiddenInput} onChange={handleChange}></input>
            { file ? 
            <Button variant="dark" id="goBtn" onClick={() => colorize()} className={display ? "display" : null}>
                <h7>go</h7>
            </Button>
                : 
                <Button variant="dark" id="goBtn">
                <h7>go</h7>
            </Button>
            }
            <br></br>
            { colorized ? <h1 id="colorsExistHeader" className={display ? "display" : null}>colors</h1> : ""}
            {colorized?.map((color, index) => {
                return (
                    <div>

                        <Card id="hexCard" style={{ backgroundColor: color, color: comp ? comp[index] : ""}}>
                            <Card.Body>
                                {color}
                            </Card.Body>
                        </Card>

                    </div>
                )
            })}
            { comp ? <h1 id="compExistHeader" className={display ? "display" : null}>complimentary</h1> : ""}
            {comp?.map((color, index) => {
                return (
                    <div>

                        <Card id="compCard" style={{ backgroundColor: color, color: colorized[index] }}>
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