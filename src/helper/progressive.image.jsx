import React, { useState } from "react";


const omit = (obj, omitKey) =>
	Object.keys(obj).reduce((result, key) => {
		if (key !== omitKey) {
			result[key] = obj[key];
		}
		return result;
	}, {});

const overlayStyles = {
	position: "absolute",
	filter: "blur(1px)",
	transition: "opacity ease-in 1000ms",
	clipPath: "inset(0)"
};


const ProgressiveImage = (props) => {

    const { overlaySrc } = props
    const [highResImageLoaded, setHighResImageLoaded] = useState(false)
    
    let filteredProps = omit(props, "overlaySrc")

    return (
        <>
            <img
                {...filteredProps}
                onLoad={() => {
                    setHighResImageLoaded(true)
                }}
                // ref={img => {
                //     highResImage = img;
                // }}
                src={props.src}
            />
            <img
                {...filteredProps}
                className={`${props.className} ${overlayStyles}`}
                {...highResImageLoaded && { style: { opacity: "0" } }}
                src={overlaySrc}
            />
        </>
    );

}


export default ProgressiveImage;