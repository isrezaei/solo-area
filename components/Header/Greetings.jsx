import {useEffect, useState} from "react";

function Greetings() {
    const [greeting, setGreeting] = useState(' ');

    useEffect(() => {
        const currentTime = new Date().getHours();

        let greetingText;
        switch (true) {
            case currentTime >= 5 && currentTime < 12:
                greetingText = 'Good morning';
                break;
            case currentTime >= 12 && currentTime < 17:
                greetingText = 'Good afternoon';
                break;
            case currentTime >= 17 && currentTime < 20:
                greetingText = 'Good evening';
                break;
            default:
                greetingText = 'good night';
        }
        setGreeting(greetingText);

    }, []);

    return greeting;
}

export default Greetings;