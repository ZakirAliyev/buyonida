import './index.scss';

function HomeMainSlogan() {
    const spans = Array(4).fill("Main slogan text scrolling");

    return (
        <section id={"homeMainSlogan"}>
            <div className="scrolling-text">
                {spans.map((text, index) => (
                    <span key={index}>{text}</span>
                ))}
                {spans.map((text, index) => (
                    <span key={index + spans.length}>{text}</span>
                ))}
            </div>
        </section>
    );
}

export default HomeMainSlogan;
