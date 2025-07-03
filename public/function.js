let notePageOpen = false;

function createNewPage(){

    if (!notePageOpen){
        let defaultPad = `<form action="/new" method="POST" class="notePad">
          <div id="noteHeader">
          <input
            type="text"
            class="inputText"
            id="title"
            name="title"
            placeholder="Title"
            value=""
          />
          <button id="create" type="submit" onclick="checkNote()">Add Note</button>
          </div>
          <br />
          <textarea
            name="content"
            id="content"
            spellcheck="false"
            placeholder="Click to type..."
          ></textarea>
          
        </form>`
        notePageOpen = true;
        document.querySelector(".addPage").innerHTML = "-";
        document.querySelector(".notePadPage").innerHTML = defaultPad;
    } else if (notePageOpen){
        notePageOpen = false;
        document.querySelector(".addPage").innerHTML = "+";
        document.querySelector(".notePadPage").innerHTML = "";
    }


}


createNewPage();
