import '../App.css';

export function Footer() {
    const twitter = "https://twitter.com/GRAPH_fps";
    const github = "https://github.com/RUNFUNRUN/VALORANT-Oekaki-Chat.git";

    return (
        <footer>
            <p>
                Created by RUNFUNRUN(<a href={twitter}>Twitter</a>)
            </p>
            <p>
                <a href={github}>GitHub</a>
            </p>
        </footer>
    );
}
