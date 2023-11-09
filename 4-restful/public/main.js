const btn = document.querySelector('#btn');

btn.addEventListener('click', getData)

async function getData(){
    const result = await fetch(`http://localhost:3000/api/pets`)
    const data = await result.json();

    createDiv(data)
}


function createDiv(arr){
    arr.forEach(element => {
        const div = document.createElement('div')
        div.textContent = element.name
        document.body.appendChild(div) 
    });
}