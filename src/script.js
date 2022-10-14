(() => {
    const FullHdW = 25;
    const stretch = 27;
    const H = 13;

    const createTable = (ifFullHD) => {
        let parent = document.getElementById("table");
        let size = ifFullHD ? FullHdW : stretch;

        for (let i = 0; i < H; i++) {
            for (let j = 0; j < size; j++) {
                let elem = document.createElement("button");
                elem.className = "pixel";
                elem.innerHTML = " ";
                parent.appendChild(elem);
            }
            parent.appendChild(document.createElement("br"));
        }
    }

    createTable(true);
})();