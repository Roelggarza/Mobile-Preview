<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Click Bottitle>
<!-- Tailwind CSS CDN -->
<script src="https://cdn.tailwindcss.com">script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet">
<style>
body {
font-family: 'Inter', sans-serif;
-webkit-overflow-scrolling: touch; /* Enable smooth scrolling on iOS /
overflow-y: auto; / Allow vertical scrolling /
}
/ Custom scrollbar for WebKit browsers */
::-webkit-scrollbar {
width: 8px;
}
::-webkit-scrollbar-track {
background: #f1f1f1;
border-radius: 10px;
}
::-webkit-scrollbar-thumb {
background: #888;
border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
background: #555;
}
#click-area {
width: 300px;
height: 200px;
border: 1px solid black;
margin-bottom: 20px;
}
style>
head>
<body class="bg-gray-100 flex flex-col min-h-screen text-gray-800">
<!-- Main Container -->
<div class="flex-grow p-4 md:p-6 lg:p-8 max-w-4xl mx-auto w-full">
<!-- Header -->
<h1 class="text-3xl md:text-4xl font-bold text-center text-blue-700 mb-6 md:mb-8 rounded-lg">
Click Bot
h1>
    <!-- Timer Input Section -->
    <div class="bg-white p-4 md:p-6 rounded-xl shadow-lg mb-6 flex flex-col h-auto">
        <label for="timer" class="block text-lg font-semibold text-gray-700 mb-3">
            Set recording time (seconds):
        label>
        <input
            id="timer"
            type="number"
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
            value="10"
        />
    div>

    <!-- Click Area Section -->
    <div id="click-area" class="bg-white p-4 md:p-6 rounded-xl shadow-lg mb-6 flex flex-col h-auto justify-center items-center">
        Click here to record clicks
    div>

    <!-- Record and Play Button Section -->
    <div class="mt-4 flex flex-col md:flex-row justify-end space-y-2 md:space-y-0 md:space-x-2">
        <button
            id="record"
            class="w-full md:w-auto px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75 transition duration-300 ease-in-out"
        >
            Record
        button>
        <button
            id="play"
            class="w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-300 ease-in-out"
        >
            Play
        button>
    div>
div>

<script>
    const clickArea = document.getElementById('click-area');
    const recordButton = document.getElementById('record');
    const playButton = document.getElementById('play');
    let recording = false;
    let clicks = [];
    let timer = 0;

    // Record clicks
    clickArea.addEventListener('click', (e) => {
        if (recording) {
            clicks.push({
                x: e.clientX,
                y: e.clientY,
                time: Date.now() - timer
            });
        }
    });

    // Start recording
    recordButton.addEventListener('click', () => {
        recording = true;
        clicks = [];
        timer = Date.now();
        recordButton.disabled = true;
        playButton.disabled = true;

        setTimeout(() => {
            recording = false;
            recordButton.disabled = false;
            playButton.disabled = false;
        }, parseInt(document.getElementById('timer').value) * 1000);
    });

    // Play recorded clicks
    playButton.addEventListener('click', () => {
        let currentTime = 0;
        clicks.forEach((click) => {
            setTimeout(() => {
                const event = new MouseEvent('click', {
                    bubbles: true,
                    cancelable: true,
                    view: window,
                    detail: 1,
                    clientX: click.x,
                    clientY: click.y,
                    ctrlKey: false,
                    altKey: false,
                    shiftKey: false,
                    metaKey: false,
                    button: 0,
                    buttons: 1,
                    relatedTarget: null
                });
                clickArea.dispatchEvent(event);
            }, currentTime + click.time);
            currentTime += click.time;
        });
    });
script>
body>
html>
