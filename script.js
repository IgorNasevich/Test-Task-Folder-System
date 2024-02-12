let wrapper = document.querySelector('.wrapper')
let prevElem = wrapper


function render(arr) {

	if (arr === null) {
		return
	}

	for (let i = 0; i < arr.length; i++){
		let type = 'assets/folder.png'
		let elem = document.createElement('div')
		
		prevElem.append(elem)
		elem.classList.add(arr[i].head === null ? 'rootElem' : 'innerElem')
		if(arr[i].children !== null){
			prevElem = elem
		}
		else{
			type = 'assets/file.png' 
		}

		if(arr[i].children === null || arr[i].children.length ===0){
			elem.innerHTML =
				`
				<div class= 'elem-wrapper'>
					<img src=${type} width='20px' height='20px' alt="item-type">
					<div class="text">${arr[i].name} (${arr[i].price})</div>
				</div>
				`		
		}
		else{
			elem.innerHTML=	
			`
			<div class= 'elem-wrapper'>
				<img src="assets/arrow-button.png" class = 'arrow' width='20px' height='20px' alt="arrow-button">
				<img src=${type} width='20px' height='20px' alt="item-type">
				<div class="text">${arr[i].name} (${arr[i].price})</div>
			</div>
			`
		}

		render(arr[i].children)
	}
	prevElem = prevElem.parentElement
}

function sort(arr) {
	if (arr === null) return
	arr.sort((a,b) => a.sorthead - b.sorthead)
	for (let i = 0; i < arr.length; i++){
		sort(arr[i].children)
	}
}

let dataString = JSON.stringify( {
    "services": [
        {
            "id": 1,
            "head": null,
            "name": "Проф.осмотр",
            "node": 0,
            "price": 100.0,
            "sorthead": 20
        },
        {
            "id": 2,
            "head": null,
            "name": "Хирургия",
            "node": 1,
            "price": 0.0,
            "sorthead": 10
        },
        {
            "id": 3,
            "head": 2,
            "name": "Удаление зубов",
            "node": 1,
            "price": 0.0,
            "sorthead": 10
        },
        {
            "id": 4,
            "head": 3,
            "name": "Удаление зуба",
            "node": 0,
            "price": 800.0,
            "sorthead": 10
        },
        {
            "id": 5,
            "head": 3,
            "name": "Удаление 8ого зуба",
            "node": 0,
            "price": 1000.0,
            "sorthead": 30
        },
        {
            "id": 6,
            "head": 3,
            "name": "Удаление осколка зуба",
            "node": 0,
            "price": 2000.0,
            "sorthead": 20
        },
        {
            "id": 7,
            "head": 2,
            "name": "Хирургические вмешательство",
            "node": 0,
            "price": 200.0,
            "sorthead": 10
        },
        {
            "id": 8,
            "head": 2,
            "name": "Имплантация зубов",
            "node": 1,
            "price": 0.0,
            "sorthead": 20
        },
        {
            "id": 9,
            "head": 8,
            "name": "Коронка",
            "node": 0,
            "price": 3000.0,
            "sorthead": 10
        },
        {
            "id": 10,
            "head": 8,
            "name": "Слепок челюсти",
            "node": 0,
            "price": 500.0,
            "sorthead": 20
        }
    ]
})

let data = JSON.parse(dataString)
let services = data.services
let dataSet = {}
let root = []

for (let i = 0; i < services.length; i++){
	dataSet[services[i].id] = services[i]
	services[i]['children'] = services[i].node === 1 ? [] : null
	delete services[i].id
	delete services[i].node
}


for (key in dataSet){
	let item = dataSet[key]
	if(item.head !== null){
		dataSet[item.head].children.push(item)
	}
	else{
		root.push(item)
	}
}
sort(root)
console.log(root);
render(root,0)


document.body.addEventListener('click', (e)=>{
	e.stopPropagation()
	if(e.target.classList.contains('arrow')){
		e.target.classList.toggle('tilt')
		let children = e.target.parentElement.parentElement.children
		for (let i = 0; i < children.length; i++){
			if(i !== 0){
				children[i].classList.toggle('hidden')
			}
			
		}
	}
})
// в root лежит массив с объектами с массивом children == null Или [], всё отсортировано.
