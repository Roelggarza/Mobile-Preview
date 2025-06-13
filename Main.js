<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Code Previewer</title>
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Inter', sans-serif;
            -webkit-overflow-scrolling: touch; /* Enable smooth scrolling on iOS */
            overflow-y: auto; /* Allow vertical scrolling */
        }
        /* Custom scrollbar for WebKit browsers */
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
    </style>
</head>
<body class="bg-gray-100 flex flex-col min-h-screen text-gray-800">
    <!-- Main Container -->
    <div class="flex-grow p-4 md:p-6 lg:p-8 max-w-4xl mx-auto w-full">
        <!-- Header -->
        <h1 class="text-3xl md:text-4xl font-bold text-center text-blue-700 mb-6 md:mb-8 rounded-lg">
            Mobile Code Previewer
        </h1>

        <!-- Code Editor Section -->
        <div class="bg-white p-4 md:p-6 rounded-xl shadow-lg mb-6 flex flex-col h-auto">
            <label for="code-input" class="block text-lg font-semibold text-gray-700 mb-3">
                Enter your HTML, CSS, or JavaScript code here:
            </label>
            <textarea
                id="code-input"
                class="w-full flex-grow p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 font-mono text-sm resize-y min-h-[200px] md:min-h-[250px] lg:min-h-[300px]"
                placeholder="<!-- Your HTML goes here -->
<!DOCTYPE html>
<html lang='en'>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>My Mobile Page</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            background-color: #f0f0f0;
            color: #333;
        }
        .container {
            background-color: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            text-align: center;
            max-width: 90%;
            width: 300px;
            box-sizing: border-box;
        }
        h1 {
            color: #4CAF50;
            margin-bottom: 15px;
            font-size: 1.5em;
        }
        p {
            font-size: 0.9em;
            line-height: 1.5;
        }
        button {
            background-color: #007bff;
            color: white;
            border: none;
            padding: 10px 20px;
            margin-top: 20px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 1em;
            transition: background-color 0.3s ease;
        }
        button:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <div class='container'>
        <h1>Hello from Mobile!</h1>
        <p>This is a live preview of your HTML code.</p>
        <button onclick='alert(\"Button Clicked!\")'>Click Me</button>
    </div>
</body>
</html>"
            ></textarea>
            <div class="mt-4 flex flex-col md:flex-row justify-end space-y-2 md:space-y-0 md:space-x-2">
                <button
                    id="refresh-button"
                    class="w-full md:w-auto px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75 transition duration-300 ease-in-out"
                >
                    Refresh
                </button>
                <button
                    id="run-code-button"
                    class="w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-300 ease-in-out"
                >
                    Run Code
                </button>
            </div>
        </div>

        <!-- Preview Section -->
        <div class="bg-white p-4 md:p-6 rounded-xl shadow-lg h-auto flex flex-col flex-grow">
            <h2 class="text-xl md:text-2xl font-bold text-gray-700 mb-3">
                Live Preview:
            </h2>
            <iframe
                id="preview-frame"
                class="w-full flex-grow border border-gray-300 rounded-lg bg-white h-[300px] md:h-[400px] lg:h-[500px]"
                sandbox="allow-scripts allow-forms allow-popups allow-modals allow-same-origin"
                title="Code Preview"
            ></iframe>
        </div>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const codeInput = document.getElementById('code-input');
            const runCodeButton = document.getElementById('run-code-button');
            const refreshButton = document.getElementById('refresh-button'); // Get the new refresh button
            const previewFrame = document.getElementById('preview-frame');

            /**
             * Updates the content of the iframe with the code from the textarea.
             * This function is responsible for rendering the user's HTML, CSS, and JS.
             */
            function updatePreview() {
                const code = codeInput.value;
                // Get the iframe's contentWindow and contentDocument
                const iframeDoc = previewFrame.contentDocument || previewFrame.contentWindow.document;

                // Open the document for writing, write the new content, and close it.
                // This effectively refreshes the iframe with the new code.
                iframeDoc.open();
                iframeDoc.write(code);
                iframeDoc.close();
            }

            // Event listener for the "Run Code" button
            runCodeButton.addEventListener('click', updatePreview);

            // Event listener for the new "Refresh" button
            refreshButton.addEventListener('click', updatePreview);

            // Initial preview update when the page loads with the default code
            updatePreview();

            // Set up a basic message box function as a replacement for alert()
            // This ensures interactive elements within the previewed code can still provide feedback.
            if (previewFrame && previewFrame.contentWindow) {
                previewFrame.contentWindow.alert = function(message) {
                    // Create a simple modal/message box within the iframe's context
                    const modal = previewFrame.contentDocument.createElement('div');
                    modal.style.cssText = `
                        position: fixed;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        background-color: white;
                        padding: 20px;
                        border-radius: 8px;
                        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
                        z-index: 10000;
                        text-align: center;
                        max-width: 80vw;
                        word-wrap: break-word;
                    `;
                    modal.innerHTML = `
                        <p class="text-lg font-semibold mb-4">${message}</p>
                        <button onclick="this.parentNode.remove()" style="
                            background-color: #007bff;
                            color: white;
                            border: none;
                            padding: 8px 15px;
                            border-radius: 5px;
                            cursor: pointer;
                        ">OK</button>
                    `;
                    previewFrame.contentDocument.body.appendChild(modal);
                };
            }
        });
    </script>
</body>
</html>
