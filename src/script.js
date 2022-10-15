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
                $elem.dataset.number = count;
                $parent.appendChild($elem);
                if (i < defaultH && j < defaultW) {
                    $elem.classList.add("active");
                } else {
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
                if (i < H && j < W) {
                    $elem.classList.remove("inactive");
                    $elem.classList.add("active");
                } else {
                    $elem.classList.remove("active");
                    $elem.classList.add("inactive");
                }
            }
        }
    }

    const selectResolution = () => {
        let $elem = document.querySelector('[id = "js-resolution"]');

        $elem.onchange = (e) => {
            let $this = e.target.value;
            if ($this === "FullHD") {
                W = FullHdW;
                console.log($elem.value);
            } else if ($this === "stretch") {
                W = stretchW;
                console.log($elem.value);
            }
            updateTable();
        }
    }

    const tableClicked = (e) => {
        const $this = e.target;
        $this.classList.toggle("clicked");
        for (let i = 0; i < maxH; i++) {
            for (let j = 0; j < maxW; j++) {
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
        if (H < maxH) {
            H++;
            updateTable();
        }
    }

    const controlRemoveClicked = () => {
        if (H > 1) {
            H--;
            updateTable();
        }
    }

    const createText = () => {
        const grayChar = "░";
        const whiteChar = "█";
        let content = "";
        for (let i = 0; i < H; i++) {
            for (let j = 0; j < W; j++) {
                content += (data[i][j] == 0 ? grayChar : whiteChar);
            }
        }
        return content;
    }

    const copyToClickBoard = () => {
        let content = createText();
        navigator.clipboard.writeText(content);
    }

    const downloadText = () => {
        let content = createText();
        let blob = new Blob([content], { type: "text/plain" });
        let url = URL.createObjectURL(blob);
        let $aTag = document.createElement("a");
        $aTag.download = "VALORANT-Oekaki-Chat_export.txt";
        $aTag.href = url;
        $aTag.click();
    }

    createTable();
    selectResolution();

    for (let i = 0; i < maxH; i++) {
        for (let j = 0; j < maxW; j++) {
            document.querySelectorAll(".pixel")[i * maxW + j].addEventListener("click", (e) => tableClicked(e));
        }
    }

    document.getElementById("js-addLine").addEventListener("click", controlAddClicked);
    document.getElementById("js-removeLine").addEventListener("click", controlRemoveClicked);

    document.getElementById("js-copy").addEventListener("click", copyToClickBoard);
    document.getElementById("js-download").addEventListener("click", downloadText);

    document.getElementById("js-reset").addEventListener("click", resetClicked);
})();
