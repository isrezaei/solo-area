import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';



const ffmpeg = createFFmpeg({ log: true });

const downloadLink = 'http://example.com/download-link.ogg';


export const downloadAndConvert = async (OOGdata) => {
    // Initialize the ffmpeg.js library
    await ffmpeg.load();

    // Download the OGG file
    const response = await fetch(downloadLink);
    const arrayBuffer = await response.arrayBuffer();

    // Write the OGG file to memory
    ffmpeg.FS('writeFile', 'input.ogg', new Uint8Array(arrayBuffer));

    // Convert the OGG file to MP3
    await ffmpeg.run('-i', 'input.ogg', '-c:a', 'libmp3lame', 'output.mp3');

    // Read the converted file from memory
    const data = ffmpeg.FS('readFile', 'output.mp3');

    // Create a Blob URL for the converted file
    const blob = new Blob([data.buffer], { type: 'audio/mp3' });
    const url = URL.createObjectURL(blob);

    // Play the converted file in the browser
    const audio = new Audio(url);
    audio.play();
};