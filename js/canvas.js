
globals.init = (input) => {

    // set sketches and update page
    sketches = input;
    index = 0;
    updatePage();

    //
    document.getElementById("jumpText").disabled = false;
    document.getElementById("jumpButton").disabled = false;

    // disable buttons for singleton sketches (not needed for this program)
    if (sketches.length === 1) {

        document.getElementById("backButton").disabled = true; // redundant
        document.getElementById("nextButton").disabled = true;
        document.getElementById("jumpText").disabled = true;
        document.getElementById("jumpButton").disabled = true;
    }
};

globals.backCanvas = () => {

    // update page
    --index;
    updatePage();
};

globals.nextCanvas = () => {

    // update page
    ++index;
    updatePage();
};

globals.jumpCanvas = () => {

    // get value and clear from text field
    let value = Number.parseInt(document.getElementById("jumpText").value);
    document.getElementById("jumpText").value = "";

    // check for valid value
    if ( !(value >= 1 && value <= 317) ) {
        alert("ERROR: Value must be between 1 and 317.");
        return;
    }
    
    // update page
    index = value - 1;
    updatePage();
}

function updatePage() {

    updateCanvas();
}

function updateCanvas() {

    //  draw current strokes
    sketch = sketches[index];
    drawStrokes(sketch);

    // update buttons and text field
    document.getElementById("jumpText").value = "";
    if (index <= 0)                         {
        document.getElementById("backButton").disabled = true;
        document.getElementById("nextButton").disabled = false;
    }
    else if (index >= sketches.length - 1)  {
        document.getElementById("backButton").disabled = false;
        document.getElementById("nextButton").disabled = true;
    }
    else {
        document.getElementById("backButton").disabled = false;
        document.getElementById("nextButton").disabled = false;
    }

    // display sketch label(s)
    let labels = "";
    for (let shape of sketch.shapes) {

        labels += `<strong>Label:</strong> ${shape.interpretation}<br>`;
    }
    document.getElementById("labelText").innerHTML = labels;
}

function drawStrokes(sketch) {

    // clear all strokes from canvas
    project.activeLayer.removeChildren();

    // resize canvas to sketch 
    document.getElementById("myCanvas").width = sketch.canvasWidth;
    document.getElementById("myCanvas").height = sketch.canvasHeight;
    project.activeLayer.view.viewSize = new Size(sketch.canvasWidth, sketch.canvasHeight);

    // iterate through each sketch stroke
    for (let i = 0; i < sketch.strokes.length; ++i) {

        // get sketch strokes
        let sketchStroke = sketch.strokes[i];
        
        // initialize stroke
        let stroke = new Path();
        stroke.style = PATH_STYLE;

        // add stroke to canvas
        for (let j = 0; j < sketchStroke.points.length; ++j) {
            let point = sketchStroke.points[j];
            stroke.add([point.x, point.y]);
        }
    }
}

let sketch;
let index;
let sketches;
const COLOR_BLACK = "#000000";
const PATH_STYLE = {
    strokeWidth: 4,
    strokeColor: COLOR_BLACK
};
const MAX_DOT_DISTANCE = 4.0;
const STROKE_CHECKBOX_GROUP = "strokeCheckboxGroup";