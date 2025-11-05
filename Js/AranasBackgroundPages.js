
const numSpiders = 8;
const spiderImg = "../Images/Arañas/Araña.png";
const container = document.getElementById('spider-background');

for (let i = 0; i < numSpiders; i++) {
    const spider = document.createElement("img");
    spider.src = spiderImg;
    spider.classList.add("spider");
    container.appendChild(spider);
    moveSpider(spider);
}

function moveSpider(spider) {
    const x = Math.random() * (window.innerWidth - 100);
    const y = Math.random() * (window.innerHeight - 100);
    const rotation = Math.random() * 360;

    spider.style.left = `${x}px`;
    spider.style.top = `${y}px`;
    spider.style.transform = `rotate(${rotation}deg)`;

    const nextMove = 3000 + Math.random() * 3000;
    setTimeout(() => moveSpider(spider), nextMove);
}
