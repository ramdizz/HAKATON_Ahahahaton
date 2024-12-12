document.addEventListener("DOMContentLoaded", function () {
    const maxFlakes = 50;
    const flakes = [];
    const snowflakeCharacters = ["❅", "❄", "❆",];

    setInterval(() => {
        if (flakes.length < maxFlakes) {
            createSnowflake();
        }
    }, 300);

    function createSnowflake() {
        const snowflake = document.createElement("div");
        snowflake.className = "snowflake";

        const randomChar = snowflakeCharacters[Math.floor(Math.random() * snowflakeCharacters.length)];
        snowflake.innerHTML = randomChar;

        document.body.appendChild(snowflake);
        flakes.push(snowflake);

        const startPos = Math.random() * window.innerWidth;
        const startOpacity = Math.random();
        const duration = Math.random() * 3 + 15;
        const size = Math.random() * 20 + 10;

        snowflake.style.fontSize = `${size}px`;
        snowflake.style.opacity = startOpacity;
        snowflake.style.position = "fixed";
        snowflake.style.top = "0";
        snowflake.style.left = `${startPos}px`;

        const rotationDirection = Math.random() > 0.5 ? 1 : -1;

        snowflake.animate(
            [
                { transform: `translate(0, 0) rotate(0deg)` },
                { transform: `translate(0, 100vh) rotate(${rotationDirection * 360}deg)` }
            ],
            {
                duration: duration * 1000,
                easing: "linear",
                iterations: Infinity
            }
        );
    }
});
