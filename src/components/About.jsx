import '../App.css';

export function About() {
    return (
        <div className="about">
            <h2>About</h2>
            <p className="lang">JP</p>
            <div className="sentence">
                <p>
                    このサイトではVALORANTのチャットで使えるアスキーアートを簡単に作成する事ができます。各ピクセルをクリックすると色が切り替わります。
                    Change heightで縦幅を変えることができます。
                    引き伸ばし用のオプションも作りました。作成したアスキーアートはコピーまたはテキストファイルとしてダウンロードする事ができます。
                </p>
            </div>
            <p className="lang">EN</p>
            <div className="sentence">
                <p>
                    You can easily create VALORANT ASCII art that can be used in chat.
                    Click each pixel to change the color.
                    You can change the height.I also made an option for stretched(4:3).
                    You can copy or download the created ASCII art as a text file.
                </p>
                <p>
                    "Oekaki" is Japanese and means drawing in English.
                </p>
            </div>
        </div>
    );
}
