const ProductTitle = document.getElementById('ProductTitle');
const Quantity = document.getElementById('Quantity');
const CategorySelection = document.getElementById('CategorySelect');
const items = document.getElementById('items');
const addProdctBtn = document.getElementById('addProdctBtn');
const boxStyle ="p-5  flex justify-between gap-3"; 
const reperSTyle = "flex gap-2 items-center";
const categoryStyle = "py-[1px] max-h-[30px] px-[6px] w-[80px] text-center border-2 border-slate-400 text-slate-400 rounded-[12px]";
const QuantityStyle = "bg-slate-800 rounded-full w-6 flex justify-center items-center  border-2 border-slate-400 text-slate-400 h-6";
const deletStyle = "cursor-pointer py-[1px] px-[6px] w-[80px] border-2 text-center border-red-400 text-red-400 rounded-[12px]";
let info = [];
const productCreater = (title,dt,num,category,id)=>{
    let box = document.createElement('div');
    box.className = boxStyle;
    box.id = id;
    let name = document.createElement('div');
    name.innerHTML = title;
    let date = document.createElement('div');
    date.innerHTML = dt;
    let raper = document.createElement('div');
    raper.className = reperSTyle;
    let catg = document.createElement('div');
    catg.innerHTML = category;
    catg.className = categoryStyle;
    let number = document.createElement('div');
    number.innerHTML = num;
    number.className = QuantityStyle;
    let del = document.createElement('div');
    del.innerHTML = 'delet';
    del.className = deletStyle;
    del.addEventListener('click',()=>{
       console.log(box.id)
        fetch("http://localhost:3000/items/"+box.id,{
        method :"DELETE"
       }).then(x => console.log(x))
         .catch(e => console.log(e))
        box.remove();
    })
    raper.appendChild(date);
    raper.appendChild(catg);
    raper.appendChild(number);
    raper.appendChild(del);
    box.appendChild(name);
    box.appendChild(raper);
    items.appendChild(box);
}
addProdctBtn.addEventListener('click',()=>{
        if(ProductTitle.value.length>0 && Number(Quantity.value)>0){
            let rnd = Math.floor(Date.now() / 1000);
            let index = CategorySelection.selectedIndex;
            let date = new Date
            productCreater(ProductTitle.value , date.toLocaleDateString(),Number(Quantity.value),CategorySelection[index].innerHTML,rnd);
            jsonformater(ProductTitle.value , date.toLocaleDateString(),Number(Quantity.value),CategorySelection[index].innerHTML,rnd);
            fetch("http://localhost:3000/items",{
                method :"POST",
                headers :{
                    "Content-Type": "application/json"
                },
                body :JSON.stringify(jsonformater(ProductTitle.value , date.toLocaleDateString(),Number(Quantity.value),CategorySelection[index].innerHTML,rnd))
            }).then((res) =>  res.json())
              .then((res) => console.log(res))
              .catch((err)=> console.log(err))
              info.push(jsonformater(ProductTitle.value , date.toLocaleDateString(),Number(Quantity.value),CategorySelection[index].innerHTML,rnd))
        }
        ProductTitle.value = '';
        Quantity.value=0;
        CategorySelection.value = CategorySelection[0].innerHTML
})
fetch("http://localhost:3000/items")
.then((res)=> res.json())
.then((res)=> {
    info = res;
    res.map((x)=>{
    productCreater(x.title,x.date,x.quantity,x.category,x.id);
})}).catch((err)=> console.log(err));
const jsonformater  = (title,dt,num,category,id)=>{
    let info ={
        "id":`${id}`,
        "title" : title,
        "date" : dt,
        "quantity": num,
        "category":category
    }
    return info;
}


// <<<<<<<< SEARCH >>>>>>>>>

const searchBtn = document.getElementById('searchBtn');
const searchProduct = document.getElementById('searchProduct');
searchBtn.addEventListener('click',()=>{
    console.log(info)
    if(searchProduct.value.length>0){
        info.map((x)=>{
            if(x.title ==searchProduct.value )
            {
                items.innerHTML = '';
                productCreater(x.title,x.date,x.quantity,x.category,x.id);
            }
        })
    }
})


// <<<<<<<< FILTER >>>>>>>>>
const SortSelect = document.getElementById('SortSelect')
SortSelect.addEventListener('change',()=>{
    let sortIndex = SortSelect.selectedIndex;
    if(SortSelect[sortIndex].innerHTML == "newest")
        NewestSort()
    else if(SortSelect[sortIndex].innerHTML == "most to least")
        mosttoleastsort()
    else if(SortSelect[sortIndex].innerHTML == "least to most")
        lessToMost();
})
const NewestSort = ()=>{
    let arr = [];
    let pre ;
    console.log(info)
    for(let i = 0; i<info.length;i++)
    {
        let min =info[i].id;
        if(arr.includes(info[i].id)){
            min = pre;
        }
        for(let j = 0;j<info.length;j++)
        {
            if(arr.includes(info[j].id))
                continue;
            if(info[j].id<min)
                {
                    pre = min;
                    min = info[j].id;
                }
        }
        arr.unshift(min)
    }       
    console.log(arr)
    reCreatProduct(arr,'id');
}
const mosttoleastsort = ()=>{
    let arr = [];
    let pre ;
    console.log(info)
    for(let i = 0; i<info.length;i++)
    {
        let min =info[i].quantity;
        if(arr.includes(info[i].quantity)){
             min = pre;
        }
        for(let j = 0;j<info.length;j++)
        {
            if(arr.includes(info[j].quantity))
                continue;
            if(info[j].quantity<min)
                {
                    pre = min;
                    min = info[j].quantity;
                }
        }
        arr.unshift(min)
    }       
    console.log(arr)
    reCreatProduct(arr,'quantity');
}
const lessToMost = ()=>{
    let arr = [];
    let pre ;
    console.log(info)
    for(let i = 0; i<info.length;i++)
    {
        let min =info[i].quantity;
        if(arr.includes(info[i].quantity)){
             min = pre;
        }
        for(let j = 0;j<info.length;j++)
        {
            if(arr.includes(info[j].quantity))
                continue;
            if(info[j].quantity<min)
                {
                    pre = min;
                    min = info[j].quantity;
                }
        }
        arr.push(min)
    }       
    console.log(arr)
    reCreatProduct(arr,'quantity'); 
}
const reCreatProduct = (arr,key)=>{
    items.innerHTML ='';
    arr.forEach((x)=>{
        info.forEach((y)=>{
            if(x === y[`${key}`])
                productCreater(y.title,y.date,y.quantity,y.category,y.id);
        })
    })
}