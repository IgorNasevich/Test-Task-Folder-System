function foo(arr,tabs){
	if (arr === null) return
	for (let i = 0; i < arr.length; i++){
		console.log('  '.repeat(tabs)+arr[i].sorthead);
		foo(arr[i].children, tabs+1)
	}
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
	services[i]['children'] = services[i].node == 1 ? [] : null
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
foo(root,0)
sort(root)
foo(root,0)
// в root лежит массив с объектами с массивом children == null Или [], всё отсортировано.