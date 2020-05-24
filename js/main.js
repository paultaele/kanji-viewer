
window.globals = {

    sketches: []
};

window.addEventListener("load", () => {

    // load data from file
    load(filename).then(contents => {

        // initalize contents from file
        window.globals.init(contents);
    });

    // set button behaviors
    document.getElementById("backButton").onclick = onClickBack;
    document.getElementById("nextButton").onclick = onClickNext;
    document.getElementById("jumpButton").onclick = onClickJump;
    function onClickBack() { window.globals.backCanvas(); }
    function onClickNext() { window.globals.nextCanvas(); }
    function onClickJump() { window.globals.jumpCanvas(); }

    // 
    let jumpText = document.getElementById("jumpText");
    let jumpButton = document.getElementById("jumpButton");
    jumpText.addEventListener("keyup", (event) => {
        // number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
        // cancel the default action, if needed
        event.preventDefault();
        // trigger the button element with a click
        jumpButton.click();
    }
});
});

function load(filename) {

    let promise = new Promise( (resolve, reject) => {

        // read file
        let request = new XMLHttpRequest();
        request.open("GET", filename, true);
        request.onload = () => {

            if (request.status === 200) {
                
                // get sketches from file
                let contents = request.response;
                let sketches = JSON.parse(contents);
                
                // resolve promise
                resolve(sketches);
            }

            else { reject(Error(request.statusText)); }
        };
        request.onerror = () => { reject(Error("Network Error")); };
        request.send();
    });

    return promise;
}

const filename = "./data/data.json";
