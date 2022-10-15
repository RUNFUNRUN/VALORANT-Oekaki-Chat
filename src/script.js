(() => {
    const FullHdW = 26;
    const stretchW = 27;
    const maxW = stretchW;
    const maxH = 13;

    const defaultH = 7;
    const defaultW = FullHdW;

    let W = defaultW;
    let H = defaultH;
    
    let data = new Array(maxH);
    for (let i = 0; i < maxH; i++) {
        data[i] = new Array(maxW);
        for (let j = 0; j < maxW; j++) {
            data[i][j] = 0;
        }
    }
    
    const createTable = () => {
        let $parent = document.getElementById("js-table");
        let count = 0;
        for (let i = 0; i < maxH; i++) {
            for (let j = 0; j < maxW; j++) {
                let $elem = document.createElement("button");
                $elem.className = "pixel";
                $elem.innerHTML = " ";
                $elem.dataset.number = count;
                $parent.appendChild($elem);
                if(i < defaultH && j < defaultW) {
                    $elem.classList.add("active");
                }else{
                    $elem.classList.add("inactive");
                }
                count++;
            }
            $parent.appendChild(document.createElement("br"));
        }
    }

    const updateTable = () => {
        for (let i = 0; i < maxH; i++) {
            for (let j = 0; j < maxW; j++) {
                let $elem = document.querySelector(`[data-number="${i * maxW + j}"]`);
                if(i < H && j < W) {
                    $elem.classList.remove("inactive");
                    $elem.classList.add("active");
                }else{
                    $elem.classList.remove("active");
                    $elem.classList.add("inactive");
                }
            }
        }
    }

    const tableClicked = (e) => {
        const $this = e.target;
        $this.classList.toggle("clicked");
        for(let i = 0; i < maxH; i++) {
            for(let j = 0; j < maxW; j++) {
                if ($this.dataset.number == (i * maxW + j)) {
                    data[i][j] = (data[i][j] == 0 ? 1 : 0);
                }
            }
        }
    }

    const resetClicked = () => {
        for (let i = 0; i < maxH; i++) {
            for (let j = 0; j < maxW; j++) {
                document.querySelectorAll("#js-table button")[i * maxW + j].classList.remove("clicked");
                data[i][j] = 0;
            }
        }
    }

    const controlAddClicked = () => {
        if(H < maxH){
            H++;
            updateTable();
        }
    }

    const controlRemoveClicked = () => {
        if(H > 1){
            H--;
            updateTable();
        }
    }

    const changeFullHD = () => {
        W = FullHdW;
        updateTable();
    }

    const changeStretch = () => {
        W = stretchW;
        updateTable();
    }

    const copyToClickBoard = () => {
        const grayChar = "░";
        const whiteChar = "█";
        let content = "";
        for(let i = 0; i < H; i++){
            for(let j = 0; j < W; j++){
                content += (data[i][j] == 0 ? grayChar : whiteChar);
            }
        }
        navigator.clipboard.writeText(content);
        console.log("a");
    }

    createTable();

    for (let i = 0; i < maxH; i++) {
        for (let j = 0; j < maxW; j++) {
            document.querySelectorAll(".pixel")[i * maxW + j].addEventListener("click", (e) => tableClicked(e));
        }
    }

    document.getElementById("js-FullHD").addEventListener("click", changeFullHD);
    document.getElementById("js-stretch").addEventListener("click", changeStretch);

    document.getElementById("js-addLine").addEventListener("click", controlAddClicked);
    document.getElementById("js-removeLine").addEventListener("click", controlRemoveClicked);

    document.getElementById("js-copy").addEventListener("click", copyToClickBoard);

    document.getElementById("js-reset").addEventListener("click", resetClicked);
})();
