import { useRef, useState } from 'react';
import { Wheel } from "react-custom-roulette";
import './RandomWheel.css';
import Prize from "../../components/Prize.jsx";
import { motion } from "framer-motion";

import audioxoso from "../../assets/audio/xoso.mp3";
import audiovit from "../../assets/audio/vit.mp3";

const buttonMotion = {
    hover: {
        scale: 1.1,
        textShadow: "0px 0px 8px rgba(255,255,255)",
        boxShadow: "0px 0px 8px rgba(255,255,255)",
        transition: {
            yoyo: Infinity,
            duration: 0.3,
        },
    },
};

const containerMotion = {
    hide: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            delay: 0.5,
            when: "beforeChildren",
        },
    },
};

const data = [
    {
        option: "🍕 Pizza",
        style: { backgroundColor: "#F7C59F", textColor: "white", },
    },
    {
        option: "🍔 Burger",
        style: { backgroundColor: "#F6EAC2", textColor: "black" },
    },
    {
        option: "🍣 Sushi",
        style: { backgroundColor: "#AED9E0", textColor: "black" },
    },
    {
        option: "🥗 Salad",
        style: { backgroundColor: "#CBE896", textColor: "black" },
    },
    {
        option: "🍜 Ramen",
        style: { backgroundColor: "#FFB5E8", textColor: "black" },
    },
    {
        option: "🍩 Donut",
        style: { backgroundColor: "#D5AAFF", textColor: "black" },
    },
];

function RandomWheel() {
    const ref = useRef();

    const [mustSpin, setMustSpin] = useState(false);
    const [modalPrize, setModalPrize] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);
    const [showPrize, setShowPrize] = useState("");
    const [audio, setAudio] = useState();

    const randomAudio = () => {
        const arrAudio = [audioxoso, audiovit];

        const random = Math.floor(Math.random() * arrAudio.length);

        return arrAudio[random];
    };

    const updateAudio = (source) => {
        setAudio(source);
        if (ref.current) {
            ref.current.pause();
            ref.current.load();
        }
    };

    // handle click spin button
    const handleSpinClick = () => {
        const newPrizeNumber = Math.floor(Math.random() * data.length);
        setPrizeNumber(newPrizeNumber);
        setMustSpin(true);
        updateAudio(randomAudio());
        ref.current.play();
        ref.current.volume = 0.5;
    };

    const handleSpinStop = () => {
        setMustSpin(false);
        setModalPrize(true);
        ref.current.pause();
        setShowPrize(data[prizeNumber].option);
    };

    const back = (value) => {
        setModalPrize(value);
    };

    return (
        <motion.div
            className="game"
            variants={containerMotion}
            initial="hide"
            animate="visible"
        >
            <audio className="game_audio" ref={ref}>
                <source src={audio} type="audio/mp3" />
            </audio>

            <div className="game_content">

                <Wheel
                    mustStartSpinning={mustSpin}
                    prizeNumber={prizeNumber}
                    data={data}
                    onStopSpinning={handleSpinStop}
                    outerBorderColor="#4E5452"
                    outerBorderWidth={3}
                    innerBorderColor="#4E5452"
                    innerBorderWidth={3}
                    radiusLineColor="#4E5452"
                />

                <motion.button
                    variants={buttonMotion}
                    whileHover="hover"
                    className="game_content_spin"
                    onClick={handleSpinClick}
                >
                    Quay thưởng
                </motion.button>
            </div>

            {modalPrize && <Prize back={back} prize={showPrize} />}
        </motion.div>
    );
};

export default RandomWheel;